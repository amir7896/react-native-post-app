import {AxiosResponse} from 'axios';
import {Api} from '../client/rest';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SIGNUP_USER, SIGN_IN_USER} from '../../constants/apiConstant';

interface User {
  id: string;
  username: string;
  email: string;
  // Add any other user properties here
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  user?: T;
  token?: string;
  error?: string; // For error cases
}

class AuthApi {
  static sharedInstance = new AuthApi();

  constructor() {
    if (AuthApi.sharedInstance != null) {
      return AuthApi.sharedInstance;
    }
  }

  // Register User
  async registerUser(body: Record<string, any>): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await Api.post(
        SIGNUP_USER,
        body,
      );
      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        error: error.response?.data?.error || error.message,
      };
    }
  }

  // SignIn User
  async signInUser(body: Record<string, any>): Promise<ApiResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<User>> = await Api.post(
        SIGN_IN_USER,
        body,
      );

      if (response.data.success && response.data.user && response.data.token) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem('userToken', response.data.token);
      }

      return response.data;
    } catch (error: any) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        error: error.response?.data?.error || error.message,
      };
    }
  }

  // Logout user
  async logout(): Promise<void> {
    console.log('Logging out user...');
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('userToken');
  }

  // Get user from storage
  async getUser(): Promise<string | null> {
    return await AsyncStorage.getItem('user');
  }
}

export default AuthApi.sharedInstance;
