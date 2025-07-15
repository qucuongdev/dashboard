import type {
  ApiResponse,
  FilterOptions,
  User,
  Equipment,
  Material,
  Warehouse,
  DashboardStats,
  ChartData,
  Report,
  Notification,
  DashboardFilters,
  OrganizationLevel,
  EquipmentStatus,
  WarehouseOperationsData,
  SummaryTableData,
  InventoryChartsData,
} from '../types';
import {
  usersData,
  equipmentData,
  materialsData,
  warehousesData,
  dashboardStats,
  organizationChart,
  statusDistributionChart,
  valueByOrganizationChart,
  monthlyTrendChart,
  reportsData,
  notificationsData,
  searchSuggestions,
  warehouseOperationsData,
  summaryTableData,
  inventoryChartsData,
} from '../data/dummyData';

// Utility function to simulate API delay
const delay = (ms: number = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Generic response wrapper
const createApiResponse = <T>(data: T, total?: number): ApiResponse<T> => ({
  success: true,
  data,
  total,
  message: 'Success',
});

// Error response wrapper
const createErrorResponse = (message: string, code?: string) => ({
  success: false as const,
  data: null as any,
  message,
  code,
});

// Filter and pagination utility
const applyFilters = <
  T extends { name: string; category?: string; status?: string },
>(
  items: T[],
  filters: FilterOptions
): { filteredItems: T[]; total: number } => {
  let filtered = [...items];

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.name.toLowerCase().includes(searchTerm) ||
        (item.category && item.category.toLowerCase().includes(searchTerm))
    );
  }

  // Apply category filter
  if (filters.category) {
    filtered = filtered.filter((item) => item.category === filters.category);
  }

  // Apply status filter
  if (filters.status) {
    filtered = filtered.filter((item) => item.status === filters.status);
  }

  const total = filtered.length;

  // Apply pagination
  if (filters.page && filters.limit) {
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    filtered = filtered.slice(startIndex, endIndex);
  }

  return { filteredItems: filtered, total };
};

// Filter utility for reports (different structure)
const applyReportFilters = (
  items: Report[],
  filters: FilterOptions
): { filteredItems: Report[]; total: number } => {
  let filtered = [...items];

  // Apply search filter
  if (filters.search) {
    const searchTerm = filters.search.toLowerCase();
    filtered = filtered.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.type.toLowerCase().includes(searchTerm)
    );
  }

  // Apply status filter
  if (filters.status) {
    filtered = filtered.filter((item) => item.status === filters.status);
  }

  const total = filtered.length;

  // Apply pagination
  if (filters.page && filters.limit) {
    const startIndex = (filters.page - 1) * filters.limit;
    const endIndex = startIndex + filters.limit;
    filtered = filtered.slice(startIndex, endIndex);
  }

  return { filteredItems: filtered, total };
};

// === AUTHENTICATION API ===
export const authApi = {
  // Simulate login
  login: async (
    email: string,
    password: string
  ): Promise<ApiResponse<{ user: User; token: string }>> => {
    await delay();

    const user = usersData.find((u) => u.email === email);
    if (!user) {
      return createErrorResponse('Email không tồn tại', 'AUTH_USER_NOT_FOUND');
    }

    if (password !== 'password123') {
      // Simple password check for demo
      return createErrorResponse(
        'Mật khẩu không chính xác',
        'AUTH_INVALID_PASSWORD'
      );
    }

    return createApiResponse({
      user,
      token: 'mock-jwt-token-' + Date.now(),
    });
  },

  // Get current user
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    await delay(200);
    return createApiResponse(usersData[0]); // Return first user as current user
  },

  // Logout
  logout: async (): Promise<ApiResponse<{ message: string }>> => {
    await delay(300);
    return createApiResponse({ message: 'Đăng xuất thành công' });
  },
};

// === USERS API ===
export const usersApi = {
  // Get all users with filters
  getUsers: async (
    filters: FilterOptions = {}
  ): Promise<ApiResponse<User[]>> => {
    await delay();
    const { filteredItems, total } = applyFilters(usersData, filters);
    return {
      ...createApiResponse(filteredItems, total),
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
  },

  // Get user by ID
  getUserById: async (id: string): Promise<ApiResponse<User>> => {
    await delay();
    const user = usersData.find((u) => u.id === id);
    if (!user) {
      return createErrorResponse('Người dùng không tồn tại', 'USER_NOT_FOUND');
    }
    return createApiResponse(user);
  },

  // Create new user
  createUser: async (
    userData: Omit<User, 'id' | 'createdAt'>
  ): Promise<ApiResponse<User>> => {
    await delay();
    const newUser: User = {
      ...userData,
      id: 'user-' + Date.now(),
      createdAt: new Date(),
    };
    usersData.push(newUser);
    return createApiResponse(newUser);
  },

  // Update user
  updateUser: async (
    id: string,
    updates: Partial<User>
  ): Promise<ApiResponse<User>> => {
    await delay();
    const userIndex = usersData.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return createErrorResponse('Người dùng không tồn tại', 'USER_NOT_FOUND');
    }

    usersData[userIndex] = { ...usersData[userIndex], ...updates };
    return createApiResponse(usersData[userIndex]);
  },

  // Delete user
  deleteUser: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    await delay();
    const userIndex = usersData.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      return createErrorResponse('Người dùng không tồn tại', 'USER_NOT_FOUND');
    }

    usersData.splice(userIndex, 1);
    return createApiResponse({ message: 'Xóa người dùng thành công' });
  },
};

// === EQUIPMENT API ===
export const equipmentApi = {
  // Get all equipment with filters
  getEquipment: async (
    filters: FilterOptions = {}
  ): Promise<ApiResponse<Equipment[]>> => {
    await delay();
    const { filteredItems, total } = applyFilters(equipmentData, filters);
    return {
      ...createApiResponse(filteredItems, total),
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
  },

  // Get equipment by ID
  getEquipmentById: async (id: string): Promise<ApiResponse<Equipment>> => {
    await delay();
    const equipment = equipmentData.find((e) => e.id === id);
    if (!equipment) {
      return createErrorResponse(
        'Trang bị không tồn tại',
        'EQUIPMENT_NOT_FOUND'
      );
    }
    return createApiResponse(equipment);
  },

  // Create new equipment
  createEquipment: async (
    equipmentInput: Omit<Equipment, 'id' | 'maintenanceHistory'>
  ): Promise<ApiResponse<Equipment>> => {
    await delay();
    const newEquipment: Equipment = {
      ...equipmentInput,
      id: 'eq-' + Date.now(),
      maintenanceHistory: [],
    };
    equipmentData.push(newEquipment);
    return createApiResponse(newEquipment);
  },

  // Update equipment
  updateEquipment: async (
    id: string,
    updates: Partial<Equipment>
  ): Promise<ApiResponse<Equipment>> => {
    await delay();
    const equipmentIndex = equipmentData.findIndex((e) => e.id === id);
    if (equipmentIndex === -1) {
      return createErrorResponse(
        'Trang bị không tồn tại',
        'EQUIPMENT_NOT_FOUND'
      );
    }

    equipmentData[equipmentIndex] = {
      ...equipmentData[equipmentIndex],
      ...updates,
    };
    return createApiResponse(equipmentData[equipmentIndex]);
  },

  // Delete equipment
  deleteEquipment: async (
    id: string
  ): Promise<ApiResponse<{ message: string }>> => {
    await delay();
    const equipmentIndex = equipmentData.findIndex((e) => e.id === id);
    if (equipmentIndex === -1) {
      return createErrorResponse(
        'Trang bị không tồn tại',
        'EQUIPMENT_NOT_FOUND'
      );
    }

    equipmentData.splice(equipmentIndex, 1);
    return createApiResponse({ message: 'Xóa trang bị thành công' });
  },

  // Get equipment by type
  getEquipmentByType: async (
    type: string
  ): Promise<ApiResponse<Equipment[]>> => {
    await delay();
    const filtered = equipmentData.filter((e) => e.type === type);
    return createApiResponse(filtered, filtered.length);
  },
};

// === MATERIALS API ===
export const materialsApi = {
  // Get all materials with filters
  getMaterials: async (
    filters: FilterOptions = {}
  ): Promise<ApiResponse<Material[]>> => {
    await delay();
    const { filteredItems, total } = applyFilters(materialsData, filters);
    return {
      ...createApiResponse(filteredItems, total),
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
  },

  // Get material by ID
  getMaterialById: async (id: string): Promise<ApiResponse<Material>> => {
    await delay();
    const material = materialsData.find((m) => m.id === id);
    if (!material) {
      return createErrorResponse('Vật tư không tồn tại', 'MATERIAL_NOT_FOUND');
    }
    return createApiResponse(material);
  },

  // Get low stock materials
  getLowStockMaterials: async (): Promise<ApiResponse<Material[]>> => {
    await delay();
    const lowStock = materialsData.filter((m) => m.currentStock <= m.minStock);
    return createApiResponse(lowStock, lowStock.length);
  },

  // Update material stock
  updateMaterialStock: async (
    id: string,
    quantity: number,
    reason: string
  ): Promise<ApiResponse<Material>> => {
    await delay();
    const materialIndex = materialsData.findIndex((m) => m.id === id);
    if (materialIndex === -1) {
      return createErrorResponse('Vật tư không tồn tại', 'MATERIAL_NOT_FOUND');
    }

    const material = materialsData[materialIndex];
    material.currentStock += quantity;
    material.totalValue = material.currentStock * material.unitCost;

    // Add stock movement record
    material.stockMovements.push({
      id: 'sm-' + Date.now(),
      materialId: id,
      type: quantity > 0 ? 'in' : 'out',
      quantity: Math.abs(quantity),
      reason,
      date: new Date(),
      performedBy: 'Nguyễn Văn A',
    });

    return createApiResponse(material);
  },
};

// === WAREHOUSES API ===
export const warehousesApi = {
  // Get all warehouses
  getWarehouses: async (): Promise<ApiResponse<Warehouse[]>> => {
    await delay();
    return createApiResponse(warehousesData, warehousesData.length);
  },

  // Get warehouse by ID
  getWarehouseById: async (id: string): Promise<ApiResponse<Warehouse>> => {
    await delay();
    const warehouse = warehousesData.find((w) => w.id === id);
    if (!warehouse) {
      return createErrorResponse('Kho không tồn tại', 'WAREHOUSE_NOT_FOUND');
    }
    return createApiResponse(warehouse);
  },
};

// Dashboard filter utilities
const filterDashboardByOrganization = (
  data: DashboardStats,
  organizationLevels: OrganizationLevel[]
): DashboardStats => {
  const filteredOrganizations = data.organizations.filter((org) =>
    organizationLevels.includes(org.organizationLevel)
  );

  return {
    ...data,
    organizations: filteredOrganizations,
  };
};

const filterDashboardByStatus = (
  data: DashboardStats,
  statuses: EquipmentStatus[]
): DashboardStats => {
  const filteredOrganizations = data.organizations.map((org) => ({
    ...org,
    statuses: Object.fromEntries(
      Object.entries(org.statuses).filter(([status]) =>
        statuses.includes(status as EquipmentStatus)
      )
    ) as Record<EquipmentStatus, any>,
  }));

  return {
    ...data,
    organizations: filteredOrganizations,
  };
};

const filterDashboardByPeriod = (
  data: DashboardStats,
  period: { from: Date; to: Date }
): DashboardStats => {
  // For demo purposes, we'll just update the period
  // In real app, you'd filter data based on the period
  return {
    ...data,
    period,
  };
};

const applyDashboardFilters = (
  data: DashboardStats,
  filters: DashboardFilters
): DashboardStats => {
  let filteredData = { ...data };

  if (filters.organizationLevels && filters.organizationLevels.length > 0) {
    filteredData = filterDashboardByOrganization(
      filteredData,
      filters.organizationLevels
    );
  }

  if (filters.statuses && filters.statuses.length > 0) {
    filteredData = filterDashboardByStatus(filteredData, filters.statuses);
  }

  if (filters.period) {
    filteredData = filterDashboardByPeriod(filteredData, filters.period);
  }

  return filteredData;
};

// === DASHBOARD API ===
export const dashboardApi = {
  // Get dashboard statistics
  getStats: async (
    filters: DashboardFilters = {}
  ): Promise<ApiResponse<DashboardStats>> => {
    await delay();
    const filteredData = applyDashboardFilters(dashboardStats, filters);
    return createApiResponse(filteredData);
  },

  // Get organization chart data
  getOrganizationChart: async (
    filters: DashboardFilters = {}
  ): Promise<ApiResponse<ChartData>> => {
    await delay();
    let chartData = { ...organizationChart };

    // Filter chart data based on organization levels
    if (filters.organizationLevels && filters.organizationLevels.length > 0) {
      const orgLevels = filters.organizationLevels;
      const filteredData = applyDashboardFilters(dashboardStats, filters);

      // Update chart with filtered data
      chartData = {
        ...chartData,
        labels: filteredData.organizations.map((org) => org.name),
        datasets: [
          {
            ...chartData.datasets[0],
            data: filteredData.organizations.map((org) =>
              Object.values(org.statuses).reduce(
                (sum, status) => sum + status.quantity,
                0
              )
            ),
          },
        ],
      };
    }

    return createApiResponse(chartData);
  },

  // Get status distribution chart data
  getStatusDistributionChart: async (
    filters: DashboardFilters = {}
  ): Promise<ApiResponse<ChartData>> => {
    await delay();
    let chartData = { ...statusDistributionChart };

    // Filter chart data based on statuses
    if (filters.statuses && filters.statuses.length > 0) {
      const filteredData = applyDashboardFilters(dashboardStats, filters);
      // Calculate totals for each status across all organizations
      const statusTotals: Record<string, number> = {};

      filteredData.organizations.forEach((org) => {
        Object.entries(org.statuses).forEach(([status, data]) => {
          if (filters.statuses!.includes(status as EquipmentStatus)) {
            statusTotals[status] = (statusTotals[status] || 0) + data.quantity;
          }
        });
      });

      // Update chart with filtered data
      chartData = {
        ...chartData,
        labels: Object.keys(statusTotals),
        datasets: [
          {
            ...chartData.datasets[0],
            data: Object.values(statusTotals),
          },
        ],
      };
    }

    return createApiResponse(chartData);
  },

  // Get value by organization chart data
  getValueByOrganizationChart: async (
    filters: DashboardFilters = {}
  ): Promise<ApiResponse<ChartData>> => {
    await delay();
    let chartData = { ...valueByOrganizationChart };

    // Filter chart data based on organization levels
    if (filters.organizationLevels && filters.organizationLevels.length > 0) {
      const filteredData = applyDashboardFilters(dashboardStats, filters);

      // Update chart with filtered data
      chartData = {
        ...chartData,
        labels: filteredData.organizations.map((org) => org.name),
        datasets: [
          {
            ...chartData.datasets[0],
            data: filteredData.organizations.map(
              (org) =>
                Object.values(org.statuses).reduce(
                  (sum, status) => sum + status.value,
                  0
                ) / 1000000000 // Convert to billions
            ),
          },
        ],
      };
    }

    return createApiResponse(chartData);
  },

  // Get monthly trend chart data
  getMonthlyTrendChart: async (
    filters: DashboardFilters = {}
  ): Promise<ApiResponse<ChartData>> => {
    await delay();
    let chartData = { ...monthlyTrendChart };

    // For demo purposes, return the same data
    // In real app, you'd filter based on the period
    if (filters.period) {
      // Would filter data based on the period
      chartData = {
        ...chartData,
        // In real app, you'd generate data for the specific period
      };
    }

    return createApiResponse(chartData);
  },
};

// === REPORTS API ===
export const reportsApi = {
  // Get all reports
  getReports: async (
    filters: FilterOptions = {}
  ): Promise<ApiResponse<Report[]>> => {
    await delay();
    const { filteredItems, total } = applyReportFilters(reportsData, filters);
    return {
      ...createApiResponse(filteredItems, total),
      page: filters.page || 1,
      limit: filters.limit || 10,
    };
  },

  // Get report by ID
  getReportById: async (id: string): Promise<ApiResponse<Report>> => {
    await delay();
    const report = reportsData.find((r) => r.id === id);
    if (!report) {
      return createErrorResponse('Báo cáo không tồn tại', 'REPORT_NOT_FOUND');
    }
    return createApiResponse(report);
  },

  // Generate new report
  generateReport: async (
    type: string,
    period: { from: Date; to: Date }
  ): Promise<ApiResponse<Report>> => {
    await delay(2000); // Simulate longer processing time
    const newReport: Report = {
      id: 'rpt-' + Date.now(),
      title: `Báo cáo ${type} - ${period.from.toLocaleDateString()} đến ${period.to.toLocaleDateString()}`,
      type: type as any,
      period,
      generatedBy: 'Nguyễn Văn A',
      generatedAt: new Date(),
      status: 'completed',
      data: {},
      summary: 'Báo cáo đã được tạo thành công',
    };
    reportsData.push(newReport);
    return createApiResponse(newReport);
  },
};

// === NOTIFICATIONS API ===
export const notificationsApi = {
  // Get all notifications
  getNotifications: async (): Promise<ApiResponse<Notification[]>> => {
    await delay();
    return createApiResponse(notificationsData, notificationsData.length);
  },

  // Mark notification as read
  markAsRead: async (id: string): Promise<ApiResponse<{ message: string }>> => {
    await delay();
    const notification = notificationsData.find((n) => n.id === id);
    if (!notification) {
      return createErrorResponse(
        'Thông báo không tồn tại',
        'NOTIFICATION_NOT_FOUND'
      );
    }

    notification.isRead = true;
    return createApiResponse({ message: 'Đã đánh dấu đã đọc' });
  },

  // Get unread count
  getUnreadCount: async (): Promise<ApiResponse<{ count: number }>> => {
    await delay(100);
    const unreadCount = notificationsData.filter((n) => !n.isRead).length;
    return createApiResponse({ count: unreadCount });
  },
};

// === SEARCH API ===
export const searchApi = {
  // Global search
  search: async (
    query: string
  ): Promise<
    ApiResponse<{
      equipment: Equipment[];
      materials: Material[];
      users: User[];
      total: number;
    }>
  > => {
    await delay();

    const searchTerm = query.toLowerCase();

    const equipment = equipmentData
      .filter(
        (e) =>
          e.name.toLowerCase().includes(searchTerm) ||
          e.code.toLowerCase().includes(searchTerm) ||
          e.category.toLowerCase().includes(searchTerm)
      )
      .slice(0, 5);

    const materials = materialsData
      .filter(
        (m) =>
          m.name.toLowerCase().includes(searchTerm) ||
          m.code.toLowerCase().includes(searchTerm) ||
          m.category.toLowerCase().includes(searchTerm)
      )
      .slice(0, 5);

    const users = usersData
      .filter(
        (u) =>
          u.name.toLowerCase().includes(searchTerm) ||
          u.department.toLowerCase().includes(searchTerm) ||
          u.position.toLowerCase().includes(searchTerm)
      )
      .slice(0, 5);

    const total = equipment.length + materials.length + users.length;

    return createApiResponse({
      equipment,
      materials,
      users,
      total,
    });
  },

  // Get search suggestions
  getSuggestions: async (query: string): Promise<ApiResponse<string[]>> => {
    await delay(100);
    const suggestions = searchSuggestions
      .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);

    return createApiResponse(suggestions);
  },
};

// Warehouse Operations API
const warehouseOperationsApi = {
  // Get warehouse operations data by organization level
  getOperations: async (
    organizationLevel: OrganizationLevel
  ): Promise<ApiResponse<WarehouseOperationsData>> => {
    await delay();

    const data = warehouseOperationsData[organizationLevel];
    return createApiResponse(data);
  },

  // Get operations with filters
  getOperationsWithFilters: async (
    organizationLevel: OrganizationLevel,
    filters?: DashboardFilters
  ): Promise<ApiResponse<WarehouseOperationsData>> => {
    await delay();

    let data = warehouseOperationsData[organizationLevel];

    // Apply filters if needed
    if (filters) {
      // For now, just return the data as is
      // In a real implementation, you would filter based on date ranges, categories, etc.
      data = {
        ...data,
        lastUpdated: new Date(),
      };
    }

    return createApiResponse(data);
  },
};

// Summary Table API
const summaryTableApi = {
  // Get summary table data by organization level
  getSummaryTable: async (
    organizationLevel: OrganizationLevel
  ): Promise<ApiResponse<SummaryTableData>> => {
    await delay();

    const data = summaryTableData[organizationLevel];
    return createApiResponse(data);
  },

  // Get summary table with filters
  getSummaryTableWithFilters: async (
    organizationLevel: OrganizationLevel,
    filters?: DashboardFilters
  ): Promise<ApiResponse<SummaryTableData>> => {
    await delay();

    let data = summaryTableData[organizationLevel];

    // Apply filters if needed
    if (filters) {
      // For now, just return the data as is
      // In a real implementation, you would filter based on date ranges, categories, etc.
      data = {
        ...data,
        lastUpdated: new Date(),
      };
    }

    return createApiResponse(data);
  },
};

// Inventory Charts API
const inventoryChartsApi = {
  // Get inventory charts data by organization level and operation type
  getInventoryCharts: async (
    organizationLevel: OrganizationLevel,
    operationType: 'nhap' | 'xuat' = 'nhap'
  ): Promise<ApiResponse<InventoryChartsData>> => {
    await delay();

    const data = inventoryChartsData[organizationLevel][operationType];
    return createApiResponse(data);
  },

  // Get inventory charts with filters
  getInventoryChartsWithFilters: async (
    organizationLevel: OrganizationLevel,
    operationType: 'nhap' | 'xuat' = 'nhap',
    filters?: DashboardFilters
  ): Promise<ApiResponse<InventoryChartsData>> => {
    await delay();

    let data = inventoryChartsData[organizationLevel][operationType];

    // Apply filters if needed
    if (filters) {
      // For now, just return the data as is
      // In a real implementation, you would filter based on date ranges, categories, etc.
      data = {
        ...data,
        lastUpdated: new Date(),
      };
    }

    return createApiResponse(data);
  },
};

// Export all APIs
export const api = {
  auth: authApi,
  users: usersApi,
  equipment: equipmentApi,
  materials: materialsApi,
  warehouses: warehousesApi,
  dashboard: dashboardApi,
  reports: reportsApi,
  notifications: notificationsApi,
  search: searchApi,
  warehouseOperations: warehouseOperationsApi,
  summaryTable: summaryTableApi,
  inventoryCharts: inventoryChartsApi,
};
