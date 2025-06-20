"use client";

import { useParams } from "next/navigation";

const imageUrlMap: Record<string, string> = {
  unlimitedTribe: "/TongBTI/unlimitedTribe.svg",
  midrangeMaster: "/TongBTI/midrangeMaster.svg",
  valueSeeker: "/TongBTI/valueSeeker.svg",
  speedController: "/TongBTI/speedController.svg",
  subsidyHunter: "/TongBTI/subsidyHunter.svg",
  wifiNomad: "/TongBTI/wifiNomad.svg",
};

export default function ShareButton({ tongName }: { tongName: string }) {
  const { typeKey } = useParams();
  // 배포 후 url 변경 필요
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const imageUrl = `${baseUrl}${imageUrlMap[typeKey as string]}`;
  const url = `${baseUrl}/tongbti/result/${typeKey}`;

  const handleKakaoShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: `나의 통BTI는 ${tongName}`,
        description: "LG U+ 통BTI로 내 통신 성격도 보고 요금제까지 추천받아보세요!",
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
