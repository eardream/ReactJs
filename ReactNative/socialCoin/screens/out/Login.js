import React, {useRef, useState} from "react";
import styled from "styled-components/native";
import {Container, BtnText, Btn, TextInput} from "../../styles/shared";
import colors from "../../styles/colors";
import {ActivityIndicator, Alert, useColorScheme} from "react-native";
import auth from "@react-native-firebase/auth";
import UserInput from "../../components/UserInput";

const Wrapper = styled.View`
  margin-top: 60px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 14px;
  text-align: center;
  color: ${props => props.theme.textColor};
`;

const Login = ({ navigation: { navigate } }) => {
    return (
        <Container>
            <UserInput isLogin={true}/>
            <Wrapper>
                <Text>Don't have an account? {"   "}</Text>
                <Btn onPress={() => navigate("Join")}>
                    <BtnText>Join &rarr;</BtnText>
                </Btn>
            </Wrapper>
        </Container>
    );
}
export default Login;