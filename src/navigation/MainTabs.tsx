import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home';
import PostScreen from '../screens/posts/post';
import ProfileScreen from '../screens/profile/profile';

import {
  Home6Filled,
  Home6Outline,
  PostFilled1,
  PostOutLined1,
  User3Filled,
  User3Outline,
} from '../assets/svgs';
import {Text, StyleSheet} from 'react-native';

type AppTabsParamList = {
  Home: undefined;
  Post: undefined;
  Profile: undefined;
};

const AppTabs = createBottomTabNavigator<AppTabsParamList>();

// TabIcon Component
const TabIcon = ({
  focused,
  FilledIcon,
  OutlinedIcon,
}: {
  focused: boolean;
  FilledIcon: React.ComponentType<any>;
  OutlinedIcon: React.ComponentType<any>;
}) =>
  focused ? (
    <FilledIcon height={25} width={25} />
  ) : (
    <OutlinedIcon height={25} width={25} />
  );

// TabLabel Component
const TabLabel = ({focused, label}: {focused: boolean; label: string}) => (
  <Text style={[styles.tabLabel, focused && styles.tabLabelFocused]}>
    {label}
  </Text>
);

// Icon and Label Config for Home Tab
const HomeTabOptions = {
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <TabIcon
      focused={focused}
      FilledIcon={Home6Filled}
      OutlinedIcon={Home6Outline}
    />
  ),
  tabBarLabel: ({focused}: {focused: boolean}) => (
    <TabLabel focused={focused} label="Home" />
  ),
};

// Icon and Label Config for Post Tab
const PostTabOptions = {
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <TabIcon
      focused={focused}
      FilledIcon={PostFilled1}
      OutlinedIcon={PostOutLined1}
    />
  ),
  tabBarLabel: ({focused}: {focused: boolean}) => (
    <TabLabel focused={focused} label="Post" />
  ),
};

// Icon and Label Config for Profile Tab
const ProfileTabOptions = {
  tabBarIcon: ({focused}: {focused: boolean}) => (
    <TabIcon
      focused={focused}
      FilledIcon={User3Filled}
      OutlinedIcon={User3Outline}
    />
  ),
  tabBarLabel: ({focused}: {focused: boolean}) => (
    <TabLabel focused={focused} label="Profile" />
  ),
  headerShown: false, // Hide the top header
};

const MainTabs = () => (
  <AppTabs.Navigator>
    <AppTabs.Screen
      name="Home"
      component={HomeScreen}
      options={HomeTabOptions}
    />
    <AppTabs.Screen
      name="Post"
      component={PostScreen}
      options={PostTabOptions}
    />
    <AppTabs.Screen
      name="Profile"
      component={ProfileScreen}
      options={ProfileTabOptions}
    />
  </AppTabs.Navigator>
);

const styles = StyleSheet.create({
  tabLabel: {
    color: 'gray',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tabLabelFocused: {
    color: 'black',
  },
});

export default MainTabs;
