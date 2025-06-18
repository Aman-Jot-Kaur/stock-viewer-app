import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import Navigation from './navigation/AppNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      {/* <View>
        <Text>Hello World</Text>
      </View> */}
      <Navigation/>
       <Toast /> 
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: 'black',
  },
});
