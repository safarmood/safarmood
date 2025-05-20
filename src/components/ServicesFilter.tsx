import React from 'react';
import { useTranslation } from 'react-i18next';
import { ServiceType } from '@/types';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface ServicesFilterProps {
  selectedServices: ServiceType[];
  setSelectedServices: (services: ServiceType[]) => void;
}

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

const ServicesFilter: React.FC<ServicesFilterProps> = ({
  selectedServices,
  setSelectedServices
}) => {
  const { t } = useTranslation();
  
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

export default ServicesFilter;
