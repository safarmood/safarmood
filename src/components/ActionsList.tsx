import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface Action {
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

const actions: Action[] = [
  {
    titleKey: "actions.moodSelection.title",
    descriptionKey: "actions.moodSelection.description",
    icon: "❤️"
  },
  {
    titleKey: "actions.cityFilter.title",
    descriptionKey: "actions.cityFilter.description",
    icon: "🏙️"
  },
  {
    titleKey: "actions.establishmentType.title",
    descriptionKey: "actions.establishmentType.description",
    icon: "🏨"
  },
  {
    titleKey: "actions.cuisineSelection.title",
    descriptionKey: "actions.cuisineSelection.description",
    icon: "🍽️"
  },
  {
    titleKey: "actions.serviceFilter.title",
    descriptionKey: "actions.serviceFilter.description",
    icon: "🛎️"
  },
  {
    titleKey: "actions.priceRange.title",
    descriptionKey: "actions.priceRange.description",
    icon: "💰"
  },
  {
    titleKey: "actions.search.title",
    descriptionKey: "actions.search.description",
    icon: "🔍"
  },
  {
    titleKey: "actions.viewDetails.title",
    descriptionKey: "actions.viewDetails.description",
    icon: "ℹ️"
  },
  {
    titleKey: "actions.booking.title",
    descriptionKey: "actions.booking.description",
    icon: "📝"
  }
];

const ActionsList: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{t('actions.title')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actions.map((action, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{action.icon}</span>
                <span>{t(action.titleKey)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t(action.descriptionKey)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActionsList;