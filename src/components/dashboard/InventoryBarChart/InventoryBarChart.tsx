import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Select } from 'antd';
import { inventoryBarChartLegendData } from '../../../data/dummyData';
import { useWindowSize } from '../../../hooks/useWindowSize';
import {
  formatCurrency,
  formatCurrencyFull,
  getChartScale,
} from '../../../utils/formatCurrency';
import styles from './InventoryBarChart.module.scss';
import type { InventoryBarLegendItem } from '../../../data/dummyData';

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

const { Option } = Select;

interface InventoryBarChartData {
  warehouses: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
  }[];
}

interface InventoryBarChartProps {
  title?: string;
  data?: InventoryBarChartData;
  legendData?: InventoryBarLegendItem[];
}

const InventoryBarChart: React.FC<InventoryBarChartProps> = ({
  title = 'Phân cấp chất lượng',
  data,
  legendData,
}) => {
  const { width } = useWindowSize();

  // State for filters and tabs
  const [selectedWarehouse, setSelectedWarehouse] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState('trangbi1');
  const [selectedTime, setSelectedTime] = useState('nam');
  const [activeTab, setActiveTab] = useState('tong');

  // Responsive barThickness dựa trên window width
  const getBarThickness = () => {
    if (width <= 480) return 12;
    if (width <= 768) return 18;
    if (width <= 1024) return 28;
    return 40;
  };

  const { categoryPercentage, barPercentage } = (() => {
    if (width <= 480) {
      return { categoryPercentage: 0.6, barPercentage: 0.6 };
    }
    if (width <= 768) {
      return { categoryPercentage: 0.7, barPercentage: 0.7 };
    }
    return { categoryPercentage: 0.8, barPercentage: 0.7 };
  })();

  // Updated data structure with actual currency values (VND)
  const defaultData = {
    warehouses: [
      'Trang bị nhóm 1',
      'Trang bị nhóm 2',
      'Vật tư nhóm 1',
      'Vật tư nhóm 2',
      'Vật chất',
    ],
    datasets: [
      {
        label: 'Cấp 1',
        data: [8500000000, 6200000000, 5800000000, 4100000000, 3200000000], // 8.5 tỷ, 6.2 tỷ, 5.8 tỷ, 4.1 tỷ, 3.2 tỷ
        backgroundColor: '#00524E',
      },
      {
        label: 'Cấp 2',
        data: [3800000000, 2900000000, 2400000000, 2100000000, 1800000000], // 3.8 tỷ, 2.9 tỷ, 2.4 tỷ, 2.1 tỷ, 1.8 tỷ
        backgroundColor: '#007D6E',
      },
      {
        label: 'Cấp 3',
        data: [2200000000, 1900000000, 1700000000, 1500000000, 1300000000], // 2.2 tỷ, 1.9 tỷ, 1.7 tỷ, 1.5 tỷ, 1.3 tỷ
        backgroundColor: '#ECC94B',
      },
      {
        label: 'Cấp 4',
        data: [1100000000, 950000000, 850000000, 750000000, 650000000], // 1.1 tỷ, 950 triệu, 850 triệu, 750 triệu, 650 triệu
        backgroundColor: '#DD6B20',
      },
      {
        label: 'Cấp 5',
        data: [580000000, 420000000, 380000000, 320000000, 280000000], // 580 triệu, 420 triệu, 380 triệu, 320 triệu, 280 triệu
        backgroundColor: '#E53E3E',
      },
    ],
  };

  const chartData = data || defaultData;
  const legends = legendData || inventoryBarChartLegendData;

  // Tính toán max value từ data để có scale phù hợp
  const allValues = chartData.datasets.flatMap((dataset) => dataset.data);
  const maxDataValue = Math.max(...allValues);
  const { max: maxScale, stepSize } = getChartScale(maxDataValue);

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
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.parsed.y;
            return `${context.dataset.label}: ${formatCurrencyFull(value)}`;
          },
        },
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
        max: maxScale,
        ticks: {
          stepSize: stepSize,
          callback: (value: any) => {
            return formatCurrency(value);
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
    barThickness: getBarThickness(),
    categoryPercentage: categoryPercentage,
    barPercentage: barPercentage,
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

  // Tab options
  const tabOptions = [
    { key: 'tong', label: 'Tổng' },
    { key: 'kho1', label: 'Kho 1' },
    { key: 'kho2', label: 'Kho 2' },
    { key: 'kho3', label: 'Kho 3' },
    { key: 'kho4', label: 'Kho 4' },
  ];

  return (
    <div className={styles.inventoryBarChart}>
      {/* Header with filters */}
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.headerFilters}>
          <Select
            value={selectedWarehouse}
            onChange={setSelectedWarehouse}
            className={styles.selectBox}
          >
            <Option value="all">Tất cả các kho</Option>
            <Option value="k92">Kho K92 (A,B)</Option>
            <Option value="k95">Kho K95 (A,B)</Option>
            <Option value="k97">Kho K97</Option>
            <Option value="k99">Kho K99</Option>
          </Select>

          <Select
            value={selectedGroup}
            onChange={setSelectedGroup}
            className={styles.selectBox}
          >
            <Option value="trangbi1">Trang bị nhóm 1</Option>
            <Option value="trangbi2">Trang bị nhóm 2</Option>
            <Option value="vattu1">Vật tư nhóm 1</Option>
            <Option value="vattu2">Vật tư nhóm 2</Option>
            <Option value="dtqg">DTQG</Option>
            <Option value="sscd">SSCĐ</Option>
            <Option value="khac">Khác</Option>
          </Select>

          <Select
            value={selectedTime}
            onChange={setSelectedTime}
            className={styles.selectBox}
          >
            <Option value="thang">Tháng</Option>
            <Option value="nam">Năm</Option>
          </Select>
        </div>
      </div>

      <div className={styles.divider} />

      {/* Tab buttons */}
      <div className={styles.tabContainer}>
        <div className={styles.tabGroup}>
          {tabOptions.map((tab) => (
            <button
              key={tab.key}
              className={`${styles.tabButton} ${activeTab === tab.key ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
                    style={
                      { '--legend-color': item.color } as React.CSSProperties
                    }
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
