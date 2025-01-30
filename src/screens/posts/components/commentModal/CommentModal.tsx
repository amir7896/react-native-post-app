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

import {
  fetchCommentsForPost,
  addComment,
} from '../../../../features/Post/PostSlice';
import {CancelIcon, AddIcon} from '../../../../assets/svgs';
import type {RootState, AppDispatch} from '../../../../app/store';

import styles from './styles';

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
  const [hasFetched, setHasFetched] = useState(false); // New state to track first fetch

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (postId && isVisible && !hasFetched) {
      dispatch(fetchCommentsForPost(postId));
      setHasFetched(true); // Mark as fetched to prevent continuous re-fetching
    }
  }, [dispatch, postId, isVisible, hasFetched]);

  // Reset hasFetched when modal closes
  useEffect(() => {
    if (!isVisible) {
      setHasFetched(false);
    }
  }, [isVisible]);

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) {
      setErrorMessage('Comment cannot be empty');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      if (postId) {
        await dispatch(addComment({postId, content: commentText})).unwrap();
        setCommentText('');
        setTimeout(
          () => scrollViewRef.current?.scrollToEnd({animated: true}),
          100,
        );
      }
    } catch {
      setErrorMessage('Failed to add comment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <View style={styles.modalTitleContainer}>
            <Text style={styles.modalTitle}>Comments</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.cancelIconContainer}>
              <CancelIcon width={20} height={20} fill="white" />
            </TouchableOpacity>
          </View>

          {isLoading && !comments.length ? (
            <ActivityIndicator size="large" color="#bdbdbd" />
          ) : comments?.length ? (
            <ScrollView
              style={styles.scrollableCommentList}
              ref={scrollViewRef}>
              {comments.map(({_id, user, content}) => (
                <View key={_id} style={styles.commentItem}>
                  <Text style={styles.commentUserName}>
                    {user?.userName || 'Unknown'}
                  </Text>
                  <Text style={styles.commentContent}>{content}</Text>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text>No comments yet.</Text>
          )}

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
