import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Card, Accordion, Modal, Alert, Spinner } from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Loading from "../sharedComponents/loader";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class TopicModal extends Component {
    constructor() {
        super();
        this.state = {
            topic_name: "",
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

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(
            `${this.url}/teacher/subject/${this.props.subjectId}/chapter/topics/`,
            {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify({
                    topic_name: this.state.topic_name,
                }),
            }
        )
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

    handleTopic = (event) => {
        this.setState({
            topic_name: event.target.value,
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
                <Modal.Header closeButton>Create topic</Modal.Header>
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
                                name="topic"
                                className="form-control borders"
                                onChange={this.handleTopic}
                                placeholder="Topic name"
                                required
                            />
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

class Chapters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            collapsed: false,
            chapterList: [],
            chapterName: "",
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
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

    toggleCollapse = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    componentDidMount = () => {
        this.setState({
            chapterName: this.props.match.params.chapterName,
        });

        fetch(`${this.url}/teacher/subject/${this.subjectId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    chapterList: result.data.results,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.match.params.chapterName !== this.state.chapterName) {
            this.setState({
                chapterName: this.props.match.params.chapterName,
            });
        }

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

    handleSelect = (event) => {
        this.props.history.push({
            pathname: `/teacher/subject/${this.subjectId}/${event.value}`,
        });
        this.setState({
            chapterName: event.value,
        });
    };

    render() {
        document.title = `${this.state.chapterName} - Teacher | IQLabs`;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject name" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Topic modal */}
                {this.state.showModal ? (
                    <TopicModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        formSubmission={this.formSubmission}
                        subjectId={this.subjectId}
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

                        <div className="row align-items-center mb-3">
                            <div className="col-md-4">
                                <Select
                                    className="basic-single"
                                    placeholder={this.state.chapterName}
                                    value={[]}
                                    isSearchable={true}
                                    name="chapter"
                                    options={this.state.chapterList.map(
                                        function (list) {
                                            return {
                                                value: list.chapter_name,
                                                label: list.chapter_name,
                                            };
                                        }
                                    )}
                                    onChange={this.handleSelect}
                                    required
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="d-flex flex-wrap justify-content-end">
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

                        {/* Course details */}
                        <div className="card shadow-sm mb-3">
                            <div className="card-header secondary-bg primary-text font-weight-bold">
                                <div className="row">
                                    <div className="col-md-5 mb-2 mb-md-0">
                                        Topic structure
                                    </div>
                                    <div className="col-md-7 small primary-text font-weight-bold">
                                        <div className="row">
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Notes
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Match
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Concept
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Type 1 Q
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Type 2 Q
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Next topic
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <Accordion defaultActiveKey="0">
                                    <Card>
                                        <Accordion.Toggle
                                            as={Card.Header}
                                            eventKey="0"
                                            className="secondary-bg"
                                            style={{ cursor: "pointer" }}
                                            onClick={this.toggleCollapse}
                                        >
                                            <div className="row align-items-center">
                                                <div className="col-md-4 mb-2 mb-md-0">
                                                    <div className="row align-items-center">
                                                        <div className="col-1">
                                                            <span>
                                                                {this.state
                                                                    .collapsed ? (
                                                                    <i className="fas fa-plus-circle"></i>
                                                                ) : (
                                                                    <i className="fas fa-minus-circle"></i>
                                                                )}
                                                            </span>
                                                        </div>
                                                        <div className="col-1 small font-weight-bold">
                                                            1
                                                        </div>
                                                        <div className="col-8 small font-weight-bold">
                                                            {
                                                                this.state
                                                                    .chapterName
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey="0">
                                            <Card className="pl-5">
                                                <Card.Header
                                                    className="my-2 small"
                                                    style={{
                                                        backgroundColor:
                                                            "#fff9f0",
                                                    }}
                                                >
                                                    <div className="row align-items-center">
                                                        <div className="col-md-5 mb-2 mb-md-0">
                                                            <div className="row">
                                                                <div className="col-md-2 col-3">
                                                                    1.1
                                                                </div>
                                                                <div className="col-md-10 col-9">
                                                                    Topic 01
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-7">
                                                            <div className="row align-items-center">
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link
                                                                        to={`/teacher/subject/${this.subjectId}/${this.props.match.params.chapterName}/arithmatic/notes`}
                                                                    >
                                                                        <button className="btn btn-sm btn-primary">
                                                                            <i className="fas fa-file-upload fa-sm"></i>
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link
                                                                        to={`/teacher/subject/${this.subjectId}/${this.props.match.params.chapterName}/arithmatic/concepts`}
                                                                    >
                                                                        <button className="btn btn-primary btn-sm">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link
                                                                        to={`/teacher/subject/${this.subjectId}/${this.props.match.params.chapterName}/arithmatic/type1`}
                                                                    >
                                                                        <button className="btn btn-primary btn-sm">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 text-center mb-2 mb-md-0">
                                                                    2.4
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Header>

                                                <Card.Header
                                                    className="small"
                                                    style={{
                                                        backgroundColor:
                                                            "#fff9f0",
                                                    }}
                                                >
                                                    <div className="row align-items-center">
                                                        <div className="col-md-5 mb-2 mb-md-0">
                                                            <div className="row">
                                                                <div className="col-md-2 col-3">
                                                                    1.1.1
                                                                </div>
                                                                <div className="col-md-10 col-9">
                                                                    Sub topic 01
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-7">
                                                            <div className="row align-items-center">
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link
                                                                        to={`/teacher/subject/${this.subjectId}/${this.props.match.params.chapterName}/arithmatic/notes`}
                                                                    >
                                                                        <button className="btn btn-sm btn-primary">
                                                                            <i className="fas fa-file-upload fa-sm"></i>
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link
                                                                        to={`/teacher/subject/${this.subjectId}/${this.props.match.params.chapterName}/arithmatic/concepts`}
                                                                    >
                                                                        <button className="btn btn-primary btn-sm">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link
                                                                        to={`/teacher/subject/${this.subjectId}/${this.props.match.params.chapterName}/arithmatic/type1`}
                                                                    >
                                                                        <button className="btn btn-primary btn-sm">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-md-2 text-center mb-2 mb-md-0">
                                                                    2.4
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Header>
                                            </Card>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>

                            <div className="card-body pt-0">
                                <button
                                    className="btn btn-light btn-block shadow-sm"
                                    onClick={this.toggleModal}
                                >
                                    Add +
                                </button>
                            </div>
                        </div>

                        <div
                            className="card shadow-sm mb-3"
                            style={{ backgroundColor: "#ffa88b" }}
                        >
                            <div className="card-body">
                                <p className="small text-center font-weight-bold mb-0">
                                    <Link to="" className="text-dark">
                                        Cycle Test - 01
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div
                            className="card shadow-sm"
                            style={{ backgroundColor: "#ffa88b" }}
                        >
                            <div className="card-body">
                                <p className="small text-center font-weight-bold mb-0">
                                    <Link to="" className="text-dark">
                                        Quiz
                                    </Link>
                                </p>
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

export default Chapters;
