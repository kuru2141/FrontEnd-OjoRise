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
import { getBaseAndCompareItem } from "./comparePlan";
import { ComparePlan } from "@/types/plan";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function RadarChart() {
  const [dpr, setDpr] = useState<number>();
  const chartRef = useRef<HTMLDivElement>(null);
  const [chartKey, setChartKey] = useState(0);
  const [data, setData] = useState<ChartData<"radar"> | null>(null);

  useEffect(() => {
    setDpr(window.devicePixelRatio);
  }, []);

  const labels = ["월정액", "음성통화", "문자", "쉐어링 데이터", "데이터"];
  const { baseItem, compareItem } = getBaseAndCompareItem();

  const safeNumber = (value: any, fallback = 0.01) => {
    const num = Number(value);
    return isNaN(num) ? fallback : num;
  };

  const toRadarData = (data: ComparePlan) => {
    return [
      safeNumber(data.monthlyFee) / 1000,
      data.voiceCallPrice === "무제한" ? 100 : safeNumber(data.voiceCallPrice) / 10,
      data.sms === "기본제공" ? 100 : safeNumber(data.sms) / 10,
      safeNumber(data.sharingDataGb) / 1.8,
      data.baseDataGb === "무제한" ? 100 : safeNumber(data.baseDataGb) / 1.8,
    ];
  };

  const baseData = useMemo(() => toRadarData(baseItem), [baseItem]);
  const compareData = useMemo(() => toRadarData(compareItem), [compareItem]);
  const baseReady = useMemo(() => baseData.some((v) => v > 0), [baseData]); //baseData에 값 있는지 확인

  const legendPositionPlugin = {
    id: "legendPositionPlugin",
    afterLayout(chart: Chart < "radar", number[], string>) {
      const scale = chart.scales.r as unknown as {
        yCenter: number;
        drawingArea: number;
        getPointPosition: (index: number, distance: number) => { x: number; y: number };
      };
      if (chart.legend) {
        chart.legend.left = chart.width - chart.legend.width - 84;
        chart.legend.top = scale.getPointPosition(2, scale.drawingArea).y - 14 - 52;
      }
    },
  };

  const generateLabels = useCallback((chart: Chart<"radar", number[], string>) => {
    return [...chart.data.datasets].map((dataset, i) => ({
      text: dataset.label ?? "",
      fillStyle: i === 0 ? "#FCFF63" : "#03C75A",
      strokeStyle: "transparent",
    }));
  }, []);

  const options = useMemo<ChartOptions<"radar">>(() => ({
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
          font: { family: "Pretendard", size: 14 },
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
          font: { family: "Pretendard", weight: "bold", size: 18 },
          color: "var(--color-gray-100)",
        },
        ticks: { stepSize: 20, display: false },
        beginAtZero: true,
        max: 100,
      },
    },
  }), [dpr]);


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
                label: "기준 요금제",
                data: [...baseData],
                backgroundColor: "rgba(3, 199, 90, 0.4)",
                borderColor: "rgba(3, 199, 90, 1)",
                borderWidth: 2,
              },
              {
                label: "비교 요금제",
                data: [...baseData], // 처음엔 겹쳐서 시작
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
    return () => observer.disconnect();
  }, [baseReady]);

  useEffect(() => {
    if (!data) return;

    const timeout = setTimeout(() => {
      setData((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          datasets: [
            prev.datasets[0],
            {
              ...prev.datasets[1],
              data: [...compareData],
            },
          ],
        };
      });
    }, 400);

    return () => clearTimeout(timeout);
  }, [chartKey, compareData]);

  if (!data) return <div ref={chartRef} className="h-[432px]" />;

  return (
    <div ref={chartRef} className="h-[432px]">
      <Radar key={chartKey} options={options} data={data} plugins={[legendPositionPlugin]} />
    </div>
  );
}

export default memo(RadarChart);
