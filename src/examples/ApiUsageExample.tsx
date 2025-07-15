import React, { useEffect } from 'react';
import {
  useDashboardStats,
  useEquipmentList,
  useMaterialsList,
  useSearch,
  useCreateEquipment,
  useNotifications,
} from '../hooks/useApi';
import { api } from '../services/api';

// Example 1: Dashboard Statistics
const DashboardStatsExample: React.FC = () => {
  const { data: stats, loading, error, execute } = useDashboardStats();

  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) return <div>Đang tải thống kê...</div>;
  if (error) return <div>Lỗi: {error}</div>;
  if (!stats) return null;

  return (
    <div>
      <h2>📊 Dashboard Statistics</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
        }}
      >
        <div>
          <h3>Tổng trang bị</h3>
          <p>{stats.totalEquipment}</p>
        </div>
        <div>
          <h3>Trang bị hoạt động</h3>
          <p>{stats.activeEquipment}</p>
        </div>
        <div>
          <h3>Cần bảo trì</h3>
          <p>{stats.maintenanceRequired}</p>
        </div>
        <div>
          <h3>Tổng giá trị</h3>
          <p>{stats.totalValue.toLocaleString('vi-VN')} VNĐ</p>
        </div>
      </div>
    </div>
  );
};

// Example 2: Equipment List with Pagination & Filters
const EquipmentListExample: React.FC = () => {
  const {
    data: equipment,
    loading,
    error,
    total,
    page,
    setPage,
    filters,
    setFilters,
    refetch,
  } = useEquipmentList({ limit: 5 });

  const handleSearch = (searchTerm: string) => {
    setFilters({ ...filters, search: searchTerm });
  };

  const handleFilterByType = (type: string) => {
    setFilters({ ...filters, category: type });
  };

  if (loading) return <div>Đang tải danh sách trang bị...</div>;
  if (error) return <div>Lỗi: {error}</div>;

  return (
    <div>
      <h2>🔧 Equipment List</h2>

      {/* Search & Filters */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Tìm kiếm trang bị..."
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginRight: '1rem', padding: '0.5rem' }}
        />
        <select onChange={(e) => handleFilterByType(e.target.value)}>
          <option value="">Tất cả loại</option>
          <option value="weapon">Vũ khí</option>
          <option value="vehicle">Phương tiện</option>
          <option value="communication">Thông tin liên lạc</option>
          <option value="protection">Bảo vệ cá nhân</option>
        </select>
        <button onClick={refetch} style={{ marginLeft: '1rem' }}>
          🔄 Refresh
        </button>
      </div>

      {/* Equipment List */}
      <div>
        {equipment.map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '0.5rem',
              borderRadius: '8px',
            }}
          >
            <h3>
              {item.name} ({item.code})
            </h3>
            <p>
              <strong>Loại:</strong> {item.category}
            </p>
            <p>
              <strong>Trạng thái:</strong>
              <span
                style={{
                  color:
                    item.status === 'active'
                      ? 'green'
                      : item.status === 'maintenance'
                        ? 'orange'
                        : 'red',
                }}
              >
                {item.status}
              </span>
            </p>
            <p>
              <strong>Số lượng:</strong> {item.quantity} {item.unit}
            </p>
            <p>
              <strong>Vị trí:</strong> {item.location}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: '1rem' }}>
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          ← Previous
        </button>
        <span style={{ margin: '0 1rem' }}>
          Page {page} - Total: {total} items
        </span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={equipment.length < (filters.limit || 10)}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

// Example 3: Search Functionality
const SearchExample: React.FC = () => {
  const { data: searchResults, loading, error, execute } = useSearch();

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      await execute(query);
    }
  };

  return (
    <div>
      <h2>🔍 Global Search</h2>
      <input
        type="text"
        placeholder="Tìm kiếm trong hệ thống..."
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: '100%', padding: '0.75rem', fontSize: '1rem' }}
      />

      {loading && <div>Đang tìm kiếm...</div>}
      {error && <div>Lỗi: {error}</div>}

      {searchResults && (
        <div style={{ marginTop: '1rem' }}>
          <h3>Kết quả tìm kiếm ({searchResults.total})</h3>

          {searchResults.equipment.length > 0 && (
            <div>
              <h4>Trang bị ({searchResults.equipment.length})</h4>
              {searchResults.equipment.map((item) => (
                <div
                  key={item.id}
                  style={{ padding: '0.5rem', border: '1px solid #eee' }}
                >
                  {item.name} - {item.category}
                </div>
              ))}
            </div>
          )}

          {searchResults.materials.length > 0 && (
            <div>
              <h4>Vật tư ({searchResults.materials.length})</h4>
              {searchResults.materials.map((item) => (
                <div
                  key={item.id}
                  style={{ padding: '0.5rem', border: '1px solid #eee' }}
                >
                  {item.name} - {item.category}
                </div>
              ))}
            </div>
          )}

          {searchResults.users.length > 0 && (
            <div>
              <h4>Người dùng ({searchResults.users.length})</h4>
              {searchResults.users.map((item) => (
                <div
                  key={item.id}
                  style={{ padding: '0.5rem', border: '1px solid #eee' }}
                >
                  {item.name} - {item.department}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Example 4: Create Equipment Form
const CreateEquipmentExample: React.FC = () => {
  const { loading, error, success, submit, reset } = useCreateEquipment();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);

    const equipmentData = {
      name: formData.get('name') as string,
      code: formData.get('code') as string,
      category: formData.get('category') as string,
      type: formData.get('type') as any,
      status: 'active' as const,
      condition: 'excellent' as const,
      quantity: parseInt(formData.get('quantity') as string),
      unit: formData.get('unit') as string,
      manufacturer: formData.get('manufacturer') as string,
      model: formData.get('model') as string,
      purchaseDate: new Date(),
      location: formData.get('location') as string,
      cost: parseInt(formData.get('cost') as string),
      specifications: {},
    };

    const success = await submit(equipmentData);
    if (success) {
      (e.target as HTMLFormElement).reset();
    }
  };

  return (
    <div>
      <h2>➕ Create New Equipment</h2>

      {success && (
        <div style={{ color: 'green', marginBottom: '1rem' }}>
          ✅ Trang bị đã được tạo thành công!
          <button onClick={reset} style={{ marginLeft: '1rem' }}>
            OK
          </button>
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>❌ {error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <label>Tên trang bị:</label>
          <input
            name="name"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Mã trang bị:</label>
          <input
            name="code"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Loại:</label>
          <select
            name="type"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          >
            <option value="">Chọn loại</option>
            <option value="weapon">Vũ khí</option>
            <option value="vehicle">Phương tiện</option>
            <option value="communication">Thông tin liên lạc</option>
            <option value="protection">Bảo vệ cá nhân</option>
            <option value="tool">Công cụ</option>
          </select>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Hãng sản xuất:</label>
          <input
            name="manufacturer"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Số lượng:</label>
          <input
            name="quantity"
            type="number"
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
          }}
        >
          {loading ? 'Đang tạo...' : 'Tạo trang bị'}
        </button>
      </form>
    </div>
  );
};

// Example 5: Direct API Usage (without hooks)
const DirectApiExample: React.FC = () => {
  const [materials, setMaterials] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const loadLowStockMaterials = async () => {
    setLoading(true);
    try {
      const response = await api.materials.getLowStockMaterials();
      if (response.success) {
        setMaterials(response.data);
      }
    } catch (error) {
      console.error('Error loading materials:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStock = async (materialId: string, quantity: number) => {
    try {
      const response = await api.materials.updateMaterialStock(
        materialId,
        quantity,
        'Cập nhật từ giao diện'
      );
      if (response.success) {
        loadLowStockMaterials(); // Refresh list
        alert('Cập nhật tồn kho thành công!');
      }
    } catch (error) {
      alert('Lỗi cập nhật tồn kho');
    }
  };

  useEffect(() => {
    loadLowStockMaterials();
  }, []);

  return (
    <div>
      <h2>⚠️ Low Stock Materials (Direct API)</h2>

      <button onClick={loadLowStockMaterials} disabled={loading}>
        {loading ? 'Đang tải...' : '🔄 Refresh'}
      </button>

      <div style={{ marginTop: '1rem' }}>
        {materials.map((material) => (
          <div
            key={material.id}
            style={{
              border: '1px solid #ffa500',
              padding: '1rem',
              marginBottom: '0.5rem',
              backgroundColor: '#fff8dc',
              borderRadius: '8px',
            }}
          >
            <h3>{material.name}</h3>
            <p>
              <strong>Tồn kho hiện tại:</strong> {material.currentStock}{' '}
              {material.unit}
            </p>
            <p>
              <strong>Mức tối thiểu:</strong> {material.minStock}{' '}
              {material.unit}
            </p>
            <p>
              <strong>Vị trí:</strong> {material.location}
            </p>

            <div style={{ marginTop: '0.5rem' }}>
              <button
                onClick={() => updateStock(material.id, 100)}
                style={{ marginRight: '0.5rem', padding: '0.25rem 0.5rem' }}
              >
                +100
              </button>
              <button
                onClick={() => updateStock(material.id, 500)}
                style={{ padding: '0.25rem 0.5rem' }}
              >
                +500
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Example Component
const ApiUsageExample: React.FC = () => {
  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>🚀 API Usage Examples</h1>
      <p>Đây là các ví dụ về cách sử dụng API và hooks trong ứng dụng.</p>

      <div style={{ display: 'grid', gap: '2rem' }}>
        <DashboardStatsExample />
        <EquipmentListExample />
        <SearchExample />
        <CreateEquipmentExample />
        <DirectApiExample />
      </div>
    </div>
  );
};

export default ApiUsageExample;
