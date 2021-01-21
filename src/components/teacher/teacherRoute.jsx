import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import studentRoutes from "../student/studentRoute";
import EmailVerify from "./emailVerification";
import errorPage from "../404";
import TeacherLogin from "./login";
import Dashboard from "./dashboard";
import Group from "./group";
import GroupStudents from "./groupStudents";
import StudentList from "./studentList";
import StudentProfile from "./studentProfile";
import SubjectChapters from "./subject";
import Chapters from "./subjectChapters";
import SubjectNotes from "./subjectNotes";
import SubjectSummary from "./subjectSummary";
import SubjectType1 from "./subjectType1";
import SubjectConcepts from "./subjectConcepts";

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
        <Route
            exact
            path="/teacher/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SubjectChapters {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/:chapterName"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <Chapters {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/:chapterName/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SubjectSummary {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/:chapterName/:topicName/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SubjectNotes {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/:chapterName/:topicName/type1"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SubjectType1 {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/:chapterName/:topicName/concepts"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <SubjectConcepts {...props} />
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
