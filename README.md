<div style="display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; align-items: center;">
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/0e807706-3c1d-4af5-a0aa-0d2b9ccc1863" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/7025235a-a614-4d7c-8c37-45b6d3abd654" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/2ad44cd9-dec6-4e54-8537-ddb710faf7ce" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/041098dd-529e-40e1-85de-b75a5820acb1" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/c5e07e51-47d8-4908-aa66-2ab0b14c1fc5" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/f13c1446-5de2-4510-a04d-af599cb73256" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/f162a8d1-fb3b-4978-a390-644b0368eb67" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/8a86de16-030b-4cda-99b3-7e10c749e580" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/a6317e0c-6923-4606-b410-e9907d9b3bd3" />
  <img width="150" style="margin:10px" alt="image" src="https://github.com/user-attachments/assets/8616d063-55df-498b-91b1-c725f67d64d7" />
</div>



to run:
npm i
npx expo start --clear
also create your own firebaseCon.js:


import { initializeApp } from "firebase/app";
import {
 initializeAuth,
 getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
 persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize other services
const db = getFirestore(app);
const rtdb = getDatabase(app);
const storage = getStorage(app);

export { app, auth, db, rtdb, storage };
how you can create your own expo app?:
step 1: npx create-expo-app@latest stocks2 --template javascript 
step 2: npx expo install react-native-web @expo/metro-runtime   

// create your index.js and App.js 
import { registerRootComponent } from 'expo';
import App from '../stocks2/App';
registerRootComponent(App);



step 2 helps in running on web
step 3: npm i expo react react-native react-native-safe-area-contex
step 4: make sure expo react native version are compatible
npx expo start --clear

let us start building:
npx expo install react-native-screens
npx expo install @react-navigation/native @react-navigation/stack @react-navigation/drawer
npx expo install react-native-gesture-handler

 npx expo start --clear //clear cache and run every changes

