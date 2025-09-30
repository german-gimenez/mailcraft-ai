import axios from "axios";

// Types para OpenRouter
export interface OpenRouterMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface OpenRouterRequest {
  model: string;
  messages: OpenRouterMessage[];
  temperature?: number;
  max_tokens?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
  stream?: boolean;
}

export interface OpenRouterResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface AIAgentConfig {
  name: string;
  model: string;
  specialty: string;
  temperature: number;
  max_tokens: number;
  systemPrompt: string;
  fallbacks: string[];
}

export class OpenRouterClient {
  private apiKey: string;
  private baseURL = "https://openrouter.ai/api/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateCompletion(
    request: OpenRouterRequest
  ): Promise<OpenRouterResponse> {
    try {
      const response = await axios.post(
        `${this.baseURL}/chat/completions`,
        request,
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer":
              process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
            "X-Title": "MailCraft AI",
          },
        }
      );

      return response.data as OpenRouterResponse;
    } catch (error) {
      console.error("OpenRouter API Error:", error);
      throw new Error(
        `OpenRouter request failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }

  async generateWithFallback(
    messages: OpenRouterMessage[],
    primaryModel: string,
    fallbackModels: string[] = [],
    options: Partial<OpenRouterRequest> = {}
  ): Promise<OpenRouterResponse> {
    const modelsToTry = [primaryModel, ...fallbackModels];

    for (const model of modelsToTry) {
      try {
        console.log(`Trying model: ${model}`);

        const request: OpenRouterRequest = {
          model,
          messages,
          temperature: 0.7,
          max_tokens: 1000,
          ...options,
        };

        const response = await this.generateCompletion(request);
        console.log(`Success with model: ${model}`);
        return response;
      } catch (error) {
        console.error(`Model ${model} failed:`, error);

        // Si es el último modelo, lanzar el error
        if (model === modelsToTry[modelsToTry.length - 1]) {
          throw error;
        }

        // Continuar con el siguiente modelo
        continue;
      }
    }

    throw new Error("All models failed");
  }

  async testConnection(): Promise<boolean> {
    try {
      const testResponse = await this.generateCompletion({
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "user", content: "Hello! Just testing the connection." },
        ],
        max_tokens: 10,
      });

      return !!testResponse.choices?.[0]?.message?.content;
    } catch (error) {
      console.error("OpenRouter connection test failed:", error);
      return false;
    }
  }
}

// Singleton instance
let openRouterInstance: OpenRouterClient | null = null;

export function getOpenRouterClient(): OpenRouterClient {
  if (!openRouterInstance) {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      throw new Error("OPENROUTER_API_KEY environment variable is required");
    }
    openRouterInstance = new OpenRouterClient(apiKey);
  }
  return openRouterInstance;
}
