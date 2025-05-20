import React from 'react';
import { useTranslation } from 'react-i18next';
import { Establishment, City, Mood, PriceRange, CuisineType, ServiceType } from '@/types';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';

// Translated CityFilter
export const TranslatedCityFilter: React.FC<{
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
}> = ({ selectedCity, setSelectedCity }) => {
  const { t } = useTranslation();
  
  const cities: { value: City; label: string }[] = [
    { value: 'Casablanca', label: t('cities.Casablanca') },
    { value: 'Marrakech', label: t('cities.Marrakech') },
    { value: 'Rabat', label: t('cities.Rabat') },
    { value: 'Fes', label: t('cities.Fes') },
    { value: 'Tangier', label: t('cities.Tangier') },
    { value: 'Agadir', label: t('cities.Agadir') },
    { value: 'Essaouira', label: t('cities.Essaouira') },
  ];

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
            {city.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

// Translated CuisineFilter
export const TranslatedCuisineFilter: React.FC<{
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

// Translated MoodSelector
export const TranslatedMoodSelector: React.FC<{
  selectedMoods: Mood[];
  setSelectedMoods: (moods: Mood[]) => void;
}> = ({ selectedMoods, setSelectedMoods }) => {
  const { t } = useTranslation();
  
  const moods: { value: Mood; label: string; icon: string }[] = [
    { value: 'romantic', label: t('moods.romantic'), icon: '❤️' },
    { value: 'family', label: t('moods.family'), icon: '👨‍👩‍👧‍👦' },
    { value: 'festive', label: t('moods.festive'), icon: '🎉' },
    { value: 'traditional', label: t('moods.traditional'), icon: '🏺' },
    { value: 'modern', label: t('moods.modern'), icon: '🏙️' },
    { value: 'quiet', label: t('moods.quiet'), icon: '🧘' },
    { value: 'luxury', label: t('moods.luxury'), icon: '💎' },
  ];

  const toggleMood = (mood: Mood) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter(m => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('filters.mood')}</h2>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <Button
            key={mood.value}
            variant={selectedMoods.includes(mood.value) ? 'default' : 'outline'}
            onClick={() => toggleMood(mood.value)}
            className="flex items-center gap-2"
          >
            <span>{mood.icon}</span>
            <span>{mood.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};
