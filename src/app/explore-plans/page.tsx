import ExplorePlansPage from "@/components/page-component/explore-plans/ExplorePlansPage";
import { Suspense } from "react";

export const metadata = {
  title: "요금제 둘러보기",
};

export default function ExplorePlansPageRoute() {
  return (
    <Suspense>
      <ExplorePlansPage />
    </Suspense>
  );
}
