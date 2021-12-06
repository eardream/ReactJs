import React from 'react';
import {View, Text} from "react-native";
import colors from "../colors";

const Tv = () => (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
    }}>
        <Text>Tv</Text>
    </View>
);

export default Tv;