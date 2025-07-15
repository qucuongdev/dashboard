import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './SummaryTable.module.scss';
import { api } from '../../../services/api';
import type { SummaryTableData, OrganizationLevel } from '../../../types';

interface SummaryTableProps {
  selectedOrganization: OrganizationLevel;
}

const SummaryTable: React.FC<SummaryTableProps> = ({
  selectedOrganization,
}) => {
  const [summaryData, setSummaryData] = useState<SummaryTableData | null>(null);
  const [loading, setLoading] = useState(true);

  // Format number with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('vi-VN');
  };

  // Load summary table data
  useEffect(() => {
    const loadSummaryData = async () => {
      try {
        setLoading(true);
        const response =
          await api.summaryTable.getSummaryTable(selectedOrganization);
        if (response.success) {
          setSummaryData(response.data);
        }
      } catch (error) {
        console.error('Failed to load summary table data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSummaryData();
  }, [selectedOrganization]);

  if (loading) {
    return (
      <div className={styles.tableContainer}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
          <p style={{ marginTop: 16 }}>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

  if (!summaryData) {
    return (
      <div className={styles.tableContainer}>
        <div style={{ textAlign: 'center', padding: '50px' }}>
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
      <div className={styles.tableWrapper}>
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
            {tableData.map((row) => (
              <tr key={row.state}>
                <td>{row.state}</td>
                <td>{row.tb_nhom1}</td>
                <td>{row.tb_nhom2}</td>
                <td>{row.vt_nhom1}</td>
                <td>{row.vt_nhom2}</td>
                <td>{row.dtqg}</td>
                <td>{row.sscd}</td>
                <td>{row.vat_chat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SummaryTable;
