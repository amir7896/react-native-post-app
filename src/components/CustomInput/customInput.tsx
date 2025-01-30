import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {
  Controller,
  Control,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';

interface CustomInputProps {
  control: Control<FieldValues, object>;
  name: string;
  rules?: RegisterOptions;
  placeholder?: string;
  secureTextEntry?: boolean;
  multiline?: boolean;
  numberOfLines?: number;
}

const CustomInput: React.FC<CustomInputProps> = ({
  control,
  name,
  rules = {},
  placeholder,
  secureTextEntry,
  multiline = false,
  numberOfLines = 4,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <View
            style={[
              styles.container,
              multiline && styles.multilineContainer,
              {borderColor: error ? 'red' : '#e8e8e8'},
            ]}>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder={placeholder}
              style={[styles.input, multiline && styles.multilineInput]}
              secureTextEntry={secureTextEntry}
              multiline={multiline}
              numberOfLines={multiline ? numberOfLines : 1}
              textAlignVertical={multiline ? 'top' : 'center'}
            />
          </View>
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
  },

  input: {
    height: 40,
  },

  // Styles for Multiline Input
  multilineContainer: {
    minHeight: 100,
    paddingVertical: 10,
  },

  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});
