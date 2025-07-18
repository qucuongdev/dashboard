import React, { useState, useEffect } from 'react';
import { Card, Select, Space } from 'antd';
import styles from './InventorySummary.module.scss';
import SummaryTable from '../SummaryTable/SummaryTable';
import InventoryCharts from '../InventoryCharts/InventoryCharts';
import UpdatingIndicator from '../../../components/common/UpdatingIndicator';
import { api } from '../../../services/api';
import { summaryWarehouseFilterOptions } from '../../../data/dummyData';
import type { OrganizationLevel } from '../../../types';

const { Option } = Select;

interface InventorySummaryProps {
  selectedOrganization: OrganizationLevel;
}

const InventorySummary: React.FC<InventorySummaryProps> = ({
  selectedOrganization,
}) => {
  const [updating, setUpdating] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState('k92');
  const [selectedPeriod, setSelectedPeriod] = useState('thang');

  // Load data when organization changes
  useEffect(() => {
    const loadData = async () => {
      try {
        setUpdating(true);

        // Simulate API calls that would be made by child components
        await Promise.all([
          api.summaryTable.getSummaryTable(selectedOrganization),
          api.inventoryCharts.getInventoryCharts(selectedOrganization, 'nhap'),
        ]);
      } catch (error) {
        console.error('Failed to load inventory summary data:', error);
      } finally {
        setUpdating(false);
      }
    };

    loadData();
  }, [selectedOrganization]);

  // Handle warehouse filter change
  const handleWarehouseChange = async (value: string) => {
    setSelectedWarehouse(value);
    // Simulate API call for filter change
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
    }, 800);
  };

  // Handle period filter change
  const handlePeriodChange = async (value: string) => {
    setSelectedPeriod(value);
    // Simulate API call for filter change
    setUpdating(true);
    setTimeout(() => {
      setUpdating(false);
    }, 600);
  };

  return (
    <Card className={styles.inventorySummaryCard}>
      {/* Updating indicator for filter changes */}
      <div className={styles.header}>
        <h2>Tổng giá trị nhập, xuất, tồn kho</h2>
        <div className={styles.selectBoxContainer}>
          <Select
            value={selectedWarehouse}
            onChange={handleWarehouseChange}
            className={styles.selectBox}
          >
            {summaryWarehouseFilterOptions.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
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

      <div
        className={`${styles.summaryTableSection} ${updating ? styles.updating : ''}`}
      >
        <SummaryTable
          selectedOrganization={selectedOrganization}
          disableUpdatingIndicator={true}
        />
      </div>

      <div
        className={`${styles.inventoryChartsSection} ${updating ? styles.updating : ''}`}
      >
        <InventoryCharts
          selectedOrganization={selectedOrganization}
          disableUpdatingIndicator={true}
        />
      </div>
    </Card>
  );
};

export default InventorySummary;
