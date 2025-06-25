"use client";

import { memo, useEffect, useRef, useState, useMemo, useCallback } from "react";
import { ChartOptions, ChartData } from "chart.js/auto";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  Chart,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { useBaseAndCompareItem } from "./comparePlan";
import { ComparePlan } from "@/types/plan";
import { Button } from "@/components/ui/button";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

function RadarChart() {
  const [dpr, setDpr] = useState<number>();
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartKey, setChartKey] = useState(0);
  const [data, setData] = useState<ChartData<"radar"> | null>(null);
  const [fontsize, setFontsize] = useState<number>(14);
  const [labelsize, setLabelsize] = useState<number>(18);
  const [labelGap, setLabelGap] = useState<number>(84);
    
    const handleScrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" })
  }
   
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 768 ){
        setLabelsize(14);
        setFontsize(18);
        setLabelGap(84);
      }
      else{
        setLabelsize(8);
        setFontsize(14);
        setLabelGap(0);
      }; 
    }

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    }
  },[]);

  useEffect(() => {
    setDpr(window.devicePixelRatio);
  }, []);

  const labels = useMemo(() => ["월정액", "음성통화", "문자", "쉐어링 데이터", "데이터"], []);
  const { baseItem, compareItem } = useBaseAndCompareItem();

  const safeNumber = (value: number | string, fallback = 0) => {
    const num = Number(value);
    return isNaN(num) ? fallback : num;
  };

  const toRadarData = useCallback((data: ComparePlan) => {
    return [
      safeNumber(data.monthlyFee) / 1300,
      data.voiceCallPrice === "무제한" ? 100 : safeNumber(data.voiceCallPrice) / 10,
      data.sms === "기본제공" ? 100 : safeNumber(data.sms) / 10,
      safeNumber(data.sharingDataGb) / 1.8,
      data.baseDataGb === "무제한" ? 100 : safeNumber(data.baseDataGb) / 1.8,
    ];
  }, []);

  const baseData = useMemo(() => toRadarData(baseItem), [baseItem, toRadarData]);
  const compareData = useMemo(() => toRadarData(compareItem), [compareItem, toRadarData]);
  const baseReady = useMemo(() => baseData.some((v) => v > 0), [baseData]); //baseData에 값 있는지 확인

  const legendPositionPlugin = {
    id: "legendPositionPlugin",
    afterLayout(chart: Chart<"radar", number[], string>) {
      const scale = chart.scales.r as unknown as {
        yCenter: number;
        drawingArea: number;
        getPointPosition: (index: number, distance: number) => { x: number; y: number };
      };
      if (chart.legend) {
        chart.legend.left = chart.width - chart.legend.width - labelGap;
        chart.legend.top = scale.getPointPosition(2, scale.drawingArea).y - 14 - 52;
      }
    },
  };

  const generateLabels = useCallback((chart: Chart<"radar", number[], string>) => {
    return [...chart.data.datasets].reverse().map((dataset, i) => ({
      text: dataset.label ?? "",
      fillStyle: i === 0 ? "#FCFF63" : "#03C75A",
      strokeStyle: "transparent",
    }));
  }, []);

  const options = useMemo<ChartOptions<"radar">>(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      devicePixelRatio: dpr,
      animation: {
        duration: 1000,
        easing: "easeOutQuart",
      },
      plugins: {
        title: { display: false },
        legend: {
          position: "chartArea",
          labels: {
            font: { family: "Pretendard", size: labelsize, weight: "bold" },
            usePointStyle: true,
            pointStyle: "circle",
            boxWidth: 10,
            boxHeight: 10,
            color: "var(--color-gray-100)",
            generateLabels,
          },
        },
      },
      layout: { padding: 0 },
      elements: {
        line: { borderWidth: 1 },
        point: { radius: 0 },
      },
      scales: {
        r: {
          backgroundColor: "white",
          pointLabels: {
            padding: 5,
            font: { family: "Pretendard", weight: "bold", size: fontsize },
            color: "var(--color-gray-100)",
          },
          ticks: { stepSize: 20, display: false },
          beginAtZero: true,
          max: 100,
        },
      },
    }),
    [dpr, generateLabels]
  );

  useEffect(() => {
    if (!baseReady) return;
    const target = chartRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setData({
            labels,
            datasets: [
              {
                label: "비교 요금제",
                data: [...baseData],
                backgroundColor: "rgba(3, 199, 90, 0.4)",
                borderColor: "rgba(3, 199, 90, 1)",
                borderWidth: 2,
              },
              {
                label: "기준 요금제",
                data: [...baseData],
                backgroundColor: "rgba(252, 255, 99, 0.4)",
                borderColor: "rgba(252, 255, 99, 1)",
                borderWidth: 2,
              },
            ],
          });
          setChartKey((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [baseData, baseReady, labels]);

  useEffect(() => {
    if (!data) return;

    const timeout = setTimeout(() => {
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          datasets: [
            {
              ...prev.datasets[0],
              data: [...compareData],
            }, prev.datasets[1],
          ],
        };
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [chartKey, compareData, data]);

  if (!(baseReady && data)) {
    return (
      <div ref={chartRef} className="h-[300px] md:h-[432px]">
        <div className="w-full h-full rounded-xl animate-pulse flex align-center justify-center bg-gray-10 text-center text-sm md:text-lg ">
          <div className="flex flex-wrap p-[10px] flex flex-col items-center justify-center gap-[30px]">
            <span>
            나의 요금제를 입력하거나 추천 요금제를 선택하면<br />
            <span className="text-primary-medium font-bold">비교 그래프</span>를 볼 수 있습니다</span>
            <Button variant={'outline'} className="text-sm font-bold h-[40px] w-full md:text-lg md:h-[50px]" onClick={handleScrollTop}>나의 요금제 선택하기</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={chartRef} className="h-[300px] md:h-[432px]">
      <Radar key={chartKey} options={options} data={data} plugins={[legendPositionPlugin]} />
    </div>
  );
}

export default memo(RadarChart);