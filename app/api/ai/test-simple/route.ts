import { NextRequest, NextResponse } from "next/server";
import { getAIAgentManager } from "@/lib/ai-agents";

export async function POST(request: NextRequest) {
  try {
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

    console.log(
      `✅ Response received: ${response.content.substring(0, 100)}...`
    );

    return NextResponse.json({
      success: true,
      agent,
      content: response.content,
      model: response.model,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error("❌ AI Test Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      {
        error: "Failed to generate AI content",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}
