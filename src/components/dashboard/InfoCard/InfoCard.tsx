import React from 'react';
import styles from './InfoCard.module.scss';
import { getOperationColor } from '../../../utils/warehouseColors';

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
    <div
      className={styles.infoCard}
      style={{ '--info-card-color': color } as React.CSSProperties}
    >
      <div className={styles.cardHeader}>
        <span>{title}</span>
        <span className={styles.total}>{total}</span>
      </div>
      <div className={styles.cardBody}>
        {details.map((item, index) => {
          const operationColor = getOperationColor(item.label);
          return (
            <div key={index} className={styles.detailItem}>
              <span
                className={styles.detailLabel}
                style={{ color: operationColor }}
              >
                {item.label}
              </span>
              <span
                className={styles.detailValue}
                style={{ color: operationColor }}
              >
                {item.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InfoCard;
