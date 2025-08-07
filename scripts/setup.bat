@echo off
echo 🚀 Setting up Recipe App...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Remove existing node_modules and lock files
echo 🧹 Cleaning up existing files...
if exist "node_modules" rmdir /s /q node_modules
if exist "package-lock.json" del package-lock.json

REM Install dependencies
echo 📦 Installing dependencies...
npm install

REM Check if installation was successful
if %errorlevel% equ 0 (
    echo ✅ Setup completed successfully!
    echo 🎯 You can now run:
    echo    - npm run dev (for development)
    echo    - npm run build (for production build)
    echo    - npm run deploy (for GitHub Pages deployment)
) else (
    echo ❌ Setup failed. Please check the errors above.
    pause
    exit /b 1
)

pause
