import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const VerificationPending = () => {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Verification Pending</Text>

      {/* Description */}
      <Text style={styles.subtitle}>
        Your account verification is pending. Please check back later.
      </Text>

      {/* Go to Login Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')} // Replace 'Login' with your login screen route
      >
        <Text style={styles.buttonText}>Go to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VerificationPending;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
