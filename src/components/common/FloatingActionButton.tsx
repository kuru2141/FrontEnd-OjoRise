"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, HelpCircle, Menu } from "lucide-react"

const FloatingActionMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const [iconStage, setIconStage] = useState<"idle" | "explode" | "cross">("idle")

    const toggleMenu = () => {
        if (iconStage === "idle") {
            setIconStage("explode")
            setTimeout(() => {
                setIconStage("cross")
                setMenuOpen(true)
            }, 200)
        } else {
            setIconStage("explode")
            setMenuOpen(false)
            setTimeout(() => {
                setIconStage("idle")
            }, 200)
        }
    }

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
        setMenuOpen(false)
        setIconStage("idle")
    }

    const handlePlaceholderClick = (feature: string) => {
        alert(`${feature} 기능은 아직 준비 중입니다.`)
        setMenuOpen(false)
        setIconStage("idle")
    }

    const menuItems = [
        {
            icon: <ArrowUp className="w-5 h-5" />,
            label: "맨 위로 이동",
            onClick: handleScrollTop,
        },
        {
            icon: <HelpCircle className="w-5 h-5" />,
            label: "고객센터",
            onClick: () => handlePlaceholderClick("고객센터"),
        },
        {
            icon: <Menu className="w-5 h-5" />,
            label: "메뉴",
            onClick: () => handlePlaceholderClick("메뉴"),
        },
    ]

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-3">
            <AnimatePresence>
                {menuOpen &&
                    menuItems.map((item, index) => (
                        <motion.button
                            key={item.label}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.2, delay: index * 0.05 }}
                            onClick={item.onClick}
                            aria-label={item.label}
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-300 text-black shadow-md focus:outline-none focus-visible:ring-2 hover:bg-yellow-400"
                        >
                            {item.icon}
                        </motion.button>
                    ))}
            </AnimatePresence>

            {/* 플로팅 버튼 */}
            <motion.button
                onClick={toggleMenu}
                aria-label="메뉴 열기"
                className="relative flex items-center justify-center w-14 h-14 rounded-full bg-yellow-400 text-black shadow-xl hover:bg-yellow-500 focus:outline-none"
                whileTap={{ scale: 0.95 }}
            >
                {/* Custom 플러스 아이콘 - 분해/조립 */}
                <motion.div className="relative w-6 h-6">
                    {/* 가로 선 */}
                    <motion.span
                        className="absolute top-1/2 left-0 w-full h-[2px] bg-black origin-center"
                        animate={{
                            x:
                                iconStage === "explode"
                                    ? -20
                                    : iconStage === "cross"
                                        ? 0
                                        : 0,
                            rotate:
                                iconStage === "cross"
                                    ? -135
                                    : 0,
                            opacity: iconStage === "explode" ? 0 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        style={{ translateY: "-50%" }}
                    />
                    {/* 세로 선 */}
                    <motion.span
                        className="absolute left-1/2 top-0 h-full w-[2px] bg-black origin-center"
                        animate={{
                            x:
                                iconStage === "explode"
                                    ? 20
                                    : iconStage === "cross"
                                        ? 0
                                        : 0,
                            rotate:
                                iconStage === "cross"
                                    ? -135
                                    : 0,
                            opacity: iconStage === "explode" ? 0 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 100, damping: 10 }}
                        style={{ translateX: "-50%" }}
                    />
                </motion.div>
            </motion.button>
        </div>
    )
}

export default FloatingActionMenu
