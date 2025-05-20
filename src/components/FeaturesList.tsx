import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface Feature {
  titleKey: string;
  descriptionKey: string;
  icon: string;
}

const features: Feature[] = [
  {
    titleKey: "features.moodSearch.title",
    descriptionKey: "features.moodSearch.description",
    icon: "🔍"
  },
  {
    titleKey: "features.multipleFilters.title",
    descriptionKey: "features.multipleFilters.description",
    icon: "🔢"
  },
  {
    titleKey: "features.detailedView.title",
    descriptionKey: "features.detailedView.description",
    icon: "👁️"
  },
  {
    titleKey: "features.easyBooking.title",
    descriptionKey: "features.easyBooking.description",
    icon: "📅"
  },
  {
    titleKey: "features.responsiveInterface.title",
    descriptionKey: "features.responsiveInterface.description",
    icon: "📱"
  },
  {
    titleKey: "features.notifications.title",
    descriptionKey: "features.notifications.description",
    icon: "🔔"
  }
];

const FeaturesList: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">{t('features.title')}</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{feature.icon}</span>
                <span>{t(feature.titleKey)}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t(feature.descriptionKey)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FeaturesList;