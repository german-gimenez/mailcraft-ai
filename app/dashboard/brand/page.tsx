import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

export default function BrandKitPage() {
  return (
    <DashboardLayout
      title="Brand Kit"
      subtitle="Gestiona la identidad visual de tu marca"
      userRole="super_admin"
      currentOrg={{
        id: "1",
        name: "MailCraft AI",
        plan: "Scale",
        creditsUsed: 8934,
        creditsTotal: 250000,
      }}
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Brand Kit</h1>
            <p className="text-gray-600 mt-2">
              Mantén la consistencia de tu marca en todos los emails
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            Actualizar Brand Kit
          </Button>
        </div>

        {/* Brand Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Logo Principal</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-white font-bold text-xl">MC</span>
              </div>
              <p className="text-sm text-gray-600">MailCraft AI Logo</p>
            </div>
            <div className="space-y-2">
              <Button variant="outline" className="w-full">
                Subir Nuevo Logo
              </Button>
              <Button variant="outline" className="w-full">
                Descargar Logo
              </Button>
            </div>
          </div>

          {/* Colors Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Paleta de Colores</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-purple-600 rounded-lg"></div>
                <div>
                  <p className="font-medium">Primary</p>
                  <p className="text-sm text-gray-600">#7C3AED</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg"></div>
                <div>
                  <p className="font-medium">Secondary</p>
                  <p className="text-sm text-gray-600">#2563EB</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-900 rounded-lg"></div>
                <div>
                  <p className="font-medium">Text</p>
                  <p className="text-sm text-gray-600">#111827</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg border"></div>
                <div>
                  <p className="font-medium">Background</p>
                  <p className="text-sm text-gray-600">#F9FAFB</p>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Editar Colores
            </Button>
          </div>

          {/* Typography Section */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Tipografía</h3>
            <div className="space-y-4">
              <div>
                <p className="font-semibold text-2xl mb-2">Inter</p>
                <p className="text-gray-600 text-sm">
                  Fuente principal para títulos y texto
                </p>
              </div>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-3xl font-bold">Aa</span>
                  <span className="text-gray-600">Bold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-2xl font-semibold">Aa</span>
                  <span className="text-gray-600">Semibold</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xl">Aa</span>
                  <span className="text-gray-600">Regular</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Cambiar Fuente
            </Button>
          </div>
        </div>

        {/* Templates & Assets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Templates */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Templates de Marca</h3>
              <Button size="sm">Crear Template</Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-24 rounded mb-3"></div>
                <p className="font-medium text-sm">Newsletter Principal</p>
                <p className="text-xs text-gray-600">Usado 45 veces</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-24 rounded mb-3"></div>
                <p className="font-medium text-sm">Promocional</p>
                <p className="text-xs text-gray-600">Usado 23 veces</p>
              </div>
              <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="bg-gray-100 h-24 rounded mb-3 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-400 text-2xl">+</span>
                </div>
                <p className="font-medium text-sm">Nuevo Template</p>
              </div>
            </div>
          </div>

          {/* Assets Library */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Biblioteca de Assets</h3>
              <Button size="sm">Subir Asset</Button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">hero-banner.jpg</p>
                  <p className="text-xs text-gray-600">1920x1080 • 245 KB</p>
                </div>
                <Button size="sm" variant="outline">
                  Ver
                </Button>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">brand-guidelines.pdf</p>
                  <p className="text-xs text-gray-600">PDF • 1.2 MB</p>
                </div>
                <Button size="sm" variant="outline">
                  Ver
                </Button>
              </div>

              <div className="flex items-center space-x-4 p-3 border rounded-lg">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm">social-icons.svg</p>
                  <p className="text-xs text-gray-600">Vector • 15 KB</p>
                </div>
                <Button size="sm" variant="outline">
                  Ver
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Guidelines */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Guías de Marca</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Voz y Tono</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Personalidad:</span>
                    <span className="font-medium">
                      Profesional, Innovador, Accesible
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tono:</span>
                    <span className="font-medium">Amigable pero experto</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estilo:</span>
                    <span className="font-medium">
                      Conversacional, técnico cuando es necesario
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Palabras Clave</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Innovación
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    Inteligencia Artificial
                  </span>
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    Automatización
                  </span>
                  <span className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    Eficiencia
                  </span>
                  <span className="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-sm">
                    Personalización
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-3">Mensajes de Marca</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 mb-2">
                  <strong>Propuesta de Valor Principal:</strong>{" "}
                  &ldquo;Transformamos el email marketing con IA, automatizando
                  la creación de contenido y optimizando cada campaña para
                  maximizar el engagement y conversiones.&rdquo;
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Diferenciador Clave:</strong> &ldquo;La única
                  plataforma que combina agentes de IA autónomos con análisis
                  predictivo para email marketing enterprise.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
