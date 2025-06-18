import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Toast from 'react-native-toast-message';
import { db } from '../firebaseCon'; // Ensure firebaseCon exports `db` correctly
import { useFocusEffect } from '@react-navigation/native';
const Wallet = () => {
  const [balances, setBalances] = useState([]);
  const [depositAmount, setDepositAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
const[email,setEmail]=useState(null)
  const defaultBalances = [
    { label: 'Available balance', amount: 0 },
    { label: 'Deposit Balance', amount: 0 },
    { label: 'P & L Balance', amount: 0 },
    { label: 'Withdrawal Balance', amount: 0 },
    { label: 'Bonus', amount: 0 },
    { label: 'Referral Bonus', amount: 0 },
    { label: 'Leverage Balance', amount: 0 },
    { label: 'Credit Balance', amount: 0 },
  ];
  useFocusEffect(
    React.useCallback(() => {
      const getWalletData = async () => {
        setLoading(true); // Start loading when the effect runs
        try {
          const storedUserId = await AsyncStorage.getItem('userIdSA');
          const email = await AsyncStorage.getItem('userEmailSA');

          if (!storedUserId) {
            Toast.show({ type: 'error', text1: 'User ID not found' });
            setLoading(false);
            return;
          }
          setUserId(storedUserId);
          if (!email) {
            Toast.show({ type: 'error', text1: 'User email not found' });
            setLoading(false);
            return;
          }
          setEmail(email)
  
          const walletRef = doc(db, 'wallet', storedUserId); // Reference to the wallet doc
          const walletDoc = await getDoc(walletRef); // Fetch wallet data
  
          if (walletDoc.exists()) {
            console.log(walletDoc.data().balances);
            setBalances(walletDoc.data().balances); // Set existing balances
          } else {
            await setDoc(walletRef, {
              userId: storedUserId,
              balances: defaultBalances,
            }); // Create a new wallet document
            setBalances(defaultBalances);
          }
        } catch (error) {
          console.error('Error fetching or creating wallet data:', error);
          Toast.show({ type: 'error', text1: 'Error loading wallet data' });
        } finally {
          setLoading(false);
        }
      };
  
      getWalletData();
    }, [])
  );
  // useEffect(() => {
  //   const getWalletData = async () => {
  //     try {
  //       const storedUserId = await AsyncStorage.getItem('userIdSA');
  //       if (!storedUserId) {
  //         Toast.show({ type: 'error', text1: 'User ID not found' });
  //         setLoading(false);
  //         return;
  //       }

  //       setUserId(storedUserId);
  //       const walletRef = doc(db, 'wallet', storedUserId);
  //       const walletDoc = await getDoc(walletRef);

  //       if (walletDoc.exists()) {
  //         setBalances(walletDoc.data().balances);
  //       } else {
  //         await setDoc(walletRef, {
  //           userId: storedUserId,
  //           balances: defaultBalances,
  //         });
  //         setBalances(defaultBalances);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching or creating wallet data:', error);
  //       Toast.show({ type: 'error', text1: 'Error loading wallet data' });
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getWalletData();
  // }, []);

  const handleDeposit = async () => {
    const amount = parseFloat(depositAmount.trim());
    if (isNaN(amount) || amount <= 0) {
      Toast.show({ type: 'error', text1: 'Invalid withdrawal amount' });
      return;
    }
  
    try {
      const walletRef = doc(db, 'wallet', userId);
      const walletDoc = await getDoc(walletRef);
  
      if (walletDoc.exists()) {
        const walletData = walletDoc.data();
        const availableBalance = parseFloat(walletData.balances.find(b => b.label === 'Available balance').amount) || 0;
  
        // Check if the withdrawal amount is less than or equal to the available balance
        if (amount > availableBalance) {
          Toast.show({ type: 'error', text1: 'Insufficient funds for withdrawal' });
          return;
        }
  
        // const updatedBalances = walletData.balances.map((balance) => {
        //   const currentAmount = parseFloat(balance.amount) || 0;
  
        //   // Update the available balance for withdrawal
        //   if (balance.label === 'Available balance') {
        //     return { ...balance, amount: currentAmount - amount }; // Subtract the withdrawal amount
        //   }
  
        //   return balance; // No change for other balances
        // });
  
        // await updateDoc(walletRef, { balances: updatedBalances });
  
        // setBalances(updatedBalances);
        const withdrawRef = collection(db, 'WithdrawRequest');
        await addDoc(withdrawRef, {
          userId,
          amount: depositAmount,
          totalAmount: availableBalance,
          timestamp: serverTimestamp(),
          status:"pending",
          email,
          type:"withdrawal"
        });
        setDepositAmount(0);
        Toast.show({ type: 'success', text1: 'Withdrawal request successfully sent' });
  
        // this section to record the transaction
        // const transactionsRef = collection(db, 'transactions');
        // await addDoc(transactionsRef, {
        //   userId,
        //   amount,
        //   type: 'withdrawal',
        //   timestamp: serverTimestamp(),
        // });
      } else {
        Toast.show({ type: 'error', text1: 'Wallet not found' });
      }
    } catch (error) {
      console.error('Error processing withdrawal:', error);
      Toast.show({ type: 'error', text1: 'Error processing withdrawal' });
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
      {balances.map((balance, index) => (
        <View key={index} style={styles.balanceCard}>
          <Text style={styles.label}>{balance.label}</Text>
          <Text style={styles.amount}>{balance.amount} Rs</Text>
        </View>
      ))}
      {balances.length === 0 && <Text>No balances yet</Text>}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter withdrawal amount"
          placeholderTextColor="#999"
          keyboardType="numeric"
          value={depositAmount}
          onChangeText={setDepositAmount}
        />
        <Button           style={styles.input}
 title="Submit Withdrawal Request" onPress={handleDeposit} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  balanceCard: { flexDirection: 'row', justifyContent: 'space-between', padding: 15 },
  label: { color: '#fff' },
  amount: { fontWeight: 'bold', color: '#fff' },
  input: { color: '#fff', borderColor: '#fff', padding: 20 ,marginBottom:30},
});

export default Wallet;
