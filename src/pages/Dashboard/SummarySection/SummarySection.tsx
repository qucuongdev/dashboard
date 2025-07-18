import React, { useState, useMemo } from 'react';
import { Select, Space } from 'antd';
import styles from './SummarySection.module.scss';
import InventoryBarChart from '../../../components/dashboard/InventoryBarChart/InventoryBarChart';
import DonutChartCard from '../../../components/dashboard/DonutChartCard/DonutChartCard';
import {
  summarySectionChartsData,
  summaryWarehouseMultipliers,
  summaryWarehouseFilterOptions,
  summaryInventoryFilterOptions,
} from '../../../data/dummyData';

const SummarySection: React.FC = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<string>('all');
  const [selectedInventory, setSelectedInventory] = useState<string>('all');

  // Generate processed chart data based on current warehouse selection
  const processedChartsData = useMemo(() => {
    const multiplier = summaryWarehouseMultipliers[selectedWarehouse] || 1;

    let chartsToShow = summarySectionChartsData;

    // Filter charts based on inventory selection
    if (selectedInventory !== 'all') {
      const inventoryMap = {
        'tb-n1': ['Trang Bị Nhóm 1'],
        'tb-n2': ['Trang Bị Nhóm 2'],
        'vt-n1': ['Vật Tư Nhóm 1'],
        'vt-n2': ['Vật Tư Nhóm 2'],
        vc: ['Vật Chất'],
      };

      const allowedTitles =
        inventoryMap[selectedInventory as keyof typeof inventoryMap] || [];
      chartsToShow = summarySectionChartsData.filter((chart) =>
        allowedTitles.includes(chart.title)
      );
    }

    return chartsToShow.map((chart) => ({
      ...chart,
      total: Math.floor(chart.total * multiplier).toLocaleString(),
      totalLabel: 'Tổng',
      legendData: chart.segments.map((segment) => ({
        color:
          segment.label === '0 → 5'
            ? '#E53E3E'
            : segment.label === '5 → 10'
              ? '#ECC94B'
              : segment.label === '10 → 20'
                ? '#0074D6'
                : '#007D6E',
        label: segment.label,
        percentage: `${segment.percentage}%`,
        num1: Math.floor(segment.num1 * multiplier).toString(),
        num2: Math.floor(segment.num2 * multiplier).toString(),
        num3: `${(segment.num3 * multiplier).toFixed(1)}K`,
      })),
    }));
  }, [selectedWarehouse, selectedInventory]);

  // Use centralized filter options
  const warehouseOptions = summaryWarehouseFilterOptions;
  const inventoryOptions = summaryInventoryFilterOptions;

  return (
    <div className={styles.summaryContainer}>
      <div className={styles.header}>
        <h2>Tồn kho theo năm</h2>
        <div className={styles.filters}>
          <Select
            value={selectedWarehouse}
            onChange={setSelectedWarehouse}
            className={`${styles.selectBox} ${styles.selectStyles}`}
            options={warehouseOptions}
          />
          <Select
            value={selectedInventory}
            onChange={setSelectedInventory}
            className={`${styles.selectBox} ${styles.selectInventoryStyles}`}
            options={inventoryOptions}
          />
        </div>
      </div>

      {/* All Donut Charts */}
      <div className={styles.donutChartsGrid}>
        {processedChartsData.map((chart) => (
          <div key={chart.title} className={styles.donutChartWrapper}>
            <DonutChartCard
              title={chart.title}
              totalValue={chart.total}
              totalDescription={chart.totalLabel}
              chartData={chart.legendData.map((legend) => ({
                percentage: parseInt(legend.percentage),
                color: legend.color,
              }))}
              hideActions={true}
            />
            <div className={styles.donutLegend}>
              {chart.legendData.map((legend) => (
                <div key={legend.label} className={styles.legendRow}>
                  <div className={styles.legendInfo}>
                    <div
                      className={styles.legendColor}
                      style={
                        {
                          '--legend-color': legend.color,
                        } as React.CSSProperties
                      }
                    />
                    <span className={styles.legendLabel}>{legend.label}</span>
                    <span className={styles.legendPercentage}>
                      {legend.percentage}
                    </span>
                  </div>
                  <div className={styles.legendNumbers}>
                    <span>{legend.num1}</span>
                    <span>{legend.num2}</span>
                    <span>{legend.num3}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bar Chart Section */}
      <div className={styles.barChartSection}>
        <InventoryBarChart />
      </div>
    </div>
  );
};

export default SummarySection;
