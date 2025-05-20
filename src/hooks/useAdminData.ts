import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { PaginationState, SortingState, FilterState } from '@/types/admin';

interface UseAdminDataProps {
  table: string;
  initialPagination?: PaginationState;
  initialSorting?: SortingState;
  initialFilter?: FilterState;
}

export function useAdminData<T>({ 
  table, 
  initialPagination = { pageIndex: 0, pageSize: 10, totalCount: 0 },
  initialSorting = { field: 'created_at', direction: 'desc' },
  initialFilter = { search: '' }
}: UseAdminDataProps) {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState<PaginationState>(initialPagination);
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [filter, setFilter] = useState<FilterState>(initialFilter);

  useEffect(() => {
    fetchData();
  }, [pagination.pageIndex, pagination.pageSize, sorting, filter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from(table)
        .select('*', { count: 'exact' });

      // Apply search filter if it exists
      if (filter.search) {
        // For profiles table, search by username or full_name
        if (table === 'profiles') {
          query = query.or(`username.ilike.%${filter.search}%,full_name.ilike.%${filter.search}%`);
        } else {
          // For other tables, search by name
          query = query.ilike('name', `%${filter.search}%`);
        }
      }

      // Apply additional filters
      Object.entries(filter).forEach(([key, value]) => {
        if (key !== 'search' && value !== undefined && value !== '') {
          query = query.eq(key, value);
        }
      });

      // Apply sorting
      query = query.order(sorting.field, { 
        ascending: sorting.direction === 'asc' 
      });

      // Apply pagination
      const { from, to } = getPaginationRange();
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (error) throw error;

      setData(data as T[]);
      setPagination(prev => ({ ...prev, totalCount: count || 0 }));
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const getPaginationRange = () => {
    const from = pagination.pageIndex * pagination.pageSize;
    const to = from + pagination.pageSize - 1;
    return { from, to };
  };

  const createItem = async (item: Partial<T>) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .insert(item)
        .select();

      if (error) throw error;
      
      fetchData();
      return data[0];
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to create item'));
      throw err;
    }
  };

  const updateItem = async (id: string, updates: Partial<T>) => {
    try {
      const { data, error } = await supabase
        .from(table)
        .update(updates)
        .eq('id', id)
        .select();

      if (error) throw error;
      
      fetchData();
      return data[0];
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update item'));
      throw err;
    }
  };

  const deleteItem = async (id: string) => {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      fetchData();
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to delete item'));
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    pagination,
    sorting,
    filter,
    setPagination,
    setSorting,
    setFilter,
    fetchData,
    createItem,
    updateItem,
    deleteItem
  };
}
