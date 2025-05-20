import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mood, City, CuisineType, ServiceType, PriceRange } from '@/types';
import MoodSelector from './MoodSelector';
import CityFilter from './CityFilter';
import CuisineFilter from './CuisineFilter';
import ServicesFilter from './ServicesFilter';
import PriceRangeFilter from './PriceRangeFilter';
import { Button } from './ui/button';

interface SearchFiltersProps {
  selectedMoods: Mood[];
  setSelectedMoods: (moods: Mood[]) => void;
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  selectedType: 'all' | 'hotel' | 'restaurant';
  setSelectedType: (type: 'all' | 'hotel' | 'restaurant') => void;
  selectedCuisine: CuisineType | null;
  setSelectedCuisine: (cuisine: CuisineType | null) => void;
  selectedServices: ServiceType[];
  setSelectedServices: (services: ServiceType[]) => void;
  selectedPriceRange: PriceRange | null;
  setSelectedPriceRange: (priceRange: PriceRange | null) => void;
  onSearch: () => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  selectedMoods,
  setSelectedMoods,
  selectedCity,
  setSelectedCity,
  selectedType,
  setSelectedType,
  selectedCuisine,
  setSelectedCuisine,
  selectedServices,
  setSelectedServices,
  selectedPriceRange,
  setSelectedPriceRange,
  onSearch
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6 rounded-lg border bg-background p-6 shadow-sm">
      <MoodSelector selectedMoods={selectedMoods} setSelectedMoods={setSelectedMoods} />
      
      <CityFilter selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('filters.establishmentType')}</h2>
        <div className="flex gap-2">
          <Button
            variant={selectedType === 'all' ? 'default' : 'outline'}
            onClick={() => setSelectedType('all')}
          >
            {t('filters.all')}
          </Button>
          <Button
            variant={selectedType === 'hotel' ? 'default' : 'outline'}
            onClick={() => setSelectedType('hotel')}
          >
            {t('filters.hotels')}
          </Button>
          <Button
            variant={selectedType === 'restaurant' ? 'default' : 'outline'}
            onClick={() => setSelectedType('restaurant')}
          >
            {t('filters.restaurants')}
          </Button>
        </div>
      </div>
      
      {selectedType === 'restaurant' || selectedType === 'all' ? (
        <CuisineFilter 
          selectedCuisine={selectedCuisine} 
          setSelectedCuisine={setSelectedCuisine} 
        />
      ) : null}
      
      <ServicesFilter 
        selectedServices={selectedServices} 
        setSelectedServices={setSelectedServices} 
      />
      
      <PriceRangeFilter 
        selectedPriceRange={selectedPriceRange} 
        setSelectedPriceRange={setSelectedPriceRange} 
      />
      
      <Button className="w-full" onClick={onSearch}>
        {t('filters.search')}
      </Button>
    </div>
  );
};

export default SearchFilters;