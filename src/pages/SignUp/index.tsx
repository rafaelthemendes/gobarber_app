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
  BackToSignInButton,
  BackToSignInButtonText,
  Container,
  Title,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<InputRef>(null);
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
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={handleSignIn}>
              <Input
                autoCapitalize="words"
                name="name"
                placeholder="Nome"
                iconName="user"
                returnKeyType="next"
                onSubmitEditing={() => emailInputRef.current?.focus()}
              />
              <Input
                ref={emailInputRef}
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                placeholder="E-mail"
                iconName="mail"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
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
          </Container>
        </ScrollView>
        <BackToSignInButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
        </BackToSignInButton>
      </KeyboardAvoidingViewStyled>
    </SafeAreaViewStyled>
  );
};

export default SignUp;
