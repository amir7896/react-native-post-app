import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../app/store';
import AuthTabs from './AuthTabs';
import MainTabs from './MainTabs';

const AppNav = () => {
  const {isLoggedIn} = useSelector((state: RootState) => state.auth);

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthTabs />}
    </NavigationContainer>
  );
};

export default AppNav;
