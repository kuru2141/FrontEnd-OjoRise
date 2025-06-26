import ClientLayoutWrapper from "@/components/common/wrapper/ClientLayoutWrapper";

export const metadata = {
  title: "YoPle - 통신 성향 테스트",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
