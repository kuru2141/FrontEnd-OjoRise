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
      <Footer />
    </ClientLayoutWrapper>
  );
}
