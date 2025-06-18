import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
  TextInput,
} from "react-native";
import TradingViewCurrencyPairsWidget from "./Positionmarket"
import { collection, query, where, getDocs } from 'firebase/firestore'; // Updated Firestore imports
import { db } from '../firebaseCon'; // Firebase config
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import TradingViewForexScreenerWidget from './Minichart'

const Market = () => {
  const [activeTab, setActiveTab] = useState("Wishlist");

  const [loading, setLoading] = useState(false);

  const [trades, setTrades] = useState([]);



 

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
  
      try {
        const storedUserId = await AsyncStorage.getItem('userEmailSA');
        if (!storedUserId) {
          Toast.show({ type: 'error', text1: 'User ID not found' });
   ;
          return;
        }
  
        const tradesQuery = query(
          collection(db, 'trades'),
          where('email', '==', storedUserId)
        );
  
        const querySnapshot = await getDocs(tradesQuery);
        const fetchedTrades = querySnapshot.docs.map(doc => doc.data());
      
  console.log(fetchedTrades,"ffrreesfsdfdsgvdghfc htgrhjtfbjhtrbhntfbhtfyh")
        setTrades(fetchedTrades);
      } catch (error) {
        console.error('Error fetching trades:', error);
        Toast.show({ type: 'error', text1: 'Error loading trades' });
      } finally {
        setLoading(false);
      }}
  
      fetchTrades();
   

  
  }
, []);

 


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  const fetchTrades = async () => {
    setLoading(true);

    try {
      const storedUserId = await AsyncStorage.getItem('userEmailSA');
      if (!storedUserId) {
        Toast.show({ type: 'error', text1: 'User ID not found' });
        setLoading(false);
        return;
      }

      const tradesQuery = query(
        collection(db, 'trades'),
        where('email', '==', storedUserId)
      );

      const querySnapshot = await getDocs(tradesQuery);
      const fetchedTrades = querySnapshot.docs.map(doc => doc.data());
    
console.log(fetchedTrades,"ffrreesfsdfdsgvdghfc htgrhjtfbjhtrbhntfbhtfyh")
      setTrades(fetchedTrades);
    } catch (error) {
      console.error('Error fetching trades:', error);
      Toast.show({ type: 'error', text1: 'Error loading trades' });
    } finally {
      setLoading(false);
    }

    fetchTrades();
  };}
  const renderTabContent = () => {
    if (loading) {
      return ( 
      <View>
       <Text
                              style={[
                                styles.change,
                                {
                                  color:
                                    "white", // Red for negative, green for positive
                                },
                              ]}
                            >
                             Please wait while data loads
                            </Text></View> );
    }

   if(!loading){ switch (activeTab) {
        case "Wishlist":
          return (
            <View >
            
            <TradingViewCurrencyPairsWidget/>
          </View>
          );
        
        
      case "Positions":
        return (
          <View >
            
            <TradingViewForexScreenerWidget/>
          </View>
        );
      case "Orders":
       
            return(
             <ScrollView >
        <View style={orderstyles.content}>
          {trades.length === 0 && (
            <Text style={orderstyles.noTradesText}>No trades here</Text>
          )}
          {trades.map((trade, index) => (
            <View key={index} style={orderstyles.card}>
              <View style={orderstyles.cardHeader}>
                <Text style={orderstyles.stockSymbol}>{trade.currency}</Text>
                <View style={orderstyles.stockPairContainer}>
                  <Text style={orderstyles.stockPair}>{trade.currencyPair}</Text>
                  <View style={orderstyles.flagContainer}>
                    <Text style={orderstyles.buyButtonText}>{trade.type}</Text>
                  </View>
                </View>
                <View style={orderstyles.header}>
                  <TouchableOpacity style={orderstyles.buyButton}>
                    <Text style={orderstyles.buyButtonText}>BUY {trade.buy} Rs</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={orderstyles.sellButton}>
                    <Text style={orderstyles.sellButtonText}>SELL {trade.sell} Rs</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={orderstyles.transactionDetails}>
                <Text style={orderstyles.transactionRow}>Quantity: {trade.quantity}</Text>
                <Text style={orderstyles.transactionRow}>Date: {trade.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
        
            )
      case "Price Alerts":
        return (
          <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text style={{
              color:'white',
              fontSize:16,
            }}>No Price Alert Found</Text>
          </View>
        );
      case "History":
        return (
          <View style={{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
          }}>
            <Text style={{
              color:'white',
              fontSize:16,
            }}>No History Found</Text>
          </View>
        );
      default:
        return null;
    }
  };
  }
  return (
    <View style={styles.container}>
   
     

      <ScrollView contentContainerStyle={styles.content}>
      <FlatList
        data={["Wishlist", "Positions", "Orders", "Price Alerts"]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.tabContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.tab, activeTab === item && styles.activeTab]}
            onPress={() => handleTabClick(item)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === item && styles.activeTabText,
              ]}
            >
              {item}
            </Text>
            <View style={{
                paddingHorizontal:16,
              }}>

             
              </View>
          </TouchableOpacity>
        )}/>
      
        {renderTabContent()}
      </ScrollView>
    </View>
  );
};
const orderstyles=StyleSheet.create({
  content: {
    paddingBottom: 20, // Add padding to avoid cutting off content
  },
  noTradesText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  card: {
    marginTop: 20,
    backgroundColor: 'rgba(0, 50, 80, 0.5)',
    borderRadius: 10,
    padding: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  stockSymbol: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  buyButton: {
    borderColor: '#1cb85c',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  buyButtonText: {
    color: '#1cb85c',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sellButton: {
    borderColor: 'red',
    borderWidth: 2,
    borderRadius: 5,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginLeft: 30,
  },
  sellButtonText: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDetails: {
    marginTop: 15,
  },
  transactionRow: {
    color: 'white',
    fontSize: 14,
  },
  sellButton: {
  
    borderWidth: 1,
    borderColor: "#E94560",
    paddingHorizontal: 16,
    borderRadius: 5,
    width: 90, // Set the same fixed width as the sell button
    alignItems: "center",
    marginTop:50
  },
  buyButton: {
    borderWidth: 1,
    borderColor: "#1CB85C",
    paddingHorizontal: 16,
    borderRadius: 5,
    marginTop:30,
    width: 90, // Set the same fixed width as the sell button
    alignItems: "center",
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A1A1D",
    padding: 20,
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
    height: 50,
  },
  tab: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 15,
  },
  tabText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#FFFFFF",
  },
  activeTabText: {
    fontWeight: "bold",
  },
  content: {
    flexGrow: 1,
    paddingBottom: 130,
  },
  searchInput: {
    height: 40,
    position:'fixed',
    top:30,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  card: {
    padding: 5,
    paddingHorizontal: 16,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    marginTop: 30,
  },

  symbol: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  change: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  change1: {
    fontSize: 16,
    marginTop: 2,
    color: "#FFFFFF",
    fontWeight: "medium",
    paddingHorizontal: 8, // Add padding for a better appearance
    paddingVertical: 4, // Adjust vertical padding
    borderRadius: 4, // Optional: Add rounded corners
    alignSelf: "flex-start",
  },
  priceInfo: {
    gap: 10,
    flexDirection: "column",
  },
  priceText: {
    fontSize: 16,
    maxWidth: 80,
    color: "#FFFFFF",
  },
  buttons: {
    flexDirection: "column",
    gap: 10,
  },
  sellButton: {
  
    borderWidth: 1,
    borderColor: "#E94560",
    paddingHorizontal: 16,
    borderRadius: 5,
    width: 110, // Set the same fixed width as the sell button
    alignItems: "center",
  },
  buyButton: {
    borderWidth: 1,
    borderColor: "#1CB85C",
    paddingHorizontal: 16,
    borderRadius: 5,
    width: 110, // Set the same fixed width as the sell button
    alignItems: "center",
  },
});

export default Market;