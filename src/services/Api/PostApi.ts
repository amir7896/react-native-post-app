import {AxiosResponse} from 'axios';
import {Api} from '../client/rest';
import {
  GET_ALL_POSTS,
  // CREATE_POST,
  LIKE_POST,
  COMMENT_ON_POST,
  GET_ALL_COMMENTS_FOR_POST,
} from '../../constants/apiConstant';

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
      console.log('Error in fetching posts:', error);
      return {
        success: false,
        message: 'Failed to fetch posts',
        error: error.message,
      };
    }
  }

  // Create a new post
  // async createPost(title: string, content: string): Promise<ApiResponse<Post>> {
  //   try {
  //     const response: AxiosResponse<ApiResponse<Post>> = await Api.post(CREATE_POST, {
  //       title,
  //       content,
  //     });
  //     return response.data;
  //   } catch (error: any) {
  //     console.log('Error in creating post:', error);
  //     return {
  //       success: false,
  //       message: 'Failed to create post',
  //       error: error.message,
  //     };
  //   }
  // }

  // Like or unlike a post
  async likePost(
    postId: string,
  ): Promise<{success: boolean; message: string; likesCount: number}> {
    try {
      const response: AxiosResponse<{
        success: boolean;
        message: string;
        likesCount: number;
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
  ): Promise<ApiResponse<void>> {
    try {
      const response: AxiosResponse<ApiResponse<void>> = await Api.post(
        COMMENT_ON_POST,
        {
          postId,
          content,
        },
      );
      return response.data;
    } catch (error: any) {
      console.log('Error in commenting on post:', error);
      return {
        success: false,
        message: 'Failed to comment on post',
        error: error.message,
      };
    }
  }

  // Get all comments for a single post
  async getAllCommentsForPost(postId: string): Promise<ApiResponse<Comment[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Comment[]>> = await Api.get(
        `${GET_ALL_COMMENTS_FOR_POST}/${postId}`,
      );
      return response.data;
    } catch (error: any) {
      console.log('Error in fetching comments for post:', error);
      return {
        success: false,
        message: 'Failed to fetch comments for post',
        error: error.message,
      };
    }
  }
}

export default PostApi.sharedInstance;
