import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Button,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchPosts} from '../../features/Post/PostSlice';
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
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState(''); // For comment input
  const [likedByUser, setLikedByUser] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts({start, limit: 5}));
  }, [start, dispatch]);

  // Like post
  const handleLike = (postId: string) => {
    // Placeholder for like functionality
    setLikedByUser(!likedByUser);
    console.log(likedByUser ? 'Liked' : 'Unliked', postId);
  };

  const handleCommentSubmit = (postId: string, comment: string) => {
    // Placeholder for comment functionality
    console.log('Comment Submitted:', comment, 'for Post:', postId);
    setCommentText(''); // Clear the comment input after submission
  };

  const renderItem = ({item}: {item: Post}) => (
    <View style={styles.card}>
      <Text style={styles.postId}>ID: {item._id}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.content}</Text>

      {/* Like Button */}
      <TouchableOpacity
        style={[
          styles.likeButton,
          {backgroundColor: likedByUser ? 'blue' : 'gray'},
        ]}
        onPress={() => handleLike(item._id)}>
        <Text style={styles.likeButtonText}>Like {item.likesCount}</Text>
      </TouchableOpacity>

      {/* Comment Button */}
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => {
          console.log('Show Comments for', item._id);
          // You can toggle visibility of comments here
        }}>
        <Text style={styles.commentButtonText}>Show Comments</Text>
      </TouchableOpacity>

      {/* Comment Section */}
      <View style={styles.commentList}>
        {item.comments.map(comment => (
          <View key={comment._id} style={styles.commentItem}>
            <Text>
              {comment.user.userName}: {comment.content}
            </Text>
          </View>
        ))}
      </View>

      {/* Add Comment Input */}
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
