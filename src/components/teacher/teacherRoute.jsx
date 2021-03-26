import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import studentRoutes from "../student/studentRoute";

import Dashboard from "./dashboard";
import Leaderboard from "./leaderBoard";
import StudentList from "./studentList";
import StudentProfile from "./studentProfile";

import Group from "./group";
import GroupStudents from "./groupStudents";

import Subject from "./subject";
import Chapters from "./chapters";
import Summary from "./summary";
import SummaryUpload from "./summaryUpload";
import Notes from "./notes";
import NotesUpload from "./notesUpload";
import Type1 from "./type1";
import Concepts from "./concepts";

import CycleTestAuto from "./cycleTest-auto";
import CyleTestDirect from "./cycleTest-direct";
import CycleTestAutoQA from "./cycleTest-autoQA";

import SemesterAuto from "./semester-auto";
import SemesterAutoQA from "./semester-autoQA";
import SemesterDirect from "./semester-direct";
import EvaluateStudents from "./evaluateStudents";

import EmailVerify from "./emailVerification";
import errorPage from "../404";
import TeacherLogin from "./login";
import Profile from "./profile";

const teacherRoutes = (
    <Switch>
        <Route
            exact
            path="/teacher"
            render={() =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Dashboard />
                )
            }
        />
        <Route
            exact
            path="/teacher/profile"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Profile {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/leaderboard"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Leaderboard {...props} />
                )
            }
        />

        {/* --------------- Groups --------------- */}

        <Route
            exact
            path="/teacher/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Group {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/student"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <GroupStudents {...props} />
                )
            }
        />

        {/* --------------- Subjects --------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Subject {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Chapters {...props} />
                )
            }
        />

        {/* --------------- Summary --------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Summary {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/summary/upload"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SummaryUpload {...props} />
                )
            }
        />

        {/* --------------- Notes --------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/:topicNum/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Notes {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/:topicNum/notes/upload"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <NotesUpload {...props} />
                )
            }
        />

        {/* --------------- Type1, Concepts --------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/:topicNum/type1"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Type1 {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/:topicNum/concepts"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Concepts {...props} />
                )
            }
        />

        {/* --------------- Semester --------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId/semester/:semesterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SemesterAuto {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/semester/:semesterId/section/:sectionId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SemesterAutoQA {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/semester/:semesterId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SemesterDirect {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/semester/:semesterId/direct/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <EvaluateStudents {...props} />
                )
            }
        />

        {/* --------------- Cycle test --------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <CycleTestAuto {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId/section/:sectionId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <CycleTestAutoQA {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <CyleTestDirect {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId/direct/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <EvaluateStudents {...props} />
                )
            }
        />

        {/* --------------- Student list & Profile --------------- */}

        <Route
            exact
            path="/teacher/student"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <StudentList {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <StudentProfile {...props} />
                )
            }
        />

        {/* --------------- Login, Errorpage, account activation --------------- */}

        <Route
            exact
            path="/teacher/login"
            render={() =>
                localStorage.getItem("Authorization") &&
                localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher" />
                ) : (
                    <TeacherLogin />
                )
            }
        />
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
