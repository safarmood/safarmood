import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  
  return (
    <header className={`mb-8 text-center ${className}`}>
      <div className="flex justify-center mb-4"> {/* Increased bottom margin for more space */}
        <Logo size="xl" /> {/* Upgraded from 'lg' to 'xl' for a larger logo */}
      </div>
      <p className="text-lg text-muted-foreground">
        {t('home.tagline')}
      </p>
    </header>
  );
};

export default Header;