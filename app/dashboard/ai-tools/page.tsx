import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { AIToolsContent } from "@/components/ai-tools/AIToolsContent";

export default function AIToolsPage() {
  return (
    <DashboardLayout
      title="AI Tools"
      subtitle="Herramientas de inteligencia artificial para marketing"
      userRole="super_admin"
      currentOrg={{
        id: "1",
        name: "MailCraft AI",
        plan: "Scale",
        creditsUsed: 8934,
        creditsTotal: 250000,
      }}
    >
      <AIToolsContent />
    </DashboardLayout>
  );
}
