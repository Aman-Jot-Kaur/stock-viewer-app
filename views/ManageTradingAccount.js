import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseCon';
import Toast from 'react-native-toast-message';
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
const ManageTradingAccount = () => { // Added navigation prop
  const [loading, setLoading] = useState(true);
  const { navigate } = useNavigation();
  const [accountInfo, setAccountInfo] = useState({
    accountName: '',
    accountType: '',
    currency: '',
    leverage: '',
    bankName: '',
    ifscCode: '',
    bankAccountNumber: '',
    upiId: '',
    document: '',
  });
  const [userId, setUserId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const getUserIdAndFetchData = async () => {
        try {
          const storedUserId = await AsyncStorage.getItem('userIdSA');
          if (storedUserId) {
            setUserId(storedUserId);
            await fetchAccountData(storedUserId);
          } else {
            Toast.show({ type: 'error', text1: 'User ID not found' });
            setLoading(false);
          }
        } catch (error) {
          console.error('Error fetching userId:', error);
          Toast.show({ type: 'error', text1: 'Error loading user ID' });
          setLoading(false);
        }
      };

      getUserIdAndFetchData();
    }, [])
  );

  const fetchAccountData = async (uid) => {
    try {
      const accountDoc = await getDoc(doc(db, 'accounts', uid));
      if (accountDoc.exists()) {
        setAccountInfo(accountDoc.data());
      } else {
        await createNewAccount(uid);
      }
    } catch (error) {
      console.error('Error fetching account data:', error);
      Toast.show({ type: 'error', text1: 'Error loading account data' });
    } finally {
      setLoading(false);
    }
  };

  const createNewAccount = async (uid) => {
    const defaultAccountData = {
      accountName: '',
      accountType: '',
      currency: '',
      leverage: '',
      bankName: '',
      ifscCode: '',
      bankAccountNumber: '',
      upiId: '',
      kycImage: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await setDoc(doc(db, 'accounts', uid), defaultAccountData);
      setAccountInfo(defaultAccountData);
    } catch (error) {
      console.error('Error creating new account:', error);
    }
  };

  const handleAccountInfoChange = (key, value) => {
    const updatedAccountInfo = { ...accountInfo, [key]: value };
    setAccountInfo(updatedAccountInfo);
    updateAccountInFirebase(key, value);
  };

  const updateAccountInFirebase = async (field, value) => {
    if (!userId) return;
    try {
      await updateDoc(doc(db, 'accounts', userId), {
        [field]: value,
        updatedAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
      Toast.show({ type: 'error', text1: `Error updating ${field}` });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3c42ca" />
      </View>
    );
  }

  const formatLabel = (key) =>
    key
      .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between lowercase and uppercase
      .toLowerCase() // Convert the entire string to lowercase
      .split(' ') // Split the string by spaces
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
      .join(' '); // Join the words back with a space
  
  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigate('Profile')} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back </Text>
      </TouchableOpacity>
  
      <Text style={styles.header}>Manage Trading Accounts</Text>
  
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Details</Text>
        {['accountName', 'accountType', 'currency', 'leverage'].map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{formatLabel(key)}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${formatLabel(key)}`}
              placeholderTextColor="#A1A1A1"
              value={accountInfo[key]}
              onChangeText={(value) => handleAccountInfoChange(key, value)}
            />
          </View>
        ))}
      </View>
  
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bank & UPI Details</Text>
        {['bankName', 'ifscCode', 'bankAccountNumber', 'upiId'].map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>{formatLabel(key)}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${formatLabel(key)}`}
              placeholderTextColor="#A1A1A1"
              value={accountInfo[key]}
              onChangeText={(value) => handleAccountInfoChange(key, value)}
            />
          </View>
        ))}
      </View>
  
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>KYC Document</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter KYC Image URL"
          placeholderTextColor="#A1A1A1"
          value={accountInfo.document}
          onChangeText={(value) => handleAccountInfoChange('kycImage', value)}
        />
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
  sectionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    padding:20
  },
  label: {
    color: '#A1A1A1',
    width: 100,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    marginLeft: 10,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginBottom: 20,
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width:150
  },
  backButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default ManageTradingAccount;
