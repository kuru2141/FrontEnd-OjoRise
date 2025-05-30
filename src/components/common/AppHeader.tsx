"use client";

import { memo, useEffect, useState } from "react";
import HamburgerIcon from "@/components/common/HamburgerIcon";

type Props = {
    isOpen: boolean;
    toggleMenu: () => void;
}

const menuItems = [
    {label: "MENU1", href:"/"},
    {label: "MENU2", href:"/"},
    {label: "MENU3", href:"/"},
    {label: "MENU4", href:"/"},
    {label: "MENU5", href:"/"},
]


function AppHeader({isOpen, toggleMenu}: Props) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handler = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <header className={`pl-[24px] pr-[16px] xl:pl-[48px] xl:pr-[40px] fixed bg-white w-full z-49 ${isScrolled? "shadow-md":""}`}>
            <div className="max-w-[1480px] inner flex align-middle items-center flex-wrap mt-0 mb-0 mr-auto ml-auto h-[56px] xl:h-[80px] justify-between">
                {/*logo*/}
                <div className="text-lg font-bold">OjoRise</div>

                {/*desktopMenu(xl)*/}
                <nav className="hidden xl:flex space-x-6">
                    {menuItems.map((item, index) => (
                        <a
                        key={item.label}
                        href={item.href}
                        className="text-base font-medium text-neutral-800 hover:text-gray-600 transition"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/*mobile(xl under)*/}
                <div className="xl:hidden">
                    <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
                </div>
            </div>
        </header>
    );
}

export default memo(AppHeader);