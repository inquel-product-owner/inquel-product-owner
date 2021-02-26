import React, { Component } from "react";
import { Accordion, Card } from "react-bootstrap";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Link } from "react-router-dom";
import Loading from "../sharedComponents/loader";
import AlertModal from "../sharedComponents/alertModal";
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
            topicName: this.props.match.params.topicName,
            page_loading: true,
            showAlertModal: false,
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
        this.collapsed = [];
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
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
                        alertMsg: result.detail ? result.detail : result.msg,
                        showAlertModal: true,
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
                topicName: this.props.match.params.topicName,
            },
            () => {
                this.loadNotesData();
            }
        );

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
                        page_loading: false,
                    });
                    let collapsed = [];
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        collapsed.push(i === 0 ? false : true);
                    }
                    this.setState({
                        collapsed: collapsed,
                    });
                } else {
                    this.setState({
                        alertMsg: result.detail ? result.detail : result.msg,
                        showAlertModal: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSelect = (chapterId, topicName) => {
        this.setState(
            {
                chapterId: chapterId,
                topicName: topicName,
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

    topic = (data, index, chapter_id) => {
        const nestedTopics = (data.child || []).map((topic, index) => {
            return this.topic(topic, index, chapter_id);
        });

        return (
            <div key={index}>
                <Card.Header
                    className={`small ${
                        this.state.topicName === data.topic_name
                            ? "light-bg"
                            : "bg-light"
                    } shadow-sm mb-2`}
                    onClick={() =>
                        this.handleSelect(chapter_id, data.topic_name)
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

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* ALert modal */}
                {this.state.showAlertModal ? (
                    <AlertModal
                        show={this.state.showAlertModal}
                        msg={this.state.alertMsg}
                        goBack={this.props.history.goBack}
                    />
                ) : null}

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

                        {/* Chapter list */}
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3 mb-2 mb-md-0 border-right">
                                        <div className="card">
                                            <Accordion defaultActiveKey="chapter-0">
                                                {chapter.length !== 0
                                                    ? chapter.chapters
                                                          .length !== 0
                                                        ? chapter.chapters.map(
                                                              (data, index) => {
                                                                  this.collapsed.push(
                                                                      index ===
                                                                          0
                                                                          ? false
                                                                          : true
                                                                  );
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
