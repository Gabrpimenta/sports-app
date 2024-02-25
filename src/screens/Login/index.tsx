import { View } from 'react-native';
import FootballLogo from '../../assets/svg/footballSVG.svg';
import React from 'react';
import { Text, Button } from 'react-native-paper';
import { ControlledInput } from '../../components/molecules/ControlledInput';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './styles';

type FormProps = {
  username: string;
  password: string;
};

export function LoginScreen() {
  const schema = yup.object().shape({
    username: yup.string().required('required').min(5, 'minimum characters'),
    password: yup.string().required('required'),
  });
  const {
    control,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<FormProps>({
    resolver: yupResolver(schema),
  });
  return (
    <View style={styles.mainContainer}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps='handled'
        bounces
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: 40 }}>
          <FootballLogo style={{ height: 300 }} />
          <Text variant='headlineLarge' style={styles.mainTitle}>
            FOOTBALL STATS
          </Text>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}
        >
          <Text variant='bodyLarge' style={styles.bodyText}>
            Welcome back, we missed you.
          </Text>
          <ControlledInput
            onSubmitEditing={() => setFocus('username')}
            control={control}
            name='username'
            hintError={errors.username?.message}
            hintColor='#FFFFFF'
            placeholder='Username'
            isPassword={true}
          />
          <ControlledInput
            onSubmitEditing={() => setFocus('password')}
            control={control}
            name='password'
            hintError={errors.password?.message}
            hintColor='#FFFFFF'
            placeholder='Password'
            isPassword={true}
          />
          <Button icon='login' mode='contained' style={styles.button}>
            Sign In
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
