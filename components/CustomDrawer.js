import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseCon';

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

export default function CustomDrawerContent(props) {
  const scrollViewRef = useRef(null);
  const [balances, setBalances] = useState(defaultBalances);
  const [currentScrollX, setCurrentScrollX] = useState(0);

  useEffect(() => {
    const fetchBalances = async () => {
      try {
        const userId = await AsyncStorage.getItem('userIdSA');
        if (!userId) return;
        const walletRef = doc(db, 'wallet', userId);
        const walletSnap = await getDoc(walletRef);
        if (walletSnap.exists()) {
          setBalances(walletSnap.data().balances);
        } else {
          await setDoc(walletRef, { userId, balances: defaultBalances });
          setBalances(defaultBalances);
        }
      } catch (err) {
        // Optionally show toast here
      }
    };
    fetchBalances();
  }, []);

  const handleScroll = (dir) => {
    const offset = dir === 'left' ? currentScrollX - 180 : currentScrollX + 180;
    setCurrentScrollX(offset);
    scrollViewRef.current?.scrollTo({ x: offset, animated: true });
  };

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <Image
          source={{
            uri: 'https://partners.blackbull.com/wp-content/uploads/2023/09/BlackBull_BlackBull-White-brand-icon-1536x1536.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.appName}>Stock Viewer</Text>
      </View>

      <DrawerItemList {...props} />

      <View style={styles.scrollContainer}>
        <TouchableOpacity onPress={() => handleScroll('left')}>
          <MaterialIcons name="chevron-left" size={40} color="white" />
        </TouchableOpacity>

        <ScrollView
          horizontal
          ref={scrollViewRef}
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
        >
          {balances.map((b, i) => (
            <View key={i} style={styles.balanceCard}>
              <Text style={styles.label}>{b.label}</Text>
              <Text style={styles.amount}>{b.amount} Rs</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={() => handleScroll('right')}>
          <MaterialIcons name="chevron-right" size={40} color="white" />
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 20,
  },
  balanceCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 5,
    width: 150,
    gap: 20,
    marginBottom: 15,
    marginRight: 25,
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
  logo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
