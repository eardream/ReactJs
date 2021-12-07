import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import Swiper from "react-native-swiper";
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { API_KEY } from "../apis";
import colors from "../colors";
import { BlurView } from "expo-blur";
import { makeImgPath } from "../utils";

const ScrollView = styled.ScrollView``;

const View = styled.View`
  flex: 1;
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
`;

const Poster = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 10px;
`;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 700;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const Column = styled.View`
  margin-left: 15px;
  width: 40%;
`;

const OverView = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const Votes = styled(OverView)`
  margin-top: 5px;
  font-size: 12px;
  font-weight: 800;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies = ({ navigation: { navigate } }) => {
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);

  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  useEffect(() => {
    getNowPlaying();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator color={colors.inactiveDark} />
    </Loader>
  ) : (
    <ScrollView>
      <Swiper
        horizontal
        autoplay={true}
        autoplayTimeout={3.5}
        showButtons={false}
        showsPagination={false}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        {nowPlaying.map((movie) => (
          <View key={movie.id}>
            <BgImg
              style={StyleSheet.absoluteFill}
              source={{ uri: makeImgPath(movie.backdrop_path) }}
            />
            <BlurView
              tint={isDark ? "dark" : "light"}
              intensity={80}
              style={StyleSheet.absoluteFill}
            >
              <Wrapper>
                <Poster source={{ uri: makeImgPath(movie.poster_path) }} />
                <Column>
                  <Title>{movie.original_title}</Title>
                  {movie.vote_average > 0 ? (
                    <Votes>⭐️ {movie.vote_average}/10</Votes>
                  ) : null}
                  <OverView>{movie.overview.slice(0, 50)}...</OverView>
                </Column>
              </Wrapper>
            </BlurView>
          </View>
        ))}
      </Swiper>
    </ScrollView>
  );
};
export default Movies;
