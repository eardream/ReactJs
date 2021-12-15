import React, {useState} from "react";
import styled from "styled-components/native";
import colors from "../colors";
import {Alert, Animated, Text} from "react-native";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
`;

const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 15px;
  padding: 5px 10px;
  font-size: 16px;

`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  margin-top: 30px;
  padding: 10px 20px;
  border-radius: 20px;
  align-items: center;
  background-color: ${colors.btnColor};
`;

const BtnText = styled.Text`
  font-weight: 500;
  font-size: 18px;
  color: white;
`;

const Emotions = styled.View`
  flex-direction: row;
  width: 100%;
  margin-bottom: 20px;
  justify-content: space-between;
`;

const Emotion = styled.TouchableOpacity<{isSelected: boolean}>`
  background-color: ${props => props.isSelected ? colors.selected : colors.unSelected};
  border-radius: 10px;
  padding: 8px;
  flex: 1;
  margin: 0px 2px;
  elevation: 5;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const EmotionText = styled.Text`
  font-size: 24px;
`;

const emotions = ["🙂", "🤗", "🤔", "😢", "🥰", "😡", "🤯"];

const Write = () => {
    const [selectedEmotion, setSelectedEmotion] = useState("");
    const [feelings, setFeelings] = useState("");


    const onChangeText = (text: string) => setFeelings(text);
    const onEmotionPress = (face: string) => setSelectedEmotion(face);
    const onSubmit = () => {
        if (feelings.trim() === "" || selectedEmotion === "") {
            Alert.alert("", "Please complete form");
            return;
        }
    };

    return (
        <Container>
            <Title>How do you feel today?</Title>
            <Emotions>
                {emotions.map((emotion, index) => (
                    <Emotion key={index} isSelected={emotion === selectedEmotion} onPress={() => onEmotionPress(emotion)}>
                        <EmotionText>
                            {emotion}
                        </EmotionText>
                    </Emotion>
                ))}
            </Emotions>
            <TextInput placeholder="Write your feelings..." value={feelings} onChangeText={onChangeText}
                       onSubmitEditing={onSubmit} returnKeyType="done" returnKeyLabel="done"/>
            <Btn onPress={onSubmit}><BtnText>Save</BtnText></Btn>
        </Container>
    );
};

export default Write;