import type { Config } from "@netlify/functions";
import admin from "firebase-admin";
import OpenAI from "openai";
import { openings, topics } from "../../prompt";

if (!admin.apps.length) {
  try {
    const serviceAccount = JSON.parse(
      process.env.FIREBASE_SERVICE_ACCOUNT || "{}",
    );
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.error("Error initializing Firebase:", error);
  }
}

const db = admin.firestore();
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const ScheduledAIFunction = async () => {
  // Should run once a day on average
  if (Math.random() > 1 / 24) {
    return new Response("Skipped: Randomized delay", { status: 200 });
  }

  try {
    if (!db) throw new Error("Firestore database not initialized.");

    const randomTopic = topics[Math.floor(Math.random() * topics.length)];
    const topicOpening = openings[Math.floor(Math.random() * openings.length)];
    const isLonely = Math.random() < 0.6;

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a brainrot Gen-Z person named Llama in an online chat.
          ${isLonely ? "You are lonely." : `Drop an interesting fact in the chat about the topic: ${randomTopic}`}.`,
        },
        {
          role: "user",
          content: `${
            isLonely
              ? "You are the only person online. Express that you are lonely to the chat"
              : `Using the opening, ${topicOpening}, drop a fact about the topic: ${randomTopic}`
          }`,
        },
      ],
      model: "llama-3.1-8b-instant",
    });

    const aiMessage = completion.choices[0]?.message?.content || "";

    await db.collection("messages").add({
      text: aiMessage,
      createdAt: admin.firestore.Timestamp.now(),
      uid: "ai_model_llama",
      displayName: "Llama",
      photoURL:
        "https://firebasestorage.googleapis.com/v0/b/globe-chat-6a8fd.appspot.com/o/profile_pictures%2Fllama.png?alt=media&token=b2b3d0f2-4935-4fe6-8970-20a0c8e5adf4",
    });

    return new Response("AI message successfully sent.", { status: 200 });
  } catch (error) {
    console.error("Scheduled AI function error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const config: Config = {
  schedule: "@hourly",
};

export default ScheduledAIFunction;
