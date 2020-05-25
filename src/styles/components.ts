import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const SafeAreaViewStyled = styled.SafeAreaView`
  flex: 1;
`;

export const KeyboardAvoidingViewStyled = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
})`
  flex: 1;
`;
