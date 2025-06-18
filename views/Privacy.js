import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";

const PrivacyPolicy = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.sectionTitle}>Introduction</Text>
        <Text style={styles.text}>
          This Privacy Policy governs the manner in which the app Android Application collects, uses,
          maintains, and discloses information collected from users (each, a "User") of the app Android
          Application ("App"). This Privacy Policy applies to the App and all products and services offered by
          app.
        </Text>

        <Text style={styles.sectionTitle}>Personal Identification Information</Text>
        <Text style={styles.text}>
          We may collect personal identification information from Users in various ways, including, but not limited
          to, when Users visit our App, register on the App, subscribe to the newsletter, and in connection with
          other activities, services, features, or resources we make available on our App. Users may be asked for,
          as appropriate, name, email address, and phone number. Users may, however, visit our App anonymously.
          We will collect personal identification information from Users only if they voluntarily submit such
          information to us. Users can always refuse to supply personal identification information, except that it
          may prevent them from engaging in certain App-related activities.
        </Text>

        <Text style={styles.sectionTitle}>Non-personal Identification Information</Text>
        <Text style={styles.text}>
          We may collect non-personal identification information about Users whenever they interact with our App.
          Non-personal identification information may include the browser name, the type of computer, and technical
          information about Users' means of connection to our App, such as the operating system and the Internet
          service providers utilized and other similar information.
        </Text>

        <Text style={styles.sectionTitle}>How We Use Collected Information</Text>
        <Text style={styles.text}>
          app may collect and use Users' personal information for the following purposes:
        </Text>
        <Text style={styles.listItem}>- To personalize user experience</Text>
        <Text style={styles.listItem}>- To improve our App</Text>
        <Text style={styles.listItem}>- To send periodic emails</Text>

        <Text style={styles.sectionTitle}>How We Protect Your Information</Text>
        <Text style={styles.text}>
          We adopt appropriate data collection, storage, and processing practices and security measures to protect
          against unauthorized access, alteration, disclosure, or destruction of your personal information, username,
          password, transaction information, and data stored on our App.
        </Text>

        <Text style={styles.sectionTitle}>Changes to This Privacy Policy</Text>
        <Text style={styles.text}>
          app has the discretion to update this Privacy Policy at any time. When we do, we will revise the
          updated date at the bottom of this page. We encourage Users to frequently check this page for any changes
          to stay informed about how we are helping to protect the personal information we collect. You acknowledge
          and agree that it is your responsibility to review this Privacy Policy periodically and become aware of
          modifications.
        </Text>

        <Text style={styles.sectionTitle}>Your Acceptance of These Terms</Text>
        <Text style={styles.text}>
          By using this App, you signify your acceptance of this Privacy Policy. If you do not agree to this Privacy
          Policy, please do not use our App. Your continued use of the App following the posting of changes to this
          Privacy Policy will be deemed your acceptance of those changes.
        </Text>

        <Text style={styles.sectionTitle}>Contacting Us</Text>
        <Text style={styles.text}>
          If you have any questions about this Privacy Policy, the practices of this App, or your dealings with this
          App, please contact us at info@grandprimeforex.com.
        </Text>
      </ScrollView>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: "#1E90FF",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign:'center'
  },
  text: {
    fontSize: 14,
    color: "#d3d3d3",
    marginBottom: 15,
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    color: "#d3d3d3",
    marginLeft: 15,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PrivacyPolicy;
