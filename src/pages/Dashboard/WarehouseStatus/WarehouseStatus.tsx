import React, { useState } from 'react';
import styles from './WarehouseStatus.module.scss';
import { Select } from 'antd';

interface Detail {
  label: string;
  value: string;
}

interface WarehouseCardProps {
  title: string;
  totalArea: string;
  warehouseCount: number;
  usagePercentage: number;
  usageColor: string;
  details: Detail[];
}

const ProgressBar: React.FC<{ percentage: number; color: string }> = ({
  percentage,
  color,
}) => (
  <div className={styles.progressBarContainer}>
    <div className={styles.progressBarTrack}>
      <div
        className={styles.progressBar}
        style={{ width: `${percentage}%`, backgroundColor: color }}
      ></div>
    </div>
  </div>
);

const WarehouseCard: React.FC<WarehouseCardProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(true); // Expand all cards by default

  return (
    <div className={styles.warehouseCard}>
      <div className={styles.cardHeader}>
        <span>{props.title}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.mainInfo}>
          <span className={styles.totalArea}>{props.totalArea}</span>
          <span className={styles.warehouseCount}>
            m² ({props.warehouseCount} Kho)
          </span>
        </div>
        <div className={styles.usage}>
          <span>Sử dụng</span>
          <span>{props.usagePercentage}%</span>
        </div>
        <ProgressBar
          percentage={props.usagePercentage}
          color={props.usageColor}
        />

        {isExpanded && (
          <div className={styles.details}>
            {props.details.map((detail, index) => (
              <div key={index} className={styles.detailItem}>
                <span>{detail.label}</span>
                <span>{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={styles.toggleButton}
        >
          {isExpanded ? 'Thu gọn' : 'Xem thêm'}
        </button>
      </div>
    </div>
  );
};

const WarehouseStatus: React.FC = () => {
  const [viewBy, setViewBy] = useState<string>('amount');
  const [warehouseFilter, setWarehouseFilter] = useState<string>('all');

  const warehouseData: WarehouseCardProps[] = [
    {
      title: 'Tổng diện tích kho K92 (A,B)',
      totalArea: '30,410',
      warehouseCount: 3,
      usagePercentage: 25,
      usageColor: '#D69E2E',
      details: [
        { label: 'Chỉ huy kho', value: 'Nguyễn Văn A' },
        { label: 'Vị trí đóng quân', value: 'A' },
        { label: 'Tổng diện tích đất (m²)', value: '15362' },
        { label: 'Tổng số nhà kho', value: '2' },
        { label: 'Tổng diện tích (m²)', value: '15362' },
        { label: 'Trữ lượng (tấn)', value: '15362' },
        { label: 'Đã sử dụng (m²)', value: '15362' },
        { label: 'Còn trống (m²)', value: '15362' },
        { label: 'Người quản lý', value: 'Nguyễn Văn A' },
      ],
    },
    {
      title: 'Tổng diện tích kho K95 (A,B)',
      totalArea: '2,299',
      warehouseCount: 2,
      usagePercentage: 60,
      usageColor: '#0074D6',
      details: [
        { label: 'Chỉ huy kho', value: 'Nguyễn Văn B' },
        { label: 'Vị trí đóng quân', value: 'A' },
        { label: 'Tổng diện tích đất (m²)', value: '15362' },
        { label: 'Tổng số nhà kho', value: '2' },
        { label: 'Tổng diện tích (m²)', value: '15362' },
        { label: 'Trữ lượng (tấn)', value: '15362' },
        { label: 'Đã sử dụng (m²)', value: '15362' },
        { label: 'Còn trống (m²)', value: '15362' },
        { label: 'Người quản lý', value: 'Nguyễn Văn B' },
      ],
    },
    {
      title: 'Tổng diện tích kho K97',
      totalArea: '47,785',
      warehouseCount: 1,
      usagePercentage: 85,
      usageColor: '#39B89C',
      details: [
        { label: 'Chỉ huy kho', value: 'Nguyễn Văn C' },
        { label: 'Vị trí đóng quân', value: 'A' },
        { label: 'Tổng diện tích đất (m²)', value: '15362' },
        { label: 'Tổng số nhà kho', value: '2' },
        { label: 'Tổng diện tích (m²)', value: '15362' },
        { label: 'Trữ lượng (tấn)', value: '15362' },
        { label: 'Đã sử dụng (m²)', value: '15362' },
        { label: 'Còn trống (m²)', value: '15362' },
        { label: 'Người quản lý', value: 'Nguyễn Văn C' },
      ],
    },
    {
      title: 'Tổng diện tích kho K99',
      totalArea: '31,199',
      warehouseCount: 1,
      usagePercentage: 45,
      usageColor: '#4B96E7',
      details: [
        { label: 'Chỉ huy kho', value: 'Nguyễn Văn D' },
        { label: 'Vị trí đóng quân', value: 'A' },
        { label: 'Tổng diện tích đất (m²)', value: '15362' },
        { label: 'Tổng số nhà kho', value: '2' },
        { label: 'Tổng diện tích (m²)', value: '15362' },
        { label: 'Trữ lượng (tấn)', value: '15362' },
        { label: 'Đã sử dụng (m²)', value: '15362' },
        { label: 'Còn trống (m²)', value: '15362' },
        { label: 'Người quản lý', value: 'Nguyễn Văn D' },
      ],
    },
  ];

  return (
    <div className={styles.warehouseStatusContainer}>
      <div className={styles.header}>
        <h2>Quản lý nhà kho</h2>
        <div className={styles.filters}>
          <Select
            value={viewBy}
            onChange={setViewBy}
            options={[
              { value: 'amount', label: 'Xem theo thành tiền' },
              { value: 'quantity', label: 'Xem theo số lượng' },
              { value: 'area', label: 'Xem theo diện tích' },
            ]}
            className={styles.selectBox}
          />
          <Select
            value={warehouseFilter}
            onChange={setWarehouseFilter}
            options={[
              { value: 'all', label: 'Tất cả các kho' },
              { value: 'main', label: 'Kho chính' },
              { value: 'branch', label: 'Kho chi nhánh' },
              { value: 'temp', label: 'Kho tạm thời' },
            ]}
            className={styles.selectBox}
          />
        </div>
      </div>
      <div className={styles.cardsList}>
        {warehouseData.map((data, index) => (
          <WarehouseCard key={index} {...data} />
        ))}
      </div>
    </div>
  );
};

export default WarehouseStatus;
