import { useState, useCallback, useEffect } from 'react';
import type { ApiResponse, FilterOptions } from '../types';

// Generic API hook type
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

// Custom hook for API calls
export const useApi = <T>(
  apiFunction: (...args: any[]) => Promise<ApiResponse<T>>
): UseApiResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setLoading(true);
        setError(null);

        const response = await apiFunction(...args);

        if (response.success) {
          setData(response.data);
        } else {
          setError(response.message || 'Có lỗi xảy ra');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setLoading(false);
  }, []);

  return { data, loading, error, execute, reset };
};

// Hook for list APIs with pagination
interface UseListApiResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  setPage: (page: number) => void;
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  refetch: () => void;
  reset: () => void;
}

export const useListApi = <T>(
  apiFunction: (filters: FilterOptions) => Promise<ApiResponse<T[]>>,
  initialFilters: FilterOptions = {}
): UseListApiResult<T> => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(initialFilters.page || 1);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const executeWithFilters = useCallback(async () => {
    const currentFilters = { ...filters, page };
    try {
      setLoading(true);
      setError(null);

      const response = await apiFunction(currentFilters);

      if (response.success) {
        setData(response.data);
        setTotal(response.total || 0);
      } else {
        setError(response.message || 'Có lỗi xảy ra');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
    } finally {
      setLoading(false);
    }
  }, [apiFunction, filters, page]);

  const reset = useCallback(() => {
    setData([]);
    setError(null);
    setLoading(false);
    setTotal(0);
  }, []);

  const refetch = useCallback(() => {
    executeWithFilters();
  }, [executeWithFilters]);

  // Auto-fetch when filters or page change
  useEffect(() => {
    executeWithFilters();
  }, [executeWithFilters]);

  return {
    data,
    loading,
    error,
    total,
    page,
    setPage,
    filters,
    setFilters,
    refetch,
    reset,
  };
};

// Hook for form submissions
interface UseFormApiResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  submit: (...args: any[]) => Promise<boolean>;
  reset: () => void;
}

export const useFormApi = (
  apiFunction: (...args: any[]) => Promise<ApiResponse<any>>
): UseFormApiResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = useCallback(
    async (...args: any[]): Promise<boolean> => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await apiFunction(...args);

        if (response.success) {
          setSuccess(true);
          return true;
        } else {
          setError(response.message || 'Có lỗi xảy ra');
          return false;
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Có lỗi xảy ra');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
    setLoading(false);
  }, []);

  return { loading, error, success, submit, reset };
};

// Example usage hooks for specific APIs
import { api } from '../services/api';

export const useDashboardStats = () => {
  return useApi(api.dashboard.getStats);
};

export const useEquipmentList = (initialFilters?: FilterOptions) => {
  return useListApi(api.equipment.getEquipment, initialFilters);
};

export const useMaterialsList = (initialFilters?: FilterOptions) => {
  return useListApi(api.materials.getMaterials, initialFilters);
};

export const useUsersList = (initialFilters?: FilterOptions) => {
  return useListApi(api.users.getUsers, initialFilters);
};

export const useSearch = () => {
  return useApi(api.search.search);
};

export const useNotifications = () => {
  return useApi(api.notifications.getNotifications);
};

export const useCreateEquipment = () => {
  return useFormApi(api.equipment.createEquipment);
};

export const useUpdateEquipment = () => {
  return useFormApi(api.equipment.updateEquipment);
};

export const useCreateUser = () => {
  return useFormApi(api.users.createUser);
};

export const useLogin = () => {
  return useFormApi(api.auth.login);
};
