import { Fragment, ReactNode } from "react";

export default function TestAgeLayout({ children }: { children: Readonly<ReactNode> }) {
  return <Fragment>{children}</Fragment>;
}
