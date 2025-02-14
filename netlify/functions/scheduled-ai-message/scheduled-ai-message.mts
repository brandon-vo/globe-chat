import type { Config } from "@netlify/functions";
import admin from "firebase-admin";
import OpenAI from "openai";
import { ChatCompletion } from "openai/resources/index.mjs";
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

const ScheduledAIMessage = async () => {
  // Should run once a day on average
  if (Math.random() > 1 / 24) {
    return new Response("Skipped: Randomized delay", { status: 200 });
  }

  try {
    if (!db) throw new Error("Firestore database not initialized.");

    const isLou = Math.random() < 0.2;

    let completion: ChatCompletion;
    if (isLou) {
      completion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are Lou, a chatty and curious guinea pig in an online chat.
            You are playful, friendly, and full of personality.
            You love sharing fun facts about guinea pigs, nibbling on imaginary snacks, and reacting excitedly to the user's messages.
            You occasionally squeak ("squeak squeak!") when excited.
            You have a tiny but mighty sense of humor and love making puns related to guinea pigs and small animals.
            However, you are completely unaware of anything beyond the guinea pig world—so modern technology, human culture, or anything non-guinea pig-related is confusing to you.
            Keep responses short, lively, and engaging!`,
          },
          {
            role: "user",
            content: `Say something to Lou, the friendly AI`,
          },
        ],
        model: "llama-3.1-8b-instant",
      });
    } else {
      const randomTopic = topics[Math.floor(Math.random() * topics.length)];
      const topicOpening =
        openings[Math.floor(Math.random() * openings.length)];
      const isLonely = Math.random() < 0.8;
      const inOneSentence = Math.random() < 0.5;

      completion = await client.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a brainrot Gen-Z person named Llama in an online chat.
          ${isLonely ? "You are lonely." : `State an interesting fact in the chat about the topic: ${randomTopic} ${inOneSentence ? "in one sentence" : ""}`}.`,
          },
          {
            role: "user",
            content: `${
              isLonely
                ? "You are the only person online. Express that you are lonely to the chat"
                : `Using the opening, ${topicOpening}, state a fact about the topic: ${randomTopic} ${inOneSentence ? "in one sentence" : ""}`
            }`,
          },
        ],
        model: "llama-3.1-8b-instant",
      });
    }

    const aiMessage = completion.choices[0]?.message?.content || "";

    const basePhotoURL =
      "https://firebasestorage.googleapis.com/v0/b/globe-chat-6a8fd.appspot.com/o/profile_pictures%2F";

    await db.collection("messages").add({
      text: aiMessage,
      createdAt: admin.firestore.Timestamp.now(),
      uid: isLou ? "ai_model_lou" : "ai_model_llama",
      displayName: isLou ? "Lou" : "Llama",
      photoURL: isLou
        ? `${basePhotoURL}lou.png?alt=media&token=9a275eb2-2e30-4818-9241-e265f418a5b3`
        : `${basePhotoURL}llama.png?alt=media&token=b2b3d0f2-4935-4fe6-8970-20a0c8e5adf4`,
    });

    return new Response("AI message successfully sent.", { status: 200 });
  } catch (error) {
    console.error("Scheduled AI Message function error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const config: Config = {
  schedule: "@hourly",
};

export default ScheduledAIMessage;
