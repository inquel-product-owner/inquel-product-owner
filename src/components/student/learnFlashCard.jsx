import React, { Component } from "react";
import Header from "./shared/examNavbar";
import ReactCardFlip from "react-card-flip";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../sharedComponents/alert";
import Loading from "../sharedComponents/loader";
import { OverlayTrigger, Tooltip, Popover, Modal } from "react-bootstrap";
import FullScreen from "react-fullscreen-crossbrowser";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

class VideoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            video: this.props.video,
        };
    }

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className="card">
                        <Player>
                            <source src={this.state.video.path} />
                        </Player>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

class FlashCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlipped: false,
            showVideoModal: false,
            subject_name: "",
            chapter_name: "",
            concepts: [],
            practice: [],
            match: [],

            sections: [],
            explanation: [],

            activeTab: "concept",
            activeData: 0,
            totalItems: "",
            next: null,
            previous: null,
            isFullscreenEnabled: false,

            selectedImage: 0,
            selectedImageData: {},
            selectedVideoData: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicName = this.props.match.params.topicName;
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    // ---------- loads concepts data ----------
    loadConceptData = (path) => {
        var apiURL =
            path === undefined || path === null
                ? `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/concepts/?topic_name=${this.topicName}`
                : path;
        fetch(apiURL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let data = [];
                    let images = [];
                    let audio = [];
                    let response = result.data.results;
                    if (response.length !== 0) {
                        for (let i = 0; i < response.length; i++) {
                            images = [];
                            audio = [];
                            if (response[i].files.length !== 0) {
                                // image
                                if (response[i].files[0].concepts_image_1) {
                                    images.push({
                                        title:
                                            response[i].files[0]
                                                .concepts_image_1_title,
                                        file_name: "",
                                        image: null,
                                        path:
                                            response[i].files[0]
                                                .concepts_image_1,
                                    });
                                }
                                if (response[i].files[0].concepts_image_2) {
                                    images.push({
                                        title:
                                            response[i].files[0]
                                                .concepts_image_2_title,
                                        file_name: "",
                                        image: null,
                                        path:
                                            response[i].files[0]
                                                .concepts_image_2,
                                    });
                                }
                                if (response[i].files[0].concepts_image_3) {
                                    images.push({
                                        title:
                                            response[i].files[0]
                                                .concepts_image_3_title,
                                        file_name: "",
                                        image: null,
                                        path:
                                            response[i].files[0]
                                                .concepts_image_3,
                                    });
                                }
                                if (response[i].files[0].concepts_image_4) {
                                    images.push({
                                        title:
                                            response[i].files[0]
                                                .concepts_image_4_title,
                                        file_name: "",
                                        image: null,
                                        path:
                                            response[i].files[0]
                                                .concepts_image_4,
                                    });
                                }

                                // audio
                                if (response[i].files[0].concepts_audio_1) {
                                    audio.push({
                                        title:
                                            response[i].files[0]
                                                .concepts_audio_1_title,
                                        file_name: "",
                                        audio: null,
                                        path:
                                            response[i].files[0]
                                                .concepts_audio_1,
                                    });
                                }
                                if (response[i].files[0].concepts_audio_2) {
                                    audio.push({
                                        title:
                                            response[i].files[0]
                                                .concepts_audio_2_title,
                                        file_name: "",
                                        audio: null,
                                        path:
                                            response[i].files[0]
                                                .concepts_audio_2,
                                    });
                                }
                            }

                            // video
                            var path = "";
                            if (response[i].files.length !== 0) {
                                if (response[i].files[0].paste_video_url) {
                                    path = response[i].files[0].paste_video_url;
                                }
                                if (response[i].files[0].concepts_video_1) {
                                    path =
                                        response[i].files[0].concepts_video_1;
                                }
                            }

                            data.push({
                                chapter_id: this.props.match.params.chapterId,
                                topic_name: this.props.match.params.topicName,
                                concepts_random_id:
                                    response[i].concepts_random_id,
                                content: {
                                    terms: response[i].terms,
                                    definition: response[i].definition,
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
                                    video: {
                                        title:
                                            response[i].files.length !== 0 &&
                                            response[i].files[0]
                                                .concepts_video_1_title
                                                ? response[i].files[0]
                                                      .concepts_video_1_title
                                                : "",
                                        file_name: "",
                                        video: null,
                                        path: path,
                                        url: "",
                                    },
                                    audio:
                                        audio.length === 0
                                            ? [
                                                  {
                                                      title: "",
                                                      file_name: "",
                                                      audio: null,
                                                      path: "",
                                                  },
                                              ]
                                            : audio,
                                },
                                settings: {
                                    virtual_keyboard:
                                        response[i].settings.virtual_keyboard,
                                    limited: response[i].settings.limited,
                                },
                            });
                        }
                        this.setState({
                            concepts: data,
                            activeData: 0,
                            totalItems: response.length,
                            previous: result.data.previous,
                            next: result.data.next,
                            selectedImageData: {
                                title: "",
                                file_name: "",
                                image: null,
                                path: "",
                            },
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            page_loading: false,
                            activeTab: "practice",
                        });
                        this.loadPracticeData();
                        this.props.history.push({ hash: "practice" });
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
    };

    conceptRender = (data, index) => {
        return (
            <FullScreen
                enabled={this.state.isFullscreenEnabled}
                onChange={(isFullscreenEnabled) =>
                    this.setState({ isFullscreenEnabled })
                }
            >
                <ReactCardFlip
                    isFlipped={this.state.isFlipped}
                    flipDirection="vertical"
                >
                    <div
                        className="card card-body shadow-sm align-items-center justify-content-center"
                        style={{
                            minHeight: `${
                                this.state.isFullscreenEnabled
                                    ? "100vh"
                                    : "80vh"
                            }`,
                        }}
                        onClick={() => {
                            this.setState({
                                isFlipped: !this.state.isFlipped,
                            });
                        }}
                    >
                        <div
                            className="h4 font-weight-bold-600"
                            dangerouslySetInnerHTML={{
                                __html:
                                    data[index] !== undefined &&
                                    data[index].content !== undefined &&
                                    data[index].content.terms !== undefined
                                        ? data[index].content.terms
                                        : "",
                            }}
                        ></div>
                        <button
                            className="btn btn-link btn-sm shadow-none"
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.setState({
                                    isFullscreenEnabled: !this.state
                                        .isFullscreenEnabled,
                                });
                            }}
                        >
                            <i className="fas fa-expand fa-lg"></i>
                        </button>
                    </div>
                    <div
                        className="card card-body shadow-sm align-items-center justify-content-center"
                        style={{
                            minHeight: `${
                                this.state.isFullscreenEnabled
                                    ? "100vh"
                                    : "80vh"
                            }`,
                        }}
                        onClick={() => {
                            this.setState({
                                isFlipped: !this.state.isFlipped,
                            });
                        }}
                    >
                        <div className="row w-100">
                            {/* ---------- Content ---------- */}
                            <div
                                className={`${
                                    data[index] !== undefined &&
                                    data[index].content !== undefined &&
                                    data[index].content.images !== undefined
                                        ? this.state.selectedImageData.path !==
                                              "" ||
                                          data[index].content.images[0].path !==
                                              ""
                                            ? "col-md-9"
                                            : "col-12"
                                        : ""
                                }`}
                            >
                                <div
                                    className="lead"
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            data[index] !== undefined &&
                                            data[index].content !== undefined &&
                                            data[index].content.definition !==
                                                undefined
                                                ? data[index].content.definition
                                                : "",
                                    }}
                                ></div>
                            </div>
                            {/* ---------- Image ---------- */}
                            {data[index] !== undefined &&
                            data[index].content !== undefined &&
                            data[index].content.images !== undefined
                                ? this.state.selectedImageData.path !== "" ||
                                  data[index].content.images[0].path !== ""
                                    ? this.imageRender(data, index)
                                    : ""
                                : ""}
                        </div>
                        <button
                            className="btn btn-link btn-sm shadow-none"
                            style={{
                                position: "absolute",
                                top: "10px",
                                right: "10px",
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                this.setState({
                                    isFullscreenEnabled: !this.state
                                        .isFullscreenEnabled,
                                });
                            }}
                        >
                            <i className="fas fa-expand fa-lg"></i>
                        </button>
                    </div>
                </ReactCardFlip>
            </FullScreen>
        );
    };

    // ---------- loads practice data ----------
    loadPracticeData = (path) => {
        var apiURL =
            path === undefined || path === null
                ? `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/typeone/learn/?topic_name=${this.topicName}`
                : path;
        fetch(apiURL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let data = [];
                    let images = [];
                    let audio = [];
                    let response = result.data.results;
                    if (response.length !== 0) {
                        for (let i = 0; i < response.length; i++) {
                            images = [];
                            audio = [];
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
                                            response[i].files[0].type1_image_1,
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
                                            response[i].files[0].type1_image_2,
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
                                            response[i].files[0].type1_image_3,
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
                                            response[i].files[0].type1_image_4,
                                    });
                                }

                                // audio
                                if (response[i].files[0].type1_audio_1) {
                                    audio.push({
                                        title:
                                            response[i].files[0]
                                                .type1_audio_1_title,
                                        file_name: "",
                                        audio: null,
                                        path:
                                            response[i].files[0].type1_audio_1,
                                    });
                                }
                                if (response[i].files[0].type1_audio_2) {
                                    audio.push({
                                        title:
                                            response[i].files[0]
                                                .type1_audio_2_title,
                                        file_name: "",
                                        audio: null,
                                        path:
                                            response[i].files[0].type1_audio_2,
                                    });
                                }
                            }

                            // video
                            var path = "";
                            if (response[i].files.length !== 0) {
                                if (response[i].files[0].paste_video_url) {
                                    path = response[i].files[0].paste_video_url;
                                }
                                if (response[i].files[0].type1_video_1) {
                                    path = response[i].files[0].type1_video_1;
                                }
                            }
                            console.log(response[i]);
                            data.push({
                                question: response[i].question,
                                question_random_id:
                                    response[i].question_random_id,
                                content: {
                                    mcq: response[i].mcq,
                                    fill_in: response[i].fill_in,
                                    boolean: response[i].boolean,
                                    fillin_answer: [
                                        response[i].fillin_answer !== undefined
                                            ? response[i].fillin_answer
                                                  .length !== 0
                                                ? response[i].fillin_answer
                                                : [""]
                                            : [""],
                                    ],
                                    boolean_question:
                                        response[i].boolean_question !==
                                        undefined
                                            ? response[i].boolean_question
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
                                                  ]
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
                                    mcq_answers:
                                        response[i].mcq_answers !== undefined
                                            ? response[i].mcq_answers
                                            : 0,
                                    options:
                                        response[i].options !== undefined
                                            ? response[i].options.length !== 0
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
                                                  ]
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
                                    video: {
                                        title:
                                            response[i].files.length !== 0 &&
                                            response[i].files[0]
                                                .type1_video_1_title
                                                ? response[i].files[0]
                                                      .type1_video_1_title
                                                : "",
                                        file_name: "",
                                        video: null,
                                        path: path,
                                        url: "",
                                    },
                                    audio:
                                        audio.length === 0
                                            ? [
                                                  {
                                                      title: "",
                                                      file_name: "",
                                                      audio: null,
                                                      path: "",
                                                  },
                                              ]
                                            : audio,
                                },
                                properties: {
                                    marks: response[i].properties.marks,
                                    complexity:
                                        response[i].properties.complexity,
                                    priority: response[i].properties.priority,
                                    theme: response[i].properties.theme,
                                    test: response[i].properties.test,
                                    semester: response[i].properties.semester,
                                    quiz: response[i].properties.quiz,
                                    learn: response[i].properties.learn,
                                },
                                settings: {
                                    virtual_keyboard:
                                        response[i].settings.virtual_keyboard,
                                    limited: response[i].settings.limited,
                                },
                            });
                        }
                        this.setState(
                            {
                                practice: data,
                                activeData: 0,
                                totalItems: response.length,
                                previous: result.data.previous,
                                next: result.data.next,
                                selectedImageData: {
                                    title: "",
                                    file_name: "",
                                    image: null,
                                    path: "",
                                },
                                page_loading: false,
                            },
                            () => {
                                this.loopSectionStructure();
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
    };

    practiceRender = (data, index, question, explanation) => {
        return (
            <div
                className="card card-body shadow-sm"
                style={{ minHeight: "80vh" }}
            >
                <div className="row w-100">
                    {/* ---------- Content ---------- */}
                    <div
                        className={`${
                            data[index].content.images !== undefined
                                ? this.state.selectedImageData.path !== "" ||
                                  data[index].content.images[0].path !== ""
                                    ? "col-md-9"
                                    : "col-12"
                                : ""
                        }`}
                    >
                        <div
                            className="font-weight-bold-600 mb-4"
                            dangerouslySetInnerHTML={{
                                __html: data[index].question,
                            }}
                        ></div>

                        {/* ---------- Explanation ---------- */}
                        {explanation.lenght !== 0 ? (
                            explanation.explanation !== "" ? (
                                <>
                                    <div
                                        className="card card-body bg-light mb-3"
                                        style={{
                                            minHeight: "200px",
                                        }}
                                    >
                                        <p className="font-weight-bold-600 mb-2">
                                            Explanation:
                                        </p>
                                        <p
                                            className="small"
                                            dangerouslySetInnerHTML={{
                                                __html: explanation.explanation,
                                            }}
                                        ></p>
                                    </div>
                                    {/* show answer */}
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div
                                                className="card card-body success-bg h-100"
                                                style={{
                                                    minHeight: "100px",
                                                }}
                                            >
                                                <p className="font-weight-bold-600 mb-2">
                                                    Correct answer(s):
                                                </p>
                                                {explanation.answer === false
                                                    ? explanation.answers !==
                                                          undefined &&
                                                      explanation.answers
                                                          .lenght !== 0
                                                        ? explanation.answers.map(
                                                              (data, index) => {
                                                                  return (
                                                                      <p
                                                                          className="small mb-2"
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          {data}
                                                                      </p>
                                                                  );
                                                              }
                                                          )
                                                        : ""
                                                    : question.length !== 0
                                                    ? question.answers
                                                          .length !== 0
                                                        ? question.answers.map(
                                                              (data, index) => {
                                                                  return (
                                                                      <p
                                                                          className="small mb-2"
                                                                          key={
                                                                              index
                                                                          }
                                                                      >
                                                                          {data}
                                                                      </p>
                                                                  );
                                                              }
                                                          )
                                                        : ""
                                                    : ""}
                                            </div>
                                        </div>
                                        {explanation.answer === false ? (
                                            <div className="col-md-6">
                                                <div
                                                    className="card card-body danger-bg h-100"
                                                    style={{
                                                        minHeight: "100px",
                                                    }}
                                                >
                                                    <p className="font-weight-bold-600 mb-2">
                                                        Your answer(s):
                                                    </p>
                                                    {question.length !== 0
                                                        ? question.answers
                                                              .length !== 0
                                                            ? question.answers.map(
                                                                  (
                                                                      data,
                                                                      index
                                                                  ) => {
                                                                      return (
                                                                          <p
                                                                              className="small mb-2"
                                                                              key={
                                                                                  index
                                                                              }
                                                                          >
                                                                              {
                                                                                  data
                                                                              }
                                                                          </p>
                                                                      );
                                                                  }
                                                              )
                                                            : ""
                                                        : ""}
                                                </div>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </>
                            ) : // ---------- MCQ Optins ----------
                            data[index].content.mcq === true ? (
                                data[index].content.options.map(
                                    (option, option_index) => {
                                        return (
                                            <div
                                                className="custom-control custom-checkbox mb-3"
                                                key={option_index}
                                            >
                                                <input
                                                    type="checkbox"
                                                    className="custom-control-input"
                                                    id={`option_${option_index}`}
                                                    value={option.content}
                                                    onChange={(event) =>
                                                        this.handleMCQ(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                    checked={
                                                        question.length !== 0
                                                            ? question.answers
                                                                  .length !== 0
                                                                ? question.answers.includes(
                                                                      option.content
                                                                  )
                                                                    ? true
                                                                    : false
                                                                : false
                                                            : false
                                                    }
                                                />
                                                <label
                                                    className="custom-control-label"
                                                    htmlFor={`option_${option_index}`}
                                                >
                                                    {option.content}
                                                </label>
                                            </div>
                                        );
                                    }
                                )
                            ) : // ---------- True or False ----------
                            data[index].content.boolean === true ? (
                                data[index].content.boolean_question.map(
                                    (option, boolean_index) => {
                                        return (
                                            <div
                                                className="form-check mb-3"
                                                key={boolean_index}
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    id={`customCheck1${boolean_index}`}
                                                    name={`radio${index}`}
                                                    value={option.content}
                                                    onChange={(event) =>
                                                        this.handleBoolean(
                                                            event,
                                                            index
                                                        )
                                                    }
                                                    checked={
                                                        question.length !== 0
                                                            ? question.answers
                                                                  .length !== 0
                                                                ? question.answers.includes(
                                                                      option.content
                                                                  )
                                                                    ? true
                                                                    : false
                                                                : false
                                                            : false
                                                    }
                                                />
                                                <label
                                                    className="form-check-label"
                                                    id={`customCheck1${boolean_index}`}
                                                >
                                                    {option.content}
                                                </label>
                                            </div>
                                        );
                                    }
                                )
                            ) : // ---------- Fill in answers ----------
                            data[index].content.fill_in === true ? (
                                <input
                                    type="text"
                                    name="fill_in"
                                    className="form-control borders"
                                    placeholder="Type your answer here"
                                    value={
                                        question.length !== 0
                                            ? question.answers.length !== 0
                                                ? question.answers[0]
                                                : ""
                                            : ""
                                    }
                                    onChange={(event) =>
                                        this.handleFillin(event, index)
                                    }
                                    autoComplete="off"
                                />
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}

                        {/* ----- Multiple choice notes ----- */}
                        {explanation.length !== 0 ? (
                            explanation.explanation === "" ? (
                                data[index].content.mcq_answers !==
                                undefined ? (
                                    data[index].content.mcq_answers > 1 ? (
                                        <div className="small">
                                            <b>Note:</b>{" "}
                                            {data[index].content.mcq_answers}{" "}
                                            answers are correct
                                        </div>
                                    ) : null
                                ) : null
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}

                        {/* ----- Check button ----- */}
                        {explanation.length !== 0 ? (
                            explanation.explanation === "" ? (
                                <div className="row mt-4">
                                    <div className="col-md-3">
                                        <button
                                            className="btn btn-primary btn-block btn-sm shadow-none"
                                            onClick={() => {
                                                this.handleCheck(question);
                                            }}
                                        >
                                            Check
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )
                        ) : (
                            ""
                        )}
                    </div>
                    {/* ---------- Image ---------- */}
                    {data[index].content.images !== undefined
                        ? this.state.selectedImageData.path !== "" ||
                          data[index].content.images[0].path !== ""
                            ? this.imageRender(data, index)
                            : ""
                        : ""}
                </div>
            </div>
        );
    };

    // ---------- loads subject information ----------
    componentDidMount = () => {
        if (!this.props.location.hash) {
            this.setState({ activeTab: "concept" });
            this.loadConceptData();
        } else {
            this.setState({ activeTab: this.props.location.hash.substring(1) });
            if (this.props.location.hash.substring(1) === "concept") {
                this.loadConceptData();
            } else if (this.props.location.hash.substring(1) === "practice") {
                this.loadPracticeData();
            } else if (this.props.location.hash.substring(1) === "match") {
                this.loadMatchData();
            }
        }

        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let chapter_name = "";
                    // extract currently selected chapter name
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        if (
                            result.data.chapters[i].chapter_id ===
                            this.chapterId
                        ) {
                            chapter_name = result.data.chapters[i].chapter_name;
                        } else {
                            continue;
                        }
                    }
                    this.setState({
                        subject_name: result.data.subject_name,
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

    // ---------- Navigation ----------
    handleNextPage = () => {
        this.setState(
            {
                isFlipped: false,
                page_loading: true,
                selectedImageData: {
                    title: "",
                    file_name: "",
                    image: null,
                    path: "",
                },
            },
            () => {
                if (this.state.activeTab === "concept") {
                    this.loadConceptData(this.state.next);
                } else if (this.state.activeTab === "practice") {
                    this.loadPracticeData(this.state.next);
                } else if (this.state.activeTab === "match") {
                    this.loadMatchData(this.state.next);
                }
            }
        );
    };

    handlePrevPage = () => {
        this.setState(
            {
                isFlipped: false,
                page_loading: true,
                selectedImageData: {
                    title: "",
                    file_name: "",
                    image: null,
                    path: "",
                },
            },
            () => {
                if (this.state.activeTab === "concept") {
                    this.loadConceptData(this.state.previous);
                } else if (this.state.activeTab === "practice") {
                    this.loadPracticeData(this.state.previous);
                } else if (this.state.activeTab === "match") {
                    this.loadMatchData(this.state.previous);
                }
            }
        );
    };

    handleNext = () => {
        this.setState({
            activeData: this.state.activeData + 1,
            isFlipped: false,
            selectedImageData: {
                title: "",
                file_name: "",
                image: null,
                path: "",
            },
        });
    };

    handlePrev = () => {
        this.setState({
            activeData: this.state.activeData - 1,
            isFlipped: false,
            selectedImageData: {
                title: "",
                file_name: "",
                image: null,
                path: "",
            },
        });
    };

    // ---------- Tab selection ----------
    toggleTab = (type) => {
        this.setState({
            activeTab: type,
            page_loading: true,
        });
        this.props.history.push({ hash: type });
        if (type === "concept") {
            this.loadConceptData();
        } else if (type === "practice") {
            this.loadPracticeData();
        } else if (type === "match") {
            this.loadMatchData();
        }
    };

    // ---------- Image ----------
    changeImage = (image_index, index) => {
        let image = "";
        if (this.state.activeTab === "concept") {
            image = this.state.concepts;
        } else if (this.state.activeTab === "practice") {
            image = this.state.practice;
        } else if (this.state.activeTab === "match") {
            image = this.state.match;
        }
        this.setState({
            selectedImage: image_index,
            selectedImageData: image[index].content.images[image_index],
        });
    };

    imageRender = (data, index) => {
        return (
            <div className="col-md-3">
                <div className="card">
                    {/* Single image view */}
                    <div className="card-body text-center p-0">
                        {data[index] !== undefined &&
                        data[index].content !== undefined &&
                        data[index].content.images !== undefined ? (
                            <>
                                <img
                                    src={
                                        this.state.selectedImageData.path === ""
                                            ? data[index].content.images[0].path
                                            : this.state.selectedImageData.path
                                    }
                                    alt={
                                        this.state.selectedImageData
                                            .file_name === ""
                                            ? data[index].content.images[0]
                                                  .file_name
                                            : this.state.selectedImageData
                                                  .file_name
                                    }
                                    className="img-fluid rounded-lg"
                                />
                                <div className="card-body primary-text font-weight-bold-600 text-center small p-2">
                                    {this.state.selectedImageData.title}
                                </div>
                            </>
                        ) : (
                            ""
                        )}
                    </div>
                    {/* Thumbnails */}
                    <div className="card-footer px-0">
                        <div className="row justify-content-center">
                            {data[index] !== undefined &&
                            data[index].content !== undefined &&
                            data[index].content.images !== undefined
                                ? data[index].content.images.map(
                                      (images, image_index) => {
                                          return images.path !== "" ? (
                                              <div
                                                  key={image_index}
                                                  className="col-md-3"
                                              >
                                                  <div
                                                      className={`card preview-img-xs shadow-sm ${
                                                          this.state
                                                              .selectedImage ===
                                                          image_index
                                                              ? "border-primary"
                                                              : ""
                                                      }`}
                                                      style={{
                                                          backgroundImage: `url(${images.path})`,
                                                      }}
                                                      onClick={(e) => {
                                                          this.changeImage(
                                                              image_index,
                                                              index
                                                          );
                                                          e.stopPropagation();
                                                      }}
                                                  ></div>
                                              </div>
                                          ) : null;
                                      }
                                  )
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // ---------- Video ----------

    toggleVideoModal = (data) => {
        this.setState({
            showVideoModal: !this.state.showVideoModal,
            selectedVideoData: data,
        });
    };

    // ---------- creates section structure ----------

    loopSectionStructure = () => {
        const sections =
            this.state.practice !== undefined ||
            this.state.practice.length !== 0
                ? this.state.practice
                : [];
        let questions = [];
        let explanation = [];

        if (sections.length !== 0) {
            sections.forEach((data) => {
                questions.push({
                    question_random_id: data.question_random_id,
                    answers: [],
                });
                explanation.push({
                    answer: false,
                    answers: [],
                    explanation: "",
                });
            });
        }

        this.setState({
            sections: questions,
            explanation: explanation,
        });
    };

    // ---------- handle option selection ----------

    handleMCQ = (event, index) => {
        let sections = [...this.state.sections];
        if (event.target.checked) {
            sections[index].answers.push(event.target.value);
            this.setState({
                sections: sections,
            });
        } else {
            sections[index].answers.splice(
                sections[index].answers.indexOf(event.target.value),
                1
            );
            this.setState({
                sections: sections,
            });
        }
    };

    handleFillin = (event, index) => {
        let sections = [...this.state.sections];
        if (event.target.value !== "") {
            sections[index].answers[0] = event.target.value;
            this.setState({
                sections: sections,
            });
        } else {
            sections[index].answers = [];
            this.setState({
                sections: sections,
            });
        }
    };

    handleBoolean = (event, index) => {
        let sections = [...this.state.sections];
        sections[index].answers[0] = event.target.value;
        this.setState({
            sections: sections,
        });
    };

    // ---------- Post the options answers ----------

    handleCheck = (data) => {
        this.setState({
            page_loading: true,
        });

        let explanation = [...this.state.explanation];

        if (data.answers.length !== 0) {
            fetch(
                `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/typeone/learn/`,
                {
                    method: "POST",
                    headers: this.headers,
                    body: JSON.stringify(data),
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.sts === true) {
                        explanation[this.state.activeData].answer =
                            result.answer;
                        explanation[this.state.activeData].answers =
                            result.data.answers;
                        explanation[this.state.activeData].explanation =
                            result.data.explanation;
                        this.setState({
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            page_loading: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                page_loading: false,
                errorMsg: "Answer the question to view the result",
                showErrorAlert: true,
            });
        }
    };

    render() {
        document.title = `${this.state.chapter_name} learn - Teacher | IQLabs`;
        let data = [];
        if (this.state.activeTab === "concept") {
            data =
                this.state.concepts !== undefined
                    ? this.state.concepts.length !== 0
                        ? this.state.concepts
                        : []
                    : [];
        } else if (this.state.activeTab === "practice") {
            data =
                this.state.practice !== undefined
                    ? this.state.practice.length !== 0
                        ? this.state.practice
                        : []
                    : [];
        } else if (this.state.activeTab === "match") {
            data =
                this.state.match !== undefined
                    ? this.state.match.length !== 0
                        ? this.state.match
                        : []
                    : [];
        }
        const question =
            this.state.sections[this.state.activeData] !== undefined
                ? this.state.sections[this.state.activeData]
                : [];
        const explanation =
            this.state.explanation[this.state.activeData] !== undefined
                ? this.state.explanation[this.state.activeData]
                : [];
        const index = this.state.activeData;
        const total = this.state.totalItems;
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={`${this.state.chapter_name}`}
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

                {/* Video modal */}
                {this.state.showVideoModal ? (
                    <VideoModal
                        show={this.state.showVideoModal}
                        onHide={this.toggleVideoModal}
                        video={this.state.selectedVideoData}
                    />
                ) : (
                    ""
                )}

                {/* Header tab section */}
                <div className="light-bg p-3 mt-1 mb-3">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            <div className="row align-items-center">
                                <div className="col-md-6">
                                    <span className="small primary-text font-weight-bold-600 mb-0 mr-3">
                                        STUDY
                                    </span>
                                    <button
                                        className={`btn ${
                                            this.state.activeTab === "concept"
                                                ? "btn-primary"
                                                : "btn-primary-invert"
                                        } btn-sm mr-3 shadow-none`}
                                        onClick={() =>
                                            this.toggleTab("concept")
                                        }
                                    >
                                        Concept
                                    </button>
                                    <button
                                        className={`btn ${
                                            this.state.activeTab === "practice"
                                                ? "btn-primary"
                                                : "btn-primary-invert"
                                        } btn-sm mr-3 shadow-none`}
                                        onClick={() =>
                                            this.toggleTab("practice")
                                        }
                                    >
                                        Practice
                                    </button>
                                    <span className="small primary-text font-weight-bold-600 mb-0 mr-3">
                                        PLAY
                                    </span>
                                    <button
                                        className={`btn ${
                                            this.state.activeTab === "match"
                                                ? "btn-primary"
                                                : "btn-primary-invert"
                                        } btn-sm shadow-none`}
                                        onClick={() => this.toggleTab("match")}
                                    >
                                        Match
                                    </button>
                                </div>
                                <div className="col-md-6 text-right">
                                    <button className="btn btn-primary btn-sm rounded-circle mr-3 shadow-none">
                                        <i
                                            className="fas fa-bookmark fa-sm"
                                            style={{
                                                marginLeft: "1px",
                                                marginRight: "1px",
                                            }}
                                        ></i>
                                    </button>
                                    {data[index] !== undefined &&
                                    data[index].content !== undefined &&
                                    data[index].content.audio !== undefined
                                        ? data[index].content.audio.map(
                                              (audio, audio_index) => {
                                                  return audio.path !== "" ? (
                                                      <OverlayTrigger
                                                          trigger="click"
                                                          key={`popover${audio_index}`}
                                                          placement="bottom"
                                                          overlay={
                                                              <Popover
                                                                  id={`popover-positioned-bottom${audio_index}`}
                                                              >
                                                                  {audio.title !==
                                                                  "" ? (
                                                                      <Popover.Title>
                                                                          {
                                                                              audio.title
                                                                          }
                                                                      </Popover.Title>
                                                                  ) : (
                                                                      ""
                                                                  )}
                                                                  <Popover.Content
                                                                      style={{
                                                                          overflow:
                                                                              "auto",
                                                                      }}
                                                                  >
                                                                      <audio
                                                                          src={
                                                                              audio.path
                                                                          }
                                                                          controls
                                                                          controlsList="nodownload"
                                                                      ></audio>
                                                                  </Popover.Content>
                                                              </Popover>
                                                          }
                                                      >
                                                          <button
                                                              className="btn btn-primary btn-sm rounded-circle mr-3 shadow-none"
                                                              key={audio_index}
                                                          >
                                                              <i className="fas fa-volume-up buttton fa-sm"></i>
                                                          </button>
                                                      </OverlayTrigger>
                                                  ) : (
                                                      ""
                                                  );
                                              }
                                          )
                                        : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container-fluid mb-3">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            {this.state.activeTab === "concept" ? (
                                this.conceptRender(data, index)
                            ) : this.state.activeTab === "practice" ? (
                                data[index] !== undefined &&
                                data[index].content !== undefined ? (
                                    this.practiceRender(
                                        data,
                                        index,
                                        question,
                                        explanation
                                    )
                                ) : (
                                    ""
                                )
                            ) : this.state.activeTab === "match" ? (
                                <p>Match</p>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>

                {/* ---------- footer ---------- */}
                <div className="secondary-bg p-3">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            <div className="row align-items-center">
                                <div className="col-md-4">
                                    <button className="btn btn-primary btn-sm rounded-circle shadow-none mr-3">
                                        <i className="fas fa-keyboard fa-sm"></i>
                                    </button>
                                    <button className="btn btn-primary btn-sm rounded-circle shadow-none">
                                        <i className="fas fa-pencil-ruler fa-sm"></i>
                                    </button>
                                </div>
                                <div className="col-md-4 align-items-center text-center small">
                                    {/* ----- Previous button ----- */}
                                    <OverlayTrigger
                                        key="top1"
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip1">
                                                Previous page
                                            </Tooltip>
                                        }
                                    >
                                        <button
                                            className="btn btn-link btn-sm mr-2 shadow-none"
                                            onClick={this.handlePrevPage}
                                            disabled={
                                                this.state.previous !== null
                                                    ? false
                                                    : true
                                            }
                                        >
                                            <i className="fas fa-angle-double-left"></i>
                                        </button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        key="top2"
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip2">
                                                Previous slide
                                            </Tooltip>
                                        }
                                    >
                                        <button
                                            className="btn btn-link btn-sm mr-2 shadow-none"
                                            onClick={() =>
                                                this.handlePrev(data, index)
                                            }
                                            disabled={
                                                index === 0 ? true : false
                                            }
                                        >
                                            <i className="fas fa-chevron-left fa-sm"></i>
                                        </button>
                                    </OverlayTrigger>

                                    {/* ----- Pagination number ----- */}
                                    <span className="font-weight-bold-600 mr-2">
                                        {index < 9
                                            ? `0${index + 1}`
                                            : index + 1}
                                    </span>
                                    <span>/</span>
                                    <span className="font-weight-bold-600 ml-2">
                                        {total < 9 ? `0${total}` : total}
                                    </span>

                                    {/* ----- Next button ----- */}
                                    <OverlayTrigger
                                        key="top3"
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip3">
                                                Next slide
                                            </Tooltip>
                                        }
                                    >
                                        <button
                                            className="btn btn-link btn-sm ml-2 shadow-none"
                                            onClick={() =>
                                                this.handleNext(data, index)
                                            }
                                            disabled={
                                                index + 1 < total ? false : true
                                            }
                                        >
                                            <i className="fas fa-chevron-right fa-sm"></i>
                                        </button>
                                    </OverlayTrigger>
                                    <OverlayTrigger
                                        key="top4"
                                        placement="top"
                                        overlay={
                                            <Tooltip id="tooltip4">
                                                Next page
                                            </Tooltip>
                                        }
                                    >
                                        <button
                                            className="btn btn-link btn-sm ml-2 shadow-none"
                                            onClick={this.handleNextPage}
                                            disabled={
                                                this.state.next !== null
                                                    ? false
                                                    : true
                                            }
                                        >
                                            <i className="fas fa-angle-double-right"></i>
                                        </button>
                                    </OverlayTrigger>
                                </div>
                                <div className="col-md-4 text-right">
                                    {data[index] !== undefined &&
                                    data[index].content !== undefined &&
                                    data[index].content.video !== undefined ? (
                                        data[index].content.video.path !==
                                        "" ? (
                                            <button
                                                className="btn btn-primary btn-sm rounded-circle shadow-none"
                                                onClick={() =>
                                                    this.toggleVideoModal(
                                                        data[index].content
                                                            .video
                                                    )
                                                }
                                            >
                                                <i
                                                    className="fas fa-play fa-sm"
                                                    style={{
                                                        marginLeft: "2px",
                                                    }}
                                                ></i>
                                            </button>
                                        ) : (
                                            ""
                                        )
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

export default FlashCard;
