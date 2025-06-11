import RadarChart from "./main-page/compare-chart/RadarChart";
import CompareModeToggle from "./main-page/recommanded-list/CompareModeToggle";
import LikedPlansList from "./main-page/recommanded-list/LikedPlansList";
import RecommendedPlanList from "./main-page/recommanded-list/RecommendedPlanList";
import SelectedPlanViewer from "./main-page/recommanded-list/SelectedPlanViewer";

export default function MainPage() {
  return (
    <main className="flex flex-col items-center bg-white px-4 pb-20">
      <section className="w-full max-w-[768px] mt-10">
        <h2 className="text-3xl font-bold mb-4 mt-10">요금제 비교하기</h2>
        <CompareModeToggle />
        <RecommendedPlanList />
        <LikedPlansList />
        <SelectedPlanViewer />
        <div className='w-full h-[432px]'>
          <RadarChart />
        </div>
      </section>
    </main>
  );
}
