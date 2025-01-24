import {AxiosResponse} from 'axios';
import {Api} from '../client/rest';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SIGNUP_USER, SIGN_IN_USER} from '../../constants/apiConstant';

interface User {
  // Define the properties of the user object based on the API response structure
}

class AuthApi {
  static sharedInstance = new AuthApi();

  constructor() {
    if (AuthApi.sharedInstance != null) {
      return AuthApi.sharedInstance;
    }
  }

  // Register User
  async registerUser(body: Record<string, any>): Promise<User> {
    const response: AxiosResponse<any> = await Api.post(SIGNUP_USER, body);
    console.log('Register response in api :', response.data);
    return response.data;
  }

  // SignIn User
  async signInUser(body: Record<string, any>): Promise<User | undefined> {
    try {
      const response: AxiosResponse<any> = await Api.post(SIGN_IN_USER, body);
      if (response.data) {
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
        await AsyncStorage.setItem(
          'userToken',
          JSON.stringify(response.data.token),
        );
      }
      return response.data;
    } catch (error) {
      console.log('login error ===', error);
    }
  }

  // Logout user
  async logout(): Promise<void> {
    await AsyncStorage.removeItem('user');
  }

  // Get user from storage
  async getUser(): Promise<string | null> {
    return await AsyncStorage.getItem('user');
  }
}

export default AuthApi.sharedInstance;
