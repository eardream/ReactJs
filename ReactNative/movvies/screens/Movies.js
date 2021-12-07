import React from 'react';
import styled from "styled-components/native";
import Swiper from "react-native-web-swiper";
import {Dimensions} from "react-native";

const ScrollView = styled.ScrollView`
  background-color: ${props => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;

`;

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Movies = ({navigation: {navigate}}) => (
    <ScrollView>
        <Swiper
            loop={true}
            timeout={3.5}
            controlsEnabled={false}
            containerStyle={{width: "100%", height: SCREEN_HEIGHT / 4}}>
        </Swiper>
    </ScrollView>
);
export default Movies;