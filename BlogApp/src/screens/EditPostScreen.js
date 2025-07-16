import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import blogService from '../services/blogService';

const EditPostScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [imageUri, setImageUri] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(post.imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        return;
      }
      if (response.errorMessage) {
        Alert.alert('Error', response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        setImageUri(response.assets[0].uri);
        setCurrentImageUrl(null); // Clear current image if new one is selected
      }
    });
  };

  const handleUpdatePost = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a title');
      return;
    }

    if (!content.trim()) {
      Alert.alert('Error', 'Please enter some content');
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl = currentImageUrl; // Keep existing image URL if no new image
      
      if (imageUri) {
        const imageName = `post_${Date.now()}.jpg`;
        imageUrl = await blogService.uploadImage(imageUri, imageName);
      }

      await blogService.updatePost(post.id, {
        title: title.trim(),
        content: content.trim(),
        imageUrl,
      });

      Alert.alert('Success', 'Post updated successfully', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to update post');
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = () => {
    setImageUri(null);
    setCurrentImageUrl(null);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.titleInput}
          value={title}
          onChangeText={setTitle}
          placeholder="Enter post title"
          multiline
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.contentInput}
          value={content}
          onChangeText={setContent}
          placeholder="Write your post content here..."
          multiline
          textAlignVertical="top"
        />

        <View style={styles.imageSection}>
          <Text style={styles.label}>Image (Optional)</Text>
          <TouchableOpacity style={styles.imageButton} onPress={handleImagePicker}>
            <Icon name="add-photo-alternate" size={24} color="#2196F3" />
            <Text style={styles.imageButtonText}>
              {currentImageUrl || imageUri ? 'Change Image' : 'Add Image'}
            </Text>
          </TouchableOpacity>
          
          {(imageUri || currentImageUrl) && (
            <View style={styles.imagePreview}>
              <Image 
                source={{ uri: imageUri || currentImageUrl }} 
                style={styles.previewImage} 
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={removeImage}
              >
                <Icon name="close" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={[styles.updateButton, isLoading && styles.buttonDisabled]}
          onPress={handleUpdatePost}
          disabled={isLoading}
        >
          <Text style={styles.updateButtonText}>
            {isLoading ? 'Updating...' : 'Update Post'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    marginTop: 15,
  },
  titleInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    fontWeight: 'bold',
    maxHeight: 100,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    height: 200,
    textAlignVertical: 'top',
  },
  imageSection: {
    marginTop: 20,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    backgroundColor: '#fff',
  },
  imageButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
  },
  imagePreview: {
    marginTop: 15,
    position: 'relative',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditPostScreen;