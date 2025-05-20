import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AuthModal from '@/components/auth/AuthModal';
import { User, Heart, Clock, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfileMenu: React.FC = () => {
  const { t } = useTranslation();
  const { user, profile, signOut } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getInitials = () => {
    if (profile?.username) {
      return profile.username.substring(0, 2).toUpperCase();
    }
    if (user?.email) {
      return user.email.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  if (!user) {
    return (
      <>
        <Button variant="outline" onClick={() => setIsAuthModalOpen(true)}>
          {t('common.login')}
        </Button>
        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      </>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar>
              <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || 'User'} />
              <AvatarFallback>{getInitials()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild className="flex items-center gap-2">
            <Link to="/profile"><User className="h-4 w-4" /> {t('profile.profile')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex items-center gap-2">
            <Link to="/profile"><Heart className="h-4 w-4" /> {t('profile.favorites')}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="flex items-center gap-2">
            <Link to="/profile"><Clock className="h-4 w-4" /> {t('profile.history')}</Link>
          </DropdownMenuItem>
          {profile?.role === 'admin' || profile?.role === 'super_admin' ? (
            <>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="flex items-center gap-2">
                <Link to="/admin"><User className="h-4 w-4" /> {t('admin.dashboard')}</Link>
              </DropdownMenuItem>
            </>
          ) : null}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2 text-red-500">
            <LogOut className="h-4 w-4" /> {t('profile.signOut')}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileMenu;
