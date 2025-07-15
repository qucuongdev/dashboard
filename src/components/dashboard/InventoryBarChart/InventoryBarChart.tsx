import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styles from './InventoryBarChart.module.scss';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Hook để detect window size
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

interface InventoryBarChartProps {
  title?: string;
  data?: {
    warehouses: string[];
    datasets: {
      label: string;
      data: number[];
      backgroundColor: string;
    }[];
  };
  legendData?: {
    label: string;
    color: string;
    percent: string;
    num1: string;
    num2: string;
    num3: string;
  }[];
}

const InventoryBarChart: React.FC<InventoryBarChartProps> = ({
  title = 'Tồn Kho Trang Bị Nhóm 1',
  data,
  legendData,
}) => {
  const { width } = useWindowSize();

  // Responsive barThickness dựa trên window width
  const getBarThickness = () => {
    if (width <= 480) return 12; // Mobile - giảm xuống 12
    if (width <= 768) return 18; // Tablet - giảm xuống 18
    if (width <= 1024) return 28; // Small desktop
    return 40; // Large desktop
  };

  // Responsive category và bar percentage
  const getResponsivePercentages = () => {
    if (width <= 480) {
      return {
        categoryPercentage: 0.7, // Mobile - giảm để có khoảng cách
        barPercentage: 0.8,
      };
    }
    if (width <= 768) {
      return {
        categoryPercentage: 0.8,
        barPercentage: 0.85,
      };
    }
    return {
      categoryPercentage: 0.9,
      barPercentage: 0.95,
    };
  };

  const { categoryPercentage, barPercentage } = getResponsivePercentages();

  // Default data structure matching Figma design
  const defaultData = {
    warehouses: ['K92 (A,B,C)', 'K95 (A,B,C)', 'K97', 'K99'],
    datasets: [
      {
        label: 'Cấp 1',
        data: [8, 6, 4, 3],
        backgroundColor: '#00524E',
      },
      {
        label: 'Cấp 2',
        data: [3, 7, 5, 2],
        backgroundColor: '#007D6E',
      },
      {
        label: 'Cấp 3',
        data: [4, 5, 6, 3],
        backgroundColor: '#ECC94B',
      },
      {
        label: 'Cấp 4',
        data: [2, 3, 4, 2],
        backgroundColor: '#DD6B20',
      },
      {
        label: 'Cấp 5',
        data: [3, 2, 3, 2],
        backgroundColor: '#E53E3E',
      },
    ],
  };

  const defaultLegendData = [
    {
      label: 'Cấp 1',
      color: '#00524E',
      percent: '36%',
      num1: '12',
      num2: '1200',
      num3: '132.3K',
    },
    {
      label: 'Cấp 2',
      color: '#007D6E',
      percent: '21%',
      num1: '10',
      num2: '450',
      num3: '89.5K',
    },
    {
      label: 'Cấp 3',
      color: '#ECC94B',
      percent: '17%',
      num1: '8',
      num2: '300',
      num3: '55.1K',
    },
    {
      label: 'Cấp 4',
      color: '#DD6B20',
      percent: '9%',
      num1: '5',
      num2: '350',
      num3: '32.6K',
    },
    {
      label: 'Cấp 5',
      color: '#E53E3E',
      percent: '7%',
      num1: '3',
      num2: '250',
      num3: '2.6K',
    },
  ];

  const chartData = data || defaultData;
  const legends = legendData || defaultLegendData;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // We'll use custom legend
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: 'Public Sans',
            size: 12,
          },
          color: '#6E7880',
        },
      },
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 2.5,
          callback: (value: any) => {
            if (value === 0) return '0';
            if (value === 2.5) return '1 tỷ';
            if (value === 5) return '5 tỷ';
            if (value === 10) return '10 tỷ';
            return value;
          },
          font: {
            family: 'Public Sans',
            size: 12,
          },
          color: '#6E7880',
        },
        grid: {
          color: '#DDE3E7',
        },
      },
    },
    barThickness: getBarThickness(), // Tăng từ 16 lên 24
    categoryPercentage: categoryPercentage, // Tăng từ 0.8 lên 0.9
    barPercentage: barPercentage, // Tăng từ 0.9 lên 0.95
  };

  const barData = {
    labels: chartData.warehouses,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      borderRadius: {
        topLeft: 2,
        topRight: 2,
        bottomLeft: 0,
        bottomRight: 0,
      },
    })),
  };

  return (
    <div className={styles.inventoryBarChart}>
      {/* Header */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.divider} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        {/* Chart Area */}
        <div className={styles.chartArea}>
          <div className={styles.chartContainer}>
            <Bar data={barData} options={options} />
          </div>
        </div>

        {/* Legend */}
        <div className={styles.legendArea}>
          <div className={styles.legend}>
            {legends.map((item) => (
              <div key={item.label} className={styles.legendRow}>
                <div className={styles.legendInfo}>
                  <div
                    className={styles.legendColor}
                    style={{ backgroundColor: item.color }}
                  />
                  <span className={styles.legendLabel}>{item.label}</span>
                </div>
                <div className={styles.legendNumbers}>
                  <span className={styles.percent}>{item.percent}</span>
                  <span className={styles.number}>{item.num1}</span>
                  <span className={styles.number}>{item.num2}</span>
                  <span className={styles.number}>{item.num3}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryBarChart;
