import React from 'react';
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import {Text} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useAssets} from "expo-asset";

// // 폰트 async 로드
// const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));
//
// // image assets 로드
// const loadImages = (images) => images.map(image => {
//     if (typeof image === "string")
//         return Image.prefetch(image);    // prefetch 이미지 url 로 가져오기
//     else
//         return Asset.loadAsync(image);   //  require -> 내부에 있는 drawable 가져올 때
// })

export default function App() {
    const [loaded] = Font.useFonts(Ionicons.font);  // 위의 방법보다 쉽게 가져올 수 있다.
    const [assets] = useAssets([require("./image.jpeg")]);  // 위의 방법보다 쉽게 가져올 수 있다.

    /*   -> 아래의 splash 방법은 splash 중에 여러가지를 해야 할 경우(통신 같은)에 사용하는 것을 권장
    const [ready, setReady] = useState(false);
    const onFinish = () => setReady(true);
    const startLoading = async () => {
        const [loaded] = Font.useFonts(Ionicons.font);  // 위의 방법보다 쉽게 가져올 수 있다.
        const [assets] = useAssets([require("./image.jpeg")]);  // 위의 방법보다 쉽게 가져올 수 있다.
        await Promise.all([...loaded, ...assets]);

        // 호출 방식
           if(ready) {
           <AppLoading
           startAsync={startLoading}
           onFinish={setReady}
           onError={console.error}/>
           }
     */

    if (!assets || !loaded) {
        return (
            <AppLoading/>
        );
    }
    return (
        <Text>Hani x_x</Text>

    );
}
