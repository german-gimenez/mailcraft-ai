import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";

export default function TeamPage() {
  return (
    <DashboardLayout
      title="Team"
      subtitle="Gestiona tu equipo y permisos"
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
            <h1 className="text-3xl font-bold text-gray-900">Team</h1>
            <p className="text-gray-600 mt-2">
              Administra miembros, roles y permisos del equipo
            </p>
          </div>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
            Invitar Miembro
          </Button>
        </div>

        {/* Team Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Miembros
                </p>
                <p className="text-2xl font-bold text-gray-900">12</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Administradores
                </p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Usuarios Activos
                </p>
                <p className="text-2xl font-bold text-gray-900">9</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Invitaciones Pendientes
                </p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Team Members Table */}
        <div className="bg-white rounded-xl shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Miembros del Equipo</h2>
              <div className="flex space-x-3">
                <Button variant="outline" size="sm">
                  Exportar
                </Button>
                <Button variant="outline" size="sm">
                  Filtros
                </Button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Acceso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            GA
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Germán Aguirre
                        </div>
                        <div className="text-sm text-gray-500">
                          german@napsix.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      Super Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Hace 5 minutos
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-600 to-green-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            MR
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          María Rodríguez
                        </div>
                        <div className="text-sm text-gray-500">
                          maria@mailcraft.ai
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Admin
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Hace 2 horas
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-600 to-yellow-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            JS
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Juan Silva
                        </div>
                        <div className="text-sm text-gray-500">
                          juan@mailcraft.ai
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      Usuario
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Activo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Hace 1 día
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm">
                      Editar
                    </Button>
                  </td>
                </tr>

                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-yellow-600 to-red-600 flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            AL
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          Ana López
                        </div>
                        <div className="text-sm text-gray-500">
                          ana@cliente.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Invitado
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pendiente
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    -
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button variant="outline" size="sm">
                      Reenviar
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Permissions & Roles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Roles Definition */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Definición de Roles</h3>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-purple-800">Super Admin</h4>
                  <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                    1 usuario
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Acceso completo a todas las funciones y configuraciones.
                </p>
                <div className="text-xs text-gray-500">
                  • Gestión completa del equipo • Configuración de facturación •
                  Acceso a todas las herramientas
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-800">Admin</h4>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    3 usuarios
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Gestión de campañas y equipo, sin acceso a facturación.
                </p>
                <div className="text-xs text-gray-500">
                  • Crear/editar campañas • Gestionar contactos • Invitar
                  usuarios
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">Usuario</h4>
                  <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                    8 usuarios
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Acceso limitado para ejecutar campañas y ver reportes.
                </p>
                <div className="text-xs text-gray-500">
                  • Ejecutar campañas • Ver analytics • Editar templates
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h3 className="text-lg font-semibold mb-4">Actividad Reciente</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg
                    className="w-4 h-4 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    María Rodríguez fue promovida a Admin
                  </p>
                  <p className="text-xs text-gray-500">Hace 2 horas</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="w-4 h-4 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Invitación enviada a ana@cliente.com
                  </p>
                  <p className="text-xs text-gray-500">Hace 5 horas</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <svg
                    className="w-4 h-4 text-orange-600"
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
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Juan Silva accedió desde nueva ubicación
                  </p>
                  <p className="text-xs text-gray-500">Hace 1 día</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-red-100 rounded-lg">
                  <svg
                    className="w-4 h-4 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    Carlos Pérez fue removido del equipo
                  </p>
                  <p className="text-xs text-gray-500">Hace 3 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
