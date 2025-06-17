"use client";
import dynamic from "next/dynamic";

const SuccessPageRoute = dynamic(() => import("@/components/page-component/success/SuccessPage"), {
  ssr: false,
});

export default function SuccessPage() {
  return <SuccessPageRoute />;
}
