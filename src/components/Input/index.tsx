import { useField } from '@unform/core';
import React, {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TextInput, TextInputProps } from 'react-native';
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
  const { registerField, defaultValue = '', fieldName } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
  const inputElementRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

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
  }, [inputElementRef, onInputRef]);

  return (
    <Container isFocused={isFocused}>
      <Icon
        name={iconName}
        size={20}
        color={isFilled ? '#ff9000' : '#666360'}
      />
      <TextInputStyled
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...textInputProps}
      />
    </Container>
  );
};

export default Input;
