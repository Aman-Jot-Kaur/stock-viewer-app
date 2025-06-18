import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import InviteLink from './InviteLink';
import Ledger from './Ledger';

const LedgerScreen = () => {
  return (
    <View style={styles.container}>
      <Ledger/>
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

export default LedgerScreen;
