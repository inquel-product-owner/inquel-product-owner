import React from "react";
import "./App.css";
import { BrowserRouter, Switch } from "react-router-dom";
import adminRoutes from "./components/admin/adminRoute";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                {adminRoutes}
            </Switch>
        </BrowserRouter>
    );
}

export default App;
