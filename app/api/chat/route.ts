import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

const API_KEY = process.env.GEMINI_API_KEY!;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

export async function POST(req: NextRequest) {
  try {
    const { messages, systemPrompt, conversationId, scenarioId } = await req.json();

    // 대화 ID가 없으면 새 대화 생성
    let convId = conversationId;
    if (!convId && scenarioId) {
      const { data, error } = await supabase
        .from("conversations")
        .insert({ scenario_id: scenarioId })
        .select("id")
        .single();
      if (error) console.error("Supabase conversation insert error:", error);
      convId = data?.id;
    }

    const contents = messages.map((msg: { role: string; content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const body: Record<string, unknown> = { contents };

    if (systemPrompt) {
      body.system_instruction = { parts: [{ text: systemPrompt }] };
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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

    // DB에 user + assistant 메시지 저장
    if (convId) {
      const lastUserMsg = messages[messages.length - 1];
      await supabase.from("messages").insert([
        { conversation_id: convId, role: lastUserMsg.role, content: lastUserMsg.content },
        { conversation_id: convId, role: "assistant", content: text },
      ]);
    }

    return NextResponse.json({ message: text, conversationId: convId });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
