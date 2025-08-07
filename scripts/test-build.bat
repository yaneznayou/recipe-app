@echo off
echo 🧪 Testing build process...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Please run this script from the project root.
    pause
    exit /b 1
)

REM Run TypeScript check
echo 🔍 Running TypeScript check...
npx tsc --noEmit

if %errorlevel% neq 0 (
    echo ❌ TypeScript check failed!
    pause
    exit /b 1
)

echo ✅ TypeScript check passed!

REM Run build
echo 🔨 Running build...
npm run build

if %errorlevel% equ 0 (
    echo ✅ Build completed successfully!
    echo 🎯 Your app is ready for deployment!
) else (
    echo ❌ Build failed. Please check the errors above.
    pause
    exit /b 1
)

pause
