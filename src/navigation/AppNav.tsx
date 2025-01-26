import React, {useEffect} from 'react';
import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../app/store';
import {checkAuthState} from '../features/User/UserSlice';
import AuthTabs from './AuthTabs';
import MainTabs from './MainTabs';

const AppNav = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {isLoggedIn, isCheckingAuth} = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    dispatch(checkAuthState());
  }, [dispatch]);

  if (isCheckingAuth) {
    // Show a loading spinner while checking auth state
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <MainTabs /> : <AuthTabs />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AppNav;
