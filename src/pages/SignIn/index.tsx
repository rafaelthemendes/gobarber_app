import React from 'react';
import { Image } from 'react-native';
import { images } from '~/assets';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { Container, Title } from './styles';

const SignIn: React.FC = () => {
  return (
    <Container>
      <Image source={images.logo} />
      <Title>Faça seu logon</Title>
      <Input name="email" placeholder="E-mail" iconName="mail" />
      <Input name="password" placeholder="Senha" iconName="lock" />
      <Button>Entrar</Button>
    </Container>
  );
};

export default SignIn;
