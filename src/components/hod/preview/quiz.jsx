import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { Type1DataFormat } from "../../sharedComponents/dataFormating";
import Select from "react-select";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    course_name: state.content.course_name,
    chapter_name: state.content.chapter_name,
    quiz_name: state.content.quiz_name,
});

class HODQuizPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            data: [],
            levels: [],
            attempts: [],
            levelId: "",
            selectedAttempt: "",
            totalLevels: 0,
            currentLevelIndex: 0,

            selectedImageData: [],
            startIndex: 0,
            isLightBoxOpen: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.courseId = this.props.match.params.courseId;
        this.chapterId = this.props.match.params.chapterId;
        this.quizId = this.props.match.params.quizId;
        this.url = baseUrl + hodUrl;
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
    loadQAData = async (path) => {
        var apiURL =
            path === undefined || path === null
                ? this.subjectId
                    ? `${this.url}/hod/subject/${this.subjectId}/chapter/${this.chapterId}/quiz/${this.quizId}/${this.state.levelId}/?attempt_name=${this.state.selectedAttempt}`
                    : `${this.url}/hod/course/${this.courseId}/review/chapter/${this.chapterId}/quiz/${this.quizId}/${this.state.levelId}/?attempt_name=${this.state.selectedAttempt}`
                : path;
        await fetch(apiURL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let data = [...this.state.data];
                if (result.sts === true) {
                    if (result.data.results.length !== 0) {
                        let values = Type1DataFormat(result);
                        data.push(...values.result);

                        this.setState(
                            {
                                data: data,
                            },
                            () => {
                                if (result.data.next !== null) {
                                    this.loadQAData(result.data.next);
                                } else {
                                    this.setState({
                                        page_loading: false,
                                    });
                                }
                            }
                        );
                    } else {
                        this.setState({
                            page_loading: false,
                        });
                    }
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

    loadLevelData = () => {
        let apiURL = this.subjectId
            ? `${this.url}/hod/subject/${this.subjectId}/chapter/${this.chapterId}/quiz/${this.quizId}/attempt/`
            : `${this.url}/hod/course/${this.courseId}/review/chapter/${this.chapterId}/quiz/${this.quizId}/attempt/`;
        fetch(apiURL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            levels: result.data.levels,
                            attempts: result.data.attempts,
                            levelId: result.data.levels[0].level_id,
                            selectedAttempt: result.data.attempts[0].name,
                            totalLevels: result.data.levels.length,
                        },
                        () => {
                            this.loadQAData();
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

    componentDidMount = () => {
        document.title = `${this.props.quiz_name} - HOD | IQLabs`;

        this.loadLevelData();
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
        const data = this.state.levels;
        this.setState(
            {
                levelId: data[this.state.currentLevelIndex - 1].level_id,
                currentLevelIndex: this.state.currentLevelIndex - 1,
                data: [],
                page_loading: true,
            },
            () => {
                this.loadQAData();
            }
        );
    };

    handleNext = () => {
        const data = this.state.levels;
        this.setState(
            {
                levelId: data[this.state.currentLevelIndex + 1].level_id,
                currentLevelIndex: this.state.currentLevelIndex + 1,
                data: [],
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
                    name={
                        this.subjectId
                            ? this.props.subject_name
                            : this.props.course_name
                    }
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

                        <div className="row align-items-center mb-3">
                            <div className="col-lg-8 mb-2 mb-lg-0">
                                {/* ----- Breadcrumb ----- */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/hod">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        {this.subjectId ? (
                                            <li className="breadcrumb-item">
                                                <Link
                                                    to={`/hod/subject/${this.subjectId}`}
                                                >
                                                    {this.props.subject_name}
                                                </Link>
                                            </li>
                                        ) : (
                                            <li className="breadcrumb-item">
                                                <Link
                                                    to={`/hod/course/${this.courseId}`}
                                                >
                                                    {this.props.course_name}
                                                </Link>
                                            </li>
                                        )}
                                        <li className="breadcrumb-item">
                                            <Link
                                                to="#"
                                                onClick={
                                                    this.props.history.goBack
                                                }
                                            >
                                                {this.props.chapter_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            {this.props.quiz_name}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-lg-4">
                                <Select
                                    className="basic-single form-shadow"
                                    placeholder="Select attempt"
                                    isSearchable={true}
                                    name="attempt"
                                    value={(this.state.attempts || []).map(
                                        (data) => {
                                            return data.name ===
                                                this.state.selectedAttempt
                                                ? {
                                                      value: data.name,
                                                      label: data.name,
                                                  }
                                                : "";
                                        }
                                    )}
                                    options={(this.state.attempts || []).map(
                                        (data) => {
                                            return {
                                                value: data.name,
                                                label: data.name,
                                            };
                                        }
                                    )}
                                    onChange={(event) => {
                                        this.setState(
                                            {
                                                selectedAttempt: event.value,
                                                data: [],
                                                totalSubQuestion: [],
                                                currentSubQuestionIndex: [],
                                                page_loading: true,
                                            },
                                            () => this.loadQAData()
                                        );
                                    }}
                                    required
                                />
                            </div>
                        </div>

                        {/* ----- Header configuration ----- */}
                        <div className="card primary-bg text-white small mb-4">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-lg-8 col-md-5">
                                        {this.state.levels.length !== 0
                                            ? this.state.levels[
                                                  this.state.currentLevelIndex
                                              ].level_name
                                            : ""}
                                    </div>
                                    <div className="col-lg-2">
                                        {this.state.selectedAttempt}
                                    </div>
                                    <div className="col-lg-2">
                                        {this.state.data.length} Questions
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ----- Question & Answer ----- */}
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
                                                              className="pb-2"
                                                              dangerouslySetInnerHTML={{
                                                                  __html: data.question,
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
                            : ""}

                        {/* ----- Navigation ----- */}
                        <div className="row">
                            <div className="col-6">
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    onClick={this.handlePrev}
                                    disabled={
                                        this.state.currentLevelIndex === 0
                                            ? true
                                            : false
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
                                        this.state.currentLevelIndex + 1 >=
                                        this.state.totalLevels
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

export default connect(mapStateToProps)(HODQuizPreview);
