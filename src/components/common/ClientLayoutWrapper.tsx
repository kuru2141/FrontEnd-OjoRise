'use client';

import OffCanvas from "@/components/common/OffCanvas";
import {Fragment, useState} from "react";
import AppHeader from "@/components/common/AppHeader";
import {ToastContainer} from "react-toastify";
import LinearProgress from "@/components/common/LinearProgress";
import FloatingActionButton from "@/components/common/FloatingActionButton";
import LoadingProgressCircle from "@/components/common/LoadingProgressCircle";

export default function ClientLayoutWrapper({children} : {children: React.ReactNode}) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    return (
        <Fragment>
            <AppHeader isOpen={isOpen} toggleMenu={toggleMenu} />
            <OffCanvas isOpen={isOpen} onClose={toggleMenu} />
            <ToastContainer position="top-right" autoClose={2000} newestOnTop />
            {children}
            <LinearProgress colorClassName="bg-[black]" />
            <FloatingActionButton />
            <LoadingProgressCircle />
        </Fragment>
    );
}