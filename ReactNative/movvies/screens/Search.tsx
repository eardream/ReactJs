import React, { useState } from "react";
import { Alert, useColorScheme, View } from "react-native";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import { moviesApi, tvApi } from "../api";
import colors from "../colors";
import Loader from "../components/Loader";
import TvList from "../components/TVList";

const Scroll = styled.ScrollView`
  height: 90%;
`;

const Container = styled.View``;

const SearchBar = styled.TextInput<{ isDark: boolean }>`
  background-color: ${(props) =>
    props.isDark ? props.theme.reverseBgColor : colors.inactiveDark};
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  font-size: 14px;
  margin: 10px auto;
  margin-bottom: 40px;
`;

const NoResult = styled.Text<{ isDark: boolean }>`
  font-size: 18px;
  margin-top: 100px;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
`;

const Search = () => {
  const isDark = useColorScheme() === "dark";
  const [query, setQuery] = useState("");
  const {
    isLoading: movieLoading,
    data: movieData,
    refetch: searchMovies,
  } = useQuery(["searchMovies", query], moviesApi.search, { enabled: false });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTv,
  } = useQuery(["searchTv", query], tvApi.search, { enabled: false });

  const onSubmit = () => {
    if (query === "") {
      return;
    }
    searchMovies();
    searchTv();
  };

  const onChangeText = (text: string) => setQuery(text);

  const NoResultText = () => (
    <NoResult isDark={isDark}>결과가 없어요 😥</NoResult>
  );

  return (
    <Container>
      <SearchBar
        isDark={isDark}
        placeholder="Search for Movie or Tv Show"
        placeholderTextColor={
          isDark ? colors.inactiveLight : colors.inactiveLight
        }
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
      />
      <Scroll>
        {movieLoading || tvLoading ? <Loader /> : null}
        {movieData ? (
          <TvList title="Movie Results" data={movieData.results} />
        ) : null}
        {tvData ? <TvList title="Tv Results" data={tvData.results} /> : null}
        {!movieData && !tvData ? (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <NoResultText />
          </View>
        ) : null}
      </Scroll>
    </Container>
  );
};

export default Search;
