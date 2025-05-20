import React from 'react';
import { Button } from '@/components/ui/button';
import { City } from '@/types';
import { useTranslation } from 'react-i18next';

interface CityFilterProps {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
}

const cities: { value: City; label: string }[] = [
  { value: 'Casablanca', label: 'Casablanca' },
  { value: 'Marrakech', label: 'Marrakech' },
  { value: 'Rabat', label: 'Rabat' },
  { value: 'Fes', label: 'Fes' },
  { value: 'Tangier', label: 'Tangier' },
  { value: 'Agadir', label: 'Agadir' },
  { value: 'Essaouira', label: 'Essaouira' },
];

const CityFilter: React.FC<CityFilterProps> = ({ selectedCity, setSelectedCity }) => {
  const { t } = useTranslation();
  
  const selectCity = (city: City) => {
    if (selectedCity === city) {
      setSelectedCity(null);
    } else {
      setSelectedCity(city);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('cities.filterByCity')}</h2>
      <div className="flex flex-wrap gap-2">
        {cities.map((city) => (
          <Button
            key={city.value}
            variant={selectedCity === city.value ? 'default' : 'outline'}
            onClick={() => selectCity(city.value)}
          >
            {t(`cities.${city.value}`)}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CityFilter;