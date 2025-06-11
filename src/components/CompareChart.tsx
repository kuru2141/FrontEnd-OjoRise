"use client"

import { memo } from "react";
import { ChartOptions, ChartData } from "chart.js/auto";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from "react-chartjs-2";


function CompareChart() {
  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  
  const labels = ['월정액', '데이터', '음성통화', '문자', '혜택'];

  const data: ChartData<'radar'> = {
    labels,
    datasets: [   
      {
        label: '비교 요금제',
        data: [28, 48, 40, 19, 96],
        backgroundColor: 'rgba(3, 199, 90, 0.4)', 
        borderColor: 'rgba(3, 199, 90, 1)',
      },
      {
        label: '기준 요금제',
        data: [65, 59, 90, 81, 56],
        backgroundColor: 'rgba(252, 255, 99, 0.4)', 
        borderColor: 'rgba(252, 255, 99, 1)',   
      }
    ]
  };

  const options: ChartOptions<'radar'> = {
    responsive: true, // 부모 넓이 따라감
    maintainAspectRatio: false, // 부모의 가로세로 비율 따라감
    plugins: {
      title: {
        display: false
      },
      legend: {
        position: 'right',
        labels: {
          font: {
            family: 'Pretendard',
            size: 14,
          },
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 10,
          boxHeight: 10,
          color: '#222022',
          generateLabels: (chart) => {
            return [...chart.data.datasets].reverse().map((dataset, i) => ({
              text: dataset.label ?? '',
              fillStyle: i === 0 ? '#FCFF63' : '#03C75A',
              strokeStyle: 'transparent',
            }))
          }
        }
      }
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
          font: {
            family: 'Pretendard',
            weight: 'bold',
            size: 18
          },
          color: '#222022',
        },
        ticks: {
          display: false
        },
        beginAtZero: true,
        max: 100
      }
    },
    animation: {
      duration: 250
    },
  }
  return (
    <Radar options={options} data={data}/>
  )
}

export default memo(CompareChart);