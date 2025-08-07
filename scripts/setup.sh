#!/bin/bash

# Recipe App Setup Script
echo "🚀 Setting up Recipe App..."

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Remove existing node_modules and lock files
echo "🧹 Cleaning up existing files..."
rm -rf node_modules
rm -f package-lock.json

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if installation was successful
if [ $? -eq 0 ]; then
    echo "✅ Setup completed successfully!"
    echo "🎯 You can now run:"
    echo "   - npm run dev (for development)"
    echo "   - npm run build (for production build)"
    echo "   - npm run deploy (for GitHub Pages deployment)"
else
    echo "❌ Setup failed. Please check the errors above."
    exit 1
fi
