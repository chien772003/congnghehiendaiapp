import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Curriculum from '../components/Curriculum/Curriculum';
import GetUser from '../components/Account/GetUser';
import Account from '../components/Account/Account';
import Courses from '../components/Courses/Courses';
import Syllabus from '../components/Syllabus/Syllabus';

const Tab = createBottomTabNavigator();

const TabNavigatorUserGV = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Đề cương"
      component={Syllabus}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="book-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Đề cương của bạn"
      component={Curriculum}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="list-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Account"
      component={Account}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-outline" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default TabNavigatorUserGV;
