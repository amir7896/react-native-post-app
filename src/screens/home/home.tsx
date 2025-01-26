import React from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {logout} from '../../features/User/UserSlice';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      // Remove the userToken from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      console.log('Token removed');
      dispatch(logout());
    } catch (error) {
      console.error('Error removing token:', error);
    }
  };

  return (
    <View>
      <Text>Home page</Text>
      <Text onPress={handleLogout}> Logout</Text>
    </View>
  );
};

export default Home;
