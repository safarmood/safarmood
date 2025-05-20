import React from 'react';
import { useTranslation } from 'react-i18next';
import { Establishment } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getEstablishmentImage } from '@/utils/imageUtils';

interface EstablishmentCardProps {
  establishment: Establishment;
  onViewDetails: (establishment: Establishment) => void;
}

const EstablishmentCard: React.FC<EstablishmentCardProps> = ({ establishment, onViewDetails }) => {
  const { t } = useTranslation();
  const { id, name, type, description, city, moods, rating, images } = establishment;

  // Get image URL or random placeholder if none exists
  const imageUrl = getEstablishmentImage(images, type);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video w-full overflow-hidden bg-muted">
        <div 
          className="h-full w-full bg-cover bg-center" 
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">{name}</CardTitle>
          <span className="flex items-center text-yellow-500">
            ⭐ {rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <span className="capitalize">{type}</span>
          <span className="mx-2">•</span>
          <span>{city}</span>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <CardDescription className="line-clamp-2">
          {t(`establishment.descriptions.${id}`, { defaultValue: description })}
        </CardDescription>
        <div className="mt-3 flex flex-wrap gap-1">
          {moods.map((mood) => (
            <span 
              key={mood} 
              className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {t(`moods.${mood.toLowerCase()}`)}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full" 
          onClick={() => onViewDetails(establishment)}
        >
          {t('establishment.viewDetails')}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EstablishmentCard;
