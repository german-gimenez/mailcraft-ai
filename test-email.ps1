# Script PowerShell para probar el email service
# Uso: .\test-email.ps1 gimenez.ger@gmail.com

param(
    [Parameter(Mandatory=$true)]
    [string]$EmailDestino
)

Write-Host "🧪 Probando servicio de email..." -ForegroundColor Yellow
Write-Host "📧 Email destino: $EmailDestino" -ForegroundColor Cyan

# Test 1: Verificar conexión
Write-Host "`n📡 1. Probando conexión..." -ForegroundColor Yellow

try {
    $conexion = Invoke-RestMethod -Uri "http://localhost:3000/api/email/test" -Method GET -ContentType "application/json"
    
    if ($conexion.success -and $conexion.connected) {
        Write-Host "✅ Conexión exitosa con Zeptomail" -ForegroundColor Green
    } else {
        Write-Host "❌ Error de conexión: $($conexion.error)" -ForegroundColor Red
        exit 1
    }
} catch {
    Write-Host "❌ Error al conectar con la API: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Test 2: Enviar email de prueba
Write-Host "`n📤 2. Enviando email de prueba..." -ForegroundColor Yellow

$emailData = @{
    action = "test"
    to = $EmailDestino
} | ConvertTo-Json

try {
    $resultado = Invoke-RestMethod -Uri "http://localhost:3000/api/email/test" -Method POST -Body $emailData -ContentType "application/json"
    
    if ($resultado.success) {
        Write-Host "✅ Email enviado exitosamente!" -ForegroundColor Green
        Write-Host "📨 Message ID: $($resultado.result.messageId)" -ForegroundColor Cyan
        Write-Host "🕐 Timestamp: $($resultado.result.timestamp)" -ForegroundColor Cyan
        Write-Host "`n📬 Revisa tu bandeja de entrada (y spam) en: $EmailDestino" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Error enviando email: $($resultado.error)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Error en la solicitud: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "🔍 Detalles: $($_.Exception.Response.StatusCode)" -ForegroundColor Red
}

Write-Host "`n✨ Test completado." -ForegroundColor Green