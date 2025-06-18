import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { db } from '../firebaseCon';
import { getDoc,doc , collection} from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, deleteUser, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../firebaseCon';
const ManageProfile = () => {
  const navigation = useNavigation();

  const currentEmail =  AsyncStorage.getItem('userEmailSA');

  // Handle account deletion
  const handleDeleteAccount = async () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your account? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const user = auth.currentUser;
              if (user) {
                await deleteUser(user);
                await AsyncStorage.clear(); // Clear local data
                Toast.show({ type: 'success', text1: 'account delete success' });
                navigation.navigate("Login");
              }
            } catch (error) {
              console.error("Error deleting account:", error);
              Alert.alert("Error", "Unable to delete your account. Please try again.");
            }
          },
        },
      ]
    );
  };

  // // Navigate to credentials screen for password change
  // const handleChangePassword = () => {
  //   navigation.navigate("ChangePassword");
  // };
  const handleUpdatePassword = async () => {
    try {
      // Retrieve UID from AsyncStorage
      const storedUserId = await AsyncStorage.getItem('userIdSA');
      if (!storedUserId) throw new Error('User ID not found in storage.');
  
      // Fetch user document
      const userDoc = await getDoc(doc(db, 'users', storedUserId));
      if (!userDoc.exists()) throw new Error('User document not found.');
  
      const userData = userDoc.data();
      const currentEmail = userData.email; // Retrieve current email
  
      // Prompt for the current password
      Alert.prompt(
        'Update Password',
        'Enter your current password:',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Next',
            onPress: async (currentPassword) => {
              if (!currentPassword) {
                Alert.alert('Error', 'Current password is required.');
                return;
              }
  
              // Prompt for the new password
              Alert.prompt(
                'Update Password',
                'Enter your new password:',
                [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Update',
                    onPress: async (newPassword) => {
                      if (!newPassword || newPassword.trim().length < 6) {
                        Alert.alert(
                          'Error',
                          'New password must be at least 6 characters long.'
                        );
                        return;
                      }
  
                      try {
                        const user = auth.currentUser;
                        
                       console.log("user in mng profiel",user);
                          // Update password after successful reauthentication
                          await updatePassword(user, newPassword);
                          Toast.show({ type: 'success', text1: 'password change successful' });
                        
                      } catch (error) {
                        console.error('Error updating password:', error);
                        Alert.alert(
                          'Error',
                          'Unable to update password. Please try again.'
                        );
                      }
                    },
                  },
                ],
                'secure-text'
              );
            },
          },
        ],
        'secure-text'
      );
    } catch (error) {
      console.error('Error fetching user document:', error);
      Alert.alert('Error', 'Unable to retrieve account details. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.optionContainer}>
        {/* Profile Option */}
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("PersonalProfile")}>
          <Icon name="person-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.optionText}>Profile</Text>
        </TouchableOpacity>

        {/* Credentials Option */}
        <TouchableOpacity style={styles.option} onPress={handleUpdatePassword}>
          <Icon name="key-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.optionText}>Credentials</Text>
        </TouchableOpacity>

        {/* Delete Account Option */}
        <TouchableOpacity style={styles.option} onPress={handleDeleteAccount}>
          <Icon name="trash-outline" size={24} color="red" style={styles.icon} />
          <Text style={styles.deleteText}>Delete Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManageProfile;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 16,
  },
  optionContainer: {
    flex: 1,
    marginBottom: 24,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
  },
  icon: {
    marginRight: 16,
  },
  optionText: {
    fontSize: 18,
    color: "white",
  },
  deleteText: {
    fontSize: 18,
    color: "red",
  },
});
