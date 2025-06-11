import { useProgressing } from "@/stores/progressStore";
import Image from "next/image";

interface LoadingLineProps {
  isShow?: boolean;
}

export default function LoadingLine({ isShow }: LoadingLineProps) {
  const { isLoading } = useProgressing();
  return (
    isLoading && isShow && <Image src={"/loadingLine.gif"} alt="loading" width={50} height={50} />
  );
}
