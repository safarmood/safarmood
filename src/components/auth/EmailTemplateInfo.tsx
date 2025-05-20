import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import CustomEmailTemplate from './CustomEmailTemplate';

const EmailTemplateInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{t('auth.emailTemplates.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{t('auth.emailTemplates.description')}</p>
          <div className="space-y-2">
            <h3 className="font-medium">{t('auth.emailTemplates.reset')}</h3>
            <p className="text-sm text-muted-foreground">{t('auth.emailTemplates.resetDesc')}</p>
          </div>
        </CardContent>
      </Card>
      
      <CustomEmailTemplate />
    </div>
  );
};

export default EmailTemplateInfo;