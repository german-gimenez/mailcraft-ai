// Simple test script para email - versión JavaScript
// Usar: node test-email-simple.js

const https = require("http");

const emailDestino = process.argv[2] || "gimenez.ger@gmail.com";

console.log("🧪 Probando servicio de email...");
console.log(`📧 Email destino: ${emailDestino}`);

// Test 1: Verificar conexión
console.log("\n📡 1. Probando conexión...");

const testConnection = () => {
  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/email/test",
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (err) {
            reject(new Error("Invalid JSON response"));
          }
        });
      }
    );

    req.on("error", (err) => {
      reject(err);
    });

    req.end();
  });
};

const sendTestEmail = (email) => {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify({
      action: "test",
      to: email,
    });

    const req = https.request(
      {
        hostname: "localhost",
        port: 3000,
        path: "/api/email/test",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(postData),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            const result = JSON.parse(data);
            resolve(result);
          } catch (err) {
            reject(new Error("Invalid JSON response"));
          }
        });
      }
    );

    req.on("error", (err) => {
      reject(err);
    });

    req.write(postData);
    req.end();
  });
};

// Ejecutar tests
async function runTests() {
  try {
    // Test conexión
    const connectionResult = await testConnection();

    if (connectionResult.success && connectionResult.connected) {
      console.log("✅ Conexión exitosa con Zeptomail");
    } else {
      console.log(
        "❌ Error de conexión:",
        connectionResult.error || "Desconocido"
      );
      return;
    }

    console.log("\n📤 2. Enviando email de prueba...");

    // Test envío
    const emailResult = await sendTestEmail(emailDestino);

    if (emailResult.success) {
      console.log("✅ Email enviado exitosamente!");
      console.log(`📨 Message ID: ${emailResult.result.messageId}`);
      console.log(`🕐 Timestamp: ${emailResult.result.timestamp}`);
      console.log(
        `\n📬 Revisa tu bandeja de entrada (y spam) en: ${emailDestino}`
      );
    } else {
      console.log("❌ Error enviando email:", emailResult.error);
    }
  } catch (error) {
    console.log("❌ Error durante el test:", error.message);
    console.log(
      "🔍 Asegúrate de que el servidor esté corriendo en http://localhost:3000"
    );
  }
}

runTests();
