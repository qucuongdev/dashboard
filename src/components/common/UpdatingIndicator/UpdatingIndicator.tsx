import React from 'react';
import { Spin } from 'antd';
import styles from './UpdatingIndicator.module.scss';

interface UpdatingIndicatorProps {
  /** Text hiển thị */
  text?: string;
  /** Vị trí hiển thị */
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'center';
  /** Kích thước spinner */
  size?: 'small' | 'default' | 'large';
  /** Có hiển thị hay không */
  visible?: boolean;
  /** Custom className */
  className?: string;
  /** Background color theme */
  theme?: 'primary' | 'success' | 'warning' | 'info';
}

const UpdatingIndicator: React.FC<UpdatingIndicatorProps> = ({
  text = 'Đang cập nhật dữ liệu...',
  position = 'top-right',
  size = 'small',
  visible = true,
  className,
  theme = 'primary',
}) => {
  if (!visible) return null;

  const getPositionClasses = () => {
    const baseClasses = [styles.updatingIndicator];

    if (className) baseClasses.push(className);

    switch (position) {
      case 'top-right':
        baseClasses.push(styles.topRight);
        break;
      case 'top-left':
        baseClasses.push(styles.topLeft);
        break;
      case 'bottom-right':
        baseClasses.push(styles.bottomRight);
        break;
      case 'bottom-left':
        baseClasses.push(styles.bottomLeft);
        break;
      case 'center':
        baseClasses.push(styles.center);
        break;
      default:
        baseClasses.push(styles.topRight);
    }

    baseClasses.push(styles[theme]);

    return baseClasses.join(' ');
  };

  return (
    <div className={getPositionClasses()}>
      <Spin size={size} className={styles.updatingSpinner} />
      {text}
    </div>
  );
};

export default UpdatingIndicator;
