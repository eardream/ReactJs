import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Movies from "../screens/Movies";
import Tv from "../screens/Tv";
import Search from "../screens/Search";
import { useColorScheme, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: isDarkMode ? colors.blackPearl : colors.white,
      }}
      screenOptions={{
        unmountOnBlur: true, // 화면 전환마다 메모리를 죽인다 (true) / state 를 유지한다 (false) -> default false
        tabBarStyle: {
          backgroundColor: isDarkMode ? colors.blackPearl : colors.white,
          position: "absolute",
        },
        tabBarActiveTintColor: isDarkMode ? colors.yellow : colors.blackPearl,
        tabBarInactiveTintColor: isDarkMode
          ? colors.inactiveDark
          : colors.inactiveLight,
        headerStyle: {
          backgroundColor: isDarkMode ? colors.blackPearl : colors.white,
        },
        headerTitleStyle: {
          color: isDarkMode ? colors.white : colors.blackPearl,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: -5,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Movies"
        component={Movies}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "film" : "film-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="TV"
        component={Tv}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "ios-tv" : "ios-tv-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
