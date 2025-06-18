// Sidebar.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // You can use other icon sets like FontAwesome
import { useNavigation, useRoute } from '@react-navigation/native';

const Sidebar = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('DepositScreen')}>
        <Icon name="home-outline" size={20} color="#4CAF50" />
        <Text style={styles.menuText}>Deposits</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('WithdrawalScreen')}>
        <Icon name="card-outline" size={20} color="#F44336" />
        <Text style={styles.menuText}>Withdrawal</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LedgerScreen')}>
        <Icon name="cube-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Your Lezure</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ManageTradingAccountScreen')}>
        <Icon name="wallet-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Manage Trading Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('ManageProfileScreen')}>
        <Icon name="person-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Manage Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
        <Icon name="settings-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
        <Icon name="information-circle-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>About Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('InviteLinkScreen')}>
        <Icon name="link-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Invite Link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('BlotterScreen')}>
        <Icon name="calendar-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Events</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Contact')}>
        <Icon name="call-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Contact Us</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LiveChat')}>
        <Icon name="chatbubble-ellipses-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Live Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('About')}>
        <Icon name="information-circle-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>About</Text>
      </TouchableOpacity>

      {/* Privacy Policy Menu Item */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacyPolicy')}>
        <Icon name="shield-checkmark-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Privacy Policy</Text>
      </TouchableOpacity>
      {/* Temporary route for login */}
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('LoginScreen')}>
        <Icon name="chatbubble-ellipses-outline" size={20} color="#fff" />
        <Text style={styles.menuText}>Log In</Text>
      </TouchableOpacity>

      <View style={styles.bottomMenu}>
        <TouchableOpacity onPress={() => navigation.navigate('Logout')}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A1A',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    marginLeft: 15,
    color: '#fff',
    fontSize: 16,
  },
  bottomMenu: {
    marginTop: 'auto',
    paddingVertical: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
  },
  privacyText: {
    color: '#2196F3',
    fontSize: 12,
    marginTop: 10,
  },
});

export default Sidebar;
