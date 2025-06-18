import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import ManageTradingAccount from './ManageTradingAccount';

const ManageTradingAccountScreen = () => {
  return (
    <View style={styles.container}>
      <ManageTradingAccount/>
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

export default ManageTradingAccountScreen;
