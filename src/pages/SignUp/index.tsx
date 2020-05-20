import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { images } from '~/assets';
import Button from '~/components/Button';
import Input from '~/components/Input';
import {
  BackToSignInButton,
  BackToSignInButtonText,
  Container,
  Title,
} from './styles';

const SignUp: React.FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Image source={images.logo} />
            <View>
              <Title>Crie sua conta</Title>
            </View>
            <Input name="name" placeholder="Nome" iconName="user" />
            <Input name="email" placeholder="E-mail" iconName="mail" />
            <Input name="password" placeholder="Senha" iconName="lock" />
            <Button>Entrar</Button>
          </Container>
        </ScrollView>
        <BackToSignInButton onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#fff" />
          <BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
        </BackToSignInButton>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;
