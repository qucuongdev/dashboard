import React, { useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  ShoppingCartOutlined,
  ToolOutlined,
  AlertOutlined,
  BarChartOutlined,
  FileTextOutlined,
  FolderOutlined,
  TeamOutlined,
  SettingOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import styles from './Header.module.scss';

const HamburgerIcon = '/src/assets/icons/icon-hamburger.svg';
const Logo = '/src/assets/icons/logo.svg';
const SearchIcon = '/src/assets/icons/icon-search.svg';

interface HeaderProps {
  onToggleSidebar: () => void;
}

// Page titles and icons mapping
const pageInfo: Record<
  string,
  { title: string; icon: React.ReactNode; description: string }
> = {
  '/': {
    title: 'Dashboard',
    icon: <DashboardOutlined />,
    description: 'Dashboard chính của hệ thống',
  },
  '/inventory': {
    title: 'Quản lý tồn kho',
    icon: <ShoppingCartOutlined />,
    description: 'Quản lý và theo dõi tình trạng tồn kho',
  },
  '/equipment': {
    title: 'Trang bị',
    icon: <ToolOutlined />,
    description: 'Quản lý trang bị quân sự và thiết bị',
  },
  '/materials': {
    title: 'Vật tư',
    icon: <AlertOutlined />,
    description: 'Quản lý vật tư và nguồn cung',
  },
  '/statistics': {
    title: 'Thống kê',
    icon: <BarChartOutlined />,
    description: 'Báo cáo và phân tích dữ liệu',
  },
  '/reports': {
    title: 'Báo cáo',
    icon: <FileTextOutlined />,
    description: 'Tạo và xem các báo cáo',
  },
  '/documents': {
    title: 'Tài liệu',
    icon: <FolderOutlined />,
    description: 'Quản lý tài liệu và hướng dẫn',
  },
  '/users': {
    title: 'Quản lý người dùng',
    icon: <TeamOutlined />,
    description: 'Quản lý tài khoản và phân quyền',
  },
  '/settings': {
    title: 'Cài đặt hệ thống',
    icon: <SettingOutlined />,
    description: 'Cấu hình và thiết lập hệ thống',
  },
};

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPage = pageInfo[location.pathname] || pageInfo['/'];
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const quickNavItems = [
    { path: '/', label: 'Trang chủ' },
    { path: '/statistics', label: 'Thống kê' },
    { path: '/reports', label: 'Báo cáo' },
    { path: '/documents', label: 'Tài liệu' },
    { path: '/settings', label: 'Quản trị hệ thống' },
  ];

  const handleSearchIconMouseEnter = () => {
    setShowSearchInput(true);
  };

  const handleSearchContainerMouseLeave = () => {
    // Add a small delay to allow user to move to input
    setTimeout(() => {
      if (
        !searchValue.trim() &&
        !searchContainerRef.current?.matches(':hover')
      ) {
        setShowSearchInput(false);
      }
    }, 200);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      console.log('Tìm kiếm:', searchValue);
      // Thêm logic tìm kiếm ở đây
      setShowSearchInput(false);
      setSearchValue('');
    }
  };

  const handleSearchInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setShowSearchInput(false);
      setSearchValue('');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <img
          src={HamburgerIcon}
          alt="Menu"
          className={styles.hamburger}
          onClick={onToggleSidebar}
          style={{ cursor: 'pointer' }}
        />
        <div className={styles.logoContainer}>
          <img src={Logo} alt="Logo" className={styles.logo} />
          <div className={styles.logoText}>
            QUẢN LÝ TRANG BỊ, VẬT TƯ, VẬT CHẤT HẬU CẦN - KỸ THUẬT
          </div>
        </div>
      </div>

      <div className={styles.right}>
        <nav className={styles.quickNav}>
          {quickNavItems.map((item) => (
            <button
              key={item.path}
              className={`${styles.navButton} ${location.pathname === item.path ? styles.navButtonActive : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div
          className={styles.searchContainer}
          ref={searchContainerRef}
          onMouseEnter={handleSearchIconMouseEnter}
          onMouseLeave={handleSearchContainerMouseLeave}
        >
          <SearchOutlined className={styles.searchIcon} />
          {showSearchInput && (
            <div className={styles.searchDropdown}>
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={handleSearchInputKeyDown}
                  className={styles.searchInput}
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>
        <div className={styles.userSection}>
          <div className={styles.userAvatar}>
            <span>A</span>
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>Nguyễn Văn A</div>
            <div className={styles.userRole}>Chỉ huy</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
