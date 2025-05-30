"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type Props = {
    isOpen: boolean;
    onClose: () => void;
};

const menuItems = [
    { label: "홈", href: "/" },
    { label: "회사소개", href: "/about" },
    { label: "제품소개", href: "/products" },
    { label: "고객지원", href: "/support" },
    { label: "문의하기", href: "/contact" },
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
                <>
                    {/* overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        className="fixed inset-0 z-40 bg-black backdrop-blur-sm"
                    />

                    {/* slide panner */}
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="fixed top-0 right-0 z-50 h-full w-[80%] max-w-sm bg-gradient-to-b from-white via-neutral-100 to-neutral-50 shadow-2xl px-6 py-8"
                    >
                        {/* top close btn */}
                        <div className="flex justify-end">
                            <button
                                onClick={onClose}
                                className="text-neutral-600 hover:text-black transition"
                            >
                                <X size={28} />
                            </button>
                        </div>

                        {/* menu section */}
                        <nav className="mt-10 space-y-6">
                            {menuItems.map((item, index) => (
                                <motion.a
                                    key={item.label}
                                    href={item.href}
                                    onClick={onClose}
                                    initial={{ opacity: 0, x: 30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="block text-lg font-semibold text-neutral-800 hover:text-yellow-600 transition"
                                >
                                    {item.label}
                                </motion.a>
                            ))}
                        </nav>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}
