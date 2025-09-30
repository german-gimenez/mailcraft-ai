"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface AIResponse {
  agent: string;
  model: string;
  content: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  timestamp: string;
}

export function AIToolsContent() {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [prompt, setPrompt] = useState("");
  const [context, setContext] = useState("");
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const aiTools = [
    {
      id: "content",
      name: "Generador de Contenido",
      description: "Crea emails persuasivos con IA",
      endpoint: "/api/ai/content",
      placeholder: "Describe el email que quieres crear...",
      example:
        "Crea un email promocional para Black Friday con descuentos del 50%",
      icon: "✨",
    },
    {
      id: "quick",
      name: "Sugerencias Rápidas",
      description: "Mejoras instantáneas para tu contenido",
      endpoint: "/api/ai/quick",
      placeholder: "Escribe tu texto para mejorar...",
      example: 'Mejora este subject line: "Oferta especial para ti"',
      icon: "⚡",
    },
    {
      id: "analytics",
      name: "Análisis de Datos",
      description: "Insights inteligentes de tus campañas",
      endpoint: "/api/ai/analytics",
      placeholder: "Describe los datos que quieres analizar...",
      example: "Analiza por qué mi tasa de apertura bajó del 25% al 18%",
      icon: "📊",
    },
  ];

  const currentTool =
    aiTools.find((tool) => tool.id === activeTab) || aiTools[0];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(currentTool.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt.trim(),
          context: context.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al generar contenido");
      }

      setResponse(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const handleTestConnection = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/test");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al probar conexión");
      }

      alert(
        `Conexión exitosa!\n\nAgentes conectados: ${
          Object.values(data.data.agents).filter(Boolean).length
        }/4`
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Test Connection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Conexión AI</h3>
            <p className="text-gray-600">
              Verifica que todos los agentes de IA estén funcionando
            </p>
          </div>
          <Button
            onClick={handleTestConnection}
            disabled={loading}
            variant="outline"
          >
            {loading ? "Probando..." : "Probar Conexión"}
          </Button>
        </div>
      </div>

      {/* AI Tools Tabs */}
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="border-b">
          <nav className="-mb-px flex space-x-8 px-6" aria-label="Tabs">
            {aiTools.map((tool) => (
              <button
                key={tool.id}
                onClick={() => setActiveTab(tool.id)}
                className={`${
                  activeTab === tool.id
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                } border-b-2 py-4 px-1 text-sm font-medium flex items-center space-x-2`}
              >
                <span>{tool.icon}</span>
                <span>{tool.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Tool Info */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">{currentTool.name}</h3>
            <p className="text-gray-600">{currentTool.description}</p>
          </div>

          {/* Input Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Solicitud
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={currentTool.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-24 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Ejemplo: {currentTool.example}
              </p>
            </div>

            {currentTool.id !== "quick" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contexto (opcional)
                </label>
                <textarea
                  value={context}
                  onChange={(e) => setContext(e.target.value)}
                  placeholder="Información adicional, audiencia objetivo, tono deseado..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 h-20 resize-none"
                />
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim()}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
            >
              {loading ? "Generando..." : `Generar con ${currentTool.name}`}
            </Button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">❌ {error}</p>
            </div>
          )}

          {/* Response */}
          {response && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold">Resultado</h4>
                <div className="text-xs text-gray-500">
                  {response.agent} • {response.model}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="whitespace-pre-wrap text-gray-800">
                  {response.content}
                </div>
              </div>

              {/* Usage Stats */}
              <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-3">
                <div>
                  Tokens: {response.usage.total_tokens}(
                  {response.usage.prompt_tokens} input +{" "}
                  {response.usage.completion_tokens} output)
                </div>
                <div>{new Date(response.timestamp).toLocaleString()}</div>
              </div>

              {/* Actions */}
              <div className="flex space-x-3">
                <Button
                  onClick={() =>
                    navigator.clipboard.writeText(response.content)
                  }
                  variant="outline"
                  size="sm"
                >
                  📋 Copiar
                </Button>
                <Button
                  onClick={() => setResponse(null)}
                  variant="outline"
                  size="sm"
                >
                  🗑️ Limpiar
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Examples */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-3">✨ Ejemplos de Contenido</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• "Email de bienvenida para ecommerce de ropa"</p>
            <p>• "Newsletter semanal con tips de productividad"</p>
            <p>• "Email de carrito abandonado para SaaS"</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-3">⚡ Sugerencias Rápidas</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• "Mejora: 'Oferta especial para ti'"</p>
            <p>• "Acorta: 'Tu pedido está siendo procesado...'"</p>
            <p>• "Haz más urgente: 'Últimas horas'"</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <h3 className="font-semibold mb-3">📊 Análisis</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <p>• "Analiza mi tasa de apertura del 15%"</p>
            <p>• "Por qué mi CTR bajó en octubre?"</p>
            <p>• "Optimiza mi funnel de conversión"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
