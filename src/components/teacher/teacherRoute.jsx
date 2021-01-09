import React from "react";
import { Switch, Route } from "react-router-dom";
import EmailVerify from "./emailVerification";
import errorPage from "../404";
import studentRoutes from '../student/studentRoute';

const teacherRoutes = (
    <Switch>
        <Route
            exact
            path="/teacher/account/activation/:tokenId"
            render={(props) => <EmailVerify {...props} />}
        />
        {studentRoutes}
        <Route path="*" component={errorPage} />
    </Switch>
);

export default teacherRoutes;
