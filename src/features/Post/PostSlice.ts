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
  comments: Comment[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  message: string;
}

const initialState: PostState = {
  posts: [],
  comments: [],
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
      return response.data || [];
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch posts');
    }
  },
);

// Thunk to like/unlike a post
export const likePost = createAsyncThunk(
  'post/likePost',
  async (postId: string, thunkAPI) => {
    try {
      const response = await PostApi.likePost(postId);
      return {postId, likesCount: response.likesCount};
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
      const response = await PostApi.commentOnPost(postId, content);
      return {postId, comment: response.comment};
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to add comment');
    }
  },
);

// Thunk to fetch comments for a specific post
export const fetchCommentsForPost = createAsyncThunk(
  'post/fetchCommentsForPost',
  async (postId: string, thunkAPI) => {
    try {
      const response = await PostApi.getCommentsForPost(postId);
      return {postId, comments: response.comments};
    } catch (error: any) {
      return thunkAPI.rejectWithValue('Failed to fetch comments');
    }
  },
);

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    reset: state => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
  },
  extraReducers: builder => {
    builder
      // Fetch posts
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

      // Like a post
      .addCase(likePost.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        likePost.fulfilled,
        (
          state,
          action: PayloadAction<{postId: string; likesCount: number}>,
        ) => {
          state.isLoading = false;
          const {postId, likesCount} = action.payload;
          const post = state.posts.find(
            singlePost => singlePost._id === postId,
          );
          if (post) {
            post.likesCount = likesCount;
          }
        },
      )
      .addCase(likePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as string) || 'Failed to like/unlike post';
      })

      // Add comment to a post
      .addCase(addComment.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        addComment.fulfilled,
        (state, action: PayloadAction<{postId: string; comment: Comment}>) => {
          console.log('Add comment Full filled Action:', action.payload);
          state.isLoading = false;
        },
      )
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as string) || 'Failed to add comment to post';
      })

      // Fetch comments for a specific post
      .addCase(fetchCommentsForPost.pending, state => {
        state.isLoading = true;
      })
      .addCase(
        fetchCommentsForPost.fulfilled,
        (
          state,
          action: PayloadAction<{
            postId: string;
            comments: Comment[];
          }>,
        ) => {
          state.isLoading = false;
          state.comments = action.payload.comments; // Set comments state
        },
      )
      .addCase(fetchCommentsForPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as string) || 'Failed to fetch comments for post';
      });
  },
});

export const {reset} = postSlice.actions;
export default postSlice.reducer;
