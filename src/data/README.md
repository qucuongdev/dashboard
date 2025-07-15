# 📊 Dummy Data & API System

Hệ thống quản lý dữ liệu giả lập và API cho ứng dụng **Quản lý Trang bị, Vật tư, Vật chất Hậu cần - Kỹ thuật**.

## 🏗️ Kiến trúc

```
src/
├── types/           # Type definitions
│   └── index.ts
├── data/           # Dummy data
│   └── dummyData.ts
├── services/       # API services
│   └── api.ts
├── hooks/          # Custom React hooks
│   └── useApi.ts
└── examples/       # Usage examples
    └── ApiUsageExample.tsx
```

## 📋 Dữ liệu Có sẵn

### 👥 Users (Người dùng)

- **4 users** với các roles khác nhau: admin, manager, operator, viewer
- Thông tin: name, email, department, position, role

### 🔧 Equipment (Trang bị)

- **4 equipments** bao gồm:
  - Súng trường AK-74 (weapon)
  - Xe tải KAMAZ (vehicle)
  - Bộ đàm Harris (communication)
  - Áo giáp chống đạn (protection)
- Thông tin đầy đủ: specs, maintenance history, cost, location

### 📦 Materials (Vật tư)

- **4 materials** bao gồm:
  - Đạn 5.45×39mm (ammunition)
  - Dầu nhớt (supply)
  - Pin AA (consumable)
  - Phụ tùng AK-74 (spare_part)
- Stock tracking, expiry dates, movements

### 🏪 Warehouses (Kho)

- **2 warehouses** với sections và facilities
- Security levels, capacity, utilization

### 📊 Dashboard Data

- Real-time statistics
- Chart data cho các loại biểu đồ
- Monthly expense tracking

### 📄 Reports & Notifications

- Sample reports (inventory, maintenance)
- System notifications với các types khác nhau

## 🔌 API Endpoints

### Authentication

```typescript
api.auth.login(email, password);
api.auth.getCurrentUser();
api.auth.logout();
```

### Users Management

```typescript
api.users.getUsers(filters?)
api.users.getUserById(id)
api.users.createUser(userData)
api.users.updateUser(id, updates)
api.users.deleteUser(id)
```

### Equipment Management

```typescript
api.equipment.getEquipment(filters?)
api.equipment.getEquipmentById(id)
api.equipment.createEquipment(data)
api.equipment.updateEquipment(id, updates)
api.equipment.deleteEquipment(id)
api.equipment.getEquipmentByType(type)
```

### Materials & Inventory

```typescript
api.materials.getMaterials(filters?)
api.materials.getMaterialById(id)
api.materials.getLowStockMaterials()
api.materials.updateMaterialStock(id, quantity, reason)
```

### Dashboard & Analytics

```typescript
api.dashboard.getStats();
api.dashboard.getEquipmentByTypeChart();
api.dashboard.getMaterialsByCategoryChart();
api.dashboard.getMonthlyExpenseChart();
```

### Search

```typescript
api.search.search(query);
api.search.getSuggestions(query);
```

## 🎣 Custom Hooks

### Basic API Hook

```typescript
const { data, loading, error, execute, reset } = useApi(apiFunction);

// Usage
const { data: stats, loading, error, execute } = useDashboardStats();
useEffect(() => {
  execute();
}, [execute]);
```

### List API Hook (với pagination)

```typescript
const {
  data,
  loading,
  error,
  total,
  page,
  setPage,
  filters,
  setFilters,
  refetch,
} = useListApi(apiFunction, initialFilters);

// Usage
const {
  data: equipment,
  loading,
  page,
  setPage,
  setFilters,
} = useEquipmentList({ limit: 10 });
```

### Form API Hook

```typescript
const { loading, error, success, submit, reset } = useFormApi(apiFunction);

// Usage
const { loading, success, submit } = useCreateEquipment();
const handleSubmit = async (formData) => {
  const success = await submit(formData);
  if (success) {
    // Handle success
  }
};
```

## 🚀 Sử dụng nhanh

### 1. Import types

```typescript
import type { User, Equipment, Material, ApiResponse } from '../types';
```

### 2. Sử dụng API directly

```typescript
import { api } from '../services/api';

// Get all equipment
const response = await api.equipment.getEquipment();
if (response.success) {
  console.log(response.data);
}

// Create new equipment
const newEquipment = await api.equipment.createEquipment({
  name: 'New Equipment',
  type: 'weapon',
  // ... other fields
});
```

### 3. Sử dụng hooks trong component

```typescript
import { useEquipmentList, useCreateEquipment } from '../hooks/useApi';

const EquipmentPage = () => {
  const { data: equipment, loading } = useEquipmentList();
  const { submit: createEquipment } = useCreateEquipment();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {equipment.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
};
```

### 4. Filters & Search

```typescript
// Filter equipment by type
const { data, setFilters } = useEquipmentList();
setFilters({ category: 'weapon', status: 'active' });

// Search globally
const { data: results, execute } = useSearch();
await execute('AK-74');
console.log(results.equipment, results.materials, results.users);
```

## 🔍 Ví dụ đầy đủ

Xem file `src/examples/ApiUsageExample.tsx` để có các ví dụ chi tiết về:

1. **Dashboard Statistics** - Hiển thị thống kê tổng quan
2. **Equipment List** - Danh sách với pagination & filters
3. **Global Search** - Tìm kiếm toàn hệ thống
4. **Create Form** - Form tạo mới với validation
5. **Direct API Usage** - Sử dụng API trực tiếp

## 🎨 Tùy chỉnh

### Thêm dữ liệu mới

Chỉnh sửa file `src/data/dummyData.ts`:

```typescript
export const customData = [
  {
    id: 'custom-001',
    name: 'Custom Item',
    // ... other fields
  },
];
```

### Thêm API endpoint mới

Chỉnh sửa file `src/services/api.ts`:

```typescript
export const customApi = {
  getCustomData: async (): Promise<ApiResponse<CustomType[]>> => {
    await delay();
    return createApiResponse(customData);
  },
};
```

### Tạo hook mới

Thêm vào file `src/hooks/useApi.ts`:

```typescript
export const useCustomData = () => {
  return useApi(api.custom.getCustomData);
};
```

## ⚡ Performance Tips

1. **Lazy Loading**: Chỉ load data khi cần thiết
2. **Caching**: Sử dụng React Query hoặc SWR cho production
3. **Pagination**: Luôn sử dụng pagination cho large datasets
4. **Debounce**: Debounce search queries
5. **Memoization**: Memo expensive computations

## 🔧 Mở rộng cho Production

Để chuyển sang production API thật:

1. Thay đổi base URL trong api services
2. Thêm authentication headers
3. Implement proper error handling
4. Add retry logic
5. Use React Query/SWR cho caching
6. Add loading states cho UI

## 📝 Type Safety

Toàn bộ hệ thống được type với TypeScript:

```typescript
// Tất cả API responses đều type-safe
const response: ApiResponse<Equipment[]> = await api.equipment.getEquipment();

// Hooks cũng type-safe
const { data }: { data: Equipment[] } = useEquipmentList();

// Form data được validate
const equipmentData: Omit<Equipment, 'id' | 'maintenanceHistory'> = {
  name: 'Test',
  type: 'weapon', // TypeScript sẽ validate enum
  // ...
};
```

## 🎯 Next Steps

1. Integrate với UI components hiện tại
2. Thêm error boundaries
3. Implement optimistic updates
4. Add offline support
5. Create data visualization charts
6. Add bulk operations
7. Implement real-time updates với WebSocket

Happy coding! 🚀
