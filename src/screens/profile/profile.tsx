import React, {useState} from 'react';
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
import {Control, FieldValues, useForm} from 'react-hook-form';
import LinearGradient from 'react-native-linear-gradient';
import CustomInput from '../../components/CustomInput/customInput';
import {CameraIcon} from '../../assets/svgs';

interface FormData {
  oldPassword: string;
  newPassword: string;
}

const ProfileScreen = () => {
  const [profileImage, setProfileImage] = useState<Asset | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // Animation for smooth effect

  const {
    control,
    handleSubmit,
    formState: {},
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
  const onSubmit = (data: FormData) => {
    Alert.alert(
      'Password Updated',
      `Old: ${data.oldPassword}\nNew: ${data.newPassword}`,
    );
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
              profileImage
                ? {uri: profileImage.uri}
                : require('../../assets/images/default-profile.png')
            }
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
            <CameraIcon height={20} width={20} fill="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>Amir Shahzad</Text>
        <Text style={styles.email}>amir@email.com</Text>
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
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
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
});

export default ProfileScreen;
