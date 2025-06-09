"use client";

import { Send, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import ChatBotBubble from "./ChatBotBubble";
import { ScrollArea } from "./ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { useProgressing } from "@/stores/progressStore";
import LoadingLine from "./common/LoadingLine";

interface DialogItem {
  teller: "user" | "chatbot";
  block: (string | PlanItem)[];
  time: Date;
}

interface PlanItem {
  name: string;
  link: string;
}

function ChatBotModal() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  const [dialog, setDialog] = useState<DialogItem[]>([]);

  const itemIndexRef = useRef(0);
  const itemsRef = useRef<PlanItem[]>([]);
  const jsonParsedRef = useRef(false);
  const textBufferRef = useRef("");
  const currentTextRef = useRef("");
  const isNewLineRef = useRef(true);

  const { setIsLoading } = useProgressing();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (message: string) => {
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

      const updateDialog = () => {
        setDialog((prev): DialogItem[] => {
          const lastIndex = prev.length - 1;
          const newEntry: DialogItem = {
            teller: "chatbot",
            block: [...botBlock],
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
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          updateDialog();
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
                updateDialog();
              }

              if (trimmedLine.startsWith("-") && itemIndexRef.current < itemsRef.current.length) {
                const plan = itemsRef.current[itemIndexRef.current];
                botBlock.push(plan);
                itemIndexRef.current++;
                updateDialog();
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

            updateDialog();
            await new Promise((r) => setTimeout(r, 5));
          }
        }
      }
    },
  });

  useEffect(() => {
    setIsLoading(isPending);
  }, [isPending, setIsLoading]);

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

  return (
    <Drawer modal={false}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="w-1/2 max-w-1/2 h-screen bg-gray-400">
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
          <div className="p-4 pb-0 pt-8 h-full">
            <ScrollArea className="flex flex-col gap-2 w-full h-[80%]">
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
            </ScrollArea>
          </div>
          <DrawerFooter className="flex flex-row h-fit w-full absolute bottom-1 bg-white">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="border px-2 py-1"
              placeholder="메시지를 입력하세요"
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
