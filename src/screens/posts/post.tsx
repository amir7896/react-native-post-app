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
import {fetchPosts, likePost} from '../../features/Post/PostSlice';
import styles from './style';
import type {RootState, AppDispatch} from '../../app/store';
import LikeOutLinedIcon from '../../assets/svgs/LikeOutLined';
import CommentOutLinedIcon from '../../assets/svgs/CommentOutLined';

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

  useEffect(() => {
    dispatch(fetchPosts({start, limit: 5}));
  }, [start, dispatch]);

  const handleLike = (postId: string) => {
    // Dispatch like/unlike action
    dispatch(likePost(postId));
  };

  const handleCommentSubmit = (postId: string, comment: string) => {
    console.log('Comment Submitted:', comment, 'for Post:', postId);
    setCommentText('');
  };

  const handleShowComments = (postId: string) => {
    setShowCommentsPostId(postId);
  };

  const handleHideComments = () => {
    setShowCommentsPostId(null);
  };

  const renderItem = ({item}: {item: Post}) => (
    <View style={styles.card}>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.content}</Text>

      <View style={styles.commentSection}>
        <TouchableOpacity
          style={[styles.likeButton]}
          onPress={() => handleLike(item._id)}>
          <LikeOutLinedIcon width={20} height={20} />
          <Text style={styles.likeButtonText}>{item.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleShowComments(item._id)}>
          <CommentOutLinedIcon width={20} height={20} />
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
                      {comment.user.userName}: {comment.content}
                    </Text>
                  </View>
                ))}

                <View style={styles.addCommentSection}>
                  <TextInput
                    value={commentText}
                    onChangeText={setCommentText}
                    style={styles.commentInput}
                    placeholder="Add a comment..."
                  />
                  <Button
                    title="Add Comment"
                    onPress={() => {
                      if (commentText.trim()) {
                        handleCommentSubmit(item._id, commentText);
                      }
                    }}
                  />
                </View>
              </View>
              <Button title="Close" onPress={handleHideComments} />
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
