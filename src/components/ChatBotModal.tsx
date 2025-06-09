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

function ChatBotModal() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [response, setResponse] = useState("");
  const [links, setLinks] = useState("");
  const dialog: DialogItem[] = useMemo(() => [], []);

  const handleClick = useCallback(async () => {
    setResponse("");

    dialog.push({
      teller: "user",
      message: inputRef.current ? inputRef.current.value : "",
      time: new Date(),
    });

    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message: inputRef.current?.value }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.body) {
      setResponse("No response body.");
      return;
    }

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
      if (chunk.includes("]")) {
        setLinks((prev) => prev + chunk.split("]")[0] + "]");
        setResponse((prev) => prev + chunk.split("]")[1]);
      } else if (!links.includes("]")) setLinks((prev) => prev + chunk);
      else setResponse((prev) => prev + chunk);

      // setResponse((prev) => prev + chunk);
    }
  }, [dialog, response, links]);

  console.log("links", links, "\nresponse", response);

  return (
    <Drawer modal={false}>
      <DrawerTrigger asChild>
        <Button variant={"outline"}>Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent className="w-1/2 max-w-1/2 h-1/2 bg-gray-400">
        <div className="">
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
            <ScrollArea className="flex items-center justify-center space-x-1 w-full h-[50%]">
              {dialog.map((item) => (
                <ChatBotBubble
                  message={item.message}
                  teller={item.teller}
                  time={item.time}
                  key={`${item.time}_${item.teller}`}
                />
              ))}
              {<ChatBotBubble message={response} teller="chatbot" time={new Date()} />}
            </ScrollArea>
          </div>
          <DrawerFooter className="flex flex-row h-fit w-full absolute bottom-1">
            <Input ref={inputRef} />
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
