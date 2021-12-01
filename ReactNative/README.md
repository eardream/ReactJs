# React Native

    - 왕초보를 위한 React Native 101
    https://nomadcoders.co/react-native-for-beginners

* Expo 를 사용해 React javascript / CSS 단만 연결

<br/>

### ⚠️ The Rules
* HTML DOM 은 사용할 수 없다.
    - 모든 Text 는 <Text></Text> 컴포넌트 안에 들어가 있어야 한다.
    
* style object 는 필수가 아니다.
    - Component 안에도 사용 가능
    - Web 에 있는 것을 최대한 가져오려 했지만 사용할 수 없는 것도 꽤 많고 다른 것이 많음
  
* View 에는 그려져 있지만 화면에 표시가 되지 않는 Component => OS 와 통신하기 위함

<br />

### 📺 Component

  * `View`
      * 기본적인 컴포넌트
      * Layout(View, Linear, Constraint, Relative ... etc) 과 동일하다 보면 됨

<br />

### `3️⃣rd Party Package` And `Api`
  * RN Sdk (오픈소스) : <a href="https://reactnative.directory">reactnative.directory</a>
  * Expo Sdk : <a href="https://docs.expo.dev/versions/latest/"> docs.expo.dev</a>
  
### ⚠️ `Layout Caution`
* 레이아웃에 weight 을 줄 때에는 부모 Component 에 flex 값이 있어야 한다.
  <details><summary>Example</summary>
  
    ```html
   <View style={{ flex: 1 }}>       // 부모 뷰
       <View style={{ flex: 1, backgroundColor: "tomato"}}></View>
       <View style={{ flex: 1, backgroundColor: "teal"}}></View>
       <View style={{ flex: 1, backgroundColor: "orange"}}></View>
   </View>
  ```      
  
  </details>


