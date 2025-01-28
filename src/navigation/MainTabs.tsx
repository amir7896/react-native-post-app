import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/home/home';
import PostScreen from '../screens/posts/post';
import {
  HomeOutLined,
  HomeFilled,
  PostOutLined,
  PostFilled,
} from '../assets/svgs';
import {Text, StyleSheet} from 'react-native';

type AppTabsParamList = {
  Home: undefined;
  Post: undefined;
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
    <FilledIcon height={20} width={20} />
  ) : (
    <OutlinedIcon height={20} width={20} />
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
      FilledIcon={HomeFilled}
      OutlinedIcon={HomeOutLined}
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
      FilledIcon={PostFilled}
      OutlinedIcon={PostOutLined}
    />
  ),
  tabBarLabel: ({focused}: {focused: boolean}) => (
    <TabLabel focused={focused} label="Post" />
  ),
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
