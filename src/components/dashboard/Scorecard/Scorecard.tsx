import React from 'react';
import styles from './Scorecard.module.scss';

interface ScorecardProps {
  title: string;
  unit: string;
  value: string;
  change: string;
  isPrimary?: boolean;
}

const Scorecard: React.FC<ScorecardProps> = ({
  title,
  unit,
  value,
  change,
  isPrimary = false,
}) => {
  const cardClasses = `${styles.scorecard} ${isPrimary ? styles.primary : ''}`;
  const valueClasses = `${styles.value} ${isPrimary ? styles.primaryValue : ''}`;
  const indicatorClasses = `${isPrimary ? styles.primaryIndicator : styles.indicator}`;

  return (
    <div className={cardClasses}>
      <div className={indicatorClasses}></div>
      <div className={styles.content}>
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          <span className={styles.unit}>{unit}</span>
        </div>
        <div className={valueClasses}>{value}</div>
        <div className={styles.change}>{change}</div>
      </div>
    </div>
  );
};

export default Scorecard;
