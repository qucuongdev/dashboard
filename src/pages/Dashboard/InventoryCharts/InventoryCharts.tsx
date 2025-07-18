import React, { useState, useEffect } from 'react';
import { Select, Row, Col } from 'antd';
import styles from './InventoryCharts.module.scss';
import GroupedBarChart from '../../../components/dashboard/GroupedBarChart/GroupedBarChart';
import UpdatingIndicator from '../../../components/common/UpdatingIndicator';
import { api } from '../../../services/api';
import { inventoryChartsData } from '../../../data/dummyData';
import type {
  InventoryChartsData,
  OrganizationLevel,
  WarehouseChartData,
} from '../../../types';

const { Option } = Select;

interface InventoryChartsProps {
  selectedOrganization: OrganizationLevel;
  disableUpdatingIndicator?: boolean;
}

const InventoryCharts: React.FC<InventoryChartsProps> = ({
  selectedOrganization,
  disableUpdatingIndicator = false,
}) => {
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [operationType, setOperationType] = useState<'nhap' | 'xuat'>('nhap');
  const [selectedCategory, setSelectedCategory] = useState<string>('trangbi1');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('thang');

  // Handle category change with updating indicator
  const handleCategoryChange = async (value: string) => {
    setUpdating(true);

    // Simulate loading delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    setSelectedCategory(value);
    setUpdating(false);
  };

  // Handle operation type change with updating indicator
  const handleOperationTypeChange = async (value: 'nhap' | 'xuat') => {
    setUpdating(true);

    // Simulate loading delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    setOperationType(value);
    setUpdating(false);
  };

  // Handle period change with updating indicator
  const handlePeriodChange = async (value: string) => {
    setUpdating(true);

    // Simulate loading delay for smooth UX
    await new Promise((resolve) => setTimeout(resolve, 300));

    setSelectedPeriod(value);
    setUpdating(false);
  };

  // Get current inventory data based on selections
  const getCurrentInventoryData = (): InventoryChartsData => {
    return inventoryChartsData[selectedOrganization][operationType];
  };

  // Get warehouse data for selected category
  const getWarehouseDataForCategory = (): WarehouseChartData[] => {
    const inventoryData = getCurrentInventoryData();

    // Map category keys to select values
    const categoryMap: { [key: string]: string } = {
      trangBiNhom1: 'trangbi1',
      trangBiNhom2: 'trangbi2',
      vatTuNhom1: 'vattu1',
      vatTuNhom2: 'vattu2',
      dtqg: 'dtqg',
      sscd: 'sscd',
      vatChat: 'vatchat',
    };

    // Find the category that matches selected value
    const selectedCategoryData = inventoryData.categories.find(
      (category) => categoryMap[category.categoryKey] === selectedCategory
    );

    return selectedCategoryData ? selectedCategoryData.warehouses : [];
  };

  const warehouseData = getWarehouseDataForCategory();
  const inventoryData = getCurrentInventoryData();
  const selectedCategoryData = inventoryData.categories.find((category) => {
    const categoryMap: { [key: string]: string } = {
      trangBiNhom1: 'trangbi1',
      trangBiNhom2: 'trangbi2',
      vatTuNhom1: 'vattu1',
      vatTuNhom2: 'vattu2',
      dtqg: 'dtqg',
      sscd: 'sscd',
      vatChat: 'vatchat',
    };
    return categoryMap[category.categoryKey] === selectedCategory;
  });

  if (loading) {
    return (
      <div className={styles.inventoryContainer}>
        {!disableUpdatingIndicator && (
          <UpdatingIndicator
            visible={true}
            text="Đang tải dữ liệu biểu đồ..."
            size="large"
          />
        )}
      </div>
    );
  }

  return (
    <div className={styles.inventoryContainer}>
      <div className={styles.header}></div>
      <div className={loading ? styles.chartsLoading : styles.chartsLoaded}>
        <Row gutter={[16, 16]}>
          {selectedCategoryData && (
            <Col xs={24}>
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <div className={styles.chartTitle}>
                    {selectedCategoryData.categoryName}
                  </div>
                  <div className={styles.filters}>
                    <Select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className={styles.selectBox}
                      disabled={updating}
                    >
                      <Option value="trangbi1">Trang Bị Nhóm 1</Option>
                      <Option value="trangbi2">Trang Bị Nhóm 2</Option>
                      <Option value="vattu1">Vật Tư Nhóm 1</Option>
                      <Option value="vattu2">Vật Tư Nhóm 2</Option>
                      <Option value="dtqg">DTQG</Option>
                      <Option value="sscd">SSCĐ</Option>
                      <Option value="vatchat">Vật Chất</Option>
                    </Select>
                    <Select
                      value={operationType}
                      onChange={handleOperationTypeChange}
                      className={styles.selectBox}
                      disabled={updating}
                    >
                      <Option value="nhap">Nhập</Option>
                      <Option value="xuat">Xuất</Option>
                    </Select>
                    <Select
                      value={selectedPeriod}
                      onChange={handlePeriodChange}
                      className={styles.selectBox}
                    >
                      <Option value="thang">Tháng</Option>
                      <Option value="nam">Năm</Option>
                    </Select>
                  </div>
                </div>
                <GroupedBarChart warehousesData={warehouseData} />
              </div>
            </Col>
          )}
        </Row>
        {updating && !disableUpdatingIndicator && (
          <UpdatingIndicator visible={updating} />
        )}
      </div>
    </div>
  );
};

export default InventoryCharts;
