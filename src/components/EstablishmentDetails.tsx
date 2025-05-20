import React from 'react';
import { useTranslation } from 'react-i18next';
import { Establishment } from '@/types';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Badge } from './ui/badge';
import { getEstablishmentImage } from '@/utils/imageUtils';

interface EstablishmentDetailsProps {
  establishment: Establishment;
  onClose: () => void;
  onReserve: (establishment: Establishment) => void;
}

const EstablishmentDetails: React.FC<EstablishmentDetailsProps> = ({
  establishment,
  onClose,
  onReserve
}) => {
  const { t } = useTranslation();
  
  // Get image URL or random placeholder if none exists
  const imageUrl = getEstablishmentImage(establishment.images, establishment.type);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{establishment.name}</DialogTitle>
          <DialogDescription>
            {establishment.city} • {establishment.type === 'hotel' ? t('filters.hotels').slice(0, -1) : t('filters.restaurants').slice(0, -1)}
            {establishment.cuisine && ` • ${t(`cuisines.${establishment.cuisine}`)}`}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 md:grid-cols-2">
          <div>
            <img 
              src={imageUrl} 
              alt={establishment.name}
              className="w-full rounded-md object-cover h-64"
            />
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium">{t('establishment.description')}</h3>
              <p className="text-sm text-muted-foreground">{t(`establishment.descriptions.${establishment.id}`, { defaultValue: establishment.description })}</p>
            </div>

            <div>
              <h3 className="font-medium">{t('establishment.ambiance')}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {establishment.moods.map(mood => (
                  <Badge key={mood} variant="outline">{t(`moods.${mood.toLowerCase()}`)}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium">{t('filters.services')}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {establishment.services.map(service => (
                  <Badge key={service} variant="secondary">
                    {t(`services.${service}`)}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium">{t('establishment.priceRange')}</h3>
              <p className="text-sm text-muted-foreground">
                {establishment.priceRange ? t(`priceRanges.${establishment.priceRange}`) : t('establishment.notSpecified')}
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

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t('establishment.close')}</Button>
          <Button onClick={() => onReserve(establishment)}>{t('establishment.reserve')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EstablishmentDetails;
