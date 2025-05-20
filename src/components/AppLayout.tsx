import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/hooks/use-mobile';
import { Establishment, Mood, City, CuisineType, ServiceType, PriceRange } from '@/types';
import { establishments } from '@/data/establishments';
import { toast } from '@/components/ui/use-toast';
import SearchFilters from './SearchFilters';
import EstablishmentCard from './EstablishmentCard';
import EstablishmentDetails from './EstablishmentDetails';
import Header from './Header';
import Footer from './Footer';

const AppLayout: React.FC = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [selectedType, setSelectedType] = useState<'all' | 'hotel' | 'restaurant'>('all');
  const [selectedCuisine, setSelectedCuisine] = useState<CuisineType | null>(null);
  const [selectedServices, setSelectedServices] = useState<ServiceType[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [filteredEstablishments, setFilteredEstablishments] = useState<Establishment[]>(establishments);
  const [selectedEstablishment, setSelectedEstablishment] = useState<Establishment | null>(null);

  const handleSearch = () => {
    let results = [...establishments];
    
    // Filter by mood if any selected
    if (selectedMoods.length > 0) {
      results = results.filter(est => 
        selectedMoods.some(mood => est.moods.includes(mood))
      );
    }
    
    // Filter by city if selected
    if (selectedCity) {
      results = results.filter(est => est.city === selectedCity);
    }
    
    // Filter by type if not 'all'
    if (selectedType !== 'all') {
      results = results.filter(est => est.type === selectedType);
    }

    // Filter by cuisine if selected and applicable
    if (selectedCuisine) {
      results = results.filter(est => est.cuisine === selectedCuisine);
    }

    // Filter by services if any selected
    if (selectedServices.length > 0) {
      results = results.filter(est => 
        selectedServices.every(service => est.services.includes(service))
      );
    }

    // Filter by price range if selected
    if (selectedPriceRange) {
      results = results.filter(est => est.priceRange === selectedPriceRange);
    }
    
    setFilteredEstablishments(results);
    
    if (results.length === 0) {
      toast({
        title: t('establishment.noResults'),
        description: t('establishment.tryModifyingCriteria'),
        variant: "destructive"
      });
    } else {
      toast({
        title: t('establishment.resultsFound'),
        description: t('establishment.matchingEstablishments', { count: results.length })
      });
    }
  };

  const handleViewDetails = (establishment: Establishment) => {
    setSelectedEstablishment(establishment);
  };

  const handleReserve = (establishment: Establishment) => {
    toast({
      title: t('establishment.bookingInProgress'),
      description: t('establishment.bookingDescription', { name: establishment.name })
    });
    setSelectedEstablishment(null);
  };

  return (
    <div className="container mx-auto p-4">
      <Header />

      <div className="grid gap-8 md:grid-cols-[350px_1fr]">
        <aside>
          <SearchFilters
            selectedMoods={selectedMoods}
            setSelectedMoods={setSelectedMoods}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedCuisine={selectedCuisine}
            setSelectedCuisine={setSelectedCuisine}
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
            onSearch={handleSearch}
          />
        </aside>

        <main>
          <h2 className="mb-4 text-2xl font-semibold">
            {filteredEstablishments.length} {t('establishment.establishmentsFound')}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEstablishments.map(establishment => (
              <EstablishmentCard
                key={establishment.id}
                establishment={establishment}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </main>
      </div>

      {selectedEstablishment && (
        <EstablishmentDetails
          establishment={selectedEstablishment}
          onClose={() => setSelectedEstablishment(null)}
          onReserve={handleReserve}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default AppLayout;