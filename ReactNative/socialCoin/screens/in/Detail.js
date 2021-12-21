import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/native";
import {history, info} from "../../api/coinApis";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.mainBg};
`;

const Detail = ({navigation, route: {params: {symbol, id}}}) => {

    useEffect(() => {
        // title
        navigation.setOptions({
            title: symbol,
        });
    }, []);

    const { isLoading: infoLoading, data: infoData } = useQuery(
        ["coinInfo", id],
        info
    );
    const { isLoading: historyLoading, data: historyData } = useQuery(
        ["coinHistory", id],
        history
    );

    const [victoryData, setVictoryData] = useState(null);

    useEffect(() => {
        if (historyData) {
            setVictoryData(
                historyData.map((price) => ({
                    x: new Date(price.timestamp).getTime(),
                    y: price.price,
                }))
            );
        }
    }, [historyData]);


    return (
        <Container>
            {victoryData ? (
                <VictoryChart height={360}>
                    <VictoryLine
                        animate
                        interpolation="monotoneX"
                        data={victoryData}
                        style={{ data: { stroke: "#1abc9c" } }}
                    />
                    <VictoryScatter
                        data={victoryData}
                        style={{ data: { fill: "#1abc9c" } }}
                    />
                </VictoryChart>
            ) : null}
        </Container>
    );
};

export default Detail;