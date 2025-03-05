import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Animated,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  Asset,
} from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Control, FieldValues, useForm} from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../../components/CustomInput/customInput';
import CustomAlert from '../../components/CustomAlert/CustomAlert';

import {CameraIcon} from '../../assets/svgs';
import {useDispatch, useSelector} from 'react-redux';
import {
  fetchUserProfile,
  logout,
  updateProfileImage,
  changePassword,
} from '../../features/User/UserSlice';
import {RootState, AppDispatch} from '../../app/store';

interface FormData {
  oldPassword: string;
  newPassword: string;
}

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState<Asset | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for smooth effect
  const [uploadProgress, setUploadProgress] = useState(0); // Add progress state
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const {user} = useSelector((state: RootState) => state.auth);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | 'info'>(
    'info',
  );

  // Show alert message
  const showAlert = (
    title: string,
    message: string,
    type: 'success' | 'error' | 'info',
  ) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertType(type);
    setAlertVisible(true);
  };

  // Hide alert message
  const hideAlert = () => {
    setAlertVisible(false);
  };

  // Fetch user profile on mount
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  // Change Profile Image
  const uploadImage = useCallback(
    async (imageAsset: Asset) => {
      setUploading(true);
      setUploadProgress(0); // Reset progress

      const formData = new FormData();
      formData.append('profileImage', {
        uri: imageAsset.uri,
        type: imageAsset.type,
        name: imageAsset.fileName || 'profile.jpg',
      } as any);

      try {
        // Simulate upload progress (replace with actual upload logic)
        let progress = 0;
        const interval = setInterval(() => {
          progress += 0.1;
          setUploadProgress(Math.min(progress, 1)); // Corrected progress update
          if (progress >= 1) {
            clearInterval(interval);
          }
        }, 300);

        await dispatch(updateProfileImage(formData)).unwrap();
        clearInterval(interval);
        setUploadProgress(1); // Ensure progress is 100% after API call
        showAlert('Success', 'Profile image updated successfully.', 'success');
        setUploading(false);
      } catch (error) {
        setUploadProgress(0); // Reset progress on error
        showAlert('Error', 'Failed to update profile image.', 'error');
        setUploading(false);
      }
    },
    [dispatch],
  );

  // Upload image when profileImage changes
  useEffect(() => {
    if (profileImage) {
      uploadImage(profileImage);
    }
  }, [profileImage, uploadImage]);

  const {
    control,
    handleSubmit,
    formState: {},
    reset,
  } = useForm<FormData>();

  // Function to pick an image
  const pickImage = () => {
    Alert.alert('Select Image', 'Choose an option', [
      {
        text: 'Capture Image',
        onPress: () => {
          launchCamera(
            {mediaType: 'photo', cameraType: 'front', quality: 1},
            response => {
              if (
                !response.didCancel &&
                response.assets &&
                response.assets?.length > 0
              ) {
                setProfileImage(response.assets[0]);
              }
            },
          );
        },
      },
      {
        text: 'Upload Image',
        onPress: () => {
          launchImageLibrary({mediaType: 'photo', quality: 1}, response => {
            if (
              !response.didCancel &&
              response.assets &&
              response.assets?.length > 0
            ) {
              setProfileImage(response.assets[0]);
            }
          });
        },
      },
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  // Handle form submission
  const onSubmit = async (data: FormData) => {
    try {
      const response = await dispatch(changePassword(data)).unwrap();
      console.log('change password response in profile:', response);
      if (response.success) {
        reset();
        showAlert('Success', response.message, 'success');
      }
    } catch (error: any) {
      showAlert('Error', error || 'Failed to update password.', 'error');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          await AsyncStorage.removeItem('user');
          console.log('User logged out');
          dispatch(logout());
        },
        style: 'destructive',
      },
    ]);
  };

  // Smooth fade-in effect on mount
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <ScrollView style={styles.container}>
      {/* Profile Card */}
      <Animated.View style={[styles.card, {opacity: fadeAnim}]}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              user?.image?.secureUrl
                ? {uri: user.image.secureUrl}
                : profileImage
                ? {uri: profileImage.uri}
                : require('../../assets/images/default-profile.png')
            }
            style={styles.profileImage}
          />

          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <CameraIcon height={20} width={20} fill="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{user?.userName}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {/* Uploading image  */}
        {uploading && (
          <View style={styles.uploadingIndicator}>
            <Progress.Bar progress={uploadProgress} width={200} />
            <Text style={styles.uploadingText}>
              {Math.round(uploadProgress * 100)}% Uploaded
            </Text>
          </View>
        )}

        {/* Logout Button */}
        <TouchableOpacity onPress={handleLogout} activeOpacity={0.8}>
          <LinearGradient
            colors={['#FF4B2B', '#FF416C']}
            style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>

      {/* Password Change Form */}
      <View style={styles.form}>
        <Text style={styles.label}>Old Password</Text>
        <CustomInput
          control={control as unknown as Control<FieldValues, object>}
          name="oldPassword"
          placeholder="Enter Old Password"
          secureTextEntry
          rules={{required: 'Old password is required'}}
        />

        <Text style={styles.label}>New Password</Text>
        <CustomInput
          control={control as unknown as Control<FieldValues, object>}
          name="newPassword"
          placeholder="Enter New Password"
          secureTextEntry
          rules={{
            required: 'New password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          }}
        />

        <TouchableOpacity onPress={handleSubmit(onSubmit)} activeOpacity={0.8}>
          <LinearGradient
            colors={['#1E90FF', '#4169E1']}
            style={styles.submitButton}>
            <Text style={styles.submitText}>Update Password</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      {/* Custom Alert  */}
      <CustomAlert
        isVisible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onClose={hideAlert}
        type={alertType}
      />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 25,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: '#1E90FF',
  },
  editIcon: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    backgroundColor: '#1E90FF',
    padding: 6,
    borderRadius: 20,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#212121',
  },
  email: {
    fontSize: 15,
    color: 'gray',
    marginBottom: 15,
  },
  logoutButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  logoutText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  form: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  submitButton: {
    marginTop: 15,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  uploadingIndicator: {
    marginTop: 10,
    alignItems: 'center',
  },
  uploadingText: {
    marginTop: 5,
    fontSize: 16,
    color: 'gray',
  },
});

export default ProfileScreen;
