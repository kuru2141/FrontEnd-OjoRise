"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MenuItem {
    label: string;
    href: string;
    onClick?: () => void;
}

interface OffCanvasProps {
    isOpen: boolean;
    onCloseAction: () => void;
    menuItems: MenuItem[];
}

export default function OffCanvas({ isOpen, onCloseAction, menuItems }: OffCanvasProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <div
            className={`
        fixed top-[56px] left-0 z-40 w-full h-[calc(100vh-56px)]
        bg-white transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            role="dialog"
            aria-modal="true"
        >
            <nav className="flex flex-col items-center text-[18px] mt-15 h-full w-full space-y-8 cursor-pointer text-lg font-bold text-black">
                {menuItems.map(({ label, href, onClick }) => (
                    <Link
                        key={label}
                        href={href}
                        className="w-full text-center"
                        onClick={(e) => {
                            if (onClick) {
                                e.preventDefault();
                                onClick();
                            }
                            onCloseAction();
                        }}
                    >
                        {label}
                    </Link>
                ))}
            </nav>
        </div>
    );
}
