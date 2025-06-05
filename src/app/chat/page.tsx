"use client";

import { useState } from "react";

export default function ChatTestRoute() {
  const [response, setResponse] = useState("");

  const handleClick = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: "너는 누구니?" }),
    });
    const data = await res.json();
    setResponse(data.message || data.error);
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-5 justify-center items-center">
      <button className="border" onClick={handleClick}>
        전송
      </button>
      <p>응답: {response}</p>
    </div>
  );
}
