import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./dashboard";
import Leaderboard from "./leaderBoard";

import Subject from "./subject";
import Summary from "./summary";
import Notes from "./notes";
import CycleTest from "./cycleTest";
import DirectExam from "./directExam";
import CycleTestQA from "./cycleTestQA";

import EmailVerify from "./emailVerification";
import errorPage from "../404";
import StudentLogin from "./login";
import StudentRegister from "./register";

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

        {/* ---------- Subject ---------- */}

        <Route
            exact
            path="/student/subject/:subjectId/"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Subject {...props} />
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

        {/* ---------- Leaderboard ---------- */}

        <Route
            exact
            path="/student/leaderboard"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Leaderboard {...props} />
                )
            }
        />

        {/* ---------- Login, Registration, Verification and error page routings ---------- */}

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
            path="/student/register"
            render={() =>
                localStorage.getItem("Authorization") &&
                localStorage.getItem("is_student") ? (
                    <Redirect to="/student" />
                ) : (
                    <StudentRegister />
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
