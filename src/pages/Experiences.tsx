import React from 'react';
import { useTranslation } from 'react-i18next';
import ExperiencesPage from './ExperiencesPage';

const Experiences: React.FC = () => {
  const { t } = useTranslation();
  
  return <ExperiencesPage />;
};

export default Experiences;