# Waste Management System

A comprehensive waste management system that allows administrators to monitor and manage waste collection points, and enables collectors to efficiently manage their collection routes.

## Features

- **User Authentication**: Secure signup and login system with Firebase Authentication
- **Admin Dashboard**:
  - Add, edit, and delete dustbins
  - Set fill level thresholds
  - View real-time fill levels
  - Monitor dustbin status (Available/Full)
  - Interactive Google Maps integration
- **Collector Interface**:
  - View assigned dustbins
  - Update fill levels in real-time
  - Get directions to dustbin locations
  - View frequently asked questions
- **Real-time Updates**: All changes are synchronized in real-time using Firebase
- **Threshold Alerts**: Automatic alerts when dustbins exceed their fill threshold

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account
- Google Maps API key

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd waste-management-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication in the Authentication section
   - Create a Firestore database in test mode
   - Get your Firebase configuration from Project Settings > General > Your apps

4. **Set up Google Maps API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Enable the Maps JavaScript API
   - Create an API key and restrict it to your domain

5. **Configure environment variables**
   Update the `.env` file in the root directory with your actual values:
   ```
   REACT_APP_FIREBASE_API_KEY=your_actual_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   ```

6. **Start the development server**
   ```bash
   npm start
   ```
   The application will be available at [http://localhost:3000](http://localhost:3000)

## Firebase Security Rules

Add these security rules to your Firestore database:

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

## Usage

1. **Sign Up**: Create a new account with email and password
2. **Login**: Access your dashboard after authentication
3. **Admin Features**:
   - Click "Add Dustbin" to create new waste collection points
   - Set threshold levels for each dustbin
   - Monitor fill levels and status in real-time
   - Use the map to visualize dustbin locations
4. **Collector Features**:
   - View all dustbins and their current fill levels
   - Update fill levels using the sliders
   - Check FAQs for common questions
   - View dustbin locations on the map

## Available Scripts

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
