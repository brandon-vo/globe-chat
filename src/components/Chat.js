import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import Message from "./Message";
import useSound from "use-sound";
import Filter from "bad-words";
import sounds from "../assets/sounds/sounds";
import { BrowserView } from "react-device-detect";
import { useSpring, animated } from "react-spring";
import { SubmitIcon } from "./Icon";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MonitorIcon from "@mui/icons-material/Monitor";

const Chat = ({ user = null, db = null }) => {
  // Messages
  const [messages, setMessages] = useState([]);
  const [formValue, setFormValue] = useState("");

  // Sounds
  const [messageSound] = useSound(sounds.message, { volume: 0.4 });
  const [clickSound] = useSound(sounds.click);

  const [isCompactLayout, setIsCompactLayout] = useState(
    localStorage.getItem("compact") === "true" ? true : false
  );

  const layoutWidthProps = useSpring({
    maxWidth: isCompactLayout ? "560px" : "1024px",
  });

  const { uid, displayName, photoURL } = user;

  const profanityFilter = new Filter(); // Filter profanity out

  const [lastMessageTime, setLastMessageTime] = useState(null);
  const messageCooldown = 500; // 500 ms

  // Listen to all messages
  useEffect(() => {
    if (db) {
      const unsubscribe = db
        .collection("messages")
        .orderBy("createdAt", "desc")
        .limit(75)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setMessages(data);
        });
      return unsubscribe;
    }
  }, [db]);

  const onMessageCooldown = () => {
    if (!lastMessageTime) return true;

    const currentTime = new Date().getTime();
    return currentTime - lastMessageTime >= messageCooldown;
  };

  // Sending a message
  const sendMessage = async (e) => {
    if (!onMessageCooldown()) {
      return alert("Slow down!");
    }

    // Check if message contains over 1000 characters
    if (formValue.length > 1000)
      return alert(
        "You cannot send a message that is longer than 1000 characters"
      );

    // Check if message is empty
    if (!formValue.trim().length) {
      return alert("You cannot send an empty message");
    }

    const sanitizedMessage = profanityFilter.clean(formValue);

    e.preventDefault();

    // Adding to messages collection
    if (db) {
      await db.collection("messages").add({
        text: sanitizedMessage,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }
    setFormValue(""); // Clear text after submit
    messageSound();
    setLastMessageTime(new Date().getTime());
  };

  // Toggle layout
  const changeLayout = () => {
    if (isCompactLayout) {
      localStorage.setItem("compact", false);
    } else {
      localStorage.setItem("compact", true);
    }
    setIsCompactLayout(!isCompactLayout);
    clickSound();
  };

  const deleteMessage = async (messageId) => {
    try {
      await db.collection("messages").doc(messageId).delete();
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <animated.div style={layoutWidthProps} className="py-4 mx-auto">
      <div className="mb-6 mx-4">
        <form
          onSubmit={sendMessage}
          className="flex flex-row bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md px-6 py-3 z-10 max-w-screen-lg mx-auto shadow-md"
        >
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeHolder="please be kind to others..."
            className="flex-1 bg-transparent outline-none"
          />
          <BrowserView>
            <button
              type="button"
              onClick={changeLayout}
              className="dark:hover:bg-gray-700 rounded-md max-w-screen-lg mx-auto px-3 py-px focus-visible:ring focus:none hidden sm:block"
            >
              {isCompactLayout ? <PhoneAndroidIcon /> : <MonitorIcon />}
            </button>
          </BrowserView>
          {/* todo remove mt-0.5 after finding a good submit icon */}
          <button
            type="submit"
            disabled={!formValue}
            className="flex flex-row bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white
                             dark:hover:bg-gray-700 rounded-md max-w-screen-lg mx-auto px-3 mt-0.5 focus-visible:ring focus:none"
          >
            <SubmitIcon />
          </button>
        </form>
      </div>
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <Message
              {...message}
              currentUserUid={uid}
              deleteMessage={deleteMessage}
              messageID={message.id}
            />
          </li>
        ))}
      </ul>
    </animated.div>
  );
};

export default Chat;
