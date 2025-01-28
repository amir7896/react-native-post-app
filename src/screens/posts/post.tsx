import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {fetchPosts, likePost} from '../../features/Post/PostSlice';
import type {RootState, AppDispatch} from '../../app/store';
import {LikeIcon, CommentIcon, LikeFilledIcons} from '../../assets/svgs';
import CommentModal from './CommentModal';

import styles from './style';

type Post = {
  _id: string;
  title: string;
  content: string;
  user: {
    userId: string;
    userName: string;
  };
  likesCount: number;
  isLikedByUser: boolean;
};

function Posts(): React.ReactElement {
  const dispatch = useDispatch<AppDispatch>();
  const {posts, isLoading} = useSelector((state: RootState) => state.post);
  const [start, setStart] = useState(0);
  const [showCommentsPostId, setShowCommentsPostId] = useState<string | null>(
    null,
  );

  useEffect(() => {
    dispatch(fetchPosts({start, limit: 5}));
  }, [start, dispatch]);

  const handleLike = (postId: string) => {
    dispatch(likePost(postId));
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
      <View style={styles.likeCommentSection}>
        <TouchableOpacity
          style={styles.likeButton}
          onPress={() => handleLike(item._id)}>
          {item.isLikedByUser ? (
            <LikeFilledIcons width={16} height={16} />
          ) : (
            <LikeIcon width={16} height={16} />
          )}
          <Text style={styles.likeButtonText}>{item.likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.commentButton}
          onPress={() => handleShowComments(item._id)}>
          <CommentIcon width={16} height={16} fill="#4C4F56" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const loadMorePosts = () => {
    if (!isLoading) {
      setStart(prevStart => prevStart + 5);
    }
  };

  return (
    <>
      <FlatList
        data={posts}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
        contentContainerStyle={styles.container}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoading ? <ActivityIndicator size="large" color="#bdbdbd" /> : null
        }
      />
      {showCommentsPostId && (
        <CommentModal
          isVisible={!!showCommentsPostId}
          postId={showCommentsPostId}
          onClose={handleHideComments}
        />
      )}
    </>
  );
}

export default Posts;
