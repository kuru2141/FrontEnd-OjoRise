"use client";

import { useState } from "react";
import HamburgerIcon from "@/components/common/HamburgerIcon";
import OffCanvas from "@/components/common/OffCanvas";

const menuItems = [
    { label: "마이페이지", href: "/" },
    { label: "요금제 둘러보기", href: "/" },
    { label: "로그아웃", href: "#", onClick: () => { /* 로그아웃 로직 */ } },
];

export default function HamburgerWithMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <>
            <HamburgerIcon isOpen={isOpen} toggleMenuAction={toggleMenu} />
            <OffCanvas isOpen={isOpen}
                       onCloseAction={() => setIsOpen(false)}
                       menuItems={menuItems} />
        </>
    );
}
