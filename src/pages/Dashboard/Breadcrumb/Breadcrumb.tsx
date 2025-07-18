import React, { useState } from 'react';
import { Select, DatePicker, Space } from 'antd';
import styles from './Breadcrumb.module.scss';
import type { OrganizationLevel } from '../../../types';
import { ORGANIZATION_LABELS } from '../../../types';
import dayjs from 'dayjs';

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
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>(() => {
    const end = dayjs().hour(23).minute(59).second(59);
    const start = end.subtract(6, 'day'); // 7 ngày gồm cả hôm nay
    return [start, end];
  });

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
    setDateRange(dates);

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
      <div className={styles.actions}>
        <div className={styles.selectRow}>
          <Select
            value={selectedOrganization}
            className={styles.organizationSelect}
            options={unitOptions}
            onChange={handleOrganizationChange}
          />
          <Select
            defaultValue="chihuy"
            className={styles.roleSelect}
            options={[
              { value: 'chihuy', label: 'Chỉ huy' },
              { value: 'phochihuy', label: 'Phó chỉ huy' },
              { value: 'truongphong', label: 'Trưởng phòng' },
              { value: 'nhanvien', label: 'Nhân viên' },
            ]}
          />
        </div>
        <RangePicker value={dateRange} onChange={handleDateChange} />
      </div>
    </div>
  );
};

export default Breadcrumb;
