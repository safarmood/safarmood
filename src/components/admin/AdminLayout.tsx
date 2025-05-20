import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { user, profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop() || 'establishments';

  useEffect(() => {
    // Check if user is admin or super_admin
    if (profile && profile.role !== 'admin' && profile.role !== 'super_admin') {
      navigate('/');
    }
  }, [profile, navigate]);

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès Restreint</h1>
        <p className="mb-4">Vous devez être connecté pour accéder à l'administration.</p>
        <Button asChild>
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    );
  }

  // Redirect if not admin
  if (profile && profile.role !== 'admin' && profile.role !== 'super_admin') {
    return (
      <div className="container py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Accès Restreint</h1>
        <p className="mb-4">Vous devez être administrateur pour accéder à cette section.</p>
        <Button asChild>
          <Link to="/">Retour à l'accueil</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Administration SafarMood</h1>
        {profile?.role === 'super_admin' && (
          <div className="px-3 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
            Super Admin
          </div>
        )}
        <Button asChild variant="outline">
          <Link to="/">Retour au site</Link>
        </Button>
      </div>

      <Tabs value={currentPath} className="mb-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="establishments" asChild>
            <Link to="/admin/establishments">Hôtels & Restaurants</Link>
          </TabsTrigger>
          <TabsTrigger value="activities" asChild>
            <Link to="/admin/activities">Activités</Link>
          </TabsTrigger>
          <TabsTrigger value="users" asChild>
            <Link to="/admin/users">Utilisateurs</Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-card rounded-lg border p-6">
        {children || <Outlet />}
      </div>
    </div>
  );
};

export default AdminLayout;
