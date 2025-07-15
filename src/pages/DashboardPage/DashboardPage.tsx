import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Tabs, Spin } from 'antd';
import styles from './DashboardPage.module.scss';

import BreadcrumbComponent from '../Dashboard/Breadcrumb/Breadcrumb';
import Scorecard from '../../components/dashboard/Scorecard/Scorecard';
import DonutChartCard from '../../components/dashboard/DonutChartCard/DonutChartCard';
import WarehouseInfo from '../Dashboard/WarehouseInfo/WarehouseInfo';
import WarehouseStatus from '../Dashboard/WarehouseStatus/WarehouseStatus';
import SummarySection from '../Dashboard/SummarySection/SummarySection';
import SummaryTable from '../Dashboard/SummaryTable/SummaryTable';
import InventoryCharts from '../Dashboard/InventoryCharts/InventoryCharts';

import { api } from '../../services/api';
import type {
  DashboardStats,
  DashboardFilters,
  EquipmentStatus,
  OrganizationLevel,
} from '../../types';
import { STATUS_LABELS } from '../../types';
import {
  DONUT_CHART_CATEGORIES,
  DONUT_CHART_DATA,
  DONUT_CHART_LEGEND,
  HORIZONTAL_BAR_CONFIG,
} from '../../data/donutChartConfig';

// Status key mapping
const STATUS_KEY_MAP: Record<string, EquipmentStatus> = {
  '1': 'total',
  '2': 'in_system',
  '3': 'in_storage',
  '4': 'technical_support',
  '5': 'repair',
  '6': 'national_reserve',
  '7': 'ready_combat',
  '8': 'pending_disposal',
  '9': 'other',
};

// Debounce utility
const useDebounce = <T,>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardStats | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('1');
  const [filters, setFilters] = useState<DashboardFilters>({});
  const [selectedOrganization, setSelectedOrganization] =
    useState<OrganizationLevel>('total');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Debounce filters to avoid too many API calls
  const debouncedFilters = useDebounce(filters, 300);

  // Create tab items from STATUS_LABELS
  const tabItems = Object.entries(STATUS_KEY_MAP).map(([key, status]) => ({
    key,
    label: STATUS_LABELS[status],
  }));

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        if (isInitialLoad) {
          setLoading(true);
        } else {
          setUpdating(true);
        }

        const response = await api.dashboard.getStats(debouncedFilters);
        if (response.success) {
          setDashboardData(response.data);
        }
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          setIsInitialLoad(false);
        } else {
          setUpdating(false);
        }
      }
    };

    loadDashboardData();
  }, [debouncedFilters, isInitialLoad]);

  // Handle tab change
  const handleTabChange = (key: string) => {
    setActiveTab(key);
    const status = STATUS_KEY_MAP[key];

    const newFilters: DashboardFilters = {
      organizationLevels: [selectedOrganization],
    };

    if (status !== 'total') {
      newFilters.statuses = [status];
    }

    setFilters(newFilters);
  };

  // Handle organization change
  const handleOrganizationChange = (level: OrganizationLevel) => {
    setSelectedOrganization(level);
    const status = STATUS_KEY_MAP[activeTab];

    const newFilters: DashboardFilters = {
      organizationLevels: [level],
    };

    if (status !== 'total') {
      newFilters.statuses = [status];
    }

    setFilters(newFilters);
  };

  // Handle date range change
  const handleDateRangeChange = (dates: [Date, Date] | null) => {
    const newFilters: DashboardFilters = {
      ...filters,
    };

    if (dates) {
      newFilters.period = { from: dates[0], to: dates[1] };
    } else {
      delete newFilters.period;
    }

    setFilters(newFilters);
  };

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('vi-VN');
  };

  // Format change percentage
  const formatChange = (change?: number): string => {
    if (!change) return '';
    const sign = change > 0 ? '+' : '';
    return `${sign}${change}% so với tháng trước`;
  };

  // Get current organization data based on selected level
  const getCurrentData = () => {
    if (!dashboardData) return null;

    const selectedOrg = dashboardData.organizations.find(
      (org) => org.organizationLevel === selectedOrganization
    );
    return selectedOrg || dashboardData.organizations[0];
  };

  // Get current status data based on active tab
  const getCurrentStatusData = () => {
    const currentData = getCurrentData();
    if (!currentData || !currentData.statuses) return null;

    const currentStatus = STATUS_KEY_MAP[activeTab];
    return currentData.statuses[currentStatus] || null;
  };

  // Generate donut chart data from API
  const getDonutChartsData = () => {
    if (!dashboardData) return [];

    const currentStatusData = getCurrentStatusData();
    if (!currentStatusData) {
      return [];
    }

    return DONUT_CHART_CATEGORIES.map((category) => {
      const totalQuantity = Math.floor(
        (currentStatusData.quantity || 0) * category.factor
      );
      const totalValue = Math.floor(
        (currentStatusData.value || 0) * category.factor
      );

      return {
        title: category.title,
        totalValue: formatNumber(totalQuantity),
        totalDescription: `${formatNumber(totalValue)}đ`,
        chartData: DONUT_CHART_DATA,
        horizontalBarData: HORIZONTAL_BAR_CONFIG,
      };
    });
  };

  if (loading) {
    return (
      <div className={styles.dashboardPage}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  const currentData = getCurrentData();
  const currentStatusData = getCurrentStatusData();
  const donutChartsData = getDonutChartsData();

  return (
    <div className={styles.dashboardPage}>
      <BreadcrumbComponent
        selectedOrganization={selectedOrganization}
        onOrganizationChange={handleOrganizationChange}
        onDateRangeChange={handleDateRangeChange}
      />
      <Tabs
        defaultActiveKey="1"
        items={tabItems}
        onChange={handleTabChange}
        activeKey={activeTab}
      />

      {/* Show subtle updating indicator */}
      {updating && (
        <div
          style={{
            position: 'fixed',
            top: 80,
            right: 24,
            zIndex: 1000,
            backgroundColor: '#1890ff',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            fontSize: '12px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          <Spin size="small" style={{ marginRight: 8 }} />
          Đang cập nhật dữ liệu...
        </div>
      )}

      <Row gutter={[24, 24]} className={styles.scorecardSection}>
        <Col span={12}>
          <div
            style={{
              position: 'relative',
              opacity: updating ? 0.7 : 1,
              transition: 'opacity 0.3s',
            }}
          >
            <Scorecard
              title="Quản lý số lượng"
              unit="Số lượng"
              value={
                currentStatusData?.quantity
                  ? formatNumber(currentStatusData.quantity)
                  : '0'
              }
              change={
                currentStatusData?.changePercent
                  ? formatChange(currentStatusData.changePercent)
                  : ''
              }
            />
          </div>
        </Col>
        <Col span={12}>
          <div
            style={{
              position: 'relative',
              opacity: updating ? 0.7 : 1,
              transition: 'opacity 0.3s',
            }}
          >
            <Scorecard
              title="Quản lý giá trị"
              unit="VND"
              value={
                currentStatusData?.value
                  ? formatNumber(currentStatusData.value)
                  : '0'
              }
              change={
                currentStatusData?.changePercent
                  ? formatChange(currentStatusData.changePercent)
                  : ''
              }
              isPrimary
            />
          </div>
        </Col>
      </Row>

      <div
        style={{
          marginTop: 24,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {donutChartsData.map((card) => (
          <div
            key={card.title}
            style={{
              opacity: updating ? 0.7 : 1,
              transition: 'opacity 0.3s',
            }}
          >
            <DonutChartCard
              title={card.title}
              totalValue={card.totalValue}
              totalDescription={card.totalDescription}
              chartData={card.chartData}
              horizontalBarData={card.horizontalBarData}
            />
          </div>
        ))}
      </div>

      {/* Legend chung cho tất cả donut charts */}
      <div className={styles.sharedLegendContainer}>
        <div className={styles.legendDonut}>
          {DONUT_CHART_LEGEND.map((item) => (
            <div key={item.label} className={styles.legendItem}>
              <span
                className={styles.legendColor}
                style={{ backgroundColor: item.color }}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <WarehouseInfo selectedOrganization={selectedOrganization} />
      </div>
      <div style={{ marginTop: 24 }}>
        <SummaryTable selectedOrganization={selectedOrganization} />
        <InventoryCharts selectedOrganization={selectedOrganization} />
      </div>
      <div style={{ marginTop: 24 }}>
        <WarehouseStatus />
      </div>
      <div style={{ marginTop: 24 }}>
        <SummarySection />
      </div>
    </div>
  );
};

export default DashboardPage;
