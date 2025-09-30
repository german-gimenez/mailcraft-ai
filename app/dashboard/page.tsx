'use client';

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { OnboardingFlow } from "@/components/onboarding/OnboardingFlow";
import { EmptyDashboard } from "@/components/dashboard/EmptyDashboard";
import { useUserProfile } from "@/lib/hooks/useUserProfile";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const userProfile = useUserProfile();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push("/sign-in");
    return null;
  }

  if (userProfile.isNewUser && !userProfile.hasCompletedOnboarding) {
    return (
      <OnboardingFlow
        onComplete={() => {
          // Refresh page after onboarding
          window.location.reload();
        }}
      />
    );
  }

  const handleCreateCampaign = () => {
    router.push("/dashboard/campaigns");
  };

  const handleImportContacts = () => {
    router.push("/dashboard/contacts");
  };

  const hasCampaigns = userProfile.totalCampaigns > 0;
  const hasContacts = userProfile.totalContacts > 0;
  const isEmpty = !hasCampaigns && !hasContacts;

  if (isEmpty) {
    return (
      <EmptyDashboard 
        onCreateCampaign={handleCreateCampaign}
        onImportContacts={handleImportContacts}
      />
    );
  }

  return (
    <DashboardLayout
      title="Dashboard"
      subtitle="Bienvenido a MailCraft AI"
    >
      <div className="space-y-6">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Panel de Control</h2>
          <p className="text-gray-700">Tu dashboard está funcionando correctamente.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
