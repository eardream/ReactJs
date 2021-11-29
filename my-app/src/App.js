import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  console.log("i run all the time");

  useEffect(() => {
    // 코드를 한 번만 렌더링할 수 있게 도와줌
    console.log("CALL THE API...");
  }, []);

  useEffect(() => {
    // keyword 가 변경될 때에만 렌더링할 수  있게 도와줌
    if (keyword !== "" && keyword.length > 5)
      console.log("SEARCH FOR", keyword);
  }, [keyword]);

  useEffect(() => {
    // counter 가 변경될 때에만 렌더링할 수  있게 도와줌
      console.log("counter ", counter);
  }, [counter]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1 className={styles.title}>{counter}</h1>
      <button onClick={onClick}>Click Me</button>
    </div>
  );
}

export default App;
