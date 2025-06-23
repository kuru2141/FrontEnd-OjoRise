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
      className="bg-pink-200 px-4 py-2 rounded-md font-semibold w-full 
             hover:bg-pink-300 hover:cursor-pointer transition-colors duration-200"
    >
      나의 결과 공유하기
    </button>
  );
}
