export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  role?: 'user' | 'admin' | 'super_admin';
}

export interface Favorite {
  id: string;
  user_id: string;
  item_type: 'establishment' | 'activity';
  item_id: string;
  created_at: string;
}

export interface HistoryItem {
  id: string;
  user_id: string;
  item_type: 'establishment' | 'activity';
  item_id: string;
  action: 'view' | 'book';
  created_at: string;
}
