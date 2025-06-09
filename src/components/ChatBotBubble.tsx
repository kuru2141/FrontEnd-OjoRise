"use client";
import { memo } from "react";
import { format } from "date-fns";

interface ChatBotBubbleProp {
  teller: string;
  message?: string;
  block?: (
    | string
    | {
        name: string;
        link: string;
      }
  )[];
  time: Date;
}

function ChatBotBubble({ message, teller, block, time }: ChatBotBubbleProp) {
  console.log("time", time, block);
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
        {message && message}
        {block &&
          block.map((item, i) =>
            typeof item === "string" ? (
              item
            ) : (
              <a
                key={`plan-${item.name}-${i}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block my-2 bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded text-center shadow"
              >
                {item.name} 가입하러 가기
              </a>
            )
          )}
      </div>
    </div>
  );
}

export default memo(ChatBotBubble);
