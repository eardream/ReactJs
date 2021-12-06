import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {Text, TouchableOpacity, useColorScheme} from "react-native";
import colors from "../colors";

const ScreenOne = ({navigation: {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Two")}><Text>go to two</Text></TouchableOpacity>);
const ScreenTwo = ({navigation: {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Three")}><Text>go to three</Text></TouchableOpacity>);
const ScreenThree = ({navigation: {navigate}}) => (
    <TouchableOpacity onPress={() => navigate("Tabs", {screen: "Search"})}><Text>Go To Search</Text></TouchableOpacity>);

const NativeStack = createNativeStackNavigator();

const Stack = () => {
        const isDarkMode = useColorScheme() === "dark";

        return (
            <NativeStack.Navigator screenOptions={{
                presentation: "card",
                headerBackTitleVisible: false,
                headerTintColor: isDarkMode ? colors.yellow : colors.blackPearl,
                headerStyle: {
                    backgroundColor: isDarkMode ? colors.blackPearl : colors.white
                },
                headerTitleStyle: {
                    color: isDarkMode ? colors.white : colors.blackPearl,
                }
            }}>
                <NativeStack.Screen name="One" component={ScreenOne}/>
                <NativeStack.Screen name="Two" component={ScreenTwo}/>
                <NativeStack.Screen name="Three" component={ScreenThree} options={{presentation: "modal"}}/>
            </NativeStack.Navigator>
        )
    }
;

export default Stack;

