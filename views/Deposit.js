import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, Button, ActivityIndicator } from 'react-native';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { db } from '../firebaseCon';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Wallet = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({});
  const [depositAmount, setDepositAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState(null);

  const paymentOptions = ['UPI', 'USDT', 'Bank Transfer', 'BTC Transfer'];

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserAndPaymentDetails = async () => {
        setLoading(true);
        try {
          const storedUserId = await AsyncStorage.getItem('userIdSA');
          const storedEmail = await AsyncStorage.getItem('userEmailSA');

          if (!storedUserId || !storedEmail) {
            Toast.show({ type: 'error', text1: 'User ID or email not found' });
            setLoading(false);
            return;
          }

          setUserId(storedUserId);
          setEmail(storedEmail);

          const paymentRef = collection(db, 'Payment');
          const paymentDocs = await getDocs(paymentRef);
          let paymentData = {};

          paymentDocs.forEach((doc) => {
            paymentData = doc.data(); // Assuming a flat structure
          });

          console.log(paymentData, 'Processed payment data');
          setPaymentDetails(paymentData);
        } catch (error) {
          console.error('Error fetching payment methods:', error);
          Toast.show({ type: 'error', text1: 'Error loading payment methods' });
        } finally {
          setLoading(false);
        }
      };

      fetchUserAndPaymentDetails();
    }, []) // Dependencies are left empty since we want this to re-run only when the screen is focused
  );

  const handleSubmit = async () => {
    const amount = parseFloat(depositAmount);
    if (!selectedMethod || isNaN(amount) || amount <= 0) {
      Toast.show({ type: 'error', text1: 'Please select a method and enter a valid amount' });
      return;
    }

    try {
      const depositRef = collection(db, 'WithdrawRequest');
      await addDoc(depositRef, {
        userId,
        email,
        method: selectedMethod,
        amount,
        type: 'deposit',
        timestamp: serverTimestamp(),
        status: 'pending',
      });
      setDepositAmount('');
      setSelectedMethod(null);
      Toast.show({ type: 'success', text1: 'Deposit request submitted successfully!' });
    } catch (error) {
      console.error('Error submitting deposit request:', error);
      Toast.show({ type: 'error', text1: 'Error submitting deposit request' });
    }
  };

  const renderDetails = () => {
    if (!selectedMethod || !paymentDetails) {
      return <Text style={styles.noDetails}>Please select a payment method to see details.</Text>;
    }

    switch (selectedMethod) {
      case 'UPI':
        return (
          <View style={styles.detailsContainer}>
            <Image
              source={{ uri: paymentDetails.upiqr || 'https://via.placeholder.com/200' }}
              style={styles.qrImage}
            />
            <Text style={styles.paymentId}>UPI ID: {paymentDetails.upiId || 'Not Available'}</Text>
          </View>
        );
      case 'USDT':
        return (
          <View style={styles.detailsContainer}>
            <Image
              source={{ uri: paymentDetails.usdtqr || 'https://via.placeholder.com/200' }}
              style={styles.qrImage}
            />
            <Text style={styles.paymentId}>USDT ID: {paymentDetails.usdtId || 'Not Available'}</Text>
          </View>
        );
      case 'Bank Transfer':
        return (
          <View style={styles.detailsContainer}>
            <Text style={styles.paymentDetail}>Bank Name: {paymentDetails.bankName || 'Not Available'}</Text>
            <Text style={styles.paymentDetail}>Account Holder: {paymentDetails.accountHolder || 'Not Available'}</Text>
            <Text style={styles.paymentDetail}>Account Number: {paymentDetails.accountNumber || 'Not Available'}</Text>
            <Text style={styles.paymentDetail}>IFSC Code: {paymentDetails.ifscCode || 'Not Available'}</Text>
          </View>
        );
      case 'BTC Transfer':
        return (
          <View style={styles.detailsContainer}>
            <Text style={styles.paymentDetail}>BTC Name: {paymentDetails.btcName || 'Not Available'}</Text>
            <Text style={styles.paymentDetail}>BTC Wallet Address: {paymentDetails.btcId || 'Not Available'}</Text>
          </View>
        );
      default:
        return null;
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
      <Text style={styles.header}>Deposit Funds</Text>
      <View style={styles.optionsContainer}>
        {paymentOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.optionButton, selectedMethod === option && styles.selectedOption]}
            onPress={() => setSelectedMethod(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {renderDetails()}

      <TextInput
        style={styles.input}
        placeholder="Enter deposit amount"
        placeholderTextColor="#999"
        keyboardType="numeric"
        value={depositAmount}
        onChangeText={setDepositAmount}
      />
      <Button title="Submit Deposit Request" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  centerContent: { justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 20, color: '#fff', marginBottom: 20, textAlign: 'center' },
  optionsContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 5,
  },
  selectedOption: { backgroundColor: '#3c42ca' },
  optionText: { color: '#fff', fontSize: 16 },
  detailsContainer: { marginBottom: 20 },
  qrImage: { width: 200, height: 200, alignSelf: 'center', marginBottom: 10 },
  paymentId: { color: '#fff', textAlign: 'center', marginBottom: 10 },
  paymentDetail: { color: '#fff', textAlign: 'center', marginBottom: 5 },
  noDetails: { color: '#fff', textAlign: 'center', marginBottom: 20, fontSize: 16 },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
});

export default Wallet;
