import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import PostApi from '../../services/Api/PostApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

interface Comment {
  _id: string;
  content: string;
  user: {
    _id: string;
    userName: string;
  };
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

// Utility function to get current user from AsyncStorage
const getCurrentUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Error reading current user from AsyncStorage', e);
    return null;
  }
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

// Thunk to comment on a post
export const addComment = createAsyncThunk(
  'post/addComment',
  async ({postId, content}: {postId: string; content: string}, thunkAPI) => {
    try {
      const user = await getCurrentUser();
      if (!user) {
        console.error('User not logged in'); // Log user not logged in error
        return thunkAPI.rejectWithValue('User not logged in');
      }

      const response = await PostApi.commentOnPost(postId, content);
      console.log('Comment API response:', response); // Log the API response

      if (response.success && response.data?.comment) {
        return {postId, comment: response.data.comment};
      } else {
        console.error('Failed to add comment'); // Log failed comment addition
        return thunkAPI.rejectWithValue('Failed to add comment');
      }
    } catch (error: any) {
      console.error('Error in addComment thunk:', error); // Log any error
      return thunkAPI.rejectWithValue('Failed to add comment');
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
      })
      // Handle addComment.fulfilled

      // Handle addComment.fulfilled
      .addCase(
        addComment.fulfilled,
        (
          state,
          action: PayloadAction<{
            postId: string;
            comment: {
              _id: string;
              content: string;
              user: {_id: string; userName: string};
            };
          }>,
        ) => {
          const {postId, comment} = action.payload;
          console.log('Comment added successfully:', comment); // Log successful comment addition
          const updatedPost = state.posts.find(post => post._id === postId);
          if (updatedPost) {
            updatedPost.comments.push(comment);
            console.log('Updated post with new comment:', updatedPost); // Log updated post
          }
        },
      )
      .addCase(addComment.rejected, (state, action) => {
        console.error('Failed to add comment:', action.payload); // Log failure to add comment
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || 'Failed to add comment';
      });
  },
});

export const {reset} = postSlice.actions;
export default postSlice.reducer;
