"use client";
import { useEffect } from "react";

export default function KakaoInitializer() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const jsKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        // @ts-ignore
        window.Kakao.init(jsKey);
      }
    };
    document.head.appendChild(script);
  }, []);

  return null;
}
