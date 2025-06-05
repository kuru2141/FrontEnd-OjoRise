import RecommendedPlanList from "@/components/main-page/RecommendedPlanList";

export default function MainPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-white">
      <h1 className="text-4xl font-bold mb-4">👋 Welcome to ojorise</h1>
      <p className="text-lg text-gray-600">챗봇 웹 서비스입니다.</p>
      <RecommendedPlanList />
    </main>
  );
}
