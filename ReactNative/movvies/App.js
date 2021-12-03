import React from 'react';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {Ionicons} from "@expo/vector-icons";
import {useAssets} from "expo-asset";
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import {Text} from "react-native";

export default function App() {
    const [loaded] = Font.useFonts(Ionicons.font);  // 폰트 가져오기
    const [assets] = useAssets([require("./image.jpeg")]);  // 이미지 가져오기

    if (!assets || !loaded) {
        return (
            <AppLoading/>
        );
    }
    return(
        <NavigationContainer>
            <Tabs/>
        </NavigationContainer>
    );
};
