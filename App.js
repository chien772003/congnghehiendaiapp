import React, { useReducer, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthStack from './screens/AuthStack';
import TabNavigatorAdmin from './screens/TabNavigatorAdmin';
import TabNavigatorUserGV from './screens/TabNavigatorUserGV';
import TabNavigatorUserSV from './screens/TabNavigatorUserSV';
import Home from './components/Home/Home';
import Reducer from './configs/Reducer';
import MyContext from './configs/MyContext';
import Categories from './components/Categories/Categories';
import Syllabus from './components/Syllabus/Syllabus';
import Courses from './components/Courses/Courses';
import { getUserRole } from './screens/authService';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const App = () => {
  const [user, dispatch] = useReducer(Reducer, null);
  const [role, setRole] = useState(null);
  
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const userRole = await getUserRole(token);
        setRole(userRole);
      }
    };
    fetchUserRole();
  }, [user]);
  <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Courses" component={Courses} />
        <Drawer.Screen name="Categories" component={Categories} />
        <Drawer.Screen name="Syllabus" component={Syllabus} />
      </Drawer.Navigator>
    </NavigationContainer>
  const RenderNavigator = () => {
    if (!user) {
      return <AuthStack />;
    }

    if (role) {
      if (role.is_superuser) {
        return <TabNavigatorAdmin />;
      } else if (role.is_teacher) {
        return <TabNavigatorUserGV />;
      } else if (role.is_student) {
        return <TabNavigatorUserSV />;
      }
    }

    return null;
  };

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        {user === null ? (
          <AuthStack />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="render"
              component={RenderNavigator}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </MyContext.Provider>
  );
};

export default App;
