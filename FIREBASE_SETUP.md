# 🔥 Firebase Setup Instructions

## The Error You're Seeing
The error "Firebase: Error (auth/configuration-not-found)" means Email/Password authentication is not enabled in your Firebase console.

## Step-by-Step Fix

### 1. Go to Firebase Console
Visit: https://console.firebase.google.com/

### 2. Select Your Project
Click on your project: **bintrack-6f6e9**

### 3. Enable Authentication
1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"** if this is your first time
3. Go to the **"Sign-in method"** tab
4. Find **"Email/Password"** in the list
5. Click on it and toggle **"Enable"**
6. Click **"Save"**

### 4. Set Up Firestore Database
1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (for development)
4. Select your preferred location
5. Click **"Done"**

### 5. Add Security Rules
In Firestore Database > Rules, replace the content with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /dustbins/{dustbin} {
      allow read, write: if request.auth != null;
    }
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

Click **"Publish"**

## ✅ After Setup
Once you complete these steps:
1. Refresh your browser (http://localhost:3001)
2. Try signing up again
3. The error should be resolved!

## 🚀 Quick Test
After setup, you can:
- Sign up with any email/password
- Choose Admin or Collector role
- Access the dashboard features
- Add dustbins and test functionality
