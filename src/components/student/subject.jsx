import React, { Component } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Card, Accordion, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loading from "../sharedComponents/loader";
import AlertBox from "../sharedComponents/alert";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";

function Lock() {
    return (
        <OverlayTrigger
            key="top"
            placement="top"
            overlay={
                <Tooltip id="tooltip">
                    Complete the topics to unlock cycle test
                </Tooltip>
            }
        >
            <button className="btn btn-sm primary-text">
                <i className="fas fa-lock"></i>
            </button>
        </OverlayTrigger>
    );
}

class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItems: [],
            topics: [],
            topics_completed: [],
            collapsed: [],
            page_loading: true,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            isDataLoaded: false,
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        this.subjectId = this.props.match.params.subjectId;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    toggleSuccessAlert = () => {
        this.setState({
            showSuccessAlert: false,
        });
    };
    toggleErrorAlert = () => {
        this.setState({
            showErrorAlert: false,
        });
    };

    toggleCollapse = (index) => {
        let collapsed = [...this.state.collapsed];
        for (let i = 0; i < collapsed.length; i++) {
            if (i !== index) {
                collapsed[i] = true;
            }
        }
        collapsed[index] = !collapsed[index];
        this.setState({
            collapsed: collapsed,
        });
    };

    // Loads topic completion data
    loadTopicCompletedData = (chapter_id, chapter_index) => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${chapter_id}/topics/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let topics_completed = [...this.state.topics_completed];
                    topics_completed[chapter_index] =
                        result.data.topics_completed !== undefined
                            ? Array.isArray(result.data.topics_completed)
                                ? result.data.topics_completed
                                : []
                            : [];

                    // Updating the completed topics data in topics state
                    let topics = [...this.state.topics];
                    if (
                        Object.entries(result.data).length !== 0 &&
                        topics.length !== 0 &&
                        topics[chapter_index] !== undefined &&
                        topics_completed[chapter_index].length !== 0 &&
                        topics_completed[chapter_index] !== undefined
                    ) {
                        for (let i = 0; i < topics[chapter_index].length; i++) {
                            if (
                                topics_completed[chapter_index].includes(
                                    topics[chapter_index][i].topic_name
                                )
                            ) {
                                topics[chapter_index][i].isCompleted = true;
                            }
                        }
                    }

                    this.setState({
                        topics: topics,
                        topics_completed: topics_completed,
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

    // Flatten the chapter_structure array of objects
    loopTopicStructure = (array) => {
        var result = [];
        array.forEach((a) => {
            result.push({
                topic_num: a.topic_num,
                topic_name: a.topic_name,
                isCompleted: false,
            });
            if (Array.isArray(a.child)) {
                result = result.concat(this.loopTopicStructure(a.child));
            }
        });
        return result;
    };

    // loads chapter and topic data
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
                    let topics = [];
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        collapsed.push(i === 0 ? false : true);
                        // Extracting topics from the chapter_structure
                        for (
                            let j = 0;
                            j < result.data.chapters[i].topics.length;
                            j++
                        ) {
                            topics.push(
                                this.loopTopicStructure(
                                    result.data.chapters[i].topics[j]
                                        .chapter_structure
                                )
                            );
                        }
                        // function to load completed topic list from API
                        this.loadTopicCompletedData(
                            result.data.chapters[i].chapter_id,
                            i
                        );
                    }
                    this.setState({
                        collapsed: collapsed,
                        topics: topics,
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

    // Topic completion toggle
    handleTopicCompletion = (
        topic_num,
        topic_name,
        chapter_index,
        chapter_id
    ) => {
        let topics = [...this.state.topics];
        let temp = {};

        for (let i = 0; i < topics[chapter_index].length; i++) {
            if (
                topics[chapter_index][i].topic_num === topic_num &&
                topics[chapter_index][i].topic_name === topic_name
            ) {
                topics[chapter_index][i].isCompleted = !topics[chapter_index][i]
                    .isCompleted;
            }
            temp[topics[chapter_index][i].topic_name] =
                topics[chapter_index][i].isCompleted;
        }

        this.handleTopicCompletionSubmit(temp, chapter_index, chapter_id);
    };

    // All topic completion toggle
    handleAllTopicCompletion = (chapter_index, chapter_id) => {
        let topics = [...this.state.topics];
        let topics_completed = [...this.state.topics_completed];
        let temp = {};

        for (let i = 0; i < topics[chapter_index].length; i++) {
            if (
                topics[chapter_index].length ===
                topics_completed[chapter_index].length
            ) {
                topics[chapter_index][i].isCompleted = false;
            } else {
                topics[chapter_index][i].isCompleted = true;
            }
            temp[topics[chapter_index][i].topic_name] =
                topics[chapter_index][i].isCompleted;
        }

        this.handleTopicCompletionSubmit(temp, chapter_index, chapter_id);
    };

    // Submit topic completion
    handleTopicCompletionSubmit = (data, chapter_index, chapter_id) => {
        this.setState({
            page_loading: true,
        });

        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${chapter_id}/topics/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({ topic_name: data }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showSuccessAlert: true,
                        },
                        () => {
                            this.loadTopicCompletedData(
                                chapter_id,
                                chapter_index
                            );
                        }
                    );
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

    topic = (data, index, chapter_index, chapter_id) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return this.topic(topic, index, chapter_index, chapter_id);
        });
        let topics_completed = [...this.state.topics_completed];

        return (
            <div key={index}>
                <Card.Header
                    className="small light-bg shadow-sm mb-2"
                    style={{ borderRadius: "8px" }}
                >
                    <div className="row align-items-center">
                        <div className="col-md-4 mb-2 mb-md-0">
                            <div className="row">
                                <div className="col-md-2 col-3">
                                    {data.topic_num}
                                </div>
                                <div className="col-md-10 col-9">
                                    <Link
                                        to={`${this.props.match.url}/chapter/${data.chapter_id}/${data.topic_name}/learn`}
                                        className="primary-text"
                                    >
                                        {data.topic_name}
                                        <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="row align-items-center">
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0"></div>
                                <div className="col-md-2 mb-2 mb-md-0">
                                    Remarks
                                </div>
                                <div className="col-md-2 mb-2 mb-md-0">1.2</div>
                                <div className="col-md-2 mb-2 mb-md-0 text-right">
                                    <button
                                        className={`btn btn-sm ${
                                            topics_completed[chapter_index] !==
                                            undefined
                                                ? topics_completed[
                                                      chapter_index
                                                  ].includes(data.topic_name)
                                                    ? "text-success"
                                                    : "text-muted"
                                                : "text-muted"
                                        }`}
                                        style={{
                                            fontSize: "18px",
                                        }}
                                        onClick={() =>
                                            this.handleTopicCompletion(
                                                data.topic_num,
                                                data.topic_name,
                                                chapter_index,
                                                chapter_id
                                            )
                                        }
                                    >
                                        <i className="fas fa-check-circle"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card.Header>
                <div className="ml-md-3">{nestedTopics}</div>
            </div>
        );
    };

    cycleTest = (data, index, chapter_index) => {
        return (
            <div
                className="card card-header shadow-sm light-bg mb-2"
                key={index}
            >
                <div className="row align-items-center">
                    <div className="col-md-8">
                        <p className="small primary-text font-weight-bold-600 mb-0">
                            {data.cycle_test_name}
                        </p>
                    </div>
                    <div className="col-md-4 d-flex align-items-center justify-content-end">
                        {this.state.topics.length !== 0 &&
                        this.state.topics_completed.length !== 0 ? (
                            this.state.topics_completed.length ===
                            this.state.subjectItems.chapters.length ? (
                                this.state.topics[chapter_index] !==
                                    undefined &&
                                this.state.topics_completed[chapter_index] !==
                                    undefined ? (
                                    this.state.topics[chapter_index].length ===
                                    this.state.topics_completed[chapter_index]
                                        .length ? (
                                        // Check if cycle test is created or not
                                        data.direct_question !== undefined ? (
                                            // if exist, then redirect them to appropriate cycle test
                                            data.direct_question === true ? (
                                                <Link
                                                    to={`${this.props.match.url}/chapter/${data.chapter_id}/cycle/${data.cycle_test_id}/direct`}
                                                >
                                                    <button className="btn btn-primary btn-sm">
                                                        Start
                                                    </button>
                                                </Link>
                                            ) : (
                                                <Link
                                                    to={`${this.props.match.url}/chapter/${data.chapter_id}/cycle/${data.cycle_test_id}`}
                                                >
                                                    <button className="btn btn-primary btn-sm">
                                                        Start
                                                    </button>
                                                </Link>
                                            )
                                        ) : (
                                            // if not then display the error message in tooltip
                                            <OverlayTrigger
                                                key="top"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id="tooltip">
                                                        Cycle test is not
                                                        created yet...
                                                    </Tooltip>
                                                }
                                            >
                                                <button className="btn btn-sm primary-text">
                                                    <i className="fas fa-lock"></i>
                                                </button>
                                            </OverlayTrigger>
                                        )
                                    ) : (
                                        <Lock />
                                    )
                                ) : (
                                    <Lock />
                                )
                            ) : (
                                <Lock />
                            )
                        ) : (
                            <Lock />
                        )}
                    </div>
                </div>
            </div>
        );
    };

    render() {
        document.title = `${
            this.state.subjectItems.subject_name !== undefined
                ? this.state.subjectItems.subject_name
                : ""
        } - Student | IQLabs`;
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
                    toggleSuccessAlert={this.toggleSuccessAlert}
                    toggleErrorAlert={this.toggleErrorAlert}
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

                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                {/* Breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/student">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            <span>Course:</span>
                                            {this.state.subjectItems
                                                .subject_name !== undefined
                                                ? this.state.subjectItems
                                                      .subject_name
                                                : ""}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6 d-flex justify-content-start justify-content-md-end">
                                <button className="btn btn-primary btn-sm mr-1">
                                    My Personal Notes
                                </button>
                                <button className="btn btn-primary btn-sm mr-1">
                                    Simulation
                                </button>
                                <Link to={`${this.props.match.url}/results`}>
                                    <button className="btn btn-primary btn-sm">
                                        Test Result
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Course details */}
                        <div className="card shadow-sm">
                            <div className="card-header secondary-bg primary-text font-weight-bold">
                                <div className="row">
                                    <div className="col-md-4 mb-2 mb-md-0">
                                        Chapter
                                    </div>
                                    <div className="col-md-8 small primary-text font-weight-bold">
                                        <div className="row justify-content-end">
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Weightage
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Summary
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Notes
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Remarks
                                            </div>
                                            <div className="col-md-2 mb-2 mb-md-0">
                                                Next topic
                                            </div>
                                            <div className="col-md-2"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <Accordion defaultActiveKey="chapter-0">
                                    {this.state.subjectItems.length !== 0
                                        ? this.state.subjectItems.chapters.map(
                                              (data, index) => {
                                                  return (
                                                      <Card
                                                          className="mb-2"
                                                          key={index}
                                                      >
                                                          <Accordion.Toggle
                                                              as={Card.Header}
                                                              eventKey={`chapter-${index}`}
                                                              className="pinkrange-bg shadow-sm mb-2"
                                                              style={{
                                                                  borderRadius:
                                                                      "8px",
                                                              }}
                                                              onClick={() =>
                                                                  this.toggleCollapse(
                                                                      index
                                                                  )
                                                              }
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
                                                                                              .collapsed[
                                                                                              index
                                                                                          ]
                                                                                              ? "fa-rotate-270"
                                                                                              : ""
                                                                                      }`}
                                                                                  ></i>
                                                                              </span>
                                                                          </div>
                                                                          <div className="col-1 small font-weight-bold-600">
                                                                              {index +
                                                                                  1}
                                                                          </div>
                                                                          <div className="col-8 small font-weight-bold-600">
                                                                              {
                                                                                  data.chapter_name
                                                                              }
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                                  <div className="col-md-8 small primary-text font-weight-bold-600">
                                                                      <div className="row align-items-center justify-content-end">
                                                                          <div className="col-md-2 mb-2 mb-md-0">
                                                                              {
                                                                                  data.weightage
                                                                              }
                                                                          </div>
                                                                          <div className="col-md-2 mb-2 mb-md-0">
                                                                              <Link
                                                                                  to={`${this.props.match.url}/chapter/${data.chapter_id}/summary`}
                                                                              >
                                                                                  <button className="btn btn-light btn-sm">
                                                                                      <i className="fas fa-eye fa-sm"></i>
                                                                                  </button>
                                                                              </Link>
                                                                          </div>
                                                                          <div className="col-md-2 mb-2 mb-md-0">
                                                                              <Link
                                                                                  to={`${this.props.match.url}/chapter/${data.chapter_id}/notes`}
                                                                              >
                                                                                  <button className="btn btn-light btn-sm">
                                                                                      <i className="fas fa-eye fa-sm"></i>
                                                                                  </button>
                                                                              </Link>
                                                                          </div>
                                                                          <div className="col-md-2 mb-2 mb-md-0">
                                                                              Remarks
                                                                          </div>
                                                                          <div className="col-md-2 mb-2 mb-md-0"></div>
                                                                          <div className="col-md-2 text-right mb-2 mb-md-0">
                                                                              <button
                                                                                  className={`btn btn-sm ${
                                                                                      this
                                                                                          .state
                                                                                          .topics
                                                                                          .length !==
                                                                                          0 &&
                                                                                      this
                                                                                          .state
                                                                                          .topics_completed
                                                                                          .length !==
                                                                                          0
                                                                                          ? this
                                                                                                .state
                                                                                                .topics_completed
                                                                                                .length ===
                                                                                            this
                                                                                                .state
                                                                                                .subjectItems
                                                                                                .chapters
                                                                                                .length
                                                                                              ? this
                                                                                                    .state
                                                                                                    .topics[
                                                                                                    index
                                                                                                ] !==
                                                                                                    undefined &&
                                                                                                this
                                                                                                    .state
                                                                                                    .topics_completed[
                                                                                                    index
                                                                                                ] !==
                                                                                                    undefined
                                                                                                  ? this
                                                                                                        .state
                                                                                                        .topics[
                                                                                                        index
                                                                                                    ]
                                                                                                        .length ===
                                                                                                    this
                                                                                                        .state
                                                                                                        .topics_completed[
                                                                                                        index
                                                                                                    ]
                                                                                                        .length
                                                                                                      ? "text-success"
                                                                                                      : "text-muted"
                                                                                                  : "text-muted"
                                                                                              : "text-muted"
                                                                                          : "text-muted"
                                                                                  }`}
                                                                                  style={{
                                                                                      fontSize:
                                                                                          "18px",
                                                                                  }}
                                                                                  onClick={(
                                                                                      event
                                                                                  ) => {
                                                                                      this.handleAllTopicCompletion(
                                                                                          index,
                                                                                          data.chapter_id
                                                                                      );
                                                                                      event.stopPropagation();
                                                                                  }}
                                                                              >
                                                                                  <i className="fas fa-check-circle"></i>
                                                                              </button>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </Accordion.Toggle>

                                                          <Accordion.Collapse
                                                              eventKey={`chapter-${index}`}
                                                          >
                                                              <Card>
                                                                  {/* Topic list */}
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
                                                                                      topic_index,
                                                                                      index,
                                                                                      data.chapter_id
                                                                                  );
                                                                              }
                                                                          );
                                                                      }
                                                                  )}

                                                                  {/* Cycle test list */}
                                                                  {data.cycle_tests.map(
                                                                      (
                                                                          cycle,
                                                                          cycle_index
                                                                      ) => {
                                                                          return this.cycleTest(
                                                                              cycle,
                                                                              cycle_index,
                                                                              index
                                                                          );
                                                                      }
                                                                  )}
                                                              </Card>
                                                          </Accordion.Collapse>
                                                      </Card>
                                                  );
                                              }
                                          )
                                        : null}
                                </Accordion>

                                <div className="card card-header secondary-bg shadow-sm">
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            <p className="small font-weight-bold-600 mb-0">
                                                Semester Exams
                                            </p>
                                        </div>
                                        <div className="col-6 text-right">
                                            <button className="btn btn-primary btn-sm">
                                                Start
                                            </button>
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

export default Subject;
