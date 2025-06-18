import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Linking } from 'react-native';
import { db } from '../firebaseCon'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons'; // Importing Ionicons
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const ContactUs = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchContactInfo = async () => {
        try {
          const contactCollectionRef = collection(db, 'Contact');
          const contactDocs = await getDocs(contactCollectionRef);
          const contactData = contactDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

          // Assuming there's only one document with contact info
          if (contactData.length > 0) {
            setContactInfo(contactData[0]); // Set the first document as contact info
          }
        } catch (error) {
          console.error('Error fetching contact info:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchContactInfo();

      // Optionally, cleanup if needed when the screen loses focus
      return () => {
        setContactInfo(null); // Reset contact info if desired
        setLoading(true);
      };
    }, []) // Empty dependency array ensures this runs only when the screen gains focus
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3c42ca" />
      </View>
    );
  }

  if (!contactInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No contact information available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Us</Text>

      <View style={styles.contactRow}>
        <Icon name="call-outline" size={20} color="#00bfff" />
        <Text style={styles.label}> Admin Number:</Text>
        <Text
          style={styles.contactText}
          onPress={() => Linking.openURL(`tel:${contactInfo.adminNumber}`)}
        >
          {contactInfo.adminNumber}
        </Text>
      </View>

      <View style={styles.contactRow}>
        <Icon name="logo-whatsapp" size={20} color="#25D366" />
        <Text style={styles.label}> WhatsApp Number:</Text>
        <Text
          style={styles.contactText}
          onPress={() => Linking.openURL(`https://wa.me/${contactInfo.whatsappNumber}`)}
        >
          {contactInfo.whatsappNumber}
        </Text>
      </View>

      <View style={styles.contactRow}>
        <Icon name="logo-telegram" size={20} color="#0088cc" />
        <Text style={styles.label}> Telegram ID:</Text>
        <Text
          style={styles.contactText}
          onPress={() => Linking.openURL(`https://t.me/${contactInfo.telegramId}`)}
        >
          {contactInfo.telegramId}
        </Text>
      </View>

      <View style={styles.contactRow}>
        <Icon name="logo-instagram" size={20} color="#C13584" />
        <Text style={styles.label}> Instagram ID:</Text>
        <Text
          style={styles.contactText}
          onPress={() => Linking.openURL(`https://instagram.com/${contactInfo.instagramId}`)}
        >
          {contactInfo.instagramId}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0c0c0c',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 20,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 10,
  },
  contactText: {
    fontSize: 16,
    color: '#00bfff',
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ContactUs;
