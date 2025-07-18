import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import styles from './GroupedBarChart.module.scss';
import type { WarehouseChartData } from '../../../types';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = [
  '#007D6E',
  '#0074D6',
  '#00B5E2',
  '#1982C4',
  '#38A169',
  '#FFC300',
  '#FF9F1C',
  '#FF6F61',
  '#E53E3E',
  '#6C757D',
  '#845EC2',
  '#D65DB1',
  '#DD6B20',
];

const legendData = [
  { label: 'Mua sắm sửa chữa', color: chartColors[0] },
  { label: 'Ngoài kế hoạch', color: chartColors[1] },
  { label: 'Tạm nhận', color: chartColors[2] },
  { label: 'Sửa chữa, sản xuất', color: chartColors[3] },
  { label: 'Điều chỉnh mã', color: chartColors[4] },
  { label: 'Điều động', color: chartColors[5] },
  { label: 'Vật tư SSCĐ thường xuyên', color: chartColors[6] },
  { label: 'Thu hồi', color: chartColors[7] },
  { label: 'KHSX (T. tỉnh)', color: chartColors[8] },
  { label: 'Trên cấp', color: chartColors[9] },
  { label: 'Trao đổi', color: chartColors[10] },
  { label: 'Chỉ tiêu SEC ngành', color: chartColors[11] },
  { label: 'Bổ sung giá', color: chartColors[12] },
];

interface GroupedBarChartProps {
  warehousesData?: WarehouseChartData[];
}

const GroupedBarChart: React.FC<GroupedBarChartProps> = ({
  warehousesData,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  // Use real data if provided, otherwise fallback to dummy data
  const hasData = warehousesData && warehousesData.length > 0;

  const simpleLabels = hasData
    ? warehousesData.map((warehouse) => warehouse.warehouseName)
    : Array.from({ length: 13 }, (_, i) => `Kho ${i + 1}`);

  const detailedLabels = hasData
    ? warehousesData.map((warehouse) => [
        `TDM: ${warehouse.tdm}`,
        `TSL: ${warehouse.tsl.toLocaleString('vi-VN')}`,
        `CL: ${warehouse.cl}%`,
      ])
    : Array.from({ length: 13 }, () => ['TDM: 12', 'TSL: 2000', 'CL: 25%']);

  const chartData = hasData
    ? warehousesData.map((warehouse) => warehouse.value)
    : [120, 340, 560, 220, 700, 300, 200, 1000, 420, 600, 550, 760, 120];

  const data = {
    labels: (isExpanded ? detailedLabels : simpleLabels) as any,
    datasets: [
      {
        label: 'Số lượng',
        data: chartData,
        backgroundColor: chartColors,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
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
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
          font: {
            size: isExpanded ? 10 : 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 1000,
        ticks: {
          stepSize: 100,
        },
      },
    },
  };

  return (
    <div className={styles.chartWrapper}>
      <div className={styles.chartCanvas}>
        <Bar options={options} data={data} />
      </div>
      {!isExpanded && (
        <div className={styles.legendContainer}>
          {legendData.map((item) => (
            <div key={item.label} className={styles.legendItem}>
              <div
                className={styles.legendColor}
                style={{ '--legend-color': item.color } as React.CSSProperties}
              />
              <span className={styles.legendLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={styles.toggleButton}
      >
        {isExpanded ? 'Xem thêm' : 'Thu gọn'}
      </button>
    </div>
  );
};

export default GroupedBarChart;
