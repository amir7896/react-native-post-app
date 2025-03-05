import React from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ChevronLeftIcon } from '../../assets/svgs';
import Video from 'react-native-video';
import styles from './styles'; // Import styles (create this file)
const PostDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Get the navigation object

  const {post} = route?.params as any; // Get post data from navigation params
  console.log('Post detail Page :', post)
  const handleGoBack = () => {
    navigation.goBack(); // Go back to the previous screen
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <ChevronLeftIcon width={24} height={24} />
      </TouchableOpacity>
      {/* Top Section - Profile, Username, Date */}
      <View style={styles.topSection}>
        <View style={styles.userProfileCard}>
          {post?.user?.profileImage ? (
            <Image
              source={{uri: `${post?.user?.profileImage}`}}
              style={styles.userProfileImage}
            />
          ) : (
            // You can replace this with your ProfileIcon component
            <Image
              source={require('../../assets/images/default-profile.png')} // Replace with your actual path
              style={styles.userProfileImage}
            />
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{post.user.userName}</Text>
          <Text style={styles.postDate}>
            {new Date(post.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      {/* Post Content */}
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postBody}>{post.content}</Text>
      </View>
      {/* Media Display Section */}
      <View style={styles.mediaColumn}>
        {post.media.map((mediaItem: any) => (
          <View key={mediaItem._id} style={styles.mediaItemContainer}>
            {mediaItem.mediaType === 'image' ? (
              <Image
                source={{uri: mediaItem.secureUrl}}
                style={styles.mediaImage}
              />
            ) : (
              <Video
                source={{uri: mediaItem.secureUrl}}
                style={styles.mediaVideo}
                controls={true}
                resizeMode="cover"
                volume={1.0}
                paused={true}
              />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default PostDetail;