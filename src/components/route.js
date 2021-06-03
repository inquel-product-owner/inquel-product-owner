import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import LandingPage from "./landingPage";

// -------------------- Admin Imports --------------------

import AdminDashboard from "./admin/dashboard";
import AdminLogin from "./admin/login";
import AdminHODAndStudentList from "./admin/profileList";
import AdminStudentProfile from "./admin/studentProfile";

import AdminHodProfile from "./admin/hodProfile";
import AdminHodTeacherList from "./admin/hodTeacherList";
import AdminHodStudentList from "./admin/hodStudentList";
import AdminHodStudentProfile from "./admin/hodStudentProfile";

import AdminCourseView from "./admin/viewCourse";
import AdminDiscountConfiguration from "./admin/discountConfiguration";
import AdminMasterData from "./admin/masterData";

// -------------------- HOD Imports --------------------

import HODLogin from "./hod/login";
import HODDashboard from "./hod/dashboard";
import HODProfile from "./hod/profile";

import HODGroup from "./hod/group/group";
import HODGroupSubject from "./hod/group/subject";
import HODGroupConfiguration from "./hod/group/configuration";
import HODGroupDetails from "./hod/group/details";
import HODGroupStudents from "./hod/group/student";
import HODGroupStudentProfile from "./hod/group/studentProfile";
import HODGroupTeachers from "./hod/group/teacher";

import HODTeacherStudentList from "./hod/profileList";
import HODStudentProfile from "./hod/studentProfile";
import HODTeacherProfile from "./hod/teacherProfile";

import HODSubject from "./hod/independent/subject";
import HODSubjectChapter from "./hod/independent/chapter";
import HODSubjectSummary from "./hod/independent/summary";
import HODSubjectNotes from "./hod/independent/notes";
import HODSubjectMatch from "./hod/independent/match";
import HODSubjectConcepts from "./hod/independent/concepts";
import HODSubjectTypeOne from "./hod/independent/type1";
import HODSubjectTypeTwo from "./hod/independent/type2";

import HODCyclePreview from "./hod/preview/cycle";
import HODSemesterPreview from "./hod/preview/semester";
import HODQuizPreview from "./hod/preview/quiz";
import HODSimulationPaperPreview from "./hod/preview/simulationPaper";
import HODSimulationSectionPreview from "./hod/preview/simulationSection";

import HODCourse from "./hod/course/course";
import HODCourseConfig from "./hod/course/configuration";
import HODCourseSummary from "./hod/course/summary";
import HODCourseNotes from "./hod/course/notes";
import HODCourseFlashCard from "./hod/course/learnFlashCard";

import HODSimulationPaper from "./hod/simulation/paper";
import HODSimulationSection from "./hod/simulation/section";
import HODSimulationType1 from "./hod/simulation/type1";
import HODSimulationType2 from "./hod/simulation/type2";

import HODEmailVerification from "./hod/emailVerification";

// -------------------- Teacher Imports --------------------

import TeacherDashboard from "./teacher/dashboard";
import TeacherLeaderboard from "./teacher/leaderBoard";
import TeacherStudentList from "./teacher/studentList";
import TeacherStudentProfile from "./teacher/studentProfile";

import TeacherGroup from "./teacher/group";
import TeacherGroupStudents from "./teacher/groupStudents";

import TeacherSubject from "./teacher/subject/groupSubject";
import TeacherIndependentSubject from "./teacher/subject/independentSubject";
import TeacherChapters from "./teacher/chapter/chapters";
import TeacherSummary from "./teacher/content/summary";
import TeacherSummaryUpload from "./teacher/content/summaryUpload";
import TeacherNotes from "./teacher/content/notes";
import TeacherNotesUpload from "./teacher/content/notesUpload";

import TeacherType1 from "./teacher/content/type1";
import TeacherType2 from "./teacher/content/type2";
import TeacherConcepts from "./teacher/content/concepts";
import TeacherMatch from "./teacher/content/match";

import TeacherCycleTestAuto from "./teacher/cycle/auto";
import TeacherCyleTestDirect from "./teacher/cycle/direct";
import TeacherCycleTestAutoQA from "./teacher/cycle/sectionPreview";
import TeacherCycleDirectEvaluation from "./teacher/cycle/evaluateStudents";

import TeacherSemesterAuto from "./teacher/semester/auto";
import TeacherSemesterAutoQA from "./teacher/semester/sectionPreview";
import TeacherSemesterDirect from "./teacher/semester/direct";
import TeacherSemesterDirectEvaluation from "./teacher/semester/evaluateStudents";

import TeacherQuizLevel from "./teacher/quiz/level";
import TeacherLevelPreview from "./teacher/quiz/levelPreview";

import TeacherEmailVerify from "./teacher/emailVerification";
import TeacherLogin from "./teacher/login";
import TeacherProfile from "./teacher/profile";

// -------------------- Student Imports --------------------

import Dashboard from "./student/dashboard";
import Leaderboard from "./student/leaderBoard";

import Group from "./student/group";
import Subject from "./student/subject";
import TestResult from "./student/testResult";
import TestPreview from "./student/testPreview";

import Summary from "./student/content/summary";
import Notes from "./student/content/notes";
import PersonalNotes from "./student/content/personalNotes";
import Favourites from "./student/content/favourites";
import FavouritesFlashcard from "./student/flashcard/bookmarkFlashcard";
import FlashCard from "./student/flashcard/learnFlashCard";

import CycleDirectExam from "./student/cycle/directExam";
import CycleAutoExam from "./student/cycle/autoExam";

import SemesterDirectExam from "./student/semester/directExam";
import SemesterAutoExam from "./student/semester/autoExam";

import Quiz from "./student/quiz/quiz";
import QuizLevelExam from "./student/quiz/levelExam";

import EmailVerify from "./student/emailVerification";
import StudentLogin from "./student/login";
import StudentRegister from "./student/register";
import Profile from "./student/profile";

import StudyPlanner from "./student/study-planner/";

// -------------------- General Imports --------------------

import { ForgotPassword } from "./common/forgotPassword";
import errorPage from "./404";

const routes = (
    <Switch>
        <Route exact path="/" component={LandingPage} />

        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Admin Routes =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}

        <Route
            exact
            path="/admin"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminDashboard {...props} />
                )
            }
        />
        <Route
            exact
            path="/admin/login"
            render={() =>
                localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin" />
                ) : (
                    <AdminLogin />
                )
            }
        />
        <Route
            path="/admin/profiles"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminHODAndStudentList {...props} />
                )
            }
        />
        <Route
            exact
            path="/admin/hod/:hodId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminHodProfile {...props} />
                )
            }
        />
        <Route
            path="/admin/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminStudentProfile {...props} />
                )
            }
        />
        <Route
            path="/admin/course/:courseId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminCourseView {...props} />
                )
            }
        />
        <Route
            path="/admin/hod/:hodId/teacher"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminHodTeacherList {...props} />
                )
            }
        />
        <Route
            path="/admin/hod/:hodId/students"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminHodStudentList {...props} />
                )
            }
        />
        <Route
            path="/admin/hod/:hodId/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminHodStudentProfile {...props} />
                )
            }
        />
        <Route
            exact
            path="/admin/master-data"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminMasterData {...props} />
                )
            }
        />
        <Route
            path="/admin/discounts"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminDiscountConfiguration {...props} />
                )
            }
        />

        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= HOD Routes =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}

        <Route
            exact
            path="/hod"
            render={() =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODDashboard />
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
                    <HODGroupConfiguration {...props} />
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
                    <HODGroup {...props} />
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
                    <HODGroupDetails {...props} />
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
                    <HODGroupStudents {...props} />
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
                    <HODGroupStudentProfile {...props} />
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
                    <HODGroupTeachers {...props} />
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
                    <HODGroupSubject {...props} />
                )
            }
        />

        {/* ---------- Independent subject ---------- */}

        <Route
            exact
            path="/hod/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSubject {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSubjectChapter {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSubjectSummary {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSubjectNotes {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId/:topicNum/match"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSubjectMatch {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId/:topicNum/concepts"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSubjectConcepts {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId/:topicNum/typeone"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSubjectTypeOne {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId/:topicNum/typetwo"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSubjectTypeTwo {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId/cycle/:cycleId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODCyclePreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/semester/:semesterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSemesterPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/chapter/:chapterId/quiz/:quizId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODQuizPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/simulation/:simulationId/paper/:paperId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSimulationSectionPreview {...props} />
                )
            }
        />

        {/* ---------- Course ---------- */}

        <Route
            exact
            path="/hod/course/:courseId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODCourse {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/course"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODCourseConfig {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/edit"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODCourseConfig {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/chapter/:chapterId/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODCourseSummary {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/chapter/:chapterId/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODCourseNotes {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/chapter/:chapterId/:topicNum/learn"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODCourseFlashCard {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/chapter/:chapterId/cycle/:cycleId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODCyclePreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/semester/:semesterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSemesterPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/chapter/:chapterId/quiz/:quizId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODQuizPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/simulation/:simulationId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSimulationPaperPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/course/:courseId/simulation/:simulationId/paper/:paperId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSimulationSectionPreview {...props} />
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
                    <HODSimulationPaper {...props} />
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
                    <HODSimulationSection {...props} />
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
                    <HODSimulationType1 {...props} />
                )
            }
        />
        <Route
            exact
            path="/hod/subject/:subjectId/simulation/:simulationId/paper/:paperId/section/:sectionId/type2"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSimulationType2 {...props} />
                )
            }
        />

        {/* ---------- Profile ---------- */}

        <Route
            exact
            path="/hod/profile"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODTeacherStudentList {...props} />
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
                    <HODStudentProfile {...props} />
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
                    <HODTeacherProfile {...props} />
                )
            }
        />

        {/* ---------- Account & Login ---------- */}

        <Route
            exact
            path="/hod/account/activation/:tokenId"
            render={(props) => <HODEmailVerification {...props} />}
        />
        <Route
            exact
            path="/hod/account"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODProfile {...props} />
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

        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Teacher Routes =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}

        <Route
            exact
            path="/teacher"
            render={() =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherDashboard />
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
                    <TeacherProfile {...props} />
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
                    <TeacherLeaderboard {...props} />
                )
            }
        />

        {/* -----------------------------------------------------
            -------------------- Group --------------------------
            ----------------------------------------------------- */}

        <Route
            exact
            path="/teacher/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherGroup {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSubject {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherChapters {...props} />
                )
            }
        />

        {/* --------------- Summary --------------- */}

        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSummary {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/summary/upload"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSummaryUpload {...props} />
                )
            }
        />

        {/* --------------- Notes --------------- */}

        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/:topicNum/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherNotes {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/:topicNum/notes/upload"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherNotesUpload {...props} />
                )
            }
        />

        {/* --------------- Type1, Type2, Match and Concepts --------------- */}

        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/:topicNum/type1"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherType1 {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/:topicNum/type2"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherType2 {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/:topicNum/concepts"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherConcepts {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/:topicNum/match"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherMatch {...props} />
                )
            }
        />

        {/* --------------- Semester --------------- */}

        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/semester/:semesterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSemesterAuto {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/semester/:semesterId/section/:sectionId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSemesterAutoQA {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/semester/:semesterId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSemesterDirect {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/semester/:semesterId/direct/evaluation"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSemesterDirectEvaluation {...props} />
                )
            }
        />

        {/* --------------- Cycle test --------------- */}

        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherCycleTestAuto {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId/section/:sectionId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherCycleTestAutoQA {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherCyleTestDirect {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId/direct/evaluation"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherCycleDirectEvaluation {...props} />
                )
            }
        />

        {/* --------------- Quiz --------------- */}

        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/quiz/:quizId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherQuizLevel {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/subject/:subjectId/chapter/:chapterId/quiz/:quizId/level/:levelId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherLevelPreview {...props} />
                )
            }
        />

        {/* --------------- Group Student --------------- */}

        <Route
            exact
            path="/teacher/group/:groupId/student"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherGroupStudents {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/group/:groupId/student/:studentId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherStudentProfile {...props} />
                )
            }
        />

        {/* -----------------------------------------------------
             -------------------- Independent --------------------
             ----------------------------------------------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherIndependentSubject {...props} />
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
                    <TeacherChapters {...props} />
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
                    <TeacherSummary {...props} />
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
                    <TeacherSummaryUpload {...props} />
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
                    <TeacherNotes {...props} />
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
                    <TeacherNotesUpload {...props} />
                )
            }
        />

        {/* --------------- Type1, Type2, Match and Concepts --------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/:topicNum/type1"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherType1 {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/:topicNum/type2"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherType2 {...props} />
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
                    <TeacherConcepts {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/:topicNum/match"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherMatch {...props} />
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
                    <TeacherSemesterAuto {...props} />
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
                    <TeacherSemesterAutoQA {...props} />
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
                    <TeacherSemesterDirect {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/semester/:semesterId/direct/evaluation"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSemesterDirectEvaluation {...props} />
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
                    <TeacherCycleTestAuto {...props} />
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
                    <TeacherCycleTestAutoQA {...props} />
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
                    <TeacherCyleTestDirect {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/cycle/:cycle_testId/direct/evaluation"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherCycleDirectEvaluation {...props} />
                )
            }
        />

        {/* --------------- Quiz --------------- */}

        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/quiz/:quizId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherQuizLevel {...props} />
                )
            }
        />
        <Route
            exact
            path="/teacher/subject/:subjectId/chapter/:chapterId/quiz/:quizId/level/:levelId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherLevelPreview {...props} />
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
                    <TeacherStudentList {...props} />
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
                    <TeacherStudentProfile {...props} />
                )
            }
        />

        {/* --------------- Login, account activation --------------- */}

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
            render={(props) => <TeacherEmailVerify {...props} />}
        />

        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Student Routes =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}

        <Route
            exact
            path="/student"
            render={() =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Dashboard />
                )
            }
        />
        <Route
            exact
            path="/student/profile"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Profile {...props} />
                )
            }
        />

        {/* --------------- Subject --------------- */}

        <Route
            exact
            path="/student/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Group {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Subject {...props} />
                )
            }
        />

        {/* --------------- Personal notes & Favourites --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/personal-notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <PersonalNotes {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/favourites"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Favourites {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/favourites/:chapterId/:topicNum/:type"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <FavouritesFlashcard {...props} />
                )
            }
        />

        {/* --------------- Summary & Notes --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Summary {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Notes {...props} />
                )
            }
        />

        {/* --------------- Flashcard --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/:topicNum/learn"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <FlashCard {...props} />
                )
            }
        />

        {/* --------------- Cycle test --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/cycle/:cycleTestId/auto"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <CycleAutoExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/cycle/:cycleTestId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <CycleDirectExam {...props} />
                )
            }
        />

        {/* --------------- Quiz --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/quiz/:quizId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Quiz {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/chapter/:chapterId/quiz/:quizId/level/:levelId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <QuizLevelExam {...props} />
                )
            }
        />

        {/* --------------- Semester exam --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/semester/:semesterId/auto"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <SemesterAutoExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/semester/:semesterId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <SemesterDirectExam {...props} />
                )
            }
        />

        {/* --------------- Test result & Preview --------------- */}

        <Route
            exact
            path="/student/subject/:subjectId/results"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <TestResult {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/results/cycle/:cycleTestId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <TestPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/student/subject/:subjectId/results/semester/:semesterId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <TestPreview {...props} />
                )
            }
        />

        {/* --------------- Leaderboard --------------- */}

        <Route
            exact
            path="/student/leaderboard"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <Leaderboard {...props} />
                )
            }
        />

        {/* --------------- Study Planner --------------- */}

        <Route
            exact
            path="/student/study-planner"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/student/login" />
                ) : (
                    <StudyPlanner {...props} />
                )
            }
        />

        {/* --------------- Login, Registration, Verification routings --------------- */}

        <Route
            exact
            path="/student/login"
            render={() =>
                localStorage.getItem("Authorization") &&
                localStorage.getItem("is_student") ? (
                    <Redirect to="/student" />
                ) : (
                    <StudentLogin />
                )
            }
        />
        <Route
            exact
            path="/student/register"
            render={() =>
                localStorage.getItem("Authorization") &&
                localStorage.getItem("is_student") ? (
                    <Redirect to="/student" />
                ) : (
                    <StudentRegister />
                )
            }
        />
        <Route
            exact
            path="/email/verification/:tokenId"
            render={(props) => <EmailVerify {...props} />}
        />

        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Forgot password & 404 page =-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}

        <Route
            exact
            path="/forgotpassword/:authToken"
            render={(props) => <ForgotPassword {...props} />}
        />
        <Route path="*" component={errorPage} />
    </Switch>
);

export default routes;
