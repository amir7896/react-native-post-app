import React, {useEffect} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import { ArrowLeftIcon} from '../../assets/svgs';
import Video from 'react-native-video';
import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {fetchSinglePost} from '../../features/Post/PostSlice';
import {RootState, AppDispatch} from '../../app/store';

const PostDetail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();

  const {id} = route?.params as {id: string};
  const {singlePost, isLoading, isError} = useSelector(
    (state: RootState) => state.post,
  );


  useEffect(() => {
    dispatch(fetchSinglePost(id));
  }, [dispatch, id]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isError || !singlePost) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading post.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.backButtonContainer}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ArrowLeftIcon width={24} height={24} />
        </TouchableOpacity>
      </View>
      <View style={styles.topSection}>
        <View style={styles.userProfileCard}>
          {singlePost?.user?.profileImageSecureUrl ? (
            <Image
              source={{uri: singlePost?.user?.profileImageSecureUrl}}
              style={styles.userProfileImage}
            />
          ) : (
            <Image
              source={require('../../assets/images/default-profile.png')}
              style={styles.userProfileImage}
            />
          )}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{singlePost.user.userName}</Text>
          <Text style={styles.postDate}>
            {new Date(singlePost.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{singlePost.title}</Text>
        <Text style={styles.postBody}>{singlePost.content}</Text>
      </View>
      <View style={styles.mediaColumn}>
        {singlePost.media.map((mediaItem: any) => (
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
