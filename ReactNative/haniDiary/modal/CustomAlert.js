import React, {useState} from "react";
import styled from "styled-components";
import {Dimensions, Modal, View} from "react-native";
import colors from "../colors";

const {height: HEIGHT} = Dimensions.get('window');

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.isReady ? colors.transparent: colors.modalBackground};
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.View`
  align-items: center;
  background-color: white;
  height: 30%;
  width: 90%;
  border-radius: 15px;
  elevation: 10;
`;

const MessageContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 3;
`;

const Message = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

const BtnContainer = styled.View`
  flex-direction: row;
  flex: 1;
`;

const Btn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const SuccessBtn = styled(Btn)`
  background-color: ${colors.success};
  border-bottom-left-radius: 15px;
`;

const FailureBtn = styled(Btn)`
  background-color: ${colors.fail};
  border-bottom-right-radius: 15px;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 16px;
`;

const CustomAlert = ({
                         isVisible,
                         dismissAlert,
                         displayMsg,
                         removeAlert,
                     }) => {
    const [isReady, setIsReady] = useState(false);

    return (
        <View>
            <Modal
                visible={isVisible}
                animationType='slide'
                transparent={true}>
                <Container>
                    <ModalContainer>
                        <MessageContainer>
                            <Message>{displayMsg}</Message>
                        </MessageContainer>
                        <BtnContainer onPress={() => dismissAlert(false)}>
                            <SuccessBtn onPress={removeAlert} activeOpacity={0.9}>
                                <BtnText>확인</BtnText>
                            </SuccessBtn>
                            <FailureBtn onPress={dismissAlert} activeOpacity={0.9}>
                                <BtnText>취소</BtnText>
                            </FailureBtn>
                        </BtnContainer>
                    </ModalContainer>
                </Container>
            </Modal>
        </View>
    );
};

export default CustomAlert;