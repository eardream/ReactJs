import React from "react";
import {ActivityIndicator, useColorScheme} from "react-native";
import styled from "styled-components/native";
import colors from "../styles/colors";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Loader = () => {
    const isDark = useColorScheme() === "dark"

    return (
        <Wrapper>
            <ActivityIndicator color={isDark ? colors.darkTextColor : colors.lightTextColor} size="large"/>
        </Wrapper>
    )
};

export default Loader;