import styled from 'styled-components/native';

export const DriverCard = styled.TouchableOpacity`
  background-color: #ffffff;
  border: 1px solid #e0e0e0;
  padding: 16px;
  margin-bottom: 16px;
`;

export const DriverName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const PaginationContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 16px;
`;

export const PaginationButton = styled.Button`
  width: 100px;
`;
