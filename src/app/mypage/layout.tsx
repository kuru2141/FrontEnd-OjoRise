import ClientLayoutWrapper from "@/components/common/wrapper/ClientLayoutWrapper";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ClientLayoutWrapper>{children}</ClientLayoutWrapper>;
}
