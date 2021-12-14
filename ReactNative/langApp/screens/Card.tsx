import React, {useRef, useState} from "react";
import icons from "../icons";
import colors from "../colors";
import {Ionicons} from "@expo/vector-icons";
import {Animated, PanResponder, StyleSheet} from "react-native";
import styled from "styled-components/native";
import View = Animated.View;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${colors.mainColor};
`;

const CardView = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.white};
  width: 300px;
  height: 300px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.2);
  position: absolute;
`;

const CardContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 3;
`;

const Btn = styled.TouchableOpacity`
  margin: 0px 10px;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;

`;

const Card = () => {
    // Values
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.Value(0)).current;
    const rotation = position.interpolate({
        inputRange: [-250, 250],
        outputRange: ["-15deg", "15deg"],
        extrapolate: "clamp",               // 범위 바깥으로 나갈 경우에 처리
    });
    const secondScale = position.interpolate({
        inputRange: [-300, 0, 300],
        outputRange: [1, 0.7, 1],
        extrapolate: "clamp",

    })

    // Animations
    const onPressOut = Animated.spring(scale, {toValue: 1, useNativeDriver: true,});
    const onPressIn = Animated.spring(scale, {toValue: 0.95, useNativeDriver: true,});
    const goCenter = Animated.spring(position, {toValue: 0, useNativeDriver: true});

    const goLeft = Animated.spring(position, {
        toValue: -500,
        useNativeDriver: true,
        tension: 5,
        restDisplacementThreshold: 150,
        restSpeedThreshold: 100
    });
    const goRight = Animated.spring(position, {
        toValue: 500,
        useNativeDriver: true,
        tension: 5,
        restDisplacementThreshold: 150,
        restSpeedThreshold: 100
    });

    // Pan Responders
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, {dx}) => {
                position.setValue(dx);
            },
            onPanResponderGrant: () => onPressIn.start(),
            onPanResponderRelease: (_, {dx}) => {
                if (dx < -250) {
                    goLeft.start(onDismiss);
                } else if (dx > 250) {
                    goRight.start(onDismiss);
                } else {
                    Animated.parallel([onPressOut, goCenter]).start();      // 다시 센터로 돌아오게 함
                }
            },
        })
    ).current;

    // state
    const [index, setIndex] = useState(0);
    const onDismiss = () => {
        scale.setValue(1);
        position.setValue(0);

        if (icons.length === index + 1)
            setIndex(0);
        else
            setIndex(prev => prev + 1);
    };

    const closePress = () => {
        goLeft.start(onDismiss);
    };
    const checkPress = () => {
        goRight.start(onDismiss);
    };

    return (
        <Container>
            <CardContainer>
                <CardView
                    style={{
                        ...styles.boxShadow,
                        transform: [{scale: secondScale}]
                    }}
                >
                    <Ionicons name={icons[index + 1]} color={colors.textColor} size={98}/>
                </CardView>
                <CardView
                    {...panResponder.panHandlers}
                    style={{
                        ...styles.boxShadow,
                        transform: [
                            {scale},
                            {translateX: position},
                            {rotateZ: rotation},
                        ],
                    }}
                >
                    <Ionicons name={icons[index]} color={colors.textColor} size={98}/>
                </CardView>
            </CardContainer>
            <BtnContainer>
                <Btn onPress={closePress}>
                    <Ionicons name="close-circle" color={colors.white} size={58}/>
                </Btn>
                <Btn onPress={checkPress}>
                    <Ionicons name="checkmark-circle" color={colors.white} size={58}/>
                </Btn>
            </BtnContainer>
        </Container>
    );
}

export default Card;

const styles = StyleSheet.create({
    boxShadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 8,
            height: 16,
        },
        shadowOpacity: 0.2,
        shadowRadius: 7,
        elevation: 12,
    },
});
