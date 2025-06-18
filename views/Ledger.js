import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseCon'; // Adjust path to your Firebase config
import { useFocusEffect } from '@react-navigation/native';

const Ledger = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchRequests = async () => {
        setLoading(true);
        try {
          const storedUserEmail = await AsyncStorage.getItem('userEmailSA');
          console.log('Stored User Email:', storedUserEmail);

          if (!storedUserEmail) {
            console.log('No email found');
            setLoading(false);
            return;
          }

          // Fetch all documents from the `requests` collection
          const requestsRef = collection(db, 'WithdrawRequest');
          const snapshot = await getDocs(requestsRef);

          const allRequests = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Filter requests manually based on email and status
          const filteredRequests = allRequests
            .filter(
              (request) =>
                request.email === storedUserEmail && request.status === 'accepted'
            )
            .sort((a, b) => b.timestamp.seconds - a.timestamp.seconds); // Sort by latest timestamp

          console.log('Filtered Requests:', filteredRequests);

          setRequests(filteredRequests);
        } catch (error) {
          console.error('Error fetching requests:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchRequests();
    }, [])
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
      <Text style={styles.header}>Your Ledger</Text>
      <ScrollView>
        {requests.length > 0 ? (
          requests.map((request) => (
            <View key={request.id} style={styles.card}>
              <Text style={styles.requestTitle}>
                {request.type.charAt(0).toUpperCase() + request.type.slice(1)}
              </Text>
              <Text style={styles.detail}>
                Amount: {request.amount} Rs
              </Text>
              {/* <Text style={styles.detail}>
                Total Amount: {request.totalAmount}
              </Text> */}
              <Text style={styles.detail}>
                Time Stamp: {new Date(request.timestamp.seconds * 1000).toLocaleString()}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noRequestsText}>No approved requests found</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#1C1C1E', padding: 16 },
  header: { marginTop: 25, fontSize: 24, color: '#FFFFFF', textAlign: 'center', marginBottom: 35 },
  card: { backgroundColor: 'rgba(0, 50, 80, 0.5)', borderRadius: 10, padding: 16, marginBottom: 20, display:"flex",gap: 10 },
  requestTitle: { fontSize: 18, fontWeight: 'bold', color: '#34C759' },
  detail: { fontSize: 16, color: '#FFFFFF' },
  date: { color: '#A1A1A1' },
  noRequestsText: { color: '#A1A1A1', textAlign: 'center', marginTop: 20 },
  centerContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Ledger;
