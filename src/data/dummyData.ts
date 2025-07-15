import type {
  User,
  Equipment,
  Material,
  Warehouse,
  DashboardStats,
  ChartData,
  Report,
  Notification,
  MaintenanceRecord,
  StockMovement,
  OrganizationData,
  OrganizationLevel,
  EquipmentStatus,
  StatusData,
  WarehouseOperationsData,
  WarehouseOperationSection,
  SummaryTableData,
  SummaryTableRowData,
  InventoryChartsData,
  CategoryChartData,
  WarehouseChartData,
  OperationType,
} from '../types';

// Users Data
export const usersData: User[] = [
  {
    id: 'user-001',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@military.vn',
    role: 'admin',
    department: 'Quản lý hậu cần',
    position: 'Chỉ huy',
    isActive: true,
    lastLogin: new Date('2024-01-15T08:30:00'),
    createdAt: new Date('2023-01-01T00:00:00'),
  },
  {
    id: 'user-002',
    name: 'Trần Thị B',
    email: 'tranthib@military.vn',
    role: 'manager',
    department: 'Kho vũ khí',
    position: 'Quản lý kho',
    isActive: true,
    lastLogin: new Date('2024-01-15T09:15:00'),
    createdAt: new Date('2023-02-15T00:00:00'),
  },
  {
    id: 'user-003',
    name: 'Lê Văn C',
    email: 'levanc@military.vn',
    role: 'operator',
    department: 'Bảo trì trang bị',
    position: 'Kỹ thuật viên',
    isActive: true,
    lastLogin: new Date('2024-01-14T16:45:00'),
    createdAt: new Date('2023-03-10T00:00:00'),
  },
  {
    id: 'user-004',
    name: 'Phạm Thị D',
    email: 'phamthid@military.vn',
    role: 'viewer',
    department: 'Kế toán',
    position: 'Kế toán viên',
    isActive: true,
    lastLogin: new Date('2024-01-13T14:20:00'),
    createdAt: new Date('2023-04-20T00:00:00'),
  },
];

// Equipment Data
export const equipmentData: Equipment[] = [
  {
    id: 'eq-001',
    name: 'Súng trường AK-74',
    code: 'VK-001',
    category: 'Vũ khí cá nhân',
    type: 'weapon',
    status: 'active',
    condition: 'excellent',
    quantity: 150,
    unit: 'khẩu',
    manufacturer: 'Kalashnikov',
    model: 'AK-74M',
    serialNumber: 'AK74-2024-001',
    purchaseDate: new Date('2023-05-15'),
    warrantyExpiry: new Date('2028-05-15'),
    lastMaintenance: new Date('2024-01-10'),
    nextMaintenance: new Date('2024-04-10'),
    location: 'Kho A1',
    cost: 25000000,
    specifications: {
      caliber: '5.45×39mm',
      weight: '3.3kg',
      length: '943mm',
      fireRate: '650 rounds/min',
    },
    maintenanceHistory: [
      {
        id: 'mt-001',
        equipmentId: 'eq-001',
        type: 'routine',
        description: 'Bảo dưỡng định kỳ quý I/2024',
        performedBy: 'Lê Văn C',
        date: new Date('2024-01-10'),
        cost: 500000,
        status: 'completed',
      },
    ],
  },
  {
    id: 'eq-002',
    name: 'Xe tải quân sự KAMAZ',
    code: 'PT-001',
    category: 'Phương tiện vận tải',
    type: 'vehicle',
    status: 'maintenance',
    condition: 'good',
    quantity: 12,
    unit: 'chiếc',
    manufacturer: 'KAMAZ',
    model: 'KAMAZ-5350',
    serialNumber: 'KMZ-2023-001',
    purchaseDate: new Date('2023-03-20'),
    warrantyExpiry: new Date('2026-03-20'),
    lastMaintenance: new Date('2024-01-05'),
    nextMaintenance: new Date('2024-03-05'),
    location: 'Bãi xe B2',
    cost: 1500000000,
    specifications: {
      payload: '6000kg',
      fuelType: 'Diesel',
      enginePower: '260HP',
      transmission: 'Manual 10-speed',
    },
    maintenanceHistory: [],
  },
  {
    id: 'eq-003',
    name: 'Bộ đàm Harris PRC-152',
    code: 'TT-001',
    category: 'Thiết bị thông tin',
    type: 'communication',
    status: 'active',
    condition: 'excellent',
    quantity: 80,
    unit: 'bộ',
    manufacturer: 'Harris Corporation',
    model: 'PRC-152A',
    serialNumber: 'HR152-2024-001',
    purchaseDate: new Date('2024-01-10'),
    warrantyExpiry: new Date('2027-01-10'),
    lastMaintenance: new Date('2024-01-12'),
    nextMaintenance: new Date('2024-07-12'),
    location: 'Kho điện tử C1',
    cost: 450000000,
    specifications: {
      frequency: '30-512 MHz',
      channels: '999',
      batteryLife: '8-12 hours',
      weight: '1.7kg',
    },
    maintenanceHistory: [],
  },
  {
    id: 'eq-004',
    name: 'Áo giáp chống đạn Level IIIA',
    code: 'BV-001',
    category: 'Bảo vệ cá nhân',
    type: 'protection',
    status: 'active',
    condition: 'good',
    quantity: 200,
    unit: 'bộ',
    manufacturer: 'Point Blank',
    model: 'Interceptor Body Armor',
    purchaseDate: new Date('2023-08-15'),
    warrantyExpiry: new Date('2028-08-15'),
    location: 'Kho trang bị D1',
    cost: 180000000,
    specifications: {
      protection: 'Level IIIA',
      material: 'Kevlar',
      weight: '2.8kg',
      coverage: 'Front and back panels',
    },
    maintenanceHistory: [],
  },
];

// Materials Data
export const materialsData: Material[] = [
  {
    id: 'mt-001',
    name: 'Đạn súng trường 5.45×39mm',
    code: 'DAN-001',
    category: 'Đạn dược',
    type: 'ammunition',
    currentStock: 15000,
    minStock: 5000,
    maxStock: 25000,
    unit: 'viên',
    unitCost: 2500,
    totalValue: 37500000,
    supplier: 'Z111 Factory',
    location: 'Kho đạn A1',
    batchNumber: 'BATCH-2024-001',
    lastRestocked: new Date('2024-01-05'),
    stockMovements: [
      {
        id: 'sm-001',
        materialId: 'mt-001',
        type: 'in',
        quantity: 5000,
        reason: 'Nhập kho định kỳ',
        date: new Date('2024-01-05'),
        performedBy: 'Trần Thị B',
        cost: 12500000,
      },
    ],
  },
  {
    id: 'mt-002',
    name: 'Dầu nhớt động cơ 15W-40',
    code: 'DM-001',
    category: 'Nhiên liệu & dầu mỡ',
    type: 'supply',
    currentStock: 500,
    minStock: 100,
    maxStock: 1000,
    unit: 'lít',
    unitCost: 85000,
    totalValue: 42500000,
    supplier: 'Petrolimex',
    location: 'Kho nhiên liệu B1',
    expiryDate: new Date('2026-12-31'),
    batchNumber: 'OIL-2024-001',
    lastRestocked: new Date('2024-01-08'),
    stockMovements: [],
  },
  {
    id: 'mt-003',
    name: 'Pin AA Alkaline',
    code: 'PIN-001',
    category: 'Điện tử',
    type: 'consumable',
    currentStock: 2000,
    minStock: 500,
    maxStock: 3000,
    unit: 'viên',
    unitCost: 15000,
    totalValue: 30000000,
    supplier: 'Duracell Vietnam',
    location: 'Kho điện tử C1',
    expiryDate: new Date('2027-06-30'),
    batchNumber: 'DURACELL-2024-001',
    lastRestocked: new Date('2024-01-12'),
    stockMovements: [],
  },
  {
    id: 'mt-004',
    name: 'Phụ tùng thay thế AK-74',
    code: 'PT-AK74-001',
    category: 'Phụ tùng',
    type: 'spare_part',
    currentStock: 50,
    minStock: 20,
    maxStock: 100,
    unit: 'bộ',
    unitCost: 1200000,
    totalValue: 60000000,
    supplier: 'Arsenal JSC',
    location: 'Kho phụ tùng A2',
    lastRestocked: new Date('2023-12-20'),
    stockMovements: [],
  },
];

// Warehouses Data
export const warehousesData: Warehouse[] = [
  {
    id: 'wh-001',
    name: 'Kho vũ khí chính',
    code: 'KVK-A',
    type: 'main',
    location: 'Khu A, Doanh trại 1',
    capacity: 10000,
    currentUtilization: 7500,
    manager: 'Trần Thị B',
    status: 'active',
    securityLevel: 'classified',
    facilities: ['Camera giám sát', 'Hệ thống báo động', 'Kiểm soát nhiệt độ'],
    sections: [
      {
        id: 'sec-001',
        warehouseId: 'wh-001',
        name: 'Khu A1 - Súng trường',
        code: 'A1',
        capacity: 3000,
        currentUtilization: 2500,
        materialTypes: ['Vũ khí cá nhân'],
      },
      {
        id: 'sec-002',
        warehouseId: 'wh-001',
        name: 'Khu A2 - Phụ tùng',
        code: 'A2',
        capacity: 2000,
        currentUtilization: 1500,
        materialTypes: ['Phụ tùng'],
      },
    ],
  },
  {
    id: 'wh-002',
    name: 'Kho vật tư tiêu hao',
    code: 'KVT-B',
    type: 'secondary',
    location: 'Khu B, Doanh trại 1',
    capacity: 5000,
    currentUtilization: 3200,
    manager: 'Lê Văn E',
    status: 'active',
    securityLevel: 'medium',
    facilities: ['Camera giám sát', 'Thông gió tự động'],
    sections: [],
  },
];

// Helper function to create status data
const createStatusData = (
  quantity: number,
  value: number,
  changePercent?: number
): StatusData => ({
  quantity,
  value,
  changePercent,
});

// Dashboard Statistics
export const dashboardStats: DashboardStats = {
  lastUpdated: new Date('2024-01-15T08:00:00'),
  period: {
    from: new Date('2024-01-01'),
    to: new Date('2024-01-15'),
  },
  organizations: [
    // Tổng
    {
      organizationLevel: 'total',
      name: 'Toàn quân',
      statuses: {
        total: createStatusData(15750, 48500000000, 2.5),
        in_system: createStatusData(12800, 39200000000, 1.8),
        in_storage: createStatusData(2400, 7350000000, 5.2),
        technical_support: createStatusData(180, 550000000, -2.1),
        repair: createStatusData(120, 380000000, -8.5),
        national_reserve: createStatusData(200, 850000000, 0.8),
        ready_combat: createStatusData(11500, 35200000000, 3.1),
        pending_disposal: createStatusData(30, 45000000, -15.2),
        other: createStatusData(20, 25000000, 1.2),
      },
    },
    // Bộ Tư lệnh
    {
      organizationLevel: 'command',
      name: 'Bộ Tư lệnh Quân chủng',
      statuses: {
        total: createStatusData(8200, 25800000000, 3.2),
        in_system: createStatusData(6900, 21700000000, 2.8),
        in_storage: createStatusData(1000, 3150000000, 4.8),
        technical_support: createStatusData(100, 315000000, -1.5),
        repair: createStatusData(70, 220000000, -12.3),
        national_reserve: createStatusData(80, 380000000, 1.2),
        ready_combat: createStatusData(6200, 19500000000, 4.1),
        pending_disposal: createStatusData(15, 25000000, -18.5),
        other: createStatusData(35, 110000000, 8.2),
      },
    },
    // Ban Chỉ Huy
    {
      organizationLevel: 'division',
      name: 'Ban Chỉ Huy các Binh chủng',
      statuses: {
        total: createStatusData(4800, 14200000000, 1.8),
        in_system: createStatusData(4100, 12100000000, 1.2),
        in_storage: createStatusData(580, 1720000000, 6.5),
        technical_support: createStatusData(50, 148000000, -3.2),
        repair: createStatusData(30, 89000000, -5.8),
        national_reserve: createStatusData(60, 285000000, -0.5),
        ready_combat: createStatusData(3800, 11200000000, 2.8),
        pending_disposal: createStatusData(10, 12000000, -8.9),
        other: createStatusData(10, 15000000, 5.1),
      },
    },
    // Đơn vị
    {
      organizationLevel: 'unit',
      name: 'Các Đơn vị trực thuộc',
      statuses: {
        total: createStatusData(2750, 8500000000, 2.1),
        in_system: createStatusData(1800, 5400000000, 0.8),
        in_storage: createStatusData(820, 2480000000, 4.2),
        technical_support: createStatusData(30, 87000000, -1.8),
        repair: createStatusData(20, 71000000, -3.2),
        national_reserve: createStatusData(60, 185000000, 2.1),
        ready_combat: createStatusData(1500, 4500000000, 1.8),
        pending_disposal: createStatusData(5, 8000000, -25.2),
        other: createStatusData(15, 69000000, 12.8),
      },
    },
  ],
  summary: {
    totalQuantity: 15750,
    totalValue: 48500000000,
    totalChangePercent: 2.5,
  },
};

// Chart Data
export const organizationChart: ChartData = {
  labels: ['Bộ Tư lệnh', 'Ban Chỉ Huy', 'Đơn vị trực thuộc'],
  datasets: [
    {
      label: 'Số lượng trang bị',
      data: [8200, 4800, 2750],
      backgroundColor: ['#ef4444', '#3b82f6', '#10b981'],
    },
  ],
};

export const statusDistributionChart: ChartData = {
  labels: [
    'Sẵn sàng chiến đấu',
    'Trên hệ thống',
    'Trong kho',
    'Dự trữ quốc gia',
    'Bảo đảm kỹ thuật',
    'Sửa chữa',
    'Chờ thanh lý',
    'Khác',
  ],
  datasets: [
    {
      label: 'Số lượng',
      data: [11500, 12800, 2400, 200, 180, 120, 30, 20],
      backgroundColor: [
        '#10b981', // Sẵn sàng chiến đấu - xanh lá
        '#3b82f6', // Trên hệ thống - xanh dương
        '#f59e0b', // Trong kho - vàng
        '#8b5cf6', // Dự trữ quốc gia - tím
        '#06b6d4', // Bảo đảm kỹ thuật - cyan
        '#ef4444', // Sửa chữa - đỏ
        '#f97316', // Chờ thanh lý - cam
        '#6b7280', // Khác - xám
      ],
    },
  ],
};

export const valueByOrganizationChart: ChartData = {
  labels: ['Bộ Tư lệnh', 'Ban Chỉ Huy', 'Đơn vị trực thuộc'],
  datasets: [
    {
      label: 'Giá trị (tỷ VNĐ)',
      data: [25.8, 14.2, 8.5],
      backgroundColor: ['#dc2626', '#059669', '#7c3aed'],
    },
  ],
};

export const monthlyTrendChart: ChartData = {
  labels: [
    'T7/2023',
    'T8/2023',
    'T9/2023',
    'T10/2023',
    'T11/2023',
    'T12/2023',
    'T1/2024',
  ],
  datasets: [
    {
      label: 'Tổng số lượng',
      data: [15200, 15350, 15180, 15650, 15480, 15720, 15750],
      borderColor: ['#3b82f6'],
      backgroundColor: ['rgba(59, 130, 246, 0.1)'],
    },
    {
      label: 'Sẵn sàng chiến đấu',
      data: [11100, 11280, 11050, 11420, 11250, 11380, 11500],
      borderColor: ['#10b981'],
      backgroundColor: ['rgba(16, 185, 129, 0.1)'],
    },
  ],
};

// Reports Data
export const reportsData: Report[] = [
  {
    id: 'rpt-001',
    title: 'Báo cáo tồn kho tháng 1/2024',
    type: 'inventory',
    period: {
      from: new Date('2024-01-01'),
      to: new Date('2024-01-31'),
    },
    generatedBy: 'Nguyễn Văn A',
    generatedAt: new Date('2024-02-01T09:00:00'),
    status: 'completed',
    data: {
      totalItems: 18050,
      totalValue: 15750000000,
      lowStockItems: 3,
      outOfStockItems: 0,
    },
    summary:
      'Tình hình tồn kho ổn định, có 3 mặt hàng dưới mức tối thiểu cần bổ sung',
  },
  {
    id: 'rpt-002',
    title: 'Báo cáo bảo trì trang bị Q4/2023',
    type: 'maintenance',
    period: {
      from: new Date('2023-10-01'),
      to: new Date('2023-12-31'),
    },
    generatedBy: 'Lê Văn C',
    generatedAt: new Date('2024-01-05T14:30:00'),
    status: 'approved',
    data: {
      totalMaintenance: 45,
      routineMaintenance: 35,
      emergencyRepairs: 10,
      totalCost: 450000000,
    },
    summary: 'Hoạt động bảo trì đạt 95% kế hoạch, chi phí trong tầm kiểm soát',
  },
];

// Notifications Data
export const notificationsData: Notification[] = [
  {
    id: 'notif-001',
    type: 'warning',
    title: 'Vật tư sắp hết hạn',
    message: 'Pin AA Alkaline sẽ hết hạn trong 6 tháng tới',
    timestamp: new Date('2024-01-15T08:30:00'),
    isRead: false,
    actionUrl: '/inventory/mt-003',
  },
  {
    id: 'notif-002',
    type: 'error',
    title: 'Trang bị cần bảo trì',
    message: 'Xe tải KAMAZ đã quá hạn bảo trì định kỳ',
    timestamp: new Date('2024-01-14T16:45:00'),
    isRead: false,
    actionUrl: '/equipment/eq-002',
  },
  {
    id: 'notif-003',
    type: 'info',
    title: 'Nhập kho thành công',
    message: 'Đã nhập 5000 viên đạn 5.45×39mm vào kho',
    timestamp: new Date('2024-01-05T10:15:00'),
    isRead: true,
  },
  {
    id: 'notif-004',
    type: 'success',
    title: 'Báo cáo hoàn thành',
    message: 'Báo cáo tồn kho tháng 1/2024 đã được tạo thành công',
    timestamp: new Date('2024-02-01T09:00:00'),
    isRead: true,
  },
];

// Search suggestions data
export const searchSuggestions = [
  'AK-74',
  'KAMAZ',
  'Pin AA',
  'Đạn 5.45mm',
  'Bộ đàm Harris',
  'Áo giáp',
  'Dầu nhớt',
  'Phụ tùng',
  'Kho A1',
  'Bảo trì',
  'Tồn kho',
  'Báo cáo',
  'Thống kê',
  'Vũ khí',
  'Phương tiện',
];

// Helper function to create warehouse operation data
const createWarehouseOperationData = (
  organizationLevel: OrganizationLevel
): WarehouseOperationsData => {
  // Base multipliers for different organization levels
  const multipliers = {
    total: 1,
    command: 0.65,
    division: 0.4,
    unit: 0.25,
  };

  const multiplier = multipliers[organizationLevel];

  const sections: WarehouseOperationSection[] = [
    {
      title: 'Trang Bị',
      color: '#0074D6',
      cards: [
        {
          title: 'Mệnh lệnh chờ viết lệnh',
          total: Math.floor(12 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(4 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(5 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(3 * multiplier) },
          ],
        },
        {
          title: 'Mệnh lệnh đã viết lệnh',
          total: Math.floor(40 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(15 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(18 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(7 * multiplier) },
          ],
        },
        {
          title: 'Lệnh đã bổ sung',
          total: Math.floor(34 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(12 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(14 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(8 * multiplier) },
          ],
        },
        {
          title: 'Lệnh chưa thực hiện xong',
          total: Math.floor(5 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(2 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(2 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(1 * multiplier) },
          ],
        },
        {
          title: 'Lệnh quá thời hạn',
          total: Math.floor(20 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(8 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(7 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(5 * multiplier) },
          ],
        },
        {
          title: 'Lệnh yêu cầu xử lý',
          total: `${Math.floor(40 * multiplier)}/${Math.floor(44 * multiplier)}`,
          details: [
            { label: 'Xuất kho', value: Math.floor(15 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(12 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(13 * multiplier) },
          ],
        },
      ],
    },
    {
      title: 'Vật Tư',
      color: '#599D7B',
      cards: [
        {
          title: 'Kế hoạch chờ viết lệnh',
          total: Math.floor(12 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(3 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(6 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(3 * multiplier) },
          ],
        },
        {
          title: 'Kế hoạch đã viết lệnh',
          total: Math.floor(40 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(16 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(15 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(9 * multiplier) },
          ],
        },
        {
          title: 'Lệnh đã thực hiện xong',
          total: Math.floor(34 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(13 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(12 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(9 * multiplier) },
          ],
        },
        {
          title: 'Lệnh chưa thực hiện xong',
          total: Math.floor(5 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(1 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(2 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(2 * multiplier) },
          ],
        },
        {
          title: 'Lệnh quá thời hạn',
          total: Math.floor(20 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(7 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(8 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(5 * multiplier) },
          ],
        },
        {
          title: 'Lệnh yêu cầu xử lý',
          total: `${Math.floor(40 * multiplier)}/${Math.floor(44 * multiplier)}`,
          details: [
            { label: 'Xuất kho', value: Math.floor(16 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(14 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(10 * multiplier) },
          ],
        },
      ],
    },
    {
      title: 'Vật chất',
      color: '#ECC94B',
      cards: [
        {
          title: 'Kế hoạch chờ viết lệnh',
          total: Math.floor(12 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(4 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(4 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(4 * multiplier) },
          ],
        },
        {
          title: 'Kế hoạch đã viết lệnh',
          total: Math.floor(40 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(13 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(14 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(13 * multiplier) },
          ],
        },
        {
          title: 'Lệnh đã thực hiện xong',
          total: Math.floor(34 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(11 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(12 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(11 * multiplier) },
          ],
        },
        {
          title: 'Lệnh chưa thực hiện xong',
          total: Math.floor(5 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(2 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(2 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(1 * multiplier) },
          ],
        },
        {
          title: 'Lệnh quá thời hạn',
          total: Math.floor(20 * multiplier).toString(),
          details: [
            { label: 'Xuất kho', value: Math.floor(6 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(7 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(7 * multiplier) },
          ],
        },
        {
          title: 'Lệnh yêu cầu xử lý',
          total: `${Math.floor(40 * multiplier)}/${Math.floor(44 * multiplier)}`,
          details: [
            { label: 'Xuất kho', value: Math.floor(13 * multiplier) },
            { label: 'Nhập kho', value: Math.floor(14 * multiplier) },
            { label: 'Điều chuyển', value: Math.floor(13 * multiplier) },
          ],
        },
      ],
    },
  ];

  return {
    lastUpdated: new Date(),
    organizationLevel,
    sections,
  };
};

// Warehouse Operations Data
export const warehouseOperationsData = {
  total: createWarehouseOperationData('total'),
  command: createWarehouseOperationData('command'),
  division: createWarehouseOperationData('division'),
  unit: createWarehouseOperationData('unit'),
};

// Helper function to create summary table data
const createSummaryTableData = (
  organizationLevel: OrganizationLevel
): SummaryTableData => {
  // Base multipliers for different organization levels
  const multipliers = {
    total: 1,
    command: 0.65,
    division: 0.4,
    unit: 0.25,
  };

  const multiplier = multipliers[organizationLevel];

  // Base numbers for beginning balance
  const baseBeginning: SummaryTableRowData = {
    trangBiNhom1: Math.floor(2500 * multiplier),
    trangBiNhom2: Math.floor(1800 * multiplier),
    vatTuNhom1: Math.floor(15000 * multiplier),
    vatTuNhom2: Math.floor(8500 * multiplier),
    dtqg: Math.floor(1200 * multiplier),
    sscd: Math.floor(3200 * multiplier),
    vatChat: Math.floor(5800 * multiplier),
  };

  // Increases during period
  const increases: SummaryTableRowData = {
    trangBiNhom1: Math.floor(180 * multiplier),
    trangBiNhom2: Math.floor(120 * multiplier),
    vatTuNhom1: Math.floor(2800 * multiplier),
    vatTuNhom2: Math.floor(1500 * multiplier),
    dtqg: Math.floor(80 * multiplier),
    sscd: Math.floor(220 * multiplier),
    vatChat: Math.floor(850 * multiplier),
  };

  // Decreases during period
  const decreases: SummaryTableRowData = {
    trangBiNhom1: Math.floor(85 * multiplier),
    trangBiNhom2: Math.floor(95 * multiplier),
    vatTuNhom1: Math.floor(2200 * multiplier),
    vatTuNhom2: Math.floor(1200 * multiplier),
    dtqg: Math.floor(45 * multiplier),
    sscd: Math.floor(180 * multiplier),
    vatChat: Math.floor(720 * multiplier),
  };

  // Current balance = Beginning + Increases - Decreases
  const currentBalance: SummaryTableRowData = {
    trangBiNhom1:
      baseBeginning.trangBiNhom1 +
      increases.trangBiNhom1 -
      decreases.trangBiNhom1,
    trangBiNhom2:
      baseBeginning.trangBiNhom2 +
      increases.trangBiNhom2 -
      decreases.trangBiNhom2,
    vatTuNhom1:
      baseBeginning.vatTuNhom1 + increases.vatTuNhom1 - decreases.vatTuNhom1,
    vatTuNhom2:
      baseBeginning.vatTuNhom2 + increases.vatTuNhom2 - decreases.vatTuNhom2,
    dtqg: baseBeginning.dtqg + increases.dtqg - decreases.dtqg,
    sscd: baseBeginning.sscd + increases.sscd - decreases.sscd,
    vatChat: baseBeginning.vatChat + increases.vatChat - decreases.vatChat,
  };

  return {
    lastUpdated: new Date(),
    organizationLevel,
    tonDauKy: baseBeginning,
    tang: increases,
    giam: decreases,
    tonHienTai: currentBalance,
  };
};

// Summary Table Data
export const summaryTableData = {
  total: createSummaryTableData('total'),
  command: createSummaryTableData('command'),
  division: createSummaryTableData('division'),
  unit: createSummaryTableData('unit'),
};

// Helper function to create warehouse chart data
const createWarehouseChartData = (
  warehouseId: string,
  categoryKey: string,
  multiplier: number,
  operationType: OperationType
): WarehouseChartData => {
  // Base values for different categories and operation types
  const baseValues = {
    trangBiNhom1: {
      nhap: { tdm: 120, tsl: 1800, cl: 85, value: 320 },
      xuat: { tdm: 120, tsl: 2200, cl: 85, value: 360 },
    },
    trangBiNhom2: {
      nhap: { tdm: 100, tsl: 1200, cl: 80, value: 250 },
      xuat: { tdm: 100, tsl: 1800, cl: 80, value: 310 },
    },
    vatTuNhom1: {
      nhap: { tdm: 150, tsl: 7500, cl: 90, value: 400 },
      xuat: { tdm: 150, tsl: 8500, cl: 90, value: 440 },
    },
    vatTuNhom2: {
      nhap: { tdm: 80, tsl: 4500, cl: 75, value: 180 },
      xuat: { tdm: 80, tsl: 5500, cl: 75, value: 220 },
    },
    dtqg: {
      nhap: { tdm: 200, tsl: 1000, cl: 95, value: 480 },
      xuat: { tdm: 200, tsl: 1400, cl: 95, value: 520 },
    },
    sscd: {
      nhap: { tdm: 160, tsl: 2500, cl: 88, value: 360 },
      xuat: { tdm: 160, tsl: 3100, cl: 88, value: 400 },
    },
    vatChat: {
      nhap: { tdm: 90, tsl: 5500, cl: 70, value: 200 },
      xuat: { tdm: 90, tsl: 6500, cl: 70, value: 240 },
    },
  };

  const base =
    baseValues[categoryKey as keyof typeof baseValues][operationType];

  // Add some randomness for each warehouse
  const warehouseVariation = 0.7 + parseInt(warehouseId.slice(-1)) * 0.06; // 0.7 to 1.4

  return {
    warehouseId,
    warehouseName: `Kho ${warehouseId.slice(-1)}`,
    tdm: Math.floor(base.tdm * warehouseVariation * multiplier),
    tsl: Math.floor(base.tsl * warehouseVariation * multiplier),
    cl: Math.floor(base.cl * (0.9 + warehouseVariation * 0.1)), // Keep CL between 90-100%
    value: Math.floor(base.value * warehouseVariation * multiplier),
  };
};

// Helper function to create inventory charts data
const createInventoryChartsData = (
  organizationLevel: OrganizationLevel,
  operationType: OperationType
): InventoryChartsData => {
  // Base multipliers for different organization levels
  const multipliers = {
    total: 1,
    command: 0.65,
    division: 0.4,
    unit: 0.25,
  };

  const multiplier = multipliers[organizationLevel];

  const categories: CategoryChartData[] = [
    {
      categoryName: 'Trang Bị Nhóm 1',
      categoryKey: 'trangBiNhom1',
      warehouses: [],
    },
    {
      categoryName: 'Trang Bị Nhóm 2',
      categoryKey: 'trangBiNhom2',
      warehouses: [],
    },
    {
      categoryName: 'Vật Tư Nhóm 1',
      categoryKey: 'vatTuNhom1',
      warehouses: [],
    },
    {
      categoryName: 'Vật Tư Nhóm 2',
      categoryKey: 'vatTuNhom2',
      warehouses: [],
    },
    {
      categoryName: 'DTQG',
      categoryKey: 'dtqg',
      warehouses: [],
    },
    {
      categoryName: 'SSCĐ',
      categoryKey: 'sscd',
      warehouses: [],
    },
    {
      categoryName: 'Vật Chất',
      categoryKey: 'vatChat',
      warehouses: [],
    },
  ];

  // Create data for 13 warehouses for each category
  categories.forEach((category) => {
    for (let i = 1; i <= 13; i++) {
      const warehouseData = createWarehouseChartData(
        `warehouse_${i}`,
        category.categoryKey,
        multiplier,
        operationType
      );
      category.warehouses.push(warehouseData);
    }
  });

  return {
    lastUpdated: new Date(),
    organizationLevel,
    operationType,
    categories,
  };
};

// Inventory Charts Data
export const inventoryChartsData = {
  total: {
    nhap: createInventoryChartsData('total', 'nhap'),
    xuat: createInventoryChartsData('total', 'xuat'),
  },
  command: {
    nhap: createInventoryChartsData('command', 'nhap'),
    xuat: createInventoryChartsData('command', 'xuat'),
  },
  division: {
    nhap: createInventoryChartsData('division', 'nhap'),
    xuat: createInventoryChartsData('division', 'xuat'),
  },
  unit: {
    nhap: createInventoryChartsData('unit', 'nhap'),
    xuat: createInventoryChartsData('unit', 'xuat'),
  },
};

// Summary Section Data
export interface SummaryChartSegment {
  label: string;
  percentage: number;
  num1: number;
  num2: number;
  num3: number;
}

export interface SummaryChartData {
  title: string;
  total: number;
  segments: SummaryChartSegment[];
}

export interface SummaryWarehouseMultiplier {
  [key: string]: number;
}

export interface SummarySectionData {
  warehouseMultipliers: SummaryWarehouseMultiplier;
  charts: SummaryChartData[];
}

// Warehouse multipliers for summary section
export const summaryWarehouseMultipliers: SummaryWarehouseMultiplier = {
  all: 1.0,
  k92: 0.8,
  k95: 0.9,
  k97: 0.6,
  k99: 0.7,
};

// Base summary charts data
export const summarySectionChartsData: SummaryChartData[] = [
  {
    title: 'Trang Bị Nhóm 1',
    total: 5000,
    segments: [
      { label: '0 → 5', percentage: 36, num1: 12, num2: 1200, num3: 132.3 },
      { label: '5 → 10', percentage: 21, num1: 8, num2: 450, num3: 89.5 },
      { label: '10 → 20', percentage: 17, num1: 6, num2: 300, num3: 55.1 },
      { label: '> 20', percentage: 9, num1: 5, num2: 350, num3: 32.6 },
    ],
  },
  {
    title: 'Trang Bị Nhóm 2',
    total: 3800,
    segments: [
      { label: '0 → 5', percentage: 42, num1: 15, num2: 980, num3: 108.2 },
      { label: '5 → 10', percentage: 25, num1: 10, num2: 380, num3: 76.4 },
      { label: '10 → 20', percentage: 20, num1: 8, num2: 250, num3: 45.8 },
      { label: '> 20', percentage: 13, num1: 6, num2: 290, num3: 28.9 },
    ],
  },
  {
    title: 'Vật Tư Nhóm 1',
    total: 12500,
    segments: [
      { label: '0 → 5', percentage: 28, num1: 18, num2: 2800, num3: 285.6 },
      { label: '5 → 10', percentage: 32, num1: 22, num2: 1850, num3: 198.7 },
      { label: '10 → 20', percentage: 25, num1: 16, num2: 1200, num3: 142.3 },
      { label: '> 20', percentage: 15, num1: 12, num2: 950, num3: 89.4 },
    ],
  },
  {
    title: 'Vật Tư Nhóm 2',
    total: 8900,
    segments: [
      { label: '0 → 5', percentage: 34, num1: 14, num2: 1680, num3: 156.8 },
      { label: '5 → 10', percentage: 28, num1: 11, num2: 980, num3: 112.3 },
      { label: '10 → 20', percentage: 22, num1: 9, num2: 720, num3: 89.6 },
      { label: '> 20', percentage: 16, num1: 7, num2: 580, num3: 67.2 },
    ],
  },
  {
    title: 'DTQG',
    total: 2200,
    segments: [
      { label: '0 → 5', percentage: 45, num1: 8, num2: 450, num3: 98.7 },
      { label: '5 → 10', percentage: 30, num1: 6, num2: 280, num3: 65.4 },
      { label: '10 → 20', percentage: 15, num1: 4, num2: 180, num3: 42.1 },
      { label: '> 20', percentage: 10, num1: 3, num2: 120, num3: 28.9 },
    ],
  },
  {
    title: 'SSCĐ',
    total: 6700,
    segments: [
      { label: '0 → 5', percentage: 38, num1: 16, num2: 1420, num3: 178.9 },
      { label: '5 → 10', percentage: 27, num1: 12, num2: 850, num3: 125.6 },
      { label: '10 → 20', percentage: 20, num1: 9, num2: 580, num3: 89.7 },
      { label: '> 20', percentage: 15, num1: 7, num2: 450, num3: 67.8 },
    ],
  },
  {
    title: 'Vật Chất',
    total: 15800,
    segments: [
      { label: '0 → 5', percentage: 32, num1: 25, num2: 3200, num3: 389.6 },
      { label: '5 → 10', percentage: 29, num1: 20, num2: 2400, num3: 278.4 },
      { label: '10 → 20', percentage: 24, num1: 16, num2: 1850, num3: 198.7 },
      { label: '> 20', percentage: 15, num1: 12, num2: 1400, num3: 145.8 },
    ],
  },
];

// Export combined summary section data
export const summarySectionData: SummarySectionData = {
  warehouseMultipliers: summaryWarehouseMultipliers,
  charts: summarySectionChartsData,
};
