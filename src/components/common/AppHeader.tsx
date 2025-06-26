"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, memo, useEffect, useMemo, useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import HamburgerIcon from "./HamburgerIcon";
import OffCanvas from "./OffCanvas";
import { useLogout } from "@/hooks/useLogout";

function AppHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const isSurveyed = useAuthStore((state) => state.isSurveyed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const logoutMutation = useLogout();

  useEffect(() => {
    const handler = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleKakaoLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao/login`;
  };

  const currentMenu = useMemo(() => {
    if (isSurveyed) {
      return [
        { label: "마이페이지", href: "/mypage" },
        { label: "요금제 둘러보기", href: "/explore-plans" },
        {
          label: "로그아웃",
          href: "/",
          onClick: () => logoutMutation.mutate(),
        },
      ];
    }

    return [
      {
        label: "카카오 로그인",
        href: "#",
        onClick: handleKakaoLogin,
      },
      { label: "요금제 둘러보기", href: "/explore-plans" },
    ];
  }, [isSurveyed, logoutMutation]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <header
      className={`fixed w-full z-50 bg-white transition-all duration-0 ease-in-out ${
        isScrolled ? "border-b border-solid border-[#EAEAEA]" : ""
      }`}
    >
      <div className="max-w-[100vw] flex items-center justify-between h-[56px] xl:h-[80px] mx-auto px-8 xl:px-[120px]">
        <Link href="/" className="text-lg font-bold">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={80}
            height={30}
            className="w-[80px] h-[30px] xl:w-[110px] xl:h-[42px] hover:cursor-pointer"
          />
        </Link>

        <div className="hidden md:flex items-center space-x-[50px]">
          <Fragment>
            <Link
              href="/explore-plans"
              className="text-[18px] font-pretendard text-neutral-800 hover:text-gray-100 hover:cursor-pointer transition-colors duration-300"
            >
              요금제 둘러보기
            </Link>
            {isSurveyed ? (
              <Fragment>
                <Link
                  href="/mypage"
                  className="text-[18px] font-pretendard text-neutral-800 hover:text-gray-100 transition-colors duration-300 hover:cursor-pointer"
                >
                  마이페이지
                </Link>
                <button
                  onClick={() => logoutMutation.mutate()}
                  className="text-[18px] font-pretendard text-neutral-800 hover:text-gray-100 transition-colors duration-300 hover:cursor-pointer"
                >
                  로그아웃
                </button>
              </Fragment>
            ) : (
              <button onClick={handleKakaoLogin} className="hover:cursor-pointer">
                <Image src="/kakaologinBtn.png" alt="kakao login" width={183} height={45} />
              </button>
            )}
          </Fragment>
        </div>

        <div className="md:hidden flex items-center">
          <HamburgerIcon isOpen={isMobileMenuOpen} toggleMenuAction={toggleMobileMenu} />
          <OffCanvas
            isOpen={isMobileMenuOpen}
            onCloseAction={toggleMobileMenu}
            menuItems={currentMenu}
          />
        </div>
      </div>
    </header>
  );
}

export default memo(AppHeader);
