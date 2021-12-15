import {StatusBar} from 'expo-status-bar';
import React from 'react';
import styled from "styled-components/native";
import {NavigationContainer} from "@react-navigation/native";
import Navigator from "./navigators/navigator";

const Container = styled.View`
  flex:1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  return (
    <NavigationContainer>
        <Navigator />
    </NavigationContainer>
  );
}
