import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CustomEmailTemplate: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>{t('auth.emailTemplates.signup')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md p-4 mb-4 bg-white dark:bg-slate-900">
          <div className="flex items-center mb-3 border-b pb-2">
            <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center text-white font-bold mr-3">
              <span>SA</span>
            </div>
            <div>
              <div className="text-sm font-medium">Supabase Auth</div>
              <div className="text-xs text-muted-foreground">noreply@mail.app.supabase.io</div>
            </div>
            <div className="ml-auto text-xs text-muted-foreground">Mar 20/05/2025 02:33</div>
          </div>
          
          <div className="text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded mb-3 flex items-center">
            <span className="mr-2">ℹ️</span>
            <span>{t('auth.emailTemplates.spamNotice')}</span>
            <span className="ml-auto text-blue-500 text-xs border border-blue-500 rounded px-2 py-1">{t('auth.emailTemplates.legitimateMail')}</span>
          </div>
          
          <div className="py-4">
            <h2 className="text-2xl font-bold mb-3">{t('auth.emailTemplates.confirmSignup')}</h2>
            <p className="mb-3">{t('auth.emailTemplates.followLink')}</p>
            <p className="text-purple-600 dark:text-purple-400 mb-6">{t('auth.emailTemplates.confirmMail')}</p>
            
            <div className="text-sm text-muted-foreground mt-8 pt-4 border-t">
              <p>{t('auth.emailTemplates.receivingNotice')}</p>
              <p className="mt-2">{t('auth.emailTemplates.optOut')}</p>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{t('auth.emailTemplates.signupDesc')}</p>
      </CardContent>
    </Card>
  );
};

export default CustomEmailTemplate;