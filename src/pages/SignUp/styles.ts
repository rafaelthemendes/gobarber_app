import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin: 30px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: RobotoSlab-Medium;
  margin: 64px 0 24px;
`;

export const BackToSignInButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 16px 0;
  border-top-width: 1px;
  border-color: #232129;
`;

export const BackToSignInButtonText = styled.Text`
  margin-left: 16px;
  color: #fff;
  font-size: 16px;
  font-family: RobotoSlab-Regular;
`;
