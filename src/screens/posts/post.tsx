import React, {useEffect, useState} from 'react';
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

type Post = {
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
};

function Posts(): React.ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const {posts, isLoading} = useSelector((state: RootState) => state.post);
  const [start, setStart] = useState(0);
  const [showCommentsPostId, setShowCommentsPostId] = useState<string | null>(
    null,
  );
  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
      <View style={styles.likeCommentSection}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLike(item._id)}>
          <Text style={styles.likeButtonText}>Likes: {item.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleShowComments(item._id)}>
          <Text style={styles.commentButtonText}>Comments</Text>
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
              <View style={styles.modalTitleContainer}>
                <Text style={styles.modalTitle}>Comments</Text>
              </View>
              <ScrollView style={styles.scrollableCommentList}>
                {item.comments.map(comment => (
                  <View key={comment._id} style={styles.commentItem}>
                    <Text style={styles.commentUserName}>
                      {comment.user?.userName || 'Unknown'}:
                    </Text>
                    <Text style={styles.commentContent}>{comment.content}</Text>
                  </View>
                ))}
              </ScrollView>
              <View style={styles.addCommentSection}>
                <TextInput
                  value={commentText}
                  onChangeText={setCommentText}
                  style={styles.commentInput}
                  placeholder="Add a comment..."
                />
                <TouchableOpacity
                  style={styles.addCommentButton}
                  onPress={() => handleCommentSubmit(item._id, commentText)}
                  disabled={isLoading || !commentText.trim()}>
                  <Text style={styles.addCommentButtonText}>Post</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.closeModalButton}
                onPress={handleHideComments}>
                <Text style={styles.closeModalButtonText}>Close</Text>
              </TouchableOpacity>
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
