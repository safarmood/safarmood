import React from 'react';
import { useTranslation } from 'react-i18next';
import { PriceRange } from '@/types';
import { Button } from './ui/button';

interface PriceRangeFilterProps {
  selectedPriceRange: PriceRange | null;
  setSelectedPriceRange: (priceRange: PriceRange | null) => void;
}

const priceRanges: { value: PriceRange; label: string }[] = [
  { value: 'budget', label: 'budget' },
  { value: 'moderate', label: 'moderate' },
  { value: 'premium', label: 'premium' },
  { value: 'luxury', label: 'luxury' }
];

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({
  selectedPriceRange,
  setSelectedPriceRange
}) => {
  const { t } = useTranslation();
  
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

export default PriceRangeFilter;