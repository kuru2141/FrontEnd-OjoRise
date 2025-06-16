"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      localStorage.setItem("token", accessToken);
      router.push("/");
    }
  }, [searchParams, router]);

  return <div>로그인 처리 중입니다...</div>;
}
