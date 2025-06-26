"use client";

import { Fragment, useEffect, useState } from "react";
import AppHeader from "@/components/common/AppHeader";
import { ToastContainer } from "react-toastify";
import LinearProgress from "@/components/common/progress/LinearProgress";
import { useAuthStore } from "@/stores/authStore";
import { useGetIsSurveyedQuery } from "@/hooks/useGetUserInfo";
import { isAccessTokenExpired } from "@/lib/auth";
import { useRefreshToken } from "@/hooks/useRefreshToken";
import { useLogout } from "@/hooks/useLogout";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const { isSurveyed, setIsSurveyed } = useAuthStore();
  const { data: survey } = useGetIsSurveyedQuery(accessToken);
  const { refetch } = useRefreshToken(accessToken);
  const {mutate: logout} = useLogout();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("accessToken");
      setAccessToken(token);
    }
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    if (isAccessTokenExpired(accessToken)) {
      refetch().then((res) => {
        if (res.data?.accessToken) {
          sessionStorage.setItem("accessToken", res.data.accessToken);
          setAccessToken(res.data.accessToken);
          console.log("토큰 재발급");
        } else {
          logout();
          sessionStorage.removeItem("accessToken");
          setAccessToken(null);
          console.error("토큰 재발급 실패");
        }
      });
    }
  }, [accessToken, refetch]);

  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");

    if (token && isSurveyed === null && survey !== undefined) setIsSurveyed(survey);
  }, [survey, isSurveyed, setIsSurveyed, accessToken]);

  return (
    <Fragment>
      <AppHeader />
      <LinearProgress colorClassName="bg-[black]" />
      <ToastContainer position="top-right" autoClose={2000} newestOnTop />
      {children}
    </Fragment>
  );
}
