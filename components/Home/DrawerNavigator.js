import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Categories from '../Categories/Categories';
import Courses from '../Courses/Courses';
import Syllabus from '../Syllabus/Syllabus';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Categories">
      <Drawer.Screen name="Categories" component={Categories} />
      <Drawer.Screen name="Courses" component={Courses} />
      <Drawer.Screen name="Syllabus" component={Syllabus} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
