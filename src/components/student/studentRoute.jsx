import React from "react";
import { Switch, Route } from "react-router-dom";
import EmailVerify from "./emailVerification";
import errorPage from "../404";

const studentRoutes = (
    <Switch>
        <Route
            exact
            path="/email/verification/:tokenId"
            render={(props) => <EmailVerify {...props} />}
        />
        <Route path="*" component={errorPage} />
    </Switch>
);

export default studentRoutes;
