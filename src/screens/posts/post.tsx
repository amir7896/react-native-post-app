import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image, // Import Image component
  Dimensions, // Import Dimensions
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import Video from 'react-native-video';

import {
  fetchPosts,
  likePost,
  createPost,
  deletePost,
} from '../../features/Post/PostSlice';
import type {RootState, AppDispatch} from '../../app/store';
import type {AppTabsParamList} from '../../navigation/MainTabs'; // Import the type
import {
  LikeIcon,
  CommentIcon,
  LikeFilledIcons,
  AddPostIcon,
  DeleteIcon,
  ProfileIcon,
} from '../../assets/svgs';
import CommentModal from './components/commentModal/CommentModal';
import CreatePostModal from './components/postModal/PostModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import {formatAndAbbreviateDate} from '../../utils';

import styles from './style';

const {width} = Dimensions.get('window'); // Get screen width

const Posts: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {posts, isLoading} = useSelector((state: RootState) => state.post);
  const {user} = useSelector((state: RootState) => state.auth);

  const [start, setStart] = useState(0);
  const [showCommentsPostId, setShowCommentsPostId] = useState<string | null>(
    null,
  );
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [isCreatePostVisible, setIsCreatePostVisible] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postId, setPostId] = useState<any>(null);

  const navigation = useNavigation<NavigationProp<AppTabsParamList>>(); // Use the type

  // Show delete Modal
  const handleShowDeleteModal = (id: string) => {
    setShowDeleteModal(true);
    setPostId(id);
  };

  const handleDelete = async () => {
    try {
      const resultAction = await dispatch(deletePost(postId)).unwrap();
      console.log('Post deleted successfully response :', resultAction);
      handleHideDeleteModal();
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  // Hide delete Modal
  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setPostId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(fetchPosts({start, limit: 5})).unwrap();
      if (result.posts.length < 5) {
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

  // Create post
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

  const renderItem = ({item}: {item: any}) => {
    const displayDate = formatAndAbbreviateDate(new Date(item.createdAt)); // Use the common function

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('PostDetail', {
            id: item?._id,
          })
        }>
        {/* Top Section - Profile, Username, Date */}
        <View style={styles.topSection}>
          {/* User Profile Card */}
          <View style={styles.userProfileCard}>
            {/* If user has not profile image  */}
            {item?.user?.profileImage ? (
              <Image
                source={{
                  uri: `${item?.user?.profileImage}`,
                }}
                style={styles.userProfileImage}
              />
            ) : (
              <ProfileIcon width={40} height={40} />
            )}
          </View>
          {/* User Info (Username and Date) */}
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{item.user.userName}</Text>
            <Text style={styles.postDate}>{displayDate}</Text>
          </View>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          <Text style={styles.postBody}>{item.content}</Text>
        </View>
        {/* Media Display Section */}
        {/* Media Display Section */}
        {item.media && item.media.length > 0 && (
          <View style={styles.mediaGrid}>
            {item.media.map((mediaItem: any) => {
              const isVideo = mediaItem.mediaType === 'video';
              return (
                <View
                  key={mediaItem._id}
                  style={[
                    styles.mediaGridItem,
                    {width: (width - 28) / (item.media.length > 1 ? 2 : 1)},
                    item.media.length === 1 && {height: 300},
                  ]}>
                  {isVideo ? (
                    <Video
                      source={{uri: mediaItem.secureUrl}}
                      style={styles.mediaItem}
                      controls={true}
                      resizeMode="cover"
                      volume={1.0}
                      paused={true}
                    />
                  ) : (
                    <Image
                      source={{uri: mediaItem.secureUrl}}
                      style={styles.mediaItem}
                      resizeMode="cover"
                    />
                  )}
                </View>
              );
            })}
          </View>
        )}

        {/* Like and Comment Section (Buttons) */}
        <View style={styles.likeCommentSection}>
          <TouchableOpacity
            style={styles.likeButton}
            onPress={() => handleLike(item._id)}>
            {item.isLikedByUser ? (
              <LikeFilledIcons width={20} height={20} />
            ) : (
              <LikeIcon width={20} height={20} />
            )}
            <Text style={styles.likeButtonText}>{item.likesCount}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.commentButton}
            onPress={() => handleShowComments(item._id)}>
            <CommentIcon width={20} height={20} fill="#4C4F56" />
            <Text style={styles.commentButtonText}>Comment</Text>
          </TouchableOpacity>

          {user?.userId === item.user.userId && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleShowDeleteModal(item._id)}>
              <DeleteIcon width={20} height={20} fill="red" />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

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
          ) : !hasMorePosts && posts.length > 0 ? null : null
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

      {/* Delete Post modal  */}
      <DeleteModal
        title="Delete Post"
        content="Are you sure to delete this post?"
        visible={showDeleteModal}
        onCancel={handleHideDeleteModal}
        onDelete={handleDelete}
      />
    </>
  );
};

export default Posts;
