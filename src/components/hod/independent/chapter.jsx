import React, { Component } from "react";
import store from "../../../redux/store";
import { connect } from "react-redux";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Card, Accordion } from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";
import Loading from "../../sharedComponents/loader";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import AlertBox from "../../sharedComponents/alert";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    chapter_name: state.content.chapter_name,
});

class HODChapter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            collapsed: false,

            showTopicModal: false,
            showTopic_EditModal: false,
            showTopic_DeleteModal: false,

            showCycle_TestModal: false,
            showCycle_EditModal: false,
            showCycle_DeleteModal: false,

            showIndependentCycle_TestModal: false,
            showIndependentCycle_EditModal: false,

            showQuiz_CreateModal: false,
            showQuiz_EditModal: false,
            showQuiz_DeleteModal: false,

            chapterList: [],
            chapterId: this.props.match.params.chapterId,
            chapterName: "",
            chapters: {
                topic_id: "",
                chapter_id: this.props.match.params.chapterId,
                chapter_structure: [],
            },
            permissions: {},
            chapterIndex: 1,
            activeTopic: "",
            ancestor: "",
            topicEventKey: [],

            cycle_test: [],
            quiz: [],
            selectedCycleData: [],
            selectedTopicData: [],
            selectedQuizData: [],
            next_topic: [],
            is_independent: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    // ----- Loads data -----

    loadChapterData = () => {
        fetch(
            `${this.url}/hod/subject/${this.subjectId}/chapter/${this.state.chapterId}/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    store.dispatch({
                        type: "CHAPTER",
                        payload:
                            result.data.chapter_name !== undefined
                                ? result.data.chapter_name
                                : this.props.chapter_name,
                    });
                    this.setState({
                        chapters: result.data.chapter_structure,
                        chapterName:
                            result.data.chapter_name !== undefined
                                ? result.data.chapter_name
                                : this.props.chapter_name,
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

    getChapterIndex = () => {
        const chapters = [...this.state.chapterList];
        let index = 0;
        for (let i = 0; i < chapters.length; i++) {
            if (chapters[i].chapter_id === this.state.chapterId) {
                index = i + 1;
            }
        }
        this.setState({
            chapterIndex: index,
        });
    };

    componentDidMount = async () => {
        await fetch(`${this.url}/hod/subjects/${this.subjectId}/chapters/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            chapterList: result.data.chapters,
                        },
                        () => {
                            this.getChapterIndex();
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

        this.loadChapterData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.match.params.chapterId !== this.state.chapterId) {
            this.setState(
                {
                    chapterId: this.props.match.params.chapterId,
                    page_loading: true,
                },
                () => {
                    this.loadChapterData();
                    this.getChapterIndex();
                }
            );
        }
    };

    handleSelect = (event) => {
        this.props.history.push({
            pathname: `/hod/subject/${this.subjectId}/chapter/${event.value}`,
        });
        store.dispatch({
            type: "CHAPTER",
            payload: event.label,
        });
        this.setState(
            {
                chapterId: event.value,
                page_loading: true,
            },
            () => {
                this.loadChapterData();
                this.getChapterIndex();
            }
        );
    };

    topicRender = (data, index, topic_id) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return (
                <Accordion key={index}>
                    {this.topicRender(topic, index, topic_id)}
                </Accordion>
            );
        });

        return (
            <>
                <Accordion.Toggle
                    as={Card.Header}
                    eventKey={`topic-${index}-${data.topic_num}`}
                    className="light-bg shadow-sm py-2 mb-2"
                    style={{
                        borderRadius: "8px",
                    }}
                    onClick={() =>
                        data.child.length !== 0
                            ? this.toggleTopicCollapse(
                                  `topic-${index}-${data.topic_num}`
                              )
                            : ""
                    }
                >
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <div className="row align-items-center">
                                <div className="col-1">
                                    {data.child.length !== 0 ? (
                                        <div>
                                            <i
                                                className={`fas fa-chevron-circle-down ${
                                                    this.state.topicEventKey.includes(
                                                        `topic-${index}-${data.topic_num}`
                                                    )
                                                        ? "fa-rotate-360"
                                                        : "fa-rotate-270"
                                                }`}
                                            ></i>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col-10 d-flex small font-weight-bold-600 pl-2">
                                    <div className="mr-3">{data.topic_num}</div>
                                    <div className="w-100">
                                        {data.topic_name}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="row align-items-center">
                                <div className="col-md-2 mb-2 mb-md-0"></div>
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
                                        to={`${this.props.match.url}/${data.topic_num}/match`}
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
                                        to={`${this.props.match.url}/${data.topic_num}/type2`}
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
                            </div>
                        </div>
                    </div>
                </Accordion.Toggle>

                <Accordion.Collapse
                    eventKey={`topic-${index}-${data.topic_num}`}
                    className="ml-2"
                >
                    <div>{nestedTopics}</div>
                </Accordion.Collapse>
            </>
        );
    };

    toggleTopicCollapse = (key) => {
        let topicEventKey = this.state.topicEventKey;
        if (topicEventKey.includes(key)) {
            topicEventKey.splice(topicEventKey.indexOf(key), 1);
        } else {
            topicEventKey.push(key);
        }

        this.setState({
            topicEventKey: topicEventKey,
        });
    };

    handlePublish = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        fetch(
            `${this.url}/hod/subject/${this.subjectId}/chapter/${this.state.chapterId}/approve/`,
            {
                method: "POST",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    dispatchTopic = (data) => {
        store.dispatch({ type: "TOPIC", payload: data });
    };

    dispatchCycle = (data) => {
        store.dispatch({ type: "CYCLE", payload: data });
    };

    dispatchQuiz = (data) => {
        store.dispatch({ type: "QUIZ", payload: data });
    };

    render() {
        document.title = `${this.props.chapter_name} - HOD | IQLabs`;
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
                                    <Link to="/hod">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        {this.props.subject_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    <span>Chapter:</span>
                                    {this.state.chapterName}
                                </li>
                            </ol>
                        </nav>

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
                            {this.groupId === undefined ? (
                                <div className="col-md-8 text-right">
                                    <button
                                        className="btn btn-primary btn-sm shadow-none"
                                        onClick={this.handlePublish}
                                    >
                                        Publish
                                    </button>
                                </div>
                            ) : (
                                ""
                            )}
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
                                                Summary
                                            </div>
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
                                                    collapsed:
                                                        !this.state.collapsed,
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
                                                        <div className="col-11 d-flex small font-weight-bold">
                                                            <div className="mr-3">
                                                                {
                                                                    this.state
                                                                        .chapterIndex
                                                                }
                                                            </div>
                                                            <div>
                                                                {
                                                                    this.props
                                                                        .chapter_name
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey="0">
                                            <Card>
                                                {/* ----- Topic list ----- */}
                                                {this.state.chapters
                                                    .chapter_structure
                                                    .length !== 0
                                                    ? this.state.chapters.chapter_structure.map(
                                                          (data, index) => {
                                                              return (
                                                                  <Accordion
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      {this.topicRender(
                                                                          data,
                                                                          index,
                                                                          this
                                                                              .state
                                                                              .chapters
                                                                              .topic_id
                                                                      )}
                                                                  </Accordion>
                                                              );
                                                          }
                                                      )
                                                    : null}

                                                {/* ----- Cycle test list ----- */}
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
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              );
                                                          }
                                                      )
                                                    : null}

                                                {/* ----- Quiz list ----- */}
                                                {Object.entries(this.state.quiz)
                                                    .length !== 0 ? (
                                                    <div className="card card-header shadow-sm light-bg mb-2">
                                                        <div className="row align-items-center">
                                                            <div className="col-md-6">
                                                                <p className="small primary-text font-weight-bold-600 mb-0">
                                                                    {
                                                                        this
                                                                            .state
                                                                            .quiz
                                                                            .quiz_name
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6 d-flex align-items-center justify-content-end">
                                                                <Link
                                                                    to={`${this.props.match.url}/quiz/${this.state.quiz.quiz_id}`}
                                                                >
                                                                    <button
                                                                        className="btn btn-primary btn-sm shadow-none"
                                                                        onClick={() =>
                                                                            this.dispatchQuiz(
                                                                                this
                                                                                    .state
                                                                                    .quiz
                                                                                    .quiz_name
                                                                            )
                                                                        }
                                                                    >
                                                                        View /
                                                                        Edit
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    ""
                                                )}
                                            </Card>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
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

export default connect(mapStateToProps)(HODChapter);
