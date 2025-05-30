"use client";

import { motion } from "framer-motion";
import { useProgressing } from "@/stores/progressStore";

type Props = {
    isOpen: boolean;
    toggleMenu: () => void;
};

export default function HamburgerIcon({ isOpen, toggleMenu }: Props) {
    const { setIsLoading } = useProgressing();

    // 로딩 상태 업데이트
    const handleClick = () => {
        toggleMenu();
        setIsLoading(isOpen);
    };

    return (
        <button
            className="xl:hidden fixed top-4 right-4 w-10 h-10 flex items-center justify-center group p-2 hover:cursor-pointer z-55"
            onClick={handleClick}
            aria-label="Toggle menu"
        >
            {/* Top Line */}
            <motion.span
                animate={{
                    rotate: isOpen ? -45 : 0,
                    y: isOpen ? 6 : 0,
                }}
                className="absolute w-5 h-0.5 top-3.5 bg-black"
                transition={{ duration: 0.3 }}
            />
            {/* Middle Line */}
            <motion.span
                animate={{
                    opacity: isOpen ? 0 : 1,
                    x: isOpen ? 10 : 0,
                }}
                className="absolute w-5 h-0.5 top-5 bg-black"
                transition={{ duration: 0.3 }}
            />
            {/* Bottom Line */}
            <motion.span
                animate={{
                    rotate: isOpen ? 45 : 0,
                    y: isOpen ? -6 : 0,
                }}
                className="absolute w-5 h-0.5 top-6.5 bg-black"
                transition={{ duration: 0.3 }}
            />
        </button>
    );
}
