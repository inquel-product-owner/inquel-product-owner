import React, { Component } from "react";
import { Accordion, Card, Modal, Alert } from "react-bootstrap";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";

class NotesModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    handleDelete = () => {
        let body = {
            topic_num: this.props.topic_num,
            personal_notes_id: this.props.data.personal_notes_id,
        };
        if (this.props.data.type === "concept") {
            body["concept"] = true;
            body["question"] = false;
        } else {
            body["concept"] = false;
            body["question"] = true;
        }
        fetch(
            `${this.url}/student/subject/${this.props.subjectId}/chapter/${this.props.chapterId}/personalnotes/`,
            {
                headers: this.headers,
                method: "DELETE",
                body: JSON.stringify(body),
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

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
            >
                <Modal.Header closeButton>Personal notes</Modal.Header>
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

                    <div style={{ minHeight: "50vh" }}>
                        <div className="h5 font-weight-bold-600 mb-3">
                            {this.props.data.personal_notes_title}
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: this.props.data.personal_notes_content,
                            }}
                        ></div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-link btn-sm text-danger shadow-none"
                        onClick={this.handleDelete}
                    >
                        <i className="fas fa-trash-alt fa-sm mr-1"></i> Delete
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class PersonalNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            collapsed: [],
            subjectItems: [],
            notesData: "",

            chapterId: "",
            topicName: "",
            topic_num: "",
            selectedChapter: "chapter-0",
            selectedData: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.url = baseUrl + studentUrl;
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

    toggleCollapse = (index, chapterId) => {
        let collapsed = [...this.state.collapsed];
        for (let i = 0; i < collapsed.length; i++) {
            if (i !== index) {
                collapsed[i] = true;
            }
        }
        collapsed[index] = !collapsed[index];

        let topicName = "";
        let topic_num = "";
        for (let i = 0; i < this.state.subjectItems.chapters.length; i++) {
            // extract topic name from the current chapter
            if (this.state.subjectItems.chapters[i].chapter_id === chapterId) {
                topicName =
                    this.state.subjectItems.chapters[i].topics.length !== 0
                        ? this.state.subjectItems.chapters[i].topics[0]
                              .chapter_structure[0].topic_name
                        : "Topic";
                topic_num =
                    this.state.subjectItems.chapters[i].topics.length !== 0
                        ? this.state.subjectItems.chapters[i].topics[0]
                              .chapter_structure[0].topic_num
                        : "1.1";
            } else {
                continue;
            }
        }
        this.setState(
            {
                collapsed: collapsed,
                chapterId: chapterId,
                topicName: topicName,
                topic_num: topic_num,
                page_loading: true,
            },
            () => this.loadNotesData()
        );
    };

    // loads notes data
    loadNotesData = async () => {
        await fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.state.chapterId}/personalnotes/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let notes = {};
                    let response = result.data;
                    if (response.length !== 0) {
                        response.forEach((item) => {
                            notes[item.topic_num] = [];
                            if (item.concepts.length !== 0) {
                                item.concepts.forEach((concept) => {
                                    concept["type"] = "concept";
                                    notes[item.topic_num].push(concept);
                                });
                            }
                            if (item.questions.length !== 0) {
                                item.questions.forEach((question) => {
                                    question["type"] = "question";
                                    notes[item.topic_num].push(question);
                                });
                            }
                        });
                    }
                    this.setState({
                        notesData: notes,
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
        window.MathJax.typeset();
    };

    componentDidMount = () => {
        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data,
                    });
                    let collapsed = [];
                    let chapterId = "";
                    let topicName = "";
                    let topic_num = "";
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        // adds collapse state
                        collapsed.push(i === 0 ? false : true);

                        chapterId = result.data.chapters[0].chapter_id;

                        // extract topic name from the current chapter
                        if (i === 0) {
                            topicName =
                                result.data.chapters[i].topics.length !== 0
                                    ? result.data.chapters[i].topics[0]
                                          .chapter_structure[0].topic_name
                                    : "Topic";
                            topic_num =
                                result.data.chapters[i].topics.length !== 0
                                    ? result.data.chapters[i].topics[0]
                                          .chapter_structure[0].topic_num
                                    : "1.1";
                        } else {
                            continue;
                        }
                    }
                    this.setState(
                        {
                            collapsed: collapsed,
                            chapterId: chapterId,
                            topicName: topicName,
                            topic_num: topic_num,
                        },
                        () => {
                            this.loadNotesData();
                        }
                    );
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

    // loads data on selecting a topic
    handleSelect = (topicName, topic_num) => {
        this.setState({
            topicName: topicName,
            topic_num: topic_num,
        });
    };

    // topic list
    topic = (data, index) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return this.topic(topic, index);
        });

        return (
            <div key={index}>
                <Card.Header
                    className={`small ${
                        this.state.topic_num === data.topic_num
                            ? "light-bg"
                            : "bg-light"
                    } shadow-sm mb-2`}
                    onClick={() =>
                        this.handleSelect(data.topic_name, data.topic_num)
                    }
                    style={{ borderRadius: "8px" }}
                >
                    <div className="row">
                        <div className="col-md-3 col-3 pr-0">
                            {data.topic_num}
                        </div>
                        <div className="col-md-9 col-9 pl-0">
                            {data.topic_name}
                        </div>
                    </div>
                </Card.Header>
                <div className="ml-md-3">{nestedTopics}</div>
            </div>
        );
    };

    toggleModal = (data) => {
        this.setState({
            showModal: !this.state.showModal,
            selectedData: data,
        });
    };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showModal: false,
                chapterId: this.state.chapterId,
                topic_num: this.state.topic_num,
                topicName: this.state.topicName,
            });
        }, 1000);
        this.loadNotesData();
    };

    render() {
        document.title = `${this.state.topicName} Personal Notes - Student | IQLabs`;
        const chapter = this.state.subjectItems;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={
                        this.state.subjectItems.subject_name !== undefined
                            ? this.state.subjectItems.subject_name
                            : ""
                    }
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

                {/* ----- Personal notes modal ----- */}
                {this.state.showModal ? (
                    <NotesModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        data={this.state.selectedData}
                        subjectId={this.subjectId}
                        chapterId={this.state.chapterId}
                        topic_num={this.state.topic_num}
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
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* ----- Breadcrumb ----- */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/student">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        Course
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Personal Notes
                                </li>
                            </ol>
                        </nav>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row">
                                    {/* ---------- Chapter list ---------- */}
                                    <div className="col-md-3 mb-2 mb-md-0 border-right">
                                        <div className="card">
                                            <Accordion defaultActiveKey="chapter-0">
                                                {chapter.length !== 0
                                                    ? chapter.chapters
                                                          .length !== 0
                                                        ? chapter.chapters.map(
                                                              (data, index) => {
                                                                  return (
                                                                      <Card
                                                                          className="mb-1"
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          <Accordion.Toggle
                                                                              as={
                                                                                  Card.Header
                                                                              }
                                                                              eventKey={`chapter-${index}`}
                                                                              className="pinkrange-bg shadow-sm mb-2"
                                                                              style={{
                                                                                  borderRadius:
                                                                                      "8px",
                                                                              }}
                                                                              onClick={() =>
                                                                                  this.toggleCollapse(
                                                                                      index,
                                                                                      data.chapter_id
                                                                                  )
                                                                              }
                                                                          >
                                                                              <div className="row align-items-center">
                                                                                  <div className="col-1">
                                                                                      <span>
                                                                                          <i
                                                                                              className={`fas fa-chevron-circle-down ${
                                                                                                  this
                                                                                                      .state
                                                                                                      .collapsed[
                                                                                                      index
                                                                                                  ]
                                                                                                      ? "fa-rotate-270"
                                                                                                      : ""
                                                                                              }`}
                                                                                          ></i>
                                                                                      </span>
                                                                                  </div>
                                                                                  <div className="col-10 small font-weight-bold-600">
                                                                                      {
                                                                                          data.chapter_name
                                                                                      }
                                                                                  </div>
                                                                              </div>
                                                                          </Accordion.Toggle>

                                                                          <Accordion.Collapse
                                                                              eventKey={`chapter-${index}`}
                                                                          >
                                                                              <Card>
                                                                                  {/* ----- Topic list ----- */}
                                                                                  {data.topics.map(
                                                                                      (
                                                                                          topic
                                                                                      ) => {
                                                                                          return topic.chapter_structure.map(
                                                                                              (
                                                                                                  topics,
                                                                                                  topic_index
                                                                                              ) => {
                                                                                                  return this.topic(
                                                                                                      topics,
                                                                                                      topic_index
                                                                                                  );
                                                                                              }
                                                                                          );
                                                                                      }
                                                                                  )}
                                                                              </Card>
                                                                          </Accordion.Collapse>
                                                                      </Card>
                                                                  );
                                                              }
                                                          )
                                                        : null
                                                    : null}
                                            </Accordion>
                                        </div>
                                    </div>

                                    {/* ---------- Notes data ---------- */}

                                    <div className="col-md-9 pl-md-0">
                                        <div className="card card-body py-0">
                                            {Object.entries(
                                                this.state.notesData
                                            ).length !== 0 ? (
                                                this.state.notesData[
                                                    this.state.topic_num
                                                ] !== undefined ? (
                                                    this.state.notesData[
                                                        this.state.topic_num
                                                    ].length !== 0 ? (
                                                        <div className="row">
                                                            {this.state.notesData[
                                                                this.state
                                                                    .topic_num
                                                            ].map(
                                                                (
                                                                    data,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            className="col-md-6 mb-3"
                                                                            key={
                                                                                index
                                                                            }
                                                                        >
                                                                            <div className="card light-bg shadow-sm">
                                                                                <div className="card-body">
                                                                                    <div className="row align-items-center pr-2">
                                                                                        <div className="col-10 primary-text font-weight-bold-600 small">
                                                                                            {
                                                                                                data.personal_notes_title
                                                                                            }
                                                                                        </div>
                                                                                        <div className="col-2">
                                                                                            <button
                                                                                                className="btn btn-primary btn-sm shadow-none"
                                                                                                onClick={() =>
                                                                                                    this.toggleModal(
                                                                                                        data
                                                                                                    )
                                                                                                }
                                                                                            >
                                                                                                View
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    ) : (
                                                        "No content to display..."
                                                    )
                                                ) : (
                                                    "No content to display..."
                                                )
                                            ) : (
                                                "No content to display..."
                                            )}
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

export default PersonalNotes;
