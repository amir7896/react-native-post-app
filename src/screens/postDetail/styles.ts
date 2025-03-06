import {StyleSheet, Dimensions, Platform} from 'react-native';

const {width} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#f0f2f5',
  },
  backButtonContainer: {
    // Add container for back button
    position: 'absolute',
    top: Platform.OS === 'ios' ? 5 : 5, // Adjust top for iOS status bar
    left: 0,
    zIndex: 10, // Ensure it's on top
  },
  backButton: {
    padding: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Add background for better visibility
  },
  topSection: {
    marginTop: 45,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
