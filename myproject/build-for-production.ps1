# PowerShell script for cPanel deployment preparation
# Usage: .\build-for-production.ps1

Write-Host "🚀 Building project for cPanel deployment..." -ForegroundColor Cyan
Write-Host ""

# Step 1: Build the project
Write-Host "📦 Step 1: Running production build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Step 2: Copy .htaccess to dist folder
Write-Host ""
Write-Host "📋 Step 2: Copying .htaccess to dist folder..." -ForegroundColor Yellow

if (Test-Path ".htaccess") {
    Copy-Item ".htaccess" -Destination "dist\.htaccess" -Force
    Write-Host "✅ .htaccess copied successfully" -ForegroundColor Green
} else {
    Write-Host "⚠️  .htaccess not found, skipping..." -ForegroundColor Yellow
}

# Step 3: Verify dist folder
Write-Host ""
Write-Host "🔍 Step 3: Verifying build output..." -ForegroundColor Yellow

if (Test-Path "dist") {
    Write-Host "✅ Build completed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📁 Build output location: .\dist\" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📤 Next steps:" -ForegroundColor Cyan
    Write-Host "   1. Upload the contents of .\dist\ folder to cPanel public_html\" -ForegroundColor White
    Write-Host "   2. Make sure index.html is directly in public_html\ (not in a subfolder)" -ForegroundColor White
    Write-Host "   3. Set file permissions: files=644, folders=755" -ForegroundColor White
    Write-Host "   4. Clear browser cache and test your site" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Build failed: dist folder not found" -ForegroundColor Red
    exit 1
}

