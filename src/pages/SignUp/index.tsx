import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import React, { useCallback, useRef } from 'react';
import { Alert, Image, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { images } from '~/assets';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { InputRef } from '~/components/Input/types';
import {
  KeyboardAvoidingViewStyled,
  SafeAreaViewStyled,
} from '~/styles/components';
import getValidationErrors from '~/utils/getValidationErrors';
import {
  BackToSignInButton,
  BackToSignInButtonText,
  Container,
  Title,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const emailInputRef = useRef<InputRef>(null);
  const passwordInputRef = useRef<InputRef>(null);

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('Email obrigatório')
          .email('Email inválido'),
        password: Yup.string()
          .required('Senha obrigatória')
          .min(6, 'Mínimo 6 caracteres'),
      });

      await schema.validate(data, { abortEarly: false });

      // await api.post('users', data);

      Alert.alert('Cadastro efetuado', 'Você já pode fazer seu logon');
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const validationErrors = getValidationErrors(error);
        return formRef.current?.setErrors(validationErrors);
      }

      Alert.alert('Erro no cadastro', 'Verifique seus dados');
    }
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
            <Form ref={formRef} onSubmit={handleSignUp}>
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
