import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import Loading from "../../shared/loader";
import AlertBox from "../../shared/alert";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import { Document, Page, pdfjs } from "react-pdf";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    course_name: state.content.course_name,
});

class HODCourseNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            chapterEventKey: [],
            topicEventKey: [],

            data: [],
            notesData: "",
            chapterId: this.props.match.params.chapterId,
            topicName: "",
            topic_num: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
            numPages: null,
            pageNumber: 1,
        };
        this.courseId = this.props.match.params.courseId;
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    // loads notes data
    loadNotesData = async () => {
        await fetch(
            `${this.url}/hod/course/${this.courseId}/review/chapter/${this.state.chapterId}/${this.state.topic_num}/notes/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        notesData: result.data,
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
        fetch(`${this.url}/hod/course/${this.courseId}/review/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let topicName = "";
                    let topic_num = "";
                    let topicEventKey = [];
                    if (result.data.units && result.data.units.length !== 0) {
                        result.data.units.forEach((data) => {
                            let temp = [];
                            if (data.chapters && data.chapters.length !== 0) {
                                data.chapters.forEach((item) => {
                                    temp.push([]);
                                    // extract topic name from the current chapter
                                    if (
                                        item.chapter_id === this.state.chapterId
                                    ) {
                                        topicName = item.chapter_structure
                                            ? item.chapter_structure[0]
                                                  .topic_name
                                            : "Topic";
                                        topic_num = item.chapter_structure
                                            ? item.chapter_structure[0]
                                                  .topic_num
                                            : "1.1";
                                    }
                                });
                            }
                            topicEventKey.push(temp);
                        });
                    }
                    this.setState(
                        {
                            data: result.data.units,
                            topicName: topicName,
                            topic_num: topic_num,
                            topicEventKey: topicEventKey,
                            chapterEventKey: this.state.chapterId,
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

    toggleChapterCollapse = (key) => {
        let chapterEventKey = "";
        if (this.state.chapterEventKey !== key) {
            chapterEventKey = key;
        }

        let topicName = "";
        let topic_num = "";
        (this.state.data || []).forEach((unit) => {
            (unit.chapters || []).forEach((chapter) => {
                if (chapter.chapter_id === key) {
                    topicName = chapter.chapter_structure
                        ? chapter.chapter_structure[0].topic_name
                        : "Topic";
                    topic_num = chapter.chapter_structure
                        ? chapter.chapter_structure[0].topic_num
                        : "1.1";
                }
            });
        });
        this.setState(
            {
                chapterEventKey: chapterEventKey,
                chapterId: key,
                topicName: topicName,
                topic_num: topic_num,
            },
            () => {
                if (this.state.chapterEventKey === key) {
                    this.setState({
                        page_loading: true,
                    });
                    this.loadNotesData();
                }
            }
        );
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

    // loads data on selecting a topic
    handleSelect = (topicName, topic_num) => {
        this.setState(
            {
                topicName: topicName,
                topic_num: topic_num,
                page_loading: true,
            },
            () => {
                this.loadNotesData();
            }
        );
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

    // topic list
    topic = (data, index, chapter_index, unit_index) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return (
                <Accordion key={index}>
                    {this.topic(topic, index, chapter_index, unit_index)}
                </Accordion>
            );
        });

        let topicEventKey = this.state.topicEventKey;

        return (
            <>
                <Accordion.Toggle
                    as={Card.Header}
                    eventKey={`topic-${unit_index}-${chapter_index}-${index}-${data.topic_num}`}
                    className={`${
                        this.state.topic_num === data.topic_num &&
                        this.state.topicName === data.topic_name
                            ? "light-bg"
                            : "bg-light"
                    } shadow-sm py-2 align-items-center mb-2`}
                    style={{
                        borderRadius: "8px",
                        cursor: "default",
                    }}
                    onClick={() =>
                        data.child.length !== 0
                            ? this.toggleTopicCollapse(
                                  `topic-${unit_index}-${chapter_index}-${index}-${data.topic_num}`,
                                  unit_index,
                                  chapter_index
                              )
                            : ""
                    }
                >
                    <div className="row align-items-center">
                        <div className="col-9">
                            <div className="row align-items-center">
                                {data.child.length !== 0 ? (
                                    <div className="col-1">
                                        <span>
                                            <i
                                                className={`fas fa-chevron-circle-down ${
                                                    topicEventKey[unit_index][
                                                        chapter_index
                                                    ].includes(
                                                        `topic-${unit_index}-${chapter_index}-${index}-${data.topic_num}`
                                                    )
                                                        ? "fa-rotate-360"
                                                        : "fa-rotate-270"
                                                }`}
                                            ></i>
                                        </span>
                                    </div>
                                ) : (
                                    ""
                                )}
                                <div
                                    className={`${
                                        data.child.length !== 0
                                            ? "col-9 pr-0"
                                            : "col-12"
                                    } d-flex small font-weight-bold-600`}
                                >
                                    <div className="mr-2">{data.topic_num}</div>
                                    <div className="w-100 text-truncate">
                                        {data.topic_name}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 text-right pr-1">
                            <button
                                className="btn btn-link btn-sm shadow-none"
                                onClick={(e) => {
                                    this.handleSelect(
                                        data.topic_name,
                                        data.topic_num
                                    );
                                    e.stopPropagation();
                                }}
                            >
                                <i className="fas fa-eye"></i>
                            </button>
                        </div>
                    </div>
                </Accordion.Toggle>

                <Accordion.Collapse
                    eventKey={`topic-${unit_index}-${chapter_index}-${index}-${data.topic_num}`}
                    className="ml-2"
                >
                    <div>{nestedTopics}</div>
                </Accordion.Collapse>
            </>
        );
    };

    render() {
        document.title = `${this.state.topicName} : Notes - HOD | IQLabs`;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.course_name}
                    togglenav={this.toggleSideNav}
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

                        {/* Breadcrumb */}
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
                                        {this.props.course_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Notes
                                </li>
                            </ol>
                        </nav>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row">
                                    {/* ----- Chapter list ----- */}
                                    <div className="col-md-3 mb-2 mb-md-0 border-right">
                                        <Accordion
                                            defaultActiveKey={
                                                this.state.chapterId
                                            }
                                        >
                                            {(this.state.data || []).map(
                                                (unit, unit_index) => {
                                                    return (
                                                        <fieldset
                                                            className="border-primary mb-2"
                                                            key={unit_index}
                                                        >
                                                            <legend className="primary-bg text-white">
                                                                {unit.unit_name}
                                                            </legend>
                                                            {/* ----- Chapter list ----- */}
                                                            {(
                                                                unit.chapters ||
                                                                []
                                                            ).map(
                                                                (
                                                                    chapter,
                                                                    chapter_index
                                                                ) => {
                                                                    return (
                                                                        <Card
                                                                            className="mb-1"
                                                                            key={
                                                                                chapter_index
                                                                            }
                                                                        >
                                                                            <Accordion.Toggle
                                                                                as={
                                                                                    Card.Header
                                                                                }
                                                                                eventKey={
                                                                                    chapter.chapter_id
                                                                                }
                                                                                className="pinkrange-bg shadow-sm mb-2"
                                                                                style={{
                                                                                    borderRadius:
                                                                                        "8px",
                                                                                    cursor: "default",
                                                                                }}
                                                                                onClick={() =>
                                                                                    this.toggleChapterCollapse(
                                                                                        chapter.chapter_id
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
                                                                                                        .chapterEventKey ===
                                                                                                    chapter.chapter_id
                                                                                                        ? ""
                                                                                                        : "fa-rotate-270"
                                                                                                }`}
                                                                                            ></i>
                                                                                        </span>
                                                                                    </div>
                                                                                    <div className="col-10 small font-weight-bold-600">
                                                                                        {
                                                                                            chapter.chapter_name
                                                                                        }
                                                                                    </div>
                                                                                </div>
                                                                            </Accordion.Toggle>

                                                                            <Accordion.Collapse
                                                                                eventKey={
                                                                                    chapter.chapter_id
                                                                                }
                                                                            >
                                                                                <Card>
                                                                                    {chapter.chapter_structure.map(
                                                                                        (
                                                                                            topics,
                                                                                            topic_index
                                                                                        ) => {
                                                                                            return (
                                                                                                <Accordion
                                                                                                    key={
                                                                                                        topic_index
                                                                                                    }
                                                                                                >
                                                                                                    {this.topic(
                                                                                                        topics,
                                                                                                        topic_index,
                                                                                                        chapter_index,
                                                                                                        unit_index
                                                                                                    )}
                                                                                                </Accordion>
                                                                                            );
                                                                                        }
                                                                                    )}
                                                                                </Card>
                                                                            </Accordion.Collapse>
                                                                        </Card>
                                                                    );
                                                                }
                                                            )}
                                                        </fieldset>
                                                    );
                                                }
                                            )}
                                        </Accordion>
                                    </div>

                                    {/* ----- Notes data ----- */}

                                    <div className="col-md-9 pl-md-0">
                                        <div className="card">
                                            <div className="card-body">
                                                {this.state.notesData.length !==
                                                0
                                                    ? this.state.notesData.map(
                                                          (data, index) => {
                                                              return data.direct_question_urls !==
                                                                  undefined ? (
                                                                  <div
                                                                      className="text-center"
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <div id="ResumeContainer py-3">
                                                                          <Document
                                                                              file={
                                                                                  data
                                                                                      .direct_question_urls[0]
                                                                              }
                                                                              onLoadSuccess={
                                                                                  this
                                                                                      .onDocumentLoadSuccess
                                                                              }
                                                                              className={
                                                                                  "PDFDocument"
                                                                              }
                                                                          >
                                                                              <Page
                                                                                  pageNumber={
                                                                                      this
                                                                                          .state
                                                                                          .pageNumber
                                                                                  }
                                                                                  className={
                                                                                      "PDFPagee shadow"
                                                                                  }
                                                                              />
                                                                          </Document>
                                                                      </div>
                                                                      <p className="my-3">
                                                                          Page{" "}
                                                                          {
                                                                              this
                                                                                  .state
                                                                                  .pageNumber
                                                                          }{" "}
                                                                          of{" "}
                                                                          {
                                                                              this
                                                                                  .state
                                                                                  .numPages
                                                                          }
                                                                      </p>
                                                                      <nav>
                                                                          {this
                                                                              .state
                                                                              .numPages >
                                                                          1 ? (
                                                                              <>
                                                                                  <button
                                                                                      className="btn btn-primary btn-sm mr-2"
                                                                                      onClick={
                                                                                          this
                                                                                              .goToPrevPage
                                                                                      }
                                                                                      disabled={
                                                                                          this
                                                                                              .state
                                                                                              .pageNumber ===
                                                                                          1
                                                                                              ? true
                                                                                              : false
                                                                                      }
                                                                                  >
                                                                                      Prev
                                                                                  </button>
                                                                                  <button
                                                                                      className="btn btn-primary btn-sm"
                                                                                      onClick={
                                                                                          this
                                                                                              .goToNextPage
                                                                                      }
                                                                                      disabled={
                                                                                          this
                                                                                              .state
                                                                                              .numPages ===
                                                                                          this
                                                                                              .state
                                                                                              .pageNumber
                                                                                              ? true
                                                                                              : false
                                                                                      }
                                                                                  >
                                                                                      Next
                                                                                  </button>
                                                                              </>
                                                                          ) : (
                                                                              ""
                                                                          )}
                                                                      </nav>
                                                                  </div>
                                                              ) : (
                                                                  <div
                                                                      key={
                                                                          index
                                                                      }
                                                                  >
                                                                      <div className="h5 font-weight-bold-600 mb-2">
                                                                          {
                                                                              data.notes_name
                                                                          }
                                                                      </div>
                                                                      <div
                                                                          dangerouslySetInnerHTML={{
                                                                              __html: data.notes_content,
                                                                          }}
                                                                      ></div>
                                                                  </div>
                                                              );
                                                          }
                                                      )
                                                    : "No content to display..."}
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

export default connect(mapStateToProps)(HODCourseNotes);