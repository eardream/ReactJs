import React, {useEffect, useState} from "react";
import styled from "styled-components/native";
import {useQuery} from "react-query";
import {coins} from "../../api/coinApis";
import Loader from "../../components/Load";
import {FlatList, View} from "react-native";
import Coin from "../../components/Coin";

const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.mainBg};
`;

const List = styled.FlatList`
  padding: 20px 10px;
  width: 100%;
`;

const Home = () => {

    const {isLoading, data} = useQuery("coins", coins);
    const [cleanData, setCleanData] = useState([]);

    useEffect(() => {
        if (data)
            setCleanData(data.filter((coin) => coin.rank !== 0 && coin.is_active && !coin.is_new));
    }, [data]);

    if (isLoading) {
        return <Loader/>
    }

    return (
        <Container>
            <List
                data={cleanData}
                numColumns={3}
                ItemSeparatorComponent={() => <View style={{height: 10}}/>}
                keyExtractor={item => item.id}
                overScrollMode={"never"}
                columnWrapperStyle={{
                    justifyContent: "space-between"
                }}
                renderItem={({item, index}) =>
                    (
                        <Coin symbol={item.symbol} id={item.id} index={index}/>
                    )}
            />
        </Container>
    );
};

export default Home;