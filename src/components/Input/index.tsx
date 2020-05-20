import { useField } from '@unform/core';
import React, { useEffect, useRef, RefObject } from 'react';
import { TextInputProps, TextInput } from 'react-native';
import { Container, Icon, TextInputStyled } from './styles';

interface InputProps extends TextInputProps {
  name: string;
  iconName: string;
  onInputRef?: (ref: RefObject<TextInput>) => void;
}

interface InputValueReference {
  value: string;
}

const Input: React.FC<InputProps> = ({
  name,
  iconName,
  onInputRef,
  ...textInputProps
}) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<TextInput>(null);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref, value) {
        inputValueRef.current.value = value;
        inputElementRef.current?.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current?.clear();
      },
    });
  }, [fieldName, registerField]);

  useEffect(() => {
    if (onInputRef) {
      onInputRef(inputElementRef);
    }
  }, [inputElementRef]);

  return (
    <Container>
      <Icon name={iconName} size={20} color="#666360" />
      <TextInputStyled
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...textInputProps}
      />
    </Container>
  );
};

export default Input;
