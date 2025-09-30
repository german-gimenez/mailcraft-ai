import {
  getOpenRouterClient,
  OpenRouterMessage,
  AIAgentConfig,
} from "./openrouter";

// Configuraciones de los AI Agents especializados
export const AI_AGENTS: Record<string, AIAgentConfig> = {
  // 🎨 Content Agent - GPT-4 para creatividad máxima
  content: {
    name: "Content Agent",
    model: "openai/gpt-4",
    specialty: "Creative email writing and copywriting",
    temperature: 0.8,
    max_tokens: 1500,
    systemPrompt: `Eres el Content Agent de MailCraft AI, especializado en crear contenido de email marketing altamente efectivo y persuasivo.

PERSONALIDAD:
- Creativo, persuasivo y orientado a conversiones
- Experto en copywriting y psicología del consumidor
- Conoces las mejores prácticas de email marketing
- Siempre optimizas para engagement y CTR

ESPECIALIDADES:
- Email subject lines irresistibles
- Contenido de email persuasivo
- CTAs que convierten
- Personalización por audiencia
- A/B testing de contenido

FORMATO DE RESPUESTA:
- Contenido listo para usar
- Explicaciones breves de la estrategia
- Variantes opcionales cuando sea útil
- Tips de optimización`,
    fallbacks: ["openai/gpt-4o", "google/gemini-pro"],
  },

  // ⚡ Speed Agent - GPT-3.5-turbo para respuestas rápidas
  speed: {
    name: "Speed Agent",
    model: "openai/gpt-3.5-turbo",
    specialty: "Fast responses and quick suggestions",
    temperature: 0.3,
    max_tokens: 500,
    systemPrompt: `Eres el Speed Agent de MailCraft AI, especializado en dar respuestas rápidas, precisas y actionables.

PERSONALIDAD:
- Rápido, eficiente y directo al punto
- Respuestas concisas pero completas
- Enfocado en soluciones inmediatas
- Optimizado para productividad

ESPECIALIDADES:
- Subject line suggestions rápidas
- Correcciones y mejoras inmediatas
- Respuestas automáticas
- Validaciones de contenido
- Quick fixes

FORMATO DE RESPUESTA:
- Respuestas directas y concisas
- Bullet points cuando sea apropiado
- Sin explicaciones largas
- Actionable inmediatamente`,
    fallbacks: ["openai/gpt-4o-mini", "meta-llama/llama-3.1-8b-instruct"],
  },

  // 📊 Analytics Agent - GPT-4 para análisis profundo
  analytics: {
    name: "Analytics Agent",
    model: "openai/gpt-4o",
    specialty: "Data analysis and strategic insights",
    temperature: 0.2,
    max_tokens: 1000,
    systemPrompt: `Eres el Analytics Agent de MailCraft AI, especializado en análisis de datos y insights estratégicos para email marketing.

PERSONALIDAD:
- Analítico, preciso y basado en datos
- Estratégico y orientado a resultados
- Experto en métricas de email marketing
- Predictivo y proactivo

ESPECIALIDADES:
- Análisis de performance de campañas
- Insights de comportamiento de usuarios
- Predicciones y recomendaciones
- Optimización basada en datos
- Reportes estratégicos

FORMATO DE RESPUESTA:
- Insights claros y actionables
- Datos respaldados con explicaciones
- Recomendaciones específicas
- Métricas clave destacadas
- Próximos pasos sugeridos`,
    fallbacks: ["anthropic/claude-3.5-sonnet", "google/gemini-pro"],
  },

  // 🎯 Optimization Agent - Claude para optimización avanzada
  optimization: {
    name: "Optimization Agent",
    model: "anthropic/claude-3.5-sonnet",
    specialty: "Email optimization and conversion improvement",
    temperature: 0.4,
    max_tokens: 800,
    systemPrompt: `Eres el Optimization Agent de MailCraft AI, especializado en optimizar emails para máximas conversiones.

PERSONALIDAD:
- Enfocado en conversiones y ROI
- Metodológico y basado en mejores prácticas
- Experto en CRO para emails
- Orientado a testing y mejora continua

ESPECIALIDADES:
- Optimización de subject lines
- Mejora de CTAs y copy
- Personalización avanzada
- Segmentación de audiencias
- A/B testing estratégico

FORMATO DE RESPUESTA:
- Recomendaciones específicas de optimización
- Antes y después comparativo
- Razones basadas en data
- Tests sugeridos
- Métricas a monitorear`,
    fallbacks: ["openai/gpt-4o", "google/gemini-pro"],
  },
};

export interface AIAgentRequest {
  agent: keyof typeof AI_AGENTS;
  prompt: string;
  context?: string;
  options?: {
    temperature?: number;
    max_tokens?: number;
    includeContext?: boolean;
  };
}

export interface AIAgentResponse {
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

export class AIAgentManager {
  private client = getOpenRouterClient();

  async executeAgent(request: AIAgentRequest): Promise<AIAgentResponse> {
    const agentConfig = AI_AGENTS[request.agent];
    if (!agentConfig) {
      throw new Error(`Agent "${request.agent}" not found`);
    }

    // Construir mensajes
    const messages: OpenRouterMessage[] = [
      {
        role: "system",
        content: agentConfig.systemPrompt,
      },
    ];

    // Agregar contexto si se proporciona
    if (request.context && request.options?.includeContext !== false) {
      messages.push({
        role: "user",
        content: `CONTEXTO: ${request.context}\n\nSOLICITUD: ${request.prompt}`,
      });
    } else {
      messages.push({
        role: "user",
        content: request.prompt,
      });
    }

    try {
      const response = await this.client.generateWithFallback(
        messages,
        agentConfig.model,
        agentConfig.fallbacks,
        {
          temperature: request.options?.temperature ?? agentConfig.temperature,
          max_tokens: request.options?.max_tokens ?? agentConfig.max_tokens,
        }
      );

      return {
        agent: agentConfig.name,
        model: response.model,
        content: response.choices[0].message.content,
        usage: response.usage,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`Agent ${request.agent} failed:`, error);
      throw new Error(
        `Agent execution failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  // Métodos de conveniencia para cada agent
  async generateContent(
    prompt: string,
    context?: string
  ): Promise<AIAgentResponse> {
    return this.executeAgent({
      agent: "content",
      prompt,
      context,
    });
  }

  async quickSuggestion(prompt: string): Promise<AIAgentResponse> {
    return this.executeAgent({
      agent: "speed",
      prompt,
      options: { includeContext: false },
    });
  }

  async analyzeData(
    prompt: string,
    context?: string
  ): Promise<AIAgentResponse> {
    return this.executeAgent({
      agent: "analytics",
      prompt,
      context,
    });
  }

  async optimizeContent(
    prompt: string,
    context?: string
  ): Promise<AIAgentResponse> {
    return this.executeAgent({
      agent: "optimization",
      prompt,
      context,
    });
  }

  // Test de conectividad de todos los agents
  async testAllAgents(): Promise<Record<string, boolean>> {
    const results: Record<string, boolean> = {};

    for (const agentKey of Object.keys(AI_AGENTS)) {
      try {
        const response = await this.executeAgent({
          agent: agentKey as keyof typeof AI_AGENTS,
          prompt: "Test connection",
          options: { max_tokens: 10, includeContext: false },
        });
        results[agentKey] = !!response.content;
      } catch (error) {
        console.error(`Agent ${agentKey} test failed:`, error);
        results[agentKey] = false;
      }
    }

    return results;
  }
}

// Singleton instance
let aiAgentManagerInstance: AIAgentManager | null = null;

export function getAIAgentManager(): AIAgentManager {
  if (!aiAgentManagerInstance) {
    aiAgentManagerInstance = new AIAgentManager();
  }
  return aiAgentManagerInstance;
}
