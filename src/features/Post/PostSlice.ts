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
  isLikedByUser: boolean;
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
  isLikedByUser: boolean;
}

const initialState: PostState = {
  posts: [],
  comments: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
  isLikedByUser: false,
};

// Thunk to create a new post
export const createPost = createAsyncThunk(
  'post/createPost',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await PostApi.createPost(formData);
      // Get the global state
      const state: any = thunkAPI.getState();
      const user = state.auth.user; // Access user from auth slice

      if (response.success) {
        // **No need to dispatch fetchPosts here anymore**
        // await thunkAPI.dispatch(fetchPosts({start: 0, limit: 5}));
        return {post: response.data, user}; // Return both post and user
      } else {
        return thunkAPI.rejectWithValue(response.message);
      }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to create post');
    }
  },
);

// Thunk to fetch all posts
export const fetchPosts = createAsyncThunk(
  'post/fetchPosts',
  async ({start, limit}: {start: number; limit: number}, thunkAPI) => {
    try {
      const response = await PostApi.getAllPosts(start, limit);
      return {posts: response.data || [], start}; // **Return object with posts and start**
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

      return {
        postId,
        likesCount: response.likesCount,
        isLikedByUser: response.isLikedByUser,
      };
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
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to add comment');
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

export const deletePost = createAsyncThunk(
  'post/deletePost',
  async (postId: string, thunkAPI) => {
    try {
      const response = await PostApi.deletePost(postId);
      if (response.success) {
        // **No need to dispatch fetchPosts here anymore**
        // await thunkAPI.dispatch(fetchPosts({start: 0, limit: 5}));
        return postId; // Return the postId of the deleted post
      }
      return thunkAPI.rejectWithValue(response.message);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to delete post');
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
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<{posts: Post[]; start: number}>) => {
          // Payload is now an object
          state.isLoading = false;
          state.isSuccess = true;
          const fetchedPosts = action.payload.posts;
          const startValue = action.payload.start;

          if (startValue === 0) {
            // Initial load: Replace existing posts
            state.posts = fetchedPosts;
          } else {
            // Pagination: Append new posts and filter duplicates
            const existingPostIds = state.posts.map(post => post._id);
            const newPosts = fetchedPosts.filter(
              post => !existingPostIds.includes(post._id),
            ); // Filter duplicates
            state.posts = [...state.posts, ...newPosts]; // Append only unique new posts
          }
        },
      )
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
          action: PayloadAction<{
            postId: string;
            likesCount: number;
            isLikedByUser: boolean;
          }>,
        ) => {
          state.isLoading = false;
          const {postId, likesCount, isLikedByUser} = action.payload;
          const post = state.posts.find(
            singlePost => singlePost._id === postId,
          );
          if (post) {
            post.likesCount = likesCount;
            post.isLikedByUser = isLikedByUser;
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
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        const {comment} = action.payload;
        const updatedComment = {
          content: comment.content,
          user: comment.user,
          _id: comment._id,
        };

        state.comments.push(updatedComment);
      })
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
          state.comments = action.payload.comments;
        },
      )
      .addCase(fetchCommentsForPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message =
          (action.payload as string) || 'Failed to fetch comments for post';
      })

      // Create post cases
      .addCase(createPost.pending, state => {
        state.isLoading = true;
      })
      .addCase(createPost.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Post created successfully';
        const {post, user} = action.payload; // Extract post and user from payload

        state.posts = [{...post, user}, ...state.posts]; // Add new post with user at the front
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || 'Failed to create post';
      })

      // Delete post cases
      .addCase(deletePost.pending, state => {
        state.isLoading = true;
      })
      .addCase(deletePost.fulfilled, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = 'Post deleted successfully';
        state.posts = state.posts.filter(post => post._id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = (action.payload as string) || 'Failed to delete post';
      });
  },
});

export const {reset} = postSlice.actions;
export default postSlice.reducer;
