#!/bin/bash

# Test Build Script
echo "🧪 Testing build process..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Run TypeScript check
echo "🔍 Running TypeScript check..."
npx tsc --noEmit

if [ $? -ne 0 ]; then
    echo "❌ TypeScript check failed!"
    exit 1
fi

echo "✅ TypeScript check passed!"

# Run build
echo "🔨 Running build..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    echo "🎯 Your app is ready for deployment!"
else
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi
