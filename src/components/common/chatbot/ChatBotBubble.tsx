"use client";
import { memo, PropsWithChildren } from "react";
import { format } from "date-fns";

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
    <div className={`flex flex-col ${teller === "user" ? "items-end" : ""} pb-2`}>
      <div className={`flex ${teller === "user" ? "flex-row-reverse" : "flex-row"} pb-1 space-x-2`}>
        <div className="pl-1 pr-2 text-xs text-gray-500">
          {Number(format(time, "H")) >= 12 ? "오후" : "오전"} {format(time, "h:mm")}
        </div>
      </div>
      <div
        className={
          teller === "user"
            ? "bg-(--color-primary-medium) mr-1 max-w-[300px] break-words whitespace-pre-wrap p-2 rounded items-end"
            : "bg-gray-200 ml-1 max-w-[300px] break-words whitespace-pre-wrap p-2 rounded"
        }
      >
        {children}
        {block.map((item, i) =>
          typeof item === "string" ? (
            <span key={`text-${i}`}>
              {item}
              <br />
            </span>
          ) : (
            <a
              key={`plan-${item.name}-${i}`}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block my-2 bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded text-center shadow"
            >
              {item.name} 가입하러 가기
              <br />
            </a>
          )
        )}
      </div>
    </div>
  );
}

export default memo(ChatBotBubble);
