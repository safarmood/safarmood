import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import LanguageSwitcher from './LanguageSwitcher';
import ProfileMenu from './profile/ProfileMenu';

const NavBar: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
          <nav className="flex items-center space-x-4 lg:space-x-6">
            <Link
              to="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t('common.home')}
            </Link>
            <Link
              to="/experiences"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t('experiences.title')}
            </Link>
            <Link
              to="/documentation"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {t('common.documentation')}
            </Link>
          </nav>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default NavBar;
