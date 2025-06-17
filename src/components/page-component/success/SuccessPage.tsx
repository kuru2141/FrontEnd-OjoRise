"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { handleLoginSuccess } from "@/services/authService";

export default function SuccessPageRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setLoggedIn, setGuest } = useAuthStore();
  const accessToken = searchParams.get("accessToken");

  useEffect(() => {
    if (accessToken) {
      handleLoginSuccess(accessToken);
      setLoggedIn(true);
      setGuest(false);
      router.push("/signup");
    }
  }, [accessToken, router, setGuest, setLoggedIn]);

  return null;
}
