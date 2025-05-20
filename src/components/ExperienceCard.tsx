import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Activity } from '@/types/activities';

interface ExperienceCardProps {
  activity: Activity;
  onClick?: () => void;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ activity, onClick }) => {
  const { t } = useTranslation();
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={activity.images[0] || '/placeholder.svg'} 
          alt={activity.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
        <Badge className="absolute top-2 right-2" variant="secondary">
          {t(`experiences.types.${activity.type}`)}
        </Badge>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{activity.name}</h3>
          <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium">
            {activity.price > 0 ? `${activity.price} €` : t('experiences.free')}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{activity.description}</p>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {activity.ambiences.map((ambience) => (
            <Badge key={ambience} variant="outline" className="text-xs">
              {t(`experiences.ambiences.${ambience}`)}
            </Badge>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <span className="text-yellow-500">★</span>
              <span className="text-sm ml-1">{activity.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500">{t(`experiences.duration.${activity.duration}`)}</span>
          </div>
          <Button size="sm" onClick={onClick}>
            {t('experiences.viewDetails')}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ExperienceCard;
