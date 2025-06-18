import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  
} from 'react-native';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseCon';
import { auth } from '../firebaseCon';
const ManageProfile = () => {
  const navigation = useNavigation();

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
              // Retrieve UID from AsyncStorage
              const storedUserId = await AsyncStorage.getItem('userIdSA');
              if (!storedUserId) throw new Error("User ID not found in storage.");

              // Delete Firestore document
              await deleteDoc(doc(db, 'users', storedUserId));

              // Delete Firebase user
              const user = auth.currentUser;
              if (user) {
                await deleteUser(user);
              }

              // Clear local storage and redirect
              await AsyncStorage.clear();
              Toast.show({
  type: 'success',
  text1: 'Account deleted successfully.',
});

              navigation.replace("Login");
            } catch (error) {
            
              Alert.alert("Error", "Unable to delete your account. Please try again.");
            }
          },
        },
      ]
    );
  };

  // Handle password update with email display
  const handleUpdatePassword = async () => {
    try {
      // Retrieve UID from AsyncStorage
      const storedUserId = await AsyncStorage.getItem('userIdSA');
      if (!storedUserId) throw new Error("User ID not found in storage.");
  
      // Fetch user document
      const userDoc = await getDoc(doc(db, 'users', storedUserId));
      if (!userDoc.exists()) throw new Error("User document not found.");
  
      const userData = userDoc.data();
      const currentEmail = userData.email; // Retrieve current email
  
      Alert.prompt(
        "Update Password",
        `Enter your current password and a new password for the account with email: ${currentEmail}`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Update",
            onPress: async (input) => {
              const [currentPassword, newPassword] = input.split(',');
              if (!currentPassword || !newPassword) {
                Alert.alert("Error", "Both current and new passwords are required.");
                return;
              }
  
              try {
                const user = auth.currentUser;
                if (user) {
                  // Reauthenticate the user
                  const credential = EmailAuthProvider.credential(currentEmail, currentPassword);
                  await reauthenticateWithCredential(user, credential);
  
                  // Update password after successful reauthentication
                  await updatePassword(user, newPassword);
                  Toast.show({
  type: 'success',
  text1: 'Success',
  text2: 'password updated successfully.',
});

                } else {
                  throw new Error("User not authenticated.");
                }
              } catch (error) {
                console.error("Error updating password:", error);
                Alert.alert("Error", "Unable to update password. Please try again.");
              }
            },
          },
        ],
        "plain-text"
      );
    } catch (error) {
      console.error("Error fetching user document:", error);
      Alert.alert("Error", "Unable to retrieve account details. Please try again.");
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
