import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomNav from './BottomNav';
import { useNavigation, useRoute } from '@react-navigation/native';
import HelpChat from './HelpChat';
const Helpchatscreen = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      
      <HelpChat/>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#1c72b4', // Blue background color
    paddingVertical: 15,
    marginTop: 22,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  accountText: {
    color: 'white',
    fontSize: 18,
    marginRight: 5, // Space between text and arrow
  },
});


  
  
  

export default Helpchatscreen;
