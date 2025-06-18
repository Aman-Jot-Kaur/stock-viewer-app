import React from 'react';
import { View, StyleSheet } from 'react-native';
import BottomNav from './BottomNav';
import PrivacyPolicy from './Privacy';
const PrivacyScreen = () => {
  return (
    <View style={styles.container}>
      <PrivacyPolicy/>
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

export default PrivacyScreen;
