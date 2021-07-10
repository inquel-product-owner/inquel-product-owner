import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// -------------------- Landing page Imports --------------------

import Home from "./home";
import Features from "./home/features";
import Catalog from "./home/catalog";
import Cart from "./home/cart";
import Checkout from "./home/checkout";
import HomeLeaderboard from "./home/leaderBoard";

// -------------------- Admin Imports --------------------

import AdminDashboard from "./admin/dashboard";
import AdminLogin from "./admin/login";
import AdminStatistics from "./admin/statistics";

import AdminHODAndStudentList from "./admin/profileList";
import AdminStudentProfile from "./admin/studentProfile";

import AdminHodProfile from "./admin/hod/profile";
import AdminHodTeacherList from "./admin/hod/teacherList";
import AdminHodStudentList from "./admin/hod/studentList";
import AdminHodStudentProfile from "./admin/hod/studentProfile";
import AdminHODGroup from "./admin/hod/group";

import AdminDiscountConfiguration from "./admin/discountConfiguration";
import AdminMasterData from "./admin/masterData";

import AdminSettings from "./admin/settings/";

// -------------------- HOD Imports --------------------

import HODLogin from "./hod/login";
import HODDashboard from "./hod/dashboard";
import HODProfile from "./hod/profile";
import HODSettings from "./hod/settings/";

import HODGroup from "./hod/group/group";
import HODGroupSubject from "./hod/group/subject";
import HODGroupConfiguration from "./hod/group/configuration";
import HODGroupDetails from "./hod/group/details";
import HODGroupStudents from "./hod/group/student";
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
import HODNotification from "./hod/notification";

// -------------------- Teacher Imports --------------------

import TeacherDashboard from "./teacher/dashboard";
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
import TeacherSettings from "./teacher/settings/";
import TeacherNotification from "./teacher/notification";

// -------------------- Student Imports --------------------

import Dashboard from "./student/dashboard";
import Leaderboard from "./student/leaderBoard";

import Group from "./student/group/group";
import Subject from "./student/group/subject";

import Subscription from "./student/course/subscription";
import Course from "./student/course/course";
import CourseSummary from "./student/course/summary";
import CourseNotes from "./student/course/notes";
import CourseFavourites from "./student/course/favourites";
import CoursePersonalNotes from "./student/course/personalNotes";

import Summary from "./student/group/summary";
import Notes from "./student/group/notes";
import PersonalNotes from "./student/group/personalNotes";
import Favourites from "./student/group/favourites";
import FavouritesFlashcard from "./student/flashcard/bookmarkFlashcard";
import FlashCard from "./student/flashcard/learnFlashCard";

import CycleTest from "./student/cycle/";
import CycleDirectExam from "./student/cycle/directExam";
import CycleAutoExam from "./student/cycle/autoExam";

import SemesterExam from "./student/semester";
import SemesterDirectExam from "./student/semester/directExam";
import SemesterAutoExam from "./student/semester/autoExam";

import Quiz from "./student/quiz/quiz";
import QuizLevelExam from "./student/quiz/levelExam";

import TestResult from "./student/testResult";
import TestPreview from "./student/testPreview";

import EmailVerify from "./student/emailVerification";
import StudentLogin from "./student/login";
import StudentRegister from "./student/register";
import Profile from "./student/profile";
import StudentSettings from "./student/settings/";

import StudyPlanner from "./student/study-planner/";
import StudentNotification from "./student/notification";

// -------------------- General Imports --------------------

import { ForgotPassword } from "./common/forgotPassword";
import errorPage from "./home/404";

const routes = (
    <Switch>
        {/* -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-= Landing page Routes =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- */}

        <Route exact path="/" component={Home} />
        <Route exact path="/features" component={Features} />
        <Route
            exact
            path="/catalog"
            component={(props) => <Catalog {...props} />}
        />
        <Route
            exact
            path="/catalog/:category"
            component={(props) => <Catalog {...props} />}
        />
        <Route
            exact
            path="/cart"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login?redirect=/cart" />
                ) : (
                    <Cart {...props} />
                )
            }
        />
        <Route
            exact
            path="/checkout/:subscriptionId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Checkout {...props} />
                )
            }
        />
        <Route exact path="/leaderboard" component={HomeLeaderboard} />

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
            path="/admin/statistics"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminStatistics {...props} />
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
            exact
            path="/admin/hod/:hodId/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminHODGroup {...props} />
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
            exact
            path="/admin/settings"
            render={(props) =>
                !localStorage.getItem("Inquel-Auth") ? (
                    <Redirect to="/admin/login" />
                ) : (
                    <AdminSettings {...props} />
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
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODDashboard {...props} />
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
                    <HODStudentProfile {...props} />
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

        {/* --------------- Notification --------------- */}

        <Route
            exact
            path="/hod/notification"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODNotification {...props} />
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
            path="/hod/settings"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_hod") ? (
                    <Redirect to="/hod/login" />
                ) : (
                    <HODSettings {...props} />
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
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherDashboard {...props} />
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

        {/* --------------- Notification --------------- */}

        <Route
            exact
            path="/teacher/notification"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherNotification {...props} />
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
            path="/teacher/settings"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_teacher") ? (
                    <Redirect to="/teacher/login" />
                ) : (
                    <TeacherSettings {...props} />
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
            path="/dashboard"
            render={() =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Dashboard />
                )
            }
        />
        <Route
            exact
            path="/dashboard/profile"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Profile {...props} />
                )
            }
        />

        {/* --------------- Group subject --------------- */}

        <Route
            exact
            path="/dashboard/group/:groupId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Group {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Subject {...props} />
                )
            }
        />

        {/* --------------- Personal notes & Favourites --------------- */}

        <Route
            exact
            path="/dashboard/subject/:subjectId/personal-notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <PersonalNotes {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/favourites"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Favourites {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/favourites/:chapterId/:topicNum/:type"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <FavouritesFlashcard {...props} />
                )
            }
        />

        {/* --------------- Summary & Notes --------------- */}

        <Route
            exact
            path="/dashboard/subject/:subjectId/chapter/:chapterId/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Summary {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/chapter/:chapterId/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Notes {...props} />
                )
            }
        />

        {/* --------------- Flashcard --------------- */}

        <Route
            exact
            path="/dashboard/subject/:subjectId/chapter/:chapterId/:topicNum/learn"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <FlashCard {...props} />
                )
            }
        />

        {/* --------------- Cycle test --------------- */}

        <Route
            exact
            path="/dashboard/subject/:subjectId/chapter/:chapterId/cycle/:cycleTestId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CycleTest {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/chapter/:chapterId/cycle/:cycleTestId/auto"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CycleAutoExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/chapter/:chapterId/cycle/:cycleTestId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CycleDirectExam {...props} />
                )
            }
        />

        {/* --------------- Quiz --------------- */}

        <Route
            exact
            path="/dashboard/subject/:subjectId/chapter/:chapterId/quiz/:quizId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Quiz {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/chapter/:chapterId/quiz/:quizId/level/:levelId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <QuizLevelExam {...props} />
                )
            }
        />

        {/* --------------- Semester exam --------------- */}

        <Route
            exact
            path="/dashboard/subject/:subjectId/semester/:semesterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <SemesterExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/semester/:semesterId/auto"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <SemesterAutoExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/semester/:semesterId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <SemesterDirectExam {...props} />
                )
            }
        />

        {/* --------------- Test result & Preview --------------- */}

        <Route
            exact
            path="/dashboard/subject/:subjectId/results"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <TestResult {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/results/cycle/:cycleTestId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <TestPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subject/:subjectId/results/semester/:semesterId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <TestPreview {...props} />
                )
            }
        />

        {/* --------------- Subscription courses --------------- */}

        <Route
            exact
            path="/dashboard/subscription/:subscriptionId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Subscription {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Course {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/personal-notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CoursePersonalNotes {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/favourites"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CourseFavourites {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/favourites/:chapterId/:topicNum/:type"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <FavouritesFlashcard {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/chapter/:chapterId/summary"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CourseSummary {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/chapter/:chapterId/notes"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CourseNotes {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/chapter/:chapterId/:topicNum/learn"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <FlashCard {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/chapter/:chapterId/cycle/:cycleTestId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CycleTest {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/chapter/:chapterId/cycle/:cycleTestId/auto"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CycleAutoExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/chapter/:chapterId/cycle/:cycleTestId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <CycleDirectExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/chapter/:chapterId/quiz/:quizId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Quiz {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/chapter/:chapterId/quiz/:quizId/level/:levelId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <QuizLevelExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/semester/:semesterId"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <SemesterExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/semester/:semesterId/auto"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <SemesterAutoExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/semester/:semesterId/direct"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <SemesterDirectExam {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/results"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <TestResult {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/results/cycle/:cycleTestId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <TestPreview {...props} />
                )
            }
        />
        <Route
            exact
            path="/dashboard/subscription/:subscriptionId/course/:courseId/results/semester/:semesterId/preview"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <TestPreview {...props} />
                )
            }
        />

        {/* --------------- Leaderboard --------------- */}

        <Route
            exact
            path="/dashboard/leaderboard"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <Leaderboard {...props} />
                )
            }
        />

        {/* --------------- Study Planner --------------- */}

        <Route
            exact
            path="/dashboard/study-planner"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <StudyPlanner {...props} />
                )
            }
        />

        {/* --------------- Notification --------------- */}

        <Route
            exact
            path="/dashboard/notification"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <StudentNotification {...props} />
                )
            }
        />

        {/* --------------- Login, Registration, Verification routings --------------- */}

        <Route
            exact
            path="/dashboard/settings"
            render={(props) =>
                !localStorage.getItem("Authorization") ||
                !localStorage.getItem("is_student") ? (
                    <Redirect to="/login" />
                ) : (
                    <StudentSettings {...props} />
                )
            }
        />
        <Route
            exact
            path="/login"
            render={(props) =>
                localStorage.getItem("Authorization") &&
                localStorage.getItem("is_student") ? (
                    <Redirect to="/dashboard" />
                ) : (
                    <StudentLogin {...props} />
                )
            }
        />
        <Route
            exact
            path="/register"
            render={() =>
                localStorage.getItem("Authorization") &&
                localStorage.getItem("is_student") ? (
                    <Redirect to="/dashboard" />
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
