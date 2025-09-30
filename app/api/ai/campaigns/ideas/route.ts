import { NextResponse } from "next/server";
import { AICampaignService } from "@/lib/ai-campaigns";

export async function POST(request: Request) {
  try {
    const { purpose, industry, targetAudience, brandInfo } =
      await request.json();

    if (!purpose || !industry || !targetAudience) {
      return NextResponse.json(
        { error: "Missing required fields: purpose, industry, targetAudience" },
        { status: 400 }
      );
    }

    const campaignIdeas = await AICampaignService.generateCampaignIdeas(
      purpose,
      industry,
      targetAudience,
      brandInfo
    );

    return NextResponse.json({
      success: true,
      ideas: campaignIdeas,
      count: campaignIdeas.length,
    });
  } catch (error) {
    console.error("Error generating campaign ideas:", error);
    return NextResponse.json(
      { error: "Failed to generate campaign ideas" },
      { status: 500 }
    );
  }
}
