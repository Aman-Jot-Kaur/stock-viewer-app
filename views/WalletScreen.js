import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import Wallet from './Wallet';

const WalletScreen = () => {
  return (
    <View style={styles.container}>
      <Wallet/>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default WalletScreen;
