import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {RootState} from '../app/store';

import HomeScreen from '../screens/home/home';
import PostScreen from '../screens/posts/post';
import LoginScreen from '../screens/login/login';
import RegisterScreen from '../screens/register/register';

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

type AppTabsParamList = {
  Home: undefined;
  Post: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AppTabs = createBottomTabNavigator<AppTabsParamList>();

// Main App Tabs
const MainTabs = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen name="Home" component={HomeScreen} />
    <AppTabs.Screen name="Post" component={PostScreen} />
  </AppTabs.Navigator>
);

// Main App
const App = () => {
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <MainTabs />
      ) : (
        <AuthStack.Navigator>
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="Register" component={RegisterScreen} />
        </AuthStack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
