import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import CustomEmailTemplate from './CustomEmailTemplate';

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailPreview, setShowEmailPreview] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: t('auth.registerError'),
        description: t('auth.passwordsDoNotMatch'),
        variant: 'destructive',
      });
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, username);
      toast({
        title: t('auth.registerSuccess'),
        description: t('auth.verifyEmail'),
      });
      setShowEmailPreview(true);
    } catch (error: any) {
      console.error('Registration error:', error);
      // More specific error message based on the error
      let errorMessage = t('auth.registrationFailed');
      
      if (error.message) {
        if (error.message.includes('already registered')) {
          errorMessage = t('auth.emailAlreadyRegistered');
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: t('auth.registerError'),
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {!showEmailPreview ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="example@email.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">{t('auth.username')}</Label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder={t('auth.usernamePlaceholder')}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">{t('auth.password')}</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? t('auth.registering') : t('auth.register')}
          </Button>
        </form>
      ) : (
        <CustomEmailTemplate />
      )}
    </div>
  );
};

export default RegisterForm;