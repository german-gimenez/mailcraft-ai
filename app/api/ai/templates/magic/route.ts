import { NextResponse } from "next/server";
import { AICampaignService } from "@/lib/ai-campaigns";

export async function POST(request: Request) {
  try {
    const templateRequest = await request.json();

    if (
      !templateRequest.purpose ||
      !templateRequest.industry ||
      !templateRequest.targetAudience
    ) {
      return NextResponse.json(
        { error: "Missing required fields: purpose, industry, targetAudience" },
        { status: 400 }
      );
    }

    const magicTemplate = await AICampaignService.generateMagicTemplate(
      templateRequest
    );

    return NextResponse.json({
      success: true,
      template: magicTemplate,
    });
  } catch (error) {
    console.error("Error generating magic template:", error);
    return NextResponse.json(
      { error: "Failed to generate magic template" },
      { status: 500 }
    );
  }
}
