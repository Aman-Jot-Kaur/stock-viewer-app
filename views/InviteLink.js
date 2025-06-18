import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Button, Share, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { db } from '../firebaseCon';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const InviteLink = () => {
  const [activeTab, setActiveTab] = useState('Invite Link');
  const [userId, setUserId] = useState(null);
  const [inviteLink, setInviteLink] = useState('');
  const [invitedTraders, setInvitedTraders] = useState([]);
  const [inviter, setInviter] = useState(''); // State for inviter input

  useFocusEffect(
    React.useCallback(() => {
      const fetchUserId = async () => {
        const storedUserId = await AsyncStorage.getItem('userIdSA');
        if (storedUserId) {
          setUserId(storedUserId);
          setInviteLink(`${storedUserId}`);
          fetchInvitedTraders(storedUserId);
          fetchInviter(storedUserId);
        }
      };

      fetchUserId();
    }, [])
  );
  const fetchUserByInvitedByEmail = async (invitedByEmail) => {
    try {
      const q = query(collection(db, "users"), where("email", "==", invitedByEmail));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.docs.length > 0) {
        const userDoc = querySnapshot.docs[0];
        return userDoc;
      } else {
        console.error("User not found!");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  const fetchInvitedTraders = async (userId) => {
    const invitedTradersRef = doc(db, "users", userId);
    const docSnap = await getDoc(invitedTradersRef);
  
    if (docSnap.exists()) {
      const traders = docSnap.data().invitedTraders || [];
      setInvitedTraders(traders);
    } else {
      // Set the document with an empty invitedTraders array if it doesn't exist
      await setDoc(invitedTradersRef, { invitedTraders: [] });
      setInvitedTraders([]); // Set invited traders to empty array
    }
  };

  const fetchInviter = async (userId) => {
    const inviterRef = doc(db, "invitationList", userId);
    const docSnap = await getDoc(inviterRef);
    
    if (docSnap.exists()) {
      setInviter(docSnap.data().inviter || '');
    } else {
      // Set the document with default values if it doesn't exist
      await setDoc(inviterRef, { inviter: '' });
      setInviter(''); // Set inviter state to empty
    }
  };

  const saveInviter = async () => {
    if (inviter.trim() === '') return;
  
    try {
      const inviterRef = doc(db, "invitationList", userId);
      await setDoc(inviterRef, { inviter }, { merge: true }); // Use setDoc with merge option
    } catch (error) {
      console.error('Error saving inviter:', error);
    }
  };
  

  const onShare = async () => {
    try {
      await Share.share({
        message: `Share your invite id: ${inviteLink}`,
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabContainer}>
        {['Invite Link', 'Invite Traders', 'Settings'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === 'Invite Link' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}> Your invite code: {userId} </Text>
            <Button title="Share" onPress={onShare} color="#00c853" />
           
          </View>
        )}

        {activeTab === 'Invite Traders' && (
          <View style={styles.sectionContainer}>
            <View style={styles.invitedTradersCard}>
              <Text style={styles.invitedTradersText}>Total Invited Traders</Text>
              <Text style={styles.invitedTradersCount}>{invitedTraders.length}</Text>
            </View>
            <View style={styles.traderListContainer}>
              {invitedTraders.map((trader, index) => (
                <View key={index} style={styles.traderItem}>
                  <FontAwesome name="user-circle" size={24} color="white" style={styles.traderIcon} />
                  <Text style={styles.traderName}>{trader}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {activeTab === 'Settings' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Settings</Text>
            <Text style={styles.sectionContent}>Settings section</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212', padding: 20 },
  tabContainer: { flexDirection: 'row', marginBottom: 20 },
  tab: { paddingHorizontal: 15, paddingVertical: 10, marginRight: 20 },
  tabText: { color: 'white', fontSize: 16 },
  activeTabText: { fontWeight: 'bold' },
  content: { flexGrow: 1 },
  sectionContainer: { alignItems: 'center' },
  sectionTitle: { color: 'white', fontSize: 20, marginBottom: 20 },
  inviterLabel: { color: 'white', fontSize: 18, marginTop: 10 },
  input: {
    backgroundColor: 'rgb(40,40,40)',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    marginBottom: 15,
  },
  invitedTradersCard: {
    backgroundColor: 'rgba(0, 50, 80, 0.5)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  invitedTradersText: { color: 'gray', fontSize: 18, marginBottom: 10 },
  invitedTradersCount: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  traderListContainer: { marginTop: 10 },
  traderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgb(40,40,40)',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  traderIcon: { marginRight: 10 },
  traderName: { color: 'white', fontSize: 16 },
});

export default InviteLink;
