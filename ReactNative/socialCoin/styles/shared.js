import styled from "styled-components/native";
import React from "react";

export const Container = styled.View`
  flex: 1;
  padding: 60px 20px;
  background-color: ${props => props.theme.mainBg};
`;

export const Btn = styled.TouchableOpacity`
  padding: 10px 20px;
  border-width: 1px;
  border-radius: 20px;
  border-color: ${props => props.theme.inputBackground};
`;

export const BtnText = styled.Text`
  color: ${props => props.theme.textColor};
  font-size: 14px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px 20px;
  border-radius: 20px;
  margin-bottom: 10px;
  font-size: 14px;
  color: ${props => props.theme.textColor};
  background-color: ${props => props.theme.inputBackground};
`;
