import React from 'react';
import AppDocumentation from '@/components/AppDocumentation';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';

const Documentation: React.FC = () => {
  return (
    <ThemeProvider defaultTheme="light" storageKey="safarmood-theme">
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-4">
          <AppDocumentation />
          <Footer />
        </div>
        <Toaster />
      </div>
    </ThemeProvider>
  );
};

export default Documentation;