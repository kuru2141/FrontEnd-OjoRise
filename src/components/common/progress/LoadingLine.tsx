import { useProgressing } from "@/stores/progressStore";
import Image from "next/image";

export default function LoadingLine() {
  const { isLoading } = useProgressing();
  return isLoading && <Image src={"/loadingLine.gif"} alt="loading" width={25} height={25} />;
}
