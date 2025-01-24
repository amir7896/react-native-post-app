import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AuthApi from '../../services/Api/AuthApi';

interface AuthState {
  user: Record<string, any> | null;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: AuthState = {
  user: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Register User Slice
export const register = createAsyncThunk(
  'auth/register',
  async (user: Record<string, any>, thunkAPI) => {
    try {
      const response = await AuthApi.registerUser(user);
      return response;
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Login User Slice
export const login = createAsyncThunk(
  'auth/login',
  async (user: Record<string, any>, thunkAPI) => {
    try {
      return await AuthApi.signInUser(user);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Logout User Slice
export const logout = createAsyncThunk('auth/logout', async () => {
  await AuthApi.logout();
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    rest: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // Register Case
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })

      // Login Case
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, state => {
        state.user = null;
      });
  },
});

export const {rest} = authSlice.actions;
export default authSlice.reducer;
