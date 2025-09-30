# Script de inicio robusto para MailCraft AI
# Este script asegura que todo esté configurado correctamente

param(
    [switch]$Force = $false
)

# Colores para output
$ErrorColor = "Red"
$SuccessColor = "Green"
$InfoColor = "Cyan"
$WarningColor = "Yellow"

Write-Host "🚀 MailCraft AI - Inicio Robusto" -ForegroundColor $InfoColor
Write-Host "=================================" -ForegroundColor $InfoColor

# Función para verificar y cambiar directorio
function Set-ProjectDirectory {
    $projectPath = "C:\Users\gimen\OneDrive\Documentos\MailAI\mailcraft-ai"
    
    Write-Host "`n📁 Verificando directorio del proyecto..." -ForegroundColor $InfoColor
    
    if (-not (Test-Path $projectPath)) {
        Write-Host "❌ Directorio del proyecto no encontrado: $projectPath" -ForegroundColor $ErrorColor
        exit 1
    }
    
    Set-Location $projectPath -ErrorAction Stop
    $currentDir = Get-Location
    Write-Host "✅ Directorio establecido: $currentDir" -ForegroundColor $SuccessColor
    
    # Verificar archivos críticos
    $criticalFiles = @("package.json", ".env", "next.config.ts")
    foreach ($file in $criticalFiles) {
        if (-not (Test-Path $file)) {
            Write-Host "❌ Archivo crítico no encontrado: $file" -ForegroundColor $ErrorColor
            exit 1
        }
    }
    Write-Host "✅ Todos los archivos críticos encontrados" -ForegroundColor $SuccessColor
}

# Función para limpiar procesos
function Stop-ExistingProcesses {
    Write-Host "`n🧹 Limpiando procesos existentes..." -ForegroundColor $InfoColor
    
    try {
        Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
        Write-Host "✅ Procesos Node.js limpiados" -ForegroundColor $SuccessColor
    } catch {
        Write-Host "⚠️ No hay procesos Node.js para limpiar" -ForegroundColor $WarningColor
    }
    
    # Esperar un momento para que los puertos se liberen
    Start-Sleep -Seconds 2
}

# Función para verificar dependencias
function Test-Dependencies {
    Write-Host "`n📦 Verificando dependencias..." -ForegroundColor $InfoColor
    
    if (-not (Test-Path "node_modules")) {
        Write-Host "⚠️ node_modules no encontrado. Instalando dependencias..." -ForegroundColor $WarningColor
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Error instalando dependencias" -ForegroundColor $ErrorColor
            exit 1
        }
    }
    Write-Host "✅ Dependencias verificadas" -ForegroundColor $SuccessColor
}

# Función para verificar build
function Test-Build {
    Write-Host "`n🔨 Verificando build del proyecto..." -ForegroundColor $InfoColor
    
    npm run build
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Error en el build del proyecto" -ForegroundColor $ErrorColor
        exit 1
    }
    Write-Host "✅ Build exitoso" -ForegroundColor $SuccessColor
}

# Función para iniciar servidor
function Start-Server {
    Write-Host "`n🌐 Iniciando servidor de desarrollo..." -ForegroundColor $InfoColor
    
    # Crear un job para el servidor
    $job = Start-Job -ScriptBlock {
        Set-Location "C:\Users\gimen\OneDrive\Documentos\MailAI\mailcraft-ai"
        npm run dev
    }
    
    Write-Host "✅ Servidor iniciado (Job ID: $($job.Id))" -ForegroundColor $SuccessColor
    Write-Host "🔄 Esperando que el servidor esté listo..." -ForegroundColor $InfoColor
    
    # Esperar a que el servidor esté listo
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
            # Servidor aún no está listo
        }
        
        if ($elapsed % 5 -eq 0) {
            Write-Host "⏳ Esperando servidor... ($elapsed/$timeout segundos)" -ForegroundColor $WarningColor
        }
    }
    
    if ($serverReady) {
        Write-Host "✅ Servidor listo en http://localhost:3000" -ForegroundColor $SuccessColor
        return $job.Id
    } else {
        Write-Host "❌ Timeout esperando el servidor" -ForegroundColor $ErrorColor
        Stop-Job $job
        Remove-Job $job
        exit 1
    }
}

# Función para probar email
function Test-EmailService {
    param([string]$EmailDestino = "gimenez.ger@gmail.com")
    
    Write-Host "`n📧 Probando servicio de email..." -ForegroundColor $InfoColor
    Write-Host "📬 Email destino: $EmailDestino" -ForegroundColor $InfoColor
    
    try {
        # Test 1: Conexión
        Write-Host "`n1️⃣ Probando conexión con Zeptomail..." -ForegroundColor $InfoColor
        $connectionTest = Invoke-RestMethod -Uri "http://localhost:3000/api/email/test" -Method GET -TimeoutSec 10
        
        if ($connectionTest.success -and $connectionTest.connected) {
            Write-Host "✅ Conexión exitosa con Zeptomail" -ForegroundColor $SuccessColor
        } else {
            Write-Host "❌ Error de conexión: $($connectionTest.error)" -ForegroundColor $ErrorColor
            return $false
        }
        
        # Test 2: Envío de email
        Write-Host "`n2️⃣ Enviando email de prueba..." -ForegroundColor $InfoColor
        
        $body = @{
            action = "test"
            to = $EmailDestino
        } | ConvertTo-Json
        
        $emailTest = Invoke-RestMethod -Uri "http://localhost:3000/api/email/test" -Method POST -Body $body -ContentType "application/json" -TimeoutSec 30
        
        if ($emailTest.success -and $emailTest.result.success) {
            Write-Host "`n🎉 ¡EMAIL ENVIADO EXITOSAMENTE!" -ForegroundColor $SuccessColor
            Write-Host "📨 Message ID: $($emailTest.result.messageId)" -ForegroundColor $SuccessColor
            Write-Host "📬 Destinatario: $($emailTest.result.recipientEmail)" -ForegroundColor $SuccessColor
            Write-Host "🕐 Timestamp: $($emailTest.result.timestamp)" -ForegroundColor $SuccessColor
            
            Write-Host "`n📋 Próximos pasos:" -ForegroundColor $InfoColor
            Write-Host "   1. Revisa tu bandeja de entrada en $EmailDestino" -ForegroundColor $WarningColor
            Write-Host "   2. Si no aparece, revisa la carpeta de SPAM" -ForegroundColor $WarningColor
            Write-Host "   3. El email puede tardar unos minutos en llegar" -ForegroundColor $WarningColor
            
            return $true
        } else {
            Write-Host "`n❌ Error enviando email:" -ForegroundColor $ErrorColor
            Write-Host "📝 Error: $($emailTest.error)" -ForegroundColor $ErrorColor
            if ($emailTest.result.error) {
                Write-Host "📝 Detalle: $($emailTest.result.error)" -ForegroundColor $ErrorColor
            }
            return $false
        }
        
    } catch {
        Write-Host "`n💥 Error durante el test de email: $($_.Exception.Message)" -ForegroundColor $ErrorColor
        return $false
    }
}

# Función principal
function Main {
    try {
        # Paso 1: Configurar directorio
        Set-ProjectDirectory
        
        # Paso 2: Limpiar procesos
        Stop-ExistingProcesses
        
        # Paso 3: Verificar dependencias
        Test-Dependencies
        
        # Paso 4: Verificar build
        Test-Build
        
        # Paso 5: Iniciar servidor
        $serverJobId = Start-Server
        
        # Paso 6: Probar email
        $emailSuccess = Test-EmailService -EmailDestino "gimenez.ger@gmail.com"
        
        if ($emailSuccess) {
            Write-Host "`n🎉 ¡PROCESO COMPLETADO EXITOSAMENTE!" -ForegroundColor $SuccessColor
            Write-Host "🌐 Servidor corriendo en: http://localhost:3000" -ForegroundColor $InfoColor
            Write-Host "📧 Email enviado correctamente" -ForegroundColor $SuccessColor
            Write-Host "🧪 Interfaz de test: http://localhost:3000/test-email" -ForegroundColor $InfoColor
        } else {
            Write-Host "`n⚠️ El servidor está corriendo pero hay problemas con el email" -ForegroundColor $WarningColor
            Write-Host "🌐 Puedes acceder a la interfaz web en: http://localhost:3000/test-email" -ForegroundColor $InfoColor
        }
        
        Write-Host "`n💡 El servidor seguirá corriendo en segundo plano" -ForegroundColor $InfoColor
        Write-Host "💡 Para detenerlo, cierra esta ventana de PowerShell" -ForegroundColor $InfoColor
        
    } catch {
        Write-Host "`n💥 Error fatal: $($_.Exception.Message)" -ForegroundColor $ErrorColor
        exit 1
    }
}

# Ejecutar función principal
Main