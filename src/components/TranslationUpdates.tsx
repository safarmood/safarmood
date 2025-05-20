import { useTranslation } from 'react-i18next';
import React from 'react';

// This file contains updated components with translation support

// EstablishmentCard with translations
export const TranslatedEstablishmentCard = ({ establishment, onViewDetails }: any) => {
  const { t } = useTranslation();
  const { name, type, description, city, moods, rating, images } = establishment;

  return (
    <div className="card overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <div 
          className="h-full w-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${images[0] || '/placeholder.svg'})` }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl">{name}</h3>
          <span className="flex items-center text-yellow-500">
            ⭐ {rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="capitalize">{type}</span>
          <span className="mx-2">•</span>
          <span>{city}</span>
        </div>
      </div>
      <div className="p-4 pt-0">
        <p className="line-clamp-2">{description}</p>
        <div className="mt-3 flex flex-wrap gap-1">
          {moods.map((mood: string) => (
            <span 
              key={mood} 
              className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {t(`moods.${mood}`)}
            </span>
          ))}
        </div>
      </div>
      <div className="p-4 pt-0">
        <button 
          className="w-full border rounded p-2" 
          onClick={() => onViewDetails(establishment)}
        >
          {t('establishment.viewDetails')}
        </button>
      </div>
    </div>
  );
};

// MoodSelector with translations
export const TranslatedMoodSelector = ({ selectedMoods, setSelectedMoods }: any) => {
  const { t } = useTranslation();
  const moods = [
    { value: 'romantic', icon: '❤️' },
    { value: 'family', icon: '👨‍👩‍👧‍👦' },
    { value: 'festive', icon: '🎉' },
    { value: 'traditional', icon: '🏺' },
    { value: 'modern', icon: '🏙️' },
    { value: 'quiet', icon: '🧘' },
    { value: 'luxury', icon: '💎' },
  ];

  const toggleMood = (mood: string) => {
    if (selectedMoods.includes(mood)) {
      setSelectedMoods(selectedMoods.filter((m: string) => m !== mood));
    } else {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{t('filters.mood')}</h2>
      <div className="flex flex-wrap gap-2">
        {moods.map((mood) => (
          <button
            key={mood.value}
            className={`flex items-center gap-2 border rounded p-2 ${selectedMoods.includes(mood.value) ? 'bg-primary text-white' : ''}`}
            onClick={() => toggleMood(mood.value)}
          >
            <span>{mood.icon}</span>
            <span>{t(`moods.${mood.value}`)}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// CityFilter with translations
export const TranslatedCityFilter = ({ selectedCity, setSelectedCity }: any) => {
  const { t } = useTranslation();
  const cities = [
    { value: 'Casablanca' },
    { value: 'Marrakech' },
    { value: 'Rabat' },
    { value: 'Fes' },
    { value: 'Tangier' },
    { value: 'Agadir' },
    { value: 'Essaouira' },
  ];

  const selectCity = (city: string) => {
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
          <button
            key={city.value}
            className={`border rounded p-2 ${selectedCity === city.value ? 'bg-primary text-white' : ''}`}
            onClick={() => selectCity(city.value)}
          >
            {t(`cities.${city.value}`)}
          </button>
        ))}
      </div>
    </div>
  );
};

// EstablishmentDetails with translations
export const TranslatedEstablishmentDetails = ({ establishment, onClose, onReserve }: any) => {
  const { t } = useTranslation();

  const formatServiceLabel = (service: string): string => {
    return t(`services.${service}`);
  };

  const formatPriceRange = (priceRange?: string): string => {
    if (!priceRange) return t('establishment.notSpecified');
    return t(`priceRanges.${priceRange}`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{establishment.name}</h2>
          <button onClick={onClose} className="text-gray-500">&times;</button>
        </div>
        
        <div className="text-sm text-gray-500 mb-4">
          {establishment.city} • {establishment.type === 'hotel' ? t('filters.hotels') : t('filters.restaurants')}
          {establishment.cuisine && ` • ${t(`cuisines.${establishment.cuisine}`)}`}
        </div>

        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div>
            <img 
              src={establishment.images[0] || '/placeholder.svg'} 
              alt={establishment.name}
              className="w-full rounded-md object-cover h-64"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{t('establishment.description')}</h3>
              <p className="text-sm text-muted-foreground">{establishment.description}</p>
            </div>

            <div>
              <h3 className="font-medium">{t('establishment.ambiance')}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {establishment.moods.map((mood: string) => (
                  <span key={mood} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {t(`moods.${mood}`)}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium">{t('filters.services')}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {establishment.services.map((service: string) => (
                  <span key={service} className="px-2 py-1 bg-gray-200 rounded-full text-sm">
                    {formatServiceLabel(service)}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium">{t('establishment.priceRange')}</h3>
              <p className="text-sm text-muted-foreground">
                {formatPriceRange(establishment.priceRange)}
              </p>
            </div>

            <div>
              <h3 className="font-medium">{t('establishment.rating')}</h3>
              <div className="flex items-center">
                <span className="text-xl font-bold">{establishment.rating}</span>
                <span className="text-sm text-muted-foreground ml-2">/5</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button className="border rounded px-4 py-2" onClick={onClose}>
            {t('establishment.close')}
          </button>
          <button className="bg-primary text-white rounded px-4 py-2" onClick={() => onReserve(establishment)}>
            {t('establishment.reserve')}
          </button>
        </div>
      </div>
    </div>
  );
};

// SearchFilters with translations
export const TranslatedSearchFilters = (props: any) => {
  const { t } = useTranslation();
  const {
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
  } = props;

  return (
    <div className="space-y-6 rounded-lg border bg-background p-6 shadow-sm">
      <TranslatedMoodSelector selectedMoods={selectedMoods} setSelectedMoods={setSelectedMoods} />
      
      <TranslatedCityFilter selectedCity={selectedCity} setSelectedCity={setSelectedCity} />
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">{t('filters.establishmentType')}</h2>
        <div className="flex gap-2">
          <button
            className={`border rounded p-2 ${selectedType === 'all' ? 'bg-primary text-white' : ''}`}
            onClick={() => setSelectedType('all')}
          >
            {t('filters.all')}
          </button>
          <button
            className={`border rounded p-2 ${selectedType === 'hotel' ? 'bg-primary text-white' : ''}`}
            onClick={() => setSelectedType('hotel')}
          >
            {t('filters.hotels')}
          </button>
          <button
            className={`border rounded p-2 ${selectedType === 'restaurant' ? 'bg-primary text-white' : ''}`}
            onClick={() => setSelectedType('restaurant')}
          >
            {t('filters.restaurants')}
          </button>
        </div>
      </div>
      
      <button className="w-full bg-primary text-white p-2 rounded" onClick={onSearch}>
        {t('filters.search')}
      </button>
    </div>
  );
};