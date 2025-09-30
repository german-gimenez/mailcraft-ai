import { OpenRouterClient, getOpenRouterClient } from "./openrouter";

// Helper function para llamar a OpenRouter
async function callOpenRouter(prompt: string, agentType: string) {
  const client = getOpenRouterClient();
  const response = await client.generateCompletion({
    model: "anthropic/claude-3.5-sonnet",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content || "";
}

export interface CampaignIdea {
  subject: string;
  previewText: string;
  content: string;
  purpose: string;
  tone: string;
  cta: string;
  estimatedOpenRate: number;
  estimatedClickRate: number;
  reasoning: string;
}

export interface AIInsights {
  openRateScore: number;
  clickRateScore: number;
  conversionScore: number;
  revenueEstimate: number;
  optimizations: string[];
  bestSendTime: string;
  confidence: number;
}

export interface TemplateGenerationRequest {
  purpose: string;
  industry: string;
  targetAudience: string;
  brandTone?: string;
  brandColors?: {
    primary: string;
    secondary: string;
  };
  productName?: string;
  companyName?: string;
}

export class AICampaignService {
  /**
   * Genera múltiples ideas de campaña basadas en el objetivo
   */
  static async generateCampaignIdeas(
    purpose: string,
    industry: string,
    targetAudience: string,
    brandInfo?: any
  ): Promise<CampaignIdea[]> {
    const prompt = `
    Eres un experto en email marketing y copywriting persuasivo. Genera 3 ideas ÚNICAS de campañas de email para:

    OBJETIVO: ${purpose}
    INDUSTRIA: ${industry}
    AUDIENCIA: ${targetAudience}
    BRAND INFO: ${brandInfo ? JSON.stringify(brandInfo) : "N/A"}

    Para cada idea, genera:
    1. Subject line irresistible (máximo 50 caracteres)
    2. Preview text que complemente el subject (máximo 90 caracteres)
    3. Estructura del contenido principal
    4. CTA específico y persuasivo
    5. Tono y enfoque
    6. Estimación realista de open rate y click rate

    Enfócate en:
    - Psicología del consumidor
    - Triggers emocionales
    - Urgencia y escasez cuando sea apropiado
    - Storytelling
    - Beneficios específicos

    Responde en JSON con este formato exacto:
    {
      "campaigns": [
        {
          "subject": "subject line",
          "previewText": "preview text",
          "content": "estructura del contenido",
          "purpose": "propósito específico",
          "tone": "tono/personalidad",
          "cta": "call to action",
          "estimatedOpenRate": número,
          "estimatedClickRate": número,
          "reasoning": "por qué funcionará"
        }
      ]
    }
    `;

    const response = await callOpenRouter(prompt, "content");

    try {
      const parsed = JSON.parse(response);
      return parsed.campaigns || [];
    } catch (error) {
      console.error("Error parsing campaign ideas:", error);
      return [];
    }
  }

  /**
   * Genera el HTML completo de un email basado en la idea
   */
  static async generateEmailHTML(
    campaignIdea: CampaignIdea,
    brandKit?: any,
    companyName?: string
  ): Promise<string> {
    const prompt = `
    Genera un email HTML completo y profesional basado en esta campaña:

    SUBJECT: ${campaignIdea.subject}
    PREVIEW: ${campaignIdea.previewText}
    CONTENIDO: ${campaignIdea.content}
    CTA: ${campaignIdea.cta}
    TONO: ${campaignIdea.tone}
    
    BRAND KIT: ${
      brandKit ? JSON.stringify(brandKit) : "Usar colores neutros profesionales"
    }
    EMPRESA: ${companyName || "Tu Empresa"}

    REQUISITOS:
    1. HTML responsivo para móvil y desktop
    2. Diseño moderno y atractivo
    3. Estructura clara con jerarquía visual
    4. CTA prominente y persuasivo
    5. Colores del brand kit
    6. Pixel de tracking: {{TRACKING_PIXEL}}
    7. Link de unsubscribe: {{UNSUBSCRIBE_LINK}}

    ESTRUCTURA RECOMENDADA:
    - Header con logo/branding
    - Hero section con hook principal
    - Contenido principal estructurado
    - CTA principal destacado
    - Footer con contacto y unsubscribe

    Genera SOLO el HTML sin explicaciones adicionales.
    `;

    return await callOpenRouter(prompt, "content");
  }

  /**
   * Optimiza un subject line existente
   */
  static async optimizeSubjectLine(
    subject: string,
    purpose: string,
    targetAudience: string
  ): Promise<string[]> {
    const prompt = `
    Optimiza este subject line para máximo impacto:

    SUBJECT ACTUAL: "${subject}"
    PROPÓSITO: ${purpose}
    AUDIENCIA: ${targetAudience}

    Genera 5 alternativas optimizadas que:
    1. Aumenten la curiosidad
    2. Usen triggers psicológicos
    3. Sean específicas y claras
    4. Eviten spam triggers
    5. Mantengan el mensaje original

    Responde solo con un array JSON de strings:
    ["subject 1", "subject 2", "subject 3", "subject 4", "subject 5"]
    `;

    const response = await callOpenRouter(prompt, "speed");

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error("Error parsing subject lines:", error);
      return [subject];
    }
  }

  /**
   * Analiza y predice el rendimiento de una campaña
   */
  static async analyzeCampaignPerformance(
    subject: string,
    content: string,
    targetAudience: string,
    industry: string
  ): Promise<AIInsights> {
    const prompt = `
    Analiza esta campaña de email y predice su rendimiento:

    SUBJECT: ${subject}
    AUDIENCIA: ${targetAudience}
    INDUSTRIA: ${industry}
    CONTENIDO: ${content.substring(0, 500)}...

    Analiza:
    1. Probabilidad de apertura (considerando subject line, sender, timing)
    2. Probabilidad de clicks (CTA, contenido, relevancia)
    3. Probabilidad de conversión (oferta, trust, urgencia)
    4. Estimación de revenue por email
    5. Mejores horarios de envío para esta audiencia
    6. Optimizaciones específicas recomendadas

    Responde en JSON:
    {
      "openRateScore": número (0-100),
      "clickRateScore": número (0-100), 
      "conversionScore": número (0-100),
      "revenueEstimate": número en USD,
      "optimizations": ["optimización 1", "optimización 2"],
      "bestSendTime": "día y hora específica",
      "confidence": número (0-100)
    }
    `;

    const response = await callOpenRouter(prompt, "analytics");

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error("Error parsing campaign analysis:", error);
      return {
        openRateScore: 25,
        clickRateScore: 3,
        conversionScore: 1,
        revenueEstimate: 0.5,
        optimizations: ["Optimizar subject line", "Mejorar CTA"],
        bestSendTime: "Martes 10:00 AM",
        confidence: 70,
      };
    }
  }

  /**
   * Genera templates mágicos por categoría
   */
  static async generateMagicTemplate(
    request: TemplateGenerationRequest
  ): Promise<{
    name: string;
    html: string;
    category: string;
    aiScore: number;
    insights: string;
  }> {
    const prompt = `
    Crea un template de email "mágico" altamente optimizado para conversión:

    PROPÓSITO: ${request.purpose}
    INDUSTRIA: ${request.industry}
    AUDIENCIA: ${request.targetAudience}
    TONO: ${request.brandTone || "profesional"}
    EMPRESA: ${request.companyName || "Tu Empresa"}
    PRODUCTO: ${request.productName || "tu producto/servicio"}

    COLORES BRAND:
    Primary: ${request.brandColors?.primary || "#6366f1"}
    Secondary: ${request.brandColors?.secondary || "#8b5cf6"}

    Crea un template que:
    1. Use neuromarketing y psicología del consumidor
    2. Tenga estructura optimizada para conversión
    3. Incluya elementos de storytelling
    4. Use social proof donde sea apropiado
    5. Tenga CTAs irresistibles
    6. Sea visualmente impactante

    Genera:
    1. Nombre descriptivo del template
    2. HTML completo responsivo
    3. Categoría del template
    4. Score estimado de performance (0-100)
    5. Insights de por qué funcionará

    Responde en JSON:
    {
      "name": "nombre del template",
      "html": "html completo",
      "category": "categoría",
      "aiScore": número,
      "insights": "explicación de por qué funcionará"
    }
    `;

    const response = await callOpenRouter(prompt, "content");

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error("Error generating magic template:", error);
      return {
        name: "Template Generado",
        html: "<h1>Error generando template</h1>",
        category: "general",
        aiScore: 0,
        insights: "Error en generación",
      };
    }
  }

  /**
   * Sugiere el mejor momento para enviar
   */
  static async predictBestSendTime(
    targetAudience: string,
    industry: string,
    timezone: string = "America/Argentina/Buenos_Aires"
  ): Promise<{
    bestDay: string;
    bestTime: string;
    reasoning: string;
    alternatives: Array<{ day: string; time: string; score: number }>;
  }> {
    const prompt = `
    Predice el mejor momento para enviar un email considerando:

    AUDIENCIA: ${targetAudience}
    INDUSTRIA: ${industry}
    TIMEZONE: ${timezone}

    Analiza:
    1. Patrones de comportamiento de esta audiencia
    2. Horarios típicos de trabajo/descanso
    3. Competencia en inbox por día/hora
    4. Mejores prácticas de la industria
    5. Datos históricos de engagement

    Responde en JSON:
    {
      "bestDay": "día de la semana",
      "bestTime": "hora específica",
      "reasoning": "explicación detallada",
      "alternatives": [
        {"day": "día", "time": "hora", "score": número}
      ]
    }
    `;

    const response = await callOpenRouter(prompt, "analytics");

    try {
      return JSON.parse(response);
    } catch (error) {
      console.error("Error predicting send time:", error);
      return {
        bestDay: "Martes",
        bestTime: "10:00 AM",
        reasoning: "Horario estándar de alta apertura",
        alternatives: [],
      };
    }
  }
}
