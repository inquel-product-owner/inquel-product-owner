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
import Chapters from "./chapters";
import SubjectNotes from "./notes";
import SubjectSummary from "./summary";
import SubjectType1 from "./type1";
import SubjectConcepts from "./concepts";
import CycleTestAuto from "./cycleTest-auto";
import CyleTestDirect from "./cycleTest-direct";
import CycleTestAutoQA from "./cycleTest-autoQA";
import SemesterAuto from "./semester-auto";
import SemesterAutoQA from "./semester-autoQA";
import SemesterDirect from "./semester-direct";
import EvaluateStudents from "./evaluateStudents";
import Leaderboard from "./leaderBoard";

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
            path="/teacher/student/:studentId/direct-test"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <EvaluateStudents {...props} />
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
            path="/teacher/subject/:subjectId/:chapterName/cycle/:cycle_testId"
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
            path="/teacher/subject/:subjectId/:chapterName/cycle/:cycle_testId/section/:sectionId"
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
            path="/teacher/subject/:subjectId/:chapterName/cycle/:cycle_testId/direct"
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
