import { userRequest } from "@/types/chatbot";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY!,
  organization: process.env.OPENAI_ORGANIZATION_ID!,
});

export const POST = async (req: Request) => {
  try {
    const request: userRequest = await req.json(); // 이름 충돌 방지

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        { role: "system", content: request.prompt },
        { role: "user", content: request.message },
      ],
    });

    const full = completion.choices[0].message?.content ?? "";

    // JSON 형식 파싱
    const parsed = JSON.parse(full);
    // const messageText = parsed.message;
    // const items = parsed.item;

    return new Response(JSON.stringify(parsed), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (error) {
    console.error("GPT 처리 오류:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
};
