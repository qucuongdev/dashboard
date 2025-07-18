import React, { useState } from 'react';
import styles from './WarehouseStatus.module.scss';
import { Select, Tooltip } from 'antd';
import {
  warehouseStatusData,
  warehouseViewOptions,
  warehouseFilterOptions,
  type WarehouseStatusCard,
} from '../../../data/dummyData';

// Using types from dummyData.ts
type Detail = { label: string; value: string };
type WarehouseCardProps = WarehouseStatusCard;

const ProgressBar: React.FC<{
  percentage: number;
  color: string;
  totalArea: string;
}> = ({ percentage, color, totalArea }) => {
  // Parse total area và tính diện tích còn lại
  const totalAreaNumber = parseFloat(totalArea.replace(/,/g, ''));
  const remainingArea = Math.round(
    (totalAreaNumber * (100 - percentage)) / 100
  );
  const formattedRemainingArea = remainingArea.toLocaleString('vi-VN');

  return (
    <Tooltip
      title={
        <div>
          <div>Tỷ lệ sử dụng: {percentage}%</div>
          <div>Còn lại: {formattedRemainingArea} m²</div>
        </div>
      }
      placement="top"
      arrow={false}
    >
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBarTrack}>
          <div
            className={styles.progressBar}
            style={
              {
                '--progress-width': `${percentage}%`,
                '--progress-color': color,
              } as React.CSSProperties
            }
          ></div>
        </div>
      </div>
    </Tooltip>
  );
};

const WarehouseCard: React.FC<WarehouseCardProps> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false); // Expand all cards by default

  return (
    <div className={styles.warehouseCard}>
      <div className={styles.cardHeader}>
        <span>{props.title}</span>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.mainInfo}>
          <span className={styles.sizeTitle}>{props.sizeTitle}</span>
          <span className={styles.totalArea}>
            {props.totalArea}
            <span className={styles.warehouseCount}>
              m² ({props.warehouseCount} Kho)
            </span>
          </span>
        </div>
        <div className={styles.usage}>
          <span>Sử dụng</span>
          <span>{props.usagePercentage}%</span>
        </div>
        <ProgressBar
          percentage={props.usagePercentage}
          color={props.usageColor}
          totalArea={props.totalArea}
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

  // Use centralized warehouse data
  const warehouseData = warehouseStatusData;

  return (
    <div className={styles.warehouseStatusContainer}>
      <div className={styles.header}>
        <h2>Quản lý nhà kho</h2>
        <div className={styles.filters}>
          <Select
            value={viewBy}
            onChange={setViewBy}
            options={warehouseViewOptions}
            className={styles.selectBox}
          />
          <Select
            value={warehouseFilter}
            onChange={setWarehouseFilter}
            options={warehouseFilterOptions}
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
