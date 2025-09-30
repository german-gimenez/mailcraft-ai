import { NextRequest, NextResponse } from "next/server";
import { getAIAgentManager } from "@/lib/ai-agents";

// Endpoint público temporal para testing
export async function GET() {
  return NextResponse.json({
    status: "AI Tools Server Running",
    timestamp: new Date().toISOString(),
    endpoints: {
      "POST /api/ai/test-simple": "Test AI agents without auth",
      "POST /api/ai/quick": "Quick AI responses",
      "POST /api/ai/content": "Content generation",
      "POST /api/ai/analytics": "Analytics insights",
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 AI Test endpoint called");

    const { agent, prompt } = await request.json();

    if (!agent || !prompt) {
      return NextResponse.json(
        { error: "Agent and prompt are required" },
        { status: 400 }
      );
    }

    console.log(`🤖 Testing AI Agent: ${agent}`);
    console.log(`📝 Prompt: ${prompt}`);

    const aiManager = getAIAgentManager();
    const response = await aiManager.generateContent(agent, prompt);

    console.log(`✅ Response received from ${agent} agent`);

    return NextResponse.json({
      success: true,
      agent,
      content: response.content,
      model: response.model,
      timestamp: new Date().toISOString(),
      test: true,
    });
  } catch (error: unknown) {
    console.error("❌ AI Test Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to generate AI content",
        details: errorMessage,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
