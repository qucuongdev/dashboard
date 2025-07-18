import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './SummaryTable.module.scss';
import UpdatingIndicator from '../../../components/common/UpdatingIndicator';
import { api } from '../../../services/api';
import type { SummaryTableData, OrganizationLevel } from '../../../types';

interface SummaryTableProps {
  selectedOrganization: OrganizationLevel;
  disableUpdatingIndicator?: boolean;
}

const SummaryTable: React.FC<SummaryTableProps> = ({
  selectedOrganization,
  disableUpdatingIndicator = false,
}) => {
  const [summaryData, setSummaryData] = useState<SummaryTableData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('vi-VN');
  };

  // Load summary table data
  useEffect(() => {
    const loadSummaryData = async () => {
      try {
        if (isInitialLoad) {
          setLoading(true);
        } else {
          setUpdating(true);
        }

        const response =
          await api.summaryTable.getSummaryTable(selectedOrganization);
        if (response.success) {
          setSummaryData(response.data);
        }
      } catch (error) {
        console.error('Failed to load summary table data:', error);
      } finally {
        if (isInitialLoad) {
          setLoading(false);
          setIsInitialLoad(false);
        } else {
          setUpdating(false);
        }
      }
    };

    loadSummaryData();
  }, [selectedOrganization, isInitialLoad]);

  if (loading) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.loadingContainer}>
          <Spin size="large" />
          <p className={styles.loadingText}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className={styles.tableContainer}>
        <div className={styles.noDataContainer}>
          <p>Không có dữ liệu</p>
        </div>
      </div>
    );
  }

  const tableData = [
    {
      state: 'TỒN ĐẦU KỲ',
      tb_nhom1: formatNumber(summaryData.tonDauKy.trangBiNhom1),
      tb_nhom2: formatNumber(summaryData.tonDauKy.trangBiNhom2),
      vt_nhom1: formatNumber(summaryData.tonDauKy.vatTuNhom1),
      vt_nhom2: formatNumber(summaryData.tonDauKy.vatTuNhom2),
      dtqg: formatNumber(summaryData.tonDauKy.dtqg),
      sscd: formatNumber(summaryData.tonDauKy.sscd),
      vat_chat: formatNumber(summaryData.tonDauKy.vatChat),
    },
    {
      state: 'TĂNG',
      tb_nhom1: formatNumber(summaryData.tang.trangBiNhom1),
      tb_nhom2: formatNumber(summaryData.tang.trangBiNhom2),
      vt_nhom1: formatNumber(summaryData.tang.vatTuNhom1),
      vt_nhom2: formatNumber(summaryData.tang.vatTuNhom2),
      dtqg: formatNumber(summaryData.tang.dtqg),
      sscd: formatNumber(summaryData.tang.sscd),
      vat_chat: formatNumber(summaryData.tang.vatChat),
    },
    {
      state: 'GIẢM',
      tb_nhom1: formatNumber(summaryData.giam.trangBiNhom1),
      tb_nhom2: formatNumber(summaryData.giam.trangBiNhom2),
      vt_nhom1: formatNumber(summaryData.giam.vatTuNhom1),
      vt_nhom2: formatNumber(summaryData.giam.vatTuNhom2),
      dtqg: formatNumber(summaryData.giam.dtqg),
      sscd: formatNumber(summaryData.giam.sscd),
      vat_chat: formatNumber(summaryData.giam.vatChat),
    },
    {
      state: 'TỒN HIỆN TẠI',
      tb_nhom1: formatNumber(summaryData.tonHienTai.trangBiNhom1),
      tb_nhom2: formatNumber(summaryData.tonHienTai.trangBiNhom2),
      vt_nhom1: formatNumber(summaryData.tonHienTai.vatTuNhom1),
      vt_nhom2: formatNumber(summaryData.tonHienTai.vatTuNhom2),
      dtqg: formatNumber(summaryData.tonHienTai.dtqg),
      sscd: formatNumber(summaryData.tonHienTai.sscd),
      vat_chat: formatNumber(summaryData.tonHienTai.vatChat),
    },
  ];
  return (
    <div className={styles.tableContainer}>
      {/* Updating indicator for organization changes */}
      {!disableUpdatingIndicator && (
        <UpdatingIndicator
          visible={updating}
          text="Đang cập nhật bảng tổng hợp..."
          position="top-right"
          theme="success"
          size="small"
        />
      )}

      <div
        className={`${styles.tableWrapper} ${updating ? styles.updating : ''}`}
      >
        <table className={styles.summaryTable}>
          <thead>
            <tr>
              <th></th>
              <th>TRANG BỊ NHÓM 1</th>
              <th>TRANG BỊ NHÓM 2</th>
              <th>VẬT TƯ NHÓM 1</th>
              <th>VẬT TƯ NHÓM 2</th>
              <th>DTQG</th>
              <th>SSCĐ</th>
              <th>VẬT CHẤT</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, index) => {
              // Determine row class based on state for text color
              let rowClass = '';
              switch (row.state) {
                case 'TỒN ĐẦU KỲ':
                  rowClass = styles.beginningInventoryRow;
                  break;
                case 'TĂNG':
                  rowClass = styles.increaseRow;
                  break;
                case 'GIẢM':
                  rowClass = styles.decreaseRow;
                  break;
                case 'TỒN HIỆN TẠI':
                  rowClass = styles.currentInventoryRow;
                  break;
                default:
                  rowClass = '';
              }

              return (
                <tr key={row.state} className={rowClass}>
                  <td>{row.state}</td>
                  <td>{row.tb_nhom1}</td>
                  <td>{row.tb_nhom2}</td>
                  <td>{row.vt_nhom1}</td>
                  <td>{row.vt_nhom2}</td>
                  <td>{row.dtqg}</td>
                  <td>{row.sscd}</td>
                  <td>{row.vat_chat}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryTable;
