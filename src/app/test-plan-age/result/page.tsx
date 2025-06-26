import AgeTestResult from "@/components/page-component/test-age-page/result/AgeTestResult";
import { Suspense } from "react";

export const metadata = {
  title: "YoPle - 통신 연령 테스트 결과",
};

export default function AgeTestResultPage() {
  return (
    <Suspense>
      <AgeTestResult />
    </Suspense>
  );
}
