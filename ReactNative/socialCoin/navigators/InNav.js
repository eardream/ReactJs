import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "../screens/in/Home";
import {useColorScheme} from "react-native";
import colors from "../styles/colors";
import Detail from "../screens/in/Detail";

const Nav = createNativeStackNavigator();

const InNav = () => {
    const isDark = useColorScheme() === "dark";

    return (
        <Nav.Navigator
            screenOptions={{
                presentation: "modal",
                headerTintColor: isDark ? colors.darkTextColor : colors.lightTextColor,
                headerStyle: {
                    backgroundColor: isDark ? colors.darkBackground : colors.lightBackground,
                },
            }}
        >
            <Nav.Screen name="Coin" component={Home}/>
            <Nav.Screen name="Detail" component={Detail}/>
        </Nav.Navigator>
    )
};

export default InNav;