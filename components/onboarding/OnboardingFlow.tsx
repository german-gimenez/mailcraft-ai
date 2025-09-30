'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Mail, 
  Users, 
  BarChart3, 
  ArrowRight, 
  CheckCircle,
  Rocket
} from 'lucide-react';
import { useUpdateUserProfile } from '@/lib/hooks/useUserProfile';

interface OnboardingFlowProps {
  onComplete: () => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const { markOnboardingComplete } = useUpdateUserProfile();

  const steps = [
    {
      icon: Rocket,
      title: "¡Bienvenido a MailCraft AI!",
      description: "Tu plataforma de email marketing potenciada con inteligencia artificial.",
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
            <Rocket className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-gray-600">
            Estás a punto de descubrir cómo la IA puede revolucionar tus campañas de email marketing.
          </p>
        </div>
      )
    },
    {
      icon: Sparkles,
      title: "Potencia de la IA",
      description: "Genera campañas, optimiza contenido y predice resultados automáticamente.",
      content: (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Mail className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Generación Automática</h4>
            <p className="text-sm text-gray-600">Crea campañas completas con IA</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Predicciones</h4>
            <p className="text-sm text-gray-600">Conoce el rendimiento antes de enviar</p>
          </div>
          <div className="text-center p-4 border border-gray-200 rounded-lg">
            <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <h4 className="font-semibold text-gray-900">Segmentación</h4>
            <p className="text-sm text-gray-600">Audiencias inteligentes y personalizadas</p>
          </div>
        </div>
      )
    },
    {
      icon: CheckCircle,
      title: "¡Todo listo!",
      description: "Tu dashboard está preparado. Comienza creando tu primera campaña.",
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-gradient-to-r from-green-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="space-y-2">
            <p className="text-gray-600">
              Tu cuenta está configurada y lista para usar.
            </p>
            <p className="text-sm text-gray-500">
              Puedes acceder a todas las herramientas desde el menú lateral.
            </p>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await markOnboardingComplete();
    onComplete();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
            <span>Paso {currentStep + 1} de {steps.length}</span>
            <span>{Math.round(((currentStep + 1) / steps.length) * 100)}% completado</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <currentStepData.icon className="w-8 h-8 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {currentStepData.title}
          </h1>
          <p className="text-gray-600 mb-6">
            {currentStepData.description}
          </p>
        </div>

        {/* Step Specific Content */}
        <div className="mb-8">
          {currentStepData.content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Anterior
          </Button>
          
          <Button
            onClick={handleNext}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {currentStep === steps.length - 1 ? (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Comenzar
              </>
            ) : (
              <>
                Siguiente
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}