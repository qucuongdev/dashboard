import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout/MainLayout';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import InventoryPage from './pages/InventoryPage/InventoryPage';
import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
import './styles/global.scss';

const MaterialsPage = () => (
  <div style={{ padding: '24px', textAlign: 'center' }}>
    <h1>📦 Vật Tư</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const StatisticsPage = () => (
  <div style={{ padding: '24px', textAlign: 'center' }}>
    <h1>📊 Thống Kê</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const ReportsPage = () => (
  <div style={{ padding: '24px', textAlign: 'center' }}>
    <h1>📋 Báo Cáo</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const DocumentsPage = () => (
  <div style={{ padding: '24px', textAlign: 'center' }}>
    <h1>📁 Tài Liệu</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const UsersPage = () => (
  <div style={{ padding: '24px', textAlign: 'center' }}>
    <h1>👥 Quản Lý Người Dùng</h1>
    <p>Tính năng đang được phát triển</p>
  </div>
);

const SettingsPage = () => (
  <div style={{ padding: '24px', textAlign: 'center' }}>
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
