import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

import Dashboard from "./dashboard";
import Login from "./login";
import Profiles from "./profiles";
import HodProfile from "./hodProfile";
import StudentProfile from "./studentProfile";
import HodTeacherList from "./hodTeacherList";
import HodStudentList from "./hodStudentList";
import HodStudentProfile from "./hodStudentProfile";
import CourseView from "./viewCourse";
import DiscountConfiguration from "./discountConfiguration";
import MasterData from "./masterData";

import hodRoutes from "../hod/hodRoute";
import errorPage from "../404";

const adminRoutes = (
    <Switch>
        <Route
            exact
            path="/admin"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <Dashboard />
                )
            }
        />
        <Route
            exact
            path="/admin/login"
            render={() =>
                localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin" />
                ) : (
                    <Login />
                )
            }
        />
        <Route
            path="/admin/profiles"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <Profiles {...props} />
                )
            }
        />
        <Route
            exact
            path="/admin/hod/:hodId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <HodProfile {...props} />
                )
            }
        />
        <Route
            path="/admin/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <StudentProfile {...props} />
                )
            }
        />
        <Route
            path="/admin/course/:courseId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <CourseView {...props} />
                )
            }
        />
        <Route
            path="/admin/hod/:hodId/teachers"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <HodTeacherList {...props} />
                )
            }
        />
        <Route
            path="/admin/hod/:hodId/students"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <HodStudentList {...props} />
                )
            }
        />
        <Route
            path="/admin/hod/:hodId/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <HodStudentProfile {...props} />
                )
            }
        />
        <Route
            exact
            path="/admin/course-management"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <MasterData {...props} />
                )
            }
        />
        <Route
            path="/admin/course-management/discounts"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <DiscountConfiguration {...props} />
                )
            }
        />
        {hodRoutes}
        <Route path="*" component={errorPage} />
    </Switch>
);

export default adminRoutes;
