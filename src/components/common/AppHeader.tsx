"use client";

import { memo, useEffect, useState } from "react";
import HamburgerIcon from "@/components/common/HamburgerIcon";

type Props = {
    isOpen: boolean;
    toggleMenu: () => void;
}


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
            <div className="max-w-[1660px] inner flex align-middle items-center flex-wrap mt-0 mb-0 mr-auto ml-auto h-[56px] xl:h-[80px] justify-between">
                <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
            </div>
        </header>
    );
}

export default memo(AppHeader);