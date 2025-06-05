import { X } from "lucide-react";
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

export default function ChatBotModal() {
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
          <div className="p-4 pb-0 h-full">
            <div className="flex items-center justify-center space-x-2">asld;fkj</div>
          </div>
          <DrawerFooter className="h-fit">
            <Input />
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
