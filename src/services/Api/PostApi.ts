import {AxiosResponse} from 'axios';
import {Api} from '../client/rest';
import {GET_ALL_POSTS} from '../../constants/apiConstant';

interface Posts {
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

class PostApi {
  static sharedInstance = new PostApi();

  constructor() {
    if (PostApi.sharedInstance) {
      return PostApi.sharedInstance;
    }
  }

  async getAllPosts(
    start: number = 0,
    limit: number = 5,
  ): Promise<ApiResponse<Posts[]>> {
    try {
      const response: AxiosResponse<ApiResponse<Posts[]>> = await Api.get(
        `${GET_ALL_POSTS}?start=${start}&limit=${limit}`,
      );
      console.log('Success in fetching post in api:', response);
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
}

export default PostApi.sharedInstance;
