#!/bin/bash

# Waste Management App - Vercel Deployment Script
# Run this script to deploy your app to Vercel

echo "🚀 Vercel Deployment Script"
echo "============================"
echo ""

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

echo "✅ Vercel CLI installed"
echo ""

# Navigate to project directory
cd /Users/mbgirish/waste-management-app || exit

echo "📁 Current directory: $(pwd)"
echo ""

# Login to Vercel (interactive)
echo "🔐 Please login to Vercel..."
vercel login

echo ""
echo "📦 Linking project to Vercel..."
vercel link

echo ""
echo "☁️  Deploying to Vercel Production..."
vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Your app should be live at: https://nmitdesignathon.vercel.app"
echo ""
echo "📝 Next steps:"
echo "1. Visit https://vercel.com/dashboard"
echo "2. Go to your project settings"
echo "3. Add environment variables from vercel-env-vars.txt"
echo "4. Redeploy if needed"
echo ""

