import { NextResponse } from "next/server";
import { getAIAgentManager } from "@/lib/ai-agents";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    // Verificar autenticación
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const aiManager = getAIAgentManager();
    const results = await aiManager.testAllAgents();

    return NextResponse.json({
      success: true,
      data: {
        agents: results,
        allConnected: Object.values(results).every(Boolean),
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("AI Test API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to test AI agents",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
