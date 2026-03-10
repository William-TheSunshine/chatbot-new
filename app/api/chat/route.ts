import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.GEMINI_API_KEY!;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents }),
    });

    const data = await res.json();

    if (data.error) {
      console.error("Gemini API error:", data.error);
      return NextResponse.json(
        { error: data.error.message },
        { status: data.error.code || 500 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "응답을 생성할 수 없습니다.";
    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
