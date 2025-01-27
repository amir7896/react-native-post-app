import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Button,
  Modal,
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

  // Fetch posts on component mount and when `start` changes
  useEffect(() => {
    dispatch(fetchPosts({start, limit: 5}));
  }, [start, dispatch]);

  // Handle liking a post
  const handleLike = (postId: string) => {
    dispatch(likePost(postId));
  };

  // Handle adding a comment
  const handleCommentSubmit = (postId: string, comment: string) => {
    if (!comment.trim()) {
      setErrorMessage('Comment cannot be empty');
      return;
    }

    setErrorMessage(null); // Clear previous errors
    dispatch(addComment({postId, content: comment}))
      .unwrap()
      .then(() => {
        setCommentText(''); // Clear input on success
      })
      .catch(() => {
        setErrorMessage('Failed to add comment. Please try again.');
      });
  };

  // Fetch comments for a specific post when modal is opened
  const handleShowComments = (postId: string) => {
    setShowCommentsPostId(postId);
    dispatch(fetchCommentsForPost(postId));
  };

  // Close the comments modal
  const handleHideComments = () => {
    setShowCommentsPostId(null);
    setErrorMessage(null); // Clear error messages
  };

  // Render the add comment section
  const renderAddCommentSection = (postId: string) => (
    <View style={styles.addCommentSection}>
      <TextInput
        value={commentText}
        onChangeText={setCommentText}
        style={styles.commentInput}
        placeholder="Add a comment..."
      />
      <Button
        title="Add Comment"
        onPress={() => handleCommentSubmit(postId, commentText)}
        disabled={isLoading || !commentText.trim()}
      />
    </View>
  );

  // Render each post item
  const renderItem = ({item}: {item: Post}) => (
    <View style={styles.card}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.content}</Text>

      <View style={styles.commentSection}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLike(item._id)}>
          <Text style={styles.likeButtonText}>Likes: {item.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleShowComments(item._id)}>
          <Text style={styles.likeButtonText}>Comments</Text>
        </TouchableOpacity>
      </View>

      {showCommentsPostId === item._id && (
        <Modal
          animationType="slide"
          transparent={true}
          visible={showCommentsPostId !== null}
          onRequestClose={handleHideComments}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Comments</Text>
              <View style={styles.commentList}>
                {item.comments.map(comment => (
                  <View key={comment._id} style={styles.commentItem}>
                    <Text>
                      {comment.user?.userName || 'Unknown'}: {comment.content}
                    </Text>
                  </View>
                ))}
                {errorMessage && (
                  <Text style={styles.errorText}>{errorMessage}</Text>
                )}
                {renderAddCommentSection(item._id)}
              </View>
              <Button title="Close" onPress={handleHideComments} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );

  // Load more posts when reaching the bottom
  const loadMorePosts = () => {
    if (!isLoading) {
      setStart(prevStart => prevStart + 5);
    }
  };

  // Render the header of the post list
  const renderHeader = () => (
    <View>
      <Text>Posts</Text>
    </View>
  );

  // Render the footer of the post list
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
