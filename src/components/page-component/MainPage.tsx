import RecommendedPlanList from "@/components/main-page/RecommendedPlanList";
import CompareModeToggle from "../main-page/CompareModeToggle";

export default function MainPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white">
      <section className="w-full max-w-5xl mt-10">
        <h2 className="text-2xl font-bold mb-4">요금제 비교하기</h2>
        <CompareModeToggle />
        <RecommendedPlanList />
      </section>
    </main>
  );
}
