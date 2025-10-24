# 🚀 Vercel Deployment Guide for Waste Management App

## Prerequisites
- Vercel account (free tier works)
- Firebase project configured
- Git repository ready

## Step-by-Step Deployment

### 1. **Push Your Code to GitHub/GitLab/Bitbucket**
```bash
cd waste-management-app
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. **Connect to Vercel**

**Option A: Via Vercel Website**
1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Connect your GitHub/GitLab/Bitbucket account
4. Select your repository (`SIH25WINNERS-3`)
5. Select the root directory: `waste-management-app`

**Option B: Via Vercel CLI**
```bash
npm install -g vercel
cd waste-management-app
vercel login
vercel
```

### 3. **Configure Environment Variables**

In Vercel dashboard → Project Settings → Environment Variables, add:

```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. **Deploy Settings**

- **Framework Preset**: Create React App
- **Build Command**: `npm run build`
- **Output Directory**: `build`
- **Install Command**: `npm install`
- **Root Directory**: `waste-management-app`

### 5. **Deploy!**

Click "Deploy" button. Wait 2-3 minutes for build to complete.

### 6. **Your App is Live!**

You'll get a URL like: `https://your-app-name.vercel.app`

## Important Notes

✅ **Firebase Configuration**
- Make sure Firebase allows your Vercel domain
- Update Firebase Auth authorized domains with your Vercel URL

✅ **Environment Variables**
- Never commit `.env` files to Git
- All sensitive data goes in Vercel Environment Variables

✅ **Automatic Deployments**
- Every push to `main` branch = new deployment
- Preview deployments for pull requests

✅ **Free Tier Limits**
- 100GB bandwidth/month
- Unlimited deployments
- Perfect for demo/prototype apps

## Troubleshooting

**Build fails?**
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Check Node version (should be 18+)

**Firebase errors?**
- Verify environment variables are set correctly
- Check Firebase console for error logs
- Ensure Firebase project is active

**CORS issues?**
- Add Vercel domain to Firebase authorized domains
- Check Firebase Security Rules

## Image Checklist

Ensure these images are in `/public` folder:
- ✅ big-bg.webp
- ✅ bins-bg.jpeg
- ✅ reearth-logo.png
- ✅ reearth-logo.jpeg

## Need Help?

Check Vercel documentation: https://vercel.com/docs
React deployment guide: https://create-react-app.dev/docs/deployment

