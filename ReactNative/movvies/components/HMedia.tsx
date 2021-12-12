import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useColorScheme } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import styled from "styled-components/native";
import { Movie } from "../api";
import Poster from "./Poster";

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  margin-top: 7px;
  margin-bottom: 5px;
`;

const HMovie = styled.View`
  padding: 0px 40px;
  flex-direction: row;
`;

const HColumn = styled.View`
  margin-left: 15px;
  width: 80%;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  opacity: 0.8;
  width: 80%;
`;

const Release = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 12px;
  margin-vertical: 10px;
`;

interface HMediaProp {
  posterPath: string;
  originalTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
  fullData: Movie;
}

const HMedia: React.FC<HMediaProp> = ({
  posterPath,
  originalTitle,
  releaseDate,
  overview,
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
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{originalTitle}</Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString("ko", {
                year: "numeric",
                month: "narrow",
                day: "numeric",
              })}
            </Release>
          ) : null}
          <Overview>
            {overview != "" && overview.length > 80
              ? `${overview.slice(0, 80)}...`
              : overview}
          </Overview>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
};

export default HMedia;
