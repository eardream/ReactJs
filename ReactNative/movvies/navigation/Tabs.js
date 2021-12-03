import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import {useColorScheme} from "react-native";
import colors from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    const isDarkMode = useColorScheme() === "dark";


    return (
        <Tab.Navigator screenOptions={{
            tabBarStyle: {backgroundColor: isDarkMode ? colors.blackPearl : colors.white, position: "absolute"},
            tabBarActiveTintColor: isDarkMode ? colors.yellow : colors.blackPearl,
            tabBarInactiveTintColor: isDarkMode ? colors.inactiveDark : colors.inactiveLight,
            headerStyle: {
                backgroundColor: isDarkMode ? colors.blackPearl : colors.white
            },
            headerTitleStyle: {
                color: isDarkMode ? colors.white : colors.blackPearl,
            }
        }}>
            <Tab.Screen name="Movies" component={Movies}/>
            <Tab.Screen name="Tv" component={Tv}/>
            <Tab.Screen name="Search" component={Search}/>
        </Tab.Navigator>
    )
};

export default Tabs;