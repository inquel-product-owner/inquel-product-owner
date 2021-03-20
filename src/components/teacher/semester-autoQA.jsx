import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import AlertBox from "../sharedComponents/alert";
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
            duration: "",
            sectionId: this.props.match.params.sectionId,

            selectedImageData: [],
            startIndex: 0,
            isLightBoxOpen: false,

            sectionData: [],
            totalSection: 0,
            currentSectionIndex: 0,

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
                if (result.sts === true) {
                    if (result.data.results.length !== 0) {
                        for (let i = 0; i < result.data.results.length; i++) {
                            if (result.data.results[i] !== null) {
                                images = [];
                                if (result.data.results[i].files.length !== 0) {
                                    // image
                                    if (
                                        result.data.results[i].files[0]
                                            .type1_image_1
                                    ) {
                                        images.push({
                                            title:
                                                result.data.results[i].files[0]
                                                    .type1_image_1_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                result.data.results[i].files[0]
                                                    .type1_image_1,
                                        });
                                    }
                                    if (
                                        result.data.results[i].files[0]
                                            .type1_image_2
                                    ) {
                                        images.push({
                                            title:
                                                result.data.results[i].files[0]
                                                    .type1_image_2_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                result.data.results[i].files[0]
                                                    .type1_image_2,
                                        });
                                    }
                                    if (
                                        result.data.results[i].files[0]
                                            .type1_image_3
                                    ) {
                                        images.push({
                                            title:
                                                result.data.results[i].files[0]
                                                    .type1_image_3_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                result.data.results[i].files[0]
                                                    .type1_image_3,
                                        });
                                    }
                                    if (
                                        result.data.results[i].files[0]
                                            .type1_image_4
                                    ) {
                                        images.push({
                                            title:
                                                result.data.results[i].files[0]
                                                    .type1_image_4_title,
                                            file_name: "",
                                            image: null,
                                            path:
                                                result.data.results[i].files[0]
                                                    .type1_image_4,
                                        });
                                    }
                                }

                                data.push({
                                    question: result.data.results[i].question,
                                    question_random_id:
                                        result.data.results[i]
                                            .question_random_id,
                                    content: {
                                        mcq: result.data.results[i].mcq,
                                        fill_in: result.data.results[i].fill_in,
                                        boolean: result.data.results[i].boolean,
                                        fillin_answer:
                                            result.data.results[i].fillin_answer
                                                .length !== 0
                                                ? result.data.results[i]
                                                      .fillin_answer
                                                : [""],
                                        boolean_question:
                                            result.data.results[i]
                                                .boolean_question.length !== 0
                                                ? result.data.results[i]
                                                      .boolean_question
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
                                            result.data.results[i].options
                                                .length !== 0
                                                ? result.data.results[i].options
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
                                        explanation:
                                            result.data.results[i].explanation,
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
                                continue;
                            }
                        }
                    }
                    this.setState({
                        data: data,
                        duration:
                            result.duration !== undefined ? result.duration : 0,
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
                        {this.state.data.length !== 0
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
                                                          {data.content.mcq ? (
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
