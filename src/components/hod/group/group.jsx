import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import Header from "../navbar";
import SideNav from "../sidenav";
import Select from "react-select";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import { paginationCount } from "../../../shared/globalValues.js";
import Loading from "../../sharedComponents/loader";
import SubjectTable from "../../table/subjectTable";
import Paginations from "../../sharedComponents/pagination";
import AlertBox from "../../sharedComponents/alert";
import {
    ContentDisableModal,
    ContentEnableModal,
    MultiContentDeleteModal,
} from "../../sharedComponents/contentManagementModal";

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
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
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

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${this.url}/hod/create/subject/`, {
            headers: this.headers,
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
                    this.props.formSubmission();
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
                <form onSubmit={this.handleSubmit} autoComplete="off">
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
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary btn-block shadow-none">
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
                    </Modal.Footer>
                </form>
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
            showSubject_DeleteModal: false,
            showSubject_DisableModal: false,
            showSubject_EnableModal: false,

            groupItems: [],
            subjectItems: [],
            selectedSubject: [],
            activeSubjectPage: 1,
            totalSubjectCount: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
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
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        groupItems: result.data,
                        subjectItems: result.data.subjects,
                        totalSubjectCount: result.data.subjects.length,
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
        this.loadSubjectData();
    };

    handleDelete = () => {
        this.setState({
            showSubject_DeleteModal: !this.state.showSubject_DeleteModal,
        });
    };

    handleDisable = () => {
        this.setState({
            showSubject_DisableModal: !this.state.showSubject_DisableModal,
        });
    };

    handleEnable = () => {
        this.setState({
            showSubject_EnableModal: !this.state.showSubject_EnableModal,
        });
    };

    // Gets Subject ID from the Subject table
    handleSubjectId = (data) => {
        let value = [];
        const subjectItems = this.state.subjectItems;
        for (let i = 0; i < subjectItems.length; i++) {
            if (data.includes(subjectItems[i].id.toString())) {
                value.push({
                    id: subjectItems[i].id.toString(),
                    name: subjectItems[i].subject_name,
                });
            } else {
                continue;
            }
        }
        this.setState({
            selectedSubject: value,
        });
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showModal: false,
                showSubject_DeleteModal: false,
                showSubject_DisableModal: false,
                showSubject_EnableModal: false,
            });
            this.loadSubjectData();
        }, 1000);
    };

    handleSubjectPageChange(pageNumber) {
        this.setState(
            { activeSubjectPage: pageNumber, page_loading: true },
            () => {
                this.loadSubjectData();
            }
        );
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

                {/* ALert message */}
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

                {/* Subject create modal */}
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

                {/* Subject Delete Modal */}
                {this.state.showSubject_DeleteModal ? (
                    <MultiContentDeleteModal
                        show={this.state.showSubject_DeleteModal}
                        onHide={this.handleDelete}
                        toggleModal={this.handleDelete}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/create/subject/`}
                        data={this.state.selectedSubject}
                        field="subject_ids"
                        type="Subject"
                    />
                ) : (
                    ""
                )}

                {/* Subject Disable Modal */}
                {this.state.showSubject_DisableModal ? (
                    <ContentDisableModal
                        show={this.state.showSubject_DisableModal}
                        onHide={this.handleDisable}
                        toggleModal={this.handleDisable}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/create/subject/`}
                        data={this.state.selectedSubject}
                        field="subject_ids"
                        type="Subject"
                    />
                ) : (
                    ""
                )}

                {/* Subject Enable Modal */}
                {this.state.showSubject_EnableModal ? (
                    <ContentEnableModal
                        show={this.state.showSubject_EnableModal}
                        onHide={this.handleEnable}
                        toggleModal={this.handleEnable}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/create/subject/`}
                        data={this.state.selectedSubject}
                        field="subject_ids"
                        type="Subject"
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
                            <div className="col-6">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/hod">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            <span>Group:</span>
                                            {
                                                this.state.groupItems.group_name
                                            } - {this.state.groupItems.level}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-6 text-right">
                                <Link to={`${this.props.match.url}/student`}>
                                    <button className="btn btn-primary btn-sm shadow-none mr-1">
                                        Student
                                    </button>
                                </Link>
                                <Link to={`${this.props.match.url}/teacher`}>
                                    <button className="btn btn-primary btn-sm shadow-none mr-1">
                                        Teacher
                                    </button>
                                </Link>
                                <Link to={`${this.props.match.url}/details`}>
                                    <button className="btn btn-primary btn-sm shadow-none">
                                        Configuration
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5 className="mb-0">Subjects</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <button
                                            className="btn btn-primary btn-sm shadow-none mr-1"
                                            onClick={this.toggleModal}
                                        >
                                            Add new
                                        </button>
                                        <button
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
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleDisable}
                                        >
                                            Disable
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <SubjectTable
                                subjectItems={this.state.subjectItems}
                                path={`hod/group/${this.groupId}`}
                                status={true}
                                handleSubjectId={this.handleSubjectId}
                            />
                            <div className="card-body p-3">
                                {this.state.totalSubjectCount >
                                paginationCount ? (
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
