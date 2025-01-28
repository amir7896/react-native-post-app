import React, {useEffect, useRef, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Modal,
  ScrollView,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchPosts,
  likePost,
  addComment,
  fetchCommentsForPost,
} from '../../features/Post/PostSlice';
import styles from './style';
import type {RootState, AppDispatch} from '../../app/store';
import {LikeIcon, CommentIcon, CancelIcon, AddIcon} from '../../assets/svgs';

type Post = {
  _id: string;
  title: string;
  content: string;
  user: {
    userId: string;
    userName: string;
  };

  likesCount: number;
};

function Posts(): React.ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const {posts, isLoading, comments} = useSelector(
    (state: RootState) => state.post,
  );
  const [start, setStart] = useState(0);
  const [showCommentsPostId, setShowCommentsPostId] = useState<string | null>(
    null,
  );
  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  console.log('Single Post comments:', comments);

  // Reference for ScrollView
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    dispatch(fetchPosts({start, limit: 5}));
  }, [start, dispatch]);

  const handleLike = (postId: string) => {
    dispatch(likePost(postId));
  };

  const handleCommentSubmit = (postId: string, comment: string) => {
    if (!comment.trim()) {
      setErrorMessage('Comment cannot be empty');
      return;
    }

    setErrorMessage(null);
    dispatch(addComment({postId, content: comment}))
      .unwrap()
      .then(() => {
        setCommentText('');
        // Scroll to the bottom when a new comment is added
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({animated: true});
        }, 100); // Slight delay to ensure the comment is rendered
      })
      .catch(() => {
        setErrorMessage('Failed to add comment. Please try again.');
      });
  };

  const handleShowComments = (postId: string) => {
    setShowCommentsPostId(postId);
    dispatch(fetchCommentsForPost(postId));
  };

  const handleHideComments = () => {
    setShowCommentsPostId(null);
    setErrorMessage(null);
  };

  const renderItem = ({item}: {item: Post}) => (
    <View style={styles.card}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.content}</Text>
      {/* Like and comment Buttons */}
      <View style={styles.likeCommentSection}>
        {/* Like Button */}
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLike(item._id)}>
          <LikeIcon width={16} height={16} fill="#5d4037" />
          {/* Smaller icon */}
          <Text style={styles.likeButtonText}>{item.likesCount}</Text>
        </TouchableOpacity>

        {/* Comment Button */}
        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleShowComments(item._id)}>
          <CommentIcon width={16} height={16} fill="#4C4F56" />
          {/* Smaller icon */}
        </TouchableOpacity>
      </View>

      {showCommentsPostId === item._id && (
        <Modal
          animationType="fade"
          transparent={true}
          visible={true}
          onRequestClose={handleHideComments}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              {/* Title with Cancel Icon */}
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Comments</Text>
                <TouchableOpacity
                  onPress={handleHideComments}
                  style={styles.cancelIconContainer}>
                  <CancelIcon width={20} height={20} fill="white" />
                </TouchableOpacity>
              </View>

              {/* Comments Section */}
              <ScrollView
                style={styles.scrollableCommentList}
                ref={scrollViewRef}>
                {comments?.map(comment => (
                  <View key={comment?._id} style={styles.commentItem}>
                    <Text style={styles.commentUserName}>
                      User: {comment?.user?.userName || 'Unknown'}
                    </Text>
                    <Text style={styles.commentContent}>
                      {comment?.content}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              {/* Add Comment Section */}
              <View style={styles.addCommentSection}>
                <TextInput
                  value={commentText}
                  onChangeText={setCommentText}
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                />
                <TouchableOpacity
                  onPress={() => handleCommentSubmit(item._id, commentText)}
                  disabled={isLoading || !commentText.trim()}>
                  <AddIcon height={24} width={24} />
                </TouchableOpacity>
              </View>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );

  const loadMorePosts = () => {
    if (!isLoading) {
      setStart(prevStart => prevStart + 5);
    }
  };

  const renderHeader = () => (
    <View>
      <Text>Posts</Text>
    </View>
  );

  const renderFooter = () => {
    return isLoading ? (
      <ActivityIndicator size="large" color="#bdbdbd" />
    ) : null;
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item._id.toString()}
      contentContainerStyle={styles.container}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListHeaderComponent={renderHeader}
    />
  );
}

export default Posts;
