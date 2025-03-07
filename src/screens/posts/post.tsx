import React, {useEffect, useState, useRef} from 'react';
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
import RBSheet from 'react-native-raw-bottom-sheet';
import BottomSheetContent from './components/bottomDrawer/BottomSheetContent';

import {
  fetchPosts,
  likePost,
  createPost,
  deletePost,
} from '../../features/Post/PostSlice';
import type {RootState, AppDispatch} from '../../app/store';
import type {AppTabsParamList} from '../../navigation/MainTabs';
import {
  LikeIcon,
  CommentIcon,
  LikeFilledIcons,
  AddPostIcon,
  MoreIcon,
  ProfileIcon,
} from '../../assets/svgs';
import CommentModal from './components/commentModal/CommentModal';
import CreatePostModal from './components/postModal/PostModal';
import DeleteModal from '../../components/DeleteModal/DeleteModal';
import {formatAndAbbreviateDate} from '../../utils';

import styles from './style';

const {width} = Dimensions.get('window');

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
  const [postUserId, setPostUserId] = useState<any>(null);

  const navigation = useNavigation<NavigationProp<AppTabsParamList>>();
  const refRBSheet = useRef<any>(null);

  // Show delete Modal
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };

  // Open bottom drawer
  const handleOpenBottomDrawer = (post: any) => {
    console.log('Post', post);
    if (post) {
      setPostId(post?._id);
      setPostUserId(post?.user?.userId);
    }

    if (refRBSheet.current) {
      refRBSheet.current.open();
    }
  };

  // Handle Close bottom drawer
  const handleCloseBottomDrawer = () => {
    setPostId(null);
    setPostUserId(null);
    setShowDeleteModal(false);
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
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
    const displayDate = formatAndAbbreviateDate(new Date(item.createdAt));

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
          {/* Add MoreIcon here */}
          <TouchableOpacity
            style={styles.moreIconContainer}
            onPress={() => handleOpenBottomDrawer(item)}>
            <MoreIcon width={44} height={30} />
          </TouchableOpacity>
        </View>

        {/* Post Content */}
        <View style={styles.postContent}>
          <Text style={styles.postTitle}>{item.title}</Text>
          {/* <Text style={styles.postBody}>{item.content}</Text> */}
        </View>
        {/* Media Display Section */}
        {item.media && item.media.length > 0 && (
          <View style={styles.mediaGrid}>
            {item.media.slice(0, 5).map((mediaItem: any, index: number) => {
              const isVideo = mediaItem.mediaType === 'video';
              const isLastItem = index === 4 && item.media.length > 5;

              // Calculate dimensions based on the number of images
              let gridItemStyle = {};
              if (item.media.length === 1) {
                gridItemStyle = {width: width - 24, height: 300};
              } else if (item.media.length === 2) {
                gridItemStyle = {width: (width - 28) / 2, height: 200};
              } else if (item.media.length === 3) {
                if (index === 0) {
                  gridItemStyle = {width: width - 24, height: 250};
                } else {
                  gridItemStyle = {width: (width - 24) / 2, height: 150};
                }
              } else if (item.media.length === 4) {
                // Logic for 4 media items
                gridItemStyle = {width: (width - 28) / 2, height: 150};
              } else if (item.media.length > 4) {
                if (index < 2) {
                  gridItemStyle = {width: (width - 28) / 2, height: 150};
                } else {
                  gridItemStyle = {width: (width - 28) / 3, height: 150};
                }
              }

              return (
                <View
                  key={mediaItem._id}
                  style={[styles.mediaGridItem, gridItemStyle]}>
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
                  {isLastItem && ( // Render overlay only if there are more than 5 images
                    <View style={styles.moreImagesOverlay}>
                      <Text style={styles.moreImagesText}>
                        +{item.media.length - 5}
                      </Text>
                    </View>
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

          {/* Currently hide delete post button */}
          {/* {user?.userId === item.user.userId && (
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleShowDeleteModal(item._id)}>
              <DeleteIcon width={20} height={20} fill="red" />
            </TouchableOpacity>
          )} */}
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
      {/* Bottom Sheet  */}
      <RBSheet
        ref={refRBSheet}
        height={270} // Adjust the height base on items
        useNativeDriver={false}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: false,
        }}>
        <BottomSheetContent
          posrtUserId={postUserId}
          closeDrawer={handleCloseBottomDrawer}
          user={user}
          openDeleteModal={handleShowDeleteModal}
        />
      </RBSheet>
    </>
  );
};

export default Posts;
