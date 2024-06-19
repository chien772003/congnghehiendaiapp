
import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Categories from '../Categories/Categories';
import Syllabus from '../Syllabus/Syllabus';
import Courses from '../Courses/Courses';


const Home = () => {
  const [currentComponent, setCurrentComponent] = useState(null);
  const renderComponent = () => {
    switch (currentComponent) {
      case 'Categories':
        return <Categories onBack={() => setCurrentComponent(null)} />;
      case 'Courses':
        return <Courses onBack={() => setCurrentComponent(null)} />;
      case 'Syllabus':
        return <Syllabus onBack={() => setCurrentComponent(null)} />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {currentComponent ? (
        <View style={styles.fullScreenComponent}>
          {renderComponent()}
        </View>
      ) : (
        <View style={styles.buttonBar}>
          <Button title="Categories" onPress={() => setCurrentComponent('Categories')} />
          <Button title="Courses" onPress={() => setCurrentComponent('Courses')} />
          <Button title="Syllabus" onPress={() => setCurrentComponent('Syllabus')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#ddd',
  },
  fullScreenComponent: {
    flex: 1,
  },
});

export default Home;
