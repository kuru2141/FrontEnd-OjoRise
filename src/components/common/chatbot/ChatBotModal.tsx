"use client";

import { Send, X } from "lucide-react";
import { KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import ChatBotBubble from "./ChatBotBubble";
import { useMutation } from "@tanstack/react-query";
import { useProgressing } from "@/stores/progressStore";
import { throttle } from "lodash";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingLine from "../progress/LoadingLine";
import { Input } from "@/components/ui/input";

interface DialogItem {
  teller: "user" | "chatbot";
  block: (string | PlanItem)[];
  time: Date;
}

interface PlanItem {
  name: string;
  link: string;
}

const initialDialog: DialogItem = {
  teller: "chatbot",
  block: ["초기 프롬프트"],
  time: new Date(),
};

function ChatBotModal() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  const [dialog, setDialog] = useState<DialogItem[]>([initialDialog]);

  const itemIndexRef = useRef(0);
  const itemsRef = useRef<PlanItem[]>([]);
  const jsonParsedRef = useRef(false);
  const textBufferRef = useRef("");
  const currentTextRef = useRef("");
  const isNewLineRef = useRef(true);
  const messageField = useRef<HTMLDivElement>(null);

  const { setIsLoading } = useProgressing();

  const scrollToBottom = () => {
    messageField.current?.scrollIntoView({ behavior: "smooth" });
  };

  const throttledUpdateDialog = useRef(
    throttle((botBlock: DialogItem["block"]) => {
      setDialog((prev): DialogItem[] => {
        const lastIndex = prev.length - 1;
        const newEntry: DialogItem = {
          teller: "chatbot",
          block: [...botBlock],
          time: new Date(),
        };
        const updated = [...prev];
        updated[lastIndex] = newEntry;
        return updated;
      });
    }, 200) // 100ms 주기로 setDialog 호출
  ).current;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (message: string) => {
      setDialog((prev): DialogItem[] => {
        const lastIndex = prev.length - 1;
        const newEntry: DialogItem = {
          teller: "chatbot",
          block: [],
          time: new Date(),
        };
        if (prev[lastIndex].teller === "user") {
          return [...prev, newEntry];
        } else {
          const updated = [...prev];
          updated[lastIndex] = newEntry;
          return updated;
        }
      });

      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.body) {
        const errorBlock = ["❌ 응답이 없습니다."];
        setDialog((prev) => [...prev, { teller: "chatbot", block: errorBlock, time: new Date() }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      const botBlock: DialogItem["block"] = [];

      // const updateDialog = () => {
      //   setDialog((prev): DialogItem[] => {
      //     const lastIndex = prev.length - 1;
      //     const newEntry: DialogItem = {
      //       teller: "chatbot",
      //       block: [...botBlock],
      //       time: new Date(),
      //     };

      //     const updated = [...prev];
      //     updated[lastIndex] = newEntry;
      //     return updated;
      //   });
      // };

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          throttledUpdateDialog(botBlock);
          break;
        }

        const chunk = decoder.decode(value, { stream: true });

        if (!jsonParsedRef.current) {
          textBufferRef.current += chunk;
          const newlineIndex = textBufferRef.current.indexOf("\n");
          if (newlineIndex !== -1) {
            const jsonLine = textBufferRef.current.slice(0, newlineIndex);
            textBufferRef.current = textBufferRef.current.slice(newlineIndex + 1);
            try {
              const parsed = JSON.parse(jsonLine);
              if (Array.isArray(parsed.item)) {
                itemsRef.current = parsed.item;
                jsonParsedRef.current = true;
              }
            } catch {
              continue;
            }
          }
          continue;
        }

        for (const char of chunk) {
          if (char === "\n") {
            const fullLine = currentTextRef.current;
            const trimmedLine = fullLine.trim();
            currentTextRef.current = "";
            isNewLineRef.current = true;

            if (trimmedLine) {
              const last = botBlock[botBlock.length - 1];
              if (!(typeof last === "string" && last.trim() === trimmedLine)) {
                botBlock.push(fullLine);
                throttledUpdateDialog(botBlock);
              }

              if (trimmedLine.startsWith("-") && itemIndexRef.current < itemsRef.current.length) {
                const plan = itemsRef.current[itemIndexRef.current];
                botBlock.push(plan);
                itemIndexRef.current++;
                throttledUpdateDialog(botBlock);
              }
            }
          } else {
            currentTextRef.current += char;

            if (isNewLineRef.current) {
              botBlock.push(char);
              isNewLineRef.current = false;
            } else {
              const last = botBlock[botBlock.length - 1];
              if (typeof last === "string") {
                botBlock[botBlock.length - 1] = last + char;
              } else {
                botBlock.push(char);
              }
            }

            throttledUpdateDialog(botBlock);
            await new Promise((r) => setTimeout(r, 5));
          }
        }
      }
    },
  });

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);

  useEffect(() => scrollToBottom(), [dialog]);

  const handleClick = useCallback(async () => {
    const message = inputRef.current?.value ?? "";
    if (!message.trim()) return;

    setInput("");
    itemIndexRef.current = 0;
    itemsRef.current = [];
    textBufferRef.current = "";
    currentTextRef.current = "";
    jsonParsedRef.current = false;
    isNewLineRef.current = true;

    setDialog((prev) => [...prev, { teller: "user", block: [message], time: new Date() }]);

    mutateAsync(message);
  }, [mutateAsync]);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleClick(),
    [handleClick]
  );

  return (
    <Drawer modal={false}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="w-1/2  max-w-[650px] h-screen ml-auto">
        <div>
          <DrawerHeader className="flex flex-row justify-between">
            <div>
              <DrawerTitle>ChatBot</DrawerTitle>
              <DrawerDescription>요금제 추천을 받아보세요.</DrawerDescription>
            </div>
            <DrawerClose className="hover:cursor-pointer">
              <X />
            </DrawerClose>
          </DrawerHeader>
          <div className="p-4 pb-0 pt-5 h-full  bg-gray-400 ">
            <ScrollArea className="flex flex-col gap-2 w-full h-[560px]">
              {dialog.map((item, i) => {
                console.log("qqq", item);
                return (
                  <ChatBotBubble
                    key={`dialog-${i}`}
                    teller={item.teller}
                    block={item.block}
                    time={item.time}
                  >
                    {<LoadingLine isShow={dialog.length - 1 === i && item.block.length === 0} />}
                  </ChatBotBubble>
                );
              })}
              <div ref={messageField} />
            </ScrollArea>
          </div>
          <DrawerFooter className="flex flex-row h-fit w-full absolute bottom-0 bg-white">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border px-2 py-1"
              placeholder="메시지를 입력하세요"
              onKeyDown={handleEnter}
            />
            <Button className="hover:cursor-pointer" onClick={handleClick}>
              <Send />
            </Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default memo(ChatBotModal);
