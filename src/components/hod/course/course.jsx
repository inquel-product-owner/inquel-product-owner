import React, { Component } from "react";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Card, Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { baseUrl, hodUrl } from "../../../shared/baseUrl";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import store from "../../../redux/store";

const mapStateToProps = (state) => ({
    course_name: state.content.course_name,
});

const bgColor = "#e2e2e2";

const UnitListRender = (props) => {
    return (
        <>
            {props.data.units
                ? props.data.units.length !== 0
                    ? props.data.units.map((unit, unit_index) => {
                          return (
                              <fieldset
                                  className="primary-fieldset mb-3"
                                  key={unit_index}
                              >
                                  <legend className="primary-bg text-white text-center">
                                      {unit.unit_name}
                                  </legend>
                                  <Accordion>
                                      {/* ----- Chapter list ----- */}
                                      {(unit.chapters || []).map(
                                          (chapter, chapter_index) => {
                                              return (
                                                  <ChapterListRender
                                                      {...props}
                                                      key={chapter_index}
                                                      chapter={chapter}
                                                      chapter_index={
                                                          chapter_index
                                                      }
                                                      unit_index={unit_index}
                                                  />
                                              );
                                          }
                                      )}
                                  </Accordion>

                                  {/* ----- Semester list ----- */}
                                  {unit.semesters
                                      ? unit.semesters.map(
                                            (semester, semester_index) => {
                                                return (
                                                    <div
                                                        className="card card-header bg-secondary text-white shadow-sm mb-2"
                                                        key={semester_index}
                                                    >
                                                        <div className="row align-items-center">
                                                            <div className="col-6">
                                                                <p className="small font-weight-bold-600 mb-0">
                                                                    {
                                                                        semester.semester_name
                                                                    }
                                                                </p>
                                                            </div>
                                                            <div className="col-6 text-right">
                                                                <Link
                                                                    to={`${props.match.url}/semester/${semester.semester_id}`}
                                                                >
                                                                    <button
                                                                        className="btn btn-light btn-sm shadow-none"
                                                                        onClick={() => {
                                                                            store.dispatch(
                                                                                {
                                                                                    type: "SEMESTER",
                                                                                    payload:
                                                                                        semester.semester_name,
                                                                                }
                                                                            );
                                                                        }}
                                                                    >
                                                                        View
                                                                    </button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )
                                      : null}
                              </fieldset>
                          );
                      })
                    : null
                : null}

            {/* ----- Simulation list ----- */}
            {props.data.simulation_exam ? (
                props.data.simulation_exam.length !== 0 ? (
                    <div
                        style={{
                            border: "1.4px solid #621012",
                            padding: "10px",
                            borderRadius: "6px",
                        }}
                    >
                        {props.data.simulation_exam.map(
                            (simulation, simulation_index) => {
                                return (
                                    <div
                                        className={`card card-header bg-secondary text-white shadow-sm ${
                                            props.data.simulation_exam
                                                .length ===
                                            simulation_index + 1
                                                ? ""
                                                : "mb-2"
                                        }`}
                                        key={simulation_index}
                                    >
                                        <div className="row align-items-center">
                                            <div className="col-6">
                                                <p className="small font-weight-bold-600 mb-0">
                                                    {simulation.simulation_name}
                                                </p>
                                            </div>
                                            <div className="col-6 text-right">
                                                <Link
                                                    to={`${props.match.url}/simulation/${simulation.simulation_id}`}
                                                >
                                                    <button
                                                        className="btn btn-light btn-sm shadow-none"
                                                        onClick={() => {
                                                            store.dispatch({
                                                                type: "SIMULATION",
                                                                payload:
                                                                    simulation.simulation_name,
                                                            });
                                                        }}
                                                    >
                                                        View
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        )}
                    </div>
                ) : null
            ) : null}
        </>
    );
};

const ChapterListRender = (props) => {
    return (
        <Card className="mb-1" key={props.chapter_index}>
            <Accordion.Toggle
                as={Card.Header}
                eventKey={props.chapter.chapter_id}
                className="bg-secondary text-white shadow-sm mb-2"
                style={{
                    borderRadius: "8px",
                    cursor: "default",
                }}
                onClick={() =>
                    props.toggleChapterCollapse(
                        props.chapter.chapter_id,
                        props.unit_index
                    )
                }
            >
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="row align-items-center">
                            <div className="col-1">
                                <span>
                                    <i
                                        className={`fas fa-chevron-circle-down ${
                                            props.chapterEventKey[
                                                props.unit_index
                                            ].includes(props.chapter.chapter_id)
                                                ? ""
                                                : "fa-rotate-270"
                                        }`}
                                    ></i>
                                </span>
                            </div>
                            <div className="col-11 d-flex small font-weight-bold-600 pl-1">
                                <div className="mr-3">
                                    {props.chapter_index + 1}
                                </div>
                                <div className="w-100">
                                    {props.chapter.chapter_name}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6 small font-weight-bold-600">
                        <div className="row align-items-center justify-content-end">
                            <div className="col-3">
                                {props.chapter.weightage}
                            </div>
                            <div className="col-3">
                                <Link
                                    to={`${props.match.url}/chapter/${props.chapter.chapter_id}/summary`}
                                    onClick={() => {
                                        store.dispatch({
                                            type: "CHAPTER",
                                            payload: props.chapter.chapter_name,
                                        });
                                    }}
                                >
                                    <button className="btn btn-light btn-sm">
                                        <i className="fas fa-eye fa-sm"></i>
                                    </button>
                                </Link>
                            </div>
                            <div className="col-3">
                                <Link
                                    to={`${props.match.url}/chapter/${props.chapter.chapter_id}/notes`}
                                    onClick={() => {
                                        store.dispatch({
                                            type: "CHAPTER",
                                            payload: props.chapter.chapter_name,
                                        });
                                    }}
                                >
                                    <button className="btn btn-light btn-sm">
                                        <i className="fas fa-eye fa-sm"></i>
                                    </button>
                                </Link>
                            </div>
                            <div className="col-3"></div>
                        </div>
                    </div>
                </div>
            </Accordion.Toggle>

            <Accordion.Collapse eventKey={props.chapter.chapter_id}>
                <>
                    {/* ----- Topic list ----- */}
                    {props.chapter.chapter_structure
                        ? props.chapter.chapter_structure.map(
                              (topics, topic_index) => {
                                  return (
                                      <Accordion key={topic_index}>
                                          <TopicListRender
                                              {...props}
                                              topics={topics}
                                              topic_index={topic_index}
                                          />
                                      </Accordion>
                                  );
                              }
                          )
                        : null}

                    {/* ----- Cycle test list ----- */}
                    {props.chapter.cycle_tests
                        ? props.chapter.cycle_tests.map(
                              (cycle, cycle_index) => {
                                  return (
                                      <div
                                          className="card card-header shadow-sm border-secondary mb-2"
                                          style={{
                                              backgroundColor: bgColor,
                                              paddingTop: "9px",
                                              paddingBottom: "9px",
                                          }}
                                          key={cycle_index}
                                      >
                                          <div className="row align-items-center">
                                              <div className="col-6">
                                                  <p className="small text-dark font-weight-bold-600 mb-0">
                                                      {cycle.cycle_test_name}
                                                  </p>
                                              </div>
                                              <div className="col-6 text-right">
                                                  <Link
                                                      to={`${props.match.url}/chapter/${props.chapter.chapter_id}/cycle/${cycle.cycle_test_id}`}
                                                  >
                                                      <button
                                                          className="btn btn-secondary btn-sm shadow-none"
                                                          onClick={() => {
                                                              store.dispatch({
                                                                  type: "CHAPTER",
                                                                  payload:
                                                                      props
                                                                          .chapter
                                                                          .chapter_name,
                                                              });
                                                              store.dispatch({
                                                                  type: "CYCLE",
                                                                  payload:
                                                                      cycle.cycle_test_name,
                                                              });
                                                          }}
                                                      >
                                                          View
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
                    {props.chapter.quiz
                        ? props.chapter.quiz.map((quiz, quiz_index) => {
                              return (
                                  <div
                                      className="card card-header shadow-sm border-secondary mb-2"
                                      style={{
                                          backgroundColor: bgColor,
                                          paddingTop: "9px",
                                          paddingBottom: "9px",
                                      }}
                                      key={quiz_index}
                                  >
                                      <div className="row align-items-center">
                                          <div className="col-md-6">
                                              <p className="small text-dark font-weight-bold-600 mb-0">
                                                  {quiz.quiz_name}
                                              </p>
                                          </div>
                                          <div className="col-md-6 text-right">
                                              <Link
                                                  to={`${props.match.url}/chapter/${props.chapter.chapter_id}/quiz/${quiz.quiz_id}`}
                                              >
                                                  <button
                                                      className="btn btn-secondary btn-sm shadow-none"
                                                      onClick={() => {
                                                          store.dispatch({
                                                              type: "CHAPTER",
                                                              payload:
                                                                  props.chapter
                                                                      .chapter_name,
                                                          });
                                                          store.dispatch({
                                                              type: "QUIZ",
                                                              payload:
                                                                  quiz.quiz_name,
                                                          });
                                                      }}
                                                  >
                                                      View
                                                  </button>
                                              </Link>
                                          </div>
                                      </div>
                                  </div>
                              );
                          })
                        : null}
                </>
            </Accordion.Collapse>
        </Card>
    );
};

const TopicListRender = (props) => {
    const nestedTopics = (props.topics.child || []).map((topic, index) => {
        return (
            <Accordion key={index}>
                <TopicListRender
                    {...props}
                    topics={topic}
                    topic_index={index}
                />
            </Accordion>
        );
    });

    function getTopicName(data, topic_num) {
        let topic_name = "";

        if (Array.isArray(data)) {
            data.forEach((item) => {
                if (item.topic_num === topic_num) {
                    topic_name = item.topic_name;
                } else if (item.child.length !== 0) {
                    topic_name = getTopicName(item.child, topic_num);
                }
            });
        }

        return topic_name;
    }

    return (
        <>
            <Accordion.Toggle
                as={Card.Header}
                eventKey={`topic-${props.unit_index}-${props.chapter_index}-${props.topic_index}-${props.topics.topic_num}`}
                className="border-secondary text-dark shadow-sm mb-2"
                style={{
                    borderRadius: "8px",
                    backgroundColor: bgColor,
                    paddingTop: "9px",
                    paddingBottom: "9px",
                }}
                onClick={() =>
                    props.topics.child.length !== 0
                        ? props.toggleTopicCollapse(
                              `topic-${props.unit_index}-${props.chapter_index}-${props.topic_index}-${props.topics.topic_num}`,
                              props.unit_index,
                              props.chapter_index
                          )
                        : ""
                }
            >
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="row align-items-center">
                            <div className="col-1">
                                {props.topics.child.length !== 0 ? (
                                    <div>
                                        <i
                                            className={`fas fa-chevron-circle-down ${
                                                props.topicEventKey[
                                                    props.unit_index
                                                ][props.chapter_index].includes(
                                                    `topic-${props.unit_index}-${props.chapter_index}-${props.topic_index}-${props.topics.topic_num}`
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
                            <div className="col-10 d-flex align-items-center small font-weight-bold-600 pl-1">
                                <div className="mr-3">
                                    {props.topics.topic_num}
                                </div>
                                <div className="w-100">
                                    <Link
                                        to={`${props.match.url}/chapter/${props.chapter.chapter_id}/${props.topics.topic_num}/learn`}
                                    >
                                        <button
                                            className="btn btn-sm bg-white shadow-none"
                                            onClick={() => {
                                                store.dispatch({
                                                    type: "TOPIC",
                                                    payload:
                                                        props.topics.topic_name,
                                                });
                                            }}
                                        >
                                            {props.topics.topic_name}
                                            <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-6 small primary-text font-weight-bold-600">
                        <div className="row align-items-center">
                            <div className="col-3"></div>
                            <div className="col-3"></div>
                            <div className="col-3"></div>
                            <div className="col-3">
                                {props.topics.next_topic ? (
                                    <Link
                                        to={`${props.match.url}/chapter/${props.chapter.chapter_id}/${props.topics.topic_num}/learn`}
                                    >
                                        <button
                                            className="btn btn-sm bg-white shadow-none"
                                            onClick={() => {
                                                store.dispatch({
                                                    type: "TOPIC",
                                                    payload: getTopicName(
                                                        props.chapter
                                                            .chapter_structure,
                                                        props.topics.next_topic
                                                    ),
                                                });
                                            }}
                                        >
                                            {props.topics.next_topic}
                                            <i className="fas fa-external-link-alt fa-xs ml-2"></i>
                                        </button>
                                    </Link>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Accordion.Toggle>

            <Accordion.Collapse
                eventKey={`topic-${props.unit_index}-${props.chapter_index}-${props.topic_index}-${props.topics.topic_num}`}
                className="ml-3"
            >
                <div>{nestedTopics}</div>
            </Accordion.Collapse>
        </>
    );
};

class HODCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            data: {},
            chapterEventKey: [],
            topicEventKey: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.courseId = this.props.match.params.courseId;
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

    loadCourseData = () => {
        fetch(`${this.url}/hod/course/${this.courseId}/review/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let chapterEventKey = [];
                    let topicEventKey = [];
                    if (result.data.units && result.data.units.length !== 0) {
                        result.data.units.forEach((data) => {
                            let temp = [];
                            if (data.chapters && data.chapters.length !== 0) {
                                data.chapters.forEach(() => {
                                    temp.push([]);
                                });
                            }
                            chapterEventKey.push([]);
                            topicEventKey.push(temp);
                        });
                    }

                    this.setState({
                        data: result.data,
                        chapterEventKey: chapterEventKey,
                        topicEventKey: topicEventKey,
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
        document.title = `${this.props.course_name} - HOD | IQLabs`;

        this.loadCourseData();
    };

    toggleChapterCollapse = (key, unit_index) => {
        let chapterEventKey = this.state.chapterEventKey;
        if (chapterEventKey.length !== 0 && chapterEventKey[unit_index]) {
            if (chapterEventKey[unit_index].includes(key)) {
                chapterEventKey[unit_index].splice(
                    chapterEventKey[unit_index].indexOf(key),
                    1
                );
            } else {
                chapterEventKey[unit_index][0] = key;
            }
        }

        this.setState({
            chapterEventKey: chapterEventKey,
        });
    };

    toggleTopicCollapse = (key, unit_index, chapter_index) => {
        let topicEventKey = this.state.topicEventKey;
        if (
            topicEventKey.length !== 0 &&
            topicEventKey[unit_index] &&
            topicEventKey[unit_index][chapter_index]
        ) {
            if (topicEventKey[unit_index][chapter_index].includes(key)) {
                topicEventKey[unit_index][chapter_index].splice(
                    topicEventKey[unit_index][chapter_index].indexOf(key),
                    1
                );
            } else {
                topicEventKey[unit_index][chapter_index].push(key);
            }
        }

        this.setState({
            topicEventKey: topicEventKey,
        });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.course_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
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
                                            <Link to="/hod">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            <span>Course:</span>
                                            {this.props.course_name}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6 d-flex justify-content-start justify-content-md-end">
                                <button className="btn btn-primary btn-sm shadow-none mr-1">
                                    <i className="fas fa-share-square mr-1"></i>{" "}
                                    Publish
                                </button>
                                <Link to={`${this.props.match.url}/edit`}>
                                    <button className="btn btn-primary btn-sm shadow-none">
                                        <i className="fas fa-edit mr-1"></i>{" "}
                                        Edit
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Course details */}
                        <div
                            className="card shadow-sm"
                            style={{ overflow: "auto" }}
                        >
                            <div style={{ minWidth: "900px" }}>
                                <div className="card-header primary-bg text-white">
                                    <div className="row align-items-center">
                                        <div className="col-6">
                                            Course Structure
                                        </div>
                                        <div className="col-6 pl-0">
                                            <div className="row align-items-center small">
                                                <div className="col-3">
                                                    Weightage
                                                </div>
                                                <div className="col-3">
                                                    Summary
                                                </div>
                                                <div className="col-3">
                                                    Notes
                                                </div>
                                                <div className="col-3">
                                                    Next topic
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body p-3">
                                    {/* ----- Unit list ----- */}
                                    {Object.entries(this.state.data).length !==
                                    0 ? (
                                        <UnitListRender
                                            data={this.state.data}
                                            chapterEventKey={
                                                this.state.chapterEventKey
                                            }
                                            topicEventKey={
                                                this.state.topicEventKey
                                            }
                                            toggleChapterCollapse={
                                                this.toggleChapterCollapse
                                            }
                                            toggleTopicCollapse={
                                                this.toggleTopicCollapse
                                            }
                                            {...this.props}
                                        />
                                    ) : null}
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

export default connect(mapStateToProps)(HODCourse);
