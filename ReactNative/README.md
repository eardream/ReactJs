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
   <View style={{ flex: 1 }}>       // 부모 뷰
       <View style={{ flex: 1, backgroundColor: "tomato"}}></View>
       <View style={{ flex: 1, backgroundColor: "teal"}}></View>
       <View style={{ flex: 1, backgroundColor: "orange"}}></View>
   </View>
```      

  </details>

<br />


### 📺 Component

  * `View`
      * 기본적인 컴포넌트
      * Layout(View, Linear, Constraint, Relative ... etc) 과 동일하다 보면 됨

  * `TextInput`
      * EditText 와 같음
      * 키보드 제약을 걸 수 있음
      * RN 에서 유저가 입력을 할 수 있는 유일한 Component
  

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

### 💾 기기에 저장할 수 있는 `AsyncStorage`
* AsyncStorage 를 사용해 기기 내부 저장소에 원하는 데이터를 저장할 수 있다
* Preference 와 같은 동작이며 파일명을 명시해 줘야 함
* 기기 용량이 얼마나 남아있고 어떻게 callback 이 올지 모르기 때문에 `async-await` 사용 필수

<br />

### 🚨 `Alert`
* 유저에게 기본 알림 UI 를 보일 수 있다.
* OS 내부의 AlertDialog 가 동작하게 되며 Button[] 을 넘길 수 있다.
* Button -> `onPress` 를 사용해 함수를 넘길 수 있다.

<br />

### `3️⃣rd Party Package` And `Api`
  * RN Sdk (오픈소스) : <a href="https://reactnative.directory">reactnative.directory</a>
  * Expo Sdk : <a href="https://docs.expo.dev/versions/latest/"> docs.expo.dev</a>
  
<br />

### 🎬 `Others`
  * Expo Icon : <a href="https://icons.expo.fyi/">icons.expo.fyi</a>
  
  
<br/>
