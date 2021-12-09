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
import { API_KEY } from "../api";
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

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const Movies = () => {
  const [refreshing, setRefreshing] = useState(false);
  const isDark = useColorScheme() === "dark";

  const onRefresh = async () => {
    // setRefreshing(true);
    // await getData();
    // setRefreshing(false);
  };

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );

  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      releaseDate={item.release_date}
      overview={item.overview}
    />
  );

  const moviewKeyExtractor = (item) => item.id + "";

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
      keyExtractor={moviewKeyExtractor}
      ItemSeparatorComponent={HSeparator}
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
              ItemSeparatorComponent={VSeparator}
              keyExtractor={moviewKeyExtractor}
              data={trending}
              renderItem={renderVMedia}
            />
          </ListContainer>
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      renderItem={renderHMedia}
    />
  );
};
export default Movies;
