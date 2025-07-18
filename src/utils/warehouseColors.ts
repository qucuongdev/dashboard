// Màu sắc cho các loại hoạt động kho
export const WAREHOUSE_OPERATION_COLORS = {
  'Nhập kho': '#1B5E20', // Xanh lá đậm
  'Xuất kho': '#B71C1C', // Đỏ đậm
  'Điều chuyển': '#0D47A1', // Xanh dương đậm
} as const;

// Type cho các loại hoạt động
export type WarehouseOperationType = keyof typeof WAREHOUSE_OPERATION_COLORS;

// Function để lấy màu dựa trên loại hoạt động
export const getOperationColor = (operationType: string): string => {
  return (
    WAREHOUSE_OPERATION_COLORS[operationType as WarehouseOperationType] ||
    '#6B7280'
  ); // Mặc định màu xám
};

// Function để kiểm tra có phải operation type không
export const isValidOperationType = (
  type: string
): type is WarehouseOperationType => {
  return type in WAREHOUSE_OPERATION_COLORS;
};
