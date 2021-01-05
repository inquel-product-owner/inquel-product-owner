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
import SubjectReview from "./subjectReview";
import SubjectAssigning from "./subjectAssigning";
import SubjectConfiguration from "./subjectConfiguration";

import EmailVerification from "./emailVerification";
import errorPage from "../404";

const hodRoutes = (
    <Switch>
        <Route
            exact
            path="/hod"
            render={() =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <Dashboard />
                )
            }
        />
        <Route exact path="/hod/login" component={HODLogin} />
        <Route
            exact
            path="/hod/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Authorization") &&
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
            render={() =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <GroupConfiguration />
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId/details"
            render={(props) =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <GroupDetails {...props}/>
                )
            }
        />
        <Route
            exact
            path="/hod/group/:groupId/student"
            render={(props) =>
                !localStorage.getItem("Authorization") &&
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
                !localStorage.getItem("Authorization") &&
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
            render={() =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <ProfileList />
                )
            }
        />
        <Route
            exact
            path="/hod/student/:studentId"
            render={() =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <StudentProfile />
                )
            }
        />
        <Route
            exact
            path="/hod/teacher/:teacherId"
            render={() =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <TeacherProfile />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId"
            render={() =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <CourseScorecard />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/review"
            render={(props) =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SubjectReview {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/assign"
            render={(props) =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SubjectAssigning {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/configure"
            render={(props) =>
                !localStorage.getItem("Authorization") &&
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <SubjectConfiguration {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/account/verification/:tokenId"
            render={(props) => <EmailVerification {...props} />}
        />
        {/* <Redirect to="/admin/login" /> */}
        <Route path="*" component={errorPage} />
    </Switch>
);

export default hodRoutes;
