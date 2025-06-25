import AppHeader from "@/components/common/AppHeader";
import { Fragment, ReactNode } from "react";

export default function TestAgeLayout({ children }: { children: Readonly<ReactNode> }) {
  return (
    <Fragment>
      <AppHeader />
      {children}
    </Fragment>
  );
}
