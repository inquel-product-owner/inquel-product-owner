import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import courseimg from "../../assets/code.jpg";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import GroupTable from "../table/groupTable";
import SubjectTable from "../table/subjectTable";
import Paginations from "../sharedComponents/pagination";

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
                <Modal.Header closeButton></Modal.Header>
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
                                onChange={this.handleSubject}
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

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectModalShow: false,
            groupItems: [],
            subjectItems: [],
            activeGroupPage: 1,
            totalGroupCount: 0,
            activeSubjectPage: 1,
            totalSubjectCount: 0,
            page_loading: true,
            is_formSubmited: false,
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

    addSubjectModal = () => {
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
                this.setState({
                    groupItems: result.data.results,
                    totalGroupCount: result.data.count,
                    page_loading: false,
                });
                console.log(result);
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
                this.setState({
                    subjectItems: result.data.results,
                    totalSubjectCount: result.data.count,
                    page_loading: false,
                });
                console.log(result);
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

        if (prevState.activeGroupPage !== this.state.activeGroupPage) {
            this.loadGroupData();
            this.setState({
                page_loading: true,
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
        }
    };

    handleGroupPageChange(pageNumber) {
        this.setState({ activeGroupPage: pageNumber });
    }

    handleSubjectPageChange(pageNumber) {
        this.setState({ activeSubjectPage: pageNumber });
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Dashboard" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Add Subject modal */}
                <SubjectModal
                    show={this.state.subjectModalShow}
                    onHide={this.addSubjectModal}
                    formSubmission={this.formSubmission}
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Welcome */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body text-center p-4">
                                <h3 className="primary-text mb-0">
                                    WELCOME BACK
                                </h3>
                            </div>
                        </div>

                        {/* Group card */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <h4>Groups</h4>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Link to="/hod/groups/configuration">
                                            <button className="btn btn-primary btn-sm mr-2">
                                                Add new
                                            </button>
                                        </Link>
                                        <button className="btn btn-primary btn-sm">
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
                            />
                            <div className="card-body p-3">
                                <Paginations
                                    activePage={this.state.activeGroupPage}
                                    totalItemsCount={this.state.totalGroupCount}
                                    onChange={this.handleGroupPageChange.bind(
                                        this
                                    )}
                                />
                            </div>
                        </div>

                        {/* Subject card */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h4>Subjects</h4>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <button
                                            className="btn btn-primary btn-sm mr-2"
                                            onClick={this.addSubjectModal}
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
                                <Paginations
                                    activePage={this.state.activeSubjectPage}
                                    totalItemsCount={
                                        this.state.totalSubjectCount
                                    }
                                    onChange={this.handleSubjectPageChange.bind(
                                        this
                                    )}
                                />
                            </div>
                        </div>

                        {/* Course card */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h4>Course</h4>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <button className="btn btn-primary btn-sm mr-2">
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
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-11">
                                        <div className="row">
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Course"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            Course 01
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Course"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            Course 02
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Course"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            Course 03
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default Dashboard;
