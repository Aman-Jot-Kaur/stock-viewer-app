import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import Profile from './Profile';
import BottomNav from './BottomNav';
const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Profile/>
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

export default ProfileScreen;
