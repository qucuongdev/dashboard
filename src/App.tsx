import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import DashboardPage from './pages/Dashboard/DashboardPage';
import styles from './App.module.scss';

const InventoryPage = () => (
  <div className={styles.placeholderPage}>
    <h1>📦 Quản lý tồn kho</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const EquipmentPage = () => (
  <div className={styles.placeholderPage}>
    <h1>📦 Trang bị</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const MaterialsPage = () => (
  <div className={styles.placeholderPage}>
    <h1>📦 Vật Tư</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const StatisticsPage = () => (
  <div className={styles.placeholderPage}>
    <h1>📊 Thống Kê</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const ReportsPage = () => (
  <div className={styles.placeholderPage}>
    <h1>📋 Báo Cáo</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const DocumentsPage = () => (
  <div className={styles.placeholderPage}>
    <h1>📁 Tài Liệu</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const UsersPage = () => (
  <div className={styles.placeholderPage}>
    <h1>👥 Quản Lý Người Dùng</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const SettingsPage = () => (
  <div className={styles.placeholderPage}>
    <h1>⚙️ Cài Đặt Hệ Thống</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="equipment" element={<EquipmentPage />} />
          <Route path="materials" element={<MaterialsPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="documents" element={<DocumentsPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
