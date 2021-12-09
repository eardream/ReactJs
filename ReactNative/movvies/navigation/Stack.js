import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { useColorScheme } from "react-native";
import colors from "../colors";
import Detail from "../screens/Detail";

const NativeStack = createNativeStackNavigator();

const Stack = () => {
  const isDarkMode = useColorScheme() === "dark";

  return (
    <NativeStack.Navigator
      screenOptions={{
        presentation: "card",
        headerBackTitleVisible: false,
        headerTintColor: isDarkMode ? colors.yellow : colors.blackPearl,
        headerStyle: {
          backgroundColor: isDarkMode ? colors.blackPearl : colors.white,
        },
        headerTitleStyle: {
          color: isDarkMode ? colors.white : colors.blackPearl,
        },
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
};
export default Stack;
