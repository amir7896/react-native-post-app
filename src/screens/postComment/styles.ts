'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  card: {
    backgroundColor: 'white',
    padding: 5,
    marginHorizontal: 2,
    marginVertical: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    elevation: 1,
    borderRadius: 5,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
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
  moreIconContainer: {
    padding: 8,
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
    resizeMode: 'cover',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonContainer: {
    paddingLeft: 1,
    paddingTop: 10,
  },
  backButton: {
    padding: 0,
  },
  commentList: {
    marginTop: 10,
    paddingHorizontal: 12,
  },
  commentItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 5,
  },

  commentProfile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    marginRight: 10,
  },
  commentProfileImage: {
    width: '100%',
    height: '100%',
  },
  commentContent: {
    flex: 1,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff', // Ensure the background is white
    position: 'absolute', // Position it absolutely
    bottom: 0, // At the bottom of the screen
    left: 0,
    right: 0,
  },
  commentInput: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff', // Example color, customize as needed
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  commentContainer: {
    marginBottom: 35,
  },
});
