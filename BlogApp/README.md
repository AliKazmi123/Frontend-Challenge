# React Native Firebase Blog App

A full-featured blog application built with React Native and Firebase, featuring user authentication, CRUD operations, and image uploads.

## Features

- **User Authentication**: Sign up, login, logout, and password reset
- **Blog Management**: Create, read, update, and delete blog posts
- **Image Upload**: Upload images with blog posts using Firebase Storage
- **Real-time Updates**: Real-time synchronization of posts across devices
- **Responsive Design**: Works on both Android and iOS
- **Modern UI**: Clean and intuitive user interface

## Prerequisites

- Node.js (v14 or later)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)
- Firebase account

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BlogApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Email/Password)
   - Create Firestore Database
   - Set up Firebase Storage
   - Download configuration files:
     - `google-services.json` for Android → place in `android/app/`
     - `GoogleService-Info.plist` for iOS → place in `ios/BlogApp/`

4. **Android Setup**
   - Ensure `google-services.json` is in `android/app/`
   - The project is already configured with Firebase plugins

5. **iOS Setup** (if targeting iOS)
   ```bash
   cd ios && pod install && cd ..
   ```

## Firebase Configuration

### Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /posts/{postId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == get(/databases/$(database)/documents/posts/$(postId)).data.authorId;
      allow create: if request.auth != null;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Storage Security Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Running the Application

1. **Start Metro bundler**
   ```bash
   npm start
   ```

2. **Run on Android**
   ```bash
   npm run android
   ```

3. **Run on iOS** (macOS only)
   ```bash
   npm run ios
   ```

## Project Structure

```
BlogApp/
├── src/
│   ├── components/           # Reusable UI components
│   ├── screens/             # Screen components
│   │   ├── AuthScreen.js    # Authentication screen
│   │   ├── HomeScreen.js    # Home screen with post list
│   │   ├── CreatePostScreen.js # Create new post
│   │   └── EditPostScreen.js   # Edit existing post
│   ├── services/            # Firebase services
│   │   ├── authService.js   # Authentication service
│   │   └── blogService.js   # Blog CRUD operations
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.js  # Main navigation
│   └── utils/              # Utility functions
├── android/                # Android specific files
├── ios/                    # iOS specific files
├── App.js                  # Main app component
└── package.json           # Dependencies and scripts
```

## Usage

### Authentication
- Register a new account or login with existing credentials
- Use the "Forgot Password" feature to reset your password
- Logout using the logout button in the header

### Blog Management
- View all blog posts on the home screen
- Create new posts using the "+" button
- Edit your own posts using the edit button
- Delete your own posts using the delete button
- Add images to posts using the image picker

### Features
- **Real-time Updates**: Posts are updated in real-time across all devices
- **Image Support**: Upload and display images with posts
- **User-specific Actions**: Only edit and delete your own posts
- **Responsive Design**: Works on various screen sizes

## Troubleshooting

### Common Issues

1. **Metro bundler cache issues**
   ```bash
   npm start -- --reset-cache
   ```

2. **Android build errors**
   ```bash
   cd android && ./gradlew clean && cd ..
   ```

3. **iOS build errors**
   ```bash
   cd ios && rm -rf build && cd ..
   ```

4. **Firebase connection issues**
   - Verify configuration files are in correct locations
   - Check Firebase console for proper setup
   - Ensure proper security rules are applied

### Dependencies Issues

If you encounter dependency conflicts:
```bash
npm install --legacy-peer-deps
```

## Testing

Run tests using:
```bash
npm test
```

## Building for Production

### Android
```bash
cd android && ./gradlew assembleRelease
```

### iOS
Use Xcode to build and archive the project.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support and questions:
- Check the troubleshooting section
- Review Firebase documentation
- Check React Native documentation
- Open an issue in the repository

## Future Enhancements

- Push notifications
- Dark mode support
- Search functionality
- User profiles
- Comments system
- Like/unlike posts
- Categories and tags
- Offline support

## Tech Stack

- **React Native**: Mobile app framework
- **Firebase Auth**: User authentication
- **Firestore**: NoSQL database
- **Firebase Storage**: File storage
- **React Navigation**: Navigation library
- **React Native Vector Icons**: Icons
- **React Native Image Picker**: Image selection
- **React Native Paper**: UI components

This README provides comprehensive information for setting up and running the React Native Firebase blog application.
