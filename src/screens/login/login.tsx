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
import {login, rest} from '../../features/User/UserSlice';
import {AppDispatch} from '../../app/store';
import {useForm, Control, FieldValues} from 'react-hook-form';
import Toast from 'react-native-toast-message'; // Import the toast library

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

interface FormData {
  email: string;
  password: string;
}

const LoginScreen: React.FC = () => {
  // For Navigation
  const navigation = useNavigation<any>();

  // For Dispatch Actions
  const dispatch = useDispatch<AppDispatch>();

  const {isLoading, isError, isSuccess, message} = useSelector(
    (state: any) => state.auth,
  );

  const {
    control,
    handleSubmit,
    formState: {},
  } = useForm<FormData>();

  // Show error or success toast
  useEffect(() => {
    if (isError) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Error',
        text2: message,
      });
    }

    if (isSuccess) {
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login Success',
        text2: 'Welcome back!',
      });
      // You can navigate to another screen after successful login
      setTimeout(() => {
        navigation.navigate('Home');
      }, 2000);
    }

    dispatch(rest());
  }, [isError, isSuccess, message, navigation, dispatch]);

  // on Login Button Pressed
  const onLoginPressed = async (data: FormData) => {
    dispatch(login(data));
  };

  const onSignUpPress = () => {
    navigation.navigate('Register');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root} id="form">
        <Text style={styles.title}>Login</Text>

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

        <CustomButton text="Login" onPress={handleSubmit(onLoginPressed)} />

        <Text style={styles.text}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={onSignUpPress}>
            Sign up
          </Text>
        </Text>
      </View>

      {/* Toast component */}
      <Toast />
    </ScrollView>
  );
};

export default LoginScreen;

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
