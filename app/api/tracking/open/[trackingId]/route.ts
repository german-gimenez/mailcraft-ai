import { NextRequest, NextResponse } from "next/server";

// Imagen de pixel transparente en base64
const TRACKING_PIXEL =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ trackingId: string }> }
) {
  const { trackingId } = await params;

  try {
    // Log del tracking (aquí puedes guardar en base de datos)
    console.log(`📊 Email abierto - Tracking ID: ${trackingId}`);
    console.log(`🕐 Timestamp: ${new Date().toISOString()}`);
    console.log(`🌍 User Agent: ${request.headers.get("user-agent")}`);
    console.log(
      `📍 IP: ${
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "unknown"
      }`
    );

    // TODO: Guardar en base de datos el evento de apertura
    // await db.emailTracking.create({
    //   data: {
    //     trackingId,
    //     eventType: 'OPENED',
    //     timestamp: new Date(),
    //     userAgent: request.headers.get('user-agent'),
    //     ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip')
    //   }
    // });

    // Retornar imagen pixel transparente
    const pixelBuffer = Buffer.from(TRACKING_PIXEL, "base64");

    return new NextResponse(pixelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Content-Length": pixelBuffer.length.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    });
  } catch (error) {
    console.error("Error en tracking de email:", error);

    // Aún en caso de error, devolver el pixel para no romper el email
    const pixelBuffer = Buffer.from(TRACKING_PIXEL, "base64");
    return new NextResponse(pixelBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  }
}
