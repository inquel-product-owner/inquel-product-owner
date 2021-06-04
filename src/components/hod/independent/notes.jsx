import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import { Document, Page, pdfjs } from "react-pdf";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    chapter_name: state.content.chapter_name,
});

class HODSubjectNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            collapsed: false,
            topicEventKey: [],

            chapters: [],
            notesData: "",
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
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
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

    // loads notes data
    loadNotesData = async () => {
        await fetch(
            `${this.url}/hod/subject/${this.subjectId}/chapter/${this.chapterId}/${this.state.topic_num}/notes/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        notesData: result.data,
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
            .catch((err) => {
                console.log(err);
            });
        window.MathJax.typeset();
    };

    componentDidMount = () => {
        fetch(
            `${this.url}/hod/subject/${this.subjectId}/chapter/${this.chapterId}/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState(
                        {
                            chapterList: result.data.chapters,
                        },
                        () => {
                            let topicName = "";
                            let topic_num = "";
                            for (
                                let i = 0;
                                i < result.data.chapter_structure.length;
                                i++
                            ) {
                                // extract topic name from the current chapter
                                if (result.data.chapter_id === this.chapterId) {
                                    topicName =
                                        result.data.chapter_structure.length !==
                                        0
                                            ? result.data.chapter_structure[0]
                                                  .topic_name
                                            : "Topic";
                                    topic_num =
                                        result.data.chapter_structure.length !==
                                        0
                                            ? result.data.chapter_structure[0]
                                                  .topic_num
                                            : "1.1";
                                } else {
                                    continue;
                                }
                            }
                            this.setState(
                                {
                                    chapters: result.data.chapter_structure,
                                    topicName: topicName,
                                    topic_num: topic_num,
                                },
                                () => {
                                    this.loadNotesData();
                                }
                            );
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.msg,
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
    topic = (data, index) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return (
                <Accordion key={index}>{this.topic(topic, index)}</Accordion>
            );
        });

        let topicEventKey = this.state.topicEventKey;

        return (
            <>
                <Accordion.Toggle
                    as={Card.Header}
                    eventKey={`topic-${data.topic_num}`}
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
                                  `topic-${data.topic_num}`
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
                                                    topicEventKey.includes(
                                                        `topic-${data.topic_num}`
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
                    eventKey={`topic-${data.topic_num}`}
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
                    name={this.props.subject_name}
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
                                    <Link to="/hod">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/hod/subject/${this.subjectId}`}>
                                        {this.props.subject_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        {this.props.chapter_name}
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
                                        <div className="card">
                                            <Accordion defaultActiveKey="0">
                                                <Card className="mb-1">
                                                    <Accordion.Toggle
                                                        as={Card.Header}
                                                        eventKey="0"
                                                        className="pinkrange-bg shadow-sm mb-2"
                                                        style={{
                                                            borderRadius: "8px",
                                                            cursor: "default",
                                                        }}
                                                        onClick={() =>
                                                            this.setState({
                                                                collapsed:
                                                                    !this.state
                                                                        .collapsed,
                                                            })
                                                        }
                                                    >
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
                                                            <div className="col-10 small font-weight-bold-600">
                                                                {
                                                                    this.props
                                                                        .chapter_name
                                                                }
                                                            </div>
                                                        </div>
                                                    </Accordion.Toggle>

                                                    <Accordion.Collapse eventKey="0">
                                                        <Card>
                                                            {/* ----- Topic list ----- */}
                                                            {this.state.chapters
                                                                .length !== 0
                                                                ? this.state.chapters.map(
                                                                      (
                                                                          data,
                                                                          index
                                                                      ) => {
                                                                          return (
                                                                              <Accordion
                                                                                  key={
                                                                                      index
                                                                                  }
                                                                              >
                                                                                  {this.topic(
                                                                                      data,
                                                                                      index
                                                                                  )}
                                                                              </Accordion>
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

                                    {/* ----- Notes data ----- */}

                                    <div className="col-md-9 pl-md-0">
                                        <div className="card">
                                            <div className="card-body py-0">
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
                                                                      <div className="h5 font-weight-bold-600 mb-3">
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

export default connect(mapStateToProps)(HODSubjectNotes);
