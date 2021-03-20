import React, { Component } from "react";
import Header from "./shared/examNavbar";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../sharedComponents/alert";
import Loading from "../sharedComponents/loader";
import { Document, Page, pdfjs } from "react-pdf";
import dateFormat from "dateformat";

class TestPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject_name: "",
            section: [],
            totalSection: 0,
            currentSectionIndex: 0,
            numPages: null,
            pageNumber: 1,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
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
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
        this.result = JSON.parse(sessionStorage.getItem("data"));
    }

    loopAutoSection = () => {
        let sections = [];
        let questions = [];
        this.result.data.forEach((data) => {
            data.sections.forEach((section) => {
                questions = [];
                for (let i = 0; i < section.questions.length; i++) {
                    questions.push({
                        question: section.questions[i].question,
                        question_random_id:
                            section.questions[i].question_random_id,
                        proper_answer: section.questions[i].proper_answer,
                        answer: section.questions[i].answer,
                        mark: section.questions[i].marks,
                    });
                }
                sections.push(questions);
            });
        });
        this.setState({
            section: sections,
            totalSection: sections.length,
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
                        subject_name: result.data.subject_name,
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

        if (this.result.auto === true) {
            this.loopAutoSection();
        }
    };

    // ---------- Navigation ----------

    handlePrev = () => {
        this.setState({
            currentSectionIndex: this.state.currentSectionIndex - 1,
        });
    };

    handleNext = () => {
        this.setState({
            currentSectionIndex: this.state.currentSectionIndex + 1,
        });
    };

    componentWillUnmount = () => {
        sessionStorage.removeItem("data");
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        document.title = `${this.result.cycle_test_name} test preview - Teacher | IQLabs`;
        var data = [];
        if (this.result.auto === true) {
            data = this.state.section[this.state.currentSectionIndex] || [];
        }
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={this.result.cycle_test_name}
                    goBack={this.props.history.goBack}
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

                <div className="exam-section">
                    <div className="container-fluid">
                        {this.result.direct === true ? (
                            <>
                                {/* Header configuration */}
                                <div className="row align-items-center justify-content-center mb-3">
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <p className="mb-2 font-weight-bold-600">
                                                Exam Date:
                                            </p>
                                            <p className="small mb-0">
                                                {dateFormat(
                                                    this.result.data.exam_date,
                                                    "dd/mm/yyyy"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="form-group">
                                            <p className="mb-2 font-weight-bold-600">
                                                Submission Time:
                                            </p>
                                            <p className="small mb-0">
                                                {dateFormat(
                                                    this.result.data
                                                        .submission_time,
                                                    "dd/mm/yyyy hh:MM:ss"
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card light-bg shadow-sm">
                                    {/* File displaying */}
                                    <div className="card-body">
                                        <div
                                            className="card card-body secondary-bg text-center"
                                            style={{ minHeight: "40vh" }}
                                        >
                                            <div id="ResumeContainer">
                                                <Document
                                                    file={
                                                        this.result.data
                                                            .answer_file_url
                                                    }
                                                    onLoadSuccess={
                                                        this
                                                            .onDocumentLoadSuccess
                                                    }
                                                    className={"PDFDocument"}
                                                >
                                                    <Page
                                                        pageNumber={
                                                            this.state
                                                                .pageNumber
                                                        }
                                                        className={
                                                            "PDFPage shadow"
                                                        }
                                                    />
                                                </Document>
                                            </div>
                                            <p className="my-3">
                                                Page {this.state.pageNumber} of{" "}
                                                {this.state.numPages}
                                            </p>
                                            <nav>
                                                <button
                                                    className="btn btn-primary btn-sm mr-2"
                                                    onClick={this.goToPrevPage}
                                                    disabled={
                                                        this.state
                                                            .pageNumber === 1
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    Prev
                                                </button>
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={this.goToNextPage}
                                                    disabled={
                                                        this.state.numPages ===
                                                        this.state.pageNumber
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    Next
                                                </button>
                                            </nav>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                {data.length !== 0
                                    ? data.map((question, q_index) => {
                                          return (
                                              <div
                                                  className="d-flex align-items-start justify-content mb-3"
                                                  key={q_index}
                                              >
                                                  <button className="btn btn-light light-bg btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg">
                                                      {q_index <= 8
                                                          ? `0${q_index + 1}`
                                                          : q_index + 1}
                                                  </button>
                                                  <div
                                                      className="card light-bg shadow-sm"
                                                      style={{ width: "100%" }}
                                                  >
                                                      <div className="card-body">
                                                          <div
                                                              className="font-weight-bold-600 py-2"
                                                              dangerouslySetInnerHTML={{
                                                                  __html:
                                                                      question.question,
                                                              }}
                                                          ></div>

                                                          {/* ---------- Options ---------- */}

                                                          <div className="row">
                                                              {question.proper_answer.map(
                                                                  (
                                                                      option,
                                                                      option_index
                                                                  ) => {
                                                                      return (
                                                                          <div
                                                                              className="col-md-6"
                                                                              key={
                                                                                  option_index
                                                                              }
                                                                          >
                                                                              <div className="form-group">
                                                                                  <div
                                                                                      className={`card shadow-sm ${
                                                                                          option.correct !==
                                                                                          undefined
                                                                                              ? option.correct
                                                                                                  ? "success-bg"
                                                                                                  : "bg-white"
                                                                                              : ""
                                                                                      }`}
                                                                                  >
                                                                                      <div className="card-body small py-3">
                                                                                          {option.content !==
                                                                                          undefined
                                                                                              ? option.content
                                                                                              : option}
                                                                                      </div>
                                                                                  </div>
                                                                              </div>
                                                                          </div>
                                                                      );
                                                                  }
                                                              )}
                                                          </div>

                                                          {/* ---------- Student answers ---------- */}

                                                          <div className="row">
                                                              <div className="col-md-6">
                                                                  <div
                                                                      className={`card card-body ${
                                                                          question.mark ===
                                                                          0
                                                                              ? "danger-bg"
                                                                              : "success-bg"
                                                                      } h-100`}
                                                                      style={{
                                                                          minHeight:
                                                                              "100px",
                                                                      }}
                                                                  >
                                                                      <p className="font-weight-bold-600 mb-2">
                                                                          Your
                                                                          answer(s):
                                                                      </p>
                                                                      {question.answer.map(
                                                                          (
                                                                              answer,
                                                                              answer_index
                                                                          ) => {
                                                                              return (
                                                                                  <p
                                                                                      className="small mb-2"
                                                                                      key={
                                                                                          answer_index
                                                                                      }
                                                                                  >
                                                                                      {
                                                                                          answer
                                                                                      }
                                                                                  </p>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ""}

                                {/* Navigation */}
                                <div className="row">
                                    <div className="col-6">
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handlePrev}
                                            disabled={
                                                this.state.currentSectionIndex >
                                                0
                                                    ? false
                                                    : true
                                            }
                                        >
                                            <i className="fas fa-angle-left mr-1"></i>{" "}
                                            Previous
                                        </button>
                                    </div>
                                    <div className="col-6 text-right">
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleNext}
                                            disabled={
                                                this.state.currentSectionIndex +
                                                    1 >=
                                                this.state.totalSection
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Next
                                            <i className="fas fa-angle-right ml-2"></i>
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

export default TestPreview;
