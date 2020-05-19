import React from 'react';
import { Container, ButtonText } from './styles';
import { RectButtonProperties } from 'react-native-gesture-handler';

interface ButtonProps extends RectButtonProperties {
  children: string;
}

const Button: React.FC<ButtonProps> = ({ children, ...rectButtonProps }) => (
  <Container {...rectButtonProps}>
    <ButtonText>{children}</ButtonText>
  </Container>
);

export default Button;
