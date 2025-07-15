import React from 'react';
import styles from './HorizontalBarItem.module.scss';

interface HorizontalBarItemProps {
  categoryName: string;
  value: string;
  percentage: number;
  color: string;
  backgroundColor?: string;
}

const HorizontalBarItem: React.FC<HorizontalBarItemProps> = ({
  categoryName,
  value,
  percentage,
  color,
  backgroundColor = '#DDE3E7',
}) => {
  return (
    <div className={styles.barItem}>
      <div className={styles.categoryName}>{categoryName}</div>
      <div className={styles.barContainer}>
        <div className={styles.barBackground} style={{ backgroundColor }}>
          <div
            className={styles.barFill}
            style={{
              width: `${percentage}%`,
              backgroundColor: color,
            }}
          />
        </div>
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default HorizontalBarItem;
