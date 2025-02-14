import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getFirestore,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { respondWithAIMessage } from "../helpers/aiMessageHandler";
import sounds from "../helpers/getSounds";
import {
  useAIResponseStore,
  User,
  useUserStore,
  useVolumeStore,
} from "../store";
import Message from "./Message";
import Popup from "./Popup";

interface ChatProps {
  user: User;
  db: Firestore;
}

interface MessageType {
  id: string;
  text: string;
  createdAt: any;
  uid: string;
  displayName: string;
  photoURL: string;
}

const Chat = ({ db }: ChatProps) => {
  // Messages
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [formValue, setFormValue] = useState<string>("");
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false);
  const [messageIDToDelete, setMessageIDToDelete] = useState<string>("");
  const { isMuted } = useVolumeStore();

  // Sounds
  const [messageSound] = useSound(sounds.message, {
    volume: isMuted ? 0 : 0.4,
  });

  const { user } = useUserStore();
  const { isAIResponseEnabled: isAIResponse } = useAIResponseStore();

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

    const message = formValue;

    // Adding to messages collection
    if (db && user) {
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, {
        text: formValue,
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
      });
    }
    setFormValue(""); // Clear text after submit
    messageSound();
    setLastMessageTime(new Date().getTime());

    if (Math.random() < 0.25 && isAIResponse) {
      await respondWithAIMessage(message, user?.displayName || "Anonymous");
    }
  };

  const confirmDelete = async (
    event: React.MouseEvent<HTMLButtonElement>,
    messageId: string,
  ) => {
    if (event.shiftKey) {
      // Direct deletion without confirmation
      try {
        const messageRef = doc(db, "messages", messageId);
        await deleteDoc(messageRef);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    } else {
      setShowConfirmDelete(true);
      setMessageIDToDelete(messageId);
    }
  };

  const deleteMessage = async () => {
    try {
      const messageRef = doc(db, "messages", messageIDToDelete);
      await deleteDoc(messageRef);
    } catch (error) {
      console.error("Error deleting message:", error);
    } finally {
      setShowConfirmDelete(false);
      setMessageIDToDelete("");
    }
  };

  if (!user) {
    return (
      <div className="text-center">
        <p>You are not logged in :|</p>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-screen-lg mx-auto">
      <div className="mb-6 mx-4">
        <form
          onSubmit={sendMessage}
          className="flex flex-row bg-gray-100 dark:bg-gray-600 dark:text-white rounded-md my-3 px-6x z-10 max-w-screen-lg mx-auto shadow-md"
        >
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
            placeholder="please be kind to others..."
            className="flex-1 bg-transparent outline-none px-6"
          />
          <button
            type="submit"
            disabled={!formValue}
            className="flex flex-row h-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-white
              dark:hover:bg-gray-500 rounded-md max-w-screen-lg mx-auto px-5 py-3 focus-visible:ring focus:none rounded-l-none"
          >
            <KeyboardBackspaceIcon style={{ rotate: "180deg" }} />
          </button>
        </form>
      </div>
      <ul>
        {messages.map((message: any) => (
          <li key={message.id}>
            <Message
              {...message}
              currentUserUid={user.uid}
              messageID={message.id}
              confirmDelete={(e: React.MouseEvent<HTMLButtonElement>) =>
                confirmDelete(e, message.id)
              }
            />
          </li>
        ))}
      </ul>

      <Popup
        trigger={showConfirmDelete}
        setTrigger={setShowConfirmDelete}
        confirmMode={true}
        confirmText="Delete"
        onConfirm={deleteMessage}
      >
        <div className="flex flex-col items-center">
          <h2 className="text-lg">
            Are you sure you want to delete this message?
          </h2>
          <p className="text-sm text-gray-700 dark:text-gray-300 gap-1">
            <strong>TIP: </strong> Hold <kbd>Shift</kbd> to delete a message
            without confirmation
          </p>
        </div>
      </Popup>
    </div>
  );
};

export default Chat;
