import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchPosts, likePost, createPost} from '../../features/Post/PostSlice';
import type {RootState, AppDispatch} from '../../app/store';
import {
  LikeIcon,
  CommentIcon,
  LikeFilledIcons,
  AddPostIcon,
} from '../../assets/svgs';
import CommentModal from './components/commentModal/CommentModal';
import CreatePostModal from './components/postModal/PostModal';
import styles from './style';

type Post = {
  _id: string;
  title: string;
  content: string;
  user: {
    userId: string;
    userName: string;
  };
  likesCount: number;
  isLikedByUser: boolean;
};

const Posts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {posts, isLoading} = useSelector((state: RootState) => state.post);

  const [start, setStart] = useState(0);
  const [showCommentsPostId, setShowCommentsPostId] = useState<string | null>(
    null,
  );
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchPosts({start, limit: 5})).unwrap();

      if (result.length < 5) {
        setHasMorePosts(false);
      }
    };

    if (hasMorePosts) {
      fetchData();
    }
  }, [start, dispatch, hasMorePosts]);

  const handleLike = (postId: string) => {
    dispatch(likePost(postId));
  };

  const handleShowComments = (postId: string) => {
    setShowCommentsPostId(postId);
  };

  const handleHideComments = () => {
    setShowCommentsPostId(null);
  };

  const openCreatePostModal = () => {
    setIsCreatePostVisible(true);
  };

  const closeCreatePostModal = () => {
    setIsCreatePostVisible(false);
  };

  const handleCreatePost = async (formData: FormData) => {
    try {
      const resultAction = await dispatch(createPost(formData)).unwrap();

      console.log('Post created successfully:', resultAction);

      // Close the modal after successful post creation
      closeCreatePostModal();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const renderItem = ({item}: {item: Post}) => (
    <View style={styles.card}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.content}</Text>
      <View style={styles.likeCommentSection}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLike(item._id)}>
          {item.isLikedByUser ? (
            <LikeFilledIcons width={16} height={16} />
          ) : (
            <LikeIcon width={16} height={16} />
          )}
          <Text style={styles.likeButtonText}>{item.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleShowComments(item._id)}>
          <CommentIcon width={16} height={16} fill="#4C4F56" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const loadMorePosts = () => {
    if (!isLoading && hasMorePosts) {
      setStart(prevStart => prevStart + 5);
    }
  };

  return (
    <>
      {/* Add Post Button */}
      <View style={styles.addPostContainer}>
        <TouchableOpacity onPress={openCreatePostModal}>
          <AddPostIcon height={30} width={30} />
        </TouchableOpacity>
      </View>

      {/*  Render Post List */}
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={styles.container}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#bdbdbd" />
          ) : !hasMorePosts && posts.length > 0 ? (
            <Text>No more posts</Text>
          ) : null
        }
      />

      {/* Comment Modal */}
      {showCommentsPostId && (
        <CommentModal
          isVisible={!!showCommentsPostId}
          postId={showCommentsPostId}
          onClose={handleHideComments}
        />
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isVisible={isCreatePostVisible}
        onClose={closeCreatePostModal}
        onSubmitPost={handleCreatePost}
      />
    </>
  );
};

export default Posts;
