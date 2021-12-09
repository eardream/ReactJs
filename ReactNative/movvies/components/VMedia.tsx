import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import colors from "../colors";
import Poster from "./Poster";
import Vote from "./Vote";

const Movie = styled.View`
  align-items: center;
`;

const Title = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : colors.blackPearl)};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
}) => {
  const navigation = useNavigation();
  const isDark = useColorScheme() === "dark";

  const goToDetail = () => {
    navigation.navigate("Stack", { screen: "Detail" });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
        <Title isDark={isDark}>
          {originalTitle
            ? `${originalTitle.slice(0, 11)}${
                originalTitle.length > 11 ? "..." : ""
              }`
            : null}
        </Title>
        <Vote average={voteAverage} />
      </Movie>
    </TouchableOpacity>
  );
};

export default VMedia;
