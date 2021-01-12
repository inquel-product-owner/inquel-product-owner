import React from "react";
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import mainRoutes from "./components/mainRoute";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                {mainRoutes}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
