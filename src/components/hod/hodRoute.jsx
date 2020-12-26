import React from "react";
import { Route } from "react-router-dom";
import HODLogin from "./login";
import Dashboard from "./dashboard";
import Group from "./group";
import GroupConfiguration from "./groupConfiguration";
import GroupDetails from "./groupDetails";
import GroupStudents from './groupStudents';
import GroupTeachers from './groupTeachers';
import ProfileList from './profileList';
import StudentProfile from './studentProfile';
import TeacherProfile from './teacherProfile';
import CourseScorecard from './courseScorecard';

const hodRoutes = (
    <>
        <Route exact path="/hod" component={Dashboard} />
        <Route exact path="/hod/login" component={HODLogin} />
        <Route exact path="/hod/group/:groupId" component={Group} />
        <Route exact path="/hod/groups/configuration" component={GroupConfiguration} />
        <Route exact path="/hod/group/:groupId/details" component={GroupDetails} />
        <Route exact path="/hod/group/:groupId/students" component={GroupStudents} />
        <Route exact path="/hod/group/:groupId/teachers" component={GroupTeachers} />
        <Route exact path="/hod/profiles" component={ProfileList} />
        <Route exact path="/hod/student/:studentId" component={StudentProfile} />
        <Route exact path="/hod/teacher/:teacherId" component={TeacherProfile} />
        <Route exact path="/hod/course/:courseId" component={CourseScorecard} />
    </>
);

export default hodRoutes;
