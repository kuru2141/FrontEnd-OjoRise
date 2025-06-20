"use client"

import { memo, useEffect, useRef, useState, useMemo } from "react";
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
} from 'chart.js';
import { Radar } from "react-chartjs-2";

function RadarChart() {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  const [dpr, setDpr] = useState<number>();

  useEffect(() => {
    setDpr(window.devicePixelRatio);
  },[]);
  
  const labels = ['월정액', '혜택', '문자', '음성통화', '데이터'];
  const baseData = [28, 48, 40, 19, 96];
  const targetData = [65, 59, 90, 81, 56];
  const [enableAnimation, setEnableAnimation] = useState(false);

  const [data, setData] =  useState<ChartData<'radar'>>({
    labels,
    datasets: [  
      {
        label: '기준 요금제',
        data: baseData,
        backgroundColor: 'rgba(3, 199, 90, 0.4)', 
        borderColor: 'rgba(3, 199, 90, 1)',  
      },
      {
        label: '비교 요금제',
        data: baseData,
        backgroundColor: 'rgba(252, 255, 99, 0.4)', 
        borderColor: 'rgba(252, 255, 99, 1)', 
      }
    ]
  });

  const changeToCompare = () => {
    setEnableAnimation(true);
    const timeout = setTimeout(() => {
      setData(prev => ({
        ...prev,
        datasets:[
          {
            ...prev.datasets[0],
            data: targetData
          }, prev.datasets[1]
        ]
      }))
      setTimeout(() => setEnableAnimation(false), 1500);
    }, 600);

    return () => clearTimeout(timeout);
  }

  const legendPositionPlugin = {
    id: 'legendPositionPlugin',
    afterLayout(chart: Chart<'radar', number[], string>) {
      const scale = chart.scales.r as unknown as {
        yCenter: number;
        drawingArea: number;
        getPointPosition: (index: number, distance: number) => { x: number; y: number };
      };

      if (chart.legend) {
        chart.legend.left = chart.width - chart.legend.width - 84;
        chart.legend.top = scale.getPointPosition(2, scale.drawingArea).y - 14 - 52;
      } 
    }
  };

  const options = useMemo<ChartOptions<'radar'>>(() => ({
    responsive: true, // 부모 넓이 따라감
    maintainAspectRatio: false, // 부모의 가로세로 비율 따라감
    devicePixelRatio: dpr, // 화질 개선
    animation: enableAnimation
      ? {
          duration: 1500,
          easing: 'easeOutQuart',
        }
      : false,
    plugins: {
      title: {
        display: false
      },
      legend: {
        position: 'chartArea',
        labels: {
          font: {
            family: 'Pretendard',
            size: 14,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10,
          color: 'var(--color-gray-100)',
          generateLabels: (chart) => {
            return [...chart.data.datasets].map((dataset, i) => ({
              text: dataset.label ?? '',
              fillStyle: i === 0 ? '#FCFF63' : '#03C75A',
              strokeStyle: 'transparent',
            }))
          }
        }
      }
    },
    layout: {
      padding: 0
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 0
      }
    },
    scales: {
      r: {
        backgroundColor: 'white',
        pointLabels: {
          padding: 5,
          font: {
            family: 'Pretendard',
            weight: 'bold',
            size: 18,
          },
          color: 'var(--color-gray-100)',
        },
        ticks: {
          stepSize: 20,
          display: false,
        },
        beginAtZero: true,
        max: 100
      }
    }
  }), [dpr, enableAnimation]);

  const chartRef = useRef<HTMLDivElement>(null);
  const [chartKey, setChartKey] = useState(0);

  useEffect(() => {
    const target = chartRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEnableAnimation(false);
          setData(prev => ({
            ...prev,
            datasets: [
              {
                ...prev.datasets[0],
                data: baseData,
              },
              prev.datasets[1]
            ]
          }));
          setChartKey(prev => prev+1);
          changeToCompare();
        }
      },
      {
        threshold: 1, 
      }
    );

    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };

  }, []);

  return (
    <div ref={chartRef} className="h-[432px]">
      <Radar key={chartKey} options={options} data={data} plugins={[legendPositionPlugin]} />
    </div>
  )
}

export default memo(RadarChart);