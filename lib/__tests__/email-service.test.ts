// Tests para el servicio de email
import {
  getZeptomailService,
  isValidEmail,
  sanitizeEmailHtml,
} from "../email-service";

describe("Email Service", () => {
  describe("Validación de email", () => {
    it("should validate correct email addresses", () => {
      expect(isValidEmail("test@example.com")).toBe(true);
      expect(isValidEmail("user.name@domain.co.uk")).toBe(true);
      expect(isValidEmail("user+label@domain.com")).toBe(true);
    });

    it("should reject invalid email addresses", () => {
      expect(isValidEmail("invalid-email")).toBe(false);
      expect(isValidEmail("test@")).toBe(false);
      expect(isValidEmail("@domain.com")).toBe(false);
      expect(isValidEmail("")).toBe(false);
    });
  });

  describe("Sanitización de HTML", () => {
    it("should remove script tags", () => {
      const input = '<p>Safe content</p><script>alert("dangerous")</script>';
      const output = sanitizeEmailHtml(input);
      expect(output).toBe("<p>Safe content</p>");
    });

    it("should remove iframe tags", () => {
      const input = '<p>Content</p><iframe src="malicious.com"></iframe>';
      const output = sanitizeEmailHtml(input);
      expect(output).toBe("<p>Content</p>");
    });

    it("should remove javascript: links", () => {
      const input = '<a href="javascript:alert()">Link</a>';
      const output = sanitizeEmailHtml(input);
      expect(output).toBe('<a href="">Link</a>');
    });

    it("should remove event handlers", () => {
      const input = '<button onclick="alert()">Click</button>';
      const output = sanitizeEmailHtml(input);
      expect(output).not.toContain("onclick");
      expect(output).toContain("Click");
    });
  });

  describe("Servicio Zeptomail", () => {
    it("should create service instance", () => {
      const service = getZeptomailService();
      expect(service).toBeDefined();
      expect(service.sendEmail).toBeDefined();
      expect(service.testConnection).toBeDefined();
    });

    it("should be singleton", () => {
      const service1 = getZeptomailService();
      const service2 = getZeptomailService();
      expect(service1).toBe(service2);
    });
  });
});
