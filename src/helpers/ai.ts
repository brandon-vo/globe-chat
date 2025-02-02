import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import llamaAvatar from "../assets/images/avatars/llama.png";
import { db } from "../firebase";

export async function respondWithAIMessage(
  receivedMessage: string,
  receivedDisplayName: string,
) {
  if (!receivedMessage) return;

  const aiMessage = await getAIResponse(receivedMessage, receivedDisplayName);
  if (!aiMessage) return;

  if (db) {
    await addDoc(collection(db, "messages"), {
      text: aiMessage,
      createdAt: serverTimestamp(),
      uid: "ai_model_llama",
      displayName: "Llama",
      photoURL: llamaAvatar,
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  } else {
    console.error("Firestore is not available");
  }
}

export async function getAIResponse(
  userMessage: string,
  username: string,
): Promise<string> {
  try {
    const API_BASE_URL =
      process.env.NODE_ENV === "development" ? "http://localhost:8888" : "";

    const response = await fetch(
      `${API_BASE_URL}/.netlify/functions/ai-function`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage, username }),
      },
    );

    const data = await response.json();

    return data.aiMessage || "";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "";
  }
}
