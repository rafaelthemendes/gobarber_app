import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, TextInput, Icon } from './styles';


interface InputProps extends TextInputProps {
  name: string;
  iconName: string;
}

const Input: React.FC<InputProps> = ({ name, iconName, ...textInputProps }) => (
  <Container>
    <Icon name={iconName} size={20} color="#666360" />
    <TextInput
      keyboardAppearance="dark"
      placeholderTextColor="#666360"
      {...textInputProps}
    />
  </Container>
);

export default Input;
