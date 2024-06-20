import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import Curriculum from '../components/Curriculum/Curriculum';
import Search from '../components/Search/Search';
import GetUser from '../components/Account/GetUser';
import Account from '../components/Account/Account';
import SearchCurriculum from '../components/Curriculum/SearchCurriculum'
import Syllabus from '../components/Syllabus/Syllabus';
const Tab = createBottomTabNavigator();

const TabNavigatorUserSV = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Các Khóa học"
      component={Curriculum}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="school-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Tra cứu đề cương"
      component={SearchCurriculum}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="search-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Hoạt động của bạn"
      component={Syllabus}
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
