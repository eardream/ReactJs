import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  useColorScheme,
  View,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import { API_KEY } from "../apis";
import colors from "../colors";
import HMedia from "../components/HMedia";
import Slide from "../components/Slides";
import VMedia from "../components/VMedia";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView``;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ListTitle = styled.Text`
  color: ${(props) => (props.isDark ? "white" : colors.blackPearl)};
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 30px;
`;

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
  const isDark = useColorScheme() === "dark";
  const [loading, setLoading] = useState(true);

  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);

  // 트랜딩 가져오기
  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };

  // 개봉 예정작 가져오기
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();
    setUpComing(results);
  };

  // 현재 상영 중인 영화
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();
    setNowPlaying(results);
    setLoading(false);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    console.log(`Trend : ${trending}`);
    console.log(`upComing : ${upComing}`);
    console.log(`nowPlaying : ${nowPlaying}`);

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };

  return loading ? (
    <Loader>
      <ActivityIndicator color={colors.inactiveDark} />
    </Loader>
  ) : (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upComing}
      style={{ marginBottom: 50 }}
      keyExtractor={(item) => item.id + ""}
      ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            autoplay={true}
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              width: "100%",
              height: SCREEN_HEIGHT / 4,
              marginBottom: 30,
            }}
          >
            {nowPlaying.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path}
                posterPath={movie.poster_path}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          <ListTitle isDark={isDark}>Trending Movies</ListTitle>
          <ListContainer>
            <TrendingScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 40 }}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
              keyExtractor={(item) => item.id + ""}
              data={trending}
              renderItem={({ item }) => (
                <VMedia
                  posterPath={item.poster_path}
                  originalTitle={item.original_title}
                  voteAverage={item.vote_average}
                />
              )}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      renderItem={({ item }) => (
        <HMedia
          posterPath={item.poster_path}
          originalTitle={item.original_title}
          releaseDate={item.release_date}
          overview={item.overview}
        />
      )}
    />
  );
};
export default Movies;
