import React, { Component } from "react";
import Header from "./shared/examNavbar";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../shared/alert";
import Loading from "../shared/loader";
import { Document, Page, pdfjs } from "react-pdf";
import dateFormat from "dateformat";
import ExplanationModal from "../shared/explanationModal";

class TestPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showExplanationModal: false,
            selectedData: "",

            subject_name: "",
            questions: [],

            totalSection: 0,
            currentSectionIndex: 0,
            totalSubQuestion: [],
            currentSubQuestionIndex: [],
            totalQuestion: 0,

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
        this.cycleTestId = this.props.match.params.cycleTestId;
        this.semesterId = this.props.match.params.semesterId;
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

    loopAutoSection = async () => {
        let sections = [];
        let questions = [];
        let totalSubQuestion = [];
        let currentSubQuestionIndex = [];
        let totalQuestion = 0;
        this.result.data.forEach((data) => {
            if (
                data.cycle_test_id === this.cycleTestId ||
                data.semester_id === this.semesterId
            ) {
                data.sections.forEach((section) => {
                    questions = [];
                    let total = [];
                    let current = [];
                    for (let i = 0; i < section.questions.length; i++) {
                        totalQuestion++;
                        if (section.questions[i].sub_question === undefined) {
                            total.push(0);
                            current.push(0);
                            questions.push({
                                type: "type_1",
                                question: section.questions[i].question,
                                question_random_id:
                                    section.questions[i].question_random_id,
                                explanation: section.questions[i].explanation,
                                proper_answer:
                                    section.questions[i].proper_answer,
                                answer: section.questions[i].answer,
                                marks: section.questions[i].marks,
                            });
                        } else if (
                            section.questions[i].sub_question !== undefined
                        ) {
                            let sub_question = [];
                            total.push(
                                section.questions[i].sub_question.length
                            );
                            current.push(0);

                            for (
                                let j = 0;
                                j < section.questions[i].sub_question.length;
                                j++
                            ) {
                                sub_question.push({
                                    question:
                                        section.questions[i].sub_question[j]
                                            .sub_question || "",
                                    sub_question_id:
                                        section.questions[i].sub_question[j]
                                            .sub_question_id,
                                    proper_answer:
                                        section.questions[i].sub_question[j]
                                            .proper_answer,
                                    answer: section.questions[i].sub_question[j]
                                        .answer,
                                    marks: section.questions[i].sub_question[j]
                                        .marks,
                                });
                            }
                            questions.push({
                                type: "type_2",
                                question: section.questions[i].question,
                                question_random_id:
                                    section.questions[i].question_random_id,
                                explanation: section.questions[i].explanation,
                                sub_question: sub_question,
                            });
                        }
                    }
                    totalSubQuestion.push(total);
                    currentSubQuestionIndex.push(current);
                    sections.push(questions);
                });
            }
        });
        await this.setState({
            questions: sections,
            totalSubQuestion: totalSubQuestion,
            currentSubQuestionIndex: currentSubQuestionIndex,
            totalSection: sections.length,
            totalQuestion: totalQuestion,
        });
        window.MathJax.typeset();
    };

    componentDidMount = () => {
        if (!sessionStorage.getItem("data")) {
            this.props.history.goBack();
        }

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

    componentWillUnmount = () => {
        sessionStorage.removeItem("data");
    };

    // ---------- Navigation ----------

    handlePrev = async () => {
        await this.setState({
            currentSectionIndex: this.state.currentSectionIndex - 1,
        });
        window.MathJax.typeset();
    };

    handleNext = async () => {
        await this.setState({
            currentSectionIndex: this.state.currentSectionIndex + 1,
        });
        window.MathJax.typeset();
    };

    handleSubQPrev = async (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[this.state.currentSectionIndex][main_index] =
            index[this.state.currentSectionIndex][main_index] - 1;
        await this.setState({
            currentSubQuestionIndex: index,
        });
        window.MathJax.typeset();
    };

    handleSubQNext = async (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[this.state.currentSectionIndex][main_index] =
            index[this.state.currentSectionIndex][main_index] + 1;
        await this.setState({
            currentSubQuestionIndex: index,
        });
        window.MathJax.typeset();
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

    toggleModal = (data) => {
        this.setState({
            showExplanationModal: !this.state.showExplanationModal,
            selectedData: data,
        });
    };

    render() {
        document.title = `${
            this.result.cycle_test_name || this.result.semester_name
        } test preview - Teacher | IQLabs`;
        var data = [];
        if (this.result.auto === true) {
            data = this.state.questions[this.state.currentSectionIndex] || [];
        }
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={
                        this.result.cycle_test_name || this.result.semester_name
                    }
                    goBack={this.props.history.goBack}
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

                {/* Explanation modal */}
                <ExplanationModal
                    show={this.state.showExplanationModal}
                    onHide={this.toggleModal}
                    data={this.state.selectedData}
                />

                <div className="exam-section">
                    <div className="container-fluid">
                        {this.result.direct === true ? (
                            <>
                                {/* Header configuration */}
                                <div className="card card-body primary-bg text-white small shadow-sm mb-3">
                                    <div className="row align-items-center justify-content-center text-center">
                                        <div className="col-md-2">
                                            <span className="font-weight-bold-600">
                                                Exam Date:
                                            </span>{" "}
                                            {dateFormat(
                                                this.result.data.exam_date,
                                                "dd/mm/yyyy"
                                            )}
                                        </div>
                                        <div className="col-md-3">
                                            <span className="font-weight-bold-600">
                                                Submitted On:
                                            </span>{" "}
                                            {dateFormat(
                                                this.result.data
                                                    .submission_time,
                                                "dd/mm/yyyy hh:MM"
                                            )}
                                        </div>
                                        <div className="col-md-2">
                                            <span className="font-weight-bold-600">
                                                Scored Marks:
                                            </span>{" "}
                                            {
                                                this.result.data
                                                    .obtained_test_marks
                                            }
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
                                {/* ----- Header Info ----- */}
                                <div className="card card-body primary-bg text-white font-weight-bold-600 small shadow-sm py-3 mb-3">
                                    <div className="row align-items-center">
                                        <div className="col-md-5">
                                            {
                                                this.result.data[0].sections[
                                                    this.state
                                                        .currentSectionIndex
                                                ].section_description
                                            }
                                        </div>
                                        <div className="col-md-7">
                                            <div className="row align-items-center justify-content-end">
                                                <div className="col-md-3">
                                                    Total questions:{" "}
                                                    {this.state.totalQuestion <=
                                                    8
                                                        ? `0${this.state.totalQuestion}`
                                                        : this.state
                                                              .totalQuestion}
                                                </div>
                                                <div className="col-md-3">
                                                    Scored marks:{" "}
                                                    {this.result.data[0]
                                                        .student_scored_marks <=
                                                    8
                                                        ? `0${this.result.data[0].student_scored_marks}`
                                                        : this.result.data[0]
                                                              .student_scored_marks}
                                                </div>
                                                <div className="col-md-4">
                                                    Submitted On:{" "}
                                                    {dateFormat(
                                                        this.result.submit_time,
                                                        "dd-mm-yyyy"
                                                    )}
                                                </div>
                                                <div className="col-md-2">
                                                    <div
                                                        className="text-center rounded py-2"
                                                        style={{
                                                            backgroundColor:
                                                                this.result
                                                                    .data[0]
                                                                    .color,
                                                            textTransform:
                                                                "capitalize",
                                                        }}
                                                    >
                                                        {
                                                            this.result.data[0]
                                                                .remarks
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {data.length !== 0
                                    ? data.map((question, q_index) => {
                                          return question.type === "type_1" ? (
                                              <div
                                                  className="d-flex align-items-start justify-content mb-3"
                                                  key={q_index}
                                              >
                                                  <button
                                                      className="btn btn-light light-bg btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg"
                                                      style={{
                                                          cursor: "default",
                                                      }}
                                                  >
                                                      {q_index <= 8
                                                          ? `0${q_index + 1}`
                                                          : q_index + 1}
                                                  </button>
                                                  <div className="card light-bg shadow-sm w-100">
                                                      <div className="card-body">
                                                          <div
                                                              className="mb-3"
                                                              dangerouslySetInnerHTML={{
                                                                  __html: question.question,
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
                                                                                          question.answer
                                                                                              .map(
                                                                                                  (
                                                                                                      data
                                                                                                  ) =>
                                                                                                      data.toLowerCase()
                                                                                              )
                                                                                              .includes(
                                                                                                  option.content
                                                                                                      ? option.content
                                                                                                      : option.toLowerCase()
                                                                                              )
                                                                                              ? question.marks >
                                                                                                0
                                                                                                  ? "success-bg 1"
                                                                                                  : option.correct
                                                                                                  ? "success-bg"
                                                                                                  : "danger-bg"
                                                                                              : option.correct
                                                                                              ? "success-bg"
                                                                                              : "bg-white"
                                                                                      }`}
                                                                                  >
                                                                                      <div
                                                                                          className="card-body small font-weight-bold-600 pt-3 pb-0"
                                                                                          dangerouslySetInnerHTML={{
                                                                                              __html: `<div class="mb-3">${
                                                                                                  option.content !==
                                                                                                  undefined
                                                                                                      ? option.content
                                                                                                      : option
                                                                                              }</div>`,
                                                                                          }}
                                                                                      ></div>
                                                                                  </div>
                                                                              </div>
                                                                          </div>
                                                                      );
                                                                  }
                                                              )}
                                                          </div>

                                                          {/* ---------- Student answers ---------- */}

                                                          {question.marks ===
                                                              0 &&
                                                          question
                                                              .proper_answer[0]
                                                              .content ===
                                                              undefined ? (
                                                              <div className="row mb-2">
                                                                  <div className="col-md-6">
                                                                      <div
                                                                          className="card card-body danger-bg h-100"
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
                                                                                          dangerouslySetInnerHTML={{
                                                                                              __html: answer,
                                                                                          }}
                                                                                      ></p>
                                                                                  );
                                                                              }
                                                                          )}
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          ) : (
                                                              ""
                                                          )}

                                                          {/* ----- Explanation ----- */}

                                                          <button
                                                              className="btn btn-link btn-sm shadow-none"
                                                              onClick={() =>
                                                                  this.toggleModal(
                                                                      question.explanation
                                                                  )
                                                              }
                                                          >
                                                              <i className="fas fa-info-circle mr-1"></i>{" "}
                                                              Explanation
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          ) : (
                                              <div
                                                  className="d-flex align-items-start justify-content mb-3"
                                                  key={q_index}
                                              >
                                                  <button className="btn btn-light light-bg btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg">
                                                      {q_index <= 8
                                                          ? `0${q_index + 1}`
                                                          : q_index + 1}
                                                  </button>
                                                  {/* ---------- Question preview ---------- */}
                                                  <div className="card shadow-sm light-bg w-100">
                                                      <div className="card-body">
                                                          {/* ----- Main Question ----- */}
                                                          <div
                                                              className="mb-3"
                                                              dangerouslySetInnerHTML={{
                                                                  __html: question.question,
                                                              }}
                                                          ></div>

                                                          <div className="row mb-2">
                                                              {/* ---------- Student answers ---------- */}
                                                              <div className="col-md-5">
                                                                  <div
                                                                      className="card"
                                                                      id="drop-area"
                                                                  >
                                                                      <div className="card-header font-weight-bold-600 pb-0">
                                                                          Your
                                                                          answer(s):
                                                                      </div>
                                                                      <div className="card-body">
                                                                          {question.sub_question.map(
                                                                              (
                                                                                  sub_answer,
                                                                                  sub_index
                                                                              ) => {
                                                                                  return (
                                                                                      <div
                                                                                          key={
                                                                                              sub_index
                                                                                          }
                                                                                          className={`card card-body shadow-sm small font-weight-bold-600 ${
                                                                                              sub_answer.marks ===
                                                                                              0
                                                                                                  ? "danger-bg"
                                                                                                  : "success-bg"
                                                                                          } pt-3 pb-0 mb-2`}
                                                                                      >
                                                                                          <div
                                                                                              dangerouslySetInnerHTML={{
                                                                                                  __html: `<div class="mb-3">${sub_answer.answer[0]}</div>`,
                                                                                              }}
                                                                                          ></div>
                                                                                      </div>
                                                                                  );
                                                                              }
                                                                          )}
                                                                      </div>
                                                                  </div>
                                                              </div>

                                                              {/* ----- Sub Question ----- */}

                                                              <div className="col-md-7">
                                                                  <div className="d-flex align-items-start justify-content">
                                                                      <button className="btn secondary-bg btn-sm shadow-sm mr-1 mt-1 px-3 font-weight-bold-600 rounded-lg">
                                                                          {`${
                                                                              q_index +
                                                                              1
                                                                          }.${
                                                                              this
                                                                                  .state
                                                                                  .currentSubQuestionIndex[
                                                                                  this
                                                                                      .state
                                                                                      .currentSectionIndex
                                                                              ][
                                                                                  q_index
                                                                              ] +
                                                                              1
                                                                          }`}
                                                                      </button>

                                                                      {/* ---------- Sub Question preview ---------- */}
                                                                      <div className="card light-bg w-100">
                                                                          <div className="card secondary-bg py-2 px-3 mb-2">
                                                                              <div
                                                                                  dangerouslySetInnerHTML={{
                                                                                      __html: question
                                                                                          .sub_question[
                                                                                          this
                                                                                              .state
                                                                                              .currentSubQuestionIndex[
                                                                                              this
                                                                                                  .state
                                                                                                  .currentSectionIndex
                                                                                          ][
                                                                                              q_index
                                                                                          ]
                                                                                      ]
                                                                                          .question,
                                                                                  }}
                                                                              ></div>
                                                                          </div>

                                                                          {/* ---------- Options ---------- */}

                                                                          <div className="row">
                                                                              {question.sub_question[
                                                                                  this
                                                                                      .state
                                                                                      .currentSubQuestionIndex[
                                                                                      this
                                                                                          .state
                                                                                          .currentSectionIndex
                                                                                  ][
                                                                                      q_index
                                                                                  ]
                                                                              ].proper_answer.map(
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
                                                                                              <div
                                                                                                  className={`card shadow-sm mb-2 ${
                                                                                                      option.correct !==
                                                                                                      undefined
                                                                                                          ? option.correct
                                                                                                              ? "success-bg"
                                                                                                              : "bg-white"
                                                                                                          : ""
                                                                                                  }`}
                                                                                              >
                                                                                                  <div
                                                                                                      className="card-body small font-weight-bold-600 pt-3 pb-0"
                                                                                                      dangerouslySetInnerHTML={{
                                                                                                          __html: `<div class="mb-3">${
                                                                                                              option.content !==
                                                                                                              undefined
                                                                                                                  ? option.content
                                                                                                                  : option
                                                                                                          }</div>`,
                                                                                                      }}
                                                                                                  ></div>
                                                                                              </div>
                                                                                          </div>
                                                                                      );
                                                                                  }
                                                                              )}
                                                                          </div>

                                                                          {/* ---------- Navigation button ---------- */}

                                                                          <div className="d-flex align-items-center justify-content-center mt-2">
                                                                              <button
                                                                                  className="btn btn-sm primary-text shadow-none"
                                                                                  onClick={() =>
                                                                                      this.handleSubQPrev(
                                                                                          q_index
                                                                                      )
                                                                                  }
                                                                                  disabled={
                                                                                      this
                                                                                          .state
                                                                                          .currentSubQuestionIndex[
                                                                                          this
                                                                                              .state
                                                                                              .currentSectionIndex
                                                                                      ][
                                                                                          q_index
                                                                                      ] ===
                                                                                      0
                                                                                          ? true
                                                                                          : false
                                                                                  }
                                                                              >
                                                                                  <i className="fas fa-arrow-circle-left fa-lg"></i>
                                                                              </button>
                                                                              <div className="border-primary small font-weight-bold-600 rounded-lg px-3 py-1 mx-3">
                                                                                  {this
                                                                                      .state
                                                                                      .currentSubQuestionIndex[
                                                                                      this
                                                                                          .state
                                                                                          .currentSectionIndex
                                                                                  ][
                                                                                      q_index
                                                                                  ] +
                                                                                      1}{" "}
                                                                                  /{" "}
                                                                                  {
                                                                                      this
                                                                                          .state
                                                                                          .totalSubQuestion[
                                                                                          this
                                                                                              .state
                                                                                              .currentSectionIndex
                                                                                      ][
                                                                                          q_index
                                                                                      ]
                                                                                  }
                                                                              </div>
                                                                              <button
                                                                                  className="btn btn-sm primary-text shadow-none"
                                                                                  onClick={() =>
                                                                                      this.handleSubQNext(
                                                                                          q_index
                                                                                      )
                                                                                  }
                                                                                  disabled={
                                                                                      this
                                                                                          .state
                                                                                          .currentSubQuestionIndex[
                                                                                          this
                                                                                              .state
                                                                                              .currentSectionIndex
                                                                                      ][
                                                                                          q_index
                                                                                      ] +
                                                                                          1 <
                                                                                      this
                                                                                          .state
                                                                                          .totalSubQuestion[
                                                                                          this
                                                                                              .state
                                                                                              .currentSectionIndex
                                                                                      ][
                                                                                          q_index
                                                                                      ]
                                                                                          ? false
                                                                                          : true
                                                                                  }
                                                                              >
                                                                                  <i className="fas fa-arrow-circle-right fa-lg"></i>
                                                                              </button>
                                                                          </div>
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          </div>

                                                          {/* ----- Explanation ----- */}

                                                          <button
                                                              className="btn btn-link btn-sm shadow-none"
                                                              onClick={() =>
                                                                  this.toggleModal(
                                                                      question.explanation
                                                                  )
                                                              }
                                                          >
                                                              <i className="fas fa-info-circle mr-1"></i>{" "}
                                                              Explanation
                                                          </button>
                                                      </div>
                                                  </div>
                                              </div>
                                          );
                                      })
                                    : ""}

                                {/* ---------- Section navigation ---------- */}
                                <div className="row">
                                    <div className="col-6">
                                        {this.state.currentSectionIndex !==
                                        0 ? (
                                            <button
                                                className="btn btn-primary btn-sm shadow-none"
                                                onClick={this.handlePrev}
                                            >
                                                <i className="fas fa-angle-left mr-1"></i>{" "}
                                                {
                                                    this.result.data[0]
                                                        .sections[
                                                        this.state
                                                            .currentSectionIndex -
                                                            1
                                                    ].section_description
                                                }
                                            </button>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                    <div className="col-6 text-right">
                                        {this.state.currentSectionIndex + 1 <
                                        this.state.totalSection ? (
                                            <button
                                                className="btn btn-primary btn-sm shadow-none"
                                                onClick={this.handleNext}
                                            >
                                                {
                                                    this.result.data[0]
                                                        .sections[
                                                        this.state
                                                            .currentSectionIndex +
                                                            1
                                                    ].section_description
                                                }
                                                <i className="fas fa-angle-right ml-2"></i>
                                            </button>
                                        ) : (
                                            ""
                                        )}
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
