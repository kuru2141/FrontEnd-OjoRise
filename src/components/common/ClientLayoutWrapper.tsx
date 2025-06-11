"use client";

import { Fragment } from "react";
import AppHeader from "@/components/common/AppHeader";
import { ToastContainer } from "react-toastify";
import LinearProgress from "@/components/common/LinearProgress";
import FloatingActionButton from "@/components/common/FloatingActionButton";
import LoadingProgressCircle from "@/components/common/LoadingProgressCircle";
import ChatBotModal from "../ChatBotModal";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {

  return (
    <Fragment>
      <AppHeader />
      <ToastContainer position="top-right" autoClose={2000} newestOnTop />
      {children}
      <LinearProgress colorClassName="bg-[black]" />
      <ChatBotModal />
      <FloatingActionButton />
      <LoadingProgressCircle />
    </Fragment>
  );
}
