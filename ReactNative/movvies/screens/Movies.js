import React from 'react';
import {View, Text} from "react-native";
import colors from "../colors";

const Movies = () => (
    <View style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.white,
    }}>
        <Text>Movie</Text>
    </View>
);

export default Movies;