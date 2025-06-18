import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.navBar}>
      <TouchableOpacity onPress={() => navigation.navigate('Graph')}>
        <Icon 
          name="bar-chart" 
          size={28} 
          color={route.name === 'Graph' ? 'red' : 'white'} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Trade')}>
        <Icon 
          name="swap-vert" 
          size={28} 
          color={route.name === 'Trade' ? 'red' : 'white'} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Market')}>
        <Icon 
          name="timeline" 
          size={28} 
          color={route.name === 'Market' ? 'red' : 'white'} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Blotter')}>
        <Icon 
          name="receipt" 
          size={28} 
          color={route.name === 'Blotter' ? 'red' : 'white'} 
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Wallet')}>
        <Icon 
          name="account-balance-wallet" 
          size={28} 
          color={route.name === 'Wallet' ? 'red' : 'white'} 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    backgroundColor: '#1c72b4', // Background color of the bottom navbar
  },
});

export default BottomNav;
