import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoadingProgressCircle({ className }: { className?: string }) {
  return (
    <div className={cn("flex justify-center items-center w-full h-[20vh]", className)}>
      <Loader2 className={"h-10 w-10 animate-spin text-primary"} />
    </div>
  );
}
