import React from 'react';
import styles from './InfoCard.module.scss';

interface InfoCardProps {
  title: string;
  total: string;
  details: { label: string; value: string }[];
  color: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  title,
  total,
  details,
  color,
}) => {
  return (
    <div className={styles.infoCard} style={{ borderLeftColor: color }}>
      <div className={styles.cardHeader}>
        <span>{title}</span>
        <span className={styles.total} style={{ color: color }}>
          {total}
        </span>
      </div>
      <div className={styles.cardBody}>
        {details.map((item, index) => (
          <div key={index} className={styles.detailItem}>
            <span>{item.label}</span>
            <span>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCard;
