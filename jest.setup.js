import "@testing-library/jest-dom";

// Mock Next.js router
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      back: jest.fn(),
    };
  },
  usePathname() {
    return "";
  },
  useSearchParams() {
    return new URLSearchParams();
  },
}));

// Mock Clerk
jest.mock("@clerk/nextjs/server", () => ({
  auth: jest.fn(() => Promise.resolve({ userId: "test-user" })),
  currentUser: jest.fn(() => Promise.resolve({ id: "test-user" })),
}));

// Variables de entorno para tests
process.env.OPENROUTER_API_KEY = "test-key";

// Mock del módulo OpenRouter - activamos los mocks automáticos
jest.mock("./lib/openrouter");
process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "test-key";
process.env.CLERK_SECRET_KEY = "test-key";
