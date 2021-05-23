import React, { Component } from "react";
import { Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Link } from "react-router-dom";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/globalValues.js";
import Loading from "../sharedComponents/loader";
import Paginations from "../sharedComponents/pagination";
import StudentTable from "../table/student";
import AlertBox from "../sharedComponents/alert";
import {
    UserDeleteModal,
    UserDisableModal,
    UserEnableModal,
} from "../sharedComponents/userManagementModal";

const mapStateToProps = (state) => ({
    group_name: state.content.group_name,
});

class TeacherGroupStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupItem: [],
            studentItem: [],
            selectedStudent: [],
            activeStudentPage: 1,
            totalStudentCount: 0,

            showStudent_DeleteModal: false,
            showStudent_DisableModal: false,
            showStudent_EnableModal: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    toggleStudentModal = () => {
        this.setState({
            showStudentModal: !this.state.showStudentModal,
        });
    };

    loadStudentData = () => {
        fetch(
            `${this.url}/teacher/student/?group=${this.props.match.params.groupId}&page=${this.state.activeStudentPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        studentItem: result.data.results,
                        totalStudentCount: result.data.count,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.loadStudentData();
    };

    handleDelete = () => {
        this.setState({
            showStudent_DeleteModal: !this.state.showStudent_DeleteModal,
        });
    };

    handleDisable = () => {
        this.setState({
            showStudent_DisableModal: !this.state.showStudent_DisableModal,
        });
    };

    handleEnable = () => {
        this.setState({
            showStudent_EnableModal: !this.state.showStudent_EnableModal,
        });
    };

    // Gets Student ID from the Student table
    handleStudentId = (data) => {
        let value = [];
        const studentItems = this.state.studentItem;
        for (let i = 0; i < studentItems.length; i++) {
            if (data.includes(studentItems[i].id.toString())) {
                value.push({
                    id: studentItems[i].id.toString(),
                    username: studentItems[i].username,
                });
            } else {
                continue;
            }
        }
        this.setState({
            selectedStudent: value,
        });
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                is_formSubmited: true,
                showStudent_DeleteModal: false,
                showStudent_DisableModal: false,
                showStudent_EnableModal: false,
            });
            this.loadStudentData();
        }, 1000);
    };

    handleStudentPageChange(pageNumber) {
        this.setState(
            { activeStudentPage: pageNumber, page_loading: true },
            () => {
                this.loadStudentData();
            }
        );
    }

    render() {
        document.title =
            this.state.groupItem.length !== 0
                ? this.state.groupItem.group_name +
                  " Student List - Teacher | IQLabs"
                : "Group Student List - Teacher | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.groupItem.group_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Alert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={() => {
                        this.setState({
                            showSuccessAlert: false,
                        });
                    }}
                    toggleErrorAlert={() => {
                        this.setState({
                            showErrorAlert: false,
                        });
                    }}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Student Delete Modal */}
                {this.state.showStudent_DeleteModal ? (
                    <UserDeleteModal
                        show={this.state.showStudent_DeleteModal}
                        onHide={this.handleDelete}
                        toggleModal={this.handleDelete}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/teacher/group/${this.groupId}/student/`}
                        data={this.state.selectedStudent}
                        field="student_ids"
                        type="Student"
                        token="Authorization"
                    />
                ) : (
                    ""
                )}

                {/* Student Disable Modal */}
                {this.state.showStudent_DisableModal ? (
                    <UserDisableModal
                        show={this.state.showStudent_DisableModal}
                        onHide={this.handleDisable}
                        toggleModal={this.handleDisable}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/teacher/group/${this.groupId}/student/`}
                        data={this.state.selectedStudent}
                        field="student_ids"
                        type="Student"
                        token="Authorization"
                    />
                ) : (
                    ""
                )}

                {/* Student Enable Modal */}
                {this.state.showStudent_EnableModal ? (
                    <UserEnableModal
                        show={this.state.showStudent_EnableModal}
                        onHide={this.handleEnable}
                        toggleModal={this.handleEnable}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/teacher/group/${this.groupId}/student/`}
                        data={this.state.selectedStudent}
                        field="student_ids"
                        type="Student"
                        token="Authorization"
                    />
                ) : (
                    ""
                )}

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Filter area */}
                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                {/* ----- Breadcrumb ----- */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/teacher">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to="#"
                                                onClick={
                                                    this.props.history.goBack
                                                }
                                            >
                                                {this.props.group_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Student Profiles
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex flex-wrap justify-content-end">
                                    {/* <button
                                        className="btn btn-primary btn-sm shadow-none mr-1"
                                        onClick={this.handleDelete}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm shadow-none mr-1"
                                        onClick={this.handleEnable}
                                    >
                                        Enable
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm shadow-none mr-1"
                                        onClick={this.handleDisable}
                                    >
                                        Disable
                                    </button> */}
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="primary"
                                            id="dropdown-basic"
                                            className="btn-sm shadow-none"
                                        >
                                            Notify
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item>
                                                Notify All
                                            </Dropdown.Item>
                                            <div className="dropdown-divider"></div>
                                            <Dropdown.Item>
                                                Notify Selected
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>

                        {/* Student list */}
                        <div className="card shadow-sm">
                            <StudentTable
                                studentItems={this.state.studentItem}
                                path={`teacher/group/${this.groupId}`}
                                handleStudentId={this.handleStudentId}
                            />
                            <div className="card-body p-3">
                                {this.state.totalStudentCount >
                                paginationCount ? (
                                    <Paginations
                                        activePage={
                                            this.state.activeStudentPage
                                        }
                                        totalItemsCount={
                                            this.state.totalStudentCount
                                        }
                                        onChange={this.handleStudentPageChange.bind(
                                            this
                                        )}
                                    />
                                ) : null}
                            </div>
                        </div>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(TeacherGroupStudents);
