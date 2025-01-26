import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home';
import PostScreen from '../screens/posts/post';

type AppTabsParamList = {
  Home: undefined;
  Post: undefined;
};

const AppTabs = createBottomTabNavigator<AppTabsParamList>();

const MainTabs = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen name="Home" component={HomeScreen} />
    <AppTabs.Screen name="Post" component={PostScreen} />
  </AppTabs.Navigator>
);

export default MainTabs;
