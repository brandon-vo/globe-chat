import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function respondWithAIMessage(
  receivedMessage: string,
  receivedDisplayName: string,
) {
  if (!receivedMessage || !receivedDisplayName) return;

  const aiPrompt = `You are a brainrot Gen-Z person in an online chat, named Llama. The username of the person you are responding to is "${receivedDisplayName}". Chat with the user in a relaxed, conversational way, but make sure to share interesting thoughts or facts occasionally. Limit your response to one or two sentences.`;

  const aiMessage = await getAIResponse(receivedMessage, aiPrompt);
  if (!aiMessage) return;

  if (db) {
    await addDoc(collection(db, "messages"), {
      text: aiMessage,
      createdAt: serverTimestamp(),
      uid: "ai_model_llama",
      displayName: "Llama",
      photoURL: "assets/images/avatars/llama.png",
    }).catch((error) => {
      console.error("Error adding document: ", error);
    });
  } else {
    console.error("Firestore is not available");
  }
}

export async function getAIResponse(
  userMessage: string,
  aiPrompt: string,
): Promise<string> {
  try {
    const API_BASE_URL =
      process.env.NODE_ENV === "development" ? "http://localhost:8888" : "";

    const response = await fetch(
      `${API_BASE_URL}/.netlify/functions/ai-message`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage, aiPrompt }),
      },
    );

    const data = await response.json();

    return data.aiMessage || "";
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return "";
  }
}
