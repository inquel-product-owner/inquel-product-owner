import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HODLogin from "./login";
import Dashboard from "./dashboard";
import Group from "./group";
import GroupConfiguration from "./groupConfiguration";
import GroupDetails from "./groupDetails";
import GroupStudents from "./groupStudents";
import GroupTeachers from "./groupTeachers";
import ProfileList from "./profileList";
import StudentProfile from "./studentProfile";
import TeacherProfile from "./teacherProfile";
import CourseScorecard from "./courseScorecard";
import Subject from "./subject";
// import SubjectAssigning from "./subjectAssigning";
import SubjectConfiguration from "./subjectConfiguration";

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
            path="/hod/groups/configuration"
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
        {/* <Route
            exact
            path="/hod/subject/:subjectId/assign"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SubjectAssigning {...props} />
                )
            }
        /> */}
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
        <Route
            exact
            path="/hod/account/activation/:tokenId"
            render={(props) => <EmailVerification {...props} />}
        />
        {teacherRoutes}
        <Route path="*" component={errorPage} />
    </Switch>
);

export default hodRoutes;
