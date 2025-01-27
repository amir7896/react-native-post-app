import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import PostApi from '../../services/Api/PostApi';

interface Post {
  _id: string;
  title: string;
  content: string;
  user: {
    userId: string;
    userName: string;
  };
  comments: {
    _id: string;
    content: string;
    user: {
      _id: string;
      userName: string;
    };
  }[];
  likesCount: number;
}

interface PostState {
  posts: Post[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: PostState = {
  posts: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
};

// Thunk to fetch all posts
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async ({start, limit}: {start: number; limit: number}, thunkAPI) => {
    try {
      const response = await PostApi.getAllPosts(start, limit);
      if (!response) {
        return thunkAPI.rejectWithValue(response || 'Fetching posts failed');
      }
      return response.data || [];
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  },
);

// Thunk to like/unlike a post
export const likePost = createAsyncThunk(
  'post/likePost',
  async (postId: string, thunkAPI) => {
    try {
      const response = await PostApi.likePost(postId);
      // Directly access response fields
      if (response.likesCount !== undefined) {
        return {likesCount: response.likesCount, postId};
      } else {
        return thunkAPI.rejectWithValue('Invalid response data');
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to like post');
    }
  },
);

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.posts = [...state.posts, ...action.payload];
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || 'Failed to fetch posts';
      })
      // Handle likePost.fulfilled
      .addCase(
        likePost.fulfilled,
        (
          state,
          action: PayloadAction<{likesCount: number; postId: string}>,
        ) => {
          const {postId, likesCount} = action.payload;
          const updatedPost = state.posts.find(post => post._id === postId);
          if (updatedPost) {
            updatedPost.likesCount = likesCount;
          }
        },
      )
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || 'Failed to like post';
      });
  },
});

export const {reset} = postSlice.actions;
export default postSlice.reducer;
