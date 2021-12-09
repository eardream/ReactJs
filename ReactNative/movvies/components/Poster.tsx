import React from "react";
import { useColorScheme } from "react-native";
import styled from "styled-components/native";
import { makeImgPath } from "../utils";

const Image = styled.Image<{ isDark: boolean }>`
  width: 100px;
  height: 160px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.5)" : "rgba(100, 100, 100, 0.5)"};
`;

interface PosterProps {
  path: string;
}

const Poster: React.FC<PosterProps> = ({ path }) => {
  const isDark = useColorScheme() === "dark";

  return <Image isDark={isDark} source={{ uri: makeImgPath(path) }} />;
};

export default Poster;
