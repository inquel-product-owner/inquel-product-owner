import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HODLogin from "./login";
import Dashboard from "./dashboard";
import Profile from "./profile";

import Group from "./group/group";
import GroupConfiguration from "./group/configuration";
import GroupDetails from "./group/details";
import GroupStudents from "./group/student";
import GroupStudentProfile from "./group/studentProfile";
import GroupTeachers from "./group/teacher";
import GroupSubject from "./group/subject";

import ProfileList from "./profileList";
import StudentProfile from "./studentProfile";
import TeacherProfile from "./teacherProfile";

import CourseScorecard from "./courseScorecard";
import Subject from "./subject";
import SubjectConfiguration from "./subjectConfiguration";

import SimulationPaper from "./simulation/paper";
import SimulationSection from "./simulation/section";
import SimulationType1 from "./simulation/type1";
// import SimulationType2 from "./simulation/type2";

import EmailVerification from "./emailVerification";
import errorPage from "../404";
import teacherRoutes from "../teacher/teacherRoute";

const hodRoutes = (
    <Switch>
        <Route
            exact
            path="/hod"
            render={() =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <Dashboard />
                )
            }
        />

        {/* ---------- Group ---------- */}

        <Route
            exact
            path="/hod/group"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <GroupConfiguration {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <Group {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId/details"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <GroupDetails {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId/student"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <GroupStudents {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <GroupStudentProfile {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId/teacher"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <GroupTeachers {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <GroupSubject {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId/subject/:subjectId/configure"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SubjectConfiguration {...props} />
                )
            }
        />

        {/* ---------- Independent subject ---------- */}

        <Route
            exact
            path="/hod/course/:courseId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <CourseScorecard {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <Subject {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/configure"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SubjectConfiguration {...props} />
                )
            }
        />

        {/* ---------- Simulation exam ---------- */}

        <Route
            exact
            path="/hod/subject/:subjectId/simulation/:simulationId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SimulationPaper {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/simulation/:simulationId/paper/:paperId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SimulationSection {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/simulation/:simulationId/paper/:paperId/section/:sectionId/type1"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SimulationType1 {...props} />
                )
            }
        />
        {/* <Route
            exact
            path="/hod/subject/:subjectId/simulation/:simulationId/paper/:paperId/section/:sectionId/type2"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SimulationType2 {...props} />
                )
            }
        /> */}

        {/* ---------- Profile ---------- */}

        <Route
            exact
            path="/hod/profile"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <ProfileList {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <StudentProfile {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/teacher/:teacherId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <TeacherProfile {...props} />
                )
            }
        />

        {/* ---------- Account & Login ---------- */}

        <Route
            exact
            path="/hod/account/activation/:tokenId"
            render={(props) => <EmailVerification {...props} />}
        />
        <Route
            exact
            path="/hod/account"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <Profile {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/login"
            render={() =>
                localStorage.getItem("Authorization") &&
                localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod" />
                ) : (
                    <HODLogin />
                )
            }
        />

        {teacherRoutes}
        <Route path="*" component={errorPage} />
    </Switch>
);

export default hodRoutes;
