import { useField } from '@unform/core';
import React, {
  MutableRefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { TextInput, TextInputProps } from 'react-native';
import { Container, Icon, TextInputStyled } from './styles';
import { InputRef } from './types';

interface InputProps extends TextInputProps {
  name: string;
  iconName: string;
  onInputRef?: MutableRefObject<TextInput | undefined>;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
  { name, iconName, ...textInputProps },
  forwardedRef,
) => {
  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputRef = useRef<TextInput>(null);
  const inputValueRef = useRef<{
    value: string;
  }>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(_, value) {
        inputRef.current?.setNativeProps({ text: value });
        inputValueRef.current.value = value;
      },
      clearValue() {
        inputRef.current?.clear();
        inputValueRef.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  useImperativeHandle(forwardedRef, () => ({
    focus() {
      inputRef.current?.focus();
    },
  }));

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  return (
    <Container isFocused={isFocused} hasError={!!error}>
      <Icon
        name={iconName}
        size={20}
        color={isFilled ? '#ff9000' : '#666360'}
      />
      <TextInputStyled
        ref={inputRef}
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

export default React.forwardRef(Input);
