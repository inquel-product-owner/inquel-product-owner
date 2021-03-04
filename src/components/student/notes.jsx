import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Link } from "react-router-dom";
import Loading from "../sharedComponents/loader";
import AlertBox from "../sharedComponents/alert";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import { Document, Page, pdfjs } from "react-pdf";

class Notes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            collapsed: [],
            subjectItems: [],
            notesData: "",
            chapterId: this.props.match.params.chapterId,
            topicName: "",
            topic_num: "",
            page_loading: true,
            errorMsg: "",
            showErrorAlert: false,
            numPages: null,
            pageNumber: 1,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.url = baseUrl + studentUrl;
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

    // loads notes data
    loadNotesData = () => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.state.chapterId}/notes/?topic_name=${this.state.topicName}`,
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
                    let topicName = "";
                    let topic_num = "";
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        // adds collapse state
                        collapsed.push(
                            result.data.chapters[i].chapter_id ===
                                this.state.chapterId
                                ? false
                                : true
                        );
                        // extract topic name from the current chapter
                        if (
                            result.data.chapters[i].chapter_id ===
                            this.state.chapterId
                        ) {
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
    handleSelect = (chapterId, topicName, topic_num) => {
        this.setState(
            {
                chapterId: chapterId,
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
    topic = (data, index, chapter_id) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return this.topic(topic, index, chapter_id);
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
                        this.handleSelect(
                            chapter_id,
                            data.topic_name,
                            data.topic_num
                        )
                    }
                    style={{ borderRadius: "8px", cursor: "pointer" }}
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

    render() {
        document.title = `${this.state.topicName} Notes - Student | IQLabs`;
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
                    successMsg="NODATA"
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={false}
                    toggleSuccessAlert=""
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
                                        Course
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
                                    {/* Chapter list */}
                                    <div className="col-md-3 mb-2 mb-md-0 border-right">
                                        <div className="card">
                                            <Accordion
                                                defaultActiveKey={
                                                    this.state.chapterId
                                                }
                                            >
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
                                                                              eventKey={
                                                                                  data.chapter_id
                                                                              }
                                                                              className="pinkrange-bg shadow-sm mb-2"
                                                                              style={{
                                                                                  cursor:
                                                                                      "pointer",
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
                                                                              eventKey={
                                                                                  data.chapter_id
                                                                              }
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
                                                                                                      data.chapter_id
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
                                    {/* Notes data */}
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
                                                                              __html:
                                                                                  data.notes_content,
                                                                          }}
                                                                      ></div>
                                                                  </div>
                                                              );
                                                          }
                                                      )
                                                    : null}
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

export default Notes;
