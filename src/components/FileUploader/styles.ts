import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fileUploaderContainer: {
    marginTop: 10,
    alignItems: 'center',
  },

  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  optionButton: {
    width: '100%',
    paddingVertical: 12,
    backgroundColor: '#007bff',
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },

  closeButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#ccc',
    borderRadius: 5,
  },

  closeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  mediaPreviewContainer: {
    marginTop: 10,
    marginRight: 10,
    position: 'relative',
    alignItems: 'center',
  },

  mediaPreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  videoPreviewContainer: {
    position: 'relative',
    width: 100,
    height: 100,
  },

  videoTouchable: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  playPauseButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -15}, {translateY: -15}],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 25,
  },

  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 5,
  },
});

export default styles;
