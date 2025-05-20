export interface User {
  id: string;
  email: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: 'admin' | 'user';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
}

export interface SortingState {
  field: string;
  direction: 'asc' | 'desc';
}

export interface FilterState {
  search: string;
  [key: string]: any;
}

export interface CSVImportResult {
  success: number;
  failed: number;
  errors: string[];
}
