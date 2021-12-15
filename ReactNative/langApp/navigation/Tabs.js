import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import colors from "../colors";
import Card from "../screens/Card";
import {Ionicons} from "@expo/vector-icons";
import Drag from "../screens/Drag";

const Tab = createBottomTabNavigator();

const Tabs = () => {
    return (
        <Tab.Navigator
            initialRouteName="Drag"
            sceneContainerStyle={{
                backgroundColor: colors.white,
            }}
            screenOptions={{
                unmountOnBlur: true, // 화면 전환마다 메모리를 죽인다 (true) / state 를 유지한다 (false) -> default false
                tabBarStyle: {
                    backgroundColor: colors.mainColor,
                    position: "absolute",
                },
                tabBarActiveTintColor: colors.white,
                tabBarInactiveTintColor: colors.textColor,
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: -5,
                    fontWeight: "600",
                },
            }}>

            <Tab.Screen name="Card" component={Card} options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons
                        name={focused ? "card" : "card-outline"}
                        size={size}
                        color={color}
                    />
                ),
            }}
            />
            <Tab.Screen name="Drag" component={Drag} options={{
                tabBarIcon: ({focused, color, size}) => (
                    <Ionicons
                        name={focused ? "hand-right" : "hand-right-outline"}
                        size={size}
                        color={color}
                    />
                ),
            }}
            />
        </Tab.Navigator>
    )
};

export default Tabs;