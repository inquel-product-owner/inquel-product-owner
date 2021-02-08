import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import EmailVerify from "./emailVerification";
import errorPage from "../404";
import StudentLogin from "./login";
import Dashboard from "./dashboard";
import Summary from "./summary";
import Notes from "./notes";
import CycleTest from "./cycleTest";
import DirectExam from "./directExam";
import CycleTestQA from "./cycleTestQA";

const studentRoutes = (
    <Switch>
        <Route
            exact
            path="/student"
            render={() =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Dashboard />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/:chapterName/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Summary {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/:chapterName/:topicName/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Notes {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/:chapterName/cycle-test"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <CycleTest {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/:chapterName/:sectionId/cycle-test"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <CycleTestQA {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/:chapterName/direct-exam"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <DirectExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/login"
            render={() =>
                localStorage.getItem("Authorization") &&
                localStorage.getItem("is_student") ? (
                    <Redirect to="/student" />
                ) : (
                    <StudentLogin />
                )
            }
        />
        <Route
            exact
            path="/email/verification/:tokenId"
            render={(props) => <EmailVerify {...props} />}
        />
        <Route path="*" component={errorPage} />
    </Switch>
);

export default studentRoutes;
