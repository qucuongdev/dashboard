import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FolderOutlined,
  SettingOutlined,
  TeamOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  AlertOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styles from './Sidebar.module.scss';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);

    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleMenuClick = (path: string) => {
    navigate(path);
    // Close sidebar on mobile after navigation
    if (isMobile && onClose) {
      onClose();
    }
  };

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
      onClick: () => handleMenuClick('/'),
    },
    {
      key: '/inventory',
      icon: <ShoppingCartOutlined />,
      label: 'Quản lý tồn kho',
      onClick: () => handleMenuClick('/inventory'),
    },
    {
      key: '/equipment',
      icon: <ToolOutlined />,
      label: 'Trang bị',
      onClick: () => handleMenuClick('/equipment'),
    },
    {
      key: '/materials',
      icon: <AlertOutlined />,
      label: 'Vật tư',
      onClick: () => handleMenuClick('/materials'),
    },
    {
      key: '/statistics',
      icon: <BarChartOutlined />,
      label: 'Thống kê',
      onClick: () => handleMenuClick('/statistics'),
    },
    {
      key: '/reports',
      icon: <FileTextOutlined />,
      label: 'Báo cáo',
      onClick: () => handleMenuClick('/reports'),
    },
    {
      key: '/documents',
      icon: <FolderOutlined />,
      label: 'Tài liệu',
      onClick: () => handleMenuClick('/documents'),
    },
    {
      key: '/users',
      icon: <TeamOutlined />,
      label: 'Quản lý người dùng',
      onClick: () => handleMenuClick('/users'),
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'Cài đặt hệ thống',
      onClick: () => handleMenuClick('/settings'),
    },
  ];

  const sidebarClasses = `${styles.sidebar} ${
    isMobile && !collapsed ? styles.sidebarVisible : ''
  }`;

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && (
        <div
          className={`${styles.mobileOverlay} ${
            !collapsed ? styles.overlayVisible : ''
          }`}
          onClick={onClose}
        />
      )}

      <Sider
        width={280}
        className={sidebarClasses}
        collapsed={isMobile ? false : collapsed}
        collapsedWidth={isMobile ? 280 : 70}
        trigger={null}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.logoContainer}>
            <div className={styles.logoIcon}>
              <img
                src="/src/assets/icons/logo.svg"
                alt="Logo"
                className={styles.logoImage}
              />
            </div>
            {(!collapsed || isMobile) && (
              <div className={styles.logoText}>
                <div className={styles.logoTitle}>MILITARY</div>
                <div className={styles.logoSubtitle}>Management System</div>
              </div>
            )}
          </div>
        </div>

        <div className={styles.sidebarContent}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            className={styles.sidebarMenu}
            items={menuItems}
          />

          {(!collapsed || isMobile) && (
            <div className={styles.sidebarFooter}>
              <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                  <UserOutlined />
                </div>
                <div className={styles.userInfo}>
                  <div className={styles.userName}>Nguyễn Văn A</div>
                  <div className={styles.userRole}>Chỉ huy</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Sider>
    </>
  );
};

export default Sidebar;
