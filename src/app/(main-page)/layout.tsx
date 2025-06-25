import ChatBotModal from "@/components/common/chatbot/ChatBotModal";
import Footer from "@/components/common/Footer";
import ClientLayoutWrapper from "@/components/common/wrapper/ClientLayoutWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayoutWrapper>
      {children}
      <div className="w-full sticky bottom-8 flex justify-end pr-8">
        <ChatBotModal />
      </div>
      <Footer />
    </ClientLayoutWrapper>
  );
}
