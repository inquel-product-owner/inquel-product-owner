import React from "react";
import Header from "./header";
import Profiles from "./profiles";
import HodProfile from "./hodProfile";
import TeacherProfile from "./teacherProfile";
import StudentProfile from "./studentProfile";
import HodTeacherList from "./hodTeacherList";
import { Switch, Route, Redirect } from "react-router-dom";

function Main() {
    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path="/" component={Profiles} />
                <Route exact path="/hod/:hodId" component={HodProfile} />
                <Route path="/teacher/:teacherId" component={TeacherProfile} />
                <Route path="/student/:studentId" component={StudentProfile} />
                <Route exact path="/hod/:hodId/teacher-list" component={HodTeacherList} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
}

export default Main;
