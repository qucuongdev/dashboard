import React from 'react';
import { Divider, Select } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import styles from './DonutChartCard.module.scss';
import HorizontalBarItem from './HorizontalBarItem';
import type { HorizontalBarData } from '../../../data/donutChartConfig';

ChartJS.register(ArcElement, Tooltip);

const { Option } = Select;

interface ChartSegment {
  percentage: number;
  color: string;
}

interface DonutChartCardProps {
  title: string;
  totalValue: string;
  totalDescription: string;
  chartData: ChartSegment[];
  hideActions?: boolean;
  horizontalBarData?: HorizontalBarData[];
}

const DonutChartCard: React.FC<DonutChartCardProps> = ({
  title,
  totalValue,
  totalDescription,
  chartData,
  hideActions = false,
  horizontalBarData,
}) => {
  const doughnutData = {
    datasets: [
      {
        data: chartData.map((item) => item.percentage),
        backgroundColor: chartData.map((item) => item.color),
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',
    plugins: {
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      <div className={styles.content}>
        {!hideActions && (
          <div className={styles.actions}>
            <Select defaultValue="nganh" className={styles.selectBox}>
              <Option value="nganh">Ngành</Option>
              <Option value="sl">SL</Option>
              <Option value="cap_cl">Cấp CL</Option>
              <Option value="gia_tri">Giá trị</Option>
            </Select>
          </div>
        )}
        <div className={styles.chartContainer}>
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className={styles.chartText}>
            <div className={styles.chartTotalValue}>{totalValue}</div>
            <div className={styles.chartTotalDescription}>
              {totalDescription}
            </div>
          </div>
        </div>
        {horizontalBarData && (
          <div className={styles.horizontalBarSection}>
            {horizontalBarData.map((barData, index) => (
              <HorizontalBarItem
                key={index}
                categoryName={barData.categoryName}
                value={barData.value}
                percentage={barData.percentage}
                color={barData.color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonutChartCard;
