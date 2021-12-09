import React from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { useColorScheme } from "react-native";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";
import { ThemeProvider } from "styled-components";

const queryClient = new QueryClient();

export default function App() {
  const [loaded] = Font.useFonts(Ionicons.font); // 폰트 가져오기
  const [assets] = useAssets([require("./image.jpeg")]); // 이미지 가져오기

  const isDark = useColorScheme() === "dark";

  if (!assets || !loaded) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <NavigationContainer>
          <Root />
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
