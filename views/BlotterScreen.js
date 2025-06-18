import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import Graph from './Graph';
import BottomNav from './BottomNav';
import Blotter from './Blotter';

const BlotterScreen = () => {
  return (
    <View style={styles.container}>
      <Blotter />
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

export default BlotterScreen;
