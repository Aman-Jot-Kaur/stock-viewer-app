import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BarChartScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Bar Chart Screen</Text>
      {/* Your bar chart or content here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BarChartScreen;
