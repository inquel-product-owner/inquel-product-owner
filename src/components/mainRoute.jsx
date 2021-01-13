import React from "react";
import { Route, Switch } from "react-router-dom";

import adminRoutes from "./admin/adminRoute";
import LandingPage from "./landingPage";
import ForgotPassword from "./forgotPassword";
import errorPage from "./404";

const mainRoutes = (
    <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route
            exact
            path="/forgotpassword/:authToken"
            render={(props) => <ForgotPassword {...props} />}
        />
        {adminRoutes}
        <Route path="*" component={errorPage} />
    </Switch>
);

export default mainRoutes;
