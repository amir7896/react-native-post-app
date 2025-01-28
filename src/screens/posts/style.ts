'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Container style
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  // Card style
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
  // Post title style
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 4,
  },
  // Post body style
  postBody: {
    fontSize: 16,
    color: '#666',
  },

  // Like and comment section container
  likeCommentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
  },

  // Like button style
  likeButton: {
    flexDirection: 'row',
    width: 100,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E4E6EB',
    borderWidth: 1,
    borderColor: '#BCC0C0',
  },

  // Like button text
  likeButtonText: {
    color: '#4C4F56',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },

  // Comment button style
  commentButton: {
    flexDirection: 'row',
    width: 100,
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F2F5',
    borderWidth: 1,
    borderColor: '#BCC0C0',
  },

  // Comment button text
  commentButtonText: {
    color: '#4C4F56',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },

  // Other styles remain unchanged
  commentList: {
    marginVertical: 8,
  },

  commentItem: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  commentUserName: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  commentContent: {
    fontSize: 14,
    marginLeft: 4,
  },

  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
  },

  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8,
    backgroundColor: '#f8f8f8',
  },

  addCommentButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },

  scrollableCommentList: {
    maxHeight: '80%',
    marginBottom: 16,
  },

  modalTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
  },

  cancelIconContainer: {
    paddingTop: 5,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  closeModalButton: {
    marginTop: 16,
    alignSelf: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007bff',
    borderRadius: 6,
  },

  closeModalButtonText: {
    color: 'white',
    fontWeight: '600',
  },

  errorText: {
    color: 'red',
    marginBottom: 8,
  },

  addPostContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingHorizontal: 25,
  },
});
