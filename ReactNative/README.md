# React Native

```
- 왕초보를 위한 React Native 101
https://nomadcoders.co/react-native-for-beginners
```

- Expo 를 사용해 React javascript / CSS 단만 연결

### ⚠️ The Rules

- HTML DOM 은 사용할 수 없다.

  - 모든 Text 는 컴포넌트 안에 들어가 있어야 한다.

- style object 는 필수가 아니다.

  - Component 안에도 사용 가능
  - Web 에 있는 것을 최대한 가져오려 했지만 사용할 수 없는 것도 꽤 많고 다른 것이 많음

- View 에는 그려져 있지만 화면에 표시가 되지 않는 Component => OS 와 통신하기 위함

- Native 요소에 가까운 것을 설치했을 경우 `npx run 'platform'` 을 다시해 줘야 함

- npm install 이 안 될 경우 `--save --legacy-peer-deps` 를 명령문 뒤에 붙여서 설치

- `Pod Min Target 이 안 맞을 경우에는 pod 라이브러리 확인 후 ios 폴더 내부에서 pod update && pod install`
  <br />

### ⚠️ `Layout Caution`

- 레이아웃에 weight 을 줄 때에는 부모 Component 에 flex 값이 있어야 한다.

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

- 유저에게 기본 알림 UI 를 보일 수 있다.
- OS 내부의 AlertDialog 가 동작하게 되며 Button[] 을 넘길 수 있다.
- Button -> `onPress` 를 사용해 함수를 넘길 수 있다.
  <br />

### 🤣 `Animation`

- Rules of Animation

  - Animation 에 대한 value 값은 state 에서 지정할 수 없다.
  - value 는 직접 수정할 수 없다.
  - `Animatable Component` 안에서만 animation 동작이 가능하다

- Animation 의 종류

  - Decay -> 시작속도 ⬆️ 종료속도 ⬇️
  - Spring -> Bouncy
  - `Timing` -> 가장 보편적으로 사용됨, easing 을 사용해 다양한 옵션 설정 가능
  - Interpolation -> value 값이 변화함에 따라 해당 옵션을 변경할 수 있다.

- Threshold 를 사용해서 애니메이션을 보다 더 빠르게 동작할 수 있다.
  - restSpeedThreshold -> 애니메이션이 끝난 것으로 간주하는 속도
  - restDisplacementThreshold -> 애니메이션이 끝난 것으로 간주하는 거리

```js
const position =
    useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;

  const moveUp = () => {
    Animated.timing(position.y, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,

      duration: 1000,
    }).start(toggleUp);
  };

  // y 값의 변경에 따라 box 의 style value를 interpolate 를 사용해 조절
  const borderRadius = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 10],
  });

  const rotation = position.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["-360deg", "360deg"],
  });

// interpolation 사용법
style={{
    borderRadius: borderRadius,
    transform: [
        { rotateZ: rotation },
        { translateY: position.y }
    ],
}}

```

<br />

### 💾 기기에 저장할 수 있는 `AsyncStorage`

- AsyncStorage 를 사용해 기기 내부 저장소에 원하는 데이터를 저장할 수 있다
- Preference 와 같은 동작이며 파일명을 명시해 줘야 함
- 기기 용량이 얼마나 남아있고 어떻게 callback 이 올지 모르기 때문에 `async-await` 사용 필수
  <br />

### 🌠 `Asset Drawable`

- Icons
  - Library 설치후 Component 추가하면 됨
- Fonts

```javascript
Font.useFont(Ionicons.font);
```

- Images
  - 내부 저장소 이미지

```
useAsset(require(/*path*/));
```

- Url 불러오기

```
Image.prefetch(imageUrl);
```

<br />

### 🌫 `BlurView`

- View 를 blur 처리 할 수 있다.
- ❗️ 단 블러를 주고 싶지 않은 영역은 BlurView 내부에 작성해야 한다.
  <br />

### 🖱 `Click Event`

- TouchableOpacity
  _ 해당 Component 가 클릭될 때 투명도를 이용해 클릭 여부를 유저가 알 수 있다.
  _ 가장 많이 쓰이는 touch event
  <br />
- TouchableHighlight \* Component 의 배경색을 이용해 클릭의 범위를 알 수 있다.
  <br />
- TouchableWithoutFeedback
  _ UI Event 없이 동작한다.
  _ UI 가 변경되지 않는 것을 원하는 경우 해당 Component 사용
  <br />
- Pressable
  _ 2021.12 월 기준 비교적 최신에 만들어진 Click Event
  _ 설정할 수 있는 event 가 많음 (LongPress, disabled) \* `hitSlop` -> 터치 영역을 바깥쪽으로 더 넓힘
  <br />

### 📺 `Component`

- `View`

  - 기본적인 컴포넌트
  - Layout(View, Linear, Constraint, Relative ... etc) 과 동일하다 보면 됨

- `TextInput`
  _ EditText 와 같음
  _ 키보드 제약을 걸 수 있음 \* RN 에서 유저가 입력을 할 수 있는 유일한 Component
  <br />

### 🪝 `Context Hook`

- useContext
- setValue & Shared with other Component

<br />

### 🌓 `DarkMode`

- 안드로이드, iOS 동일하게 적용이 됨
- elevation 적용됨

```javascript
const isDarkMode = useColorScheme() === "dark";
```

<br />

### 📄 `Drawer Navigation`

- 안드로이드 내부의 Menu 와 동일함
- 제스쳐를 사용할 수 있고 transition 이 가능함
  <br />

### 🙈 `Layout Animation`

- List ㄷㅡㅇ에 fadeIn&Out, Spring 등의 처리를 해 유연한 Layout 을 보임
- Android 내에서는 enable 처리를 필수로 해줘야 함

```js
if (Platform.OS-- - "android" && UIManager.setLayoutAnimationEnableExperimental)
  UIManager.setLayoutAnimationEnableExperimental(true);

// state 가 변경될 때 List 내에서 애니메이션 처리
LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
```

<br />

### 🔗 `Linking` And `WebBrowser`

- RN 에서 웹 페이지를 열 수 있다.
- Linking 은 딥링크로도 앱을 열수 있고 canOpenURL 로 확인 후 열 수 있음
- WebBrowser 는 Android 에서 잘 먹지 않음

```js
const baseUrl = `https://hanix-x.tistory.com`;

// linking
if (await Linking.canOpenURL(baseUrl)) await Linking.openURL(baseUrl);

// webbrowser
await WebBrowser.openBrowserAsync(baseUrl);
```

<br />

### ∞ `Infinite Scroll`

- 무한 스크롤은 작성을 해줘야 하는 것이 많다.
- `useInfiniteQuery ` 사용

```javascript
 const {
    isLoading,
    data,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    ["topic", "token"],
    api.getData,
    {
      getNextPageParam: (currentPage) => {	// 다음 페이지부터 파라미터 추가
        const nextPage = currentPage.page + 1;
        return nextPage > currentPage.total_pages ?
                null : nextPage; // 페이지 수 비교
      },
    }
  );

// 호출 시 콜 할 함수
const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };


// 호출 시
<FlatList
    onEndReached={loadMore}
// 중첩 배열이기 때문에 아래의 방식을 사용해 단일 배열로 만들어야 함
	data={upcomingData.pages.map((page) => page.results).flat()}
 ... />

```

<br />

### 🤞 `PanResponder` - <a href="https://reactnative.dev/docs/panresponder"> 공식문서 </a>

- 터치 리스너 등을 선언할 수 있다.
- useRef() 와 함께 선언

<br />

### 💽 `Realm`

- MongoDB 사용
- Expo Cli 위에서는 돌아가지 않음
- NoSql

<br />

### ⏱ `Splash` And `App Loading`

- AppIntro 화면처럼 Splash 화면을 만들고 Intro 내부에서 화면의 Component 를 준비할 수 있다.
- AppLoading onFinish={} startAsync={}

```javascript
const [ready, setReady] = useState(false);
const onFinish = () => setReady(true);
const startLoading = async () => {
  const [loaded] = Font.useFonts(Ionicons.font); // 폰트
  const [assets] = useAssets([require("./image.jpeg")]); // 이미지
  await Promise.all([...loaded, ...assets]);

  // 이외의 소스
};

// 호출 방식
if (ready) {
  <AppLoading
    startAsync={startLoading}
    onFinish={setReady}
    onError={console.error}
  />;
}
```

<br />

### 📜 `ScrollView` and `FlatList`

- 안드로이드 내의 ScrollView 라고 볼 수 있다.

- horizontal, vertical 을 지정할 수 있다.

- `refreshControl` 을 사용해 refreshLayout 을 생성할 수 있다.

- Scrollview 는 모든 Component 가 한 번에 렌더링된다는 단점이 있다. 그래서 사용하게 되는 게 `FlatList`

- FlatList 는 컴포넌트가 보이기 직전에 사용된다 [FlatList · React Native](https://reactnative.dev/docs/flatlist)

- FlatList 도 ScrollView 와 비슷하나 renderItem 과 data 가 필수로 필요하다.

- Component 하위에 작성하는 게 아닌 renderItem 내부에 작성하는 것이 특징

```html
// 스크롤뷰 작성법
<ScrollView
            refreshControl={
            	<RefreshControl refresh={isRefresh} onRefresh={onRefreshListener}/>
            }
>
	{itemList.map((item) => /* anything */ }

</ScrollView>
```

```html
// Flat List 작성법 <FlatList horizontal showsHorizontalScrollIndicator={false}
contentContainerStyle={{ paddingHorizontal: 40 }}
ItemSeparatorComponent={VSeparator} keyExtractor={moviewKeyExtractor}
data={trending} //각각의 item 이 됨 renderItem={renderVMedia} // 이 부분에
하위에 랜더링하고 싶은 아이템을 작성한다. />
```

<br />

### 💅 `Styled Component`

- 일반적인 css 를 react-native 코드로 변경해 준다.

- 첫 철자는 대문자로 작성해야 한다.

- View, Text, Image... 등등 선언해야 할 것을 생략해 준다.
  <br />

### 👌 `Swipe` - <a href="https://github.com/leecade/react-native-swiper">공식문서</a>

- Web 버전과 native 버전으로 나뉜다

- 안드로이드의 ViewPager 와 방식이 비슷하다.

- Paginate, Button 컨트롤 등등이 가능하다.
  <br />

### 📚 `Stack Navigator`

- 화면에서 화면으로 넘어갈 때 화면이 Stack 에 쌓이고 그것을 사용자도 볼 수 있음
- Activity > DetailActivity 의 개념

  - Stack Navigator

    - React Navigation 으로 Javascript 로 만들어짐
    - 일반적인 OS Navigation 과 동일하지만 성능은 떨어질 수 있음

  - Native Stack Navigator
    - Native Api 를 사용해서 만들어짐
    - 동작 자체도 Native 와 동일
    - UIStackNavigator 나 Fragment 를 사용하려면 Native 영역 필수
    - 커스텀할 수 있는 영역이 줄어듬

```javascript
const NativeStack = createNativeStackNavigator();

const Stack = () => (
  <NativeStack.Navigator
    screenOptions={{
      presentation: "card", // 화면 전환 방법
      animation: "fade", // animation -> 공식문서 참조
      headerBackTitleVisible: false,
      headerTintColor: colors.yellow,
    }}
  >
    <NativeStack.Screen name="One" component={ScreenOne} />
    <NativeStack.Screen name="Two" component={ScreenTwo} />
    <NativeStack.Screen
      name="Three"
      component={ScreenThree}
      options={{ presentation: "modal" }}
    />
  </NativeStack.Navigator>
);
```

<br />

### 🧭 `TabLayout`

- 안드로이드의 TabLayout 과 같이 동작하며 아이콘, 텍스트 설정이 가능하다.
- 탭 내부에 스크린을 하나씩 정의한다.
- TitleBar 를 설정할 수 있다.
- 각각의 스크린에서 아이콘 및 theme 를 설정할 수 있다.
- 옆으로 스와이프는 되지 않는다 -> 스와이프는 `Material Tabs Navigator` or `Material Bottom Tabs Navigator`

```javascript
const Tab = createBottomTabNavigator();

const Tabs = () => (
  // screenOption 은 전체
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: "tomato",
        position: "absolute",
      },
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "lightgray",
    }}
  >
    <Tab.Screen
      name="Movies"
      component={Movies}
      // option 은 스크린 하나
      options={{
        headerTitleStyle: { color: "tomato" },
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "film" : "film-outline"}
            size={size}
            color={color}
          />
        ),
        headerRight: () => (
          <View>
            <Text>Hello</Text>
          </View>
        ),
      }}
    />
    // 위와 같이 새로운 View 를 그릴 수 있다.
    <Tab.Screen
      name="TV"
      component={Tv}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "ios-tv" : "ios-tv-outline"}
            size={size}
            color={color}
          />
        ),
      }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={focused ? "search" : "search-outline"}
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);

export default Tabs;
```

<br />

### ⚔️ `TabLayout` 과 `Stack Navigator` 사용 시 Header 및 화면 처리

- Root Container 를 사용해 TabLayout Component 와 Stack Component 를 동시에 View 로 그린다
- 화면 전환에 navigate 함수를 통해 어디로 이동하는지, 어디 화면으로 갈 건지 정의한다.

Root.js

```js
const Nav = createNativeStackNavigator();

const root = () => {
  return (
    // header 지정 필요
    <Nav.Navigator screenOptions={{ headerShown: false }}>
      <Nav.Screen name="Tabs" component={Tabs} />
      <Nav.Screen name="Stack" component={Stack} />
    </Nav.Navigator>
  );
};

export default root;
```

호출 시 사용법(Stack.js)

```js
const ScreenThree = (
  { navigation: { navigate } } // navigate 참조 필요
) => (
  <TouchableOpacity
    onPress={() =>
      // Stack 화면 내부이기 때문에 Tabs 의 Search 로 이동
      navigate("Tabs", { screen: "Search" })
    }
  >
    <Text>Go to Tabs</Text>
  </TouchableOpacity>
);
```

<br />

### 🌗 `ThemeProvider`

- 모든 화면에서 렌터 트리에 colorScheme 를 사용하지 않고 최상위 root 에 선언해 하위 컴포넌트에서도 상속받아 사용할 수 있게 하는 역할

```js
import { ThemeProvider } from "styled-components";

export default function App() {
  const isDark = useColorScheme() === "dark";

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}

// 호출 방법       // props 로 전달받는다.
const Btn = styled.TouchableOpacity`
  flex: 1;
  background-color: ${(props) => props.theme.mainBgColor};
`;
```

<br />

### `3️⃣rd Party Package` and `Api`

- RN Sdk (오픈소스) : reactnative.directory
- Expo Sdk : docs.expo.dev
  <br />

### 🎬 `Others`

- Expo Icon : icons.expo.fyi
  <br />
