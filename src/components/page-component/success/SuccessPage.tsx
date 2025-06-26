"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetIsSurveyedQuery } from "@/hooks/useGetUserInfo";
import { useQueryClient } from "@tanstack/react-query";
import { handleLoginSuccess } from "@/services/initialSetting";

export default function SuccessPageRoute() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();
  const accessToken = searchParams.get("accessToken");
  const { data: isSurveyed, isLoading } = useGetIsSurveyedQuery(accessToken);

  useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
      queryClient.invalidateQueries({ queryKey: ["user"] });
      handleLoginSuccess();
    }
  }, [isSurveyed, isLoading]);

  useEffect(() => {
    if (!isLoading && isSurveyed !== undefined) {
      if (isSurveyed) router.back();
      else router.replace("/signup");
    }
  }, [isSurveyed, isLoading, router]);

  return null;
}
