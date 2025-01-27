import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/User/UserSlice';
import PostReducer from '../features/Post/PostSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    post: PostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
