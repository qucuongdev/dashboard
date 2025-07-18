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
    <div
      className={styles.barItem}
      style={
        {
          '--bar-background-color': backgroundColor,
          '--bar-fill-color': color,
          '--bar-percentage': `${percentage}%`,
        } as React.CSSProperties
      }
    >
      <div className={styles.categoryName}>{categoryName}</div>
      <div className={styles.barContainer}>
        <div className={styles.barBackground}>
          <div className={styles.barFill} />
        </div>
      </div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};

export default HorizontalBarItem;
