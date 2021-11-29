import { useState, useEffect } from "react";

function Hello() {

  // cleanUp Function
  function byeFn() {
    console.log("bye :( ");
  }
  function hiFn() {
    console.log("create :)");
    return byeFn;
  }

  useEffect(hiFn, []);

  return <h1>Hello</h1>;
}

function App() {
  const [showing, setShowing] = useState(false);
  const onClick = () => setShowing((prev) => !prev);

  return (
    <div>
      {showing ? <Hello /> : null}
      <button onClick={onClick}>{showing ? "Hide" : "Show"}</button>
    </div>
  );
}

export default App;
