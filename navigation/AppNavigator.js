import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
} from '@react-navigation/drawer';
import Toast from 'react-native-toast-message';
import CustomHeader from '../views/TopBar';
import CustomDrawerContent from '../components/CustomDrawer';

// All screens
import SignupScreen from '../views/SignupScreen';
import LoginScreen from '../views/LoginScreen';
import VerificationPending from '../views/Pending';
import GraphScreen from '../views/GraphScreen';
import TradeScreen from '../views/TradeScreen';
import MarketScreen from '../views/MarketScreen';
import ProfileScreen from '../views/ProfileScreen';
import BlotterScreen from '../views/BlotterScreen';
import WalletScreen from '../views/WalletScreen';
import StockInformationScreen from '../views/StockInformationScreen';
import DepositScreen from '../views/DepositScreen';
import WithdrawalScreen from '../views/WithdrawalScreen';
import LedgerScreen from '../views/LedgerScreen';
import ManageTradingAccountScreen from '../views/ManageTradingAccountScreen';
import ManageProfileScreen from '../views/ManageProfileScreen';
import PersonalProfile from '../views/PersonalProfile';
import InviteLinkScreen from '../views/InviteLinkScreen';
import Helpchatscreen from '../views/Helpchatscreen';
import ContactScreen from '../views/ContactScreen';
import PrivacyScreen from '../views/PrivacyScreen';
import SideBarLogout from '../views/SideBarLogout';
const Drawer = createDrawerNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Signup"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerStyle: { backgroundColor: 'black' },
          header: (props) => (
            <SafeAreaView style={{ backgroundColor: 'black' }}>
              <CustomHeader {...props} />
            </SafeAreaView>
          ),
          drawerActiveTintColor: 'white',
          drawerInactiveTintColor: 'gray',
        }}
      >
        {[
          { name: 'Signup', comp: SignupScreen },
          { name: 'Login', comp: LoginScreen },
          { name: 'Pending', comp: VerificationPending },
          { name: 'Graph', comp: GraphScreen },
          { name: 'Trade', comp: TradeScreen },
          { name: 'Market', comp: MarketScreen },
          { name: 'Profile', comp: ProfileScreen },
          { name: 'Blotter', comp: BlotterScreen },
          { name: 'Wallet', comp: WalletScreen },
          { name: 'Stock Information', comp: StockInformationScreen },
        ].map((s) => (
          <Drawer.Screen
            key={s.name}
            name={s.name}
            component={s.comp}
            options={{
              headerShown: (s.name==="Login"|| s.name=="Signup")?false: true,
              drawerItemStyle: { display: 'none' },
            }}
          />
        ))}

        <Drawer.Screen name="Deposit" component={DepositScreen} />
        <Drawer.Screen name="Withdrawal" component={WithdrawalScreen} />
        <Drawer.Screen name="Ledger" component={LedgerScreen} />
        <Drawer.Screen
          name="Manage Trading Account"
          component={ManageTradingAccountScreen}
        />
        <Drawer.Screen name="Manage Profile" component={ManageProfileScreen} />
        <Drawer.Screen
          name="PersonalProfile"
          component={PersonalProfile}
          options={{ drawerItemStyle: { display: 'none' } }}
        />
        <Drawer.Screen name="Invite Link" component={InviteLinkScreen} />
        <Drawer.Screen name="Help Chat" component={Helpchatscreen} />
        <Drawer.Screen name="Contact Us" component={ContactScreen} />
        <Drawer.Screen name="Privacy" component={PrivacyScreen} />
        <Drawer.Screen name="Logout" component={SideBarLogout} />
      </Drawer.Navigator>
      <Toast />
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    padding: 30,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    marginBottom: 10,
    flexDirection: 'row',
    gap: 20,
  },
  balanceCard: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1b1b1b',
    borderRadius: 10,
    borderColor: '#fff',
    borderWidth: 1,
    padding: 5,
    width: 150,
    gap: 20,
    marginBottom: 15,
    marginRight: 25,
  },
  label: {
    fontSize: 16,
    color: '#ffffff',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 40,
  },
  appName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
});