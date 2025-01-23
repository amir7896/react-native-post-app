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
  //   Post Id style
  postId: {
    fontSize: 16,
    fontWeight: '400',
    color: '#333',
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
});
