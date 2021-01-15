import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import studentRoutes from "../student/studentRoute";
import EmailVerify from "./emailVerification";
import errorPage from "../404";
import TeacherLogin from "./login";
import Dashboard from "./dashboard";
import Group from "./group";

const teacherRoutes = (
    <Switch>
        <Route
            exact
            path="/teacher"
            render={() =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Dashboard />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <Group {...props} />
                )
            }
        />
        <Route exact path="/teacher/login" component={TeacherLogin} />
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
