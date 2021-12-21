import React, {useEffect, useState} from 'react';
import auth from "@react-native-firebase/auth";
import {NavigationContainer} from "@react-navigation/native";
import InNav from "./navigators/InNav";
import OutNav from "./navigators/OutNav";
import {dark, light} from "./styles/theme";
import {ThemeProvider} from "styled-components";
import {Appearance, useColorScheme} from "react-native";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient();

export default function App() {

    const [appTheme, setAppTheme] = useState(useColorScheme() === "dark" ? dark : light);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        Appearance.addChangeListener(({colorScheme}) => {
            setAppTheme(Appearance.getColorScheme() === "dark" ? dark : light);
        })
        auth().onAuthStateChanged(user => {
            setIsLogin(user !== null);
        })
    }, []);


    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={appTheme}>
                <NavigationContainer>
                    {isLogin ? <InNav/> : <OutNav/>}
                </NavigationContainer>
            </ThemeProvider>
        </QueryClientProvider>
    );
}
