import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabase';
import { Activity, ActivityType, DurationType } from '@/types/activities';
import ExperienceCard from '@/components/ExperienceCard';
import ExperienceFilters from '@/components/ExperienceFilters';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';

const ExperiencesPage: React.FC = () => {
  const { t } = useTranslation();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Selected activity for detail view
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  
  // Filter states
  const [selectedTypes, setSelectedTypes] = useState<ActivityType[]>([]);
  const [selectedAmbiences, setSelectedAmbiences] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationType | null>(null);

  // Fetch activities from Supabase
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('activities')
          .select('*');

        if (error) throw error;
        setActivities(data || []);
        setFilteredActivities(data || []);
      } catch (err) {
        console.error('Error fetching activities:', err);
        setError(t('experiences.noResults'));
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [t]);

  // Apply filters when filter states change
  useEffect(() => {
    let result = [...activities];
    
    // Filter by type
    if (selectedTypes.length > 0) {
      result = result.filter(activity => selectedTypes.includes(activity.type as ActivityType));
    }
    
    // Filter by ambience
    if (selectedAmbiences.length > 0) {
      result = result.filter(activity => 
        activity.ambiences.some(ambience => selectedAmbiences.includes(ambience))
      );
    }
    
    // Filter by city
    if (selectedCity) {
      result = result.filter(activity => activity.city === selectedCity);
    }
    
    // Filter by duration
    if (selectedDuration) {
      result = result.filter(activity => activity.duration === selectedDuration);
    }
    
    setFilteredActivities(result);
  }, [activities, selectedTypes, selectedAmbiences, selectedCity, selectedDuration]);

  // Reset all filters
  const handleResetFilters = () => {
    setSelectedTypes([]);
    setSelectedAmbiences([]);
    setSelectedCity(null);
    setSelectedDuration(null);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">{t('experiences.title')}</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters sidebar */}
        <div className="w-full md:w-1/4">
          <ExperienceFilters
            selectedTypes={selectedTypes}
            setSelectedTypes={setSelectedTypes}
            selectedAmbiences={selectedAmbiences}
            setSelectedAmbiences={setSelectedAmbiences}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            selectedDuration={selectedDuration}
            setSelectedDuration={setSelectedDuration}
            onReset={handleResetFilters}
          />
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="border rounded-lg overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>{t('filters.reset')}</Button>
            </div>
          ) : filteredActivities.length === 0 ? (
            <div className="text-center py-10">
              <p className="mb-4">{t('experiences.noResults')}</p>
              <Button onClick={handleResetFilters}>{t('filters.reset')}</Button>
            </div>
          ) : (
            <>
              <p className="mb-4">{t('experiences.resultsFound', { count: filteredActivities.length })}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredActivities.map((activity) => (
                  <ExperienceCard 
                    key={activity.id} 
                    activity={activity} 
                    onClick={() => setSelectedActivity(activity)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      
      {/* Activity Detail Dialog */}
      <Dialog open={!!selectedActivity} onOpenChange={(open) => !open && setSelectedActivity(null)}>
        {selectedActivity && (
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedActivity.name}</DialogTitle>
              <DialogDescription>
                {selectedActivity.city} • {t(`experiences.types.${selectedActivity.type}`)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="mt-4">
              {/* Image */}
              <div className="rounded-lg overflow-hidden mb-4 h-64">
                <img 
                  src={selectedActivity.images[0] || '/placeholder.svg'} 
                  alt={selectedActivity.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">{t('experiences.description')}</h3>
                  <p>{selectedActivity.long_description || selectedActivity.description}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedActivity.ambiences.map(ambience => (
                    <Badge key={ambience}>
                      {t(`experiences.ambiences.${ambience}`)}
                    </Badge>
                  ))}
                </div>
                
                {selectedActivity.itinerary && (
                  <div>
                    <h3 className="font-medium">{t('experiences.itinerary')}</h3>
                    <ul className="list-disc pl-5 mt-2">
                      {selectedActivity.itinerary.stops?.map((stop, index) => (
                        <li key={index}>{stop}</li>
                      ))}
                      {selectedActivity.itinerary.days?.map((day, index) => (
                        <li key={index}>{day}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {(selectedActivity.inclusions?.length || selectedActivity.exclusions?.length) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedActivity.inclusions?.length ? (
                      <div>
                        <h3 className="font-medium">{t('experiences.inclusions')}</h3>
                        <ul className="list-disc pl-5 mt-2">
                          {selectedActivity.inclusions.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    
                    {selectedActivity.exclusions?.length ? (
                      <div>
                        <h3 className="font-medium">{t('experiences.exclusions')}</h3>
                        <ul className="list-disc pl-5 mt-2">
                          {selectedActivity.exclusions.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                )}
                
                <div className="flex justify-between items-center pt-4">
                  <div>
                    <span className="font-bold text-xl">
                      {selectedActivity.price > 0 ? `${selectedActivity.price} €` : t('experiences.free')}
                    </span>
                    <span className="text-sm text-gray-500 ml-2">
                      / {t(`experiences.duration.${selectedActivity.duration}`)}
                    </span>
                  </div>
                  
                  <Button onClick={() => window.open(selectedActivity.booking_url, '_blank')}>
                    {t('experiences.book')}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  );
};

export default ExperiencesPage;
