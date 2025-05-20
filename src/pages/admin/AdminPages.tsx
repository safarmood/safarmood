import React from 'react';
import { useAdminData } from '@/hooks/useAdminData';
import { Establishment } from '@/types';
import { Activity } from '@/types/activities';
import { User } from '@/types/admin';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import CSVUploader from '@/components/admin/CSVUploader';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/admin/AdminLayout';

// Establishments Admin Page
export const EstablishmentsAdmin: React.FC = () => {
  const { 
    data: establishments, 
    loading, 
    filter, 
    setFilter,
    deleteItem 
  } = useAdminData<Establishment>({ table: 'establishments' });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet établissement ?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Error deleting establishment:', error);
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Hôtels & Restaurants</h2>
        <Button>Ajouter</Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Rechercher..." 
            value={filter.search} 
            onChange={handleSearch} 
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Chargement...</TableCell>
              </TableRow>
            ) : establishments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Aucun établissement trouvé</TableCell>
              </TableRow>
            ) : (
              establishments.map((establishment) => (
                <TableRow key={establishment.id}>
                  <TableCell>{establishment.name}</TableCell>
                  <TableCell>{establishment.type === 'hotel' ? 'Hôtel' : 'Restaurant'}</TableCell>
                  <TableCell>{establishment.city}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(establishment.id)}>
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4">
        <CSVUploader table="establishments" />
      </div>
    </div>
  );
};

// Activities Admin Page
export const ActivitiesAdmin: React.FC = () => {
  const { 
    data: activities, 
    loading, 
    filter, 
    setFilter,
    deleteItem 
  } = useAdminData<Activity>({ table: 'activities' });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };
  
  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette activité ?')) {
      try {
        await deleteItem(id);
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Activités</h2>
        <Button>Ajouter</Button>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Rechercher..." 
            value={filter.search} 
            onChange={handleSearch} 
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Ville</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Chargement...</TableCell>
              </TableRow>
            ) : activities.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Aucune activité trouvée</TableCell>
              </TableRow>
            ) : (
              activities.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell>{activity.name}</TableCell>
                  <TableCell>{activity.type}</TableCell>
                  <TableCell>{activity.city}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDelete(activity.id)}>
                        Supprimer
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="mt-4">
        <CSVUploader table="activities" />
      </div>
    </div>
  );
};

// Users Admin Page
export const UsersAdmin: React.FC = () => {
  const { 
    data: users, 
    loading, 
    filter, 
    setFilter
  } = useAdminData<User>({ table: 'profiles' });
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const updateUserRole = async (userId: string, newRole: 'user' | 'admin' | 'super_admin') => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId);
      
      if (error) throw error;
      
      // Update local state
      const updatedUsers = users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      );
      
      // This is a workaround since we can't directly update the data from useAdminData
      // In a real app, you'd want to refetch or have a better state management solution
      window.location.reload();
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };
  
  const getRoleBadgeColor = (role?: string) => {
    switch (role) {
      case 'super_admin': return 'bg-red-500 hover:bg-red-600';
      case 'admin': return 'bg-blue-500 hover:bg-blue-600';
      default: return 'bg-gray-500 hover:bg-gray-600';
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Utilisateurs</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <Input 
            placeholder="Rechercher..." 
            value={filter.search} 
            onChange={handleSearch} 
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom d'utilisateur</TableHead>
              <TableHead>Nom complet</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Chargement...</TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">Aucun utilisateur trouvé</TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username || 'N/A'}</TableCell>
                  <TableCell>{user.full_name || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge className={getRoleBadgeColor(user.role)}>
                      {user.role || 'user'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {user.role !== 'admin' && user.role !== 'super_admin' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateUserRole(user.id, 'admin')}
                        >
                          Make Admin
                        </Button>
                      )}
                      {user.role === 'admin' && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => updateUserRole(user.id, 'user')}
                        >
                          Remove Admin
                        </Button>
                      )}
                      {/* Super admin can't be changed through the UI for security */}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// Default export for the main admin page
const AdminPages: React.FC = () => {
  return (
    <AdminLayout>
      <EstablishmentsAdmin />
    </AdminLayout>
  );
};

export default AdminPages;
