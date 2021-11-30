# React Hook
    - 실전형 리액트 Hook 10개
    https://nomadcoders.co/react-hooks-introduction

## useState

#### What is "useState"?
```javascript
const [value, setValue] = useState(initialValue)
```
* 가장 많이 사용하는 Hook
* 항상 두 개의 value 를 가짐.
* initialState 를 가지고 사용할 수 있으며 수정이 가능하다.
* 이전에는 함수형 Component 사용 -> 사용하는 방법을 고려하지 않아도 됨


<br />

#### useInput
```javascript
const useInput = (value, validator)
```
* input 을 관리하고 입력 문자들을 확인한다.   
* validator function 를 사용해 입력값들을 더 직접적으로 관여할 수 있다.   
* useState 와 같이 사용한다.

```javascript
    // useInput
    function useInputClass() {
        const useInput = (initialValue, validator) => {
            const [value, setValue] = useState(initialValue);
            const onChange = (event) => {
                const {
                    target: { value }
                } = event;

                let willUpdate = true;
                if (typeof validator === "function") {
                    willUpdate = validator(value);
                }
                if (willUpdate) {
                    setValue(value);
                }
            };
            return { value, onChange };
        };
        
        // 호출 시
        export default function App() {
            const maxLen = (value) => !value.includes("@");     // validator
            const name = useInput("Mr.", maxLen);
            return (
                <div className="App">
                    <h1>Hello</h1>
                    
                    <!-- ...name 을 사용해 onChangeListener 와 value 값 지정 -->
                    <input placeholder="Name" {...name} />      
                </div>
            );
        }
    }
```

<br />

#### useTabs
* Tab(ex) button, select ...) 등의 onClick(or onChange) event 에 관여하고 value 값 지정
* index 값으로 해당 item 에 접근이 가능하다. 
* useState 와 같이 사용한다.
* content 로 Array 를 받는다

```javascript
// useTabs
const content = [
  {
    tab: "Section 1",
    content: "I'm the content of the Section 1"
  },
  {
    tab: "Section 2",
    content: "I'm the content of the Section 2"
  }
];

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setIndex] = useState(initialTab);

  if (!allTabs || !Array.isArray(allTabs)) {        <!-- array 가 아닐 경우에는 return -> 코드에도 나타남 -->
    return;
  }

  return ({
    currentItem: allTabs[currentIndex], 
    changeItem: setIndex
  });
};

// 사용 시 
export default function App() {
    const { currentItem, changeItem } = useTabs(0, content);

    return (
        <div className="App">
            {content.map((section, index) => (      <!-- 호출 부분 -->
                <button onClick={() => changeItem(index)}>{section.tab}</button>
            ))}
            <div>{currentItem.content}</div>
        </div>
    );
}
```

<br /><br />
<hr>

## useEffect

#### What is "useEffect"?

#### useTitle

#### useConfirm & usePreventLeave

#### useBeforeLeave

#### useFadeIn & useNetwork

#### useScroll & useFullScreen

#### useNotification

#### useAxios
    


