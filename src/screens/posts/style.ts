'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Render post container style
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

  // Add post container
  addPostContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 15,
    paddingHorizontal: 25,
  },
});
