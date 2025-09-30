# Script de inicio robusto para MailCraft AI
param([string]$EmailDestino = "gimenez.ger@gmail.com")

Write-Host "MailCraft AI - Inicio Robusto" -ForegroundColor Cyan
Write-Host "==============================" -ForegroundColor Cyan

# Establecer directorio correcto
$projectPath = "C:\Users\gimen\OneDrive\Documentos\MailAI\mailcraft-ai"
Write-Host "Configurando directorio: $projectPath" -ForegroundColor Yellow

if (-not (Test-Path $projectPath)) {
    Write-Host "ERROR: Directorio del proyecto no encontrado" -ForegroundColor Red
    exit 1
}

Set-Location $projectPath
Write-Host "Directorio establecido correctamente" -ForegroundColor Green

# Limpiar procesos existentes
Write-Host "Limpiando procesos Node.js existentes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Verificar archivos críticos
$criticalFiles = @("package.json", ".env")
foreach ($file in $criticalFiles) {
    if (-not (Test-Path $file)) {
        Write-Host "ERROR: Archivo crítico no encontrado: $file" -ForegroundColor Red
        exit 1
    }
}
Write-Host "Todos los archivos críticos encontrados" -ForegroundColor Green

# Verificar dependencias
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "ERROR: Fallo al instalar dependencias" -ForegroundColor Red
        exit 1
    }
}

# Build del proyecto
Write-Host "Compilando proyecto..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "ERROR: Fallo en el build" -ForegroundColor Red
    exit 1
}
Write-Host "Build exitoso" -ForegroundColor Green

# Iniciar servidor en background
Write-Host "Iniciando servidor..." -ForegroundColor Yellow
$job = Start-Job -ScriptBlock {
    Set-Location "C:\Users\gimen\OneDrive\Documentos\MailAI\mailcraft-ai"
    npm run dev
}

# Esperar que el servidor esté listo
Write-Host "Esperando que el servidor esté listo..." -ForegroundColor Yellow
$timeout = 30
$elapsed = 0
$serverReady = $false

while ($elapsed -lt $timeout -and -not $serverReady) {
    Start-Sleep -Seconds 1
    $elapsed++
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/test-email" -Method GET -TimeoutSec 2 -ErrorAction SilentlyContinue
        $serverReady = $true
    } catch {
        # Servidor no está listo aún
    }
    
    if ($elapsed % 5 -eq 0) {
        Write-Host "Esperando servidor... ($elapsed/$timeout segundos)" -ForegroundColor Cyan
    }
}

if (-not $serverReady) {
    Write-Host "ERROR: Timeout esperando el servidor" -ForegroundColor Red
    Stop-Job $job
    Remove-Job $job
    exit 1
}

Write-Host "Servidor listo en http://localhost:3000" -ForegroundColor Green

# Probar servicio de email
Write-Host "Probando servicio de email con destino: $EmailDestino" -ForegroundColor Yellow

try {
    # Test conexión
    Write-Host "1. Probando conexión con Zeptomail..." -ForegroundColor Cyan
    $connectionTest = Invoke-RestMethod -Uri "http://localhost:3000/api/email/test" -Method GET -TimeoutSec 10
    
    if ($connectionTest.success -and $connectionTest.connected) {
        Write-Host "Conexión exitosa con Zeptomail" -ForegroundColor Green
    } else {
        Write-Host "ERROR de conexión: $($connectionTest.error)" -ForegroundColor Red
        Write-Host "Servidor disponible en: http://localhost:3000/test-email" -ForegroundColor Yellow
        return
    }
    
    # Test envío email
    Write-Host "2. Enviando email de prueba..." -ForegroundColor Cyan
    
    $body = @{
        action = "test"
        to = $EmailDestino
    } | ConvertTo-Json
    
    $emailTest = Invoke-RestMethod -Uri "http://localhost:3000/api/email/test" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 30
    
    if ($emailTest.success -and $emailTest.result.success) {
        Write-Host "" -ForegroundColor White
        Write-Host "EMAIL ENVIADO EXITOSAMENTE!" -ForegroundColor Green
        Write-Host "Message ID: $($emailTest.result.messageId)" -ForegroundColor White
        Write-Host "Destinatario: $($emailTest.result.recipientEmail)" -ForegroundColor White
        Write-Host "Timestamp: $($emailTest.result.timestamp)" -ForegroundColor White
        Write-Host "" -ForegroundColor White
        Write-Host "PROXIMOS PASOS:" -ForegroundColor Yellow
        Write-Host "1. Revisa tu bandeja de entrada en $EmailDestino" -ForegroundColor Cyan
        Write-Host "2. Si no aparece, revisa la carpeta de SPAM" -ForegroundColor Cyan
        Write-Host "3. El email puede tardar unos minutos en llegar" -ForegroundColor Cyan
        Write-Host "" -ForegroundColor White
        Write-Host "PROCESO COMPLETADO CON EXITO!" -ForegroundColor Green
    } else {
        Write-Host "ERROR enviando email: $($emailTest.error)" -ForegroundColor Red
        if ($emailTest.result.error) {
            Write-Host "Detalle: $($emailTest.result.error)" -ForegroundColor Red
        }
    }
    
} catch {
    Write-Host "ERROR durante el test: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "" -ForegroundColor White
Write-Host "SERVIDOR ACTIVO:" -ForegroundColor Yellow
Write-Host "- Servidor: http://localhost:3000" -ForegroundColor Cyan
Write-Host "- Test Email: http://localhost:3000/test-email" -ForegroundColor Cyan
Write-Host "- AI Tools: http://localhost:3000/test-ai" -ForegroundColor Cyan
Write-Host "" -ForegroundColor White
Write-Host "El servidor seguirá corriendo. Para detenerlo, cierra esta ventana." -ForegroundColor Yellow

# Mantener el script activo para que el servidor siga corriendo
Write-Host "Presiona Ctrl+C para detener el servidor..." -ForegroundColor Gray
try {
    while ($true) {
        Start-Sleep -Seconds 10
        # Verificar que el job sigue activo
        if ((Get-Job -Id $job.Id).State -ne "Running") {
            Write-Host "El servidor se detuvo inesperadamente" -ForegroundColor Red
            break
        }
    }
} catch {
    Write-Host "Deteniendo servidor..." -ForegroundColor Yellow
    Stop-Job $job
    Remove-Job $job
}