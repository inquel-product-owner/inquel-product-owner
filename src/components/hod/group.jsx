import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import Select from "react-select";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import SubjectTable from "../table/subjectTable";
import Paginations from "../sharedComponents/pagination";

class SubjectModal extends Component {
    constructor() {
        super();
        this.state = {
            subjectName: "",
            teacher_id: "",
            teacherData: [],
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        fetch(`${this.url}/hod/teacher/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        teacherData: result.data,
                    });
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${url}/hod/create/subject/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                subject_name: this.state.subjectName,
                group_id: this.props.groupId,
                teacher_id: this.state.teacher_id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                    this.props.formSubmission(true);
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleInput = (event) => {
        this.setState({
            subjectName: event.target.value,
        });
    };

    handleTeacher = (event) => {
        this.setState({
            teacher_id: event.value.toString(),
        });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Create Subject</Modal.Header>
                <Modal.Body>
                    <Alert
                        variant="danger"
                        show={this.state.showErrorAlert}
                        onClose={() => {
                            this.setState({
                                showErrorAlert: false,
                            });
                        }}
                        dismissible
                    >
                        {this.state.errorMsg}
                    </Alert>
                    <Alert
                        variant="success"
                        show={this.state.showSuccessAlert}
                        onClose={() => {
                            this.setState({
                                showSuccessAlert: false,
                            });
                        }}
                        dismissible
                    >
                        {this.state.successMsg}
                    </Alert>
                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="form-group">
                            <label htmlFor="subject">Subject name</label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                className="form-control borders"
                                placeholder="Enter subject name"
                                onChange={this.handleInput}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="teacher_id">Teacher</label>
                            <Select
                                className="basic-single borders"
                                placeholder="Select teacher"
                                isSearchable={true}
                                name="teacher_id"
                                id="teacher_id"
                                options={this.state.teacherData.map((list) => {
                                    return {
                                        value: list.id,
                                        label:
                                            list.full_name !== ""
                                                ? list.full_name
                                                : list.username,
                                    };
                                })}
                                onChange={this.handleTeacher}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-sm btn-block">
                                {this.state.showLoader ? (
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="mr-2"
                                    />
                                ) : (
                                    ""
                                )}
                                Create Subject
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            groupItems: [],
            subjectItems: [],
            activeSubjectPage: 1,
            totalSubjectCount: 0,
            page_loading: true,
            is_formSubmited: false,
        };
        this.groupId = this.props.match.params.groupId;
        this.url = baseUrl + hodUrl;
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    loadSubjectData = () => {
        fetch(`${this.url}/hod/group/${this.groupId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    groupItems: result.data,
                    subjectItems: result.data.subjects,
                    totalSubjectCount: result.data.subjects.length,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.loadSubjectData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_formSubmited !== this.state.is_formSubmited &&
            this.state.is_formSubmited === true
        ) {
            this.loadSubjectData();
            this.setState({
                is_formSubmited: false,
            });
        }

        if (prevState.activeSubjectPage !== this.state.activeSubjectPage) {
            this.loadSubjectData();
            this.setState({
                page_loading: true,
            });
        }
    };

    formSubmission = (is_formSubmited) => {
        if (is_formSubmited) {
            this.setState({
                is_formSubmited: true,
            });
            setTimeout(() => {
                this.setState({
                    showModal: false,
                });
            }, 1000);
        }
    };

    handleSubjectPageChange(pageNumber) {
        this.setState({ activeSubjectPage: pageNumber });
    }

    render() {
        document.title =
            this.state.groupItems.length !== 0
                ? this.state.groupItems.group_name + " - HOD | IQLabs"
                : "Group - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.groupItems.group_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Add Subject modal */}
                {this.state.showModal ? (
                    <SubjectModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        groupId={this.groupId}
                        formSubmission={this.formSubmission}
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
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        <div className="row align-items-center mb-3 mt-2">
                            <div className="col-3">
                                <h5 className="primary-text">
                                    {this.state.groupItems.group_name} - {this.state.groupItems.level}
                                </h5>
                            </div>
                            <div className="col-9 text-right">
                                <Link
                                    to={`/hod/group/${this.props.match.params.groupId}/student`}
                                >
                                    <button className="btn btn-primary btn-sm mr-2">
                                        Student
                                    </button>
                                </Link>
                                <Link
                                    to={`/hod/group/${this.props.match.params.groupId}/teacher`}
                                >
                                    <button className="btn btn-primary btn-sm mr-2">
                                        Teacher
                                    </button>
                                </Link>
                                <Link
                                    to={`/hod/group/${this.props.match.params.groupId}/details`}
                                >
                                    <button className="btn btn-primary btn-sm">
                                        Configuration
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Subjects</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <button
                                            className="btn btn-primary btn-sm mr-2"
                                            onClick={this.toggleModal}
                                        >
                                            Add new
                                        </button>
                                        <button className="btn btn-primary btn-sm mr-2">
                                            Delete
                                        </button>
                                        <button className="btn btn-primary btn-sm mr-2">
                                            Enable
                                        </button>
                                        <button className="btn btn-primary btn-sm">
                                            Disable
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <SubjectTable
                                subjectItems={this.state.subjectItems}
                                path="hod"
                            />
                            <div className="card-body p-3">
                                {this.state.totalSubjectCount >= 10 ? (
                                    <Paginations
                                        activePage={
                                            this.state.activeSubjectPage
                                        }
                                        totalItemsCount={
                                            this.state.totalSubjectCount
                                        }
                                        onChange={this.handleSubjectPageChange.bind(
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

export default Group;
