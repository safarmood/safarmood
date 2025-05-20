import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminUsersList from '@/components/admin/AdminUsersList';

export default function UsersManagement() {
  return (
    <AdminLayout>
      <div className="container mx-auto py-6">
        <AdminUsersList />
      </div>
    </AdminLayout>
  );
}
