import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home: React.FC = () => {
  useEffect(() => {
    const removeToken = async () => {
      try {
        await AsyncStorage.removeItem('userToken');
        console.log('Token removed');
      } catch (error) {
        console.error('Error removing token:', error);
      }
    };

    removeToken();
  }, []);

  return (
    <View>
      <Text>Home page</Text>
    </View>
  );
};

export default Home;
