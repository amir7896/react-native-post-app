import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Button,
} from 'react-native';
import {useForm, Control, FieldValues} from 'react-hook-form';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import CustomInput from '../../components/CustomInput/customInput';
import styles from './postCreateStyle';

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
    formState: {errors},
  } = useForm<FormDataType>();
  const [mediaFiles, setMediaFiles] = useState<Asset[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Open Image or Video Picker
  const handleMediaPicker = async (
    mediaType: 'photo' | 'video',
    source: 'gallery' | 'camera',
  ) => {
    const options = {
      mediaType,
      quality: 1,
      videoQuality: 'high',
      includeBase64: false,
      selectionLimit: 5, // Allow selecting up to 5 files
    };

    try {
      const result =
        source === 'gallery'
          ? await launchImageLibrary(options)
          : await launchCamera(options);

      if (result.assets && result.assets.length > 0) {
        setMediaFiles([...mediaFiles, ...result.assets]); // Append selected media
      }
    } catch (error) {
      console.error('Error picking media:', error);
    }
  };

  // Remove media from list
  const removeMedia = (index: number) => {
    setMediaFiles(mediaFiles.filter((_, i) => i !== index));
  };

  // Handle post submission
  const onSubmit = async (data: FormDataType) => {
    if (isUploading) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('content', data.content);

    mediaFiles.forEach((file, index) => {
      formData.append('media', {
        uri: file.uri,
        type: file.type,
        name: file.fileName || `upload_${index}`,
      });
    });

    try {
      await onSubmitPost(formData);
      setMediaFiles([]); // Clear selected media
      onClose();
    } catch (error) {
      Alert.alert('Error', 'Failed to create post');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Create Post</Text>

          {/* Title Input */}
          <CustomInput
            control={control as unknown as Control<FieldValues, object>}
            name="title"
            rules={{required: 'Title is required'}}
            placeholder="Post Title"
          />
          {errors.title && (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          )}

          {/* Content Input */}
          <CustomInput
            control={control as unknown as Control<FieldValues, object>}
            name="content"
            rules={{required: 'Content is required'}}
            placeholder="Post Content"
          />
          {errors.content && (
            <Text style={styles.errorText}>{errors.content.message}</Text>
          )}

          {/* Media Upload Options */}
          <View style={styles.mediaButtonsContainer}>
            <Button
              title="Gallery (Image)"
              onPress={() => handleMediaPicker('photo', 'gallery')}
            />
            <Button
              title="Camera (Image)"
              onPress={() => handleMediaPicker('photo', 'camera')}
            />
            <Button
              title="Gallery (Video)"
              onPress={() => handleMediaPicker('video', 'gallery')}
            />
            <Button
              title="Record Video"
              onPress={() => handleMediaPicker('video', 'camera')}
            />
          </View>

          {/* Selected Media Preview */}
          <ScrollView horizontal>
            {mediaFiles.map((file, index) => (
              <View key={index} style={styles.mediaPreviewContainer}>
                <Image source={{uri: file.uri}} style={styles.mediaPreview} />
                <Button
                  title="Remove"
                  color="red"
                  onPress={() => removeMedia(index)}
                />
              </View>
            ))}
          </ScrollView>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.submitButton}>
            {isUploading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitButtonText}>Create Post</Text>
            )}
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CreatePostModal;
