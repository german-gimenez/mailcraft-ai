import nodemailer from "nodemailer";
import { Contact } from "@prisma/client";

// Types para el servicio de email
export interface EmailConfig {
  to: string;
  from?: string;
  fromName?: string;
  subject: string;
  html: string;
  text?: string;
  templateId?: string;
  campaignId?: string;
  tags?: string[];
  trackingId?: string;
}

export interface EmailSendResult {
  success: boolean;
  messageId?: string;
  error?: string;
  recipientEmail: string;
  campaignId?: string;
  timestamp: string;
}

export interface BulkEmailJob {
  campaignId: string;
  templateId: string;
  recipients: Contact[];
  subject: string;
  fromEmail?: string;
  fromName?: string;
  scheduledAt?: Date;
}

export class ZeptomailService {
  private transporter: nodemailer.Transporter;
  private fromEmail: string;
  private fromName: string;

  constructor() {
    this.fromEmail = process.env.ZEPTOMAIL_FROM_EMAIL || "noreply@mailcraft.ai";
    this.fromName = process.env.ZEPTOMAIL_FROM_NAME || "MailCraft AI";

    // Configuración del transporter para Zeptomail
    this.transporter = nodemailer.createTransport({
      host: process.env.ZEPTOMAIL_HOST || "smtp.zeptomail.com",
      port: parseInt(process.env.ZEPTOMAIL_PORT || "587"),
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.ZEPTOMAIL_USER || "emailapikey",
        pass: process.env.ZEPTOMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  /**
   * Envía un email individual
   */
  async sendEmail(config: EmailConfig): Promise<EmailSendResult> {
    const startTime = Date.now();

    try {
      // Generar tracking ID único si no se proporciona
      const trackingId =
        config.trackingId ||
        `track_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      // Configurar el email
      const mailOptions = {
        from: `"${config.fromName || this.fromName}" <${
          config.from || this.fromEmail
        }>`,
        to: config.to,
        subject: config.subject,
        html: this.addTrackingPixel(config.html, trackingId),
        text: config.text,
        headers: {
          "X-Campaign-ID": config.campaignId || "direct",
          "X-Template-ID": config.templateId || "none",
          "X-Tracking-ID": trackingId,
          "X-Tags": config.tags?.join(",") || "general",
        },
      };

      console.log(`📧 Enviando email a ${config.to}...`);

      const info = await this.transporter.sendMail(mailOptions);

      const endTime = Date.now();
      console.log(
        `✅ Email enviado exitosamente a ${config.to} en ${
          endTime - startTime
        }ms`
      );
      console.log(`📨 Message ID: ${info.messageId}`);

      return {
        success: true,
        messageId: info.messageId,
        recipientEmail: config.to,
        campaignId: config.campaignId,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(`❌ Error enviando email a ${config.to}:`, error);

      return {
        success: false,
        error: error instanceof Error ? error.message : "Error desconocido",
        recipientEmail: config.to,
        campaignId: config.campaignId,
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Envía emails en bulk con rate limiting
   */
  async sendBulkEmails(
    job: BulkEmailJob,
    onProgress?: (sent: number, total: number) => void
  ): Promise<EmailSendResult[]> {
    const results: EmailSendResult[] = [];
    const total = job.recipients.length;

    console.log(
      `🚀 Iniciando envío bulk: ${total} emails para campaña ${job.campaignId}`
    );

    // Rate limiting: máximo 10 emails por segundo
    const batchSize = 10;
    const delayBetweenBatches = 1000; // 1 segundo

    for (let i = 0; i < job.recipients.length; i += batchSize) {
      const batch = job.recipients.slice(i, i + batchSize);

      // Procesar batch en paralelo
      const batchPromises = batch.map(async (contact) => {
        // Personalizar el subject con el nombre del contacto si existe
        const personalizedSubject = job.subject.replace(
          "{{name}}",
          contact.firstName || contact.email
        );

        return this.sendEmail({
          to: contact.email,
          subject: personalizedSubject,
          html: `<p>Email content for template ${job.templateId}</p>`,
          from: job.fromEmail,
          fromName: job.fromName,
          campaignId: job.campaignId,
          templateId: job.templateId,
          tags: ["bulk", "campaign"],
        });
      });

      const batchResults = await Promise.allSettled(batchPromises);

      // Procesar resultados del batch
      batchResults.forEach((result) => {
        if (result.status === "fulfilled") {
          results.push(result.value);
        } else {
          console.error("❌ Error en batch:", result.reason);
          results.push({
            success: false,
            error: result.reason?.message || "Error en batch",
            recipientEmail: "unknown",
            campaignId: job.campaignId,
            timestamp: new Date().toISOString(),
          });
        }
      });

      // Callback de progreso
      if (onProgress) {
        onProgress(results.length, total);
      }

      console.log(`📊 Progreso: ${results.length}/${total} emails procesados`);

      // Delay entre batches para respetar rate limits
      if (i + batchSize < job.recipients.length) {
        await new Promise((resolve) =>
          setTimeout(resolve, delayBetweenBatches)
        );
      }
    }

    const successCount = results.filter((r) => r.success).length;
    const errorCount = results.filter((r) => !r.success).length;

    console.log(`📈 Envío bulk completado:`);
    console.log(`✅ Exitosos: ${successCount}`);
    console.log(`❌ Errores: ${errorCount}`);

    return results;
  }

  /**
   * Agrega pixel de tracking al HTML
   */
  private addTrackingPixel(html: string, trackingId: string): string {
    const trackingPixel = `<img src="${
      process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
    }/api/tracking/open/${trackingId}" width="1" height="1" style="display:none;" alt=""/>`;

    // Intentar insertar antes del </body>, si no existe, al final
    if (html.includes("</body>")) {
      return html.replace("</body>", `${trackingPixel}</body>`);
    } else {
      return html + trackingPixel;
    }
  }

  /**
   * Verifica la conexión con Zeptomail
   */
  async testConnection(): Promise<boolean> {
    try {
      console.log("🔍 Verificando conexión con Zeptomail...");
      await this.transporter.verify();
      console.log("✅ Conexión con Zeptomail exitosa");
      return true;
    } catch (error) {
      console.error("❌ Error de conexión con Zeptomail:", error);
      return false;
    }
  }

  /**
   * Envía un email de prueba
   */
  async sendTestEmail(to: string): Promise<EmailSendResult> {
    return this.sendEmail({
      to,
      subject: "🧪 Test Email desde MailCraft AI",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <h1 style="color: #4F46E5;">¡Email de Prueba Exitoso!</h1>
          <p>Este es un email de prueba enviado desde MailCraft AI.</p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
          <p><strong>Servicio:</strong> Zeptomail</p>
          <div style="background: #F3F4F6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Detalles del Test:</h3>
            <ul>
              <li>✅ Conexión SMTP establecida</li>
              <li>✅ Autenticación exitosa</li>
              <li>✅ Email enviado correctamente</li>
            </ul>
          </div>
          <p style="color: #6B7280; font-size: 14px;">
            Este email fue generado automáticamente por MailCraft AI para verificar la configuración de email.
          </p>
        </div>
      `,
      text: "Email de prueba exitoso desde MailCraft AI",
      tags: ["test", "verification"],
    });
  }
}

// Singleton instance
let zeptomailInstance: ZeptomailService | null = null;

export function getZeptomailService(): ZeptomailService {
  if (!zeptomailInstance) {
    zeptomailInstance = new ZeptomailService();
  }
  return zeptomailInstance;
}

// Función de utilidad para validar email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Función para sanitizar HTML
export function sanitizeEmailHtml(html: string): string {
  // Remover scripts y elementos peligrosos
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
    .replace(/href\s*=\s*["']javascript:[^"']*["']/gi, 'href=""')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, "");
}
