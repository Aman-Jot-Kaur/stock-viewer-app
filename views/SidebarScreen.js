import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const SidebarScreen = () => {
  return (
    <View style={styles.container}>
      <Sidebar/> 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
});

export default SidebarScreen;
