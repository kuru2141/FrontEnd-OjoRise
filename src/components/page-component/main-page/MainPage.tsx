import RadarChart from "./compare-chart/RadarChart";
import TableBox from "./compare-chart/TableBox";
import CompareModeToggle from "./recommanded-list/CompareModeToggle";
import LikedPlansList from "./recommanded-list/LikedPlansList";
import RecommendedPlanList from "./recommanded-list/RecommendedPlanList";
import SelectedPlanViewer from "./recommanded-list/SelectedPlanViewer";

export default function MainPage() {
  return (
    <main className="flex flex-col items-center bg-white px-4 pb-20">
      <section className="w-full max-w-[768px] mt-10">
        <h2 className="text-3xl font-bold mb-4 mt-10">요금제 비교하기</h2>
        <CompareModeToggle />
        <RecommendedPlanList />
        <LikedPlansList />
        <SelectedPlanViewer />
        <div className="flex flex-col g-[45px] w-full">
          <div className="h-[432px]">
            <RadarChart />
          </div>
          <TableBox/>
        </div>
      </section>
    </main>
  );
}
