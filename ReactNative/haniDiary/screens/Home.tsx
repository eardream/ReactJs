import React from "react";
import styled from 'styled-components/native';
import {Ionicons} from "@expo/vector-icons";
import colors from "../colors";


const Container = styled.View`
  flex: 1;
  padding: 100px 50px 0px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 28px;
  margin-bottom: 100px;
`;

const Btn = styled.TouchableOpacity`
    position: absolute;
  bottom: 50px;
  right: 50px;
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.2);
`;

const BtnText = styled.Text`
  font-weight: 600;
  color: white;
  
`;

const Home = ({navigation: {navigate}}) => {
    return (
        <Container>
            <Title>Home</Title>
            <Btn onPress={() => navigate("Write")}>
                <Ionicons name="add" color={"white"} size={36}/>
            </Btn>

        </Container>
    );
};

export default Home;