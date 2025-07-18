import React, { useState, useEffect } from 'react';
import { Select, Spin } from 'antd';
import styles from './WarehouseInfo.module.scss';
import InfoCard from '../../../components/dashboard/InfoCard/InfoCard';
import UpdatingIndicator from '../../../components/common/UpdatingIndicator';
import { api } from '../../../services/api';
import type {
  WarehouseOperationsData,
  OrganizationLevel,
} from '../../../types';

const { Option } = Select;

const ArrowDownIcon = '/src/assets/icons/icon-arrow-down.svg';

interface WarehouseInfoProps {
  selectedOrganization: OrganizationLevel;
}

const WarehouseInfo: React.FC<WarehouseInfoProps> = ({
  selectedOrganization,
}) => {
  const [warehouseData, setWarehouseData] =
    useState<WarehouseOperationsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Load warehouse operations data
  useEffect(() => {
    const loadWarehouseData = async () => {
      try {
        if (isInitialLoad) {
          setLoading(true);
        } else {
          setUpdating(true);
        }

        const response =
          await api.warehouseOperations.getOperations(selectedOrganization);
        if (response.success) {
          setWarehouseData(response.data);
        }
      } catch (error) {
        console.error('Failed to load warehouse operations data:', error);
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          setIsInitialLoad(false);
        } else {
          setUpdating(false);
        }
      }
    };

    loadWarehouseData();
  }, [selectedOrganization, isInitialLoad]);

  if (loading) {
    return (
      <div className={styles.warehouseInfoContainer}>
        <div className={styles.header}>
          <h2>Công tác nghiệp vụ nhà kho</h2>
        </div>
        <div className={styles.loadingContainer}>
          <Spin size="large" />
          <p className={styles.loadingText}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!warehouseData) {
    return (
      <div className={styles.warehouseInfoContainer}>
        <div className={styles.header}>
          <h2>Công tác nghiệp vụ nhà kho</h2>
        </div>
        <div className={styles.noDataContainer}>
          <p>Không có dữ liệu</p>
        </div>
      </div>
    );
  }

  const sectionsData = warehouseData.sections;

  return (
    <div className={styles.warehouseInfoContainer}>
      <div className={styles.header}>
        <h2>Nghiệp vụ nhập, xuất kho</h2>
        <div className={styles.filters}>
          <Select defaultValue="nganh" className={styles.selectBox}>
            <Option value="nganh">Ngành</Option>
            <Option value="so_luong">Số lượng</Option>
            <Option value="cap_chat_luong">Cấp chất lượng</Option>
            <Option value="gia_tri">Giá trị</Option>
          </Select>

          <Select defaultValue="all" className={styles.selectBox}>
            <Option value="all">Thành tiền</Option>
            <Option value="asset_group">Theo nhóm tài sản</Option>
            <Option value="inventory_status">Theo trạng thái tồn kho</Option>
            <Option value="quality_level">Theo cấp chất lượng</Option>
            <Option value="value_range">Theo khoảng giá trị</Option>
          </Select>

          <Select defaultValue="all" className={styles.selectBox}>
            <Option value="all">Tất cả các kho</Option>
            <Option value="k92">Kho K92 (A,B)</Option>
            <Option value="k95">Kho K95 (A,B)</Option>
            <Option value="k97">Kho K97</Option>
            <Option value="k98">Kho K98</Option>
          </Select>

          <Select defaultValue="nam" className={styles.selectBox}>
            <Option value="always">Thường xuyên</Option>
            <Option value="nam">Năm</Option>
          </Select>
        </div>
      </div>

      {sectionsData.map((section) => (
        <div
          className={`${styles.categorySection} ${updating ? styles.updating : ''}`}
          key={section.title}
        >
          <div className={styles.categoryHeader}>
            <h3>{section.title}</h3>
            <img src={ArrowDownIcon} alt="arrow down" />
          </div>
          <div className={styles.cardsGrid}>
            {section.cards.map((card, index) => (
              <InfoCard
                key={index}
                title={card.title}
                total={card.total}
                details={card.details.map((detail) => ({
                  label: detail.label,
                  value: detail.value.toString(),
                }))}
                color={section.color}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WarehouseInfo;
