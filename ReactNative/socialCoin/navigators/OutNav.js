import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/out/Login";
import Join from "../screens/out/Join";
import {useColorScheme} from "react-native";
import colors from "../styles/colors";

const Nav = createNativeStackNavigator();

const OutNav = () => {
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
            <Nav.Screen name="Login" component={Login} />
            <Nav.Screen name="Join" component={Join} />
        </Nav.Navigator>
    )
};

export default OutNav;