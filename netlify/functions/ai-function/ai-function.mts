import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export default async (request: Request) => {
  try {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      });
    }

    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const { userMessage, username } = await request.json();
    if (!userMessage) {
      return new Response("Missing userMessage", { status: 400 });
    }
    if (!username) {
      return new Response("Missing username", { status: 400 });
    }

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a brainrot gen-z person in an online chat, named Llama. The username of the person you are responding to is "${username}". Chat with the user in a relaxed, conversational way, but make sure to share interesting thoughts or facts occasionally. Limit your response to one or two sentences.`,
          // "You are a friendly person in an online chat, named Llama. Talk to the user. Match the language style of the user, including formality, slang, and sentence structure. Keep responses natural and conversational by giving an interesting fact. Limit your response to one or two sentences.",
        },
        { role: "user", content: `${userMessage}` },
      ],
      // model: "llama-3.3-70b-versatile",
      model: "llama-3.1-8b-instant",
    });

    const aiMessage = completion.choices[0]?.message?.content || "";

    return new Response(JSON.stringify({ aiMessage }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Groq API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
