import { NextResponse } from "next/server";
import { AICampaignService } from "@/lib/ai-campaigns";

export async function POST(request: Request) {
  try {
    const { subject, content, targetAudience, industry } = await request.json();

    if (!subject || !content || !targetAudience || !industry) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const insights = await AICampaignService.analyzeCampaignPerformance(
      subject,
      content,
      targetAudience,
      industry
    );

    return NextResponse.json({
      success: true,
      insights,
    });
  } catch (error) {
    console.error("Error analyzing campaign:", error);
    return NextResponse.json(
      { error: "Failed to analyze campaign" },
      { status: 500 }
    );
  }
}
