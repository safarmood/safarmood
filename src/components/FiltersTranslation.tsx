import React from 'react';
import { useTranslation } from 'react-i18next';
import { CuisineType, ServiceType, PriceRange } from '@/types';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

// CuisineFilter with translations
export const CuisineFilter: React.FC<{
  selectedCuisine: CuisineType | null;
  setSelectedCuisine: (cuisine: CuisineType | null) => void;
}> = ({ selectedCuisine, setSelectedCuisine }) => {
  const { t } = useTranslation();
  
  const cuisineTypes: CuisineType[] = [
    'Marocaine',
    'Internationale',
    'Asiatique',
    'Méditerranéenne',
    'Fusion',
    'Européenne'
  ];

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

// ServicesFilter with translations
export const ServicesFilter: React.FC<{
  selectedServices: ServiceType[];
  setSelectedServices: (services: ServiceType[]) => void;
}> = ({ selectedServices, setSelectedServices }) => {
  const { t } = useTranslation();
  
  const servicesList: { value: ServiceType; label: string }[] = [
    { value: 'terrace', label: 'terrace' },
    { value: 'pool', label: 'pool' },
    { value: 'accessibility', label: 'accessibility' },
    { value: 'wifi', label: 'wifi' },
    { value: 'spa', label: 'spa' },
    { value: 'gym', label: 'gym' },
    { value: 'restaurant', label: 'restaurant' },
    { value: 'bar', label: 'bar' },
    { value: 'garden', label: 'garden' },
    { value: 'kids club', label: 'kids club' },
    { value: 'live music', label: 'live music' }
  ];

  const toggleService = (service: ServiceType) => {
    if (selectedServices.includes(service)) {
      setSelectedServices(selectedServices.filter(s => s !== service));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('filters.services')}</h2>
      <div className="grid grid-cols-2 gap-3">
        {servicesList.map((service) => (
          <div key={service.value} className="flex items-center space-x-2">
            <Checkbox
              id={`service-${service.value}`}
              checked={selectedServices.includes(service.value)}
              onCheckedChange={() => toggleService(service.value)}
            />
            <Label
              htmlFor={`service-${service.value}`}
              className="text-sm font-medium cursor-pointer"
            >
              {t(`services.${service.value}`)}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

// PriceRangeFilter with translations
export const PriceRangeFilter: React.FC<{
  selectedPriceRange: PriceRange | null;
  setSelectedPriceRange: (priceRange: PriceRange | null) => void;
}> = ({ selectedPriceRange, setSelectedPriceRange }) => {
  const { t } = useTranslation();
  
  const priceRanges: { value: PriceRange; label: string }[] = [
    { value: 'budget', label: 'budget' },
    { value: 'moderate', label: 'moderate' },
    { value: 'premium', label: 'premium' },
    { value: 'luxury', label: 'luxury' }
  ];

  const handlePriceRangeClick = (priceRange: PriceRange) => {
    if (selectedPriceRange === priceRange) {
      setSelectedPriceRange(null);
    } else {
      setSelectedPriceRange(priceRange);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('filters.priceRange')}</h2>
      <div className="flex flex-wrap gap-2">
        {priceRanges.map((price) => (
          <Button
            key={price.value}
            variant={selectedPriceRange === price.value ? 'default' : 'outline'}
            onClick={() => handlePriceRangeClick(price.value)}
            className="text-sm"
          >
            {t(`priceRanges.${price.value}`)}
          </Button>
        ))}
      </div>
    </div>
  );
};