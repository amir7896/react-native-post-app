export const SIGNUP_USER = 'auth/register';
export const SIGN_IN_USER = 'auth/login';
export const GET_PROFILE = 'auth/profile';
export const CHANGE_PROFILE_IMAGE = 'auth/profile/upload';
export const CHANGE_PASSWORD = 'auth/password/change';

// Posts
export const POSTS = 'posts';
export const GET_ALL_POSTS = `${POSTS}/list`;
export const CREATE_POST = `${POSTS}/create`;
export const LIKE_POST = `${POSTS}/like`;
export const COMMENT_ON_POST = `${POSTS}/comment`;
export const GET_ALL_COMMENTS_FOR_POST = `${POSTS}/comments`;
export const DELETE_POST = `${POSTS}/delete`;
export const GET_SINGLE_POST = `${POSTS}/single`;
