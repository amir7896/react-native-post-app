import {AxiosResponse} from 'axios';
import {Api} from '../client/rest';
import {
  GET_ALL_POSTS,
  LIKE_POST,
  COMMENT_ON_POST,
  GET_ALL_COMMENTS_FOR_POST,
  CREATE_POST,
  DELETE_POST,
  GET_SINGLE_POST,
} from '../../constants/apiConstant';

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

interface SinglePost {
  _id: string;
  title: string;
  content: string;
  isLikedByUser: boolean;
  likesCount: number;
  user: {
    userId: string;
    userName: string;
    profileImageSecureUrl: string; // Add profileImageSecureUrl
  };
  createdAt: string;
  media: {
    _id: string;
    secureUrl: string;
    mediaType: string;
  }[];
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  error?: string;
  data?: T;
}

interface Comment {
  _id: string;
  content: string;
  user: {
    _id: string;
    userName: string;
  };
  data: any;
}

class PostApi {
  static sharedInstance = new PostApi();

  constructor() {
    if (PostApi.sharedInstance) {
      return PostApi.sharedInstance;
    }
  }

  // Fetch all posts
  async getAllPosts(
    start: number = 0,
    limit: number = 5,
  ): Promise<ApiResponse<Post[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Post[]>> = await Api.get(
        `${GET_ALL_POSTS}?start=${start}&limit=${limit}`,
      );
      return response.data;
    } catch (error: any) {
      console.log('Error fetching posts:', error);
      return {
        success: false,
        message: 'Failed to fetch posts',
        error: error.message,
      };
    }
  }

  // Like or unlike a post
  async likePost(postId: string): Promise<{
    success: boolean;
    message: string;
    likesCount: number;
    isLikedByUser: boolean;
  }> {
    try {
      const response: AxiosResponse<{
        success: boolean;
        message: string;
        likesCount: number;
        isLikedByUser: boolean;
      }> = await Api.post(LIKE_POST, {postId});
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  // Comment on a post
  async commentOnPost(
    postId: string,
    content: string,
  ): Promise<{
    success: boolean;
    message: string;
    comment: Comment;
  }> {
    try {
      const response: AxiosResponse<{
        success: boolean;
        message: string;
        comment: Comment;
      }> = await Api.post(COMMENT_ON_POST, {postId, content});
      console.log('PostApi Add Comment Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('Error commenting on post:', error);
      throw new Error(error.response?.data?.message || 'Failed to add comment');
    }
  }

  // Fetch all comments for a specific post
  async getCommentsForPost(
    postId: string,
  ): Promise<{success: boolean; postId: string; comments: Comment[]}> {
    try {
      const response: AxiosResponse<{
        success: boolean;
        postId: string;
        comments: Comment[];
      }> = await Api.get(`${GET_ALL_COMMENTS_FOR_POST}/${postId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching comments for post:', error);
      return {
        success: false,
        postId,
        comments: [],
      };
    }
  }

  // Create a new post
  async createPost(formData: FormData): Promise<ApiResponse<Post>> {
    try {
      const response: AxiosResponse<ApiResponse<Post>> = await Api.post(
        CREATE_POST, // Make sure this matches your backend route
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return response.data;
    } catch (error: any) {
      console.error('Error creating post:', error);
      return {
        success: false,
        message: 'Failed to create post',
        error: error.message,
      };
    }
  }

  // Delete post
  async deletePost(postId: string): Promise<ApiResponse<Post>> {
    try {
      const response: AxiosResponse<ApiResponse<Post>> = await Api.delete(
        `${DELETE_POST}/${postId}`,
      );
      return response.data;
    } catch (error: any) {
      console.log('Error in delete post in api call:', error);
      return {
        success: false,
        message: 'Failed to delete post',
        error: error.message,
      };
    }
  }

  // Get single post
  async getSinglePost(postId: string): Promise<ApiResponse<SinglePost>> {
    try {
      const response = await Api.get(`${GET_SINGLE_POST}/${postId}`);
      return response.data;
    } catch (error: any) {
      console.log('Error in get single post in api :', error);
      return {
        success: false,
        message: 'Failed got get single post',
        error: error.message,
      };
    }
  }
}

export default PostApi.sharedInstance;
