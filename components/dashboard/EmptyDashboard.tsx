'use client';

import { Button } from '@/components/ui/button';
import { 
  Sparkles, 
  Mail, 
  Users, 
  BarChart3, 
  Plus,
  ArrowRight,
  Target,
  Zap
} from 'lucide-react';

interface EmptyDashboardProps {
  onCreateCampaign: () => void;
  onImportContacts: () => void;
}

export function EmptyDashboard({ onCreateCampaign, onImportContacts }: EmptyDashboardProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Sparkles className="w-12 h-12 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          ¡Bienvenido a MailCraft AI!
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Tu journey de email marketing comienza aquí. Vamos a crear tu primera campaña con el poder de la inteligencia artificial.
        </p>
        <Button 
          onClick={onCreateCampaign}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
        >
          <Zap className="w-5 h-5 mr-2" />
          Crear mi Primera Campaña
        </Button>
      </div>

      {/* Quick Start Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group" onClick={onCreateCampaign}>
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
            <Mail className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Crear Campaña</h3>
          <p className="text-gray-600 mb-4">
            Usa nuestra IA para generar campañas de email personalizadas en minutos.
          </p>
          <div className="flex items-center text-purple-600 font-medium">
            <span>Comenzar</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group" onClick={onImportContacts}>
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Importar Contactos</h3>
          <p className="text-gray-600 mb-4">
            Sube tu lista de contactos o conecta con tus herramientas favoritas.
          </p>
          <div className="flex items-center text-blue-600 font-medium">
            <span>Importar</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
            <Target className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Explorar AI Tools</h3>
          <p className="text-gray-600 mb-4">
            Descubre todas las herramientas de IA disponibles para optimizar tus campañas.
          </p>
          <div className="flex items-center text-green-600 font-medium">
            <span>Explorar</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>

      {/* Empty State Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-gray-600">Campañas Enviadas</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Users className="w-6 h-6 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">0</div>
          <div className="text-sm text-gray-600">Contactos</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="w-6 h-6 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">-</div>
          <div className="text-sm text-gray-600">Tasa de Apertura</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 text-gray-400" />
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">50,000</div>
          <div className="text-sm text-gray-600">Créditos Disponibles</div>
        </div>
      </div>

      {/* Getting Started Tips */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Sparkles className="w-5 h-5 text-purple-600 mr-2" />
          Tips para Empezar
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700">
              <strong>Define tu audiencia:</strong> Importa tus contactos y segméntalos por intereses.
            </span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700">
              <strong>Usa la IA:</strong> Deja que nuestro AI Campaign Wizard genere contenido optimizado.
            </span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700">
              <strong>Testea y optimiza:</strong> Utiliza A/B testing para mejorar tus resultados.
            </span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="text-gray-700">
              <strong>Monitorea métricas:</strong> Revisa analytics en tiempo real para optimizar.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}