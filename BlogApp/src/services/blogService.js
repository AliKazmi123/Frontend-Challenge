import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import authService from './authService';

class BlogService {
  constructor() {
    this.firestore = firestore();
    this.storage = storage();
  }

  // Get all blog posts
  async getPosts() {
    try {
      const postsSnapshot = await this.firestore
        .collection('posts')
        .orderBy('createdAt', 'desc')
        .get();
      
      const posts = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return posts;
    } catch (error) {
      throw error;
    }
  }

  // Get posts by current user
  async getPostsByUser(userId) {
    try {
      const postsSnapshot = await this.firestore
        .collection('posts')
        .where('authorId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();
      
      const posts = postsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      return posts;
    } catch (error) {
      throw error;
    }
  }

  // Get a single post by ID
  async getPost(postId) {
    try {
      const postDoc = await this.firestore.collection('posts').doc(postId).get();
      if (postDoc.exists) {
        return {
          id: postDoc.id,
          ...postDoc.data()
        };
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  // Create a new blog post
  async createPost(postData) {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const post = {
        title: postData.title,
        content: postData.content,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email,
        imageUrl: postData.imageUrl || null,
        createdAt: firestore.FieldValue.serverTimestamp(),
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      const docRef = await this.firestore.collection('posts').add(post);
      return {
        id: docRef.id,
        ...post
      };
    } catch (error) {
      throw error;
    }
  }

  // Update a blog post
  async updatePost(postId, postData) {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      const updateData = {
        title: postData.title,
        content: postData.content,
        imageUrl: postData.imageUrl || null,
        updatedAt: firestore.FieldValue.serverTimestamp(),
      };

      await this.firestore.collection('posts').doc(postId).update(updateData);
      return {
        id: postId,
        ...updateData
      };
    } catch (error) {
      throw error;
    }
  }

  // Delete a blog post
  async deletePost(postId) {
    try {
      const currentUser = authService.getCurrentUser();
      if (!currentUser) {
        throw new Error('User not authenticated');
      }

      await this.firestore.collection('posts').doc(postId).delete();
    } catch (error) {
      throw error;
    }
  }

  // Upload image to Firebase Storage
  async uploadImage(imageUri, imageName) {
    try {
      const reference = this.storage.ref(`post_images/${imageName}`);
      await reference.putFile(imageUri);
      const downloadUrl = await reference.getDownloadURL();
      return downloadUrl;
    } catch (error) {
      throw error;
    }
  }

  // Listen to real-time updates for posts
  onPostsChanged(callback) {
    return this.firestore
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        callback(posts);
      });
  }
}

export default new BlogService();