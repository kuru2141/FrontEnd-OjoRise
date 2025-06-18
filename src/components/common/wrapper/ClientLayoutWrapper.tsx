"use client";

import { Fragment } from "react";
import AppHeader from "@/components/common/AppHeader";
import Footer from "@/components/common/Footer";
import { ToastContainer } from "react-toastify";
import LinearProgress from "@/components/common/progress/LinearProgress";
import ChatBotModal from "@/components/common/chatbot/ChatBotModal";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <AppHeader />
      <ToastContainer position="top-right" autoClose={2000} newestOnTop />
      {children}
      <Footer />
      <LinearProgress colorClassName="bg-[black]" />
      <ChatBotModal />
    </Fragment>
  );
}
