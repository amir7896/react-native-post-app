import {StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f0f2f5',
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userProfileCard: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  userProfileImage: {
    width: '100%',
    height: '100%',
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#050505',
    marginBottom: 2,
  },
  postDate: {
    fontSize: 12,
    color: '#606770',
  },
  postContent: {
    marginBottom: 12,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
    color: '#050505',
  },
  postBody: {
    fontSize: 14,
    color: '#050505',
    lineHeight: 20,
  },
  mediaColumn: {
    flexDirection: 'column',
  },
  mediaItemContainer: {
    marginBottom: 8,
  },
  mediaImage: {
    width: width - 24,
    height: 300,
    borderRadius: 8,
  },
  mediaVideo: {
    width: width - 24,
    height: 300,
    borderRadius: 8,
    backgroundColor: 'black',
  },

});
