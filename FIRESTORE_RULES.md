# 🔥 Firebase Firestore Security Rules

## Current Issue
If you can't delete dustbins, it's likely due to Firebase security rules being too restrictive.

## Updated Security Rules
Go to Firebase Console > Firestore Database > Rules and replace with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write dustbins
    match /dustbins/{dustbin} {
      allow read, write, delete: if request.auth != null;
    }
    
    // Allow users to read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null; // Allow reading other users for role checking
    }
    
    // Allow all authenticated users to read all documents (for admin functionality)
    match /{document=**} {
      allow read: if request.auth != null;
    }
  }
}
```

## Alternative: Test Mode Rules (For Development Only)
If you're still testing, you can use these permissive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Steps to Update Rules:
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **bintrack-6f6e9**
3. Click **Firestore Database** in the left sidebar
4. Click the **Rules** tab
5. Replace the existing rules with one of the above
6. Click **Publish**

After updating the rules, try deleting a dustbin again!
