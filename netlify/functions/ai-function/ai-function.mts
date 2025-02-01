import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
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

    const { userMessage } = await request.json();
    if (!userMessage) {
      return new Response("Missing userMessage", { status: 400 });
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a brainrot gen-z person in an online chat, named Llama. Talk to the user. Keep responses natural and conversational. Limit your response to one or two sentences.",
          // "You are a friendly person in an online chat, named Llama. Talk to the user. Match the language style of the user, including formality, slang, and sentence structure. Keep responses natural and conversational by giving an interesting fact. Limit your response to one or two sentences.",
        },
        { role: "user", content: userMessage },
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
