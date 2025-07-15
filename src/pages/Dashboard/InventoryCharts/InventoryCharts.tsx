import React, { useState, useEffect } from 'react';
import { Switch, Select, Row, Col, Spin } from 'antd';
import styles from './InventoryCharts.module.scss';
import GroupedBarChart from '../../../components/dashboard/GroupedBarChart/GroupedBarChart';
import { api } from '../../../services/api';
import type { InventoryChartsData, OrganizationLevel } from '../../../types';

const { Option } = Select;

interface InventoryChartsProps {
  selectedOrganization: OrganizationLevel;
}

const InventoryCharts: React.FC<InventoryChartsProps> = ({
  selectedOrganization,
}) => {
  const [inventoryData, setInventoryData] =
    useState<InventoryChartsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [operationType, setOperationType] = useState<'nhap' | 'xuat'>('nhap');

  // Load inventory charts data
  useEffect(() => {
    const loadInventoryData = async () => {
      try {
        setLoading(true);
        const response = await api.inventoryCharts.getInventoryCharts(
          selectedOrganization,
          operationType
        );
        if (response.success) {
          setInventoryData(response.data);
        }
      } catch (error) {
        console.error('Failed to load inventory charts data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadInventoryData();
  }, [selectedOrganization, operationType]);

  if (loading) {
    return (
      <div className={styles.inventoryContainer}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>Đang tải dữ liệu biểu đồ...</p>
        </div>
      </div>
    );
  }

  if (!inventoryData) {
    return (
      <div className={styles.inventoryContainer}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Không có dữ liệu biểu đồ</p>
        </div>
      </div>
    );
  }
  return (
    <div className={styles.inventoryContainer}>
      <div className={styles.header}>
        <div className={styles.filters}>
          <Select
            value={operationType}
            onChange={(value: 'nhap' | 'xuat') => setOperationType(value)}
            className={styles.selectBox}
          >
            <Option value="nhap">Nhập</Option>
            <Option value="xuat">Xuất</Option>
          </Select>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        {inventoryData.categories.map((category) => (
          <Col key={category.categoryKey} xs={24} lg={12}>
            <div className={styles.chartCard}>
              <div className={styles.chartHeader}>{category.categoryName}</div>
              <GroupedBarChart warehousesData={category.warehouses} />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default InventoryCharts;
