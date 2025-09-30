import "dotenv/config";
import { getOpenRouterClient } from "@/lib/openrouter";

async function testOpenRouter() {
  try {
    console.log("🤖 Testing OpenRouter connection...");

    const client = getOpenRouterClient();
    const isConnected = await client.testConnection();

    if (isConnected) {
      console.log("✅ OpenRouter connection successful!");
      return true;
    } else {
      console.log("❌ OpenRouter connection failed");
      return false;
    }
  } catch (error) {
    console.error("❌ OpenRouter test error:", error);
    return false;
  }
}

// Solo ejecutar si se llama directamente
if (require.main === module) {
  testOpenRouter().then((result) => {
    process.exit(result ? 0 : 1);
  });
}

export { testOpenRouter };
