"use client";
import { memo, PropsWithChildren } from "react";
import { format } from "date-fns";
import Image from "next/image";

interface ChatBotBubbleProp {
  teller: "user" | "chatbot";
  block: (
    | string
    | File
    | {
        name: string;
        link: string;
      }
  )[];
  time: Date;
  nextTeller: string;
  prevTeller: string;
  zoom: boolean;
  isMobile: boolean;
}

function ChatBotBubble({
  teller,
  block,
  time,
  nextTeller,
  prevTeller,
  zoom,
  children,
  isMobile,
}: PropsWithChildren<ChatBotBubbleProp>) {
  type ChatBlock = string | File | { name: string; link: string };
  const isLink = (item: ChatBlock): item is { name: string; link: string } =>
    typeof item === "object" && "link" in item;

  const mergedBlocks: ChatBlock[][] = [];
  let tempGroup: ChatBlock[] = [];

  block.forEach((item, idx) => {
    tempGroup.push(item);
    const isLast = idx === block.length - 1;
    if (isLink(item)) {
      mergedBlocks.push(tempGroup);
      tempGroup = [];
    } else if (isLast && tempGroup.length > 0) {
      mergedBlocks.push(tempGroup);
    }
  });

  if (mergedBlocks.length === 0) mergedBlocks.push([]);

  const showChildren =
    block.length === 0 && mergedBlocks.length === 1 && mergedBlocks[0].length === 0;

  return (
    <div>
      {mergedBlocks.map((group, groupIdx) => {
        const isPlanGroup = group.some((v) => isLink(v));
        const titleIndex = isPlanGroup ? group.findIndex((v) => typeof v === "string") : -1;

        return (
          <div
            key={`bubble-${groupIdx}`}
            className={`flex ${
              teller === "user" ? "flex-row-reverse items-end" : "flex-row"
            } w-full mb-2`}
          >
            <div className="flex items-start">
              <div className="flex w-fit h-fit items-end gap-2">
                {groupIdx === 0 && teller === "chatbot" && teller !== prevTeller ? (
                  <div className="w-[48px] h-[48px]">
                    <Image src="/chatbot.svg" alt="chatbot" width={48} height={48} />
                  </div>
                ) : teller === "chatbot" ? (
                  <div className="w-[48px] h-[48px]" />
                ) : null}
              </div>
            </div>

            <div
              className={`${teller === "user" ? "items-end" : ""} flex flex-col gap-1 pb-1 w-full`}
            >
              <div className={`flex gap-2 pl-1 ${teller === "user" ? "justify-end" : ""}`}>
                {groupIdx === 0 && teller === "chatbot" && teller !== prevTeller ? (
                  <p className="flex items-end leading-none text-[14px] font-bold">홀맨</p>
                ) : (
                  <div />
                )}
                {groupIdx === 0 && teller !== prevTeller ? (
                  <div className="flex items-end leading-none pr-2 text-[14px] text-gray-500">
                    {Number(format(time, "H")) >= 12 ? "오후" : "오전"} {format(time, "h:mm")}
                  </div>
                ) : (
                  <div />
                )}
              </div>

              <div
                className={`p-3 pt-2 text-[16px] ${
                  teller === "user" ? "text-white bg-primary-medium" : "bg-white"
                } ml-1 mt-1 rounded-[16px] break-words whitespace-pre-wrap
                  ${teller === "user" ? "rounded-tr-[0px]" : "rounded-tl-[0px]"}
                  ${teller === prevTeller || groupIdx !== 0 ? "rounded-t-[0px]" : ""}
                  ${
                    teller === nextTeller || groupIdx !== mergedBlocks.length - 1
                      ? "rounded-b-[0px]"
                      : ""
                  }
                  ${zoom ? "max-w-2/5" : isMobile ? "max-w-full" : "max-w-2/3"}`}
              >
                {groupIdx === 0 && showChildren && children}

                {group.map((item, i) => {
                  if (typeof item === "string") {
                    const formattedLines = item
                      .split("\n")
                      .flatMap((line, idx) =>
                        line.trim().startsWith("-")
                          ? [<br key={`br-${i}-${idx}`} />, line.trim().slice(1).trim()]
                          : [line.trim()]
                      );

                    if (isPlanGroup && i === titleIndex) {
                      return (
                        <div key={`title-${groupIdx}-${i}`}>
                          <strong className="text-[20px]">
                            {formattedLines.map((line, idx) =>
                              typeof line === "string" ? <span key={idx}>{line}</span> : line
                            )}
                            <p className="text-[10px]"></p>
                          </strong>
                          <br />
                        </div>
                      );
                    }

                    return (
                      <div key={`text-${groupIdx}-${i}`}>
                        {formattedLines.map((line, idx) =>
                          typeof line === "string" ? <span key={idx}>{line}</span> : line
                        )}
                      </div>
                    );
                  }

                  if (item instanceof File) {
                    return (
                      <Image
                        key={`file-${groupIdx}-${i}`}
                        src={URL.createObjectURL(item)}
                        alt={item.name}
                        width={100}
                        height={150}
                        className="my-2"
                      />
                    );
                  }

                  return (
                    <div key={`link-${groupIdx}-${i}`}>
                      <br />
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block my-2 bg-primary-medium text-white py-2 px-4 rounded text-center shadow"
                      >
                        {item.name} 가입하러 가기
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default memo(ChatBotBubble);
