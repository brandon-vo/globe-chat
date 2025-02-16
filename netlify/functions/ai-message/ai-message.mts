import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const AIMessage = async (request: Request) => {
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

    const { userMessage, aiPrompt } = await request.json();
    const missingFields: string[] = [];
    if (!userMessage) missingFields.push("userMessage");
    if (!aiPrompt) missingFields.push("aiPrompt");

    if (missingFields.length > 0) {
      return new Response(`Missing fields: ${missingFields.join(", ")}`, {
        status: 400,
      });
    }

    const completion = await client.chat.completions.create({
      messages: [
        {
          role: "system",
          content: aiPrompt,
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

export default AIMessage;
