"use client";

import { useState } from "react";
import HamburgerIcon from "@/components/common/HamburgerIcon";
import OffCanvas from "@/components/common/OffCanvas";

export default function HamburgerWithMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <>
            <HamburgerIcon isOpen={isOpen} toggleMenu={toggleMenu} />
            <OffCanvas isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
