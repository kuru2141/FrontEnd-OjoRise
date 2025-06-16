import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_SECRET_KEY!,
  organization: process.env.OPENAI_ORGANIZATION_ID!,
});

export const POST = async (req: Request) => {
  try {
    const { prompt } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      stream: false,
      messages: [{ role: "system", content: prompt }],
    });

    const full = completion.choices[0].message?.content ?? "";

    let parsed;
    try {
      parsed = JSON.parse(full);
    } catch (e) {
      console.error("JSON 파싱 실패:", e);
      throw new Error("응답이 유효한 JSON 형식이 아닙니다.");
    }

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
