import React, { useState } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useInfiniteQuery, useQuery, useQueryClient } from "react-query";
import { tvApi } from "../api";
import Loader from "../components/Loader";
import TvList from "../components/TVList";

const Tv = () => {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const {
    isLoading: todayLoading,
    data: todayData,
    hasNextPage: todayHasNextPage,
    fetchNextPage: todayFetchNextPage,
  } = useInfiniteQuery(["tv", "today"], tvApi.airingToday, {
    getNextPageParam: (current) => {
      const nextPage = current.page + 1;
      return nextPage > current.total_page ? null : nextPage;
    },
  });
  const {
    isLoading: topLoading,
    data: topData,
    hasNextPage: topHasNextPage,
    fetchNextPage: topFetchNextPage,
  } = useInfiniteQuery(["tv", "top"], tvApi.topRated, {
    getNextPageParam: (current) => {
      const nextPage = current.page + 1;
      return nextPage > current.total_page ? null : nextPage;
    },
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    hasNextPage: trendingHasNextPage,
    fetchNextPage: trendingFetchNextPage,
  } = useInfiniteQuery(["tv", "trending"], tvApi.trending, {
    getNextPageParam: (current) => {
      const nextPage = current.page + 1;
      return nextPage > current.total_page ? null : nextPage;
    },
  });

  const onRefreshListener = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(["tv"]);
    setRefreshing(false);
  };

  const loading = todayLoading || topLoading || trendingLoading;

  if (loading) {
    return <Loader />;
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshListener} />
      }
      contentContainerStyle={{ paddingVertical: 30 }}
      overScrollMode={"never"}
    >
      <TvList
        title="Trending Tv"
        data={trendingData.pages.map((page) => page.results).flat()}
        hasNextPage={todayHasNextPage}
        fetchNextPage={todayFetchNextPage}
      />
      <TvList
        title="Airing Today"
        data={todayData.pages.map((page) => page.results).flat()}
        hasNextPage={topHasNextPage}
        fetchNextPage={topFetchNextPage}
      />
      <TvList
        title="🏆 Top Rated"
        data={topData.pages.map((page) => page.results).flat()}
        hasNextPage={trendingHasNextPage}
        fetchNextPage={trendingFetchNextPage}
      />
    </ScrollView>
  );
};

export default Tv;
