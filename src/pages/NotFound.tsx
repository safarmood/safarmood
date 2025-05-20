import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center p-8 rounded-lg border border-border bg-card shadow-md animate-slide-in">
          <h1 className="text-5xl font-bold mb-6 text-primary">404</h1>
          <p className="text-xl text-card-foreground mb-6">{t('errors.notFound')}</p>
          <a href="/" className="text-primary hover:text-primary/80 underline transition-colors">
            {t('errors.goHome')}
          </a>
        </div>
      </div>
      <div className="container mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default NotFound;