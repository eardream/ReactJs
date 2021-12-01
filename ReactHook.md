# React Hook

    - 실전형 리액트 Hook 10개
    https://nomadcoders.co/react-hooks-introduction

## useState

`What is "useState"?`

```javascript
const [value, setValue] = useState(initialValue)
```

* 가장 많이 사용하는 Hook
* 항상 두 개의 value 를 가짐.
* initialState 를 가지고 사용할 수 있으며 수정이 가능하다.
* 이전에는 함수형 Component 사용 -> 사용하는 방법을 고려하지 않아도 됨

<br />

`useInput`

```javascript
const useInput = (value, validator)
```

* input 을 관리하고 입력 문자들을 확인한다.
* validator function 를 사용해 입력값들을 더 직접적으로 관여할 수 있다.
* useState 와 같이 사용한다.

<details><summary>Ex)</summary>

```javascript
    // useInput
function useInputClass() {
    const useInput = (initialValue, validator) => {
        const [value, setValue] = useState(initialValue);
        const onChange = (event) => {
            const {
                target: {value}
            } = event;

            let willUpdate = true;
            if (typeof validator === "function") {
                willUpdate = validator(value);
            }
            if (willUpdate) {
                setValue(value);
            }
        };
        return {value, onChange};
    };

    // 호출 시
    export default function App() {
        const maxLen = (value) => !value.includes("@");     // validator
        const name = useInput("Mr.", maxLen);
        return (
            <div className="App">
                <h1>Hello</h1>

                // ...name 을 사용해 onChangeListener 와 value 값 지정
                <input placeholder="Name" {...name} />
            </div>
        );
    }
}
```
</details>

<br />

`useTabs`

* Tab(ex) button, select ...) 등의 onClick(or onChange) event 에 관여하고 value 값 지정
* index 값으로 해당 item 에 접근이 가능하다.
* useState 와 같이 사용한다.
* content 로 Array 를 받는다

<details><summary>Ex)</summary>

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
    const {currentItem, changeItem} = useTabs(0, content);

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
</details>

<br /><br />
<br /><br />





## useEffect

`What is "useEffect"?`

```javascript
useEffect(() => {
}, deps)
```

* deps 에 있는 데이터가 값이 변경되거나 초기화될 때 함수가 호출된다.
* 함수 부분에 다른 함수를 호출하거나 혹은 내부에 함수를 작성할 수 있다.

<details><summary>Ex)</summary>

```javascript
export default function App() {
    const [value, setValue] = useState(0);

    const countChange = () => console.log("data is changed");     // 데이터가 변경될 때마다 로그가 출력된다.
    useEffect(countChange, [value]);

    return (
        <div className="App">
            <button onClick={() => setValue(value + 1)}>{value}</button>
            // 클릭될 때마다 value 값 변경
        </div>
    );
}
```
</details>

<br />

`useTitle`

```javascript
const useTitle = (initialTitle)
```

* title 을 페이지가 로드된 후에 변경이 가능하다.
* useEffect, useState 를 사용한다

<details><summary>Ex)</summary>

```javascript
    const useTitle = (initialTitle) => {
    const [title, setTitle] = useState(initialTitle);

    const updateTitle = () => {   // title 변경
        const htmlTitle = document.querySelector("title");
        htmlTitle.innerText = title;
    };

    useEffect(updateTitle, [title]);
    return setTitle;  // setTitle 함수를 반환해 변수 자체가 함수가 되도록 함
};

export default function App() {
    const titleUpdater = useTitle("Loading...");
    setTimeout(() => titleUpdater("Home"), 5000);     // 5 초 후에 변경됨

    return <div className="App">
        <h1>Hi</h1>
    </div>;
}
```
</details>

<br />

`useRef`

```javascript
const ref = useRef();
```

* 컴포넌트 안의 변수를 관리할 수 있다.
* 컴포넌트 안에서의 조회, 수정 가능한 변수들을 관리한다.
* 위의 내용으로 인해 컴포넌트가 리렌더링이 되지 않는다.
* 프로퍼티에서 변경 가능한 값을 담고 있는 상자

<details><summary>Ex)</summary>

```javascript
    export default InputSample = () => {
    const [inputs, setInputs] = useState({
        name: '',
        nickname: '',
    });

    const nameInput = useRef();       // reference

    const {name, nickname} = inputs;
    const onChange = e => {
        const {value, name} = e.target;

        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        });

        nameInput.current.focus();
    };

    return (
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>값:</b>
                {name} ({nickname})
            </div>
        </div>
    );
}
```
</details>

<br/>

`useConfirm`

* useState 와 useEffect 를 사용한 함수는 아님
* 기본적으로 많이 사용하는 함수
* alert 와 callback 을 사용함

<details><summary>Ex)</summary>

```javascript
const useConfirm = (message = "", successCallback, failureCallback) => {
    if (!successCallback && typeof successCallback !== "function") return;
    if (!failureCallback && typeof failureCallback !== "function") return;

    const confirmAction = () => {
        if (window.confirm(message)) {      // 확인
            successCallback();
        } else {        // 취소
            failureCallback();
        }
    };
    return confirmAction;
};

// 사용법
const deleteWorld = () => console.log("Deleting the world...");
const abort = () => console.log("Aborted");
const confirmDelete = useConfirm("Are you sure?", deleteWorld, abort);
```
</details>

<br />

`usePreventLeave`

* useState 와 useEffect 를 사용한 함수는 아님
* 기본적으로 많이 사용하는 함수
* 유저가 화면을 나가기 전에 "나갈 경우 작업 중인 내용 ... " 등의 알림창을 띄움

<details><summary>Ex)</summary>

```javascript
const usePreventLeave = () => {
    const listener = (event) => {
        event.preventDefault();
        event.returnValue = "";     // 해당 문구를 꼭 작성해 줘야 함
    };

    const enablePrevent = () => window.addEventListener("beforeunload", listener);
    const disablePrevent = () =>
        window.removeEventListener("beforeunload", listener);

    return {
        enablePrevent,
        disablePrevent
    };
};

// 사용법
export default function App() {
    const {enablePrevent, disablePrevent} = usePreventLeave();
    return (
        <div className="App">
            <button onClick={enablePrevent}>Project</button>
            <button onClick={disablePrevent}>unprotect</button>
        </div>
    );
}
```
</details>

<br />

`useBeforeLeave`

```javascript
const useBeforeLeave = (onBefore)
```

* 탭을 닫거나 벗어날 때 실행되는 함수
* handler 를 사용해 event 를 받아 마우스의 위치로 해당 페이지를 벗어날 때 이벤트가 발생함

<details><summary>Ex)</summary>

```javascript
const useBeforeLeave = (onBefore) => {
    if (typeof onBefore !== "function") return;

    const handler = (event) => {      // handler event
        const {clientY} = event;
        if (clientY <= 0) {
            onBefore();
        }
    };

    useEffect(() => {     // 선언 후 첫 로드 시에 mouseleave 이벤트 등록
        document.addEventListener("mouseleave", handler);
        return () => document.removeEventListener("mouseleave", handler);
    }, []);
};

// 사용법
const begForLife = () => console.log("Pls dont leave");
useBeforeLeave(begForLife);
```
</details>

<br/>

`useFadeIn`

```javascript
const useFadeIn = (duration = 1, delay = 0) // anything
```

* 천천히 나타나는 효과를 주고 싶을 때 사용함

<details><summary>Ex)</summary>

```javascript
const useFadeIn = (duration = 1, delay = 0) => {
    if (typeof duration !== "number") return;     // number type 으로 받음
    if (typeof delay !== "number") return;

    const element = useRef();     // style 을 넘기기 위해 useRef

    useEffect(() => {     // componentDidMount 시에 작동하기 위함 
        if (element.current) {
            const {current} = element;
            current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;      // fadein Anim
            current.style.opacity = 1;
        }
    }, []);

    return {ref: element, style: {opacity: 0}};
};

export default function App() {
    const fadeInH1 = useFadeIn(1, 2);
    const fadeInP = useFadeIn(2, 8);
    return (
        <div className="App">
            <h1 {...fadeInH1}>Hello</h1>
            <p {...fadeInP}>lorem ipsum lalalalal</p>
        </div>
    );
}
```
</details>

<br/>

`useNetwork`

```javascript
const useNetwork = (func)
```

* 현재 네트워크가 연결되어 있는지 아닌지 알 수 있다.
* handler 를 사용해 event 를 받는다.
* 종료 시에는 removeEventListener 호출

<details><summary>Ex)</summary>

```javascript
const useNetwork = (onChange) => {
    const [status, setStatus] = useState(navigator.onLine);

    const handleChange = () => {        // 변경 event
        if (typeof onChange === "function") onChange(navigator.online);

        setStatus(navigator.online);
    };

    useEffect(() => {
        window.addEventListener("online", handleChange);
        window.addEventListener("offline", handleChange);

        () => {
            window.removeEventListener("online", handleChange);
            window.removeEventListener("offline", handleChange);
        };
    }, []);

    return status;
};

// 사용법
const handleNetworkChange = (online) => {
    console.log(online ? "We just went online" : "We are offline");     // event 등록
};
const online = useNetwork(handleNetworkChange);
```
</details>

<br />

`useScroll`

```javascript
const useScroll = () => {}
```

* 사용자의 스크롤을 감지한다.
* Effect 를 사용해 componentDidMount 시에 호출되게 함
* EventListener 사용

<details><summary>Ex)</summary>

```javascript
const useScroll = () => {
    const [state, setState] = useState({
        x: 0,
        y: 0
    });

    const onScroll = (event) => {
        setState({
            y: window.scrollY,        // y, x 값 설정
            x: window.scrollX
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    });
    return state;
};

// 사용법
export default function App() {
    const {y} = useScroll();
    return (
        <div className="App" style={{height: "1000vh"}}>
            <h1 style={{position: "fixed", color: y > 500 ? "red" : "blue"}}>Hi</h1>
        </div>
    );
}
```
</details>

<br/>

`useNotification`

```javascript
const useNotification = (title, options)
``` 

* user 에게 알림을 보낸다.
* noti 와 같으며 권한이 필요하다.

<details><summary>Ex)</summary>

```javascript
const useNotification = (title, options) => {
    if (!("Notification" in window)) return;

    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {       // 권한 요청
                if (permission === "granted") {     // 허용
                    new Notification(title, options);
                } else {
                    return;
                }
            });
        } else {
            new Notification(title, options);
        }
        return fireNotif;
    };
};

// 사용법
export default function App() {
    const triggerNoti = useNotification("Hello Hani", {
        body: "Im hani!"
    });

    return (
        <div className="App">
            <button onClick={triggerNoti}>Hi</button>
        </div>
    );
}
```
</details>

<br />

`useAxios`

