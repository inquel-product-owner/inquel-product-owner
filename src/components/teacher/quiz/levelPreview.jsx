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
    group_name: state.group_name,
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
    quiz_name: state.quiz_name,
});

class LevelPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            data: [],
            levelId: this.props.match.params.levelId,

            selectedImageData: [],
            startIndex: 0,
            isLightBoxOpen: false,

            levels: [],
            totalLevels: 0,
            currentLevelIndex: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.quizId = this.props.match.params.quizId;
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
            `${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/quiz/${this.quizId}/level/${this.state.levelId}/?attempt_name=${this.attempt}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let data = [];
                if (result.sts === true) {
                    if (result.data.results.length !== 0) {
                        let values = dataFormat(result);
                        data = values.result;
                    }
                    this.setState({
                        data: data,
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

    loadLevelData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/quiz/?attempt_name=${this.attempt}`,
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
                    for (let i = 0; i < result.data.levels.length; i++) {
                        if (
                            result.data.levels[i].level_id ===
                            this.state.levelId
                        ) {
                            currentIndex = i;
                        } else {
                            continue;
                        }
                    }
                    this.setState({
                        levels: result.data.levels,
                        totalLevels: result.data.levels.length,
                        currentLevelIndex: currentIndex,
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
                page_loading: true,
            },
            () => {
                this.loadQAData();
            }
        );
    };

    render() {
        document.title = `${this.props.quiz_name} : ${
            this.state.levels.length !== 0
                ? this.state.levels[this.state.currentLevelIndex].level_name
                : ""
        } - Teacher | IQLabs`;
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
                                        {this.props.quiz_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    {this.state.levels.length !== 0
                                        ? this.state.levels[
                                              this.state.currentLevelIndex
                                          ].level_name
                                        : ""}
                                </li>
                            </ol>
                        </nav>

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
                                        {this.attempt}
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
                                        this.state.currentLevelIndex > 0
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

export default connect(mapStateToProps)(LevelPreview);
