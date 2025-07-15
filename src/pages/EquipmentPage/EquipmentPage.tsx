import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import {
  ToolOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import styles from './EquipmentPage.module.scss';

const EquipmentPage: React.FC = () => {
  return (
    <div className={styles.equipmentPage}>
      <div className={styles.pageHeader}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>Quản lý Trang bị</h1>
          <p className={styles.description}>
            Quản lý và theo dõi trang bị quân sự, vũ khí và các thiết bị chuyên
            dụng
          </p>
        </div>
        <div className={styles.actions}>
          <Button type="primary" icon={<PlusOutlined />} size="large">
            Thêm trang bị
          </Button>
        </div>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statsCard}>
            <div className={styles.statsContent}>
              <div className={styles.statsIcon}>🔫</div>
              <div className={styles.statsText}>
                <h3>1,245</h3>
                <p>Vũ khí cá nhân</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statsCard}>
            <div className={styles.statsContent}>
              <div className={styles.statsIcon}>🚗</div>
              <div className={styles.statsText}>
                <h3>156</h3>
                <p>Phương tiện</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statsCard}>
            <div className={styles.statsContent}>
              <div className={styles.statsIcon}>📡</div>
              <div className={styles.statsText}>
                <h3>89</h3>
                <p>Thiết bị thông tin</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className={styles.statsCard}>
            <div className={styles.statsContent}>
              <div className={styles.statsIcon}>🛡️</div>
              <div className={styles.statsText}>
                <h3>567</h3>
                <p>Trang bị bảo hộ</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card className={styles.comingSoon}>
            <div className={styles.comingSoonContent}>
              <ToolOutlined className={styles.icon} />
              <h2>Hệ thống Quản lý Trang bị</h2>
              <p>Tính năng đang được phát triển với các module chính</p>

              <Row gutter={[16, 16]} className={styles.moduleGrid}>
                <Col xs={24} md={12} lg={6}>
                  <div className={styles.moduleCard}>
                    <SearchOutlined className={styles.moduleIcon} />
                    <h4>Tra cứu & Tìm kiếm</h4>
                    <p>Tìm kiếm trang bị theo nhiều tiêu chí</p>
                  </div>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <div className={styles.moduleCard}>
                    <SettingOutlined className={styles.moduleIcon} />
                    <h4>Bảo trì & Sửa chữa</h4>
                    <p>Lập kế hoạch bảo trì định kỳ</p>
                  </div>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <div className={styles.moduleCard}>
                    <PlusOutlined className={styles.moduleIcon} />
                    <h4>Nhập & Phân phối</h4>
                    <p>Quản lý nhập kho và phân phối</p>
                  </div>
                </Col>
                <Col xs={24} md={12} lg={6}>
                  <div className={styles.moduleCard}>
                    <ToolOutlined className={styles.moduleIcon} />
                    <h4>Kiểm định & QA</h4>
                    <p>Kiểm tra chất lượng trang bị</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default EquipmentPage;
