import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import { baseUrl, teacherUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { dataFormat } from "../../sharedComponents/dataFormating";

const mapStateToProps = (state) => ({
    group_name: state.content.group_name,
    subject_name: state.content.subject_name,
    chapter_name: state.content.chapter_name,
    cycle_name: state.content.cycle_name,
});

class TeacherCycleTestAutoQA extends Component {
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
        this.groupId = this.props.match.params.groupId;
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.cycle_testId = this.props.match.params.cycle_testId;
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
    loadQAData = async () => {
        await fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/auto/${this.state.sectionId}/?attempt_number=${this.attempt}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let data = [];
                let type = "";
                let totalSubQuestion = [];
                let currentSubQuestionIndex = [];
                if (result.sts === true) {
                    if (result.data.results.length !== 0) {
                        let values = dataFormat(result);
                        data = values.result;
                        type = values.type;
                        totalSubQuestion = values.total;
                        currentSubQuestionIndex = values.current;
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
        window.MathJax.typeset();
    };

    loadSectionData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/auto/`,
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

    handleSubQPrev = async (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[main_index] = index[main_index] - 1;
        await this.setState({
            currentSubQuestionIndex: index,
        });
        window.MathJax.typeset();
    };

    handleSubQNext = async (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[main_index] = index[main_index] + 1;
        await this.setState({
            currentSubQuestionIndex: index,
        });
        window.MathJax.typeset();
    };

    render() {
        document.title = `${this.props.cycle_name} : ${
            this.state.sectionData.length !== 0
                ? this.state.sectionData[this.state.currentSectionIndex]
                      .section_description
                : ""
        } - Teacher | IQLabs`;
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

                        {/* ----- Breadcrumb ----- */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/teacher">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                {this.groupId !== undefined ? (
                                    <>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to={`/teacher/group/${this.groupId}`}
                                            >
                                                {this.props.group_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to={`/teacher/group/${this.groupId}/subject/${this.subjectId}`}
                                            >
                                                {this.props.subject_name}
                                            </Link>
                                        </li>
                                    </>
                                ) : (
                                    <li className="breadcrumb-item">
                                        <Link
                                            to={`/teacher/subject/${this.subjectId}`}
                                        >
                                            {this.props.subject_name}
                                        </Link>
                                    </li>
                                )}
                                <li className="breadcrumb-item">
                                    <Link
                                        to={`/teacher/group/${this.groupId}/subject/${this.subjectId}/chapter/${this.chapterId}`}
                                    >
                                        {this.props.chapter_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        {this.props.cycle_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Section
                                </li>
                            </ol>
                        </nav>

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
                                                                  className="pb-2"
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
                                                                                              <div className="card-body small font-weight-bold-600 pt-3 pb-0">
                                                                                                  <div
                                                                                                      dangerouslySetInnerHTML={{
                                                                                                          __html: `<div class="mb-3">${options.content}</div>`,
                                                                                                      }}
                                                                                                  ></div>
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
                                                                                              <div className="card-body small font-weight-bold-600 py-3">
                                                                                                  {
                                                                                                      fill_in
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
                                                                                              <div className="card-body small font-weight-bold-600 py-3">
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
                                                          {/* ----- image preview ----- */}
                                                          {data.content
                                                              .images[0]
                                                              .path !== "" ? (
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
                                                          ) : (
                                                              ""
                                                          )}
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
                                                          <div className="col-md-6">
                                                              <div
                                                                  dangerouslySetInnerHTML={{
                                                                      __html:
                                                                          data.question,
                                                                  }}
                                                              ></div>
                                                          </div>
                                                          {/* ----- Sub Question ----- */}
                                                          <div className="col-md-6">
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
                                                                      <div className="card secondary-bg py-2 px-3 mb-2">
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
                                                                                            <div className="card-body small font-weight-bold-600 pt-3 pb-0">
                                                                                                <div
                                                                                                    dangerouslySetInnerHTML={{
                                                                                                        __html: `<div class="mb-3">${options.content}</div>`,
                                                                                                    }}
                                                                                                ></div>
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
                                                                                                {
                                                                                                    fill_in
                                                                                                }
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
                                                      {/* ----- image preview ----- */}
                                                      {data.content.images[0]
                                                          .path !== "" ? (
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
                                                      ) : (
                                                          ""
                                                      )}
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

export default connect(mapStateToProps)(TeacherCycleTestAutoQA);
