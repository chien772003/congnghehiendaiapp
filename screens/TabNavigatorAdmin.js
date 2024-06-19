import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../components/Home/Home';
import GetUser from '../components/Account/GetUser';
import Account from '../components/Account/Account';

const Tab = createBottomTabNavigator();

const TabNavigatorAdmin = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Quản lý hệ thống"
      component={Home}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="albums-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Quản lý tài khoản"
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

export default TabNavigatorAdmin;
