# React Native

    - 왕초보를 위한 React Native 101
    https://nomadcoders.co/react-native-for-beginners

* Expo 를 사용해 React javascript / CSS 단만 연결

### ⚠️ The Rules

* HTML DOM 은 사용할 수 없다.
    - 모든 Text 는 <Text></Text> 컴포넌트 안에 들어가 있어야 한다.

* style object 는 필수가 아니다.
    - Component 안에도 사용 가능
    - Web 에 있는 것을 최대한 가져오려 했지만 사용할 수 없는 것도 꽤 많고 다른 것이 많음

* View 에는 그려져 있지만 화면에 표시가 되지 않는 Component => OS 와 통신하기 위함

<br />

### ⚠️ `Layout Caution`

* 레이아웃에 weight 을 줄 때에는 부모 Component 에 flex 값이 있어야 한다.

```html

<View style={{ flex: 1 }}> // 부모 뷰
    <View style={{ flex: 1, backgroundColor: "tomato"}}>
</View>
<View style={{ flex: 1, backgroundColor: "teal"}}></View>
<View style={{ flex: 1, backgroundColor: "orange"}}></View>
</View>
```

<br />

### 🚨 `Alert`

* 유저에게 기본 알림 UI 를 보일 수 있다.
* OS 내부의 AlertDialog 가 동작하게 되며 Button[] 을 넘길 수 있다.
* Button -> `onPress` 를 사용해 함수를 넘길 수 있다.

<br />

### 💾 기기에 저장할 수 있는 `AsyncStorage`

* AsyncStorage 를 사용해 기기 내부 저장소에 원하는 데이터를 저장할 수 있다
* Preference 와 같은 동작이며 파일명을 명시해 줘야 함
* 기기 용량이 얼마나 남아있고 어떻게 callback 이 올지 모르기 때문에 `async-await` 사용 필수

<br />

### 🌠 `Asset Drawable`

* Icons
    - Library 설치후 Component 추가하면 됨
* Fonts
  ```javascript
  Font.useFont(Ionicons.font);
  ```
    - 위의 방식처럼 가져오면 됨

* Images
    - 내부 저장소 이미지
  ```
  useAsset(require(/*path*/));
  ```

    - Url 불러오기
  ```
  Image.prefetch(imageUrl);
  ```

<br />

### 🖱 `Click Event`

* TouchableOpacity
    * 해당 Component 가 클릭될 때 투명도를 이용해 클릭 여부를 유저가 알 수 있다.
    * 가장 많이 쓰이는 touch event


* TouchableHighlight
    * Component 의 배경색을 이용해 클릭의 범위를 알 수 있다.


* TouchableWithoutFeedback
    * UI Event 없이 동작한다.
    * UI 가 변경되지 않는 것을 원하는 경우 해당 Component 사용


* Pressable
    * 2021.12 월 기준 비교적 최신에 만들어진 Click Event
    * 설정할 수 있는 event 가 많음 (LongPress, disabled)
    * `hitSlop` -> 터치 영역을 바깥쪽으로 더 넓힘

<br />  

### 📺 `Component`

* `View`
    * 기본적인 컴포넌트
    * Layout(View, Linear, Constraint, Relative ... etc) 과 동일하다 보면 됨

* `TextInput`
    * EditText 와 같음
    * 키보드 제약을 걸 수 있음
    * RN 에서 유저가 입력을 할 수 있는 유일한 Component

<br />

### 🌓 `DarkMode`

* 안드로이드, iOS 동일하게 적용이 됨
* elevation 적용됨

```javascript
const isDarkMode = useColorScheme() === "dark";

```

<br />

### 📄 `Drawer Navigation`
* 안드로이드 내부의 Menu 와 동일함
* 제스쳐를 사용할 수 있고 transition 이 가능함

<br />

### ⏱ `Splash` And `App Loading`

* AppIntro 화면처럼 Splash 화면을 만들고 Intro 내부에서 화면의 Component 를 준비할 수 있다.
* AppLoading onFinish={} startAsync={}

```javascript
const [ready, setReady] = useState(false);
const onFinish = () => setReady(true);
const startLoading = async () => {
    const [loaded] = Font.useFonts(Ionicons.font); // 폰트
    const [assets] = useAssets([require("./image.jpeg")]);  // 이미지
    await Promise.all([...loaded, ...assets]);

    // 이외의 소스
}

// 호출 방식
if (ready) {
    <AppLoading
        startAsync={startLoading}
        onFinish={setReady}
        onError={console.error}/>
}
```

<br />

### 📚 `Stack Navigator`

* 화면에서 화면으로 넘어갈 때 화면이 Stack 에 쌓이고 그것을 사용자도 볼 수 있음
* Activity > DetailActivity 의 개념
    * Stack Navigator
        * React Navigation 으로 Javascript 로 만들어짐
        * 일반적인 OS Navigation 과 동일하지만 성능은 떨어질 수 있음

    * Native Stack Navigator
        * Native Api 를 사용해서 만들어짐
        * 동작 자체도 Native 와 동일
        * UIStackNavigator 나 Fragment 를 사용하려면 Native 영역 필수
        * 커스텀할 수 있는 영역이 줄어듬

        ```javascript
        const NativeStack = createNativeStackNavigator();
        
        const Stack = () => (
        <NativeStack.Navigator screenOptions={{
            presentation: "card",   // 화면 전환 방법 
            animation : "fade",     // animation -> 공식문서 참조
            headerBackTitleVisible: false,
            headerTintColor: colors.yellow
        }}>
          
            <NativeStack.Screen name="One" component={ScreenOne}/>
            <NativeStack.Screen name="Two" component={ScreenTwo}/>
            <NativeStack.Screen name="Three" component={ScreenThree} options={{presentation : "modal"}}/>
        </NativeStack.Navigator>
        );
        ```

<br />

### 🧭 `TabLayout`

* 안드로이드의 TabLayout 과 같이 동작하며 아이콘, 텍스트 설정이 가능하다.
* 탭 내부에 스크린을 하나씩 정의한다.
* TitleBar 를 설정할 수 있다.
* 각각의 스크린에서 아이콘 및 theme 를 설정할 수 있다.
* 옆으로 스와이프는 되지 않는다 -> 스와이프는 `Material Tabs Navigator` or `Material Bottom Tabs Navigator`

```javascript

const Tab = createBottomTabNavigator();

const Tabs = () => (
    // screenOption 은 전체 
    <Tab.Navigator screenOptions={{
        tabBarStyle: {
            backgroundColor: "tomato",
            position: "absolute"
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "lightgray",
    }}>
        <Tab.Screen
            name="Movies"
            component={Movies}
            // option 은 스크린 하나 
            options={{
                headerTitleStyle: {color: "tomato"},
                tabBarIcon: ({focused, color, size}) =>
                    (<Ionicons name={focused ? "film" : "film-outline"} size={size} color={color}/>),
                headerRight: () =>
                    <View>
                        <Text>Hello</Text>
                    </View>
            }}/>
        // 위와 같이 새로운 View 를 그릴 수 있다.

        <Tab.Screen name="TV" component={Tv} options={{
            tabBarIcon: ({focused, color, size}) => (
                <Ionicons name={focused ? "ios-tv" : "ios-tv-outline"} size={size} color={color}/>)
        }}/>
        <Tab.Screen name="Search" component={Search} options={{
            tabBarIcon: ({focused, color, size}) => (
                <Ionicons name={focused ? "search" : "search-outline"} size={size} color={color}/>)
        }}/>
    </Tab.Navigator>
);

export default Tabs;

```

<br />

### ⚔️ `TabLayout` 과 `Stack Navigator` 사용 시 Header 및 화면 처리

* Root Container 를 사용해 TabLayout Component 와 Stack Component 를 동시에 View 로 그린다
* 화면 전환에 navigate 함수를 통해 어디로 이동하는지, 어디 화면으로 갈 건지 정의한다.

Root.js

```js
const Nav = createNativeStackNavigator();

const root = () => {
    return (
        <Nav.Navigator screenOptions={{headerShown: false,}}>// header 지정 필요
            <Nav.Screen name="Tabs" component={Tabs}/>
            <Nav.Screen name="Stack" component={Stack}/>
        </Nav.Navigator>
    );
};

export default root;
```

호출 시 사용법(Stack.js)

```js
const ScreenThree = (
    {navigation: {navigate}}) => (      // navigate 참조 필요
    <TouchableOpacity onPress={() => navigate("Tabs", {screen: "Search"})}>     // Stack 화면 내부이기 때문에 Tabs 의 Search 로 이동 
        <Text>Go to Tabs</Text>
    </TouchableOpacity>
);
```

<br />

### 🌗 `ThemeProvider`
* 모든 화면에서 렌터 트리에 colorScheme 를 사용하지 않고 최상위 root 에 선언해 하위 컴포넌트에서도 상속받아 사용할 수 있게 하는 역할

```js
import {ThemeProvider} from "styled-components";

export default function App() {
    const isDark = useColorScheme() === "dark";

    return (
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
            <NavigationContainer>
                <Root/>
            </NavigationContainer>
        </ThemeProvider>
    );
};


// 호출 방법       // props 로 전달받는다.
const Btn = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;
```

<br />

### `3️⃣rd Party Package` and `Api`

* RN Sdk (오픈소스) : <a href="https://reactnative.directory">reactnative.directory</a>
* Expo Sdk : <a href="https://docs.expo.dev/versions/latest/"> docs.expo.dev</a>

<br />

### 🎬 `Others`

* Expo Icon : <a href="https://icons.expo.fyi/">icons.expo.fyi</a>

<br/>
