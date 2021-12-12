import { useNavigation } from "@react-navigation/native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import Poster from "./Poster";
import Vote from "./Vote";

const Container = styled.View`
  align-items: center;
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

interface VMediaProps {
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  fullData: Movie | TV
}

const VMedia: React.FC<VMediaProps> = ({
  posterPath,
  originalTitle,
  voteAverage,
  fullData,
}) => {
  const navigation = useNavigation();

  const goToDetail = () => {
    navigation.navigate("Stack", {
      screen: "Detail",
      params: {
        ...fullData,
      },
    });
  };

  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
        <Title>
          {originalTitle
            ? `${originalTitle.slice(0, 11)}${
                originalTitle.length > 11 ? "..." : ""
              }`
            : null}
        </Title>
        <Vote average={voteAverage} />
      </Container>
    </TouchableOpacity>
  );
};

export default VMedia;
