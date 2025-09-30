import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <DashboardLayout
      title="Settings"
      subtitle="Configuraciones generales y preferencias"
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
            <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
            <p className="text-gray-600 mt-2">
              Configura tu organización y preferencias
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            Guardar Cambios
          </Button>
        </div>

        {/* Settings Tabs */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="border-b">
            <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
              <button className="border-b-2 border-purple-500 py-4 px-1 text-sm font-medium text-purple-600">
                General
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Notificaciones
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Integrations
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                Seguridad
              </button>
              <button className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                API
              </button>
            </nav>
          </div>

          {/* General Settings */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Organization Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Información de la Organización
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de la Organización
                      </label>
                      <input
                        type="text"
                        defaultValue="MailCraft AI"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dominio
                      </label>
                      <input
                        type="text"
                        defaultValue="mailcraft.ai"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Zona Horaria
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                        <option>UTC-3 (Buenos Aires)</option>
                        <option>UTC-5 (New York)</option>
                        <option>UTC+0 (London)</option>
                        <option>UTC+1 (Madrid)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Idioma
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500">
                        <option>Español</option>
                        <option>English</option>
                        <option>Português</option>
                        <option>Français</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email Configuration */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">
                    Configuración de Email
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email de Remitente por Defecto
                      </label>
                      <input
                        type="email"
                        defaultValue="go@napsix.ai"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nombre de Remitente
                      </label>
                      <input
                        type="text"
                        defaultValue="MailCraft AI"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email de Respuesta
                      </label>
                      <input
                        type="email"
                        defaultValue="support@napsix.ai"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>

                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-center">
                        <svg
                          className="w-5 h-5 text-blue-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-blue-800">
                            Estado SMTP
                          </p>
                          <p className="text-sm text-blue-600">
                            Conectado a Zeptomail
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI Configuration */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-purple-100 rounded-lg mr-4">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Configuración IA</h3>
                <p className="text-sm text-gray-600">OpenRouter API</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Estado:</span>
                <span className="text-green-600 font-medium">Conectado</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Modelo:</span>
                <span>GPT-4 Turbo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Uso mensual:</span>
                <span>$234.50</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Configurar IA
            </Button>
          </div>

          {/* Payment Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
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
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Pagos</h3>
                <p className="text-sm text-gray-600">MercadoPago</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>Estado:</span>
                <span className="text-green-600 font-medium">Activo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Plan:</span>
                <span>Scale</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Próximo pago:</span>
                <span>15 Nov 2025</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Gestionar Pagos
            </Button>
          </div>

          {/* Security Settings */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="p-3 bg-red-100 rounded-lg mr-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Seguridad</h3>
                <p className="text-sm text-gray-600">Autenticación</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span>2FA:</span>
                <span className="text-green-600 font-medium">Habilitado</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>SSO:</span>
                <span className="text-gray-500">Disponible</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Sesiones:</span>
                <span>3 activas</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4">
              Configurar Seguridad
            </Button>
          </div>
        </div>

        {/* Data & Privacy */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Datos y Privacidad</h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold mb-3">Exportar Datos</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Descarga todos tus datos en formato JSON o CSV.
                </p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Exportar Contactos
                  </Button>
                  <Button variant="outline" className="w-full">
                    Exportar Campañas
                  </Button>
                  <Button variant="outline" className="w-full">
                    Exportar Analytics
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Eliminar Datos</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Elimina permanentemente datos específicos o toda la cuenta.
                </p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full text-orange-600 border-orange-600 hover:bg-orange-50"
                  >
                    Purgar Datos Antiguos
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Eliminar Cuenta
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Keys */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">API Keys</h2>
              <Button size="sm">Generar Nueva Key</Button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Producción</p>
                  <p className="text-sm text-gray-600">mk_prod_...8934</p>
                  <p className="text-xs text-gray-500">Creado: 15 Oct 2025</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Copiar
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    Revocar
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Desarrollo</p>
                  <p className="text-sm text-gray-600">mk_dev_...1234</p>
                  <p className="text-xs text-gray-500">Creado: 10 Oct 2025</p>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Copiar
                  </Button>
                  <Button size="sm" variant="outline" className="text-red-600">
                    Revocar
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
              <div className="flex items-center">
                <svg
                  className="w-5 h-5 text-yellow-600 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.865-.833-2.635 0L4.178 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
                <div>
                  <p className="text-sm font-medium text-yellow-800">
                    Importante
                  </p>
                  <p className="text-sm text-yellow-700">
                    Mantén tus API keys seguras y nunca las compartas
                    públicamente.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
