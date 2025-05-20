import React from 'react';
import { useTranslation } from 'react-i18next';
import { CuisineType } from '@/types';
import { Button } from './ui/button';

interface CuisineFilterProps {
  selectedCuisine: CuisineType | null;
  setSelectedCuisine: (cuisine: CuisineType | null) => void;
}

const cuisineTypes: CuisineType[] = [
  'Marocaine',
  'Internationale',
  'Asiatique',
  'Méditerranéenne',
  'Fusion',
  'Européenne'
];

const CuisineFilter: React.FC<CuisineFilterProps> = ({
  selectedCuisine,
  setSelectedCuisine
}) => {
  const { t } = useTranslation();

  const handleCuisineClick = (cuisine: CuisineType) => {
    if (selectedCuisine === cuisine) {
      setSelectedCuisine(null);
    } else {
      setSelectedCuisine(cuisine);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('filters.cuisine')}</h2>
      <div className="flex flex-wrap gap-2">
        {cuisineTypes.map((cuisine) => (
          <Button
            key={cuisine}
            variant={selectedCuisine === cuisine ? 'default' : 'outline'}
            onClick={() => handleCuisineClick(cuisine)}
            className="text-sm"
          >
            {t(`cuisines.${cuisine}`)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CuisineFilter;