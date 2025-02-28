import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  // Full-screen overlay for the modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)', // Dark overlay
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Modal Container
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingBottom: 20,
    overflow: 'hidden',
    elevation: 10, // Shadow effect for Android
  },

  // Header with title and close button
  header: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },

  closeButton: {
    padding: 8,
  },

  closeButtonText: {
    fontSize: 18,
    color: '#fff',
  },

  // Content section (scrollable)
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    maxHeight: 400, // Ensures content doesn't overflow
  },

  // Submit Button
  submitButton: {
    width: '90%',
    backgroundColor: '#28a745',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 15,
  },

  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default styles;
