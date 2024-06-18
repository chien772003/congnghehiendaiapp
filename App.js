import React, { useReducer } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';

import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Curriculum from './components/Curriculum/Curriculum';
import GetUser from './components/Account/GetUser';
import Account from './components/Account/Account';
import RegisterGV from './components/Login/RegisterGV';
import RegisterSV from './components/Login/RegisterSV';
import Reducer from './configs/Reducer';
import MyContext from './configs/MyContext';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen
      name="Các đề cương"
      component={Curriculum}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="book-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Tìm Kiếm"
      component={Categories}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="search-outline" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Danh sách yêu cầu"
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

const AuthStack = () => (
  <Stack.Navigator initialRouteName="Login">
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="RegisterGV" component={RegisterGV} />
    <Stack.Screen name="RegisterSV" component={RegisterSV} />
  </Stack.Navigator>
);

const App = () => {
  const [user, dispatch] = useReducer(Reducer, null);

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        {user === null ? (
          <AuthStack />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="App" component={TabNavigator} options={{ headerShown: false }} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </MyContext.Provider>
  );
};

export default App;
