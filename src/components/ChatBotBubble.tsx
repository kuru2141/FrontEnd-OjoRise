"use client";
import { memo } from "react";
import { format } from "date-fns";

interface ChatBotBubbleProp {
  teller: string;
  message: string;
  time: Date;
}

function ChatBotBubble({ message, teller, time }: ChatBotBubbleProp) {
  console.log("time", time);
  return (
    <div className={!message ? "hidden" : ""}>
      <div className="flex flex-row pb-1 space-x-2">
        <div>{teller}</div>
        <div>{format(time, "HH:mm:ss")}</div>
      </div>
      <div
        className={
          teller === "user" ? "bg-yellow-300 mr-1 max-w-[100px]" : "bg-gray-300 ml-1 max-w-[100px]"
        }
      >
        {message}
      </div>
    </div>
  );
}

export default memo(ChatBotBubble);
