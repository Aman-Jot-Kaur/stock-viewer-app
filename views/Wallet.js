import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, getDoc, setDoc } from 'firebase/firestore'; // Correct Firestore imports
import Toast from 'react-native-toast-message';
import { db } from '../firebaseCon'; // Ensure firebaseCon exports `db` correctly
import { useFocusEffect } from '@react-navigation/native';

const Wallet = () => {
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const defaultBalances = [
    { label: 'Available balance', amount: 0 },
    { label: 'Deposit Balance', amount: 0 },
    { label: 'P & L Balance', amount: 0},
    { label: 'Withdrawal Balance', amount: 0 },
    { label: 'Bonus', amount: 0 },
    { label: 'Referral Bonus', amount: 0},
    { label: 'Leverage Balance', amount: 0},
    { label: 'Credit Balance', amount: 0 },
  ];

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

  //       const walletRef = doc(db, 'wallet', storedUserId); // Reference to the wallet doc
  //       const walletDoc = await getDoc(walletRef); // Fetch wallet data

  //       if (walletDoc.exists()) {
  //         setBalances(walletDoc.data().balances); // Set existing balances
  //       } else {
  //         await setDoc(walletRef, {
  //           userId: storedUserId,
  //           balances: defaultBalances,
  //         }); // Create a new wallet document
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

// Inside your component
useFocusEffect(
  React.useCallback(() => {
    const getWalletData = async () => {
      setLoading(true); // Start loading when the effect runs
      try {
        const storedUserId = await AsyncStorage.getItem('userIdSA');
        if (!storedUserId) {
          Toast.show({ type: 'error', text1: 'User ID not found' });
          setLoading(false);
          return;
        }
        setUserId(storedUserId);

        const walletRef = doc(db, 'wallet', storedUserId); // Reference to the wallet doc
        const walletDoc = await getDoc(walletRef); // Fetch wallet data

        if (walletDoc.exists()) {
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
      {balances.length === 0 && <Text>No balance data yet</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  balanceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Wallet;
