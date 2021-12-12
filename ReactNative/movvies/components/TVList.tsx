import React from "react";
import { FlatList, useColorScheme } from "react-native";
import styled from "styled-components/native";
import { Movie, TV } from "../api";
import VMedia from "./VMedia";

const ListTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  font-weight: 600;
  margin-left: 30px;
  margin-bottom: 10px;
  margin-top: 20px;
`;

export const HListSeparator = styled.View`
  width: 20px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

interface HListProps {
  title: string;
  data: any[];
}

const TvList: React.FC<HListProps> = ({ title, data }) => {
  const isDark = useColorScheme() === "dark";

  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        keyExtractor={(item: Movie | TV) => item.id + ""}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{ paddingHorizontal: 40 }}
        data={data}
        renderItem={({ item }: { item: Movie | TV }) => (
          <VMedia
            posterPath={item.poster_path || ""}
            originalTitle={
              "original_title" in item
                ? item.original_title
                : item.original_name
            }
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
};

export default TvList;
