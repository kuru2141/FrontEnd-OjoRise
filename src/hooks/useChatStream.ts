import { useMutation } from "@tanstack/react-query";

// interface ResponseType {
//   status: boolean;
//   items: {
//     name: string;
//     link: string;
//   }[];
//   message: string;
// }

export const useChatStream = () => {
  return useMutation({
    mutationFn: async (message: string) => {
      const res = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: message }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      const chunks: string[] = [];

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const chunk = decoder.decode(value);
        fullText += chunk;
        chunks.push(chunk);
      }

      return {
        fullText,
        chunks,
      };
    },
  });
};
