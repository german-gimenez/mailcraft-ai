"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";

export default function TestEmailPage() {
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<any>(null);
  const [emailResult, setEmailResult] = useState<any>(null);
  const [testEmail, setTestEmail] = useState("");

  const testConnection = async () => {
    setIsTestingConnection(true);
    setConnectionStatus(null);

    try {
      const response = await fetch("/api/email/test", {
        method: "GET",
      });

      const data = await response.json();
      setConnectionStatus(data);
    } catch (error) {
      console.error("Error testing connection:", error);
      setConnectionStatus({
        success: false,
        error: "Error de red al probar conexión",
      });
    } finally {
      setIsTestingConnection(false);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail) {
      alert("Por favor ingresa un email de destino");
      return;
    }

    setIsSending(true);
    setEmailResult(null);

    try {
      const response = await fetch("/api/email/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "test",
          to: testEmail,
        }),
      });

      const data = await response.json();
      setEmailResult(data);
    } catch (error) {
      console.error("Error sending test email:", error);
      setEmailResult({
        success: false,
        error: "Error de red al enviar email",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            🧪 Test Email Service
          </h1>

          {/* Test de Conexión */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">📡 Test de Conexión</h2>
            <p className="text-gray-600 mb-4">
              Verifica que la conexión con Zeptomail esté funcionando
              correctamente.
            </p>

            <Button
              onClick={testConnection}
              disabled={isTestingConnection}
              className="mb-4"
            >
              {isTestingConnection ? "🔄 Probando..." : "🔍 Probar Conexión"}
            </Button>

            {connectionStatus && (
              <div
                className={`p-4 rounded-lg ${
                  connectionStatus.success
                    ? "bg-green-50 border-green-200"
                    : "bg-red-50 border-red-200"
                } border`}
              >
                <div className="font-medium">
                  {connectionStatus.success
                    ? "✅ Conexión Exitosa"
                    : "❌ Error de Conexión"}
                </div>
                {connectionStatus.connected !== undefined && (
                  <div className="text-sm mt-1">
                    Estado:{" "}
                    {connectionStatus.connected ? "Conectado" : "Desconectado"}
                  </div>
                )}
                {connectionStatus.error && (
                  <div className="text-sm mt-1 text-red-600">
                    Error: {connectionStatus.error}
                  </div>
                )}
                <div className="text-xs text-gray-500 mt-2">
                  {connectionStatus.timestamp}
                </div>
              </div>
            )}
          </div>

          {/* Email de Prueba */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">📧 Email de Prueba</h2>
            <p className="text-gray-600 mb-4">
              Envía un email de prueba predefinido para verificar el
              funcionamiento.
            </p>

            <div className="flex gap-4 items-end mb-4">
              <div className="flex-1">
                <label
                  htmlFor="testEmail"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email de destino
                </label>
                <input
                  id="testEmail"
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button onClick={sendTestEmail} disabled={isSending}>
                {isSending ? "📤 Enviando..." : "🚀 Enviar Test"}
              </Button>
            </div>
          </div>

          {/* Resultado del Email */}
          {emailResult && (
            <div
              className={`p-4 rounded-lg ${
                emailResult.success
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              } border`}
            >
              <div className="font-medium">
                {emailResult.success
                  ? "✅ Email Enviado"
                  : "❌ Error al Enviar"}
              </div>

              {emailResult.result && (
                <div className="mt-2 text-sm">
                  {emailResult.result.messageId && (
                    <div>Message ID: {emailResult.result.messageId}</div>
                  )}
                  {emailResult.result.recipientEmail && (
                    <div>Destinatario: {emailResult.result.recipientEmail}</div>
                  )}
                </div>
              )}

              {emailResult.error && (
                <div className="text-sm mt-1 text-red-600">
                  Error: {emailResult.error}
                </div>
              )}

              <div className="text-xs text-gray-500 mt-2">
                {emailResult.timestamp}
              </div>
            </div>
          )}

          {/* Instrucciones */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              💡 Instrucciones
            </h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>
                • Primero prueba la conexión para verificar la configuración
              </li>
              <li>• Luego envía un email de prueba a tu dirección</li>
              <li>
                • Revisa tu bandeja de entrada (y spam) para confirmar la
                entrega
              </li>
              <li>• El email de prueba incluye información de configuración</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
