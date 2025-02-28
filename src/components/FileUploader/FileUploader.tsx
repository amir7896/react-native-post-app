import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  ScrollView,
  Modal,
  Text,
  TouchableOpacity,
} from 'react-native';
import Video from 'react-native-video'; // ✅ Import Video component
import {
  launchCamera,
  launchImageLibrary,
  Asset,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';

import styles from './styles';

import {
  UploadIcon,
  GalleryIcon,
  CameraIcon,
  DeleteIcon,
  PlayIcon, // ✅ Play icon
  PauseIcon, // ✅ Pause icon (Create this icon in svgs folder)
} from '../../assets/svgs';

type FileUploaderProps = {
  onFilesSelected: (files: Asset[]) => void;
  mediaType?: 'mixed' | 'photo' | 'video'; // ✅ Optional media type selection
};

const FileUploader: React.FC<FileUploaderProps> = ({
  onFilesSelected,
  mediaType = 'mixed', // ✅ Default to 'mixed' if no type is passed
}) => {
  const [mediaFiles, setMediaFiles] = useState<Asset[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [playingVideoIndex, setPlayingVideoIndex] = useState<number | null>(
    null,
  );

  const videoRefs = useRef<Array<Video | null>>([]);

  // Handle media selection
  const handleMediaPicker = async (source: 'gallery' | 'camera') => {
    const options: ImageLibraryOptions & CameraOptions = {
      mediaType, // ✅ Use dynamic media type
      quality: 1,
      videoQuality: 'high',
      includeBase64: false,
      selectionLimit: 5,
    };

    try {
      const result =
        source === 'gallery'
          ? await launchImageLibrary(options)
          : await launchCamera(options);

      if (result.assets && result.assets.length > 0) {
        const newFiles = [...mediaFiles, ...result.assets];
        setMediaFiles(newFiles);
        onFilesSelected(newFiles);
      }
    } catch (error) {
      console.error('Error picking media:', error);
    }

    setIsModalVisible(false);
  };

  // Remove media file
  const removeMedia = (index: number) => {
    const updatedFiles = mediaFiles.filter((_, i) => i !== index);
    setMediaFiles(updatedFiles);
    onFilesSelected(updatedFiles);
  };

  // Toggle video play/pause
  const toggleVideoPlayback = (index: number) => {
    if (playingVideoIndex === index) {
      setPlayingVideoIndex(null); // Pause video if it's currently playing
    } else {
      setPlayingVideoIndex(index); // Play selected video
    }
  };

  return (
    <View style={styles.fileUploaderContainer}>
      {/* Single Button for Media Selection */}
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <UploadIcon width={30} height={30} />
      </TouchableOpacity>

      {/* Modal for Selection Options */}
      <Modal transparent visible={isModalVisible} animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose Media Source</Text>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleMediaPicker('gallery')}>
              <GalleryIcon width={30} height={30} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => handleMediaPicker('camera')}>
              <CameraIcon width={35} height={35} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}>
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Selected Media Previews */}
      <ScrollView horizontal>
        {mediaFiles.map((file, index) => (
          <View key={index} style={styles.mediaPreviewContainer}>
            {/* Show Image if File is an Image */}
            {file.type?.startsWith('image') ? (
              <Image source={{uri: file.uri}} style={styles.mediaPreview} />
            ) : (
              // Show Video with Play/Pause Option
              <View style={styles.videoPreviewContainer}>
                <TouchableOpacity
                  onPress={() => toggleVideoPlayback(index)}
                  style={styles.videoTouchable}>
                  <Video
                    ref={ref => (videoRefs.current[index] = ref)}
                    source={{uri: file.uri}}
                    style={styles.mediaPreview}
                    resizeMode="cover"
                    paused={playingVideoIndex !== index}
                    controls={false}
                  />
                  <TouchableOpacity
                    onPress={() => toggleVideoPlayback(index)}
                    style={styles.playPauseButton}>
                    {playingVideoIndex === index ? (
                      <PauseIcon width={30} height={30} fill="white" />
                    ) : (
                      <PlayIcon width={30} height={30} fill="white" />
                    )}
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>
            )}

            {/* Delete Button */}
            <TouchableOpacity
              onPress={() => removeMedia(index)}
              style={styles.deleteButton}>
              <DeleteIcon width={25} height={25} fill="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FileUploader;
