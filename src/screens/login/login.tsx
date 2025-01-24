// RegisterScreen.tsx
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RegisterScreen({navigation}: any) {
  const register = async () => {
    // Simulate a registration and save the token
    await AsyncStorage.setItem('userToken', 'some-token');
    navigation.replace('Login'); // Navigate to Home after registration
  };

  return (
    <View>
      <Text>Login Screen</Text>
      <Button title="Register" onPress={register} />
      <Button
        title="Go to Register"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
}
