import React, { Component } from "react";
import store from "../../redux/store";
import { connect } from "react-redux";
import Header from "./navbar";
import SideNav from "./sidenav";
import {
    Card,
    Accordion,
    Modal,
    Alert,
    Spinner,
    Dropdown,
} from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Loading from "../sharedComponents/loader";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class TopicModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topic_name: "",
            chapters: this.props.chapters,
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

        const chapters = this.state.chapters;

        function formatData(arr, parentId, topic_name) {
            arr.forEach((i) => {
                if (i.topic_num === parentId) {
                    i.child = [
                        ...i.child,
                        {
                            topic_name: topic_name,
                            topic_num: `${parentId}.${i.child.length + 1}`,
                            parent_id: parentId,
                            child: [],
                        },
                    ];
                } else {
                    formatData(i.child, parentId, topic_name);
                }
            });
            return arr;
        }

        if (this.props.activeTopic === "1") {
            chapters.chapter_structure.push({
                topic_name: this.state.topic_name,
                topic_num: `${this.props.activeTopic}.${
                    chapters.chapter_structure.length + 1
                }`,
                parent_id: this.props.activeTopic,
                child: [],
            });
        } else {
            chapters.chapter_structure = formatData(
                chapters.chapter_structure,
                this.props.activeTopic,
                this.state.topic_name
            );
        }

        fetch(
            `${this.url}/teacher/subject/${this.props.subjectId}/chapter/topics/`,
            {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify(chapters),
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
                <Modal.Header closeButton>Create Topic</Modal.Header>
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
                                Add
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class CycleTestModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cycle_test: "",
            chapter_id: this.props.chapter_id,
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

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/cycle/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                chapter_id: this.state.chapter_id,
                cycle_test_name: this.state.cycle_test,
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

    handleCycleTest = (event) => {
        this.setState({
            cycle_test: event.target.value,
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
                <Modal.Header closeButton>Create Cycle test</Modal.Header>
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
                                name="cycle_test"
                                className="form-control borders"
                                onChange={this.handleCycleTest}
                                placeholder="Cycle test name"
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
                                Add
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class CycleEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cycle_test_id: this.props.data.cycle_test_id,
            cycle_test_name: this.props.data.cycle_test_name,

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

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/cycle/`, {
            headers: this.headers,
            method: "PATCH",
            body: JSON.stringify({
                chapter_id: this.props.chapter_id,
                cycle_test_id: this.state.cycle_test_id,
                cycle_test_name: this.state.cycle_test_name,
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

    handleCycleTest = (event) => {
        this.setState({
            cycle_test_name: event.target.value,
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
                <Modal.Header closeButton>Edit Cycle Test</Modal.Header>
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
                            <label htmlFor="cycle">Cycle Test Name</label>
                            <input
                                type="text"
                                name="cycle"
                                id="cycle"
                                className="form-control borders"
                                onChange={this.handleCycleTest}
                                placeholder="Cycle test name"
                                value={this.state.cycle_test_name}
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
                                Update
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
});

class Chapters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            showCycleTestModal: false,
            showCycle_EditModal: false,

            collapsed: false,
            chapterList: [],
            chapterId: "",
            chapterName: "",
            activeTopic: "",
            chapters: {
                topic_id: "",
                chapter_id: this.props.match.params.chapterId,
                chapter_structure: [],
            },
            cycle_test: [],
            selectedCycleData: [],

            page_loading: true,
            is_topicFormSubmitted: false,
            is_cycleTestFormSubmitted: false,
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

    toggleModal = (index) => {
        this.setState({
            showModal: !this.state.showModal,
            activeTopic: index,
        });
    };

    toggleCycleTestModal = (index) => {
        this.setState({
            showCycleTestModal: !this.state.showCycleTestModal,
        });
    };

    toggleCycle_EditModal = (data) => {
        this.setState({
            selectedCycleData: data,
            showCycle_EditModal: !this.state.showCycle_EditModal,
        });
    };

    loadChapterData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/topics/?chapter_id=${this.state.chapterId}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    const chapters = this.state.chapters;
                    chapters.chapter_structure = result.data.chapter_structure
                        ? result.data.chapter_structure
                        : [];
                    chapters.topic_id = result.data.topic_id
                        ? result.data.topic_id
                        : "";
                    this.setState({
                        chapters: chapters,
                        chapterName:
                            result.data.chapter_name !== undefined
                                ? result.data.chapter_name
                                : "Chapter name",
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    loadCycleTestData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/?chapter_id=${this.state.chapterId}`,
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
                        cycle_test: result.data,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.setState(
            {
                chapterId: this.props.match.params.chapterId,
            },
            () => {
                this.loadChapterData();
                this.loadCycleTestData();
            }
        );

        fetch(`${this.url}/teacher/subject/${this.subjectId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    chapterList: result.data.results,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.match.params.chapterId !== this.state.chapterId) {
            const chapters = this.state.chapters;
            chapters.chapter_id = this.props.match.params.chapterId;
            this.setState(
                {
                    chapterId: this.props.match.params.chapterId,
                    chapters: chapters,
                    page_loading: true,
                },
                () => {
                    this.loadChapterData();
                    this.loadCycleTestData();
                }
            );
        }

        if (
            prevState.is_topicFormSubmitted !==
                this.state.is_topicFormSubmitted &&
            this.state.is_topicFormSubmitted === true
        ) {
            this.loadChapterData();
            this.setState({
                is_topicFormSubmitted: false,
            });
        }

        if (
            prevState.is_cycleTestFormSubmitted !==
                this.state.is_cycleTestFormSubmitted &&
            this.state.is_cycleTestFormSubmitted === true
        ) {
            this.loadCycleTestData();
            this.setState({
                is_cycleTestFormSubmitted: false,
            });
        }
    };

    topic_formSubmission = (is_formSubmitted) => {
        if (is_formSubmitted) {
            this.setState({
                is_topicFormSubmitted: true,
            });
            setTimeout(() => {
                this.setState({
                    showModal: false,
                });
            }, 1000);
        }
    };

    cycleTest_formSubmission = (is_formSubmitted) => {
        if (is_formSubmitted) {
            this.setState({
                is_cycleTestFormSubmitted: true,
            });
            setTimeout(() => {
                this.setState({
                    showCycleTestModal: false,
                    showCycle_EditModal: false,
                });
            }, 1000);
        }
    };

    handleSelect = (event) => {
        const chapters = this.state.chapters;
        chapters.chapter_id = event.value;
        this.props.history.push({
            pathname: `/teacher/subject/${this.subjectId}/chapter/${event.value}`,
        });
        this.setState(
            {
                chapterId: event.value,
                chapters: chapters,
                page_loading: true,
            },
            () => {
                this.loadChapterData();
                this.loadCycleTestData();
            }
        );
    };

    topic = (data, index) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return this.topic(topic, index);
        });

        return (
            <div key={index}>
                <div
                    className="d-flex align-items-center light-bg shadow-sm mb-2"
                    style={{ borderRadius: "8px", overflow: "hidden" }}
                >
                    <button
                        className="btn btn-primary-invert shadow-sm ml-2"
                        onClick={() => this.toggleModal(data.topic_num)}
                    >
                        <i className="fas fa-plus-circle"></i>
                    </button>
                    <Card.Header className="small light-bg w-100">
                        <div className="row align-items-center">
                            <div className="col-md-4 mb-2 mb-md-0">
                                <div className="row">
                                    <div className="col-md-2 col-3">
                                        {data.topic_num}
                                    </div>
                                    <div className="col-md-10 col-9">
                                        {data.topic_name}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8">
                                <div className="row align-items-center">
                                    <div className="col-md-2 mb-2 mb-md-0">
                                        <Link
                                            to={`${this.props.match.url}/${data.topic_name}/notes/upload`}
                                        >
                                            <button
                                                className="btn btn-sm btn-primary mr-2"
                                                onClick={() =>
                                                    this.dispatchTopic(
                                                        data.topic_name
                                                    )
                                                }
                                            >
                                                <i className="fas fa-file-upload fa-sm"></i>
                                            </button>
                                        </Link>
                                        <Link
                                            to={`${this.props.match.url}/${data.topic_name}/notes`}
                                        >
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() =>
                                                    this.dispatchTopic(
                                                        data.topic_name
                                                    )
                                                }
                                            >
                                                <i className="fas fa-file-medical fa-sm"></i>
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-md-2 mb-2 mb-md-0">
                                        <Link
                                            to={`${this.props.match.url}/${data.topic_name}/match`}
                                        >
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    this.dispatchTopic(
                                                        data.topic_name
                                                    )
                                                }
                                            >
                                                View / Edit
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-md-2 mb-2 mb-md-0">
                                        <Link
                                            to={`${this.props.match.url}/${data.topic_name}/concepts`}
                                        >
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    this.dispatchTopic(
                                                        data.topic_name
                                                    )
                                                }
                                            >
                                                View / Edit
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-md-2 mb-2 mb-md-0">
                                        <Link
                                            to={`${this.props.match.url}/${data.topic_name}/type1`}
                                        >
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    this.dispatchTopic(
                                                        data.topic_name
                                                    )
                                                }
                                            >
                                                View / Edit
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-md-2 mb-2 mb-md-0">
                                        <Link
                                            to={`${this.props.match.url}/${data.topic_name}/type2`}
                                        >
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() =>
                                                    this.dispatchTopic(
                                                        data.topic_name
                                                    )
                                                }
                                            >
                                                View / Edit
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="col-md-2 mb-2 mb-md-0">
                                        <select
                                            name="next_topic"
                                            className="form-control form-control-sm border-secondary"
                                        >
                                            <option value="">Next topic</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card.Header>
                </div>
                <div className="ml-md-3">{nestedTopics}</div>
            </div>
        );
    };

    dispatchTopic = (data) => {
        store.dispatch({ type: "TOPIC", payload: data });
    };

    dispatchCycle = (data) => {
        store.dispatch({ type: "CYCLE", payload: data });
    };

    render() {
        document.title = `${this.state.chapterName} - Teacher | IQLabs`;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
                />

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
                        formSubmission={this.topic_formSubmission}
                        subjectId={this.subjectId}
                        chapters={this.state.chapters}
                        activeTopic={this.state.activeTopic}
                    />
                ) : (
                    ""
                )}

                {/* Cycle test modal */}
                {this.state.showCycleTestModal ? (
                    <CycleTestModal
                        show={this.state.showCycleTestModal}
                        onHide={this.toggleCycleTestModal}
                        formSubmission={this.cycleTest_formSubmission}
                        subjectId={this.subjectId}
                        chapter_id={this.state.chapterId}
                    />
                ) : (
                    ""
                )}

                {/* Cycle test edit modal */}
                {this.state.showCycle_EditModal ? (
                    <CycleEditModal
                        show={this.state.showCycle_EditModal}
                        onHide={this.toggleCycle_EditModal}
                        formSubmission={this.cycleTest_formSubmission}
                        subjectId={this.subjectId}
                        chapter_id={this.state.chapterId}
                        data={this.state.selectedCycleData}
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
                                                value: list.chapter_id,
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
                                    <button className="btn btn-primary btn-sm">
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course details */}
                        <div className="card shadow-sm mb-3">
                            <div className="card-header secondary-bg primary-text font-weight-bold">
                                <div className="row">
                                    <div className="col-md-4 mb-2 mb-md-0">
                                        Topic structure
                                    </div>
                                    <div className="col-md-8 small primary-text font-weight-bold">
                                        <div className="row justify-content-end">
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
                                            className="secondary-bg mb-2"
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
                                            <Card>
                                                {/* Topic list */}
                                                {this.state.chapters
                                                    .chapter_structure
                                                    .length !== 0
                                                    ? this.state.chapters.chapter_structure.map(
                                                          (data, index) => {
                                                              return this.topic(
                                                                  data,
                                                                  index
                                                              );
                                                          }
                                                      )
                                                    : null}

                                                {/* Cycle test list */}
                                                {this.state.cycle_test
                                                    .length !== 0
                                                    ? this.state.cycle_test.map(
                                                          (data, index) => {
                                                              return (
                                                                  <div
                                                                      className="card card-header shadow-sm light-bg mb-2"
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <div className="row align-items-center">
                                                                          <div className="col-md-6">
                                                                              <p className="small primary-text font-weight-bold mb-0">
                                                                                  {
                                                                                      data.cycle_test_name
                                                                                  }
                                                                              </p>
                                                                          </div>
                                                                          <div className="col-md-6 d-flex align-items-center justify-content-end">
                                                                              {data.direct_question ===
                                                                                  undefined ||
                                                                              data.direct_question ===
                                                                                  false ? (
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/cycle/${data.cycle_test_id}`}
                                                                                  >
                                                                                      <button
                                                                                          className="btn btn-primary btn-sm"
                                                                                          onClick={() =>
                                                                                              this.dispatchCycle(
                                                                                                  data.cycle_test_name
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          Auto
                                                                                      </button>
                                                                                  </Link>
                                                                              ) : (
                                                                                  ""
                                                                              )}
                                                                              {data.direct_question ===
                                                                                  undefined ||
                                                                              data.direct_question ===
                                                                                  true ? (
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/cycle/${data.cycle_test_id}/direct`}
                                                                                  >
                                                                                      <button
                                                                                          className="btn btn-primary btn-sm ml-2"
                                                                                          onClick={() =>
                                                                                              this.dispatchCycle(
                                                                                                  data.cycle_test_name
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          Direct
                                                                                          Test
                                                                                      </button>
                                                                                  </Link>
                                                                              ) : (
                                                                                  ""
                                                                              )}
                                                                              <Dropdown>
                                                                                  <Dropdown.Toggle
                                                                                      variant="white"
                                                                                      className="btn btn-link btn-sm shadow-none caret-off ml-2"
                                                                                  >
                                                                                      <i className="fas fa-ellipsis-v"></i>
                                                                                  </Dropdown.Toggle>

                                                                                  <Dropdown.Menu>
                                                                                      <Dropdown.Item
                                                                                          onClick={() =>
                                                                                              this.toggleCycle_EditModal(
                                                                                                  data
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          <i className="far fa-edit fa-sm mr-1"></i>{" "}
                                                                                          Edit
                                                                                      </Dropdown.Item>
                                                                                      <Dropdown.Item>
                                                                                          <i className="far fa-trash-alt fa-sm mr-1"></i>{" "}
                                                                                          Delete
                                                                                      </Dropdown.Item>
                                                                                  </Dropdown.Menu>
                                                                              </Dropdown>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              );
                                                          }
                                                      )
                                                    : null}
                                            </Card>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </div>
                        </div>

                        <button
                            className="btn btn-tomato btn-block shadow-sm"
                            onClick={() => this.toggleModal("1")}
                        >
                            Add Topic
                        </button>
                        <button
                            className="btn btn-tomato btn-block shadow-sm"
                            onClick={this.toggleCycleTestModal}
                        >
                            Add Cycle test
                        </button>
                        <button className="btn btn-tomato btn-block shadow-sm">
                            Add Quiz
                        </button>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Chapters);
