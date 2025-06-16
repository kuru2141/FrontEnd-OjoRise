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
import { UserProfile } from "@/type/UserProfile";

interface DialogItem {
  teller: "user" | "chatbot";
  block: (string | PlanItem)[]; // 요금제 설명 텍스트 or 버튼
  time: Date;
}

interface PlanItem {
  name: string;
  link: string;
}

const initialDialog: DialogItem = {
  teller: "chatbot",
  block: [
    `LG U+ 요금제 추천 도우미입니다.  
데이터 사용량, 가족 결합 여부, 요금 고민 등을 말씀해 주세요.

예:  
- 유튜브를 자주 봐요  
- 가족 결합할 예정이에요  
- 무제한 요금제 쓰고 싶어요`,
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
  const messageField = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(false);
  const [disableButton, SetDisableButton] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    birthdate: "",
    telecomProvider: "",
    planName: "",
    familyBundle: "",
    tongResult: "",
  });

  useEffect(() => {
    setUserProfile({
      birthdate: "1999-03-16",
      telecomProvider: "SKT",
      planName: "5GX 프리미엄(넷플릭스)",
      familyBundle: "결합이 없어요",
      tongResult: "중간값 장인",
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
        const newEntry: DialogItem = {
          teller: "chatbot",
          block: [...botBlock],
          time: new Date(),
        };
        const updated = [...prev];
        updated[lastIndex] = newEntry;
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
        setDialog((prev) => [
          ...prev,
          { teller: "chatbot", block: ["❌ 응답이 없습니다."], time: new Date() },
        ]);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const botBlock: DialogItem["block"] = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        // 아이템 구문 분리
        if (!jsonParsedRef.current && chunk.includes('"item"')) {
          try {
            const startIdx = chunk.indexOf("{");
            const endIdx = chunk.indexOf("}") + 1;
            const jsonText = chunk.slice(startIdx, endIdx);
            const parsed = JSON.parse(jsonText);
            itemsRef.current = parsed.item ?? [];
            jsonParsedRef.current = true;

            // 남은 텍스트를 textBuffer에 이어 붙이기
            const rest = chunk.slice(endIdx).trim();
            if (rest) textBufferRef.current += rest + "\n";
          } catch (err) {
            console.error("item 파싱 실패:", err);
          }
          continue;
        }

        // 텍스트 스트리밍 처리
        for (const char of chunk) {
          if (char === "\n") {
            const trimmed = currentTextRef.current.trim();
            if (trimmed) {
              botBlock.push(trimmed);
              throttledUpdateDialog(botBlock);
            }
            currentTextRef.current = "";
            isNewLineRef.current = true;
          } else {
            currentTextRef.current += char;
            if (isNewLineRef.current) {
              botBlock.push(char);
              isNewLineRef.current = false;
            } else {
              const last = botBlock[botBlock.length - 1];
              if (typeof last === "string") {
                botBlock[botBlock.length - 1] = last + char;
              }
            }
            throttledUpdateDialog(botBlock);
            await new Promise((r) => setTimeout(r, 5));
          }
        }
      }

      // 최종 메시지 정리 및 버튼 삽입
      if (textBufferRef.current) {
        const parts = textBufferRef.current.trim().split("\n\n");
        const finalBlock: DialogItem["block"] = [];

        parts.forEach((text, i) => {
          finalBlock.push(text);
          const item = itemsRef.current[i];
          if (item) {
            finalBlock.push({
              name: item.name,
              link: item.link,
            });
          }
        });

        setDialog((prev) => {
          const last = prev[prev.length - 1];
          return [...prev.slice(0, -1), { ...last, block: finalBlock }];
        });

        textBufferRef.current = "";
        jsonParsedRef.current = false;
      }
    },
  });

  useEffect(() => setIsLoading(isPending), [isPending]);
  useEffect(() => scrollToBottom(), [dialog]);

  const handleClick = useCallback(async () => {
    SetDisableButton(true);

    if (!input.trim()) return;

    setDialog((prev) => [...prev, { teller: "user", block: [input.trim()], time: new Date() }]);

    setInput("");
    itemIndexRef.current = 0;
    itemsRef.current = [];
    textBufferRef.current = "";
    currentTextRef.current = "";
    jsonParsedRef.current = false;
    isNewLineRef.current = true;

    try {
      await mutateAsync(input.trim());
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
