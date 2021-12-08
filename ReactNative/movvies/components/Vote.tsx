import React from "react";
import styled from "styled-components/native";
import { useColorScheme } from "react-native";

const Score = styled.Text<{ isDark: boolean }>`
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  margin-top: 5px;
  font-size: 10px;
  font-weight: 600;
  margin-top: 10px;
`;

interface VoteProps {
  average: number;
}

const Vote: React.FC<VoteProps> = ({ average }) => {
  const isDark = useColorScheme() === "dark";

  return average == 0 ? (
    <Score>Coming soon</Score>
  ) : (
    <Score>⭐️ {average}/10</Score>
  );
};

export default Vote;
