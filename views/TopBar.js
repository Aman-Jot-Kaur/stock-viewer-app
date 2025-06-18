import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
const CustomHeader = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [userId, setUserId] = useState(null);

  useFocusEffect(
    
    React.useCallback(() => {

      const getUserIdAndFetchData = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userEmailSA');
          if (storedUserId) {
            setUserId(storedUserId);
          } else {
            Toast.show({
              type: 'error',
              text1: 'User ID not found',
            });
          }
        } catch (error) {
          console.error('Error fetching userId:', error);
          Toast.show({
            type: 'error',
            text1: 'Error loading user ID',
          });
        }
      };

      getUserIdAndFetchData(); // Call the async function

     
    }, [])
  );
  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userIdSA');
              await AsyncStorage.removeItem('userEmailSA');

              Toast.show({
                type: 'success',
                text1: 'Logged out successfully'
              });
              // Navigate to Login screen
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error) {
              console.error('Error during logout:', error);
              Toast.show({
                type: 'error',
                text1: 'Error logging out',
                text2: error.message
              });
            }
          }
        }
      ]
    );
  };

  // Determine what to display based on the current route
  const displayText = () => {
    switch (route.name) {
      case 'Withdrawal':
        return 'Withdrawal';
      case 'Deposit':
        return 'Deposit';
      case 'Manage Profile':
        return 'Manage Profile';
      default:
        return userId; // Default account number
    }
  };

  return (
    <SafeAreaView>
    <View style={styles.topBar}>
      {/* Left Side - Menu Icon */}
      <View style={styles.leftSide}>
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <Icon name="menu" size={28} color="white" />
        </TouchableOpacity>
      </View>

      {/* Center - Account Number with Dropdown Icon */}
      <View style={styles.center}>
        <Text style={styles.accountText}>{displayText()}</Text>  
        {/* <TouchableOpacity>
          <Icon name="arrow-drop-down" size={28}       color="white" />
        </TouchableOpacity> */}
      </View>

      {/* Right Side - Search and Logout Icons */}
      <View style={styles.rightSide}>
        <TouchableOpacity 
          onPress={() => console.log('Search Pressed')}
          style={styles.iconContainer}
        >
          <Icon name="search" size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={handleLogout}
          style={styles.iconContainer}
        >
          <Icon name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#1c72b4',
    paddingVertical: 15,
   
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    color: 'white',
    fontSize: 18,
    textOverflow: 'ellipsis',
  width: 150,
    marginRight: 5,
  },
  iconContainer: {
    marginLeft: 15,
    padding: 5,
  }
});

export default CustomHeader;