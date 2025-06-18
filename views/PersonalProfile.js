import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseCon';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const PersonalProfile = () => {
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    name: '',
    documentFront: '',
    documentBack: '',
  });
  const [userId, setUserId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserId = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userIdSA');
          if (storedUserId) {
            setUserId(storedUserId);
            fetchUserDetails(storedUserId);
          } else {
            Toast.show({ type: 'error', text1: 'User ID not found' });
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching User ID:', error);
          Toast.show({ type: 'error', text1: 'Error loading User ID' });
          setLoading(false);
        }
      };

      fetchUserId();
    }, [])
  );

  const fetchUserDetails = async (uid) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        const { name, documentFront, documentBack } = data;
        setUserInfo({ name, documentFront, documentBack });
      } else {
        Toast.show({ type: 'error', text1: 'User not found' });
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
      Toast.show({ type: 'error', text1: 'Error loading user details' });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (field) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'image/*', // Only allow image files
      });

      if (result.type === 'cancel') {
        Toast.show({ type: 'info', text1: 'Image selection canceled.' });
        return;
      }

      const fileUri = result.uri;
      const base64String = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const updatedInfo = { ...userInfo, [field]: base64String };
      setUserInfo(updatedInfo);

      if (userId) {
        await updateDoc(doc(db, 'users', userId), { [field]: base64String });
        Toast.show({
          type: 'success',
          text1: `${field === 'documentFront' ? 'Document Front' : 'Document Back'} updated successfully!`,
        });
      }
    } catch (error) {
      console.error(`Error uploading ${field}:`, error);
      Toast.show({ type: 'error', text1: `Failed to upload ${field}` });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3c42ca" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Manage User Profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{userInfo.name}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Document Front</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImageUpload('documentFront')}
        >
          <Text style={styles.uploadButtonText}>Upload Document Front</Text>
        </TouchableOpacity>
        {userInfo.documentFront && (
          <Image
            source={{ uri: `data:image/png;base64,${userInfo.documentFront}` }}
            style={styles.imagePreview}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Document Back</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => handleImageUpload('documentBack')}
        >
          <Text style={styles.uploadButtonText}>Upload Document Back</Text>
        </TouchableOpacity>
        {userInfo.documentBack && (
          <Image
            source={{ uri: `data:image/png;base64,${userInfo.documentBack}` }}
            style={styles.imagePreview}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    padding: 16,
  },
  header: {
    fontSize: 20,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    color: '#A1A1A1',
    marginBottom: 5,
  },
  value: {
    color: '#FFFFFF',
    backgroundColor: '#1C1C1E',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
  },
  uploadButton: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  uploadButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 5,
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default PersonalProfile;
