import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import Market from './Market';

const MarketScreen = () => {
  return (
    <View style={styles.container}>
      <Market/>
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

export default MarketScreen;
