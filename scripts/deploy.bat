@echo off
echo 🚀 Starting deployment process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Install dependencies if node_modules doesn't exist
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    npm install
)

REM Build the project
echo 🔨 Building the project...
npm run build

REM Check if build was successful
if %errorlevel% neq 0 (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

REM Deploy to GitHub Pages
echo 🌐 Deploying to GitHub Pages...
npm run deploy

REM Check if deployment was successful
if %errorlevel% equ 0 (
    echo ✅ Deployment successful!
    echo 🌍 Your app should be available at: https://yaneznayou.github.io/recipe-app
    echo ⏳ It may take a few minutes for the changes to appear.
) else (
    echo ❌ Deployment failed. Please check the errors above.
    pause
    exit /b 1
)

pause
