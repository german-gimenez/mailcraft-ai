import { NextRequest, NextResponse } from "next/server";
import {
  getZeptomailService,
  isValidEmail,
} from "../../../../lib/email-service";

export async function GET() {
  try {
    const emailService = getZeptomailService();
    const isConnected = await emailService.testConnection();

    return NextResponse.json({
      success: true,
      connected: isConnected,
      service: "Zeptomail",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, to, subject, html, text } = body;

    const emailService = getZeptomailService();

    if (action === "test") {
      if (!to || !isValidEmail(to)) {
        return NextResponse.json(
          {
            success: false,
            error: "Email destinatario requerido y válido",
          },
          { status: 400 }
        );
      }

      const result = await emailService.sendTestEmail(to);

      return NextResponse.json({
        success: true,
        result,
        timestamp: new Date().toISOString(),
      });
    }

    if (action === "send") {
      if (!to || !isValidEmail(to)) {
        return NextResponse.json(
          {
            success: false,
            error: "Email destinatario requerido y válido",
          },
          { status: 400 }
        );
      }

      if (!subject || !html) {
        return NextResponse.json(
          {
            success: false,
            error: "Subject y HTML son requeridos",
          },
          { status: 400 }
        );
      }

      const result = await emailService.sendEmail({
        to,
        subject,
        html,
        text,
        tags: ["api", "custom"],
      });

      return NextResponse.json({
        success: true,
        result,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Acción no válida. Use "test" o "send"',
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error en email API:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Error interno del servidor",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
