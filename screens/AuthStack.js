import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login/Login';
import RegisterGV from '../components/Login/RegisterGV';
import RegisterSV from '../components/Login/RegisterSV';

const Stack = createStackNavigator();

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="RegisterGV" component={RegisterGV} />
    <Stack.Screen name="RegisterSV" component={RegisterSV} />
  </Stack.Navigator>
);

export default AuthStack;
