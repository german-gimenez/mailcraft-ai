"use client";

import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
// import { AICampaignWizard } from "@/components/campaigns/AICampaignWizard";
import { useState } from "react";
import {
  Plus,
  Send,
  Eye,
  BarChart3,
  Calendar,
  Users,
  Sparkles,
  TrendingUp,
  Clock,
  Target,
  Mail,
  ArrowRight,
  Brain,
  Wand2,
} from "lucide-react";

interface Campaign {
  id: string;
  name: string;
  subject: string;
  status: "draft" | "scheduled" | "sending" | "sent";
  recipients: number;
  opens: number;
  clicks: number;
  aiScore?: number;
  createdAt: string;
  sentAt?: string;
}

export default function CampaignsPage() {
  const [campaigns] = useState<Campaign[]>([
    {
      id: "1",
      name: "Black Friday Mega Sale",
      subject: "🔥 70% OFF Everything - Last 24 Hours!",
      status: "sent",
      recipients: 5420,
      opens: 2890,
      clicks: 867,
      aiScore: 94,
      createdAt: "2024-11-29",
      sentAt: "2024-11-29",
    },
    {
      id: "2",
      name: "AI-Generated Welcome Series",
      subject: "Welcome to the future of marketing! ✨",
      status: "sent",
      recipients: 3200,
      opens: 2240,
      clicks: 672,
      aiScore: 89,
      createdAt: "2024-11-25",
      sentAt: "2024-11-26",
    },
    {
      id: "3",
      name: "Product Launch - AI Assistant",
      subject: "Meet your new AI marketing assistant 🤖",
      status: "scheduled",
      recipients: 4800,
      opens: 0,
      clicks: 0,
      aiScore: 92,
      createdAt: "2024-11-30",
    },
  ]);

  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "text-green-600 bg-green-50 border-green-200";
      case "sending":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "scheduled":
        return "text-orange-600 bg-orange-50 border-orange-200";
      case "draft":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Send className="w-4 h-4" />;
      case "sending":
        return <Clock className="w-4 h-4" />;
      case "scheduled":
        return <Calendar className="w-4 h-4" />;
      case "draft":
        return <Eye className="w-4 h-4" />;
      default:
        return <Mail className="w-4 h-4" />;
    }
  };

  const calculateRate = (numerator: number, denominator: number) => {
    return denominator > 0
      ? ((numerator / denominator) * 100).toFixed(1)
      : "0.0";
  };

  // Stats totales
  const totalSent = campaigns.reduce(
    (sum, c) => sum + (c.status === "sent" ? c.recipients : 0),
    0
  );
  const totalOpens = campaigns.reduce((sum, c) => sum + c.opens, 0);
  const totalClicks = campaigns.reduce((sum, c) => sum + c.clicks, 0);
  const avgAIScore = campaigns
    .filter((c) => c.aiScore)
    .reduce((sum, c, _, arr) => sum + (c.aiScore || 0) / arr.length, 0);

  return (
    <DashboardLayout
      title="AI Campaigns"
      subtitle="Create magical campaigns that convert with advanced AI"
      userRole="admin"
    >
      <div className="space-y-8">
        {/* Header con gradiente y stats */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 p-8 text-white">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                  <Sparkles className="w-10 h-10 text-yellow-300" />
                  AI Campaigns
                </h1>
                <p className="text-xl text-purple-100">
                  Crea campañas mágicas que convierten con IA avanzada
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => setIsCreatingCampaign(true)}
                  className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 hover:scale-105"
                >
                  <Wand2 className="w-6 h-6 mr-2" />
                  Crear con IA
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 px-6 py-4 rounded-xl"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Tradicional
                </Button>
              </div>
            </div>

            {/* Stats rápidas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-200 text-sm mb-1">
                  <Send className="w-4 h-4" />
                  Emails Enviados
                </div>
                <div className="text-2xl font-bold">
                  {totalSent.toLocaleString()}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-200 text-sm mb-1">
                  <Eye className="w-4 h-4" />
                  Tasa de Apertura
                </div>
                <div className="text-2xl font-bold">
                  {calculateRate(totalOpens, totalSent)}%
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-200 text-sm mb-1">
                  <Target className="w-4 h-4" />
                  Tasa de Clicks
                </div>
                <div className="text-2xl font-bold">
                  {calculateRate(totalClicks, totalSent)}%
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center gap-2 text-purple-200 text-sm mb-1">
                  <Brain className="w-4 h-4" />
                  Score IA Promedio
                </div>
                <div className="text-2xl font-bold">
                  {avgAIScore.toFixed(0)}
                </div>
              </div>
            </div>
          </div>

          {/* Decoración */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-pink-300/20 rounded-full blur-3xl"></div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => setIsCreatingCampaign(true)}
            className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-100 hover:shadow-lg transition-all duration-200 cursor-pointer group text-left"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-pink-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Template Mágico</h3>
                <p className="text-gray-600 text-sm">IA genera por ti</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Crea templates optimizados automáticamente con IA avanzada.
            </p>
            <div className="flex items-center text-pink-600 font-semibold group-hover:gap-3 transition-all duration-200">
              Crear ahora <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </button>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100 hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Análisis Predictivo</h3>
                <p className="text-gray-600 text-sm">Antes de enviar</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              Predice rendimiento y optimiza antes del envío.
            </p>
            <div className="flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all duration-200">
              Analizar <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Auto-Optimización</h3>
                <p className="text-gray-600 text-sm">Mejora continua</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">
              IA optimiza automáticamente tus campañas.
            </p>
            <div className="flex items-center text-green-600 font-semibold group-hover:gap-3 transition-all duration-200">
              Activar <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Lista de Campañas */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Mail className="w-6 h-6 text-purple-600" />
                Todas las Campañas ({campaigns.length})
              </h2>
              <div className="flex gap-3">
                <Button variant="outline" className="rounded-lg">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
                <Button variant="outline" className="rounded-lg">
                  <Calendar className="w-4 h-4 mr-2" />
                  Programar
                </Button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {campaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-6 hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {campaign.name}
                      </h3>
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                          campaign.status
                        )}`}
                      >
                        {getStatusIcon(campaign.status)}
                        {campaign.status.charAt(0).toUpperCase() +
                          campaign.status.slice(1)}
                      </span>
                      {campaign.aiScore && (
                        <div className="flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium">
                          <Brain className="w-3 h-3" />
                          AI Score: {campaign.aiScore}
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-3 truncate">
                      📧 {campaign.subject}
                    </p>
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {campaign.recipients.toLocaleString()} destinatarios
                      </div>
                      {campaign.status === "sent" && (
                        <>
                          <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {calculateRate(campaign.opens, campaign.recipients)}
                            % aperturas
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {calculateRate(
                              campaign.clicks,
                              campaign.recipients
                            )}
                            % clicks
                          </div>
                        </>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(campaign.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 ml-4">
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <Eye className="w-4 h-4 mr-1" />
                      Ver
                    </Button>
                    <Button variant="outline" size="sm" className="rounded-lg">
                      <BarChart3 className="w-4 h-4 mr-1" />
                      Stats
                    </Button>
                    {campaign.status === "draft" && (
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 rounded-lg"
                      >
                        <Send className="w-4 h-4 mr-1" />
                        Enviar
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty state si no hay campañas */}
        {campaigns.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No tienes campañas aún
            </h3>
            <p className="text-gray-600 mb-6">
              Crea tu primera campaña con IA y comienza a convertir más
              clientes.
            </p>
            <Button
              onClick={() => setIsCreatingCampaign(true)}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Crear mi primera campaña
            </Button>
          </div>
        )}

        {/* Wizard placeholder */}
        {isCreatingCampaign && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl max-w-md">
              <h3 className="text-xl font-bold mb-4">🚧 AI Campaign Wizard</h3>
              <p className="text-gray-600 mb-6">
                El asistente de campañas IA estará disponible próximamente.
                ¡Implementación en progreso!
              </p>
              <Button onClick={() => setIsCreatingCampaign(false)}>
                Cerrar
              </Button>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
