import React, { useEffect, useState } from 'react';
import {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { Text, TextInput } from 'react-native-paper';

import { styles } from './styles';

export type InputProps = TextInputProps & {
  value?: string;
  onBlur?: ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void) &
    ((args: any) => void);
  onChangeText?: (text: string) => void;
  placeholder?: string;
  isPassword?: boolean;
  hintColor?: string;
  hintError?: string;
  hint?: string;
  render?: () => React.JSX.Element;
};

export function Input({
  value,
  onBlur,
  onChangeText,
  placeholder,
  isPassword,
  hintColor,
  hintError,
  hint,
  render,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(true);

  return (
    <>
      <TextInput
        textColor='#FFFFFF'
        placeholderTextColor='grey'
        underlineColor={hintError ? 'red' : 'purple'}
        activeUnderlineColor={hintError ? 'red' : 'purple'}
        style={[styles.input, { backgroundColor: 'white' }]}
        secureTextEntry={showPassword}
        value={value}
        onBlur={onBlur}
        onChangeText={onChangeText}
        placeholder={placeholder}
        right={
          isPassword &&
          (showPassword ? (
            <TextInput.Icon
              icon='eye-off'
              onPress={() => setShowPassword((prev) => !prev)}
              color={'white'}
            />
          ) : (
            <TextInput.Icon
              icon='eye'
              onPress={() => setShowPassword((prev) => !prev)}
              color={'white'}
            />
          ))
        }
        render={render}
      />
      <Text
        variant='labelMedium'
        style={[styles.hint, { color: hintError ? 'red' : hintColor }]}
      >
        {hintError ?? hint}
      </Text>
    </>
  );
}
