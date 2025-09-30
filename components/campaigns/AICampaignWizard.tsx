"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Brain,
  Target,
  Wand2,
  ArrowRight,
  ArrowLeft,
  TrendingUp,
  Mail,
  Eye,
  MousePointer,
  DollarSign,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface CampaignIdea {
  subject: string;
  previewText: string;
  content: string;
  purpose: string;
  tone: string;
  cta: string;
  estimatedOpenRate: number;
  estimatedClickRate: number;
  reasoning: string;
}

interface AIInsights {
  openRateScore: number;
  clickRateScore: number;
  conversionScore: number;
  revenueEstimate: number;
  optimizations: string[];
  bestSendTime: string;
  confidence: number;
}

interface AICampaignWizardProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (campaign: any) => void;
}

export function AICampaignWizard({
  isOpen,
  onClose,
  onComplete,
}: AICampaignWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [campaignIdeas, setCampaignIdeas] = useState<CampaignIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<CampaignIdea | null>(null);
  const [htmlContent, setHtmlContent] = useState("");
  const [insights, setInsights] = useState<AIInsights | null>(null);

  // Form data
  const [formData, setFormData] = useState({
    purpose: "",
    industry: "",
    targetAudience: "",
    companyName: "",
    productName: "",
    brandTone: "profesional",
  });

  const totalSteps = 4;

  if (!isOpen) return null;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const generateCampaignIdeas = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/campaigns/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          purpose: formData.purpose,
          industry: formData.industry,
          targetAudience: formData.targetAudience,
          brandInfo: {
            companyName: formData.companyName,
            tone: formData.brandTone,
          },
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCampaignIdeas(data.ideas);
        handleNext();
      }
    } catch (error) {
      console.error("Error generating ideas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateHTML = async (idea: CampaignIdea) => {
    setIsLoading(true);
    setSelectedIdea(idea);

    try {
      const response = await fetch("/api/ai/campaigns/generate-html", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignIdea: idea,
          companyName: formData.companyName,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setHtmlContent(data.html);

        // Generar insights
        const insightsResponse = await fetch("/api/ai/campaigns/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            subject: idea.subject,
            content: data.html,
            targetAudience: formData.targetAudience,
            industry: formData.industry,
          }),
        });

        const insightsData = await insightsResponse.json();
        if (insightsData.success) {
          setInsights(insightsData.insights);
        }

        handleNext();
      }
    } catch (error) {
      console.error("Error generating HTML:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleComplete = () => {
    const campaignData = {
      name: `${formData.purpose} - ${formData.industry}`,
      subject: selectedIdea?.subject,
      htmlContent,
      insights,
      formData,
      selectedIdea,
    };
    onComplete(campaignData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Asistente de Campaña IA</h2>
                <p className="text-purple-100">
                  Crea campañas mágicas en minutos
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-sm text-purple-100 mb-2">
              <span>
                Paso {currentStep} de {totalSteps}
              </span>
              <span>
                {Math.round((currentStep / totalSteps) * 100)}% completo
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Paso 1: Información Básica */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Cuéntanos sobre tu campaña
                </h3>
                <p className="text-gray-600">
                  La IA necesita conocer tu objetivo para crear la campaña
                  perfecta
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cuál es el objetivo de tu campaña? *
                  </label>
                  <select
                    value={formData.purpose}
                    onChange={(e) =>
                      setFormData({ ...formData, purpose: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Selecciona un objetivo</option>
                    <option value="Generar ventas">Generar ventas</option>
                    <option value="Promocionar producto">
                      Promocionar producto
                    </option>
                    <option value="Newsletter">Newsletter</option>
                    <option value="Lanzamiento">Lanzamiento</option>
                    <option value="Reactivar clientes">
                      Reactivar clientes
                    </option>
                    <option value="Black Friday">Black Friday</option>
                    <option value="Webinar">Webinar</option>
                    <option value="Educativo">Educativo</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿En qué industria trabajas? *
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) =>
                      setFormData({ ...formData, industry: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="">Selecciona tu industria</option>
                    <option value="E-commerce">E-commerce</option>
                    <option value="SaaS">SaaS / Software</option>
                    <option value="Educación">Educación</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Salud">Salud</option>
                    <option value="Finanzas">Finanzas</option>
                    <option value="Inmobiliaria">Inmobiliaria</option>
                    <option value="Turismo">Turismo</option>
                    <option value="Retail">Retail</option>
                    <option value="Servicios">Servicios</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Quién es tu audiencia objetivo? *
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        targetAudience: e.target.value,
                      })
                    }
                    placeholder="Ej: Empresarios de 30-45 años, dueños de PyMEs"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre de tu empresa
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    placeholder="Tu empresa"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Producto/Servicio
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) =>
                      setFormData({ ...formData, productName: e.target.value })
                    }
                    placeholder="¿Qué vendes?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tono de comunicación
                  </label>
                  <select
                    value={formData.brandTone}
                    onChange={(e) =>
                      setFormData({ ...formData, brandTone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="profesional">Profesional</option>
                    <option value="amigable">Amigable</option>
                    <option value="casual">Casual</option>
                    <option value="formal">Formal</option>
                    <option value="divertido">Divertido</option>
                    <option value="urgente">Urgente</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Paso 2: Ideas Generadas */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  IA generó estas ideas para ti
                </h3>
                <p className="text-gray-600">
                  Selecciona la que más te guste para continuar
                </p>
              </div>

              <div className="grid gap-6">
                {campaignIdeas.map((idea, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-6 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer"
                    onClick={() => generateHTML(idea)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-gray-900">
                            Opción {index + 1}
                          </span>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {idea.tone}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">
                          📧 {idea.subject}
                        </h4>
                        <p className="text-gray-600 text-sm mb-3">
                          {idea.previewText}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 ml-4" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-green-600" />
                        <span className="text-sm text-gray-700">
                          ~{idea.estimatedOpenRate}% apertura
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="text-sm text-gray-700">
                          ~{idea.estimatedClickRate}% clicks
                        </span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-700">
                        <strong>CTA:</strong> {idea.cta}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Por qué funcionará:</strong> {idea.reasoning}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {isLoading && (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Generando tu email mágico...</p>
                </div>
              )}
            </div>
          )}

          {/* Paso 3: Preview y Análisis */}
          {currentStep === 3 && selectedIdea && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  ¡Tu campaña está lista!
                </h3>
                <p className="text-gray-600">
                  Revisa el análisis predictivo y el preview
                </p>
              </div>

              {/* Insights IA */}
              {insights && (
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
                  <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Análisis Predictivo IA
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        {insights.openRateScore}%
                      </div>
                      <div className="text-sm text-gray-600">Open Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {insights.clickRateScore}%
                      </div>
                      <div className="text-sm text-gray-600">Click Rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {insights.conversionScore}%
                      </div>
                      <div className="text-sm text-gray-600">Conversión</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600">
                        ${insights.revenueEstimate}
                      </div>
                      <div className="text-sm text-gray-600">Revenue/Email</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        🕐 Mejor momento para enviar:
                      </h5>
                      <p className="text-gray-700">{insights.bestSendTime}</p>
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-900 mb-2">
                        🎯 Confianza IA:
                      </h5>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full"
                            style={{ width: `${insights.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">
                          {insights.confidence}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {insights.optimizations.length > 0 && (
                    <div className="mt-4">
                      <h5 className="font-semibold text-gray-900 mb-2">
                        💡 Optimizaciones sugeridas:
                      </h5>
                      <ul className="space-y-1">
                        {insights.optimizations.map((opt, index) => (
                          <li
                            key={index}
                            className="text-sm text-gray-700 flex items-center gap-2"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-600 rounded-full"></div>
                            {opt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Preview del Email */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-900">
                    Preview del Email
                  </h4>
                </div>
                <div className="p-4">
                  <div className="bg-white border border-gray-200 rounded-lg p-4 max-h-96 overflow-y-auto">
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Paso 4: Finalización */}
          {currentStep === 4 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                ¡Campaña creada exitosamente!
              </h3>
              <p className="text-gray-600">
                Tu campaña ha sido optimizada con IA y está lista para enviar
              </p>

              <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <h4 className="font-semibold text-green-900 mb-2">
                  ¿Qué sigue?
                </h4>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>✅ Selecciona tu lista de contactos</li>
                  <li>✅ Programa el envío para el momento óptimo</li>
                  <li>✅ Monitorea los resultados en tiempo real</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isLoading}
                  className="rounded-lg"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
              )}
            </div>

            <div className="flex gap-3">
              {currentStep === 1 && (
                <Button
                  onClick={generateCampaignIdeas}
                  disabled={
                    !formData.purpose ||
                    !formData.industry ||
                    !formData.targetAudience ||
                    isLoading
                  }
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg px-8"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generando...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 mr-2" />
                      Generar con IA
                    </>
                  )}
                </Button>
              )}

              {currentStep === 3 && (
                <Button
                  onClick={handleNext}
                  className="bg-green-600 hover:bg-green-700 rounded-lg px-8"
                >
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Crear Campaña
                </Button>
              )}

              {currentStep === 4 && (
                <Button
                  onClick={handleComplete}
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg px-8"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Finalizar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
