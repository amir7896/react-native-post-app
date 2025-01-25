// Updated UserSlice.ts
import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AuthApi from '../../services/Api/AuthApi';

interface AuthState {
  user: Record<string, any> | null;
  isLoggedIn: boolean;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

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
      });
  },
});

export const {logout, rest} = authSlice.actions;
export default authSlice.reducer;
