import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import Graph from './Graph';
import BottomNav from './BottomNav';

const GraphScreen = () => {
  return (
    <View style={styles.container}>
      <Graph />
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

export default GraphScreen;
