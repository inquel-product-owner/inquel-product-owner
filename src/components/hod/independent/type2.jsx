import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import FileModal from "../shared/fileExplorer";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    chapter_name: state.content.chapter_name,
    topic_name: state.content.topic_name,
});

class HODSubjectTypeTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,

            questions: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,

            selectedImage: "",
            selectedVideo: "",
            selectedAudio: "",
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicNum = this.props.match.params.topicNum;
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

    toggleModal = (image, video, audio) => {
        this.setState({
            showModal: !this.state.showModal,
            selectedImage: image,
            selectedVideo: video,
            selectedAudio: audio,
        });
    };

    // -------------------------- Question data loading --------------------------

    loadMCQData = async () => {
        await fetch(
            `${this.url}/hod/subject/${this.subjectId}/chapter/${this.chapterId}/${this.topicNum}/type_two/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let data = [];
                    let response = result.data.results;
                    if (response.length !== 0) {
                        let questionData = this.loopQuestionData(
                            data,
                            response
                        );
                        this.setState(
                            {
                                questions: questionData.question,
                            },
                            () => {
                                if (result.data.next !== null) {
                                    this.loadNextMCQData(result.data.next);
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

    loadNextMCQData = async (path) => {
        await fetch(path, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let data = [...this.state.questions];
                    let response = result.data.results;
                    if (response.length !== 0) {
                        let questionData = this.loopQuestionData(
                            data,
                            response
                        );
                        this.setState(
                            {
                                questions: questionData.question,
                            },
                            () => {
                                if (result.data.next !== null) {
                                    this.loadNextMCQData(result.data.next);
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

    loopQuestionData = (data, response) => {
        let images = [];
        let audio = [];
        let sub_question = [];
        for (let i = 0; i < response.length; i++) {
            images = [];
            audio = [];
            sub_question = [];
            if (
                response[i].files &&
                Object.entries(response[i].files).length !== 0
            ) {
                // image
                if (response[i].files.type2_image_1) {
                    images.push({
                        title: response[i].files.type2_image_1_title,
                        file_name: "",
                        image: null,
                        path: response[i].files.type2_image_1,
                    });
                }
                if (response[i].files.type2_image_2) {
                    images.push({
                        title: response[i].files.type2_image_2_title,
                        file_name: "",
                        image: null,
                        path: response[i].files.type2_image_2,
                    });
                }
                if (response[i].files.type2_image_3) {
                    images.push({
                        title: response[i].files.type2_image_3_title,
                        file_name: "",
                        image: null,
                        path: response[i].files.type2_image_3,
                    });
                }
                if (response[i].files.type2_image_4) {
                    images.push({
                        title: response[i].files.type2_image_4_title,
                        file_name: "",
                        image: null,
                        path: response[i].files.type2_image_4,
                    });
                }

                // audio
                if (response[i].files.type2_audio_1) {
                    audio.push({
                        title: response[i].files.type2_audio_1_title,
                        file_name: "",
                        audio: null,
                        path: response[i].files.type2_audio_1,
                    });
                }
                if (response[i].files.type2_audio_2) {
                    audio.push({
                        title: response[i].files.type2_audio_2_title,
                        file_name: "",
                        audio: null,
                        path: response[i].files.type2_audio_2,
                    });
                }
            }

            // video
            var path = "";
            if (
                response[i].files &&
                Object.entries(response[i].files).length !== 0
            ) {
                if (response[i].files.paste_video_url) {
                    path = response[i].files.paste_video_url;
                }
                if (response[i].files.type2_video_1) {
                    path = response[i].files.type2_video_1;
                }
            }

            // Sub question
            for (let k = 0; k < response[i].sub_question.length; k++) {
                sub_question.push({
                    sub_question_id:
                        response[i].sub_question[k].sub_question_id,
                    question: response[i].sub_question[k].question,
                    mcq: response[i].sub_question[k].mcq,
                    fill_in: response[i].sub_question[k].fill_in,
                    fillin_answer: response[i].sub_question[k].fillin_answer
                        ? response[i].sub_question[k].fillin_answer.length !== 0
                            ? response[i].sub_question[k].fillin_answer
                            : [""]
                        : [],
                    options: response[i].sub_question[k].options
                        ? response[i].sub_question[k].options.length !== 0
                            ? response[i].sub_question[k].options
                            : []
                        : [],
                });
            }

            // Main question
            data.push({
                question_random_id: response[i].question_random_id,
                question: response[i].question,
                explanation: response[i].explanation,
                mcq:
                    response[i].sub_question[0].mcq !== undefined
                        ? response[i].sub_question[0].mcq
                        : false,
                fill_in:
                    response[i].sub_question[0].fill_in !== undefined
                        ? response[i].sub_question[0].fill_in
                        : false,
                sub_question: sub_question,
                content: {
                    images: images.length === 0 ? [] : images,
                    video: {
                        title:
                            Object.entries(response[i].files).length !== 0 &&
                            response[i].files.type2_video_1_title
                                ? response[i].files.type2_video_1_title
                                : "",
                        file_name: "",
                        video: null,
                        path: path,
                        url: "",
                    },
                    audio: audio.length === 0 ? [] : audio,
                },
            });
        }

        return {
            question: data,
        };
    };

    // -------------------------- Lifecycle --------------------------

    componentDidMount = () => {
        document.title = `${this.props.topic_name} : Type Two - HOD | IQLabs`;

        this.loadMCQData();
    };

    render() {
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

                {/* File viewing Modal */}
                {this.state.showModal ? (
                    <FileModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        image={this.state.selectedImage}
                        video={this.state.selectedVideo}
                        audio={this.state.selectedAudio}
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

                        {/* ----- Breadcrumb ----- */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/hod">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/hod/subject/${this.subjectId}`}>
                                        {this.props.subject_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        {this.props.chapter_name}
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Type Two
                                </li>
                            </ol>
                        </nav>

                        {/* ----- Header area ----- */}
                        <h5 className="primary-text mb-4">
                            {`Type Two - ${this.props.topic_name}`}
                        </h5>

                        {/* -------------------- Main question -------------------- */}
                        {this.state.questions.length !== 0
                            ? this.state.questions.map((question, q_index) => {
                                  return (
                                      <div key={q_index}>
                                          <div className="d-flex align-items-start mb-3">
                                              {/* ---------- Side buttons ---------- */}
                                              <div
                                                  className="bg-white rounded-lg shadow-sm text-nowrap mr-2"
                                                  style={{
                                                      paddingTop: "8px",
                                                      paddingBottom: "8px",
                                                      paddingLeft: "12px",
                                                      paddingRight: "12px",
                                                      userSelect: "none",
                                                  }}
                                              >
                                                  {q_index <= 8
                                                      ? `0${q_index + 1}`
                                                      : q_index + 1}
                                              </div>

                                              {/* ---------- Question preview ---------- */}
                                              <div
                                                  className="card shadow-sm w-100"
                                                  style={{
                                                      minHeight: "115px",
                                                  }}
                                              >
                                                  <div className="card-body">
                                                      <div className="d-flex align-items-start">
                                                          {/* Questions */}
                                                          <div className="w-100">
                                                              <div
                                                                  className="pb-2"
                                                                  dangerouslySetInnerHTML={{
                                                                      __html: question.question,
                                                                  }}
                                                              ></div>
                                                          </div>

                                                          {/* File modal button */}
                                                          {question.content
                                                              .images.length !==
                                                              0 ||
                                                          question.content.video
                                                              .path !== "" ||
                                                          question.content.audio
                                                              .length !== 0 ? (
                                                              <button
                                                                  className="btn btn-light bg-white shadow-sm ml-3"
                                                                  onClick={() =>
                                                                      this.toggleModal(
                                                                          question
                                                                              .content
                                                                              .images,
                                                                          question
                                                                              .content
                                                                              .video,
                                                                          question
                                                                              .content
                                                                              .audio
                                                                      )
                                                                  }
                                                              >
                                                                  <i className="far fa-folder-open"></i>
                                                              </button>
                                                          ) : (
                                                              ""
                                                          )}
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>

                                          {/* ---------- Sub question ---------- */}
                                          <div className="ml-md-5 ml-3">
                                              {question.sub_question.map(
                                                  (sub_question, sub_index) => {
                                                      return (
                                                          <div
                                                              className="d-flex align-items-start mb-3"
                                                              key={sub_index}
                                                          >
                                                              {/* ---------- Side buttons ---------- */}
                                                              <div
                                                                  className="bg-white rounded-lg shadow-sm text-nowrap mr-2"
                                                                  style={{
                                                                      paddingTop:
                                                                          "8px",
                                                                      paddingBottom:
                                                                          "8px",
                                                                      paddingLeft:
                                                                          "12px",
                                                                      paddingRight:
                                                                          "12px",
                                                                      userSelect:
                                                                          "none",
                                                                  }}
                                                              >
                                                                  {sub_index <=
                                                                  8
                                                                      ? `0${
                                                                            sub_index +
                                                                            1
                                                                        }`
                                                                      : sub_index +
                                                                        1}
                                                              </div>

                                                              {/* ---------- Sub Question preview ---------- */}
                                                              <div className="card shadow-sm w-100">
                                                                  <div className="card-body">
                                                                      <div
                                                                          className="pb-2"
                                                                          dangerouslySetInnerHTML={{
                                                                              __html: sub_question.question,
                                                                          }}
                                                                      ></div>

                                                                      {sub_question.mcq ? (
                                                                          <div className="row">
                                                                              {sub_question.options.map(
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
                                                                                                                  __html:
                                                                                                                      options.content !==
                                                                                                                      ""
                                                                                                                          ? `<div class="mb-3">${options.content}</div>`
                                                                                                                          : `<p class="text-muted">Option 0${
                                                                                                                                index +
                                                                                                                                1
                                                                                                                            }</p>`,
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
                                                                      {sub_question.fill_in ? (
                                                                          <div className="row">
                                                                              {sub_question.fillin_answer.map(
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
                                                                                                  <div className="card shadow-sm bg-light">
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
                                                                  {/* ----- Answer type tag ----- */}
                                                                  {sub_question.mcq ? (
                                                                      <div
                                                                          className="secondary-bg primary-text font-weight-bold px-2 py-1 position-absolute rounded-lg shadow-sm"
                                                                          style={{
                                                                              bottom: "5px",
                                                                              right: "5px",
                                                                              fontSize:
                                                                                  "10px",
                                                                          }}
                                                                      >
                                                                          MCQ
                                                                      </div>
                                                                  ) : sub_question.fill_in ? (
                                                                      <div
                                                                          className="secondary-bg primary-text font-weight-bold px-2 py-1 position-absolute rounded-lg shadow-sm"
                                                                          style={{
                                                                              bottom: "5px",
                                                                              right: "5px",
                                                                              fontSize:
                                                                                  "10px",
                                                                          }}
                                                                      >
                                                                          Fill
                                                                          in
                                                                      </div>
                                                                  ) : (
                                                                      ""
                                                                  )}
                                                              </div>
                                                          </div>
                                                      );
                                                  }
                                              )}
                                          </div>
                                      </div>
                                  );
                              })
                            : "No content to display..."}

                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(HODSubjectTypeTwo);
