import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { baseUrl, teacherUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
});

class SemesterAutoQA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            data: [],
            type: "",
            duration: "",
            sectionId: this.props.match.params.sectionId,

            selectedImageData: [],
            startIndex: 0,
            isLightBoxOpen: false,

            sectionData: [],
            totalSection: 0,
            currentSectionIndex: 0,
            totalSubQuestion: [],
            currentSubQuestionIndex: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.semesterId = this.props.match.params.semesterId;
        this.attempt = new URLSearchParams(this.props.location.search).get(
            "attempt"
        );
        this.url = baseUrl + teacherUrl;
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

    // loads question & answer
    loadQAData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/semester/${this.semesterId}/auto/${this.state.sectionId}/?attempt_number=${this.attempt}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let data = [];
                let images = [];
                let type = "";
                let sub_question = [];
                let totalSubQuestion = [];
                let currentSubQuestionIndex = [];
                if (result.sts === true) {
                    let response = result.data.results;
                    if (response.length !== 0) {
                        for (let i = 0; i < response.length; i++) {
                            if (response[i].type_1 === true) {
                                type = "type_1";
                                images = [];
                                if (response[i].files.length !== 0) {
                                    // image
                                    if (response[i].files[0].type1_image_1) {
                                        images.push({
                                            title:
                                                response[i].files[0]
                                                    .type1_image_1_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files[0]
                                                    .type1_image_1,
                                        });
                                    }
                                    if (response[i].files[0].type1_image_2) {
                                        images.push({
                                            title:
                                                response[i].files[0]
                                                    .type1_image_2_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files[0]
                                                    .type1_image_2,
                                        });
                                    }
                                    if (response[i].files[0].type1_image_3) {
                                        images.push({
                                            title:
                                                response[i].files[0]
                                                    .type1_image_3_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files[0]
                                                    .type1_image_3,
                                        });
                                    }
                                    if (response[i].files[0].type1_image_4) {
                                        images.push({
                                            title:
                                                response[i].files[0]
                                                    .type1_image_4_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files[0]
                                                    .type1_image_4,
                                        });
                                    }
                                }

                                data.push({
                                    question: response[i].question,
                                    question_random_id:
                                        response[i].question_random_id,
                                    content: {
                                        mcq: response[i].mcq,
                                        fill_in: response[i].fill_in,
                                        boolean: response[i].boolean,
                                        fillin_answer:
                                            response[i].fillin_answer.length !==
                                            0
                                                ? response[i].fillin_answer
                                                : [""],
                                        boolean_question:
                                            response[i].boolean_question
                                                .length !== 0
                                                ? response[i].boolean_question
                                                : [
                                                      {
                                                          correct: false,
                                                          content: "True",
                                                      },
                                                      {
                                                          correct: false,
                                                          content: "False",
                                                      },
                                                  ],
                                        options:
                                            response[i].options.length !== 0
                                                ? response[i].options
                                                : [
                                                      {
                                                          correct: false,
                                                          content: "",
                                                      },
                                                      {
                                                          correct: false,
                                                          content: "",
                                                      },
                                                      {
                                                          correct: false,
                                                          content: "",
                                                      },
                                                      {
                                                          correct: false,
                                                          content: "",
                                                      },
                                                  ],
                                        explanation: response[i].explanation,
                                        images:
                                            images.length === 0
                                                ? [
                                                      {
                                                          title: "",
                                                          file_name: "",
                                                          image: null,
                                                          path: "",
                                                      },
                                                  ]
                                                : images,
                                    },
                                });
                            } else {
                                type = "type_2";
                                images = [];
                                sub_question = [];
                                totalSubQuestion.push(
                                    response[i].sub_question.length
                                );
                                currentSubQuestionIndex.push(0);

                                // Image
                                if (
                                    Object.entries(response[i].files).length !==
                                    0
                                ) {
                                    if (response[i].files.type2_image_1) {
                                        images.push({
                                            title:
                                                response[i].files
                                                    .type2_image_1_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files.type2_image_1,
                                        });
                                    }
                                    if (response[i].files.type2_image_2) {
                                        images.push({
                                            title:
                                                response[i].files
                                                    .type2_image_2_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files.type2_image_2,
                                        });
                                    }
                                    if (response[i].files.type2_image_3) {
                                        images.push({
                                            title:
                                                response[i].files
                                                    .type2_image_3_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files.type2_image_3,
                                        });
                                    }
                                    if (response[i].files.type2_image_4) {
                                        images.push({
                                            title:
                                                response[i].files
                                                    .type2_image_4_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files.type2_image_4,
                                        });
                                    }
                                }

                                // Sub question
                                for (
                                    let k = 0;
                                    k < response[i].sub_question.length;
                                    k++
                                ) {
                                    sub_question.push({
                                        sub_question_id:
                                            response[i].sub_question[k]
                                                .sub_question_id,
                                        question:
                                            response[i].sub_question[k]
                                                .question,
                                        explanation:
                                            response[i].sub_question[k]
                                                .explanation,
                                        mcq: response[i].sub_question[k].mcq,
                                        fill_in:
                                            response[i].sub_question[k].fill_in,
                                        fillin_answer:
                                            response[i].sub_question[k]
                                                .fillin_answer.length !== 0
                                                ? response[i].sub_question[k]
                                                      .fillin_answer
                                                : [""],
                                        options:
                                            response[i].sub_question[k].options
                                                .length !== 0
                                                ? response[i].sub_question[k]
                                                      .options
                                                : [
                                                      {
                                                          correct: false,
                                                          content: "",
                                                      },
                                                      {
                                                          correct: false,
                                                          content: "",
                                                      },
                                                      {
                                                          correct: false,
                                                          content: "",
                                                      },
                                                      {
                                                          correct: false,
                                                          content: "",
                                                      },
                                                  ],
                                        marks:
                                            response[i].sub_question[k].marks,
                                        negative_marks:
                                            response[i].sub_question[k]
                                                .negative_marks,
                                    });
                                }

                                // Main question
                                data.push({
                                    question: response[i].question,
                                    question_random_id:
                                        response[i].question_random_id,
                                    sub_question: sub_question,
                                    content: {
                                        images:
                                            images.length === 0
                                                ? [
                                                      {
                                                          title: "",
                                                          file_name: "",
                                                          image: null,
                                                          path: "",
                                                      },
                                                  ]
                                                : images,
                                    },
                                });
                            }
                        }
                    }
                    this.setState({
                        data: data,
                        type: type,
                        duration:
                            result.duration !== undefined ? result.duration : 0,
                        totalSubQuestion: totalSubQuestion,
                        currentSubQuestionIndex: currentSubQuestionIndex,
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

    loadSectionData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/semester/${this.semesterId}/auto/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let currentIndex = "";
                    let data = [];
                    for (let i = 0; i < result.data.auto_test.length; i++) {
                        data.push(result.data.auto_test[i]);
                        if (
                            result.data.auto_test[i].section_id ===
                            this.state.sectionId
                        ) {
                            currentIndex = i;
                        } else {
                            continue;
                        }
                    }
                    this.setState({
                        sectionData: data,
                        totalSection: result.data.auto_test.length,
                        currentSectionIndex: currentIndex,
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
        document.title = `${this.props.section_name} - Teacher | IQLabs`;

        this.loadQAData();
        this.loadSectionData();
    };

    changeImage = (images, index) => {
        let imageArr = [];
        this.setState({
            selectedImageData: [],
            startIndex: 0,
        });
        for (let i = 0; i < images.length; i++) {
            imageArr.push({
                url: images[i].path,
                title: images[i].title,
            });
        }
        this.setState({
            selectedImageData: imageArr,
            startIndex: index,
            isLightBoxOpen: true,
        });
    };

    // ---------- Navigation ----------
    handlePrev = () => {
        const data = this.state.sectionData;
        this.setState(
            {
                sectionId: data[this.state.currentSectionIndex - 1].section_id,
                currentSectionIndex: this.state.currentSectionIndex - 1,
                page_loading: true,
            },
            () => {
                this.loadQAData();
            }
        );
    };

    handleNext = () => {
        const data = this.state.sectionData;
        this.setState(
            {
                sectionId: data[this.state.currentSectionIndex + 1].section_id,
                currentSectionIndex: this.state.currentSectionIndex + 1,
                page_loading: true,
            },
            () => {
                this.loadQAData();
            }
        );
    };

    handleSubQPrev = (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[main_index] = index[main_index] - 1;
        this.setState({
            currentSubQuestionIndex: index,
        });
    };

    handleSubQNext = (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[main_index] = index[main_index] + 1;
        this.setState({
            currentSubQuestionIndex: index,
        });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
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

                {/* Image lightbox */}
                {this.state.isLightBoxOpen ? (
                    <Lightbox
                        images={this.state.selectedImageData}
                        startIndex={this.state.startIndex}
                        onClose={() => {
                            this.setState({
                                isLightBoxOpen: false,
                            });
                        }}
                    />
                ) : (
                    ""
                )}

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

                        {/* Header */}
                        <div className="card primary-bg text-white small mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-7 col-md-5">
                                        {this.state.sectionData.length !== 0
                                            ? this.state.sectionData[
                                                  this.state.currentSectionIndex
                                              ].section_description
                                            : ""}
                                    </div>
                                    <div className="col-lg-5 col-md-7">
                                        <div className="row">
                                            <div className="col-4">
                                                {this.attempt}
                                            </div>
                                            <div className="col-4">
                                                {this.state.data.length !== 0
                                                    ? this.state.data.length
                                                    : "0"}{" "}
                                                Questions
                                            </div>
                                            <div className="col-4">
                                                Total time:{" "}
                                                {this.state.duration} mins
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Q&A */}
                        {this.state.type === "type_1"
                            ? this.state.data.length !== 0
                                ? this.state.data.map((data, q_index) => {
                                      return (
                                          <div
                                              className="d-flex align-items-start justify-content mb-3"
                                              key={q_index}
                                          >
                                              <button className="btn btn-light bg-white btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg">
                                                  {q_index <= 8
                                                      ? `0${q_index + 1}`
                                                      : q_index + 1}
                                              </button>
                                              <div
                                                  className="card shadow-sm"
                                                  style={{ width: "100%" }}
                                              >
                                                  <div className="card-body">
                                                      <div className="d-flex">
                                                          {/* Questions & options */}
                                                          <div
                                                              style={{
                                                                  width: "100%",
                                                              }}
                                                          >
                                                              <div
                                                                  className="font-weight-bold-600 py-2"
                                                                  dangerouslySetInnerHTML={{
                                                                      __html:
                                                                          data.question,
                                                                  }}
                                                              ></div>
                                                              {data.content
                                                                  .mcq ? (
                                                                  <div className="row">
                                                                      {data.content.options.map(
                                                                          (
                                                                              options,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className="col-md-6"
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                  >
                                                                                      <div className="form-group">
                                                                                          <div
                                                                                              className={`card shadow-sm ${
                                                                                                  options.correct
                                                                                                      ? "success-bg"
                                                                                                      : "bg-light"
                                                                                              }`}
                                                                                          >
                                                                                              <div className="card-body small py-3">
                                                                                                  {
                                                                                                      options.content
                                                                                                  }
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </div>
                                                              ) : (
                                                                  ""
                                                              )}
                                                              {data.content
                                                                  .fill_in ? (
                                                                  <div className="row">
                                                                      {data.content.fillin_answer.map(
                                                                          (
                                                                              fill_in,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className="col-md-6"
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                  >
                                                                                      <div className="form-group">
                                                                                          <div className="card form-shadow">
                                                                                              <div className="card-body small py-3">
                                                                                                  {fill_in !==
                                                                                                  "" ? (
                                                                                                      fill_in
                                                                                                  ) : (
                                                                                                      <span className="text-muted">{`Answer 0${
                                                                                                          index +
                                                                                                          1
                                                                                                      }`}</span>
                                                                                                  )}
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </div>
                                                              ) : (
                                                                  ""
                                                              )}
                                                              {data.content
                                                                  .boolean ? (
                                                                  <div className="row">
                                                                      {data.content.boolean_question.map(
                                                                          (
                                                                              boolean,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  <div
                                                                                      className="col-md-6"
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                  >
                                                                                      <div className="form-group">
                                                                                          <div
                                                                                              className={`card shadow-sm ${
                                                                                                  boolean.correct
                                                                                                      ? "success-bg"
                                                                                                      : "bg-light"
                                                                                              }`}
                                                                                          >
                                                                                              <div className="card-body small py-3">
                                                                                                  {
                                                                                                      boolean.content
                                                                                                  }
                                                                                              </div>
                                                                                          </div>
                                                                                      </div>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </div>
                                                              ) : (
                                                                  ""
                                                              )}
                                                          </div>
                                                          {/* image preview */}
                                                          <div className="ml-3">
                                                              {data.content.images.map(
                                                                  (
                                                                      images,
                                                                      index
                                                                  ) => {
                                                                      return images.path !==
                                                                          "" ? (
                                                                          <div
                                                                              key={
                                                                                  index
                                                                              }
                                                                              className="card preview-img-circle shadow-sm"
                                                                              style={{
                                                                                  backgroundImage: `url(${images.path})`,
                                                                              }}
                                                                              onClick={() =>
                                                                                  this.changeImage(
                                                                                      data
                                                                                          .content
                                                                                          .images,
                                                                                      index
                                                                                  )
                                                                              }
                                                                          ></div>
                                                                      ) : (
                                                                          ""
                                                                      );
                                                                  }
                                                              )}
                                                          </div>
                                                      </div>
                                                  </div>
                                                  {/* ----- Answer type tag ----- */}
                                                  {data.content.mcq ? (
                                                      <div
                                                          className="secondary-bg primary-text font-weight-bold px-2 py-1 position-absolute rounded-lg shadow-sm"
                                                          style={{
                                                              bottom: "5px",
                                                              right: "5px",
                                                              fontSize: "10px",
                                                          }}
                                                      >
                                                          MCQ
                                                      </div>
                                                  ) : data.content.fill_in ? (
                                                      <div
                                                          className="secondary-bg primary-text font-weight-bold px-2 py-1 position-absolute rounded-lg shadow-sm"
                                                          style={{
                                                              bottom: "5px",
                                                              right: "5px",
                                                              fontSize: "10px",
                                                          }}
                                                      >
                                                          Fill in
                                                      </div>
                                                  ) : (
                                                      <div
                                                          className="secondary-bg primary-text font-weight-bold px-2 py-1 position-absolute rounded-lg shadow-sm"
                                                          style={{
                                                              bottom: "5px",
                                                              right: "5px",
                                                              fontSize: "10px",
                                                          }}
                                                      >
                                                          True / False
                                                      </div>
                                                  )}
                                              </div>
                                          </div>
                                      );
                                  })
                                : ""
                            : this.state.type === "type_2"
                            ? this.state.data.length !== 0
                                ? this.state.data.map((data, q_index) => {
                                      return (
                                          <div
                                              className="d-flex align-items-start justify-content mb-3"
                                              key={q_index}
                                          >
                                              <button className="btn btn-light bg-white btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg">
                                                  {q_index <= 8
                                                      ? `0${q_index + 1}`
                                                      : q_index + 1}
                                              </button>
                                              {/* ---------- Question preview ---------- */}
                                              <div className="card shadow-sm w-100">
                                                  <div className="card-body d-flex">
                                                      <div className="row w-100">
                                                          {/* ----- Main Question ----- */}
                                                          <div className="col-md-5">
                                                              <div
                                                                  className="font-weight-bold-600 primary-text"
                                                                  dangerouslySetInnerHTML={{
                                                                      __html:
                                                                          data.question,
                                                                  }}
                                                              ></div>
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
                                                                              q_index
                                                                          ] + 1
                                                                      }`}
                                                                  </button>

                                                                  {/* ---------- Sub Question preview ---------- */}
                                                                  <div className="card w-100">
                                                                      <div className="card font-weight-bold-600 secondary-bg py-2 px-3 mb-2">
                                                                          <div
                                                                              dangerouslySetInnerHTML={{
                                                                                  __html:
                                                                                      data
                                                                                          .sub_question[
                                                                                          this
                                                                                              .state
                                                                                              .currentSubQuestionIndex[
                                                                                              q_index
                                                                                          ]
                                                                                      ]
                                                                                          .question,
                                                                              }}
                                                                          ></div>
                                                                      </div>
                                                                      {data
                                                                          .sub_question[
                                                                          this
                                                                              .state
                                                                              .currentSubQuestionIndex[
                                                                              q_index
                                                                          ]
                                                                      ].mcq
                                                                          ? data.sub_question[
                                                                                this
                                                                                    .state
                                                                                    .currentSubQuestionIndex[
                                                                                    q_index
                                                                                ]
                                                                            ].options.map(
                                                                                (
                                                                                    options,
                                                                                    index
                                                                                ) => {
                                                                                    return (
                                                                                        <div
                                                                                            className={`card shadow-sm mb-2 ${
                                                                                                options.correct
                                                                                                    ? "success-bg"
                                                                                                    : "bg-light"
                                                                                            }`}
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                        >
                                                                                            <div className="card-body small font-weight-bold-600 py-3">
                                                                                                {
                                                                                                    options.content
                                                                                                }
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )
                                                                          : ""}
                                                                      {data
                                                                          .sub_question[
                                                                          this
                                                                              .state
                                                                              .currentSubQuestionIndex[
                                                                              q_index
                                                                          ]
                                                                      ].fill_in
                                                                          ? data.sub_question[
                                                                                this
                                                                                    .state
                                                                                    .currentSubQuestionIndex[
                                                                                    q_index
                                                                                ]
                                                                            ].fillin_answer.map(
                                                                                (
                                                                                    fill_in,
                                                                                    index
                                                                                ) => {
                                                                                    return (
                                                                                        <div
                                                                                            className="card shadow-sm bg-light mb-2"
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                        >
                                                                                            <div className="card-body small font-weight-bold-600 py-3">
                                                                                                {fill_in !==
                                                                                                "" ? (
                                                                                                    fill_in
                                                                                                ) : (
                                                                                                    <span className="text-muted">{`Answer 0${
                                                                                                        index +
                                                                                                        1
                                                                                                    }`}</span>
                                                                                                )}
                                                                                            </div>
                                                                                        </div>
                                                                                    );
                                                                                }
                                                                            )
                                                                          : ""}
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
                                                                                  q_index
                                                                              ] +
                                                                                  1}{" "}
                                                                              /{" "}
                                                                              {
                                                                                  this
                                                                                      .state
                                                                                      .totalSubQuestion[
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
                                                                                      q_index
                                                                                  ] +
                                                                                      1 <
                                                                                  this
                                                                                      .state
                                                                                      .totalSubQuestion[
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
                                                      {/* ----- Image thumbnail ----- */}
                                                      <div className="ml-3">
                                                          {data.content.images.map(
                                                              (
                                                                  images,
                                                                  index
                                                              ) => {
                                                                  return images.path !==
                                                                      "" ? (
                                                                      <div
                                                                          key={
                                                                              index
                                                                          }
                                                                          className="card preview-img-circle shadow-sm"
                                                                          style={{
                                                                              backgroundImage: `url(${images.path})`,
                                                                          }}
                                                                          onClick={() =>
                                                                              this.changeImage(
                                                                                  data
                                                                                      .content
                                                                                      .images,
                                                                                  index
                                                                              )
                                                                          }
                                                                      ></div>
                                                                  ) : (
                                                                      ""
                                                                  );
                                                              }
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      );
                                  })
                                : ""
                            : ""}

                        {/* Navigation */}
                        <div className="row">
                            <div className="col-6">
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    onClick={this.handlePrev}
                                    disabled={
                                        this.state.currentSectionIndex > 0
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
                                        this.state.currentSectionIndex + 1 >=
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
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SemesterAutoQA);
