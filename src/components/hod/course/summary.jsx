import React, { Component } from "react";
import { Tab, Nav } from "react-bootstrap";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import Loading from "../../common/loader";
import AlertBox from "../../common/alert";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import { Document, Page, pdfjs } from "react-pdf";
import { connect } from "react-redux";

const mapStateToProps = (state) => ({
    course_name: state.content.course_name,
});

class HODCourseSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            data: [],
            summaryData: "",
            chapterId: this.props.match.params.chapterId,
            chapter_name: "",

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

    // loads summary data
    loadSummaryData = async () => {
        await fetch(
            `${this.url}/hod/course/${this.courseId}/review/chapter/${this.state.chapterId}/summary/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        summaryData: result.data,
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
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
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

        fetch(`${this.url}/hod/course/${this.courseId}/review/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    // extract currently selected chapter name
                    let chapter_name = "";
                    result.data.units.forEach((unit) => {
                        (unit.chapters || []).forEach((chapter) => {
                            if (chapter.chapter_id === this.state.chapterId) {
                                chapter_name = chapter.chapter_name;
                            }
                        });
                    });
                    this.setState({
                        data: result.data.units,
                        chapter_name: chapter_name,
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
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
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
        document.title = `${this.state.chapter_name} : Summary - HOD | IQLabs`;
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
                                    <Link to="/hod">
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
                                            {this.state.data.length !== 0
                                                ? this.state.data.map(
                                                      (unit, unit_index) => {
                                                          return (
                                                              <fieldset
                                                                  className="border-secondary mb-2"
                                                                  key={
                                                                      unit_index
                                                                  }
                                                              >
                                                                  <legend className="bg-secondary text-white">
                                                                      {
                                                                          unit.unit_name
                                                                      }
                                                                  </legend>
                                                                  {/* ----- Chapter list ----- */}
                                                                  <Nav
                                                                      variant="pills"
                                                                      className="flex-column"
                                                                  >
                                                                      {(
                                                                          unit.chapters ||
                                                                          []
                                                                      ).map(
                                                                          (
                                                                              chapter,
                                                                              chapter_index
                                                                          ) => {
                                                                              return (
                                                                                  <Nav.Item
                                                                                      className="bg-light grey-item shadow-sm mb-2"
                                                                                      key={
                                                                                          chapter_index
                                                                                      }
                                                                                      onClick={() =>
                                                                                          this.handleSelect(
                                                                                              chapter.chapter_id,
                                                                                              chapter.chapter_name
                                                                                          )
                                                                                      }
                                                                                  >
                                                                                      <Nav.Link
                                                                                          eventKey={
                                                                                              chapter.chapter_id
                                                                                          }
                                                                                          style={{
                                                                                              padding:
                                                                                                  "12px",
                                                                                          }}
                                                                                      >
                                                                                          {
                                                                                              chapter.chapter_name
                                                                                          }
                                                                                      </Nav.Link>
                                                                                  </Nav.Item>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </Nav>
                                                              </fieldset>
                                                          );
                                                      }
                                                  )
                                                : ""}
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
                                                                                  <div className="h5 font-weight-bold-600 mb-3">
                                                                                      {
                                                                                          data.summary_name
                                                                                      }
                                                                                  </div>
                                                                                  <div
                                                                                      dangerouslySetInnerHTML={{
                                                                                          __html: data.summary_content,
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

export default connect(mapStateToProps)(HODCourseSummary);
