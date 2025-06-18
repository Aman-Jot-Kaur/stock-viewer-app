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

