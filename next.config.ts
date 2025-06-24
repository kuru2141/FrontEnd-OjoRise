import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};
declare global {
  interface Window {
    Kakao: Kakao;
  }
}

interface Kakao {
  init: (key?: string) => void;
  isInitialized: () => boolean;
  Auth: KakaoAuth;
  API: KakaoAPI;
  Share: KakaoShare;
}

interface KakaoShare {
  sendDefault: (options: KakaoShareOptions) => void;
}

interface KakaoShareOptions {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons: [
    {
      title: string;
      link: {
        mobileWebUrl: string;
        webUrl: string;
      };
    }
  ];
}

interface KakaoAuth {
  login: (options: KakaoLoginOptions) => void;
  getAccessToken: () => string;
  logout: () => void;
}

interface KakaoLoginOptions {
  success: (authObj: KakaoAuthResponse) => void;
  fail: (error: KakaoError) => void;
}

interface KakaoAuthResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

interface KakaoAPI {
  request: (options: KakaoAPIRequestOptions) => void;
}

interface KakaoAPIRequestOptions {
  url: string;
  method?: "GET" | "POST";
  data?: Record<string, unknown>;
  success: (response: Record<string, unknown>) => void;
  fail: (error: KakaoError) => void;
}

interface KakaoError {
  code: string;
  msg: string;
}

export default nextConfig;
