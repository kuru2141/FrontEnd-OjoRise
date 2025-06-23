"use client";

import { Send, X, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "../../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../ui/drawer";
import { Input } from "../../ui/input";
import { KeyboardEvent, memo, useCallback, useEffect, useRef, useState } from "react";
import ChatBotBubble from "./ChatBotBubble";
import { ScrollArea } from "../../ui/scroll-area";
import { useMutation } from "@tanstack/react-query";
import { useProgressing } from "@/stores/progressStore";
import LoadingLine from "../progress/LoadingLine";
import { throttle } from "lodash";
import { UserProfile } from "@/types/UserProfile";

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
  block: [
    `LG U+ 요금제 추천 도우미입니다.\n데이터 사용량, 가족 결합 여부, 요금 고민 등을 말씀해 주세요.\n\n예:\n- 유튜브를 자주 봐요\n- 가족 결합할 예정이에요\n- 무제한 요금제 쓰고 싶어요`,
  ],
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
  const statusRef = useRef(false);
  const messageField = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);
  const [disableButton, SetDisableButton] = useState(false);
  const [ambiguousCount, setAmbiguousCount] = useState(0);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    birthdate: "",
    telecomProvider: "",
    planName: "",
    familyBundle: "",
    tongResult: "",
    ambiguousCount: 0,
  });

  useEffect(() => {
    setUserProfile({
      birthdate: "1999-03-16",
      telecomProvider: "SKT",
      planName: "5GX 프리미엄(넷플릭스)",
      familyBundle: "결합이 없어요",
      tongResult: "중간값 장인",
      ambiguousCount: 0,
    });
  }, []);

  const { setIsLoading } = useProgressing();

  const scrollToBottom = () => {
    messageField.current?.scrollIntoView({ behavior: "smooth" });
  };

  const throttledUpdateDialog = useRef(
    throttle((botBlock: DialogItem["block"]) => {
      setDialog((prev) => {
        const lastIndex = prev.length - 1;
        const updated = [...prev];
        updated[lastIndex] = {
          ...updated[lastIndex],
          block: [...botBlock],
        };
        return updated;
      });
    }, 200)
  ).current;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (message: string) => {
      setDialog((prev) => {
        const lastIndex = prev.length - 1;
        const newEntry: DialogItem = {
          teller: "chatbot",
          block: [],
          time: new Date(),
        };
        return prev[lastIndex].teller === "user"
          ? [...prev, newEntry]
          : [...prev.slice(0, -1), newEntry];
      });

      const res = await fetch("http://localhost:8000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: message, userProfile }),
      });

      if (!res.body) {
        const errorBlock = ["❌ 응답이 없습니다."];
        setDialog((prev) => [...prev, { teller: "chatbot", block: errorBlock, time: new Date() }]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const botBlock: DialogItem["block"] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          if (botBlock.length === 0) {
            if (ambiguousCount < 3) botBlock.push("질문을 잘 알아듣지 못했어요.");
            else botBlock.push("질문을 잘 알아듣지 못했어요. 고객센터로 연결해드리겠습니다.");
          }
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
              if (typeof parsed.status === "boolean") {
                statusRef.current = parsed.status;
                setAmbiguousCount((prev) => (parsed.status ? 0 : prev + 1));
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

              if (trimmedLine.startsWith("-")) {
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
    SetDisableButton(true);
    const message = input.trim();
    if (!message) return;

    setInput("");
    itemIndexRef.current = 0;
    itemsRef.current = [];
    textBufferRef.current = "";
    currentTextRef.current = "";
    jsonParsedRef.current = false;
    isNewLineRef.current = true;

    setDialog((prev) => [...prev, { teller: "user", block: [message], time: new Date() }]);

    try {
      await mutateAsync(message);
    } catch (err) {
      console.error("GPT 호출 오류:", err);
    }

    SetDisableButton(false);
  }, [input, mutateAsync]);

  const handleEnter = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && !disableButton && handleClick(),
    [handleClick, disableButton]
  );

  const handleZoom = useCallback(() => {
    setZoom(!zoom);
  }, [zoom]);

  return (
    <Drawer modal={false}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent
        className={`${
          zoom
            ? "fixed top-0 left-0 max-w-[100%] h-screen z-50 bg-white"
            : "w-1/2 max-w-[650px] h-screen"
        } ml-auto pr-2 pl-2 flex flex-col`}
      >
        <DrawerHeader className="flex flex-row justify-between border-b border-gray-200">
          <div onClick={handleZoom}>
            {zoom ? (
              <Minimize2 className="text-gray-600" />
            ) : (
              <Maximize2 className="text-gray-600" />
            )}
          </div>
          <div className="flex flex-col items-center w-full">
            <DrawerTitle>챗봇</DrawerTitle>
            <DrawerDescription>요금제 추천을 받아보세요.</DrawerDescription>
          </div>
          <DrawerClose className="hover:cursor-pointer h-fit">
            <X className="text-gray-600" />
          </DrawerClose>
        </DrawerHeader>

        <div className="flex-1 overflow-y-auto px-1 pt-4">
          <ScrollArea className="flex flex-col gap-2 w-full pr-3">
            {dialog.map((item, i) => (
              <ChatBotBubble
                key={`dialog-${i}`}
                teller={item.teller}
                block={item.block}
                time={item.time}
              >
                {<LoadingLine isShow={dialog.length - 1 === i && item.block.length === 0} />}
              </ChatBotBubble>
            ))}
            <div ref={messageField} />
          </ScrollArea>
        </div>

        <DrawerFooter className="flex flex-row items-center gap-2 sticky bottom-0 bg-white pt-2 pb-4">
          <Input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="border px-2 py-1"
            placeholder="메시지를 입력하세요"
            onKeyDown={handleEnter}
          />
          <Button onClick={handleClick} disabled={disableButton}>
            <Send />
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default memo(ChatBotModal);
