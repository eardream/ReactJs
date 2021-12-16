import React, {useEffect, useState} from "react";
import styled from 'styled-components/native';
import {Ionicons} from "@expo/vector-icons";
import colors from "../colors";
import {useDB} from "../context/context";
import {FlatList} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";
import CustomAlert from "../modal/CustomAlert";


const Container = styled.View`
  flex: 1;
  padding: 75px 50px 0px;
  background-color: ${colors.bgColor};
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 28px;
  margin-bottom: 50px;
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
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

const RecordCard = styled.View`
  background-color: ${colors.cardColor};
  flex-direction: row;
  padding: 10px 20px;
  border-radius: 10px;
`;

const Emotion = styled.Text`
  font-size: 18px;
`;

const Message = styled.Text`
  padding-left: 10px;
  font-size: 14px;
  font-weight: 400;
`;

const Separator = styled.View`
  height: 10px;
`

type HomeScreenProps = {
    navigation: any;
};

const Home: React.FC<HomeScreenProps> = ({navigation: {navigate}}) => {
    const realm = useDB();
    const [feelings, setFeelings] = useState([]);

    const [isAlertShow, setAlertShow] = useState(true);
    const [id, setId] = useState(0);

    useEffect(() => {
        const initFeelings = realm.objects("Feeling");

        initFeelings.addListener((feelings: any, changes: any) => {    // 상태가 변경되거나 업데이트, 생성되었을 때 해당 함수가 호출됨
            setFeelings(feelings.sorted("_id", false));     // true -> desc / false -> asc
        });
        return () => {
            initFeelings.removeAllListeners();
        }
    }, []);

    const onPress = (id: number) => {
        setAlertShow(true);
        setId(id);
    }

    const removeItem = (isRemove: boolean) => {
        if (isRemove) {
            realm.write(() => {
                const feeling = realm.objectForPrimaryKey("Feeling", id);
                realm.delete(feeling);
            });
        }
        setId(0);
        setAlertShow(false);
    }


    return (
        <Container>
            <CustomAlert
                displayMsg="삭제하시겠습니까?"
                isVisible={isAlertShow}
                dismissAlert={() => removeItem(false)}
                removeAlert={() => removeItem(true)}
            />
            <Title>My Journal</Title>
            <FlatList
                data={feelings}
                keyExtractor={feeling => feeling._id + ""}
                contentContainerStyle={{paddingVertical: 10}}
                ItemSeparatorComponent={Separator}
                renderItem={({item}) =>
                    <TouchableOpacity onPress={() => onPress(item._id)}>
                        <RecordCard>
                            <Emotion>{item.emotion}</Emotion>
                            <Message>{item.message}</Message>
                        </RecordCard>
                    </TouchableOpacity>
                }/>
            <Btn onPress={() => navigate("Write")}>
                <Ionicons name="add" color={"white"} size={36}/>
            </Btn>

        </Container>
    );
};

export default Home;