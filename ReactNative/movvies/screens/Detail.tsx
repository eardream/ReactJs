import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
import React, { useEffect } from "react";
import {
  Alert,
  Linking,
  Platform,
  Share,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { Movie, moviesApi, TV, tvApi } from "../api";
import colors from "../colors";
import Loader from "../components/Loader";
import Poster from "../components/Poster";
import { SCREEN_HEIGHT } from "../styled";
import { makeImgPath } from "../utils";

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
  const isAndroid = Platform.OS === "android";
  const { isLoading, data } = useQuery(
    [isMovie ? "movies" : "tv", params.id],
    isMovie ? moviesApi.detail : tvApi.detail
  );

  const shareMedia = async () => {
    const homepage = isMovie
      ? `https://www.imdb.com/title/${data.imdb_id}/`
      : data.homepage;
    if (isAndroid) {
      await Share.share({
        message: `${params.overview}\nCheck it out: ${homepage}`,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    } else {
      await Share.share({
        url: homepage,
        title:
          "original_title" in params
            ? params.original_title
            : params.original_name,
      });
    }
  };

  const ShareButton = () => (
    <TouchableOpacity onPress={shareMedia}>
      <Ionicons
        name="share-outline"
        color={isDark ? "white" : "dark"}
        size={24}
      />
    </TouchableOpacity>
  );

  const openYTLink = async (videoId: string) => {
    const baseUrl = `http://m.youtube.com/watch?v=${videoId}`;
    if (!isAndroid) await WebBrowser.openBrowserAsync(baseUrl);
    else {
      if (await Linking.canOpenURL(baseUrl)) await Linking.openURL(baseUrl);
      //  intent Web
      else Alert.alert("", "Can't open Link :(");
    }
  };

  useEffect(() => {
    setOptions({
      title: "original_title" in params ? "Movie" : "Tv", // title 변경
    });
  }, []);

  useEffect(() => {
    if (data) {
      // data 가 있을 때에만
      setOptions({
        headerRight: () => <ShareButton />, // data ㄱㅏ 로드되지 않은 상태에서 header 에 param 을 보내지 않아 오류 발생
      });
    }
  }, [data]);

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
