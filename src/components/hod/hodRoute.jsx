import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
import SubjectReview from './subjectReview';
import SubjectAssigning from './subjectAssigning';
import SubjectConfiguration from './subjectConfiguration';

const hodRoutes = (
    <Switch>
        <Route exact path="/hod" component={Dashboard} />
        <Route exact path="/hod/login" component={HODLogin} />
        <Route exact path="/hod/group/:groupId" component={Group} />
        <Route exact path="/hod/groups/configuration" component={GroupConfiguration} />
        <Route exact path="/hod/group/:groupId/details" component={GroupDetails} />
        <Route exact path="/hod/group/:groupId/student" component={GroupStudents} />
        <Route exact path="/hod/group/:groupId/teacher" component={GroupTeachers} />
        <Route exact path="/hod/profile" component={ProfileList} />
        <Route exact path="/hod/student/:studentId" component={StudentProfile} />
        <Route exact path="/hod/teacher/:teacherId" component={TeacherProfile} />
        <Route exact path="/hod/course/:courseId" component={CourseScorecard} />
        <Route exact path="/hod/subject/:subjectId/review" component={SubjectReview} />
        <Route exact path="/hod/subject/:subjectId/assign" component={SubjectAssigning} />
        <Route exact path="/hod/subject/:subjectId/configure" component={SubjectConfiguration} />
        <Redirect to="/admin/login" />
    </Switch>
);

export default hodRoutes;
