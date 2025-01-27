import axios, {AxiosInstance} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Ip: string = '192.168.45.180'; // My IP
// const Ip: string = '192.168.16.135'; // Office Ip
const Port: string = '4000';

export const Api: AxiosInstance = axios.create({
  baseURL: `http://${Ip}:${Port}/api/`,
  headers: {'Content-type': 'application/json'},
});

// Add a request interceptor to include the Authorization header
Api.interceptors.request.use(
  async config => {
    try {
      // Retrieve the token from AsyncStorage
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // If token exists, add it to the Authorization header
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error retrieving token from AsyncStorage:', error);
    }
    return config;
  },
  error => {
    // Handle request error
    return Promise.reject(error);
  },
);
