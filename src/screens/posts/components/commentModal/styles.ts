'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  // Comment items
  commentItem: {
    backgroundColor: '#f9f9f9',
    padding: 8,
    borderRadius: 4,
    marginVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  //   Comment username
  commentUserName: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  //   Comment content
  commentContent: {
    fontSize: 14,
    marginLeft: 4,
  },

  //   Add comment section
  addCommentSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 12,
  },

  //   Comment input
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

  //   Modal backgroud
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  //   Modal container
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    maxHeight: '80%',
  },

  //   Scrollable comment list
  scrollableCommentList: {
    maxHeight: '80%',
    marginBottom: 16,
  },

  //   Modal title container
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

  //   Cancel container
  cancelIconContainer: {
    paddingTop: 5,
  },

  //   Modal title
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },

  //   Error text
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});
