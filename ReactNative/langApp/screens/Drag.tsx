import React, {useRef, useState} from "react";
import styled from "styled-components/native";
import colors from "../colors";
import {Ionicons} from "@expo/vector-icons";
import {Animated, Easing, PanResponder, View} from "react-native";
import icons from "../icons";


const Container = styled.View`
  flex: 1;
  background-color: ${colors.offWhite};
  margin-bottom: 60px;
  padding-top: 20px;
`

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const WordContainer = styled(Animated.createAnimatedComponent(View))`
  width: 120px;
  height: 100px;
  justify-content: center;
  align-items: center;
  margin: 0px 10px;
  background-color: ${colors.offWhite};
  border-radius: 15px;
`;

const Word = styled.Text<{ color: string }>`
  font-size: 24px;
  padding: 10px 20px;
  font-weight: 500;
  color: ${props => props.color};
`;

const Center = styled.View`
  flex: 3;
  justify-content: center;
  align-items: center;
  z-index: 10; // 최상단 
`;

const IconCard = styled(Animated.createAnimatedComponent(View))`
  background-color: ${colors.white};
  padding: 15px 20px;
  border-radius: 10px;
`;

const Drag = () => {
    // value
    const opacity = useRef(new Animated.Value(1)).current;
    const scale = useRef(new Animated.Value(1)).current;
    const position = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
    const scaleKnown = position.y.interpolate({
        inputRange: [-300, -80],
        outputRange: [1.2, 1],
        extrapolate: "clamp",
    });
    const scaleUnKnown = position.y.interpolate({
        inputRange: [80, 300],
        outputRange: [1, 1.2],
        extrapolate: "clamp",
    });

    // animation
    const onPressIn = Animated.spring(scale, {toValue: 0.9, useNativeDriver: true});
    const onPressOut = Animated.spring(scale, {toValue: 1, useNativeDriver: true});
    const goHome = Animated.spring(position, {toValue: 0, useNativeDriver: true});

    const onDrop = Animated.timing(scale, {toValue: 0, useNativeDriver: true, easing: Easing.linear, duration: 100});
    const goBack = Animated.timing(position, {toValue: 0, useNativeDriver: true, easing: Easing.linear, duration: 100});
    const onFadeIn = Animated.spring(opacity, {toValue: 1, useNativeDriver: true,});
    const onFadeOut = Animated.timing(opacity, {
        toValue: 0,
        easing: Easing.linear,
        duration: 150,
        useNativeDriver: true
    });
    const onDropScale = Animated.parallel([onFadeOut, onDrop]);

    // pan Responder
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (_, {dx, dy}) => {
            position.setValue({
                x: dx,
                y: dy
            });
        },
        onPanResponderGrant: () => {
            onPressIn.start();
        },
        onPanResponderRelease: (_, {dy}) => {
            if (dy < -200 || dy > 200) {
                // drop know
                Animated.sequence([onDropScale, goBack]).start(nextIcon);
            } else {
                Animated.parallel([onPressOut, goHome]).start();      // 다시 센터로 돌아오게 함 -> 애니메이션을 동시에 처리
            }
        },
    })).current;


    // state
    const [index, setIndex] = useState(0);
    const nextIcon = () => {
        Animated.parallel([onPressOut, onFadeIn]).start();
        setIndex(prev => prev + 1);
    }


    return (
        <Container>
            <Edge>
                <WordContainer style={{
                    transform: [
                        {scale: scaleKnown},
                    ]
                }}>
                    <Word color={colors.green}>Know</Word>
                </WordContainer>
            </Edge>
            <Center>
                <IconCard
                    {...panResponder.panHandlers}
                    style={{
                        opacity: opacity,
                        transform: [
                            ...position.getTranslateTransform(),
                            {scale}
                        ]
                    }}>
                    <Ionicons name={icons[index]} color={colors.lightBlack} size={66}/>
                </IconCard>
            </Center>
            <Edge>
                <WordContainer style={{
                    transform: [
                        {scale: scaleUnKnown},
                    ]
                }}>
                    <Word color={colors.red}>Don't Know</Word>
                </WordContainer>
            </Edge>
        </Container>
    );
};

export default Drag;