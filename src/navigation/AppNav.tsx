import 'react-native-gesture-handler';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import HomeScreen from '../screens/home/home';
import PostScreen from '../screens/posts/post';
import LoginScreen from '../screens/login/login';
import RegisterScreen from '../screens/register/register';
import {RootState} from '../app/store';

type RootTabParamList = {
  Home: undefined;
  Posts: undefined;
};

type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function AppTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Posts" component={PostScreen} />
    </Tab.Navigator>
  );
}

export default function AppNav() {
  const {isLoggedIn, isLoading} = useSelector((state: RootState) => state.auth);

  if (isLoading) {
    return null; //  Show a loading spinner here if necessary
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppTab /> : <AuthStack />}
    </NavigationContainer>
  );
}
