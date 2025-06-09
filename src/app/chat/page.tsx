"use client";

import { useState } from "react";

export default function ChatTestRoute() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleClick = async () => {
    setResponse("");

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.body) {
      setResponse("No response body.");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      setResponse((prev) => prev + chunk);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border px-2 py-1"
          placeholder="메시지를 입력하세요"
        />
        <button className="border px-4 py-2" onClick={handleClick}>
          전송
        </button>
      </div>
      <p>응답: {response}</p>
    </div>
  );
}
