import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Curriculum from '../components/Curriculum/Curriculum';
import Search from '../components/Search/Search';
import GetUser from '../components/Account/GetUser';
import Account from '../components/Account/Account';

const Tab = createBottomTabNavigator();

const TabNavigatorUserSV = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Đề cương"
      component={Curriculum}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="school-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Tra cứu đề cương"
      component={Search}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="search-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Hoạt động của bạn"
      component={GetUser}
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

export default TabNavigatorUserSV;