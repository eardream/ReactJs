import { Dimensions } from "react-native";
import colors from "./colors";

export const lightTheme = {
  mainBgColor: colors.white,
  reverseBgColor: colors.blackPearl,
  textColor: colors.blackPearl,
};

export const darkTheme = {
  mainBgColor: colors.blackPearl,
  reverseBgColor: colors.white,
  textColor: colors.inactiveDark,
};

export const { height: SCREEN_HEIGHT } = Dimensions.get("window");