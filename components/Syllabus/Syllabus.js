import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const Syllabus = ({ onBack }) => {
  return (
    <View style={styles.container}>
      <Button title="Quay lại" onPress={onBack} />
      <Text>Syllabus Component</Text>
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

export default Syllabus;
