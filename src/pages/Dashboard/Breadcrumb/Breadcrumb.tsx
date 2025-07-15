import React from 'react';
import { Select, DatePicker, Space } from 'antd';
import styles from './Breadcrumb.module.scss';
import type { OrganizationLevel } from '../../../types';
import { ORGANIZATION_LABELS } from '../../../types';

const { RangePicker } = DatePicker;

interface BreadcrumbProps {
  selectedOrganization?: OrganizationLevel;
  onOrganizationChange?: (level: OrganizationLevel) => void;
  onDateRangeChange?: (dates: [Date, Date] | null) => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  selectedOrganization = 'total',
  onOrganizationChange,
  onDateRangeChange,
}) => {
  const unitOptions = Object.entries(ORGANIZATION_LABELS).map(
    ([key, label]) => ({
      value: key,
      label,
    })
  );

  const handleOrganizationChange = (value: string) => {
    if (onOrganizationChange) {
      onOrganizationChange(value as OrganizationLevel);
    }
  };

  const handleDateChange = (dates: any) => {
    if (onDateRangeChange) {
      if (dates && dates.length === 2) {
        onDateRangeChange([dates[0].toDate(), dates[1].toDate()]);
      } else {
        onDateRangeChange(null);
      }
    }
  };

  return (
    <div className={styles.breadcrumbContainer}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.pageTitle}>Chào đồng chí, Nguyễn Văn A</h1>
        <p className={styles.description}>
          Quản lý thực lực trang bị, vật tư, vật chất
        </p>
      </div>
      <Space size="middle" className={styles.actions}>
        <Select
          value={selectedOrganization}
          style={{ width: 140 }}
          options={unitOptions}
          onChange={handleOrganizationChange}
        />
        <RangePicker onChange={handleDateChange} />
      </Space>
    </div>
  );
};

export default Breadcrumb;
