# ReactJs


<hr>

## Basic
    - ReactJs 로 영화 웹 서비스 만들기
    https://nomadcoders.co/react-for-beginners/lobby


    1. JSX, Babel, ReactDOM, return( = () => {} )
     
    **State**

    * React.useState(0);
    * Value 를 설정하고 관리
    * Component  안에서만 관리함
    
    **Props**

    * function anything({text, releaseData}) {}
    * State 와 동일하게 Value 를 설정
    * 함수 param 과 사용하는 방식이 비슷
    * 자식 Component 에 Data 를 넘길 수 있음
    
    **Memo**

    * React.memo(/* function*/);
    * 컴포넌트가 렌더링 된 후 새로 DOM 이 업데이트 될 때 Memo 를 사용해 필요한 부분을 재사용해 랜더링 속도를 더 빠르게 한다.
    
    **Effect**

    * useEffect(() => {}, [/*deps*/]);
    * API 호출을 하거나 데이터가 변경되었을 때 변경된 값을 React 내부에서 감시하고 호출함



