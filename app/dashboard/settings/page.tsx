'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { AlertCircle, Check, X, Eye, EyeOff, TestTube, Save, Key, Globe, User, Zap } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useUserRole, usePermissions } from '@/lib/hooks/useUserRole';

// Tipos para las configuraciones
interface ApiCredentials {
  openrouter: {
    apiKey: string;
    enabled: boolean;
    lastTested: string | null;
    status: 'untested' | 'valid' | 'invalid';
  };
  zeptomail: {
    token: string;
    enabled: boolean;
    lastTested: string | null;
    status: 'untested' | 'valid' | 'invalid';
  };
}

interface OrganizationSettings {
  name: string;
  domain: string;
  description: string;
  allowedDomains: string[];
  autoAcceptDomains: boolean;
}

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const role = useUserRole();
  const permissions = usePermissions();
  
  // Estados para las configuraciones
  const [apiCredentials, setApiCredentials] = useState<ApiCredentials>({
    openrouter: {
      apiKey: '',
      enabled: false,
      lastTested: null,
      status: 'untested'
    },
    zeptomail: {
      token: '',
      enabled: false,
      lastTested: null,
      status: 'untested'
    }
  });

  const [orgSettings, setOrgSettings] = useState<OrganizationSettings>({
    name: '',
    domain: '',
    description: '',
    allowedDomains: [],
    autoAcceptDomains: false
  });

  // Estados UI
  const [isLoading, setIsLoading] = useState(false);
  const [showApiKeys, setShowApiKeys] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // Cargar configuraciones al montar
  useEffect(() => {
    if (isLoaded && user) {
      loadSettings();
    }
  }, [isLoaded, user]);

  const loadSettings = async () => {
    try {
      setIsLoading(true);
      
      // Cargar configuraciones de usuario
      const userMeta = user?.unsafeMetadata || {};
      
      setOrgSettings({
        name: userMeta.organizationName as string || '',
        domain: userMeta.organizationDomain as string || '',
        description: userMeta.organizationDescription as string || '',
        allowedDomains: userMeta.allowedDomains as string[] || [],
        autoAcceptDomains: userMeta.autoAcceptDomains as boolean || false
      });

      // Cargar credenciales API (simulado - en producción vendría del backend)
      setApiCredentials({
        openrouter: {
          apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || '',
          enabled: true,
          lastTested: null,
          status: 'untested'
        },
        zeptomail: {
          token: process.env.NEXT_PUBLIC_ZEPTOMAIL_TOKEN || '',
          enabled: true,
          lastTested: null,
          status: 'untested'
        }
      });

    } catch (error) {
      console.error('Error loading settings:', error);
      setMessage({ type: 'error', text: 'Error al cargar configuraciones' });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para probar APIs
  const testApiConnection = async (service: 'openrouter' | 'zeptomail') => {
    try {
      setIsLoading(true);
      
      const endpoint = service === 'openrouter' ? '/api/ai/test-simple' : '/api/email/test';
      const credentials = service === 'openrouter' 
        ? { apiKey: apiCredentials.openrouter.apiKey }
        : { token: apiCredentials.zeptomail.token };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();
      
      if (response.ok) {
        setApiCredentials(prev => ({
          ...prev,
          [service]: {
            ...prev[service],
            status: 'valid',
            lastTested: new Date().toISOString()
          }
        }));
        setMessage({ type: 'success', text: `${service} conectado correctamente` });
      } else {
        setApiCredentials(prev => ({
          ...prev,
          [service]: {
            ...prev[service],
            status: 'invalid',
            lastTested: new Date().toISOString()
          }
        }));
        setMessage({ type: 'error', text: `Error en ${service}: ${result.error}` });
      }
    } catch (error) {
      setApiCredentials(prev => ({
        ...prev,
        [service]: {
          ...prev[service],
          status: 'invalid',
          lastTested: new Date().toISOString()
        }
      }));
      setMessage({ type: 'error', text: `Error de conexión con ${service}` });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para guardar configuraciones
  const saveSettings = async () => {
    try {
      setIsLoading(true);
      
      // Actualizar metadata de usuario en Clerk
      await user?.update({
        unsafeMetadata: {
          ...user.unsafeMetadata,
          organizationName: orgSettings.name,
          organizationDomain: orgSettings.domain,
          organizationDescription: orgSettings.description,
          allowedDomains: orgSettings.allowedDomains,
          autoAcceptDomains: orgSettings.autoAcceptDomains
        }
      });

      setMessage({ type: 'success', text: 'Configuraciones guardadas correctamente' });
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Error al guardar configuraciones' });
    } finally {
      setIsLoading(false);
    }
  };

  // Función para agregar dominio permitido
  const addAllowedDomain = () => {
    const domain = prompt('Ingrese el dominio (ej: empresa.com):');
    if (domain && domain.trim() && !orgSettings.allowedDomains.includes(domain.trim())) {
      setOrgSettings(prev => ({
        ...prev,
        allowedDomains: [...prev.allowedDomains, domain.trim()]
      }));
    }
  };

  // Función para remover dominio permitido
  const removeAllowedDomain = (domain: string) => {
    setOrgSettings(prev => ({
      ...prev,
      allowedDomains: prev.allowedDomains.filter(d => d !== domain)
    }));
  };

  if (!isLoaded) {
    return <div className="flex items-center justify-center h-64">Cargando...</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Configuraciones</h1>
        <p className="text-gray-600">
          Gestiona tu cuenta, organización y credenciales API
        </p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant={role === 'super_admin' ? 'destructive' : role === 'admin' ? 'default' : 'secondary'}>
            {role === 'super_admin' ? 'Super Admin' : role === 'admin' ? 'Admin' : 'Usuario'}
          </Badge>
          <span className="text-sm text-gray-500"></span>
          <span className="text-sm text-gray-500">{user?.emailAddresses[0]?.emailAddress}</span>
        </div>
      </div>

      {message && (
        <Alert className={`mb-4 ${message.type === 'error' ? 'border-red-200 bg-red-50' : 
                                   message.type === 'success' ? 'border-green-200 bg-green-50' : 
                                   'border-blue-200 bg-blue-50'}`}>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="organization" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Organización
          </TabsTrigger>
          <TabsTrigger value="api" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API
          </TabsTrigger>
          {permissions.canManageSystem && (
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Avanzado
            </TabsTrigger>
          )}
        </TabsList>

        {/* Tab: Perfil de Usuario */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nombre</Label>
                  <Input
                    id="firstName"
                    value={user?.firstName || ''}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellido</Label>
                  <Input
                    id="lastName"
                    value={user?.lastName || ''}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={user?.emailAddresses[0]?.emailAddress || ''}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="role">Rol del Usuario</Label>
                <Input
                  id="role"
                  value={role === 'super_admin' ? 'Super Administrador' : 
                        role === 'admin' ? 'Administrador' : 'Usuario'}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              <Alert className="border-blue-200 bg-blue-50">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Para cambiar tu información personal, utiliza el panel de usuario de Clerk.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Configuración de Organización */}
        <TabsContent value="organization" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Información de la Organización
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="orgName">Nombre de la Organización</Label>
                <Input
                  id="orgName"
                  value={orgSettings.name}
                  onChange={(e) => setOrgSettings(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Nombre de tu empresa"
                />
              </div>
              <div>
                <Label htmlFor="orgDomain">Dominio Principal</Label>
                <Input
                  id="orgDomain"
                  value={orgSettings.domain}
                  onChange={(e) => setOrgSettings(prev => ({ ...prev, domain: e.target.value }))}
                  placeholder="empresa.com"
                />
              </div>
              <div>
                <Label htmlFor="orgDescription">Descripción</Label>
                <Textarea
                  id="orgDescription"
                  value={orgSettings.description}
                  onChange={(e) => setOrgSettings(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe tu organización..."
                  rows={3}
                />
              </div>
              
              {permissions.canManageUsers && (
                <>
                  <div className="space-y-2">
                    <Label>Dominios Permitidos</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {orgSettings.allowedDomains.map((domain, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {domain}
                          <X 
                            className="h-3 w-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeAllowedDomain(domain)}
                          />
                        </Badge>
                      ))}
                    </div>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm"
                      onClick={addAllowedDomain}
                    >
                      Agregar Dominio
                    </Button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="autoAccept"
                      checked={orgSettings.autoAcceptDomains}
                      onCheckedChange={(checked) => 
                        setOrgSettings(prev => ({ ...prev, autoAcceptDomains: checked }))
                      }
                    />
                    <Label htmlFor="autoAccept">
                      Auto-aceptar usuarios de dominios permitidos
                    </Label>
                  </div>
                </>
              )}
              
              <Button onClick={saveSettings} disabled={isLoading} className="w-full">
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? 'Guardando...' : 'Guardar Configuración'}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Credenciales API */}
        <TabsContent value="api" className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Credenciales API</h3>
              <p className="text-sm text-gray-600">Configura y prueba tus credenciales de servicios externos</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowApiKeys(!showApiKeys)}
            >
              {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showApiKeys ? 'Ocultar' : 'Mostrar'} Keys
            </Button>
          </div>

          {/* OpenRouter API */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  OpenRouter AI
                </div>
                <div className="flex items-center gap-2">
                  {apiCredentials.openrouter.status === 'valid' && (
                    <Badge variant="default" className="bg-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      Conectado
                    </Badge>
                  )}
                  {apiCredentials.openrouter.status === 'invalid' && (
                    <Badge variant="destructive">
                      <X className="h-3 w-3 mr-1" />
                      Error
                    </Badge>
                  )}
                  {apiCredentials.openrouter.status === 'untested' && (
                    <Badge variant="secondary">No probado</Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="openrouterKey">API Key</Label>
                <div className="flex gap-2">
                  <Input
                    id="openrouterKey"
                    type={showApiKeys ? 'text' : 'password'}
                    value={apiCredentials.openrouter.apiKey}
                    onChange={(e) => setApiCredentials(prev => ({
                      ...prev,
                      openrouter: { ...prev.openrouter, apiKey: e.target.value, status: 'untested' }
                    }))}
                    placeholder="sk-or-v1-..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => testApiConnection('openrouter')}
                    disabled={isLoading || !apiCredentials.openrouter.apiKey}
                  >
                    <TestTube className="h-4 w-4 mr-2" />
                    Probar
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="openrouterEnabled"
                  checked={apiCredentials.openrouter.enabled}
                  onCheckedChange={(checked) => 
                    setApiCredentials(prev => ({
                      ...prev,
                      openrouter: { ...prev.openrouter, enabled: checked }
                    }))
                  }
                />
                <Label htmlFor="openrouterEnabled">Habilitar OpenRouter</Label>
              </div>
              
              {apiCredentials.openrouter.lastTested && (
                <p className="text-sm text-gray-500">
                  Última prueba: {new Date(apiCredentials.openrouter.lastTested).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>

          {/* ZeptoMail API */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="h-5 w-5" />
                  ZeptoMail
                </div>
                <div className="flex items-center gap-2">
                  {apiCredentials.zeptomail.status === 'valid' && (
                    <Badge variant="default" className="bg-green-500">
                      <Check className="h-3 w-3 mr-1" />
                      Conectado
                    </Badge>
                  )}
                  {apiCredentials.zeptomail.status === 'invalid' && (
                    <Badge variant="destructive">
                      <X className="h-3 w-3 mr-1" />
                      Error
                    </Badge>
                  )}
                  {apiCredentials.zeptomail.status === 'untested' && (
                    <Badge variant="secondary">No probado</Badge>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="zeptomailToken">Send Mail Token</Label>
                <div className="flex gap-2">
                  <Input
                    id="zeptomailToken"
                    type={showApiKeys ? 'text' : 'password'}
                    value={apiCredentials.zeptomail.token}
                    onChange={(e) => setApiCredentials(prev => ({
                      ...prev,
                      zeptomail: { ...prev.zeptomail, token: e.target.value, status: 'untested' }
                    }))}
                    placeholder="Zoho-enczapitoken..."
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => testApiConnection('zeptomail')}
                    disabled={isLoading || !apiCredentials.zeptomail.token}
                  >
                    <TestTube className="h-4 w-4 mr-2" />
                    Probar
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="zeptomailEnabled"
                  checked={apiCredentials.zeptomail.enabled}
                  onCheckedChange={(checked) => 
                    setApiCredentials(prev => ({
                      ...prev,
                      zeptomail: { ...prev.zeptomail, enabled: checked }
                    }))
                  }
                />
                <Label htmlFor="zeptomailEnabled">Habilitar ZeptoMail</Label>
              </div>
              
              {apiCredentials.zeptomail.lastTested && (
                <p className="text-sm text-gray-500">
                  Última prueba: {new Date(apiCredentials.zeptomail.lastTested).toLocaleString()}
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab: Configuraciones Avanzadas - Solo Super Admin */}
        {permissions.canManageSystem && (
          <TabsContent value="advanced" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <Zap className="h-5 w-5" />
                  Configuraciones Avanzadas del Sistema
                </CardTitle>
                <p className="text-sm text-gray-600">
                  Solo disponible para Super Administradores
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Cuidado:</strong> Estas configuraciones afectan todo el sistema.
                  </AlertDescription>
                </Alert>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Gestión de Usuarios</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Administra todos los usuarios del sistema
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      Próximamente
                    </Button>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Configuración Global</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Configuraciones que afectan toda la plataforma
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      Próximamente
                    </Button>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Análisis del Sistema</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Estadísticas y métricas globales
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      Próximamente
                    </Button>
                  </Card>
                  
                  <Card className="p-4">
                    <h4 className="font-semibold mb-2">Facturación Global</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Gestión de planes y facturación
                    </p>
                    <Button variant="outline" size="sm" disabled>
                      Próximamente
                    </Button>
                  </Card>
                </div>
                
                <div className="pt-4 border-t">
                  <h4 className="font-semibold mb-2 text-red-600">Zona de Peligro</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Acciones irreversibles que afectan todo el sistema
                  </p>
                  <div className="flex gap-2">
                    <Button variant="danger" size="sm" disabled>
                      Mantenimiento del Sistema
                    </Button>
                    <Button variant="danger" size="sm" disabled>
                      Resetear Configuraciones
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
