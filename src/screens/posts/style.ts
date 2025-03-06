'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    paddingHorizontal: 0, // Remove horizontal padding
    paddingVertical: 8, // Add some vertical padding
    backgroundColor: '#f0f2f5', // Facebook background color
  },
  card: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 4, // Reduce margin between cards
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Add this
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1, // Add this
  },
  userProfileCard: {
    width: 40, // Reduced profile image size
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  userProfileImage: {
    width: '100%',
    height: '100%',
  },
  moreIconContainer: {
    padding: 8,
  },
  userName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#050505', // Facebook username color
    marginBottom: 2,
  },
  postDate: {
    fontSize: 12,
    color: '#606770', // Facebook date color
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
  likeCommentSection: {
    marginTop: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  likeButtonText: {
    fontSize: 14,
    color: '#606770',
    marginLeft: 6,
  },
  commentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  commentButtonText: {
    fontSize: 14,
    color: '#606770',
    marginLeft: 6,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  addPostContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingHorizontal: 25,
  },
  mediaContainer: {
    marginTop: 10,
    flexDirection: 'row',
  },
  mediaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  mediaGridItem: {
    padding: 2,
    position: 'relative',
    overflow: 'hidden',
  },
  mediaItem: {
    flex: 1,
    borderRadius: 0,
    resizeMode: 'cover', // Ensure images cover the area
  },
  moreImagesOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreImagesText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
