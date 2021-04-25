import React, { Component } from "react";
import { Tab, Nav } from "react-bootstrap";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";
import { Document, Page, pdfjs } from "react-pdf";

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItems: [],
            summaryData: "",
            chapterId: this.props.match.params.chapterId,
            chapter_name: "",
            page_loading: true,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
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

    // loads summary data
    loadSummaryData = async () => {
        await fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.state.chapterId}/summary/`,
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
                        summaryData: result.data,
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
        this.setState(
            {
                chapterId: this.props.match.params.chapterId,
            },
            () => {
                this.loadSummaryData();
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
                    });
                    let chapter_name = "";
                    // extract currently selected chapter name
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        if (
                            result.data.chapters[i].chapter_id ===
                            this.state.chapterId
                        ) {
                            chapter_name = result.data.chapters[i].chapter_name;
                        } else {
                            continue;
                        }
                    }
                    this.setState({
                        chapter_name: chapter_name,
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

    // loads data on selecting a chapter
    handleSelect = (index, chapter_name) => {
        this.setState(
            {
                chapterId: index,
                chapter_name: chapter_name,
                page_loading: true,
            },
            () => {
                this.loadSummaryData();
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

    render() {
        document.title = `${this.state.chapter_name} Summary - Student | IQLabs`;
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
                                    Summary
                                </li>
                            </ol>
                        </nav>

                        <div className="card shadow-sm">
                            <div className="card-body">
                                <Tab.Container
                                    id="left-tabs-example"
                                    defaultActiveKey={this.state.chapterId}
                                >
                                    <div className="row">
                                        {/* ----- chapter list ----- */}
                                        <div className="col-md-3 mb-2 mb-md-0 border-right">
                                            <Nav
                                                variant="pills"
                                                className="flex-column"
                                            >
                                                {chapter.length !== 0
                                                    ? chapter.chapters
                                                          .length !== 0
                                                        ? chapter.chapters.map(
                                                              (data, index) => {
                                                                  return (
                                                                      <Nav.Item
                                                                          className="grey-item"
                                                                          key={
                                                                              index
                                                                          }
                                                                          onClick={() =>
                                                                              this.handleSelect(
                                                                                  data.chapter_id,
                                                                                  data.chapter_name
                                                                              )
                                                                          }
                                                                      >
                                                                          <Nav.Link
                                                                              eventKey={
                                                                                  data.chapter_id
                                                                              }
                                                                              className="p-3"
                                                                          >
                                                                              {
                                                                                  data.chapter_name
                                                                              }
                                                                          </Nav.Link>
                                                                      </Nav.Item>
                                                                  );
                                                              }
                                                          )
                                                        : null
                                                    : null}
                                            </Nav>
                                        </div>

                                        {/* ----- Summary data ----- */}

                                        <div className="col-md-9 pl-md-0">
                                            <Tab.Content>
                                                <Tab.Pane
                                                    eventKey={
                                                        this.state.chapterId
                                                    }
                                                >
                                                    <div className="card">
                                                        <div className="card-body py-0">
                                                            {this.state
                                                                .summaryData
                                                                .length !== 0
                                                                ? this.state.summaryData.map(
                                                                      (
                                                                          data,
                                                                          index
                                                                      ) => {
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
                                                                                          data.summary_name
                                                                                      }
                                                                                  </div>
                                                                                  <div
                                                                                      dangerouslySetInnerHTML={{
                                                                                          __html:
                                                                                              data.summary_content,
                                                                                      }}
                                                                                  ></div>
                                                                              </div>
                                                                          );
                                                                      }
                                                                  )
                                                                : "No content to display..."}
                                                        </div>
                                                    </div>
                                                </Tab.Pane>
                                            </Tab.Content>
                                        </div>
                                    </div>
                                </Tab.Container>
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

export default Summary;