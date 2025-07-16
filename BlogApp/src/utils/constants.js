// App Constants
export const APP_COLORS = {
  PRIMARY: '#2196F3',
  SECONDARY: '#f44336',
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#f44336',
  BACKGROUND: '#f5f5f5',
  WHITE: '#ffffff',
  BLACK: '#000000',
  GRAY: '#666666',
  LIGHT_GRAY: '#e0e0e0',
};

export const APP_SIZES = {
  HEADER_HEIGHT: 60,
  BUTTON_HEIGHT: 45,
  INPUT_HEIGHT: 50,
  BORDER_RADIUS: 8,
  PADDING: 15,
  MARGIN: 15,
};

export const SCREEN_NAMES = {
  AUTH: 'Auth',
  HOME: 'Home',
  CREATE_POST: 'CreatePost',
  EDIT_POST: 'EditPost',
};

export const FIREBASE_COLLECTIONS = {
  USERS: 'users',
  POSTS: 'posts',
};

export const FIREBASE_STORAGE_PATHS = {
  POST_IMAGES: 'post_images',
  USER_AVATARS: 'user_avatars',
};

// Helper Functions
export const formatDate = (timestamp) => {
  if (!timestamp) return 'Just now';
  
  const date = timestamp.seconds ? new Date(timestamp.seconds * 1000) : new Date(timestamp);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    if (diffHours === 0) {
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      if (diffMinutes === 0) {
        return 'Just now';
      }
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
    return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.toLocaleDateString();
  }
};

export const truncateText = (text, maxLength = 150) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const getInitials = (name) => {
  if (!name) return '';
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const showAlert = (title, message, buttons = [{ text: 'OK' }]) => {
  return new Promise((resolve) => {
    Alert.alert(title, message, buttons.map(button => ({
      ...button,
      onPress: () => resolve(button.value || button.text)
    })));
  });
};

export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const isImageFile = (filename) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
};

export const getErrorMessage = (error) => {
  if (error.code) {
    switch (error.code) {
      case 'auth/user-not-found':
        return 'No user found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password.';
      case 'auth/email-already-in-use':
        return 'This email is already registered.';
      case 'auth/weak-password':
        return 'Password should be at least 6 characters.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your connection.';
      default:
        return error.message || 'An unexpected error occurred.';
    }
  }
  return error.message || 'An unexpected error occurred.';
};