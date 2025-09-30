// Mock implementation for OpenRouter in tests

export const mockOpenRouterClient = {
  generateWithFallback: jest.fn().mockResolvedValue({
    id: "test-id",
    object: "chat.completion",
    created: Date.now(),
    model: "test-model",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: "Mocked AI response",
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 10,
      completion_tokens: 20,
      total_tokens: 30,
    },
  }),
  generateCompletion: jest.fn(),
  testConnection: jest.fn().mockResolvedValue(true),
};

export const getOpenRouterClient = jest.fn(() => mockOpenRouterClient);

export class OpenRouterClient {
  generateWithFallback = mockOpenRouterClient.generateWithFallback;
  generateCompletion = mockOpenRouterClient.generateCompletion;
  testConnection = mockOpenRouterClient.testConnection;
}
