import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";

// Type for webhook event
interface WebhookEvent {
  type: string;
  data: Record<string, unknown>;
}

// Type for organization data
interface OrganizationData {
  id: string;
  name: string;
  [key: string]: unknown;
}

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!webhookSecret) {
    console.error("CLERK_WEBHOOK_SECRET is not set");
    return NextResponse.json(
      { error: "Server configuration error" },
      { status: 500 }
    );
  }

  // Get headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // Verify headers exist
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing svix headers");
    return NextResponse.json(
      { error: "Missing svix headers" },
      { status: 400 }
    );
  }

  let payload: string;

  try {
    payload = await req.text();
  } catch (error) {
    console.error("Error reading request payload:", error);
    return NextResponse.json(
      { error: "Invalid request payload" },
      { status: 400 }
    );
  }

  // Verify webhook signature
  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    evt = wh.verify(payload, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (error) {
    console.error("Webhook verification failed:", error);
    return NextResponse.json(
      { error: "Invalid webhook signature" },
      { status: 400 }
    );
  }

  // Handle the webhook event
  const { type, data } = evt;

  try {
    if (type === "organization.created") {
      await handleOrganizationCreated(data as OrganizationData);
    } else {
      console.log(`Unhandled webhook event type: ${type}`);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

async function handleOrganizationCreated(data: OrganizationData) {
  const { id: clerkOrgId, name } = data;

  if (!clerkOrgId || !name) {
    throw new Error("Missing required organization data");
  }

  try {
    // Check if organization already exists
    const existingOrg = await db.organization.findUnique({
      where: { clerkOrgId },
    });

    if (existingOrg) {
      console.log(`Organization ${clerkOrgId} already exists`);
      return;
    }

    // Create organization and subscription in a transaction
    await db.$transaction(async (tx) => {
      // Create organization
      const organization = await tx.organization.create({
        data: {
          clerkOrgId,
          name,
        },
      });

      // Create default subscription
      await tx.subscription.create({
        data: {
          organizationId: organization.id,
          plan: "FREE",
          status: "ACTIVE",
          emailLimit: 500,
          contactLimit: 100,
          emailsUsed: 0,
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        },
      });

      console.log(
        `Organization ${name} (${clerkOrgId}) created successfully with FREE subscription`
      );
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    throw error;
  }
}
