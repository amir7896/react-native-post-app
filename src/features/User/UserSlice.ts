// Updated UserSlice.ts
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthApi from '../../services/Api/AuthApi';

interface AuthState {
  user: Record<string, any> | null;
  isLoggedIn: boolean;
  isCheckingAuth: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isCheckingAuth: true,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Thunk to check auth state
export const checkAuthState = createAsyncThunk(
  'auth/checkAuthState',
  async (_, thunkAPI) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const user = await AsyncStorage.getItem('user');

      if (token && user) {
        return {
          user: JSON.parse(user),
          isLoggedIn: true,
        };
      }
      return {
        user: null,
        isLoggedIn: false,
      };
    } catch (error) {
      console.error('Error checking auth state:', error);
      return thunkAPI.rejectWithValue('Failed to check auth state');
    }
  },
);

// Register User
export const register = createAsyncThunk(
  'auth/register',
  async (user: Record<string, any>, thunkAPI) => {
    try {
      const response = await AuthApi.registerUser(user);
      if (!response.success) {
        return thunkAPI.rejectWithValue(
          response.message || 'Registration failed',
        );
      }
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Login User
export const login = createAsyncThunk(
  'auth/login',
  async (user: Record<string, any>, thunkAPI) => {
    try {
      const response = await AuthApi.signInUser(user);
      if (!response.success) {
        return thunkAPI.rejectWithValue(response.message || 'Login failed');
      }
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const response = await AuthApi.getProfile();
      console.log('User Profile Response:', response);

      if (!response.success) {
        return thunkAPI.rejectWithValue(
          response.message || 'Failed to fetch profile',
        );
      }

      return response.data; // Returning response.data instead of response.user
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.message || 'Failed to fetch profile',
      );
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.isLoggedIn = false;
    },
    rest: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // Check auth states case
      .addCase(checkAuthState.pending, state => {
        state.isCheckingAuth = true;
      })
      .addCase(
        checkAuthState.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.user = action.payload.user;
          state.isLoggedIn = action.payload.isLoggedIn;
          state.isCheckingAuth = false;
        },
      )
      .addCase(checkAuthState.rejected, state => {
        state.user = null;
        state.isLoggedIn = false;
        state.isCheckingAuth = false;
      })
      // Register case
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.message = action.payload.message || 'Registration successful';
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Login case
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload.user;
        state.isLoggedIn = true;
        state.message = action.payload.message || 'Login successful';
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Get profile case
      .addCase(fetchUserProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchUserProfile.fulfilled,
        (state, action: PayloadAction<any>) => {
          console.log('User Profile Action Payload:', action.payload);
          state.isLoading = false;
          state.isSuccess = true;
          state.user = action.payload; // Store profile in Redux
        },
      )
      .addCase(
        fetchUserProfile.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
        },
      );
  },
});

export const {logout, rest} = authSlice.actions;
export default authSlice.reducer;
