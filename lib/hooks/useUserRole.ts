import { useUser } from "@clerk/nextjs";
import { useMemo } from "react";

export type UserRole = 'super_admin' | 'admin' | 'user';

export interface UserPermissions {
  canManageOrganizations: boolean;
  canManageUsers: boolean;
  canViewBilling: boolean;
  canManageLanguages: boolean;
  canAccessAnalytics: boolean;
  canManageAPICredentials: boolean;
  canViewAllCampaigns: boolean;
  canManageIntegrations: boolean;
  canManageSystem: boolean;
}

const SUPER_ADMIN_EMAILS = [
  'germman@napsix.com',
  'admin@mailcraft.ai'
];

export function useUserRole(): UserRole {
  const { user } = useUser();
  
  if (!user) return 'user';
  
  const email = user.emailAddresses?.[0]?.emailAddress;
  
  // Super Admin check
  if (email && SUPER_ADMIN_EMAILS.includes(email.toLowerCase())) {
    return 'super_admin';
  }
  
  // Admin check (from user metadata)
  const isAdmin = user.unsafeMetadata?.role === 'admin';
  if (isAdmin) {
    return 'admin';
  }
  
  return 'user';
}

export function usePermissions(): UserPermissions {
  const role = useUserRole();
  
  return useMemo(() => {
    switch (role) {
      case 'super_admin':
        return {
          canManageOrganizations: true,
          canManageUsers: true,
          canViewBilling: true,
          canManageLanguages: true,
          canAccessAnalytics: true,
          canManageAPICredentials: true,
          canViewAllCampaigns: true,
          canManageIntegrations: true,
          canManageSystem: true,
        };
      
      case 'admin':
        return {
          canManageOrganizations: true,
          canManageUsers: true,
          canViewBilling: true,
          canManageLanguages: false,
          canAccessAnalytics: true,
          canManageAPICredentials: true,
          canViewAllCampaigns: true,
          canManageIntegrations: true,
          canManageSystem: false,
        };
      
      default: // 'user'
        return {
          canManageOrganizations: false,
          canManageUsers: false,
          canViewBilling: false,
          canManageLanguages: false,
          canAccessAnalytics: false,
          canManageAPICredentials: false,
          canViewAllCampaigns: false,
          canManageIntegrations: false,
          canManageSystem: false,
        };
    }
  }, [role]);
}

export function useIsRole(targetRole: UserRole): boolean {
  const currentRole = useUserRole();
  return currentRole === targetRole;
}

export function useIsSuperAdmin(): boolean {
  return useIsRole('super_admin');
}