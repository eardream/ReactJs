import Realm from "realm";
import AppLoading from "expo-app-loading";
import {NavigationContainer} from "@react-navigation/native";
import React, {useState} from "react";
import Navigator from "./navigators/navigator";
import FeelingSchema from "./models/FeelingSchema";
import {DBContext} from "./context/context";

export default function App() {
    const [ready, setReady] = useState(false);
    const [realm, setRealm] = useState(null);

    const startLoading = async () => {
        const connection = await Realm.open({
            path: "haniDiaryDB",
            schema: [FeelingSchema],
        });

        setRealm(connection);
        console.log(connection);
    }

    const onFinish = () => setReady(true);

    if (!ready) {
        return <AppLoading startAsync={startLoading} onFinish={onFinish} onError={console.error}/>
    }


    return (
        // realm 연결
        <DBContext.Provider value={realm}>
            <NavigationContainer>
                <Navigator/>
            </NavigationContainer>
        </DBContext.Provider>
    );
}
