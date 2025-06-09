"use client";
import { memo, PropsWithChildren } from "react";
import { format } from "date-fns";
import { useProgressing } from "@/stores/progressStore";
import LoadingLine from "./common/LoadingLine";

interface ChatBotBubbleProp {
  teller: "user" | "chatbot";
  block: (
    | string
    | {
        name: string;
        link: string;
      }
  )[];
  time: Date;
}

function ChatBotBubble({ teller, block, time, children }: PropsWithChildren<ChatBotBubbleProp>) {
  return (
    <div>
      <div className="flex flex-row pb-1 space-x-2">
        <div className="text-xs text-gray-600">{teller}</div>
        <div className="text-xs text-gray-500">{format(time, "HH:mm:ss")}</div>
      </div>
      <div
        className={
          teller === "user"
            ? "bg-yellow-300 mr-1 max-w-[300px] break-words whitespace-pre-wrap p-2 rounded"
            : "bg-gray-300 ml-1 max-w-[300px] break-words whitespace-pre-wrap p-2 rounded"
        }
      >
        {children}
        {block.map((item, i) =>
          typeof item === "string" ? (
            <span key={`text-${i}`}>{item}</span>
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
