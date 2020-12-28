import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Redirect } from "react-router-dom";
import adminRoutes from "./components/admin/adminRoute";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                {adminRoutes}
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
}

export default App;
