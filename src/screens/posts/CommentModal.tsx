import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchCommentsForPost, addComment} from '../../features/Post/PostSlice';
import {CancelIcon, AddIcon} from '../../assets/svgs';
import type {RootState, AppDispatch} from '../../app/store';

import styles from './style';

type CommentModalProps = {
  isVisible: boolean;
  postId: string | null;
  onClose: () => void;
};

const CommentModal: React.FC<CommentModalProps> = ({
  isVisible,
  postId,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const {comments, isLoading} = useSelector((state: RootState) => state.post);

  const [commentText, setCommentText] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollViewRef = useRef<ScrollView>(null);

  // Fetch comments when the modal is opened
  useEffect(() => {
    if (postId && isVisible) {
      dispatch(fetchCommentsForPost(postId));
    }
  }, [dispatch, postId, isVisible]);

  // Submit comment method
  const handleCommentSubmit = () => {
    if (!commentText.trim()) {
      setErrorMessage('Comment cannot be empty');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    if (postId) {
      dispatch(addComment({postId, content: commentText}))
        .unwrap()
        .then(() => {
          setCommentText('');
          // Scroll to the bottom when a new comment is added
          setTimeout(() => {
            scrollViewRef.current?.scrollToEnd({animated: true});
          }, 100);
        })
        .catch(() => {
          setErrorMessage('Failed to add comment. Please try again.');
        })
        .finally(() => {
          setIsSubmitting(false);
        });
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Comments</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.cancelIconContainer}>
              <CancelIcon width={20} height={20} fill="white" />
            </TouchableOpacity>
          </View>

          {/* Comments Section */}
          {isLoading ? (
            <ActivityIndicator size="large" color="#bdbdbd" />
          ) : (
            <ScrollView
              style={styles.scrollableCommentList}
              ref={scrollViewRef}>
              {comments.map(comment => (
                <View key={comment._id} style={styles.commentItem}>
                  <Text style={styles.commentUserName}>
                    User: {comment.user?.userName || 'Unknown'}
                  </Text>
                  <Text style={styles.commentContent}>{comment.content}</Text>
                </View>
              ))}
            </ScrollView>
          )}

          {/* Add Comment Section */}
          <View style={styles.addCommentSection}>
            <TextInput
              value={commentText}
              onChangeText={setCommentText}
              style={styles.commentInput}
              placeholder="Add a comment..."
            />
            <TouchableOpacity
              onPress={handleCommentSubmit}
              disabled={isSubmitting || !commentText.trim()}>
              <AddIcon height={24} width={24} />
            </TouchableOpacity>
          </View>
          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
        </View>
      </View>
    </Modal>
  );
};

export default CommentModal;
