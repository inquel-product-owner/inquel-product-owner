import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./dashboard";
import Leaderboard from "./leaderBoard";

import Group from "./group";
import Subject from "./subject";
import TestResult from "./testResult";
import TestPreview from "./testPreview";
import Summary from "./summary";
import Notes from "./notes";
import FlashCard from "./learnFlashCard";

import CycleTest from "./cycle/cycleTest";
import CycleDirectExam from "./cycle/directExam";
import CycleAutoExam from "./cycle/autoExam";

import SemesterExam from "./semester/semesterExam";
import SemesterDirectExam from "./semester/directExam";
import SemesterAutoExam from "./semester/autoExam";

import EmailVerify from "./emailVerification";
import errorPage from "../404";
import StudentLogin from "./login";
import StudentRegister from "./register";
import Profile from "./profile";

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
            path="/student/profile"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Profile {...props} />
                )
            }
        />

        {/* --------------- Subject --------------- */}

        <Route
            exact
            path="/student/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Group {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId"
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
            path="/student/subject/:subjectId/results"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <TestResult {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/results/cycle/:cycleTestId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <TestPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/results/semester/:semesterId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <TestPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/summary"
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
            path="/student/subject/:subjectId/chapter/:chapterId/notes"
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
            path="/student/subject/:subjectId/chapter/:chapterId/:topicNum/learn"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <FlashCard {...props} />
                )
            }
        />

        {/* --------------- Cycle test --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/cycle/:cycleTestId"
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
            path="/student/subject/:subjectId/chapter/:chapterId/cycle/:cycleTestId/auto"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <CycleAutoExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/cycle/:cycleTestId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <CycleDirectExam {...props} />
                )
            }
        />

        {/* --------------- Semester exam --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/semester/:semesterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <SemesterExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/semester/:semesterId/auto"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <SemesterAutoExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/semester/:semesterId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <SemesterDirectExam {...props} />
                )
            }
        />

        {/* --------------- Leaderboard --------------- */}

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

        {/* --------------- Login, Registration, Verification and error page routings --------------- */}

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
