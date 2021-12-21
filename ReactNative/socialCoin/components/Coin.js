import React, {useEffect, useRef} from "react";
import styled from "styled-components/native";
import {Animated, TouchableOpacity, View} from "react-native";
import {useNavigation} from "@react-navigation/native";

const Wrapper = styled(Animated.createAnimatedComponent(TouchableOpacity))`
  background-color: ${props => props.theme.inputBackground};
  padding: 20px;
  border-radius: 5px;
  align-items: center;
`;
const CoinName = styled.Text`
  color: ${props => props.theme.textColor};
`;

const Icon = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 20px;
  margin-bottom: 10px;
`;

const Coin = ({symbol, id, index}) => {
    const navigation = useNavigation();
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(
            opacity, {
                toValue: 1,
                useNativeDriver: true,
                delay: index * 100,
            }
        ).start();
    }, []);

    const scale = opacity.interpolate({
        inputRange: [0, 1],
        outputRange: [0.7, 1],
    })


    return (
        <Wrapper
            onPress={() => navigation.navigate("Detail", {symbol, id})}
            style={{flex: 0.31, opacity, transform: [{scale}]}}>
            <Icon
                source={{uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`}}/>
            <CoinName>{symbol}</CoinName>
        </Wrapper>
    )
};

export default Coin;