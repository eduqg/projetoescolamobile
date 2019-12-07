import styled from 'styled-components';
import { Dimensions } from 'react-native';

export const Body = styled.View`
  flex: 1;
  background: #ffffff;
  height: ${Dimensions.get('window').height};
  width: ${Dimensions.get('window').width - 60};
  margin-bottom: 40px;
  margin-top: -10px;
  box-shadow: 10px 5px 5px #000;
  border-radius: 8px;
  padding: 20px 0;
  z-index: 999;
`;