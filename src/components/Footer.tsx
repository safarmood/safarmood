import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="mt-8 border-t pt-4 pb-6 text-center text-sm text-gray-500">
      {t('common.copyright')}
    </footer>
  );
};

export default Footer;
