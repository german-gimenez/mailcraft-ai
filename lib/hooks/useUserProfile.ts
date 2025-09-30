'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

interface UserProfile {
  isNewUser: boolean;
  hasCompletedOnboarding: boolean;
  createdAt: Date | null;
  totalCampaigns: number;
  totalContacts: number;
}

export function useUserProfile(): UserProfile {
  const { user, isLoaded } = useUser();
  const [profile, setProfile] = useState<UserProfile>({
    isNewUser: true,
    hasCompletedOnboarding: false,
    createdAt: null,
    totalCampaigns: 0,
    totalContacts: 0,
  });

  useEffect(() => {
    if (!isLoaded || !user) return;

    // Verificar si es un usuario nuevo (creado en los últimos 5 minutos)
    const createdAt = user.createdAt;
    const now = new Date();
    const timeDiff = now.getTime() - createdAt.getTime();
    const minutesDiff = timeDiff / (1000 * 60);
    const isNewUser = minutesDiff <= 5;

    // Verificar si ha completado onboarding (stored in user metadata)
    const hasCompletedOnboarding = user.unsafeMetadata?.completedOnboarding === true;

    // Simular datos de campañas y contactos basados en metadata del usuario
    const totalCampaigns = (user.unsafeMetadata?.totalCampaigns as number) || 0;
    const totalContacts = (user.unsafeMetadata?.totalContacts as number) || 0;

    setProfile({
      isNewUser,
      hasCompletedOnboarding,
      createdAt,
      totalCampaigns,
      totalContacts,
    });
  }, [user, isLoaded]);

  return profile;
}

// Hook para actualizar el perfil del usuario
export function useUpdateUserProfile() {
  const { user } = useUser();

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    try {
      await user.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          ...updates,
        },
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const markOnboardingComplete = () => {
    updateProfile({ hasCompletedOnboarding: true });
  };

  const incrementCampaigns = () => {
    const current = (user?.unsafeMetadata?.totalCampaigns as number) || 0;
    updateProfile({ totalCampaigns: current + 1 });
  };

  const incrementContacts = (count: number = 1) => {
    const current = (user?.unsafeMetadata?.totalContacts as number) || 0;
    updateProfile({ totalContacts: current + count });
  };

  return {
    updateProfile,
    markOnboardingComplete,
    incrementCampaigns,
    incrementContacts,
  };
}