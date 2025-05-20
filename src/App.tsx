import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/contexts/AuthContext';
import AppLayout from '@/components/AppLayout';
import NavBar from '@/components/NavBar';
import NotFound from '@/pages/NotFound';
import Documentation from '@/pages/Documentation';
import ActivitiesPage from '@/pages/ActivitiesPage';
import ProfilePages from '@/pages/ProfilePages';
import AdminPages from '@/pages/admin/AdminPages';
import UsersManagement from '@/pages/admin/UsersManagement';
import './App.css';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="safarmood-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <NavBar />
            <Routes>
              <Route path="/" element={<AppLayout />} />
              <Route path="/experiences" element={<ActivitiesPage />} />
              <Route path="/documentation" element={<Documentation />} />
              <Route path="/profile" element={<ProfilePages />} />
              <Route path="/admin" element={<AdminPages />} />
              <Route path="/admin/users" element={<UsersManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
