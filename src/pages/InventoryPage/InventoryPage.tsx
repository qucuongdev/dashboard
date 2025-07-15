import React from 'react';
import { Card, Row, Col, Table, Tag, Progress } from 'antd';
import {
  ShoppingCartOutlined,
  AlertOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './InventoryPage.module.scss';

const InventoryPage: React.FC = () => {
  // Mock data cho test scroll
  const inventoryData = Array.from({ length: 50 }, (_, index) => ({
    key: index + 1,
    name: `Vật tư ${index + 1}`,
    category:
      index % 4 === 0
        ? 'Trang bị'
        : index % 4 === 1
          ? 'Vật liệu'
          : index % 4 === 2
            ? 'Phụ tùng'
            : 'Công cụ',
    quantity: Math.floor(Math.random() * 1000) + 10,
    minStock: Math.floor(Math.random() * 50) + 5,
    status:
      Math.random() > 0.7 ? 'low' : Math.random() > 0.4 ? 'normal' : 'high',
  }));

  const columns = [
    {
      title: 'Tên vật tư',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Danh mục',
      dataIndex: 'category',
      key: 'category',
      render: (category: string) => (
        <Tag
          color={
            category === 'Trang bị'
              ? 'blue'
              : category === 'Vật liệu'
                ? 'green'
                : category === 'Phụ tùng'
                  ? 'orange'
                  : 'purple'
          }
        >
          {category}
        </Tag>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Tồn kho tối thiểu',
      dataIndex: 'minStock',
      key: 'minStock',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string, record: any) => {
        const percentage = (record.quantity / (record.minStock * 3)) * 100;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Progress
              percent={Math.min(percentage, 100)}
              size="small"
              status={
                percentage < 50
                  ? 'exception'
                  : percentage < 80
                    ? 'normal'
                    : 'success'
              }
              showInfo={false}
              style={{ width: 80 }}
            />
            {status === 'low' ? (
              <Tag color="error" icon={<AlertOutlined />}>
                Thấp
              </Tag>
            ) : status === 'normal' ? (
              <Tag color="warning">Bình thường</Tag>
            ) : (
              <Tag color="success" icon={<CheckCircleOutlined />}>
                Đầy đủ
              </Tag>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.inventoryPage}>
      <div className={styles.pageHeader}>
        <div className={styles.titleWrapper}>
          <h1 className={styles.pageTitle}>Quản lý tồn kho</h1>
          <p className={styles.description}>
            Quản lý và theo dõi tình trạng tồn kho các loại vật tư, trang bị
          </p>
        </div>
      </div>

      <Row gutter={[24, 24]} style={{ marginBottom: 24 }}>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#1890ff', fontSize: 24, margin: 0 }}>
                1,247
              </h3>
              <p style={{ margin: 0, color: '#666' }}>Tổng vật tư</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#52c41a', fontSize: 24, margin: 0 }}>892</h3>
              <p style={{ margin: 0, color: '#666' }}>Đầy đủ</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#faad14', fontSize: 24, margin: 0 }}>267</h3>
              <p style={{ margin: 0, color: '#666' }}>Bình thường</p>
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <div style={{ textAlign: 'center' }}>
              <h3 style={{ color: '#ff4d4f', fontSize: 24, margin: 0 }}>88</h3>
              <p style={{ margin: 0, color: '#666' }}>Cần bổ sung</p>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Card title="Danh sách tồn kho" className={styles.inventoryTable}>
            <Table
              columns={columns}
              dataSource={inventoryData}
              pagination={{
                pageSize: 20,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} của ${total} mục`,
              }}
              scroll={{ x: 800 }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[24, 24]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card className={styles.comingSoon}>
            <div className={styles.comingSoonContent}>
              <ShoppingCartOutlined className={styles.icon} />
              <h2>Tính năng bổ sung</h2>
              <p>Các tính năng đang được phát triển</p>
              <ul className={styles.featureList}>
                <li>📦 Quản lý danh mục vật tư chi tiết</li>
                <li>📊 Biểu đồ thống kê tồn kho theo thời gian</li>
                <li>🔄 Lịch sử nhập/xuất kho</li>
                <li>📈 Dự báo nhu cầu tồn kho</li>
                <li>⚠️ Hệ thống cảnh báo tự động</li>
                <li>📱 Ứng dụng mobile quét mã vạch</li>
                <li>🔗 Tích hợp với hệ thống ERP</li>
                <li>📋 Báo cáo tồn kho đa dạng</li>
              </ul>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default InventoryPage;
