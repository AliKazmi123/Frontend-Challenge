import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

class AuthService {
  constructor() {
    this.auth = auth();
    this.firestore = firestore();
  }

  // Get current user
  getCurrentUser() {
    return this.auth.currentUser;
  }

  // Sign up with email and password
  async signUp(email, password, displayName) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      const user = userCredential.user;
      
      // Update user profile
      await user.updateProfile({
        displayName: displayName,
      });

      // Create user document in Firestore
      await this.firestore.collection('users').doc(user.uid).set({
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      return user;
    } catch (error) {
      throw error;
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  }

  // Sign out
  async signOut() {
    try {
      await this.auth.signOut();
    } catch (error) {
      throw error;
    }
  }

  // Reset password
  async resetPassword(email) {
    try {
      await this.auth.sendPasswordResetEmail(email);
    } catch (error) {
      throw error;
    }
  }

  // Listen to auth state changes
  onAuthStateChanged(callback) {
    return this.auth.onAuthStateChanged(callback);
  }
}

export default new AuthService();