# Guía de Deployment en Vercel

## 🚀 Pasos para Deploy Automático

### 1. Subir a GitHub (COMPLETADO ✅)

### 2. Deploy en Vercel

#### Opción A: Deploy desde GitHub (Recomendado)

1. Ve a [vercel.com](https://vercel.com)
2. Haz clic en "New Project"
3. Conecta tu cuenta de GitHub si no lo has hecho
4. Busca el repositorio "mailcraft-ai"
5. Haz clic en "Import"

#### Configuración Automática de Vercel:

- ✅ Framework: Next.js (detectado automáticamente)
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

#### Variables de Entorno en Vercel:

Configura estas variables en el dashboard de Vercel:

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=tu_key_aqui
CLERK_SECRET_KEY=tu_secret_aqui
OPENROUTER_API_KEY=tu_api_key_aqui
ZOHO_MAIL_USER=tu_email@dominio.com
ZOHO_MAIL_PASS=tu_password
DATABASE_URL=file:./dev.db
NEXT_PUBLIC_APP_URL=https://tu-app.vercel.app
```

## ⚡ Deploy Instantáneo

### Opción B: Deploy directo con CLI

```bash
npx vercel
# Sigue las instrucciones interactivas
```

## 🔄 Auto-Deploy

Una vez configurado, cada push a la rama `main` desplegará automáticamente.

## 🔗 URL de Producción

Tu app estará disponible en: `https://mailcraft-ai-[random].vercel.app`

## ✅ Checklist Post-Deploy

- [ ] Verificar que todas las páginas cargan
- [ ] Probar autenticación con Clerk
- [ ] Probar funcionalidades AI
- [ ] Verificar envío de emails
- [ ] Configurar dominio personalizado (opcional)
