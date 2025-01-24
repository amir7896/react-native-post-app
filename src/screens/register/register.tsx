import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomInput from '../../components/CustomInput/customInput';
import CustomButton from '../../components/CustomButton/customButton';
import {register, rest} from '../../features/User/UserSlice';
import {AppDispatch} from '../../app/store';
import {useForm, Control, FieldValues} from 'react-hook-form';
import Toast from 'react-native-toast-message'; // Import the toast library

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegisterScreen: React.FC = () => {
  // For Navigation
  const navigation = useNavigation<any>();

  // For Dispatch Actions
  const dispatch = useDispatch<AppDispatch>();

  const {isLoading, isError, isSuccess, message} = useSelector(
    (state: any) => state.auth,
  );

  console.log('IsLoadding:', isLoading);
  console.log('IsError:', isError);
  console.log('isSuccess:', isSuccess);
  console.log('Message:', message);

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<FormData>();

  // Show error or success toast
  useEffect(() => {
    if (isError) {
      // Show error toast
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: message,
      });
    }

    if (isSuccess) {
      // Show success toast
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Success',
        text2: 'Registration successful!',
      });

      setTimeout(() => {
        navigation.navigate('Login');
      }, 2000); // Delay to give the user time to see the success toast
    }

    // Reset state
    dispatch(rest());
  }, [isError, isSuccess, message, navigation, dispatch]);

  // on Signup Button Pressed
  const onRegisterPressed = async (data: FormData) => {
    dispatch(register(data)); // Trigger the register async action
  };

  const onSignInPress = () => {
    navigation.navigate('Login');
  };

  const onTermsOfUsePressed = () => {
    console.warn('onTermsOfUsePressed');
  };

  const onPrivacyPressed = () => {
    console.warn('onPrivacyPressed');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root} id="form">
        <Text style={styles.title}>Create an account</Text>

        <CustomInput
          name="username"
          control={control as unknown as Control<FieldValues, object>}
          placeholder="Username"
          rules={{
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 24,
              message: 'Username should be max 24 characters long',
            },
          }}
        />
        <CustomInput
          name="email"
          control={control as unknown as Control<FieldValues, object>}
          placeholder="Email"
          rules={{
            required: 'Email is required',
            pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
          }}
        />
        <CustomInput
          name="password"
          control={control as unknown as Control<FieldValues, object>}
          placeholder="Password"
          secureTextEntry
          rules={{
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password should be at least 8 characters long',
            },
          }}
        />

        {/* Loading Indicator */}
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={styles.loader}
          />
        )}

        <CustomButton
          text="Register"
          onPress={handleSubmit(onRegisterPressed)}
        />

        <Text style={styles.text}>
          By registering, you confirm that you accept our
          <Text style={styles.link} onPress={onTermsOfUsePressed}>
            Terms of Use
          </Text>
          and
          <Text style={styles.link} onPress={onPrivacyPressed}>
            Privacy Policy
          </Text>
        </Text>

        <Text style={styles.text}>
          Already have an account?
          <Text style={styles.link} onPress={onSignInPress}>
            Login
          </Text>
        </Text>
      </View>

      {/* Toast component */}
      <Toast />
    </ScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
  loader: {
    marginVertical: 20,
  },
});
