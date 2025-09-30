import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Solucionar warning de múltiples lockfiles
  outputFileTracingRoot: __dirname,

  // Configuración de ESLint más permisiva durante desarrollo
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["app", "components", "lib"],
  },

  // TypeScript más estricto
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
