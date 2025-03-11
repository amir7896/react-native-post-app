import React from 'react';
import {View, Text, FlatList, StyleSheet, Image} from 'react-native';

interface Comment {
  _id: string;
  user: {
    _id: string;
    userName: string;
    secureUrl: string;
  };
  content: string;
}

interface CommentsSectionProps {
  comments: any;
}

const CommentsSection: React.FC<CommentsSectionProps> = ({comments}) => {
  const renderCommentItem = ({item}: {item: Comment}) => (
    <View style={styles.commentItem}>
      <View style={styles.commentHeader}>
        <Image
          source={{uri: item.user.secureUrl}}
          style={styles.profileImage}
        />
        <View style={styles.commentInfo}>
          <Text style={styles.userName}>{item.user.userName}</Text>
          <Text style={styles.commentText}>{item.content}</Text>
        </View>
      </View>
      <View style={styles.commentActions}>
        <Text style={styles.actionText}>2d</Text>
        <Text style={styles.actionText}>Like</Text>
        <Text style={styles.actionText}>Reply</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>All comments</Text>
      </View>
      <FlatList
        data={comments}
        renderItem={renderCommentItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    marginBottom: 10,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  commentItem: {
    marginBottom: 10,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  commentInfo: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    padding: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 2,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: 5,
    marginLeft: 40, 
  },
  actionText: {
    marginRight: 10,
    color: '#65676b',
    fontSize: 12,
  },
});

export default CommentsSection;
