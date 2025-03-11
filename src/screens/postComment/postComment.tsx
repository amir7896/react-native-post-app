import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';

import {formatAndAbbreviateDate} from '../../utils';
import {
  ArrowLeftIcon,
  LikeIcon,
  CommentIcon,
  LikeFilledIcons,
  ShareIcon,
  ProfileIcon,
} from '../../assets/svgs';

import {
  fetchSinglePost,
  likePost,
  fetchCommentsForPost,
  addComment,
} from '../../features/Post/PostSlice';
import {RootState, AppDispatch} from '../../app/store';

import CommentsSection from './commentSection';

import styles from './styles';

const {width} = Dimensions.get('window');

const PostComment: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();

  const {id} = route?.params as {id: string};
  const {singlePost, comments} = useSelector((state: RootState) => state.post);
  const [commentText, setCommentText] = React.useState('');

  console.log('Single Post ===', singlePost);
  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(fetchCommentsForPost(id));
  }, [id, dispatch]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLike = (postId: string) => {
    console.log('Post ID ===', postId);
    dispatch(likePost(postId));
  };

  const displayDate = singlePost?.createdAt
    ? formatAndAbbreviateDate(new Date(singlePost.createdAt))
    : '';

  const handleAddComment = () => {
    if (commentText.trim() !== '') {
      dispatch(addComment({postId: id, content: commentText}));
      setCommentText('');
    }
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardView}>
      <FlatList
        data={[{type: 'post', id: id}]}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          if (item.type === 'post') {
            return (
              <View style={styles.container}>
                <View style={styles.backButtonContainer}>
                  <TouchableOpacity
                    style={styles.backButton}
                    onPress={handleGoBack}>
                    <ArrowLeftIcon width={24} height={24} />
                  </TouchableOpacity>
                </View>

                <View style={styles.card}>
                  <View style={styles.topSection}>
                    <View style={styles.userProfileCard}>
                      {singlePost?.user?.profileImageSecureUrl ? (
                        <Image
                          source={{
                            uri: singlePost?.user?.profileImageSecureUrl,
                          }}
                          style={styles.userProfileImage}
                        />
                      ) : (
                        <ProfileIcon width={40} height={40} />
                      )}
                    </View>
                    <View style={styles.userInfo}>
                      <Text style={styles.userName}>
                        {singlePost?.user.userName}
                      </Text>
                      <Text style={styles.postDate}>{displayDate}</Text>
                    </View>
                  </View>

                  <View style={styles.postContent}>
                    <Text style={styles.postTitle}>{singlePost?.title}</Text>
                  </View>

                  {singlePost?.media && singlePost?.media.length > 0 && (
                    <View style={styles.mediaGrid}>
                      {singlePost.media
                        .slice(0, 5)
                        .map((mediaItem: any, index: number) => {
                          const isVideo = mediaItem.mediaType === 'video';
                          const isLastItem =
                            index === 4 && singlePost.media.length > 5;

                          let gridItemStyle = {};
                          if (singlePost.media.length === 1) {
                            gridItemStyle = {width: width - 15, height: 300};
                          } else if (singlePost.media.length === 2) {
                            gridItemStyle = {
                              width: (width - 14) / 2,
                              height: 200,
                            };
                          } else if (singlePost.media.length === 3) {
                            if (index === 0) {
                              gridItemStyle = {width: width - 14, height: 250};
                            } else {
                              gridItemStyle = {
                                width: (width - 14) / 2,
                                height: 150,
                              };
                            }
                          } else if (singlePost.media.length === 4) {
                            gridItemStyle = {
                              width: (width - 14) / 2,
                              height: 150,
                            };
                          } else if (singlePost.media.length > 4) {
                            if (index < 2) {
                              gridItemStyle = {
                                width: (width - 14) / 2,
                                height: 150,
                              };
                            } else {
                              gridItemStyle = {
                                width: (width - 15) / 3,
                                height: 150,
                              };
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
                              {isLastItem && (
                                <View style={styles.moreImagesOverlay}>
                                  <Text style={styles.moreImagesText}>
                                    +{singlePost.media.length - 5}
                                  </Text>
                                </View>
                              )}
                            </View>
                          );
                        })}
                    </View>
                  )}

                  <View style={styles.likeCommentSection}>
                    <TouchableOpacity
                      style={styles.likeButton}
                      onPress={() =>
                        singlePost?._id && handleLike(singlePost._id)
                      }>
                      {singlePost?.isLikedByUser ? (
                        <LikeFilledIcons width={20} height={20} />
                      ) : (
                        <LikeIcon width={20} height={20} />
                      )}
                      <Text style={styles.likeButtonText}>
                        {singlePost?.likesCount}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.commentButton}>
                      <CommentIcon width={20} height={20} fill="#4C4F56" />
                      <Text style={styles.commentButtonText}>Comment</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.commentButton}>
                      <ShareIcon width={20} height={20} fill="#4C4F56" />
                      <Text style={styles.commentButtonText}>Share</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.commentContainer}>
                    <CommentsSection comments={comments} />
                  </View>
                </View>
              </View>
            );
          }
          return null;
        }}
      />
      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          value={commentText}
          onChangeText={setCommentText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddComment}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostComment;
