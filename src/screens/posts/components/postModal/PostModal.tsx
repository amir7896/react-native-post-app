import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import {useForm, Control, FieldValues} from 'react-hook-form';
import CustomInput from '../../../../components/CustomInput/customInput';
import FileUploader from '../../../../components/FileUploader/FileUploader';
import styles from './styles';
import {Asset} from 'react-native-image-picker';

// Type of props
type CreatePostModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSubmitPost: (data: FormData) => void;
};

type FormDataType = {
  title: string;
  content: string;
};

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isVisible,
  onClose,
  onSubmitPost,
}) => {
  const {
    control,
    handleSubmit,
    formState: {},
    reset,
  } = useForm<FormDataType>();
  const [mediaFiles, setMediaFiles] = useState<Asset[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Function to clear the form and media files
  const clearForm = () => {
    reset(); // Reset react-hook-form fields
    setMediaFiles([]); // Clear media files state
  };

  // Handle post submission
  const onSubmit = async (data: FormDataType) => {
    if (isUploading) {
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);

    mediaFiles.forEach((file, index) => {
      if (file.uri && file.type) {
        formData.append('media', {
          uri: file.uri,
          type: file.type,
          name: file.fileName || `upload_${index}.jpg`,
        } as unknown as File);
      }
    });

    try {
      await onSubmitPost(formData);
      setMediaFiles([]); // Clear selected media
      clearForm(); // Clear form on successful submission
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCloseModal = () => {
    clearForm(); // Clear form when modal is closed
    onClose(); // Call the original onClose prop to close the modal
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header with Close Button */}
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Create a Post</Text>
            <TouchableOpacity
              onPress={handleCloseModal}
              style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Scrollable Content */}
          <ScrollView style={styles.content}>
            {/* Title Input */}
            <CustomInput
              control={control as unknown as Control<FieldValues, object>}
              name="title"
              rules={{
                required: 'Title is required',
                maxLength: {
                  value: 30,
                  message: 'Title should not exceed 30 characters',
                },
              }}
              placeholder="Enter title..."
            />

            {/* Content Input */}
            <CustomInput
              control={control as unknown as Control<FieldValues, object>}
              name="content"
              rules={{
                required: 'Content is required',
                maxLength: {
                  value: 100,
                  message: 'Content should not exceed 100 characters  ',
                },
              }}
              placeholder="Write something..."
              multiline
            />

            {/* File Uploader */}
            <FileUploader onFilesSelected={setMediaFiles} />
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}>
            {isUploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Post</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePostModal;
