'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // container style
  container: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  //   card style
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
  //   Post title style
  postTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 4,
  },
  //   Post body style
  postBody: {
    fontSize: 16,
    color: '#666',
  },

  // Like button style
  likeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'blue',
    marginRight: 8,
  },
  // Like button text
  likeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },

  // Comment button style
  commentButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Comment button text
  commentButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
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
});
