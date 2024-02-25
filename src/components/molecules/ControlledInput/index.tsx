import React from 'react';
import { Controller } from 'react-hook-form';
import { Input, InputProps } from '../../atoms/Input';

export type ControllerInputProps = InputProps & {
  control: any;
  name: string;
  isPassword?: boolean;
};

export function ControlledInput({
  control,
  name,
  isPassword,
  ...rest
}: ControllerInputProps) {
  return (
    <Controller
      control={control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input
          value={value}
          onBlur={onBlur}
          onChangeText={onChange}
          isPassword={isPassword}
          {...rest}
        />
      )}
      name={name}
    />
  );
}
