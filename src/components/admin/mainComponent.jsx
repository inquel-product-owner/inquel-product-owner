import React from "react";
import Dashboard from "./dashboard";
import Login from './login';
import Profiles from "./profiles";
import HodProfile from "./hodProfile";
// import TeacherProfile from "./teacherProfile";
import StudentProfile from "./studentProfile";
import HodTeacherList from "./hodTeacherList";
import HodStudentList from './hodStudentList';
import CourseView from './viewCourse';
import DiscountConfiguration from './discountConfiguration';
import MasterData from './masterData';
import { Switch, Route, Redirect } from "react-router-dom";

function Main() {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/hod/:hodId" component={HodProfile} />
                {/* <Route path="/teacher/:teacherId" component={TeacherProfile} /> */}
                <Route path="/student/:studentId" component={StudentProfile} />
                <Route path="/course/:courseId" component={CourseView} />
                <Route
                    exact
                    path="/hod/:hodId/teachers"
                    component={HodTeacherList}
                />
                <Route
                    exact
                    path="/hod/:hodId/students"
                    component={HodStudentList}
                />
                <Route exact path="/course-management" component={MasterData} />
                <Route exact path="/course-management/discounts" component={DiscountConfiguration} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default Main;
