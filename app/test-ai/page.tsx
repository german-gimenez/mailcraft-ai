"use client";

import { Suspense } from "react";

// Declarar la función testAI global
declare global {
  interface Window {
    testAI: (agent: string, prompt: string) => Promise<void>;
  }
}

function AITestContent() {
  const handleTestAI = (agent: string, prompt: string) => {
    if (typeof window !== "undefined" && window.testAI) {
      window.testAI(agent, prompt);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🤖 AI Tools Test - MailCraft AI
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                ⚡ Speed Agent
              </h3>
              <p className="text-blue-800 text-sm mb-4">
                Respuestas rápidas para subject lines y CTAs
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() =>
                  handleTestAI(
                    "speed",
                    "Crea un subject line para Black Friday"
                  )
                }
              >
                Probar Speed Agent
              </button>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                🎨 Content Agent
              </h3>
              <p className="text-green-800 text-sm mb-4">
                Contenido completo para emails de marketing
              </p>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() =>
                  handleTestAI(
                    "content",
                    "Escribe un email de bienvenida para SaaS"
                  )
                }
              >
                Probar Content Agent
              </button>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">
                📊 Analytics Agent
              </h3>
              <p className="text-purple-800 text-sm mb-4">
                Análisis de métricas y recomendaciones
              </p>
              <button
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                onClick={() =>
                  handleTestAI("analytics", "Analiza: 25% open rate, 3% CTR")
                }
              >
                Probar Analytics Agent
              </button>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-orange-900 mb-3">
                🔧 Optimization Agent
              </h3>
              <p className="text-orange-800 text-sm mb-4">
                Optimización técnica y deliverability
              </p>
              <button
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                onClick={() =>
                  handleTestAI(
                    "optimization",
                    "Optimiza para deliverability: ¡OFERTA LIMITADA!!!"
                  )
                }
              >
                Probar Optimization Agent
              </button>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              📝 Resultado de la Prueba
            </h3>
            <div id="test-result" className="text-gray-600">
              Haz clic en cualquier botón para probar los agentes de IA...
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className="inline-flex items-center space-x-4 text-sm text-gray-500">
              <span>🔗 OpenRouter API</span>
              <span>•</span>
              <span>⚡ Next.js 15</span>
              <span>•</span>
              <span>🤖 Multi-Agent AI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AITestPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AITestContent />

      <script
        dangerouslySetInnerHTML={{
          __html: `
          async function testAI(agent, prompt) {
            const resultDiv = document.getElementById('test-result');
            resultDiv.innerHTML = '🔄 Probando ' + agent + ' agent...';
            
            try {
              const response = await fetch('/api/ai/test-public', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ agent, prompt })
              });
              
              const data = await response.json();
              
              if (response.ok) {
                resultDiv.innerHTML = \`
                  <div class="space-y-3">
                    <div class="flex items-center space-x-2">
                      <span class="text-green-600 font-semibold">✅ \${data.agent} Agent - EXITOSO</span>
                      <span class="text-xs text-gray-500">(\${data.model})</span>
                    </div>
                    <div class="bg-white border border-gray-200 rounded p-4">
                      <p class="text-gray-800">\${data.content}</p>
                    </div>
                    <div class="text-xs text-gray-500">
                      Generado: \${new Date(data.timestamp).toLocaleString()}
                    </div>
                  </div>
                \`;
              } else {
                resultDiv.innerHTML = \`
                  <div class="text-red-600">
                    ❌ Error: \${data.error}
                    <br><small>\${data.details}</small>
                  </div>
                \`;
              }
            } catch (error) {
              resultDiv.innerHTML = \`
                <div class="text-red-600">
                  ❌ Error de conexión: \${error.message}
                </div>
              \`;
            }
          }
          
          // Hacer la función global
          window.testAI = testAI;
        `,
        }}
      />
    </Suspense>
  );
}
