import React from "react";
import styled from "styled-components/native";
import colors from "../colors";


const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  margin-bottom: 60px;
`

const Edge = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const WordContainer = styled.View`
`;

const Word = styled.Text`
  font-size: 38px;
  padding: 10px 20px;
  background-color: gray;
  color: ${colors.white};
`;

const Center = styled.View`
  flex: 3;
`;

const Drag = () => {
    return (
        <Container>
            <Edge>
                <Word>Know</Word>
            </Edge>
            <Center/>
            <Edge>
                <Word>Don't Know</Word>
            </Edge>
        </Container>
    );
};

export default Drag;