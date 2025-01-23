import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

type Post = {
  id: number;
  title: string;
  body: string;
};

function Posts(): React.ReactElement {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [start, setStart] = useState(0);

  const fetchPosts = async (start: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_start=${start}&_limit=5`,
      );
      setPosts(prevPosts => [...prevPosts, ...response.data]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(start);
  }, [start]);

  const loadMorePosts = () => {
    if (!loading) {
      setLoading(true);
      setTimeout(() => {
        setStart(prevStart => prevStart + 5);
      }, 2000); // 2-second delay
    }
  };

  const renderItem = ({item}: {item: Post}) => (
    <View style={styles.card}>
      <Text style={styles.postId}>ID: {item.id}</Text>
      <Text style={styles.postTitle}>{item.title}</Text>
      <Text style={styles.postBody}>{item.body}</Text>
    </View>
  );

  const renderFooter = () => {
    return loading ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <FlatList
      data={posts}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.container}
      onEndReached={loadMorePosts}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  postId: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 4,
  },
  postBody: {
    fontSize: 16,
    color: '#666',
  },
});

export default Posts;
