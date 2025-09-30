import { NextRequest, NextResponse } from "next/server";
import { getAIAgentManager } from "@/lib/ai-agents";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticación
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const aiManager = getAIAgentManager();
    const response = await aiManager.quickSuggestion(prompt);

    return NextResponse.json({
      success: true,
      data: response,
    });
  } catch (error) {
    console.error("Speed Agent API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate quick suggestion",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
