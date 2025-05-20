import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Favorite, HistoryItem } from '@/types/user';

// Combined component for Profile, Favorites and History pages
const ProfilePages: React.FC = () => {
  const { t } = useTranslation();
  const { user, profile, updateProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    if (profile) {
      setUsername(profile.username || '');
      setFullName(profile.full_name || '');
    }
  }, [profile]);

  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchHistory();
    }
  }, [user]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const fetchHistory = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await updateProfile({
        username,
        full_name: fullName,
      });

      toast({
        title: t('profile.updateSuccess'),
        description: t('profile.profileUpdated'),
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: t('profile.updateError'),
        description: t('profile.updateFailed'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;
      
      // Update local state
      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      
      toast({
        title: t('favorites.removeSuccess'),
        description: t('favorites.itemRemoved'),
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: t('favorites.removeError'),
        description: t('favorites.removeFailed'),
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('profile.loginRequired')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{t('profile.pleaseLogin')}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">{t('profile.profile')}</TabsTrigger>
          <TabsTrigger value="favorites">{t('profile.favorites')}</TabsTrigger>
          <TabsTrigger value="history">{t('profile.history')}</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.profileSettings')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={profile?.avatar_url || ''} />
                  <AvatarFallback className="text-2xl">
                    {profile?.username?.substring(0, 2).toUpperCase() || user.email?.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input id="email" value={user.email} disabled />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="username">{t('auth.username')}</Label>
                <Input 
                  id="username" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fullName">{t('profile.fullName')}</Label>
                <Input 
                  id="fullName" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                />
              </div>
              
              <Button 
                onClick={handleProfileUpdate} 
                disabled={loading}
                className="w-full"
              >
                {loading ? t('profile.updating') : t('profile.updateProfile')}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Favorites Tab */}
        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.yourFavorites')}</CardTitle>
            </CardHeader>
            <CardContent>
              {favorites.length === 0 ? (
                <p className="text-center py-4">{t('favorites.noFavorites')}</p>
              ) : (
                <div className="space-y-4">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="flex justify-between items-center p-4 border rounded-md">
                      <div>
                        <p className="font-medium">
                          {favorite.item_type === 'establishment' ? t('favorites.establishment') : t('favorites.activity')}: {favorite.item_id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(favorite.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeFavorite(favorite.id)}
                      >
                        {t('favorites.remove')}
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* History Tab */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>{t('profile.yourHistory')}</CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-center py-4">{t('history.noHistory')}</p>
              ) : (
                <div className="space-y-4">
                  {history.map((item) => (
                    <div key={item.id} className="p-4 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">
                            {item.item_type === 'establishment' ? t('history.establishment') : t('history.activity')}: {item.item_id}
                          </p>
                          <p className="text-sm">
                            {t(`history.actions.${item.action}`)}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePages;
