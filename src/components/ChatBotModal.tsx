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
import { memo, useCallback, useMemo, useRef, useState } from "react";
import ChatBotBubble from "./ChatBotBubble";
import { ScrollArea } from "./ui/scroll-area";

interface DialogItem {
  teller: string;
  message: string;
  time: Date;
}

interface PlanItem {
  name: string;
  link: string;
}

function ChatBotModal() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [input, setInput] = useState("");
  const [responseBlocks, setResponseBlocks] = useState<(string | PlanItem)[]>([]);
  const [links, setLinks] = useState("");
  const [response, setResponse] = useState("");

  const dialog: DialogItem[] = useMemo(() => [], []);

  const itemIndexRef = useRef(0);
  const itemsRef = useRef<PlanItem[]>([]);
  const jsonParsedRef = useRef(false);
  const textBufferRef = useRef("");
  const currentTextRef = useRef("");
  const isNewLineRef = useRef(true);

  const handleClick = useCallback(async () => {
    setResponse("");
    setResponseBlocks([]);
    itemIndexRef.current = 0;
    itemsRef.current = [];
    textBufferRef.current = "";
    currentTextRef.current = "";
    jsonParsedRef.current = false;
    isNewLineRef.current = true;
    setLinks("");

    const message = inputRef.current?.value ?? "";
    dialog.push({
      teller: "user",
      message,
      time: new Date(),
    });

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.body) {
      setResponseBlocks(["❌ 응답이 없습니다."]);
      return;
    }

    setInput("");

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        dialog.push({
          teller: "chatBot",
          message: response,
          time: new Date(),
        });
        break;
      }

      const chunk = decoder.decode(value, { stream: true });

      // JSON 구문 분석 (첫 줄)
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

      // 스트리밍된 텍스트 처리
      for (const char of chunk) {
        if (char === "\n") {
          const fullLine = currentTextRef.current;
          const trimmedLine = fullLine.trim();
          currentTextRef.current = "";
          isNewLineRef.current = true;

          if (trimmedLine) {
            setResponseBlocks((prev) => {
              const last = prev[prev.length - 1];
              if (typeof last === "string" && last.trim() === trimmedLine) return prev;
              return [...prev, fullLine];
            });

            if (trimmedLine.startsWith("-") && itemIndexRef.current < itemsRef.current.length) {
              const plan = itemsRef.current[itemIndexRef.current];
              setResponseBlocks((prev) => {
                const last = prev[prev.length - 1];
                if (typeof last !== "string" && last?.name === plan.name) return prev;
                return [...prev, plan];
              });
              itemIndexRef.current++;
            }
          }
        } else {
          currentTextRef.current += char;

          if (isNewLineRef.current) {
            setResponseBlocks((prev) => [...prev, char]);
            isNewLineRef.current = false;
          } else {
            setResponseBlocks((prev) => {
              const last = prev[prev.length - 1];
              if (typeof last === "string") {
                return [...prev.slice(0, -1), last + char];
              } else {
                return [...prev, char];
              }
            });
          }

          setResponse((prev) => prev + char);
          await new Promise((r) => setTimeout(r, 5));
        }
      }
    }
  }, [dialog, response, links]);

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
          <div className="p-4 pb-0 pt-8 h-[100%]">
            <ScrollArea className="flex flex-col gap-2 w-full h-[50%]">
              {dialog.map((item) => (
                <ChatBotBubble
                  key={`${item.time}_${item.teller}`}
                  message={item.message}
                  teller={item.teller}
                  time={item.time}
                />
              ))}
              {responseBlocks && (
                <ChatBotBubble
                  key={`block-response`}
                  block={responseBlocks}
                  teller="chatBot"
                  time={new Date()}
                />
              )}
            </ScrollArea>
          </div>
          <DrawerFooter className="flex flex-row h-fit w-full absolute bottom-1">
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
