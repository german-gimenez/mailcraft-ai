import { NextResponse } from "next/server";
import { AICampaignService } from "@/lib/ai-campaigns";

export async function POST(request: Request) {
  try {
    const { campaignIdea, brandKit, companyName } = await request.json();

    if (!campaignIdea) {
      return NextResponse.json(
        { error: "Missing campaignIdea" },
        { status: 400 }
      );
    }

    const htmlContent = await AICampaignService.generateEmailHTML(
      campaignIdea,
      brandKit,
      companyName
    );

    return NextResponse.json({
      success: true,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Error generating email HTML:", error);
    return NextResponse.json(
      { error: "Failed to generate email HTML" },
      { status: 500 }
    );
  }
}
