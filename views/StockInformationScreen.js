import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import Sidebar from './Sidebar';
import StockInformation from './StockInformation';

const StockInformationScreen = () => {
  return (
    <View style={styles.container}>
      <StockInformation/> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default StockInformationScreen;
