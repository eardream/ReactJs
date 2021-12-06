import React from 'react';
import {View, Text} from "react-native";
import colors from "../colors";

const Search = () => (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
    }}>
        <Text>Search</Text>
    </View>
);

export default Search;