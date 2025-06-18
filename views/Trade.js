import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore'; // Updated Firestore imports
import { db } from '../firebaseCon'; // Firebase config
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const Trade = () => {
  const [activeTab, setActiveTab] = useState('Open'); // Default to 'Open' tab
  const [loading, setLoading] = useState(false);
  const [trades, setTrades] = useState([]);

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const todayDate = getCurrentDate();

  useFocusEffect(
    React.useCallback(() => {
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
          const filteredTrades = fetchedTrades.filter(trade =>
            (activeTab === 'Open' ? trade.status === 'Open' : trade.status === 'Close'
            && (trade.date === todayDate)) // Filter by email and today's date

          );

          setTrades(filteredTrades);
        } catch (error) {
          console.error('Error fetching trades:', error);
          Toast.show({ type: 'error', text1: 'Error loading trades' });
        } finally {
          setLoading(false);
        }
      };

      fetchTrades();
    }, [activeTab])
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#3c42ca" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'Open' && styles.activeTab]}
          onPress={() => setActiveTab('Open')}
        >
          <Text style={[styles.tabText, activeTab === 'Open' && styles.activeTabText]}>
            Open
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, activeTab === 'Close' && styles.activeTab]}
          onPress={() => setActiveTab('Closed')}
        >
          <Text style={[styles.tabText, activeTab === 'Close' && styles.activeTabText]}>
            Closed
          </Text>
        </TouchableOpacity>
      </View>

      {/* Add ScrollView for scrolling */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.content}>
          {trades.length === 0 && (
            <Text style={styles.noTradesText}>No trades here</Text>
          )}
          {trades.map((trade, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.stockSymbol}>{trade.currency}</Text>
                <View style={styles.stockPairContainer}>
                  <Text style={styles.stockPair}>{trade.currencyPair}</Text>
                  <View style={styles.flagContainer}>
                    <Text style={styles.buyButtonText}>{trade.type}</Text>
                  </View>
                </View>
                <View style={styles.header}>
                  <TouchableOpacity style={styles.buyButton}>
                    <Text style={styles.buyButtonText}>BUY {trade.buy} Rs</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.sellButton}>
                    <Text style={styles.sellButtonText}>SELL {trade.sell} Rs</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionRow}>Quantity: {trade.quantity}</Text>
                <Text style={styles.transactionRow}>Date: {trade.date}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    borderBottomColor: '#444',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  tabText: {
    color: 'white',
    fontSize: 20,
  },
  activeTab: {
    borderBottomWidth: 4,
    borderBottomColor: 'white',
  },
  activeTabText: {
    fontWeight: 'bold',
  },
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
});

export default Trade;
