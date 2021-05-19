import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import courseimg from "../../assets/code.jpg";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/globalValues.js";
import Loading from "../sharedComponents/loader";
import GroupTable from "../table/group";
import SubjectTable from "../table/subject";
import Paginations from "../sharedComponents/pagination";
import AlertBox from "../sharedComponents/alert";
import {
    ContentDisableModal,
    ContentEnableModal,
    MultiContentDeleteModal,
} from "../sharedComponents/contentManagementModal";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    data: state.user.profile,
});

class SubjectModal extends Component {
    constructor() {
        super();
        this.state = {
            subjectName: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
    }

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
        });

        fetch(`${url}/hod/create/subject/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                subject_name: this.state.subjectName,
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
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubject = (event) => {
        this.setState({
            subjectName: event.target.value,
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

                        <label htmlFor="subject">Subject name</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="form-control borders"
                            onChange={this.handleSubject}
                            placeholder="Enter subject name"
                            required
                        />
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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectModalShow: false,
            showGroup_DeleteModal: false,
            showSubject_DeleteModal: false,
            showSubject_DisableModal: false,
            showSubject_EnableModal: false,

            groupItems: [],
            subjectItems: [],
            selectedSubject: [],
            selectedGroup: [],

            activeGroupPage: 1,
            totalGroupCount: 0,
            activeSubjectPage: 1,
            totalSubjectCount: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
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

    handleSubjectAdd = () => {
        this.setState({
            subjectModalShow: !this.state.subjectModalShow,
        });
    };

    loadGroupData = () => {
        fetch(`${this.url}/hod/groups/?page=${this.state.activeGroupPage}`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        groupItems: result.data.results,
                        totalGroupCount: result.data.count,
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

    loadSubjectData = () => {
        fetch(
            `${this.url}/hod/subjects/?page=${this.state.activeSubjectPage}`,
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
                        subjectItems: result.data.results,
                        totalSubjectCount: result.data.count,
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
        document.title = "Dashboard - HOD | IQLabs";

        this.loadGroupData();
        this.loadSubjectData();
    };

    handleDelete = (type) => {
        if (type === "group") {
            this.setState({
                showGroup_DeleteModal: !this.state.showGroup_DeleteModal,
            });
        } else if (type === "subject") {
            this.setState({
                showSubject_DeleteModal: !this.state.showSubject_DeleteModal,
            });
        }
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

    groupFormSubmission = () => {
        setTimeout(() => {
            this.setState({
                showGroup_DeleteModal: false,
            });
        }, 1000);
        this.loadGroupData();
    };

    subjectFormSubmission = () => {
        setTimeout(() => {
            this.setState({
                subjectModalShow: false,
                showSubject_DeleteModal: false,
                showSubject_DisableModal: false,
                showSubject_EnableModal: false,
            });
        }, 1000);
        this.loadSubjectData();
    };

    // Gets group ID from the group table
    handleGroupId = (data) => {
        let value = [];
        const groupItems = this.state.groupItems;
        for (let i = 0; i < groupItems.length; i++) {
            if (data.includes(groupItems[i].id.toString())) {
                value.push({
                    id: groupItems[i].id.toString(),
                    name: groupItems[i].group_name,
                });
            } else {
                continue;
            }
        }
        this.setState({
            selectedGroup: value,
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

    handleGroupPageChange(pageNumber) {
        this.setState(
            { activeGroupPage: pageNumber, page_loading: true },
            () => {
                this.loadGroupData();
            }
        );
    }

    handleSubjectPageChange(pageNumber) {
        this.setState(
            { activeSubjectPage: pageNumber, page_loading: true },
            () => {
                this.loadSubjectData();
            }
        );
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Dashboard" togglenav={this.toggleSideNav} />

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

                {/* Group Delete Modal */}
                {this.state.showGroup_DeleteModal ? (
                    <MultiContentDeleteModal
                        show={this.state.showGroup_DeleteModal}
                        onHide={() => this.handleDelete("group")}
                        toggleModal={() => this.handleDelete("group")}
                        formSubmission={this.groupFormSubmission}
                        url={`${this.url}/hod/create/group/`}
                        data={this.state.selectedGroup}
                        field="group_ids"
                        type="Group"
                    />
                ) : (
                    ""
                )}

                {/* Subject create modal */}
                <SubjectModal
                    show={this.state.subjectModalShow}
                    onHide={this.handleSubjectAdd}
                    formSubmission={this.subjectFormSubmission}
                />

                {/* Subject Delete Modal */}
                {this.state.showSubject_DeleteModal ? (
                    <MultiContentDeleteModal
                        show={this.state.showSubject_DeleteModal}
                        onHide={() => this.handleDelete("subject")}
                        toggleModal={() => this.handleDelete("subject")}
                        formSubmission={this.subjectFormSubmission}
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
                        formSubmission={this.subjectFormSubmission}
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
                        formSubmission={this.subjectFormSubmission}
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
                        {/* ----- Welcome ----- */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body text-center p-4">
                                <h3 className="primary-text mb-0">
                                    WELCOME BACK
                                </h3>
                            </div>
                        </div>

                        {/* ----- Group card ----- */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <h5>Groups</h5>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Link to="/hod/group">
                                            <button className="btn btn-primary btn-sm shadow-none mr-1">
                                                Group Configuration
                                            </button>
                                        </Link>
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={() =>
                                                this.handleDelete("group")
                                            }
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <GroupTable
                                groupItems={this.state.groupItems}
                                path="hod"
                                view={true}
                                check={true}
                                handleGroupId={this.handleGroupId}
                            />
                            <div className="card-body p-3">
                                {this.state.totalGroupCount >
                                paginationCount ? (
                                    <Paginations
                                        activePage={this.state.activeGroupPage}
                                        totalItemsCount={
                                            this.state.totalGroupCount
                                        }
                                        onChange={this.handleGroupPageChange.bind(
                                            this
                                        )}
                                    />
                                ) : null}
                            </div>
                        </div>

                        {this.props.data !== null ? (
                            this.props.data.permissions !== undefined ? (
                                this.props.data.permissions.config_course ===
                                true ? (
                                    <>
                                        {/* ----- Subject card ----- */}
                                        <div className="card shadow-sm mb-4">
                                            <div className="card-header">
                                                <div className="row align-items-center">
                                                    <div className="col-md-3">
                                                        <h5>Subjects</h5>
                                                    </div>
                                                    <div className="col-md-9 text-right">
                                                        <button
                                                            className="btn btn-primary btn-sm shadow-none mr-1"
                                                            onClick={
                                                                this
                                                                    .handleSubjectAdd
                                                            }
                                                        >
                                                            Add new
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-sm shadow-none mr-1"
                                                            onClick={() =>
                                                                this.handleDelete(
                                                                    "subject"
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-sm shadow-none mr-1"
                                                            onClick={
                                                                this
                                                                    .handleEnable
                                                            }
                                                        >
                                                            Enable
                                                        </button>
                                                        <button
                                                            className="btn btn-primary btn-sm shadow-none"
                                                            onClick={
                                                                this
                                                                    .handleDisable
                                                            }
                                                        >
                                                            Disable
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <SubjectTable
                                                subjectItems={
                                                    this.state.subjectItems
                                                }
                                                path="hod"
                                                status={true}
                                                handleSubjectId={
                                                    this.handleSubjectId
                                                }
                                            />
                                            <div className="card-body p-3">
                                                {this.state.totalSubjectCount >
                                                paginationCount ? (
                                                    <Paginations
                                                        activePage={
                                                            this.state
                                                                .activeSubjectPage
                                                        }
                                                        totalItemsCount={
                                                            this.state
                                                                .totalSubjectCount
                                                        }
                                                        onChange={this.handleSubjectPageChange.bind(
                                                            this
                                                        )}
                                                    />
                                                ) : null}
                                            </div>
                                        </div>

                                        {/* ----- Course card ----- */}
                                        <div className="card shadow-sm mb-4">
                                            <div className="card-header">
                                                <div className="row align-items-center">
                                                    <div className="col-md-3">
                                                        <h5>Course</h5>
                                                    </div>
                                                    <div className="col-md-9 text-right">
                                                        <button className="btn btn-primary btn-sm shadow-none mr-1">
                                                            Delete
                                                        </button>
                                                        <button className="btn btn-primary btn-sm shadow-none mr-1">
                                                            Enable
                                                        </button>
                                                        <button className="btn btn-primary btn-sm shadow-none">
                                                            Disable
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row justify-content-center">
                                                    <div className="col-md-11">
                                                        <div className="row">
                                                            <div className="col-md-4 mb-3">
                                                                <Link
                                                                    to="/hod"
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="card"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                courseimg
                                                                            }
                                                                            className="card-img-top"
                                                                            alt="Course"
                                                                        />
                                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                                            Course
                                                                            01
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-4 mb-3">
                                                                <Link
                                                                    to="/hod"
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="card"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                courseimg
                                                                            }
                                                                            className="card-img-top"
                                                                            alt="Course"
                                                                        />
                                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                                            Course
                                                                            02
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                            <div className="col-md-4 mb-3">
                                                                <Link
                                                                    to="/hod"
                                                                    style={{
                                                                        textDecoration:
                                                                            "none",
                                                                    }}
                                                                >
                                                                    <div
                                                                        className="card"
                                                                        style={{
                                                                            cursor: "pointer",
                                                                        }}
                                                                    >
                                                                        <img
                                                                            src={
                                                                                courseimg
                                                                            }
                                                                            className="card-img-top"
                                                                            alt="Course"
                                                                        />
                                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                                            Course
                                                                            03
                                                                        </div>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    ""
                                )
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}

                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Dashboard);
