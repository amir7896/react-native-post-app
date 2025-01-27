'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // container style
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  // card style
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

  // Like button style (Updated)
  likeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#E4E6EB', // Light blue background similar to Facebook's button color
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#BCC0C0',
  },
  // Like button text
  likeButtonText: {
    color: '#4C4F56',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },

  // Comment button style (Updated)
  commentButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F0F2F5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#BCC0C0',
  },

  // Comment button text
  commentButtonText: {
    color: '#4C4F56',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 6,
  },

  // Comment section style
  commentList: {
    marginVertical: 8,
  },

  // Comment item
  commentItem: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
  },

  // Add comment input section
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },

  // Comment input
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },

  // Comment section
  commentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 1,
  },

  // Modal background
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal container
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxHeight: '80%',
  },

  // Modal title
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
