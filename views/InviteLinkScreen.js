import React from 'react';
import { View, StyleSheet } from 'react-native';
import TopBar from './TopBar';
import BottomNav from './BottomNav';
import InviteLink from './InviteLink';

const InviteLinkScreen = () => {
  return (
    <View style={styles.container}>
      <InviteLink/>
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

export default InviteLinkScreen;
