import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

class ChapterModal extends Component {
    constructor() {
        super();
        this.state = {
            chapter_name: "",
            chapter_status: "",
            status: [],
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    status: result.data.chapter_status.chapters,
                });
                console.log(result);
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

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                chapter_name: this.state.chapter_name,
                chapter_status: this.state.chapter_status,
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

    handleCourse = (event) => {
        this.setState({
            chapter_name: event.target.value,
        });
    };

    handleStatus = (event) => {
        this.setState({
            chapter_status: event.target.value,
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
                <Modal.Header closeButton>Add chapter</Modal.Header>
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
                            <input
                                type="text"
                                name="chapter"
                                className="form-control borders"
                                onChange={this.handleCourse}
                                placeholder="Chapter name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <select
                                name="status"
                                className="form-control borders"
                                onChange={this.handleStatus}
                                required
                            >
                                <option value="">Select an option</option>
                                {this.state.status.map((list, index) => {
                                    return (
                                        <option value={list} key={index}>
                                            {list}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block mt-2">
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
                                Add
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class SubjectChapters extends Component {
    constructor() {
        super();
        this.state = {
            showSideNav: false,
            showModal: false,
            subjectItems: [],
            page_loading: true,
            is_formSubmitted: false,
        };
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    loadChapterData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.props.match.params.subjectId}/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    subjectItems: result.data.results,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.loadChapterData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_formSubmitted !== this.state.is_formSubmitted &&
            this.state.is_formSubmitted === true
        ) {
            this.loadChapterData();
            this.setState({
                is_formSubmitted: false,
            });
        }
    };

    formSubmission = (is_formSubmitted) => {
        if (is_formSubmitted) {
            this.setState({
                is_formSubmitted: true,
            });
        }
    };

    render() {
        // document.title =
        //     this.state.subjectItems.length !== 0
        //         ? this.state.subjectItems.subject_name + " - Teacher | IQLabs"
        //         : "Subjects - Teacher | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    // name={this.state.subjectItems.subject_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Chapter modal */}
                {this.state.showModal ? (
                    <ChapterModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        formSubmission={this.formSubmission}
                        subjectId={this.props.match.params.subjectId}
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

                        {/* Header area */}
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <h5 className="primary-text">
                                    {/* {this.state.subjectItems.subject_name} */}
                                </h5>
                            </div>
                            <div className="col-md-10">
                                <div className="d-flex flex-wrap justify-content-end mb-4">
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Publish
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Download template
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Upload template
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-bg text-white">
                                        <tr>
                                            <th scope="col">
                                                Chapter structure
                                            </th>
                                            <th scope="col">Weightage</th>
                                            <th scope="col">Summary</th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                Add content
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.subjectItems.length !==
                                        0 ? (
                                            this.state.subjectItems.map(
                                                (list, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>
                                                                {
                                                                    list.chapter_name
                                                                }
                                                            </td>
                                                            <td>
                                                                {list.weightage}
                                                            </td>
                                                            <td>
                                                                <Link
                                                                    to={`/teacher/subject/${this.props.match.params.subjectId}/${list.chapter_name}/summary`}
                                                                    className="primary-text"
                                                                >
                                                                    <i className="fas fa-plus-circle fa-2x"></i>
                                                                </Link>
                                                            </td>
                                                            <td className="text-right">
                                                                <Link
                                                                    to={`/teacher/subject/${this.props.match.params.subjectId}/${list.chapter_name}`}
                                                                >
                                                                    <button className="btn btn-primary btn-sm">
                                                                        Add +
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                        </tr>
                                                    );
                                                }
                                            )
                                        ) : (
                                            <tr>
                                                <td>Data not available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-body">
                                <button
                                    className="btn btn-light btn-block shadow-sm"
                                    onClick={this.toggleModal}
                                >
                                    Add +
                                </button>
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

export default SubjectChapters;
