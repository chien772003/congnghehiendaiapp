// Home.js
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import DrawerNavigator from './DrawerNavigator'; // Đổi tên này thành tên file bạn đã định nghĩa

const Home = () => {
  return (
    <View style={styles.container}>
      <DrawerNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;
