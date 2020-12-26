import React from "react";
import { Route, Redirect } from "react-router-dom";

import Dashboard from "./dashboard";
import Login from "./login";
import Profiles from "./profiles";
import HodProfile from "./hodProfile";
import StudentProfile from "./studentProfile";
import HodTeacherList from "./hodTeacherList";
import HodStudentList from "./hodStudentList";
import CourseView from "./viewCourse";
import DiscountConfiguration from "./discountConfiguration";
import MasterData from "./masterData";

import hodRoutes from '../hod/hodRoute';

const adminRoutes = (
    <>
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
        <Route path="/admin/login" component={Login} />
        <Route
            path="/admin/profiles"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <Profiles />
                )
            }
        />
        <Route
            exact
            path="/admin/hod/:hodId"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <HodProfile />
                )
            }
        />
        <Route
            path="/admin/student/:studentId"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <StudentProfile />
                )
            }
        />
        <Route
            path="/admin/course/:courseId"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <CourseView />
                )
            }
        />
        <Route
            path="/admin/hod/:hodId/teachers"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <HodTeacherList />
                )
            }
        />
        <Route
            path="/admin/hod/:hodId/students"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <HodStudentList />
                )
            }
        />
        <Route
        exact
            path="/admin/course-management"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <MasterData />
                )
            }
        />
        <Route
            path="/admin/course-management/discounts"
            render={() =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <DiscountConfiguration />
                )
            }
        />
        {hodRoutes}
    </>
);

export default adminRoutes;
