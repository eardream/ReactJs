import React, { useRef } from "react";
import { Animated, Dimensions, PanResponder } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Box = styled.View`
  background-color: "rgb(125, 154, 255)";
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const POSITION = useRef(
    new Animated.ValueXY({
      x: 0,
      y: 0,
    })
  ).current;
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });

  // animation listener
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      // 터치 중에 시작
      onPanResponderMove: (_, { dx, dy }) => {
        // position 의 위치를 변경해 드래그가 되게 한다.
        POSITION.setValue({
          x: dx,
          y: dy,
        });
      },
      // 터치가 끝났을 때 시작
      onPanResponderRelease: () => {
        // offset 을 전달하면서 이후에는 0으로 초기화
        POSITION.flattenOffset();
      },
      // 터치가 시작될 때 시작
      onPanResponderGrant: () => {
        // 사용자 손가락 위치를 0으로 초기화되지 않게 하기 위함
        POSITION.setOffset({
          x: POSITION.x._value,
          y: POSITION.y._value,
        });
      },
    })
  ).current;

  return (
    <Container>
      <AnimatedBox
        {...panResponder.panHandlers}
        style={{
          borderRadius,
          backgroundColor: bgColor,
          transform: POSITION.getTranslateTransform(),
        }}
      />
    </Container>
  );
}
