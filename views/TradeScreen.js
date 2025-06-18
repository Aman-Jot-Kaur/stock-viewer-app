import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';

import BottomNav from './BottomNav';
import Trade from './Trade';

const TradeScreen = () => {
  return (
    <View style={styles.container}>
      <Trade/>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"black"
  },
});

export default TradeScreen;
