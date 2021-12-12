import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Linking, StyleSheet, useColorScheme } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, moviesApi, TV, tvApi } from "../api";
import colors from "../colors";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import { SCREEN_HEIGHT } from "../styled";
import { makeImgPath } from "../utils";
import * as WebBrowser from "expo-web-browser";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4};
  justify-content: flex-end;
  padding: 0px 20px;
`;

const Column = styled.View`
  flex-direction: row;
  width: 80%;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 26px;
  align-self: flex-end;
  margin-left: 15px;
  font-weight: 600;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-vertical: 30px;
  font-size: 14px;
`;

const Background = styled.Image``;

const Data = styled.View`
  padding: 0px 20px;
`;

const VideoButton = styled.TouchableOpacity`
  flex-direction: row;
  width: 80%;
`;
const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 600;
  padding-bottom: 10px;
  line-height: 24px;
  font-size: 12px;
  margin-start: 10px;
`;

type RootStackParamList = {
  Detail: Movie | TV; // screenName : params{}
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({
  navigation: { setOptions },
  route: { params },
}) => {
  const isDark = useColorScheme() === "dark";

  const isMovie = "original_title" in params;

  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const openYTLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl); //  intent Web
    await WebBrowser.openBrowserAsync(baseUrl);
  };

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "Tv", // title 변경
    });
  }, []);

  return (
    <Container overScrollMode="never">
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          colors={["transparent", isDark ? colors.blackPearl : colors.white]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>
            {"original_title" in params
              ? params.original_title
              : params.original_name}
          </Title>
        </Column>
      </Header>
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoButton key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons
              name="logo-youtube"
              color={isDark ? "white" : "dark"}
              size={24}
            />
            <BtnText>{video.name}</BtnText>
          </VideoButton>
        ))}
      </Data>
    </Container>
  );
};



export default Detail;
