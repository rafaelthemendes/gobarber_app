import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import { images } from '~/assets';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { InputRef } from '~/components/Input/types';
import {
  KeyboardAvoidingViewStyled,
  SafeAreaViewStyled,
} from '~/styles/components';
import {
  Container,
  CreateAccountButton,
  CreateAccountButtonText,
  ForgotPassword,
  ForgotPasswordText,
  Title,
} from './styles';

const SignIn: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<InputRef>(null);

  const handleSignIn = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <SafeAreaViewStyled>
      <KeyboardAvoidingViewStyled>
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={images.logo} />
            <View>
              <Title>Faça seu logon</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                placeholder="E-mail"
                iconName="mail"
                keyboardType="email-address"
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />
              <Input
                ref={passwordInputRef}
                secureTextEntry
                name="password"
                placeholder="Senha"
                iconName="lock"
                returnKeyType="send"
                onSubmitEditing={() => formRef.current?.submitForm()}
              />
              <Button onPress={() => formRef.current?.submitForm()}>
                Entrar
              </Button>
            </Form>
            <ForgotPassword>
              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
        <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="#ff9000" />
          <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
        </CreateAccountButton>
      </KeyboardAvoidingViewStyled>
    </SafeAreaViewStyled>
  );
};

export default SignIn;
