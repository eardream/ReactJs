import React, {useEffect, useState} from "react";
import {Dimensions, ScrollView, StyleSheet, Text, View, ActivityIndicator} from "react-native";
import ExpoLocation from "expo-location/src/ExpoLocation";
import {Fontisto} from "@expo/vector-icons";

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const API_KEY = "59cd3e98586487855570833cfc4b83b1";

const icons = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Rain: "rains",
    Atmosphere: "cloudy-gusts",
    Snow: "snowflake",
    Drizzle: "rain",
    Thunderstorm: "lightning"
};

const background = {
    Clouds: "lightgray",
    Clear: "lightblue",
    Rain: "darkgrey",
    Atmosphere: "slategray",
    Snow: "white",
    Drizzle: "gray",
    Thunderstorm: "dimgray"
};

export default function App() {

    const [city, setCity] = useState("Loading...");
    const [days, setDays] = useState([]);       // 날씨 정보
    const setOk = useState(true)[1];

    const getWeather = async () => {
        // permission 먼저 받기
        const {granted} = await ExpoLocation.requestForegroundPermissionsAsync();
        if (granted && !granted) {       // 권한 거부 시
            setOk(false);
            return;
        }

        const {coords: {latitude, longitude}} = await ExpoLocation.getCurrentPositionAsync({accuracy: 5});      // accuracy -> 위치 정보 정확도 1~6
        const location = await ExpoLocation.reverseGeocodeAsync({latitude, longitude})      // 위경도로 주소 변환
        if (location === null) {
            // 권한이 있어도 데이터를 가져오지 못한 경우
            console.log("empty Data :(");
            return;
        }

        setCity(location[0].city);

        // weather data
        const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alert&appid=${API_KEY}&units=metric`);
        const json = await response.json();

        setDays(json.daily);        // data 가 담기기 전까지 progressbar 돌아감
    }

    useEffect(() => {
        getWeather();
    }, []);


    return (
        <ScrollView
            contentContainerStyle={styles.weather}
            horizontal
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            overScrollMode={"never"}
            // indicatorStyle={"white"}     // iOS 에서만 작동
        >
            {days.length === 0 ?
                (<View style={styles.day}>
                    <ActivityIndicator color="black" size="large" style={{marginTop: 10}}/>
                </View>)
                :
                (days.map((day, index) =>
                        <View key={index} style={{...styles.container, backgroundColor: background[day.weather[0].main], alignItems: "baseline"}}>
                            <View style={styles.day}>
                                <View style={styles.vertical}>
                                    <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                                    <Fontisto name={icons[day.weather[0].main]} size={68} color="white"/>
                                </View>
                                <Text style={styles.description}>{day.weather[0].main}</Text>
                                <Text style={styles.tinyText}>{day.weather[0].description}</Text>
                            </View>
                            <View style={styles.city}>
                                <Text style={styles.cityName}>{city}</Text>
                            </View>
                        </View>
                    )
                )
            }
        </ScrollView>);
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "tomato",
        flex: 1,
        alignItems: "center",
    },
    city: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        padding: 20,
    },
    cityName: {
        color: "white",
        fontSize: 28,
        fontWeight: "500",
    },
    weather: {},
    day: {
        flex: 3,
        width: SCREEN_WIDTH,
        alignItems: "stretch",
        padding: 20,
    },
    temp: {
        marginTop: 50,
        fontSize: 95,
        color: "white",
    },
    description: {
        marginTop: -10,
        fontSize: 35,
        color: "white",
    },
    tinyText: {
        fontSize: 18,
        color: 'white',
    },
    vertical: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
    }
});
