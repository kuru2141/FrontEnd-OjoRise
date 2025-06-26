import AppHeader from "@/components/common/AppHeader";
import { Fragment, ReactNode } from "react";

export const metadata = {
  title: "YoPle - 통신 연령 테스트",
};

export default function TestAgeLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <Fragment>
      <AppHeader />
      {children}
    </Fragment>
  );
}
