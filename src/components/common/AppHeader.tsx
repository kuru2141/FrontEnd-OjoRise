"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/stores/authStore";

function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isLoggedIn, isGuest } = useAuthStore();

  useEffect(() => {
    const handler = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handler);
    // 페이지 로드 시 이미 스크롤되어 있을 경우를 대비하여 초기 한 번 실행
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, []);

  // 로그인/게스트 상태가 아니면 카카오 로그인 버튼을 표시할 준비가 된 상태
  const showKakaoLoginButton = useMemo(() => !isLoggedIn && !isGuest, [isGuest, isLoggedIn]);

  return (
    <header
      className={`fixed w-full z-49 bg-white transition-all duration-0 ease-in-out ${
        isScrolled ? "border-b border-solid border-[#EAEAEA]" : ""
      }`}
    >
      <div
        className="max-w-[1480px] flex items-center justify-between h-[56px] xl:h-[80px] mx-auto"
        style={{ paddingLeft: "74px", paddingRight: "74px" }}
      >
        {/* 로고 */}
        <div className="text-lg font-bold">
          <Image src="/logo.svg" alt="Logo" width={300} height={50} />
        </div>

        {/* 메뉴 */}
        <div className="flex items-center space-x-[50px]">
          {/* 요금제 둘러보기는 항상 표시 */}

          <Link
            href="/"
            className="text-sm text-neutral-800 hover:text-gray-600 transition-colors duration-300"
          >
            요금제 둘러보기
          </Link>

          {/* 마이페이지/로그아웃 메뉴 (로그인 또는 게스트 상태일 때만 표시) */}
          {!showKakaoLoginButton && ( // 조건부 렌더링으로 변경
            <Fragment>
              <Link
                href="/"
                className="text-sm text-neutral-800 hover:text-gray-600 transition-colors duration-300"
              >
                마이페이지
              </Link>
              <button className="text-sm text-neutral-800 hover:text-gray-600 transition-colors duration-300">
                로그아웃
              </button>
            </Fragment>
          )}

          {/* 카카오 로그인 버튼 */}
          {showKakaoLoginButton && ( // 조건부 렌더링으로 변경
            <button className="text-sm bg-yellow-400 hover:bg-yellow-300 px-4 py-2 rounded transition-colors duration-300">
              카카오 로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default memo(AppHeader);
