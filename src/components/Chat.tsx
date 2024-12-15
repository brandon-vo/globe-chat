import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import Message from "./Message";
import useSound from "use-sound";
import Filter from "bad-words";
import sounds from "../helpers/getSounds";
import { SubmitIcon } from "./Icon";

interface ChatProps {
  user?: any;
  db?: any;
}

interface MessageType {
  id: string;
  text: string;
  createdAt: any;
  uid: string;
  displayName: string;
  photoURL: string;
}

const Chat = ({ user, db }: ChatProps) => {
  // Messages
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [formValue, setFormValue] = useState<string>("");

  // Sounds
  const [messageSound] = useSound(sounds.message, { volume: 0.4 });

  const { uid, displayName, photoURL } = user;

  const profanityFilter = new Filter(); // Filter profanity out

  const [lastMessageTime, setLastMessageTime] = useState<number | null>(null);
  const messageCooldown = 500; // 500 ms

  const firestore = getFirestore();

  // Listen to all messages
  useEffect(() => {
    if (db) {
      const messagesRef = collection(firestore, "messages");
      const q = query(messagesRef, orderBy("createdAt", "desc"), limit(75));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMessages(data as MessageType[]);
      });
      return unsubscribe;
    }
  }, [db, firestore]);

  const onMessageCooldown = () => {
    if (!lastMessageTime) return true;

    const currentTime = new Date().getTime();
    return currentTime - lastMessageTime >= messageCooldown;
  };

  // Sending a message
  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // TODO: make a custom alert component for all of these alerts
    if (!onMessageCooldown()) {
      return alert("Slow down!");
    }

    // Check if message contains over 1000 characters
    if (formValue.length > 1000)
      return alert(
        "You cannot send a message that is longer than 1000 characters",
      );

    // Check if message is empty
    if (!formValue.trim().length) {
      return alert("You cannot send an empty message");
    }

    const message = profanityFilter.clean(formValue); // Filter profanity out

    // Adding to messages collection
    if (db) {
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, {
        text: message,
        createdAt: serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
    }
    setFormValue(""); // Clear text after submit
    messageSound();
    setLastMessageTime(new Date().getTime());
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const messageRef = doc(db, "messages", messageId); // Get a reference to the document
      await deleteDoc(messageRef); // Delete the document
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className="py-4 max-w-screen-lg mx-auto">
      <div className="mb-6 mx-4">
        <form
          onSubmit={sendMessage}
          className="flex flex-row bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md px-6 py-3 z-10 max-w-screen-lg mx-auto shadow-md"
        >
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="please be kind to others..."
            className="flex-1 bg-transparent outline-none"
          />
          {/* todo remove mt-0.5 after finding a good submit icon */}
          <button
            type="submit"
            disabled={!formValue}
            className="flex flex-row bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white
                      dark:hover:bg-gray-700 rounded-md max-w-screen-lg mx-auto px-3
                      focus-visible:ring focus:none mt-0.5"
          >
            <SubmitIcon />
          </button>
        </form>
      </div>
      <ul>
        {messages.map((message: any) => (
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
    </div>
  );
};

export default Chat;
