import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FeaturesList from './FeaturesList';
import ActionsList from './ActionsList';
import { useTranslation } from 'react-i18next';

const AppDocumentation: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">{t('common.documentation')} SafarMood</h1>
      
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="features">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="features">{t('features.title')}</TabsTrigger>
            <TabsTrigger value="actions">{t('actions.title')}</TabsTrigger>
          </TabsList>
          <TabsContent value="features" className="mt-6">
            <FeaturesList />
          </TabsContent>
          <TabsContent value="actions" className="mt-6">
            <ActionsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AppDocumentation;