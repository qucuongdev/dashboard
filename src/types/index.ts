// User & Authentication Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator' | 'viewer';
  department: string;
  position: string;
  avatar?: string;
  isActive: boolean;
  lastLogin?: Date;
  createdAt: Date;
}

// Equipment Types
export interface Equipment {
  id: string;
  name: string;
  code: string;
  category: string;
  type: 'weapon' | 'vehicle' | 'communication' | 'protection' | 'tool';
  status: 'active' | 'maintenance' | 'damaged' | 'retired';
  condition: 'excellent' | 'good' | 'fair' | 'poor';
  quantity: number;
  unit: string;
  manufacturer: string;
  model: string;
  serialNumber?: string;
  purchaseDate: Date;
  warrantyExpiry?: Date;
  lastMaintenance?: Date;
  nextMaintenance?: Date;
  location: string;
  assignedTo?: string;
  cost: number;
  images?: string[];
  specifications?: Record<string, any>;
  maintenanceHistory: MaintenanceRecord[];
}

export interface MaintenanceRecord {
  id: string;
  equipmentId: string;
  type: 'routine' | 'repair' | 'upgrade';
  description: string;
  performedBy: string;
  date: Date;
  cost: number;
  status: 'completed' | 'pending' | 'cancelled';
}

// Inventory/Materials Types
export interface Material {
  id: string;
  name: string;
  code: string;
  category: string;
  type: 'consumable' | 'spare_part' | 'supply' | 'ammunition';
  currentStock: number;
  minStock: number;
  maxStock: number;
  unit: string;
  unitCost: number;
  totalValue: number;
  supplier: string;
  location: string;
  expiryDate?: Date;
  batchNumber?: string;
  lastRestocked: Date;
  stockMovements: StockMovement[];
}

export interface StockMovement {
  id: string;
  materialId: string;
  type: 'in' | 'out' | 'transfer' | 'adjustment';
  quantity: number;
  reason: string;
  date: Date;
  performedBy: string;
  fromLocation?: string;
  toLocation?: string;
  cost?: number;
}

// Warehouse Types
export interface Warehouse {
  id: string;
  name: string;
  code: string;
  type: 'main' | 'secondary' | 'temporary';
  location: string;
  capacity: number;
  currentUtilization: number;
  manager: string;
  status: 'active' | 'maintenance' | 'closed';
  securityLevel: 'low' | 'medium' | 'high' | 'classified';
  facilities: string[];
  sections: WarehouseSection[];
}

export interface WarehouseSection {
  id: string;
  warehouseId: string;
  name: string;
  code: string;
  capacity: number;
  currentUtilization: number;
  materialTypes: string[];
}

// Military Organization & Status Types
export type OrganizationLevel = 'total' | 'command' | 'division' | 'unit';
export type EquipmentStatus =
  | 'total'
  | 'in_system'
  | 'in_storage'
  | 'technical_support'
  | 'repair'
  | 'national_reserve'
  | 'ready_combat'
  | 'pending_disposal'
  | 'other';

export type OperationType = 'nhap' | 'xuat';

export interface StatusData {
  quantity: number;
  value: number;
  changePercent?: number; // % biến động so với kỳ trước
}

export interface OrganizationData {
  organizationLevel: OrganizationLevel;
  name: string;
  statuses: Record<EquipmentStatus, StatusData>;
}

// Statistics & Reports Types
// Warehouse Operations Types
export interface WarehouseOperationDetail {
  label: string;
  value: number;
}

export interface WarehouseOperationCard {
  title: string;
  total: string;
  details: WarehouseOperationDetail[];
}

export interface WarehouseOperationSection {
  title: string;
  color: string;
  cards: WarehouseOperationCard[];
}

export interface WarehouseOperationsData {
  lastUpdated: Date;
  organizationLevel: OrganizationLevel;
  sections: WarehouseOperationSection[];
}

// Summary Table Types
export interface SummaryTableRowData {
  trangBiNhom1: number;
  trangBiNhom2: number;
  vatTuNhom1: number;
  vatTuNhom2: number;
  dtqg: number;
  sscd: number;
  vatChat: number;
}

export interface SummaryTableData {
  lastUpdated: Date;
  organizationLevel: OrganizationLevel;
  tonDauKy: SummaryTableRowData;
  tang: SummaryTableRowData;
  giam: SummaryTableRowData;
  tonHienTai: SummaryTableRowData;
}

// Inventory Charts Types
export interface WarehouseChartData {
  warehouseId: string;
  warehouseName: string;
  tdm: number; // Tổng Diện tích Mặt bằng (m²)
  tsl: number; // Tổng Số Lượng
  cl: number; // Chất Lượng (%)
  value: number; // Giá trị cho biểu đồ
}

export interface CategoryChartData {
  categoryName: string;
  categoryKey: string;
  warehouses: WarehouseChartData[];
}

export interface InventoryChartsData {
  lastUpdated: Date;
  organizationLevel: OrganizationLevel;
  operationType: OperationType;
  categories: CategoryChartData[];
}

export interface DashboardStats {
  lastUpdated: Date;
  period: {
    from: Date;
    to: Date;
  };
  organizations: OrganizationData[];
  summary: {
    totalQuantity: number;
    totalValue: number;
    totalChangePercent: number;
  };
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string[];
    borderColor?: string[];
  }[];
}

export interface Report {
  id: string;
  title: string;
  type: 'inventory' | 'maintenance' | 'financial' | 'usage' | 'security';
  period: {
    from: Date;
    to: Date;
  };
  generatedBy: string;
  generatedAt: Date;
  status: 'draft' | 'completed' | 'approved';
  data: any;
  summary: string;
}

// Request/Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  total?: number;
  page?: number;
  limit?: number;
}

export interface ApiError {
  success: false;
  message: string;
  code?: string;
}

// Filter & Search Types
export interface FilterOptions {
  search?: string;
  category?: string;
  status?: string;
  dateFrom?: Date;
  dateTo?: Date;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

// Notification Types
export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionUrl?: string;
}

// Mapping constants for Vietnamese labels
export const ORGANIZATION_LABELS: Record<OrganizationLevel, string> = {
  total: 'Tổng',
  command: 'Bộ Tư lệnh',
  division: 'Ban Chỉ Huy',
  unit: 'Đơn vị',
};

export const STATUS_LABELS: Record<EquipmentStatus, string> = {
  total: 'Tổng hợp',
  in_system: 'Trên hệ thống',
  in_storage: 'Trong kho',
  technical_support: 'Bảo đảm kỹ thuật',
  repair: 'Sửa chữa',
  national_reserve: 'Dự trữ quốc gia',
  ready_combat: 'Sẵn sàng chiến đấu',
  pending_disposal: 'Chờ thanh lý',
  other: 'Khác',
};

// Dashboard Filter Types
export interface DashboardFilters {
  organizationLevels?: OrganizationLevel[];
  statuses?: EquipmentStatus[];
  period?: {
    from: Date;
    to: Date;
  };
  includeChangePercent?: boolean;
}
