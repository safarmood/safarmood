import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityType, DurationType } from '@/types/activities';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface ExperienceFiltersProps {
  selectedTypes: ActivityType[];
  setSelectedTypes: (types: ActivityType[]) => void;
  selectedAmbiences: string[];
  setSelectedAmbiences: (ambiences: string[]) => void;
  selectedCity: string | null;
  setSelectedCity: (city: string | null) => void;
  selectedDuration: DurationType | null;
  setSelectedDuration: (duration: DurationType | null) => void;
  onReset: () => void;
}

const ExperienceFilters: React.FC<ExperienceFiltersProps> = ({
  selectedTypes,
  setSelectedTypes,
  selectedAmbiences,
  setSelectedAmbiences,
  selectedCity,
  setSelectedCity,
  selectedDuration,
  setSelectedDuration,
  onReset,
}) => {
  const { t } = useTranslation();

  // Toggle type selection
  const handleTypeChange = (type: ActivityType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Toggle ambience selection
  const handleAmbienceChange = (ambience: string) => {
    if (selectedAmbiences.includes(ambience)) {
      setSelectedAmbiences(selectedAmbiences.filter((a) => a !== ambience));
    } else {
      setSelectedAmbiences([...selectedAmbiences, ambience]);
    }
  };

  // Handle city selection
  const handleCityChange = (value: string) => {
    setSelectedCity(value === 'all-cities' ? null : value);
  };

  // Handle duration selection
  const handleDurationChange = (value: string) => {
    setSelectedDuration(value === 'any-duration' ? null : value as DurationType);
  };

  return (
    <div className="bg-card p-4 rounded-lg border">
      <h2 className="font-medium text-lg mb-4">{t('experiences.filters.title')}</h2>

      {/* Activity Type Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">{t('experiences.filters.type')}</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-activity"
              checked={selectedTypes.includes('activity')}
              onCheckedChange={() => handleTypeChange('activity')}
            />
            <Label htmlFor="type-activity">{t('experiences.types.activity')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-tour"
              checked={selectedTypes.includes('tour')}
              onCheckedChange={() => handleTypeChange('tour')}
            />
            <Label htmlFor="type-tour">{t('experiences.types.tour')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="type-event"
              checked={selectedTypes.includes('event')}
              onCheckedChange={() => handleTypeChange('event')}
            />
            <Label htmlFor="type-event">{t('experiences.types.event')}</Label>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Ambience Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">{t('experiences.filters.ambience')}</h3>
        <div className="grid grid-cols-2 gap-2">
          {['adventurous', 'nature', 'cultural', 'traditional', 'festive', 'gastronomic', 'romantic', 'quiet'].map(
            (ambience) => (
              <div key={ambience} className="flex items-center space-x-2">
                <Checkbox
                  id={`ambience-${ambience}`}
                  checked={selectedAmbiences.includes(ambience)}
                  onCheckedChange={() => handleAmbienceChange(ambience)}
                />
                <Label htmlFor={`ambience-${ambience}`}>
                  {t(`experiences.ambiences.${ambience}`)}
                </Label>
              </div>
            )
          )}
        </div>
      </div>

      <Separator className="my-4" />

      {/* City Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">{t('experiences.filters.city')}</h3>
        <Select value={selectedCity || 'all-cities'} onValueChange={handleCityChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('experiences.filters.allCities')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all-cities">{t('experiences.filters.allCities')}</SelectItem>
            <SelectItem value="Casablanca">{t('cities.Casablanca')}</SelectItem>
            <SelectItem value="Marrakech">{t('cities.Marrakech')}</SelectItem>
            <SelectItem value="Rabat">{t('cities.Rabat')}</SelectItem>
            <SelectItem value="Fes">{t('cities.Fes')}</SelectItem>
            <SelectItem value="Tangier">{t('cities.Tangier')}</SelectItem>
            <SelectItem value="Agadir">{t('cities.Agadir')}</SelectItem>
            <SelectItem value="Essaouira">{t('cities.Essaouira')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Duration Filter */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">{t('experiences.filters.duration')}</h3>
        <Select value={selectedDuration || 'any-duration'} onValueChange={handleDurationChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('experiences.filters.anyDuration')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="any-duration">{t('experiences.filters.anyDuration')}</SelectItem>
            <SelectItem value="half-day">{t('experiences.duration.halfDay')}</SelectItem>
            <SelectItem value="full-day">{t('experiences.duration.fullDay')}</SelectItem>
            <SelectItem value="multi-day">{t('experiences.duration.multiDay')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reset Button */}
      <Button variant="outline" className="w-full" onClick={onReset}>
        {t('filters.reset')}
      </Button>
    </div>
  );
};

export default ExperienceFilters;
