const nodemailer = require("nodemailer");
require("dotenv").config();

async function testEmail() {
  console.log("🧪 Probando email directamente...\n");

  // Configuración del transporter
  const transporter = nodemailer.createTransport({
    host: process.env.ZEPTOMAIL_HOST,
    port: parseInt(process.env.ZEPTOMAIL_PORT),
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.ZEPTOMAIL_USER,
      pass: process.env.ZEPTOMAIL_PASS,
    },
  });

  try {
    // 1. Verificar conexión
    console.log("📡 Verificando conexión con Zeptomail...");
    await transporter.verify();
    console.log("✅ Conexión exitosa con Zeptomail\n");

    // 2. Enviar email de prueba
    const emailOptions = {
      from: `${process.env.ZEPTOMAIL_FROM_NAME} <${process.env.ZEPTOMAIL_FROM_EMAIL}>`,
      to: "gimenez.ger@gmail.com",
      subject: "🎉 Test Email - MailCraft AI Funcionando",
      html: `
        <h2>✅ MailCraft AI - Email Test Exitoso</h2>
        <p>Este email confirma que el sistema de email está funcionando correctamente.</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Servicio:</strong> Zeptomail</p>
        <p><strong>Status:</strong> Operacional</p>
        
        <hr>
        <p><small>MailCraft AI - Email Marketing Intelligence</small></p>
      `,
      text: `MailCraft AI - Email Test Exitoso\n\nEste email confirma que el sistema está funcionando.\nTimestamp: ${new Date().toLocaleString()}`,
    };

    console.log("📤 Enviando email de prueba...");
    const result = await transporter.sendMail(emailOptions);
    console.log("✅ Email enviado exitosamente!");
    console.log(`📧 Message ID: ${result.messageId}`);
    console.log(`📬 Destinatario: gimenez.ger@gmail.com`);
    console.log(`📊 Response: ${result.response}`);
  } catch (error) {
    console.error("❌ Error durante el test:", error.message);
    if (error.code) {
      console.error(`🚨 Código de error: ${error.code}`);
    }
    if (error.response) {
      console.error(`📄 Respuesta del servidor: ${error.response}`);
    }
  }
}

testEmail();
