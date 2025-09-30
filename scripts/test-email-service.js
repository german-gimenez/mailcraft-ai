// Script para probar el servicio de email directamente
const { getZeptomailService } = require("../lib/email-service");

async function testEmailService() {
  console.log("🧪 Iniciando test del servicio de email...\n");

  try {
    const emailService = getZeptomailService();

    // Test 1: Conexión
    console.log("📡 1. Probando conexión con Zeptomail...");
    const isConnected = await emailService.testConnection();
    console.log(
      `   ${isConnected ? "✅" : "❌"} Conexión: ${
        isConnected ? "exitosa" : "fallida"
      }\n`
    );

    if (!isConnected) {
      console.log(
        "❌ No se puede continuar sin conexión. Verifica la configuración."
      );
      return;
    }

    // Test 2: Email de prueba
    const testRecipient = process.argv[2] || "test@example.com";
    console.log(`📧 2. Enviando email de prueba a: ${testRecipient}`);

    const result = await emailService.sendTestEmail(testRecipient);

    if (result.success) {
      console.log("   ✅ Email enviado exitosamente!");
      console.log(`   📨 Message ID: ${result.messageId}`);
      console.log(`   🕐 Timestamp: ${result.timestamp}\n`);
    } else {
      console.log("   ❌ Error enviando email:");
      console.log(`   📝 Error: ${result.error}\n`);
    }

    // Test 3: Email personalizado
    console.log("✉️ 3. Probando email personalizado...");

    const customResult = await emailService.sendEmail({
      to: testRecipient,
      subject: "🎯 Test Email Personalizado - MailCraft AI",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; background: #f9fafb; padding: 40px 20px;">
          <div style="background: white; border-radius: 10px; padding: 30px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            <h1 style="color: #4F46E5; margin-bottom: 20px; text-align: center;">🚀 MailCraft AI</h1>
            <h2 style="color: #374151; margin-bottom: 15px;">Email Service Test Exitoso!</h2>
            <p style="color: #6B7280; line-height: 1.6;">
              Este es un email de prueba personalizado enviado desde MailCraft AI para verificar 
              que el servicio de email está funcionando correctamente.
            </p>
            <div style="background: #EFF6FF; border-left: 4px solid #3B82F6; padding: 15px; margin: 20px 0;">
              <h3 style="color: #1E40AF; margin: 0 0 10px 0;">✅ Funcionalidades Verificadas:</h3>
              <ul style="color: #374151; margin: 0; padding-left: 20px;">
                <li>Conexión SMTP con Zeptomail</li>
                <li>Envío de emails HTML</li>
                <li>Tracking pixel integrado</li>
                <li>Configuración de headers personalizados</li>
              </ul>
            </div>
            <p style="color: #6B7280; font-size: 14px; text-align: center; margin-top: 30px;">
              🕐 Enviado el: ${new Date().toLocaleString()}<br>
              🏷️ Powered by MailCraft AI
            </p>
          </div>
        </div>
      `,
      text: "Email Service Test Exitoso! - Este es un email de prueba desde MailCraft AI.",
      tags: ["test", "custom", "verification"],
    });

    if (customResult.success) {
      console.log("   ✅ Email personalizado enviado!");
      console.log(`   📨 Message ID: ${customResult.messageId}\n`);
    } else {
      console.log("   ❌ Error enviando email personalizado:");
      console.log(`   📝 Error: ${customResult.error}\n`);
    }

    console.log("🎉 Test del servicio de email completado!");
    console.log(
      "📬 Revisa tu bandeja de entrada (y spam) para ver los emails."
    );
  } catch (error) {
    console.error("❌ Error durante el test:", error);
  }
}

// Ejecutar solo si se llama directamente
if (require.main === module) {
  testEmailService()
    .then(() => {
      console.log("\n✨ Script completado. Saliendo...");
      process.exit(0);
    })
    .catch((error) => {
      console.error("\n💥 Error fatal:", error);
      process.exit(1);
    });
}

module.exports = { testEmailService };
