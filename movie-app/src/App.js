import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App() {
    return <BrowserRouter>
        <Switch>
            <Route path="/movie/:id">
                <Detail />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    </BrowserRouter>;
}

export default App;
