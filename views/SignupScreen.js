import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Image } from "react-native";
import * as FileSystem from "expo-file-system"; // Import expo-file-system

import Toast from "react-native-toast-message";
import * as DocumentPicker from "expo-document-picker";
import { send, EmailJSResponseStatus } from '@emailjs/react-native';
import { doc, setDoc } from "firebase/firestore";
import { auth, db, storage , app} from "../firebaseCon"; // Ensure Firebase is initialized

import { useNavigation } from "@react-navigation/native";
import { query,getDocs, collection, updateDoc, where, arrayUnion } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupScreen = () => {
  const [step, setStep] = useState(1); // Current step (1, 2, or 3)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name,setName]= useState("");
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [documentFile2, setDocumentFile2] = useState(null); // For Base64 image
  const [invitedby, setInvitedBy] = useState("");

  const navigation = useNavigation();

  const handleNextStep = () => {
    if (step === 1 && (!email || !password || !name)) {
      Toast.show({ type: "error", text1: "Name, Email and Password are required." });
      return;
    }
    if (step === 2 && otp !== generatedOtp) {
      Toast.show({ type: "error", text1: `${generatedOtp}` });
      return;
    }
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSendOTP = async () => {
    if (!email) {
      Toast.show({ type: "error", text1: "Enter a valid email." });
      return;
    }
    const otp = Math.floor(100000 + Math.random() * 900000); // Generate OTP
    setGeneratedOtp(otp);

    try {
      const response = await send(
        'service_tinn6xj', // Replace with your EmailJS Service ID
        'template_dqhhdt5', // Replace with your EmailJS Template ID
        {
          user_name: "user", // Variable passed to the EmailJS template
          user_email: email,
          otp_code: otp, // Variable passed to the EmailJS template
          message: 'This is a test message sent from the React Native app.', // Custom message
        },
        {
          publicKey: 'OcTpocYuldS4L7Y0b', // Replace with your EmailJS Public Key
        }
      );

      if (response && response.status === 200) {
        // OTP Sent successfully
      } else {
        throw new Error('Unexpected response status');
      }
    } catch (err) {
      console.error('Error sending OTP:', err);
    }
  };

  const handleVerifyOTP = () => {
    if (otp == generatedOtp && otp !== "") {
      Toast.show({
        type: "success",
        text1: "OTP Verified Successfully!",
      });
      setStep(3)
    } else {
      Toast.show({
        type: "error",
        text1: `Generated OTP: ${generatedOtp}, Entered OTP: ${otp}`,
      });
    }
  };

  // Handle document upload and convert to Base64
 // Handle document upload and convert to Base64
 const handleDocumentUpload = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*", // Only allow image file types
    });

    console.log("DocumentPicker result:", result); // Log the result to debug
    const mimeType = result.assets[0].mimeType;

    if (result.canceled === false) {
      const fileUri = result.assets[0].uri;  // Correct URI path from result

      // Ensure it's an image file (JPEG, PNG, etc.)
      if (mimeType && mimeType.startsWith("image/")) {
        // Use expo-file-system to read the local file and convert it to Base64
        const base64String = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64, // Read file as Base64
        });

        setDocumentFile(base64String); // Save Base64 string for later use
        Toast.show({ type: "success", text1: "Image Uploaded as Base64!" });
      } else {
        Toast.show({ type: "error", text1: `Please upload a valid image file. Not ${mimeType}` });
      }
    } else {
      Toast.show({ type: "info", text1: "Document selection was canceled." });
    }
  } catch (error) {
    console.error("Error uploading document:", error);
    Toast.show({ type: "error", text1: "Failed to upload image." });
  }
};
const handleDocumentUpload2 = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*", // Only allow image file types
    });

    console.log("DocumentPicker result:", result); // Log the result to debug
    const mimeType = result.assets[0].mimeType;

    if (result.canceled === false) {
      const fileUri = result.assets[0].uri;  // Correct URI path from result

      // Ensure it's an image file (JPEG, PNG, etc.)
      if (mimeType && mimeType.startsWith("image/")) {
        // Use expo-file-system to read the local file and convert it to Base64
        const base64String = await FileSystem.readAsStringAsync(fileUri, {
          encoding: FileSystem.EncodingType.Base64, // Read file as Base64
        });

        setDocumentFile2(base64String); // Save Base64 string for later use
        Toast.show({ type: "success", text1: "Image Uploaded as Base64!" });
      } else {
        Toast.show({ type: "error", text1: `Please upload a valid image file. Not ${mimeType}` });
      }
    } else {
      Toast.show({ type: "info", text1: "Document selection was canceled." });
    }
  } catch (error) {
    console.error("Error uploading document:", error);
    Toast.show({ type: "error", text1: "Failed to upload image." });
  }
};
  
  

  const handleSignup = async () => {
    if (!email || !password) {
      Toast.show({ type: "error", text1: "Please fill in all fields." });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", userCredential.user.uid), {
        email: email,
        documentFront: documentFile,
        name: name,
        documentBack: documentFile2, // Save the Base64 document here
        status: "active",
        subadmins: ["santosh9kumar91@gmail.com"],
        password: password
      });

      if (invitedby !== "") {
        const q = query(collection(db, "users"), where("email", "==", invitedby));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.docs.length > 0) {
          const invitedByDoc = querySnapshot.docs[0].ref;
          await updateDoc(invitedByDoc, {
            invitedTraders: arrayUnion(email),
          });
          console.log("User added to invitedTraders");
        } else {
          console.error("User not found!");
        }
      }

      Toast.show({ type: "success", text1: "Signup Successful!" });
      navigation.navigate("Login");
    } catch (error) {
      console.error("Error signing up:", error);
      Toast.show({ type: "error", text1: "Signup Failed!" });
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
             <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor="gray"
              value={name}
              onChangeText={setName}
              
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleNextStep}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Already have an account? Login</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <View>
            <TouchableOpacity style={styles.button} onPress={handleSendOTP}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor="gray"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={6}
            />
            <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View>
            <TouchableOpacity style={styles.button} onPress={handleDocumentUpload}>
              <Text style={styles.buttonText}>
                {documentFile ? "Document front Uploaded" : "Upload Document front"}
              </Text>
            </TouchableOpacity>
            {documentFile && (
              <Image
                source={{ uri: `data:image/png;base64,${documentFile}` }}  // Base64 image rendering
                style={{ width: 200, height: 200 , margin:20}}
              />
            )}
             <TouchableOpacity style={styles.button} onPress={handleDocumentUpload2}>
              <Text style={styles.buttonText}>
                {documentFile2 ? "Document back Uploaded" : "Upload Document back"}
              </Text>
            </TouchableOpacity>
            {documentFile2 && (
              <Image
                source={{ uri: `data:image/png;base64,${documentFile2}` }}  // Base64 image rendering
                style={{ width: 200, height: 200 , margin:20}}
              />
            )}
            <TextInput
              style={styles.input}
              placeholder="Invite mail"
              placeholderTextColor="gray"
              value={invitedby}
              onChangeText={setInvitedBy}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Step {step} of 3</Text>
      {renderStep()}

      {/* Back Button */}
      {step > 1 && (
        <TouchableOpacity style={styles.backButton} onPress={handlePreviousStep}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "black",
  },
  title: {
    color: "white",
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "rgba(255,255,255,0.1)",
    color: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "gray",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: 'center'
  },
});

export default SignupScreen;
