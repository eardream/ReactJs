import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useAssets } from "expo-asset";
import React from "react";
import { useColorScheme } from "react-native";
import { QueryClient, QueryClientProvider } from "react-query";
import { ThemeProvider } from "styled-components";
import Root from "./navigation/Root";
import { darkTheme, lightTheme } from "./styled";

const queryClient = new QueryClient();

export default function App() {
  const [assets] = useAssets([require("./image.jpeg")]); // 이미지 가져오기

  const isDark = useColorScheme() === "dark";

  if (!assets) {
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
