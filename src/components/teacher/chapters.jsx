import React, { Component } from "react";
import store from "../../redux/store";
import { connect } from "react-redux";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
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
import AlertBox from "../sharedComponents/alert";
import {
    ContentDeleteModal,
    ContentUpdateModal,
} from "../sharedComponents/contentManagementModal";

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

        function formatData(arr, parentId, topic_name, ancestor) {
            arr.forEach((i) => {
                if (i.topic_num === parentId) {
                    i.child = [
                        ...i.child,
                        {
                            topic_name: topic_name,
                            topic_num: `${parentId}.${i.child.length + 1}`,
                            parent_id: parentId,
                            next_topic: "",
                            child: [],
                            ancestor: ancestor,
                        },
                    ];
                } else {
                    formatData(i.child, parentId, topic_name, ancestor);
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
                next_topic: "",
                child: [],
                ancestor: `${this.props.activeTopic}.${
                    chapters.chapter_structure.length + 1
                }`,
            });
        } else {
            chapters.chapter_structure = formatData(
                chapters.chapter_structure,
                this.props.activeTopic,
                this.state.topic_name,
                this.props.ancestor
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

                        <label htmlFor="topic">Topic name</label>
                        <input
                            type="text"
                            name="topic"
                            id="topic"
                            className="form-control borders"
                            onChange={this.handleTopic}
                            placeholder="Topic name"
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
                            Add
                        </button>
                    </Modal.Footer>
                </form>
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

                        <label htmlFor="cycle_test">Cycle test name</label>
                        <input
                            type="text"
                            name="cycle_test"
                            id="cycle_test"
                            className="form-control borders"
                            onChange={this.handleCycleTest}
                            placeholder="Cycle test name"
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
                            Add
                        </button>
                    </Modal.Footer>
                </form>
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
            showTopicModal: false,
            showTopic_EditModal: false,
            showTopic_DeleteModal: false,
            showCycle_TestModal: false,
            showCycle_EditModal: false,
            showCycle_DeleteModal: false,

            collapsed: false,
            chapterList: [],
            chapterId: "",
            chapterName: "",
            activeTopic: "",
            ancestor: "",
            chapters: {
                topic_id: "",
                chapter_id: this.props.match.params.chapterId,
                chapter_structure: [],
            },
            cycle_test: [],
            selectedCycleData: [],
            selectedTopicData: [],
            next_topic: [],
            is_independent: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
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

    toggleModal = (index, ancestor) => {
        this.setState({
            showTopicModal: !this.state.showTopicModal,
            activeTopic: index,
            ancestor: ancestor,
        });
    };

    toggleTopic_EditModal = (data) => {
        this.setState({
            selectedTopicData: data,
            showTopic_EditModal: !this.state.showTopic_EditModal,
        });
    };

    toggleTopic_DeleteModal = (data) => {
        this.setState({
            selectedTopicData: data,
            showTopic_DeleteModal: !this.state.showTopic_DeleteModal,
        });
    };

    toggleCycleTestModal = (index) => {
        this.setState({
            showCycle_TestModal: !this.state.showCycle_TestModal,
        });
    };

    toggleCycle_EditModal = (data) => {
        this.setState({
            selectedCycleData: data,
            showCycle_EditModal: !this.state.showCycle_EditModal,
        });
    };

    toggleCycle_DeleteModal = (data) => {
        this.setState({
            selectedCycleData: data,
            showCycle_DeleteModal: !this.state.showCycle_DeleteModal,
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
                    store.dispatch({
                        type: "CHAPTER",
                        payload:
                            result.data.chapter_name !== undefined
                                ? result.data.chapter_name
                                : this.props.chapter_name,
                    });
                    this.setState({
                        chapters: chapters,
                        chapterName:
                            result.data.chapter_name !== undefined
                                ? result.data.chapter_name
                                : this.props.chapter_name,
                        next_topic:
                            result.data.topics_list !== undefined
                                ? result.data.topics_list
                                : [],
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
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        chapterList: result.data.results,
                        is_independent: result.data.is_independent,
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
    };

    topic_formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showTopicModal: false,
                showTopic_EditModal: false,
                showTopic_DeleteModal: false,
                page_loading: true,
            });
            this.loadChapterData();
        }, 1000);
    };

    cycleTest_formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showCycle_TestModal: false,
                showCycle_EditModal: false,
                showCycle_DeleteModal: false,
                page_loading: true,
            });
            this.loadCycleTestData();
        }, 1000);
    };

    handleSelect = (event) => {
        const chapters = this.state.chapters;
        chapters.chapter_id = event.value;
        this.props.history.push({
            pathname: `/teacher/subject/${this.subjectId}/chapter/${event.value}`,
        });
        store.dispatch({
            type: "CHAPTER",
            payload: event.label,
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

    handleNextTopic = (event, topic_num, topic_id) => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        if (event.target.value !== "") {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/topics/next/`,
                {
                    method: "POST",
                    headers: this.headers,
                    body: JSON.stringify({
                        chapter_id: this.state.chapterId,
                        topic_num: topic_num,
                        topic_id: topic_id,
                        next_topic: event.target.value,
                    }),
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showSuccessAlert: true,
                        });
                        this.loadChapterData();
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            page_loading: false,
                        });
                    }
                });
        } else {
            this.setState({
                errorMsg: "Select a topic",
                showErrorAlert: true,
            });
        }
    };

    topic = (data, index, topic_id) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return this.topic(topic, index, topic_id);
        });

        return (
            <div key={index}>
                <Card.Header
                    className="small light-bg shadow-sm mb-2"
                    style={{
                        borderBottomLeftRadius: "8px",
                        borderBottomRightRadius: "8px",
                    }}
                >
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <div className="row align-items-center">
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
                                        to={`${this.props.match.url}/${data.topic_num}/notes/upload`}
                                    >
                                        <button
                                            className="btn btn-sm btn-primary shadow-none mr-2"
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
                                        to={`${this.props.match.url}/${data.topic_num}/notes`}
                                    >
                                        <button
                                            className="btn btn-sm btn-primary shadow-none"
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
                                            className="btn btn-primary btn-sm shadow-none"
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
                                        to={`${this.props.match.url}/${data.topic_num}/concepts`}
                                    >
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
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
                                        to={`${this.props.match.url}/${data.topic_num}/type1`}
                                    >
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
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
                                            className="btn btn-primary btn-sm shadow-none"
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
                                <div className="col-md-2 d-flex pr-md-0 mb-2 mb-md-0">
                                    <select
                                        name="next_topic"
                                        className="form-control form-control-sm border-secondary"
                                        value={data.next_topic}
                                        onChange={(event) =>
                                            this.handleNextTopic(
                                                event,
                                                data.topic_num,
                                                topic_id
                                            )
                                        }
                                    >
                                        <option value="">Select...</option>
                                        {this.state.next_topic !== undefined
                                            ? this.state.next_topic.length !== 0
                                                ? this.state.next_topic.map(
                                                      (topic, index) => {
                                                          return (
                                                              <option
                                                                  value={topic}
                                                                  key={index}
                                                              >
                                                                  {topic}
                                                              </option>
                                                          );
                                                      }
                                                  )
                                                : ""
                                            : ""}
                                    </select>

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
                                                    this.toggleModal(
                                                        data.topic_num,
                                                        data.ancestor
                                                    )
                                                }
                                            >
                                                <i className="fas fa-plus fa-sm mr-1"></i>{" "}
                                                Add
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    this.toggleTopic_EditModal(
                                                        data
                                                    )
                                                }
                                            >
                                                <i className="far fa-edit fa-sm mr-1"></i>{" "}
                                                Edit
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                                onClick={() =>
                                                    this.toggleTopic_DeleteModal(
                                                        data
                                                    )
                                                }
                                            >
                                                <i className="far fa-trash-alt fa-sm mr-1"></i>{" "}
                                                Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Header>
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
        document.title = `${this.props.chapter_name} - Teacher | IQLabs`;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={() => {
                        this.setState({
                            showSideNav: !this.state.showSideNav,
                        });
                    }}
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

                {/* Topic modal */}
                {this.state.showTopicModal ? (
                    <TopicModal
                        show={this.state.showTopicModal}
                        onHide={this.toggleModal}
                        formSubmission={this.topic_formSubmission}
                        subjectId={this.subjectId}
                        chapters={this.state.chapters}
                        activeTopic={this.state.activeTopic}
                        ancestor={this.state.ancestor}
                    />
                ) : (
                    ""
                )}

                {/* Topic edit modal */}
                {this.state.showTopic_EditModal ? (
                    <ContentUpdateModal
                        show={this.state.showTopic_EditModal}
                        onHide={this.toggleTopic_EditModal}
                        formSubmission={this.topic_formSubmission}
                        url={`${this.url}/teacher/subject/${this.subjectId}/chapter/topics/`}
                        type="Topic"
                        name={this.state.selectedTopicData.topic_name}
                        data={{
                            chapter_id: this.state.chapterId,
                            topic_id: this.state.chapters.topic_id,
                            topic_num: this.state.selectedTopicData.topic_num,
                            topic_name: this.state.selectedTopicData.topic_name,
                            ancestor: this.state.selectedTopicData.ancestor,
                        }}
                    />
                ) : (
                    ""
                )}

                {/* Topic Delete modal */}
                {this.state.showTopic_DeleteModal ? (
                    <ContentDeleteModal
                        show={this.state.showTopic_DeleteModal}
                        onHide={this.toggleTopic_DeleteModal}
                        formSubmission={this.topic_formSubmission}
                        url={`${this.url}/teacher/subject/${this.subjectId}/chapter/topics/`}
                        type="Topic"
                        name={this.state.selectedTopicData.topic_name}
                        data={{
                            chapter_id: this.state.chapterId,
                            topic_num: this.state.selectedTopicData.topic_num,
                            topic_id: this.state.chapters.topic_id,
                            ancestor: this.state.selectedTopicData.ancestor,
                        }}
                        toggleModal={this.toggleTopic_DeleteModal}
                    />
                ) : (
                    ""
                )}

                {/* Cycle test modal */}
                {this.state.showCycle_TestModal ? (
                    <CycleTestModal
                        show={this.state.showCycle_TestModal}
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
                    <ContentUpdateModal
                        show={this.state.showCycle_EditModal}
                        onHide={this.toggleCycle_EditModal}
                        formSubmission={this.cycleTest_formSubmission}
                        url={`${this.url}/teacher/subject/${this.subjectId}/cycle/`}
                        type="Cycle test"
                        name={this.state.selectedCycleData.cycle_test_name}
                        data={{
                            chapter_id: this.state.chapterId,
                            cycle_test_id: this.state.selectedCycleData
                                .cycle_test_id,
                            cycle_test_name: this.state.selectedCycleData
                                .cycle_test_name,
                        }}
                        toggleModal={this.toggleCycle_DeleteModal}
                    />
                ) : (
                    ""
                )}

                {/* Cycle test Delete modal */}
                {this.state.showCycle_DeleteModal ? (
                    <ContentDeleteModal
                        show={this.state.showCycle_DeleteModal}
                        onHide={this.toggleCycle_DeleteModal}
                        formSubmission={this.cycleTest_formSubmission}
                        url={`${this.url}/teacher/subject/${this.subjectId}/cycle/`}
                        type="Cycle test"
                        name={this.state.selectedCycleData.cycle_test_name}
                        data={{
                            chapter_id: this.state.chapterId,
                            cycle_test_id: this.state.selectedCycleData
                                .cycle_test_id,
                        }}
                        toggleModal={this.toggleCycle_DeleteModal}
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
                                    className="basic-single form-shadow"
                                    placeholder={this.props.chapter_name}
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
                                            className="secondary-bg shadow-sm mb-2 py-3"
                                            style={{ borderRadius: "8px" }}
                                            onClick={() => {
                                                this.setState({
                                                    collapsed: !this.state
                                                        .collapsed,
                                                });
                                            }}
                                        >
                                            <div className="row align-items-center">
                                                <div className="col-md-4 mb-2 mb-md-0">
                                                    <div className="row align-items-center">
                                                        <div className="col-1">
                                                            <span>
                                                                <i
                                                                    className={`fas fa-chevron-circle-down ${
                                                                        this
                                                                            .state
                                                                            .collapsed
                                                                            ? "fa-rotate-270"
                                                                            : ""
                                                                    }`}
                                                                ></i>
                                                            </span>
                                                        </div>
                                                        <div className="col-1 small font-weight-bold">
                                                            1
                                                        </div>
                                                        <div className="col-8 small font-weight-bold">
                                                            {
                                                                this.props
                                                                    .chapter_name
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
                                                                  index,
                                                                  this.state
                                                                      .chapters
                                                                      .topic_id
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
                                                                              <p className="small primary-text font-weight-bold-600 mb-0">
                                                                                  {
                                                                                      data.cycle_test_name
                                                                                  }
                                                                              </p>
                                                                          </div>
                                                                          <div className="col-md-6 d-flex align-items-center justify-content-end">
                                                                              {/* checks if both the permission exist */}
                                                                              {data.auto_test_perm ===
                                                                                  true &&
                                                                              data.direct_perm ===
                                                                                  true ? (
                                                                                  // checks if auto content is available
                                                                                  data.auto_test_question ===
                                                                                  true ? (
                                                                                      <Link
                                                                                          to={`${this.props.match.url}/cycle/${data.cycle_test_id}`}
                                                                                      >
                                                                                          <button
                                                                                              className="btn btn-primary btn-sm shadow-none"
                                                                                              onClick={() =>
                                                                                                  this.dispatchCycle(
                                                                                                      data.cycle_test_name
                                                                                                  )
                                                                                              }
                                                                                          >
                                                                                              Auto
                                                                                          </button>
                                                                                      </Link>
                                                                                  ) : // or if direct content is available
                                                                                  data.direct_question ===
                                                                                    true ? (
                                                                                      // checks if it is a independent subject
                                                                                      this
                                                                                          .state
                                                                                          .is_independent ===
                                                                                      false ? (
                                                                                          <Link
                                                                                              to={`${this.props.match.url}/cycle/${data.cycle_test_id}/direct`}
                                                                                          >
                                                                                              <button
                                                                                                  className="btn btn-primary btn-sm shadow-none ml-2"
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
                                                                                      )
                                                                                  ) : (
                                                                                      // or display both the button
                                                                                      <>
                                                                                          <Link
                                                                                              to={`${this.props.match.url}/cycle/${data.cycle_test_id}`}
                                                                                          >
                                                                                              <button
                                                                                                  className="btn btn-primary btn-sm shadow-none"
                                                                                                  onClick={() =>
                                                                                                      this.dispatchCycle(
                                                                                                          data.cycle_test_name
                                                                                                      )
                                                                                                  }
                                                                                              >
                                                                                                  Auto
                                                                                              </button>
                                                                                          </Link>
                                                                                          {/* checks if it is a independent subject */}
                                                                                          {this
                                                                                              .state
                                                                                              .is_independent ===
                                                                                          false ? (
                                                                                              <Link
                                                                                                  to={`${this.props.match.url}/cycle/${data.cycle_test_id}/direct`}
                                                                                              >
                                                                                                  <button
                                                                                                      className="btn btn-primary btn-sm shadow-none ml-2"
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
                                                                                      </>
                                                                                  )
                                                                              ) : // checks if auto permission exist
                                                                              data.auto_test_perm ===
                                                                                true ? (
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/cycle/${data.cycle_test_id}`}
                                                                                  >
                                                                                      <button
                                                                                          className="btn btn-primary btn-sm shadow-none"
                                                                                          onClick={() =>
                                                                                              this.dispatchCycle(
                                                                                                  data.cycle_test_name
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          Auto
                                                                                      </button>
                                                                                  </Link>
                                                                              ) : // checks if direct permission exist
                                                                              data.direct_perm ===
                                                                                true ? (
                                                                                  // checks if it is a independent subject
                                                                                  this
                                                                                      .state
                                                                                      .is_independent ===
                                                                                  false ? (
                                                                                      <Link
                                                                                          to={`${this.props.match.url}/cycle/${data.cycle_test_id}/direct`}
                                                                                      >
                                                                                          <button
                                                                                              className="btn btn-primary btn-sm shadow-none ml-2"
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
                                                                                  )
                                                                              ) : (
                                                                                  // or else prints nothing
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
                                                                                      <Dropdown.Item
                                                                                          onClick={() =>
                                                                                              this.toggleCycle_DeleteModal(
                                                                                                  data
                                                                                              )
                                                                                          }
                                                                                      >
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
                            onClick={() => this.toggleModal("1", "0")}
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
