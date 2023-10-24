import styled from 'styled-components/native';
import { Text, TextInput, View } from 'react-native';

export const Container = styled(View)`
  padding: 20px;
`;

export const Label = styled(Text)`
  margin-bottom: 8px;
  font-weight: bold;
`;

export const StyledInput = styled(TextInput)`
  border-width: 1px;
  border-color: #ccc;
  padding: 8px;
  margin-bottom: 20px;
  border-radius: 4px;
`;

export const StyledText = styled.Text`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  padding: 5px;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const ErrorText = styled.Text`
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
`;
