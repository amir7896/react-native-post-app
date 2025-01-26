import React, {useEffect, useState} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {logout} from '../../features/User/UserSlice';

const Home: React.FC = () => {
  const [user, setUser] = useState<{
    id: string;
    username: string;
    email: string;
  } | null>(null);
  const dispatch = useDispatch();

  // Fetch user data from AsyncStorage
  const fetchUser = async () => {
    try {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      // Remove user and token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');
      console.log('User logged out');
      dispatch(logout());
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.infoText}>Username: {user.username}</Text>
          <Text style={styles.infoText}>Email: {user.email}</Text>
          <Text style={styles.infoText}>User ID: {user.id}</Text>
        </>
      ) : (
        <Text style={styles.infoText}>Loading user information...</Text>
      )}
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  infoText: {
    fontSize: 18,
    marginVertical: 5,
  },
});

export default Home;
