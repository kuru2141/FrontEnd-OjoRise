"use client";

import { ShareButtonProps } from "@/types/share";

export default function ShareButton({ title, description, url, imageUrl }: ShareButtonProps) {
  const handleKakaoShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title,
        description,
        imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: "결과 확인하러 가기",
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  return (
    <button
      onClick={handleKakaoShare}
      className="w-15 h-15 p-0 flex items-center justify-center transition"
      aria-label="카카오 공유하기"
    >
      <img
        src="/kakaoButton.png" // ← public 경로에 맞춰 수정하세요!
        alt="카카오 공유"
        className="w-12 h-12"
      />
    </button>
  );
}
