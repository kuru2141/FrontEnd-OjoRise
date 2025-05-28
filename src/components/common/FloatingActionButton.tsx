"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";

export default function FloatingActionButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!show) return null;

  return (
    <div className="sticky bottom-10 mb-10 flex justify-end pr-10 z-10">
      <Button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="rounded-full bg-white shadow-lg hover:cursor-pointer hover:bg-white"
        size="icon"
      >
        <ArrowUp className="w-10 h-10 text-black" />
      </Button>
    </div>
  );
}
