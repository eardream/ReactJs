import React from "react";
import { FlatList, useColorScheme } from "react-native";
import styled from "styled-components/native";
import VMedia from "./VMedia";

const ListTitle = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
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
      <ListTitle isDark={isDark}>{title}</ListTitle>
      <FlatList
        horizontal
        keyExtractor={(item) => item.id + ""}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={HListSeparator}
        contentContainerStyle={{ paddingHorizontal: 40 }}
        data={data}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            originalTitle={
              item.original_title ? item.original_title : item.original_name
            }
            voteAverage={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
};

export default TvList;
