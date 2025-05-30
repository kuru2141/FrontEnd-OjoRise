"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const menuItems = [
    { label: "MENU1", href: "/" },
    { label: "MENU2", href: "/" },
    { label: "MENU3", href: "/" },
    { label: "MENU4", href: "/" },
    { label: "MENU5", href: "/" },
];

export default function OffCanvas({ isOpen, onClose }: Props) {
    // 스크롤 잠금
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                        duration: 0.6,
                        ease: [0.4, 0, 1, 1],
                    }}
                    className="fixed inset-0 z-50 w-full h-full bg-white flex flex-col items-center justify-center"
                >
                    {/* menu section */}
                    <nav className="flex flex-col gap-8 text-center">
                        {menuItems.map((item, index) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                onClick={onClose}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="text-2xl font-bold text-neutral-800 hover:text-yellow-600 transition"
                            >
                                {item.label}
                            </motion.a>
                        ))}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
