import React, { Component } from "react";
import Header from "./shared/examNavbar";
import ReactCardFlip from "react-card-flip";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../sharedComponents/alert";
import Loading from "../sharedComponents/loader";
import {
    OverlayTrigger,
    Tooltip,
    Popover,
    Modal,
    Spinner,
    Alert,
} from "react-bootstrap";
import FullScreen from "react-fullscreen-crossbrowser";
import { Player } from "video-react";
import "video-react/dist/video-react.css";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import {
    Type1DataFormat,
    Type2DataFormat,
} from "../sharedComponents/dataFormating";
import CKeditor from "../sharedComponents/CKeditor";

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
                        <p className="mt-3 mb-0">
                            If video doesn't start playing,{" "}
                            <a
                                href={this.state.video.path}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Click here
                            </a>{" "}
                            to view the video in a seperate tab
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

class PersonalNotes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,

            personal_notes_id: this.props.data.personal_notes_id || "",
            title: this.props.data.personal_notes_title || "",
            content: this.props.data.personal_notes_content || "",
        };
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    onEditorChange = (evt) => {
        this.setState({
            content: evt.editor.getData(),
        });
    };

    handleTitle = (event) => {
        this.setState({
            title: event.target.value,
        });
    };

    handleSubmit = () => {
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
        if (this.state.title === "") {
            this.setState({
                errorMsg: "Enter notes title",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (this.state.content === "") {
            this.setState({
                errorMsg: "Enter notes content",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            let body = {
                topic_num: this.props.topic_num,
                personal_notes_title: this.state.title,
                personal_notes_content: this.state.content,
            };

            if (this.state.personal_notes_id === "") {
                this.handlePOST(body);
            } else {
                this.handlePUT(body);
            }
        }
    };

    handlePOST = (body) => {
        if (this.props.type === "concept") {
            body["concept_id"] = this.props.id;
        } else {
            body["question_id"] = this.props.id;
        }

        fetch(
            `${this.url}/student/subject/${this.props.subjectId}/chapter/${this.props.chapterId}/personalnotes/`,
            {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify(body),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                    this.props.formSubmission();
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handlePUT = (body) => {
        if (this.props.type === "concept") {
            body["concept"] = true;
            body["question"] = false;
        } else {
            body["concept"] = false;
            body["question"] = true;
        }
        body["personal_notes_id"] = this.state.personal_notes_id;
        fetch(
            `${this.url}/student/subject/${this.props.subjectId}/chapter/${this.props.chapterId}/personalnotes/`,
            {
                headers: this.headers,
                method: "PUT",
                body: JSON.stringify(body),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                    this.props.formSubmission();
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
            >
                <Modal.Header closeButton>Personal notes</Modal.Header>
                <Modal.Body>
                    <Alert
                        variant="danger"
                        show={this.state.showErrorAlert}
                        onClose={() => {
                            this.setState({
                                showErrorAlert: false,
                            });
                        }}
                        dismissible
                    >
                        {this.state.errorMsg}
                    </Alert>
                    <Alert
                        variant="success"
                        show={this.state.showSuccessAlert}
                        onClose={() => {
                            this.setState({
                                showSuccessAlert: false,
                            });
                        }}
                        dismissible
                    >
                        {this.state.successMsg}
                    </Alert>

                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={this.state.title}
                            className="form-control border-secondary"
                            placeholder="Add notes title"
                            onChange={this.handleTitle}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <CKeditor
                            data={this.state.content}
                            onChange={this.onEditorChange}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary btn-block shadow-none"
                        onClick={this.handleSubmit}
                    >
                        {this.state.showLoader ? (
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                                className="mr-2"
                            />
                        ) : (
                            ""
                        )}
                        Save
                    </button>
                </Modal.Footer>
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
            showNotesModal: false,
            subject_name: "",
            chapter_name: "",
            topic_name: "",
            concepts: [],
            practice: [],
            match: [],

            sections: [],
            explanation: [],
            match_terms: { id: [], type: [] },
            match_ids: [],
            match_temp: [],
            match_color: "match-active-bg",

            activeTab: "concept",
            activeData: 0,
            totalItems: "",
            totalSubQuestion: [],
            currentSubQuestionIndex: [],

            next: null,
            previous: null,
            type2_next: null,
            type2_previous: null,
            isFullscreenEnabled: false,
            isLightBoxOpen: false,

            selectedImageArray: [],
            imageStartIndex: 0,
            selectedVideoData: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
            isSlideshowPlaying: false,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicNum = this.props.match.params.topicNum;
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    // ---------- loads concepts data ----------

    loadConceptData = async (path) => {
        var apiURL =
            path === undefined || path === null
                ? `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/concepts/?topic_num=${this.topicNum}`
                : path;
        await fetch(apiURL, {
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
                                topic_num: response[i].topic_num,
                                concepts_random_id:
                                    response[i].concepts_random_id,
                                favourite: response[i].favourite,
                                personal_notes: response[i].personal_notes,
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
                            totalItems: response.length,
                            previous: result.data.previous,
                            next: result.data.next,
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            page_loading: false,
                            // activeTab: "practice",
                        });
                        // this.loadPracticeData();
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
                                    : "70vh"
                            }`,
                            maxHeight: "100vh",
                            overflowY: "auto",
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
                                __html: data[index].content.terms || "",
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
                            {this.state.isFullscreenEnabled ? (
                                <i className="fas fa-compress fa-lg"></i>
                            ) : (
                                <i className="fas fa-expand fa-lg"></i>
                            )}
                        </button>
                    </div>
                    <div
                        className="card card-body shadow-sm"
                        style={{
                            minHeight: `${
                                this.state.isFullscreenEnabled
                                    ? "100vh"
                                    : "70vh"
                            }`,
                            maxHeight: "100vh",
                            overflowY: "auto",
                        }}
                        onClick={() => {
                            this.setState({
                                isFlipped: !this.state.isFlipped,
                            });
                        }}
                    >
                        <div className="d-flex w-100">
                            {/* ---------- Content ---------- */}
                            <div className="w-100">
                                <div
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
                            {/* <!----- Image & Video viewer -----> */}
                            <div className="ml-3 mt-4">
                                {this.imageRender(data[index])}
                            </div>
                            {/* <!-- Image viewer ends here --> */}
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
                            {this.state.isFullscreenEnabled ? (
                                <i className="fas fa-compress fa-lg"></i>
                            ) : (
                                <i className="fas fa-expand fa-lg"></i>
                            )}
                        </button>
                    </div>
                </ReactCardFlip>
            </FullScreen>
        );
    };

    // ---------- loads practice data ----------

    loadPracticeData = async (type1_path, type2_path) => {
        var apiURL =
            type1_path === undefined || type1_path === null
                ? `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/typeone/learn/?topic_num=${this.topicNum}`
                : type1_path;
        await fetch(apiURL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    if (result.data.results.length !== 0) {
                        let data = Type1DataFormat(result);
                        this.setState(
                            {
                                practice: data.result,
                                previous: result.data.previous,
                                next: result.data.next,
                            },
                            () => {
                                this.loadType2Data(type2_path);
                            }
                        );
                    } else {
                        this.loadType2Data(type2_path);
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

    loadType2Data = async (path) => {
        var apiURL =
            path === undefined || path === null
                ? `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/typetwo/learn/?topic_num=${this.topicNum}`
                : path;
        await fetch(apiURL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let values = [...this.state.practice];
                    let data = Type2DataFormat(result);
                    let total = [];
                    let currentIndex = [];
                    values.forEach(() => {
                        total.push(0);
                        currentIndex.push(0);
                    });
                    data.total.forEach((data) => {
                        total.push(data);
                    });
                    data.current.forEach((data) => {
                        currentIndex.push(data);
                    });
                    data.result.forEach((section) => {
                        values.push(section);
                    });
                    this.setState(
                        {
                            practice: values,
                            totalSubQuestion: total,
                            currentSubQuestionIndex: currentIndex,
                            totalItems: values.length,
                            type2_previous: result.data.previous,
                            type2_next: result.data.next,
                            page_loading: false,
                        },
                        () => {
                            this.loopSectionStructure();
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
        window.MathJax.typeset();
    };

    // ---------- creates section structure and explanation structure ----------

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
                if (data.type === "type_1") {
                    // section
                    questions.push({
                        question_random_id: data.question_random_id,
                        answers: [],
                    });
                    // explanation
                    explanation.push({
                        isAnswered: false,
                        answer: false,
                        answers: [],
                        explanation: "",
                    });
                } else if (data.type === "type_2") {
                    let sub_question = [];
                    let sub_explanation = [];
                    data.sub_question.forEach((sub_data) => {
                        // section
                        sub_question.push({
                            sub_question_id: sub_data.sub_question_id,
                            answers: [],
                        });
                        // explanation
                        sub_explanation.push({
                            answer: false,
                            answers: [],
                        });
                    });
                    // section
                    questions.push({
                        question_random_id: data.question_random_id,
                        answers: sub_question,
                    });
                    // explanation
                    explanation.push({
                        explanation: "",
                        isAnswered: false,
                        sub_question: sub_explanation,
                    });
                }
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

    handleFillin = (event, index, type) => {
        let sections = [...this.state.sections];
        if (event.target.value !== "") {
            if (type === "type_1") {
                sections[index].answers[0] = event.target.value;
            } else if (type === "type_2") {
                sections[index].answers[
                    this.state.currentSubQuestionIndex[index]
                ].answers[0] = event.target.value;
            }
            this.setState({
                sections: sections,
            });
        } else {
            if (type === "type_1") {
                sections[index].answers = [];
            } else if (type === "type_2") {
                sections[index].answers[
                    this.state.currentSubQuestionIndex[index]
                ].answers = [];
            }
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

    practiceRender = (data, index, section, explanation) => {
        return data.lenght === 0 ? (
            <div
                className="card card-body shadow-sm align-items-center justify-content-center font-weight-bold-600"
                style={{
                    minHeight: "70vh",
                }}
            >
                No content to display
            </div>
        ) : (
            <div
                className="card card-body shadow-sm"
                style={{ minHeight: "70vh" }}
            >
                {data[index].type === "type_1" ? (
                    // --------------- Type 1 content ---------------
                    <div className="d-flex">
                        <div className="w-100">
                            <div className="d-flex mb-2">
                                <p className="font-weight-bold mr-2">
                                    {index <= 9
                                        ? `0${index + 1}.`
                                        : `${index + 1}.`}
                                </p>
                                <div
                                    className="font-weight-bold-600 w-100"
                                    dangerouslySetInnerHTML={{
                                        __html: data[index].question,
                                    }}
                                ></div>
                            </div>

                            {/* ---------- Explanation ---------- */}
                            {explanation.lenght !== 0 ? (
                                explanation.isAnswered === true ? (
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
                                                    __html:
                                                        explanation.explanation,
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
                                                    {explanation.answer ===
                                                    false
                                                        ? explanation.answers !==
                                                              undefined &&
                                                          explanation.answers
                                                              .lenght !== 0
                                                            ? explanation.answers.map(
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
                                                        : section.length !== 0
                                                        ? section.answers
                                                              .length !== 0
                                                            ? section.answers.map(
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
                                                        {section.length !== 0
                                                            ? section.answers
                                                                  .length !== 0
                                                                ? section.answers.map(
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
                                ) : (
                                    // ---------- MCQ Optins ----------
                                    <div className="row">
                                        <div className="col-md-6">
                                            {data[index].content.mcq ===
                                            true ? (
                                                data[index].content.options.map(
                                                    (option, option_index) => {
                                                        return (
                                                            <div
                                                                className="card shadow-sm mb-2 bg-light card-body small font-weight-bold-600 py-3"
                                                                key={
                                                                    option_index
                                                                }
                                                            >
                                                                <div className="custom-control custom-checkbox">
                                                                    <input
                                                                        type="checkbox"
                                                                        className="custom-control-input"
                                                                        id={`option_${option_index}`}
                                                                        value={
                                                                            option.content
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            this.handleMCQ(
                                                                                event,
                                                                                index
                                                                            )
                                                                        }
                                                                        checked={
                                                                            section.length !==
                                                                            0
                                                                                ? section
                                                                                      .answers
                                                                                      .length !==
                                                                                  0
                                                                                    ? section.answers.includes(
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
                                                                        {
                                                                            option.content
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : // ---------- True or False ----------
                                            data[index].content.boolean ===
                                              true ? (
                                                data[
                                                    index
                                                ].content.boolean_question.map(
                                                    (option, boolean_index) => {
                                                        return (
                                                            <div
                                                                className="card shadow-sm mb-2 bg-light card-body small font-weight-bold-600 py-3"
                                                                key={
                                                                    boolean_index
                                                                }
                                                            >
                                                                <div className="custom-control custom-radio">
                                                                    <input
                                                                        type="radio"
                                                                        id={`customRadio${index}-${boolean_index}`}
                                                                        name={`customRadio${index}`}
                                                                        className="custom-control-input"
                                                                        value={
                                                                            option.content
                                                                        }
                                                                        onChange={(
                                                                            event
                                                                        ) =>
                                                                            this.handleBoolean(
                                                                                event,
                                                                                index
                                                                            )
                                                                        }
                                                                        checked={
                                                                            section.length !==
                                                                            0
                                                                                ? section
                                                                                      .answers
                                                                                      .length !==
                                                                                  0
                                                                                    ? section.answers.includes(
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
                                                                        htmlFor={`customRadio${index}-${boolean_index}`}
                                                                    >
                                                                        {
                                                                            option.content
                                                                        }
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        );
                                                    }
                                                )
                                            ) : // ---------- Fill in answers ----------
                                            data[index].content.fill_in ===
                                              true ? (
                                                <input
                                                    type="text"
                                                    name="fill_in"
                                                    className="form-control borders"
                                                    placeholder="Type your answer here"
                                                    value={
                                                        section.length !== 0
                                                            ? section.answers
                                                                  .length !== 0
                                                                ? section
                                                                      .answers[0]
                                                                : ""
                                                            : ""
                                                    }
                                                    onChange={(event) =>
                                                        this.handleFillin(
                                                            event,
                                                            index,
                                                            "type_1"
                                                        )
                                                    }
                                                    autoComplete="off"
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                )
                            ) : (
                                ""
                            )}

                            {/* ----- Multiple choice notes ----- */}
                            {explanation.length !== 0 ? (
                                explanation.isAnswered === false ? (
                                    data[index].content.mcq_answers !==
                                    undefined ? (
                                        data[index].content.mcq_answers > 1 ? (
                                            <div className="small">
                                                <b>Note:</b>{" "}
                                                {
                                                    data[index].content
                                                        .mcq_answers
                                                }{" "}
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
                            {Object.entries(explanation).length !== 0 ? (
                                explanation.isAnswered === false ? (
                                    section.answers.length !== 0 ? (
                                        <div className="row mt-4">
                                            <div className="col-md-3">
                                                <button
                                                    className="btn btn-primary btn-block btn-sm shadow-none"
                                                    onClick={() => {
                                                        this.handleCheck(
                                                            section,
                                                            "type_1"
                                                        );
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
                                )
                            ) : (
                                ""
                            )}
                        </div>
                        {/* <!----- Image & Video viewer -----> */}
                        <div className="ml-3">
                            {this.imageRender(data[index])}
                        </div>
                        {/* <!-- Image viewer ends here --> */}
                    </div>
                ) : (
                    // --------------- Type 2 render function ---------------
                    this.typeTwoRender(data, index, section, explanation)
                )}
            </div>
        );
    };

    handleDragStart = (event, data, index) => {
        event.dataTransfer.setData("data", data);
        event.dataTransfer.setData("index", index);
        var node = document.getElementById(event.target.id);
        var crt = node.cloneNode(true);
        crt.id = event.target.id + "-copy";
        crt.classList.remove("light-bg");
        crt.classList.add("ghost-card");
        document.getElementById("root").appendChild(crt);
        event.dataTransfer.setDragImage(crt, 0, 0);
    };

    handleDragEnd = (event) => {
        var id = event.target.id + "-copy";
        var node = document.getElementById(id);
        node.parentNode.removeChild(node);
    };

    handleDrop = (event) => {
        const sections = [...this.state.sections];

        var areaNode = document.getElementById("drop-area");
        areaNode.classList.toggle("over");

        let data = event.dataTransfer.getData("data") || null;
        let index = event.dataTransfer.getData("index") || null;
        if (data !== null && index !== null) {
            sections[index].answers[
                this.state.currentSubQuestionIndex[index]
            ].answers[0] = data;
        }

        this.setState({
            sections: sections,
        });
    };

    handleDragEnter = (event) => {
        var node = document.getElementById("drop-area");
        node.classList.toggle("over");
    };

    handleDragLeave = (event) => {
        var node = document.getElementById("drop-area");
        node.classList.toggle("over");
    };

    typeTwoRender = (data, index, section, explanation) => {
        let isAnswerAvailable = false;
        let answerCount = 0;
        if (Object.entries(section).length !== 0) {
            if (section.answers.length !== 0) {
                section.answers.forEach((data) => {
                    if (data.answers.length !== 0) {
                        isAnswerAvailable = true;
                        answerCount++;
                    }
                });
            }
        }
        return (
            <div className="d-flex">
                <div className="w-100">
                    {/* ---------- Main Question ---------- */}
                    <div className="d-flex mb-2">
                        <p className="font-weight-bold mr-2">
                            {index <= 9 ? `0${index + 1}.` : `${index + 1}.`}
                        </p>
                        <div
                            className="w-100"
                            dangerouslySetInnerHTML={{
                                __html: data[index].question,
                            }}
                        ></div>
                    </div>
                    <div className="row mb-3">
                        {/* ---------- Drop area ---------- */}
                        <div className="col-md-6">
                            <div
                                id="drop-area"
                                className="position-relative p-3"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => this.handleDrop(e)}
                                onDragEnter={(e) => this.handleDragEnter(e)}
                                onDragLeave={(e) => this.handleDragLeave(e)}
                            >
                                {isAnswerAvailable === false ? (
                                    <div id="drop-here" draggable={false}>
                                        <i className="fas fa-arrows-alt mr-2"></i>{" "}
                                        Drop answer here...
                                    </div>
                                ) : (
                                    <>
                                        {section.answers.map((data, index) => {
                                            return data.answers.length !== 0 ? (
                                                <div
                                                    className={`card shadow-sm mb-2 ${
                                                        explanation.isAnswered ===
                                                        true
                                                            ? explanation
                                                                  .sub_question[
                                                                  index
                                                              ].answer === false
                                                                ? "danger-bg"
                                                                : "success-bg"
                                                            : "pinkrange-bg primary-text"
                                                    }`}
                                                    key={index}
                                                >
                                                    <div className="card-body small font-weight-bold-600 py-3">
                                                        {data.answers[0]}
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            );
                                        })}
                                        {/* ----- Check button ----- */}
                                        {answerCount ===
                                        this.state.totalSubQuestion[index] ? (
                                            explanation.isAnswered === false ? (
                                                <div className="row mt-3">
                                                    <div className="col-md-4">
                                                        <button
                                                            className="btn btn-primary btn-block btn-sm shadow-none"
                                                            onClick={() => {
                                                                this.handleCheck(
                                                                    section,
                                                                    "type_2"
                                                                );
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
                                    </>
                                )}
                            </div>
                        </div>
                        {/* ---------- Sub question ---------- */}
                        <div className="col-md-6">
                            {/* ----- Explanation ----- */}
                            {Object.entries(explanation).lenght !== 0 ? (
                                explanation.isAnswered === true ? (
                                    <div
                                        className="card card-body bg-light"
                                        style={{
                                            minHeight: "250px",
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
                                ) : (
                                    /* ---------- Sub Question ---------- */
                                    <div className="d-flex align-items-start justify-content">
                                        <button className="btn secondary-bg btn-sm shadow-sm mr-1 mt-1 px-3 font-weight-bold-600 rounded-lg">
                                            {this.state.currentSubQuestionIndex[
                                                index
                                            ] + 1}
                                        </button>

                                        <div className="card w-100">
                                            <div className="card secondary-bg py-2 px-3 mb-2">
                                                <div
                                                    dangerouslySetInnerHTML={{
                                                        __html:
                                                            data[index]
                                                                .sub_question[
                                                                this.state
                                                                    .currentSubQuestionIndex[
                                                                    index
                                                                ]
                                                            ].question,
                                                    }}
                                                ></div>
                                            </div>
                                            {/* Multiple choice question */}
                                            {data[index].sub_question[
                                                this.state
                                                    .currentSubQuestionIndex[
                                                    index
                                                ]
                                            ].mcq
                                                ? data[index].sub_question[
                                                      this.state
                                                          .currentSubQuestionIndex[
                                                          index
                                                      ]
                                                  ].options.map(
                                                      (
                                                          options,
                                                          option_index
                                                      ) => {
                                                          return (
                                                              <div
                                                                  className="card shadow-sm mb-2 light-bg"
                                                                  key={
                                                                      option_index
                                                                  }
                                                                  id={`option-${option_index}`}
                                                                  style={{
                                                                      cursor:
                                                                          "move",
                                                                  }}
                                                                  onDragStart={(
                                                                      e
                                                                  ) =>
                                                                      this.handleDragStart(
                                                                          e,
                                                                          options.content,
                                                                          index
                                                                      )
                                                                  }
                                                                  onDragEnd={(
                                                                      e
                                                                  ) =>
                                                                      this.handleDragEnd(
                                                                          e
                                                                      )
                                                                  }
                                                                  draggable
                                                              >
                                                                  <div className="card-body small font-weight-bold-600 primary-text py-3">
                                                                      {
                                                                          options.content
                                                                      }
                                                                  </div>
                                                              </div>
                                                          );
                                                      }
                                                  )
                                                : ""}
                                            {/* Fill in the blanks */}
                                            {data[index].sub_question[
                                                this.state
                                                    .currentSubQuestionIndex[
                                                    index
                                                ]
                                            ].fill_in ? (
                                                <input
                                                    type="text"
                                                    name="fill_in"
                                                    className="form-control borders"
                                                    placeholder="Type your answer here"
                                                    value={
                                                        section.length !== 0
                                                            ? section.answers
                                                                  .length !== 0
                                                                ? section
                                                                      .answers[
                                                                      this.state
                                                                          .currentSubQuestionIndex[
                                                                          index
                                                                      ]
                                                                  ]
                                                                      .answers[0] ||
                                                                  ""
                                                                : ""
                                                            : ""
                                                    }
                                                    onChange={(event) =>
                                                        this.handleFillin(
                                                            event,
                                                            index,
                                                            "type_2"
                                                        )
                                                    }
                                                    autoComplete="off"
                                                />
                                            ) : (
                                                ""
                                            )}
                                            <div className="d-flex align-items-center justify-content-center mt-3">
                                                <button
                                                    className="btn btn-sm primary-text shadow-none"
                                                    onClick={() =>
                                                        this.handleSubQPrev(
                                                            index
                                                        )
                                                    }
                                                    disabled={
                                                        this.state
                                                            .currentSubQuestionIndex[
                                                            index
                                                        ] === 0
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <i className="fas fa-arrow-circle-left fa-lg"></i>
                                                </button>
                                                <div className="border-primary small font-weight-bold-600 rounded-lg px-3 py-1 mx-3">
                                                    {this.state
                                                        .currentSubQuestionIndex[
                                                        index
                                                    ] + 1}{" "}
                                                    /{" "}
                                                    {
                                                        this.state
                                                            .totalSubQuestion[
                                                            index
                                                        ]
                                                    }
                                                </div>
                                                <button
                                                    className="btn btn-sm primary-text shadow-none"
                                                    onClick={() =>
                                                        this.handleSubQNext(
                                                            index
                                                        )
                                                    }
                                                    disabled={
                                                        this.state
                                                            .currentSubQuestionIndex[
                                                            index
                                                        ] +
                                                            1 <
                                                        this.state
                                                            .totalSubQuestion[
                                                            index
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
                                )
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
                {/* <!----- Image & Video viewer -----> */}
                <div className="ml-3">{this.imageRender(data[index])}</div>
                {/* <!-- Image viewer ends here --> */}
            </div>
        );
    };

    // ---------- Post the options answers ----------

    handleCheck = async (data, type) => {
        this.setState({
            page_loading: true,
        });

        let explanation = [...this.state.explanation];

        if (type === "type_1") {
            await fetch(
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
                        explanation[this.state.activeData].isAnswered = true;
                        this.setState({
                            page_loading: false,
                            explanation: explanation,
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
        } else if (type === "type_2") {
            await fetch(
                `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/typetwo/learn/`,
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
                        explanation[this.state.activeData].explanation =
                            result.data.explanation;
                        explanation[this.state.activeData].isAnswered = true;
                        for (
                            let i = 0;
                            i < result.data.sub_question.length;
                            i++
                        ) {
                            explanation[this.state.activeData].sub_question[
                                i
                            ].answer = result.data.sub_question[i].answer;
                            explanation[this.state.activeData].sub_question[
                                i
                            ].answers =
                                result.data.sub_question[i].data.answers;
                        }
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
        }
        window.MathJax.typeset();
    };

    // ---------- loads match data ----------

    // seperate terms and definition from the single object
    divideMatch = (array, allow) => {
        let data = array[this.state.activeData];
        let tempData = [];
        let index = 0;
        let ids = [];
        if (array.length !== 0) {
            while (index < 2) {
                if (index === 0) {
                    for (let i = 0; i < data.length; i++) {
                        tempData.push({
                            match_id: data[i].match_id,
                            match_terms: data[i].match_terms,
                        });
                        ids.push(data[i].match_id);
                    }
                } else if (index === 1) {
                    for (let i = 0; i < data.length; i++) {
                        tempData.push({
                            match_id: data[i].match_id,
                            match_definition: data[i].match_definition,
                        });
                    }
                }
                index++;
            }
            if (allow === undefined) {
                this.setState({
                    match_ids: ids,
                });
            }
        }
        return this.shuffleMatch(tempData);
    };

    shuffleMatch = (array) => {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    chunk = (array, size) => {
        const chunked_arr = [];
        if (array.length !== 0) {
            let copied = [...array];
            const numOfChild = Math.ceil(copied.length / size);
            for (let i = 0; i < numOfChild; i++) {
                chunked_arr.push(copied.splice(0, size));
            }
        }
        return chunked_arr;
    };

    loadMatchData = async (path) => {
        var apiURL =
            path === undefined || path === null
                ? `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/match/?topic_num=${this.topicNum}`
                : path;
        await fetch(apiURL, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let response = result.data.results;
                    let data = [];
                    // combines both terms and definition as a single object
                    if (
                        response.match_terms.length !== 0 &&
                        response.match_definition.length !== 0
                    ) {
                        for (let i = 0; i < response.match_terms.length; i++) {
                            for (
                                let j = 0;
                                j < response.match_definition.length;
                                j++
                            ) {
                                if (
                                    response.match_terms[i].match_id ===
                                    response.match_definition[j].match_id
                                ) {
                                    data.push({
                                        match_id:
                                            response.match_terms[i].match_id,
                                        match_terms:
                                            response.match_terms[i].match_terms,
                                        match_definition:
                                            response.match_definition[j]
                                                .match_definition,
                                    });
                                }
                            }
                        }
                    }

                    this.setState(
                        {
                            // chunk the array and shuffling it
                            match: this.chunk(this.shuffleMatch(data), 6),
                            activeData: 0,
                            totalItems: result.data.count,
                            previous: result.data.previous,
                            next: result.data.next,
                            page_loading: false,
                        },
                        () => {
                            // prepare first set of data in shuffle
                            this.setState({
                                match_temp: this.chunk(
                                    this.divideMatch(this.state.match),
                                    3
                                ),
                            });
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
        window.MathJax.typeset();
    };

    // handle match terms and definition matching
    handleMatch = async (id, type) => {
        let terms = this.state.match_terms;
        let ids = [...this.state.match_ids];
        let color = "match-active-bg";
        if (terms.id.length < 2) {
            // if clicked on same card
            if (terms.id.includes(id) && terms.type.includes(type)) {
                terms.id = [];
                terms.type = [];
            } else {
                terms.id.push(id);
                terms.type.push(type);
                if (terms.id.length === 2) {
                    // if terms and definition matches
                    if (terms.id[0] === terms.id[1]) {
                        ids.splice(ids.indexOf(terms.id[0]), 1);
                        terms.id = [];
                        terms.type = [];
                    } else {
                        color = "danger-bg";
                        setTimeout(async () => {
                            terms.id = [];
                            terms.type = [];
                            await this.setState({
                                match_terms: terms,
                                match_temp: this.chunk(
                                    this.divideMatch(this.state.match, "false"),
                                    3
                                ),
                            });
                            window.MathJax.typeset();
                        }, 1000);
                    }
                }
            }
        } else {
            terms.id = [];
            terms.type = [];
            terms.id.push(id);
            terms.type.push(type);
        }
        await this.setState(
            {
                match_ids: ids,
                match_terms: terms,
                match_color: color,
            },
            async () => {
                // loads next set of data
                if (ids.length === 0) {
                    if (
                        this.state.match[this.state.activeData + 1] !==
                        undefined
                    ) {
                        await this.setState(
                            {
                                activeData: this.state.activeData + 1,
                            },
                            async () => {
                                await this.setState({
                                    match_temp: this.chunk(
                                        this.divideMatch(this.state.match),
                                        3
                                    ),
                                });
                                window.MathJax.typeset();
                            }
                        );
                        window.MathJax.typeset();
                    }
                }
            }
        );
        window.MathJax.typeset();
    };

    matchType = (data) => {
        let type = data.match_terms !== undefined ? "terms" : "definition";
        return type;
    };

    matchRender = () => {
        let ids = [...this.state.match_ids];
        let terms = this.state.match_terms;
        return this.state.match_temp.length === 0 ? (
            <div
                className="card card-body shadow-sm align-items-center justify-content-center font-weight-bold-600"
                style={{
                    minHeight: "70vh",
                }}
            >
                No content to display
            </div>
        ) : ids.length === 0 &&
          this.state.match[this.state.activeData + 1] === undefined ? (
            <div
                className="card card-body shadow-sm align-items-center justify-content-center"
                style={{
                    minHeight: "70vh",
                }}
            >
                <h3 className="primary-text mb-4">Congratulations!</h3>
                <p className="mb-4">You just completed all the Match</p>
                <button
                    className="btn btn-primary btn-sm shadow-none"
                    onClick={() => {
                        this.setState(
                            {
                                page_loading: true,
                            },
                            () => {
                                this.loadMatchData();
                            }
                        );
                    }}
                >
                    <i className="fas fa-redo fa-sm mr-2"></i> Retry
                </button>
            </div>
        ) : (
            <div className="row">
                {this.state.match_temp.map((data, index) => {
                    return (
                        <div className="col-lg-3 col-md-4 col-6" key={index}>
                            {data.map((item, index) => {
                                return (
                                    <div
                                        className={`card card-body shadow-sm mb-3 ${
                                            terms.id.includes(item.match_id) &&
                                            terms.type[
                                                terms.id.indexOf(item.match_id)
                                            ] === this.matchType(item)
                                                ? this.state.match_color
                                                : "match-bg"
                                        } ${
                                            ids.includes(item.match_id)
                                                ? "visible"
                                                : "invisible"
                                        }`}
                                        key={index}
                                        style={{ cursor: "default" }}
                                        onClick={() =>
                                            this.handleMatch(
                                                item.match_id,
                                                this.matchType(item)
                                            )
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                item.match_terms !== undefined
                                                    ? item.match_terms
                                                    : item.match_definition,
                                        }}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        );
    };

    // ---------- loads subject information ----------

    loopTopicStructure = (array) => {
        var topic_name = "";
        array.forEach((a) => {
            if (this.topicNum === a.topic_num) {
                topic_name = a.topic_name;
            } else if (Array.isArray(a.child)) {
                topic_name = this.loopTopicStructure(a.child);
            }
        });
        return topic_name;
    };

    componentDidMount = () => {
        this.loadConceptData();

        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let chapter_name = "";
                    let topic_name = "";
                    // extract currently selected chapter name
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        if (
                            result.data.chapters[i].chapter_id ===
                            this.chapterId
                        ) {
                            chapter_name = result.data.chapters[i].chapter_name;
                            // Extracting topics from the chapter_structure
                            for (
                                let j = 0;
                                j < result.data.chapters[i].topics.length;
                                j++
                            ) {
                                topic_name = this.loopTopicStructure(
                                    result.data.chapters[i].topics[j]
                                        .chapter_structure
                                );
                            }
                        } else {
                            continue;
                        }
                    }
                    this.setState({
                        subject_name: result.data.subject_name,
                        chapter_name: chapter_name,
                        topic_name: topic_name,
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

        document.addEventListener("keydown", this.handleKeys);
    };

    componentWillUnmount = () => {
        document.removeEventListener("keydown", this.handleKeys);
    };

    // ---------- Navigation ----------

    handleKeys = (event) => {
        let keyCode = event.key;
        if (keyCode === "ArrowLeft") {
            if (this.state.activeData !== 0) this.handlePrev();
        } else if (keyCode === "ArrowRight") {
            if (this.state.activeData + 1 < this.state.totalItems)
                this.handleNext();
        }
    };

    handleNextPage = () => {
        this.setState(
            {
                isFlipped: false,
                page_loading: true,
            },
            () => {
                if (this.state.activeTab === "concept") {
                    this.loadConceptData(this.state.next);
                } else if (this.state.activeTab === "practice") {
                    this.loadPracticeData(
                        this.state.next,
                        this.state.type2_next
                    );
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
            },
            () => {
                if (this.state.activeTab === "concept") {
                    this.loadConceptData(this.state.previous);
                } else if (this.state.activeTab === "practice") {
                    this.loadPracticeData(
                        this.state.previous,
                        this.state.type2_previous
                    );
                } else if (this.state.activeTab === "match") {
                    this.loadMatchData(this.state.previous);
                }
            }
        );
    };

    handleNext = async () => {
        await this.setState({
            activeData: this.state.activeData + 1,
            isFlipped: false,
        });
        window.MathJax.typeset();
    };

    handlePrev = async () => {
        await this.setState({
            activeData: this.state.activeData - 1,
            isFlipped: false,
        });
        window.MathJax.typeset();
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

    // ---------- Tab selection ----------

    toggleTab = (type) => {
        this.setState({
            activeTab: type,
            activeData: 0,
            page_loading: true,
            type2_next: null,
            type2_previous: null,
        });
        if (type === "concept") {
            this.loadConceptData();
        } else if (type === "practice") {
            this.loadPracticeData();
        } else if (type === "match") {
            this.loadMatchData();
        }
    };

    // ---------- Image & Video ----------

    changeImage = (images, index) => {
        let imageArr = [];
        this.setState({
            selectedImageArray: [],
            imageStartIndex: 0,
        });
        for (let i = 0; i < images.length; i++) {
            imageArr.push({
                url: images[i].path,
                title: images[i].title,
            });
        }
        this.setState({
            selectedImageArray: imageArr,
            imageStartIndex: index,
            isLightBoxOpen: true,
        });
    };

    imageRender = (data) => {
        return (
            <>
                {data.content.images[0].path !== ""
                    ? data.content.images.map((images, index) => {
                          return images.path !== "" ? (
                              <div
                                  key={index}
                                  className="card preview-img-circle shadow-sm"
                                  style={{
                                      backgroundImage: `url(${images.path})`,
                                  }}
                                  onClick={(e) => {
                                      this.changeImage(
                                          data.content.images,
                                          index
                                      );
                                      e.stopPropagation();
                                  }}
                              ></div>
                          ) : (
                              ""
                          );
                      })
                    : ""}
                {data !== undefined &&
                data.content !== undefined &&
                data.content.video !== undefined ? (
                    data.content.video.path !== "" ? (
                        <OverlayTrigger
                            key="top5"
                            placement="top"
                            overlay={<Tooltip id="tooltip4">Video</Tooltip>}
                        >
                            <button
                                className="btn btn-primary-invert btn-sm shadow-sm rounded-circle shadow-none mt-1"
                                onClick={(e) => {
                                    this.toggleVideoModal(data.content.video);
                                    e.stopPropagation();
                                }}
                            >
                                <i
                                    className="fas fa-video fa-sm"
                                    style={{
                                        marginLeft: "4px",
                                        marginRight: "1px",
                                        marginBottom: "7px",
                                        marginTop: "7px",
                                    }}
                                ></i>
                            </button>
                        </OverlayTrigger>
                    ) : (
                        ""
                    )
                ) : (
                    ""
                )}
            </>
        );
    };

    toggleVideoModal = (data) => {
        this.setState({
            showVideoModal: !this.state.showVideoModal,
            selectedVideoData: data,
        });
    };

    // ---------- Bookmark | Favourites ----------

    handleBookmark = (data, index) => {
        let body = {
            topic_num: this.topicNum.toString(),
        };
        if (data[index] !== undefined) {
            if (this.state.activeTab === "concept") {
                body["concept_id"] = data[index].concepts_random_id;
            } else {
                body["question_id"] = data[index].question_random_id;
            }
            this.setState({
                showSuccessAlert: false,
                showErrorAlert: false,
            });

            fetch(
                `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/favourites/`,
                {
                    method: "POST",
                    headers: this.headers,
                    body: JSON.stringify(body),
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showSuccessAlert: true,
                        });
                        if (this.state.activeTab === "concept") {
                            data[index].favourite = !data[index].favourite;
                            this.setState({
                                concepts: data,
                            });
                        } else {
                            data[index].favourite = !data[index].favourite;
                            this.setState({
                                practice: data,
                            });
                        }
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .then((err) => console.log(err));
        }
    };

    // if (this.state.isSlideshowPlaying === false) {
    //     this.setState({
    //         isSlideshowPlaying: true,
    //     });
    //     setInterval(() => {
    //         if (this.state.isSlideshowPlaying) {
    //             this.setState({
    //                 activeData:
    //                     this.state.activeData + 1 ===
    //                     this.state.totalItems
    //                         ? 0
    //                         : this.state.activeData + 1,
    //                 isFlipped: false,
    //             });
    //             // if (
    //             //     this.state.activeData + 1 ===
    //             //     this.state.totalItems
    //             // ) {
    //             //     this.setState({
    //             //         isSlideshowPlaying: false,
    //             //     });
    //             // }
    //         }
    //     }, 3000);
    // } else {
    //     this.setState({
    //         isSlideshowPlaying: false,
    //     });
    // }

    handleSlideShow = () => {
        if (this.state.activeTab === "concept") {
            var slideInterval = setInterval(nextSlide.bind(this), 2000);

            function nextSlide() {
                this.setState({
                    activeData:
                        this.state.activeData + 1 === this.state.totalItems
                            ? 0
                            : this.state.activeData + 1,
                    isFlipped: false,
                });
            }

            function pauseSlideshow() {
                this.setState({
                    isSlideshowPlaying: false,
                });
                clearInterval(slideInterval);
            }

            function playSlideshow() {
                this.setState({
                    isSlideshowPlaying: true,
                });
                slideInterval = setInterval(nextSlide.bind(this), 2000);
            }

            if (this.state.isSlideshowPlaying) {
                pauseSlideshow.bind(this);
            } else {
                playSlideshow.bind(this);
            }
        }
    };

    // nextSlide = async () => {
    //     if (this.state.isSlideshowPlaying) {
    //         await this.setState({
    //             activeData:
    //                 this.state.activeData + 1 === this.state.totalItems
    //                     ? 0
    //                     : this.state.activeData + 1,
    //             isFlipped: false,
    //         });
    //     }
    //     window.MathJax.typeset();
    // };

    // pauseSlideshow = async (slideInterval) => {
    //     await this.setState({
    //         isSlideshowPlaying: false,
    //     });
    //     clearInterval(slideInterval);
    //     window.MathJax.typeset();
    // };

    // playSlideshow = async (slideInterval) => {
    //     await this.setState({
    //         isSlideshowPlaying: true,
    //     });
    //     slideInterval = setInterval(this.nextSlide, 3000);
    //     window.MathJax.typeset();
    // };

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showNotesModal: false,
                activeData: this.state.activeData,
            });
        }, 1000);
        if (this.state.activeTab === "concept") {
            this.loadConceptData();
        } else {
            this.loadPracticeData();
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
        const section =
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
                {/* ----- Navbar ----- */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={`${this.state.chapter_name} - ${this.state.topic_name}`}
                    goBack={this.props.history.goBack}
                />

                {/* ----- Alert message ----- */}
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

                {/* ----- Video modal ----- */}
                {this.state.showVideoModal ? (
                    <VideoModal
                        show={this.state.showVideoModal}
                        onHide={this.toggleVideoModal}
                        video={this.state.selectedVideoData}
                    />
                ) : (
                    ""
                )}

                {/* ----- Image lightbox ----- */}
                {this.state.isLightBoxOpen ? (
                    <Lightbox
                        images={this.state.selectedImageArray}
                        startIndex={this.state.imageStartIndex}
                        onClose={() => {
                            this.setState({
                                isLightBoxOpen: false,
                            });
                        }}
                    />
                ) : (
                    ""
                )}

                {/* ----- Personal notes modal ----- */}
                {this.state.showNotesModal ? (
                    <PersonalNotes
                        show={this.state.showNotesModal}
                        onHide={() =>
                            this.setState({
                                showNotesModal: false,
                            })
                        }
                        type={this.state.activeTab}
                        subjectId={this.subjectId}
                        chapterId={this.chapterId}
                        topic_num={this.topicNum}
                        id={
                            this.state.activeTab === "concept"
                                ? data[index].concepts_random_id
                                : data[index].question_random_id
                        }
                        data={data[index].personal_notes}
                        formSubmission={this.formSubmission}
                    />
                ) : (
                    ""
                )}

                {/* ---------- Header tab section ---------- */}

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
                                    {this.state.activeTab !== "match" ? (
                                        <OverlayTrigger
                                            key="top6"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip1">
                                                    {data[index] !== undefined
                                                        ? data[index]
                                                              .favourite !==
                                                          undefined
                                                            ? data[index]
                                                                  .favourite ===
                                                              true
                                                                ? "Bookmarked"
                                                                : `Bookmark this ${
                                                                      this.state
                                                                          .activeTab ===
                                                                      "concept"
                                                                          ? "concept"
                                                                          : "question"
                                                                  }`
                                                            : "Bookmark"
                                                        : "Bookmark"}
                                                </Tooltip>
                                            }
                                        >
                                            <button
                                                className="btn btn-primary btn-sm rounded-circle mr-3 shadow-none"
                                                onClick={() =>
                                                    this.handleBookmark(
                                                        data,
                                                        index
                                                    )
                                                }
                                            >
                                                <i
                                                    className={`${
                                                        data[index]
                                                            ? data[index]
                                                                  .favourite ===
                                                              true
                                                                ? "fas secondary-text"
                                                                : "far"
                                                            : "far"
                                                    } fa-bookmark fa-sm`}
                                                    style={{
                                                        marginLeft: "1px",
                                                        marginRight: "1px",
                                                    }}
                                                ></i>
                                            </button>
                                        </OverlayTrigger>
                                    ) : (
                                        ""
                                    )}
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

                {/* ---------- Main content ---------- */}

                <div className="container-fluid mb-3">
                    <div className="row justify-content-center">
                        <div className="col-md-11">
                            {this.state.activeTab === "concept" ? (
                                data[index] !== undefined &&
                                data[index].content !== undefined ? (
                                    this.conceptRender(data, index)
                                ) : (
                                    <div
                                        className="card card-body shadow-sm align-items-center justify-content-center font-weight-bold-600"
                                        style={{
                                            minHeight: "70vh",
                                        }}
                                    >
                                        No content to display
                                    </div>
                                )
                            ) : this.state.activeTab === "practice" ? (
                                data[index] !== undefined &&
                                data[index].content !== undefined ? (
                                    this.practiceRender(
                                        data,
                                        index,
                                        section,
                                        explanation
                                    )
                                ) : (
                                    <div
                                        className="card card-body shadow-sm align-items-center justify-content-center font-weight-bold-600"
                                        style={{
                                            minHeight: "70vh",
                                        }}
                                    >
                                        No content to display
                                    </div>
                                )
                            ) : this.state.activeTab === "match" ? (
                                this.matchRender()
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>

                {/* ---------- Footer ---------- */}

                {this.state.activeTab !== "match" ? (
                    <div className="secondary-bg p-3">
                        <div className="row align-items-center justify-content-center">
                            <div className="col-md-11">
                                <div className="row align-items-center">
                                    {/* ---------- keyboard & Notes button ---------- */}
                                    <div className="col-md-4">
                                        <OverlayTrigger
                                            key="top6"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip1">
                                                    Virtual keyboard
                                                </Tooltip>
                                            }
                                        >
                                            <button className="btn btn-primary btn-sm rounded-circle shadow-none mr-3">
                                                <i
                                                    className="fas fa-keyboard fa-sm"
                                                    style={{
                                                        marginBottom: "4px",
                                                    }}
                                                ></i>
                                            </button>
                                        </OverlayTrigger>
                                        <OverlayTrigger
                                            key="top7"
                                            placement="top"
                                            overlay={
                                                <Tooltip id="tooltip1">
                                                    Personal notes
                                                </Tooltip>
                                            }
                                        >
                                            <div className="d-inline">
                                                <button
                                                    className="btn btn-primary btn-sm rounded-circle shadow-none"
                                                    onClick={() =>
                                                        data[index]
                                                            ? this.setState({
                                                                  showNotesModal: !this
                                                                      .state
                                                                      .showNotesModal,
                                                              })
                                                            : ""
                                                    }
                                                >
                                                    <i
                                                        className="fas fa-pencil-ruler fa-sm"
                                                        style={{
                                                            marginBottom: "5px",
                                                            marginLeft: "1px",
                                                        }}
                                                    ></i>
                                                </button>
                                                {data[index] ? (
                                                    Object.entries(
                                                        data[index]
                                                            .personal_notes
                                                    ).length !== 0 ? (
                                                        <span
                                                            className="position-absolute text-danger"
                                                            style={{
                                                                marginTop:
                                                                    "-6px",
                                                                marginLeft:
                                                                    "-5px",
                                                                fontSize: "8px",
                                                            }}
                                                        >
                                                            <i className="fas fa-circle fa-sm"></i>
                                                        </span>
                                                    ) : (
                                                        ""
                                                    )
                                                ) : (
                                                    ""
                                                )}
                                            </div>
                                        </OverlayTrigger>
                                    </div>

                                    {/* ---------- Pagination ---------- */}

                                    <div className="col-md-4 d-flex align-items-center justify-content-center small">
                                        {/* ----- Previous page button ----- */}

                                        {this.state.previous === null &&
                                        this.state.type2_previous === null ? (
                                            <button
                                                className="btn btn-link btn-sm mr-2 shadow-none"
                                                onClick={this.handlePrevPage}
                                                disabled={
                                                    this.state.previous ===
                                                        null &&
                                                    this.state
                                                        .type2_previous === null
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <i className="fas fa-angle-double-left fa-lg"></i>
                                            </button>
                                        ) : (
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
                                                    onClick={
                                                        this.handlePrevPage
                                                    }
                                                    disabled={
                                                        this.state.previous ===
                                                            null &&
                                                        this.state
                                                            .type2_previous ===
                                                            null
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <i className="fas fa-angle-double-left fa-lg"></i>
                                                </button>
                                            </OverlayTrigger>
                                        )}

                                        {/* ----- Previous slide button ----- */}

                                        {index === 0 ? (
                                            <button
                                                className="btn btn-link btn-sm mr-2 shadow-none"
                                                onClick={() =>
                                                    this.handlePrev(data, index)
                                                }
                                                disabled={
                                                    index === 0 ? true : false
                                                }
                                            >
                                                <i className="fas fa-chevron-left"></i>
                                            </button>
                                        ) : (
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
                                                        this.handlePrev(
                                                            data,
                                                            index
                                                        )
                                                    }
                                                    disabled={
                                                        index === 0
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <i className="fas fa-chevron-left"></i>
                                                </button>
                                            </OverlayTrigger>
                                        )}

                                        {/* ----- Pagination number ----- */}

                                        <div
                                            className="d-inline border-primary primary-text font-weight-bold-600 rounded-lg"
                                            style={{
                                                padding: "5px 10px",
                                            }}
                                        >
                                            <span className="mr-1">
                                                {total !== 0
                                                    ? index <= 9
                                                        ? `0${index + 1}`
                                                        : index + 1
                                                    : 0}
                                            </span>
                                            <span>/</span>
                                            <span className="ml-1">
                                                {total <= 9
                                                    ? `0${total}`
                                                    : total}
                                            </span>
                                        </div>

                                        {/* ----- Next slide button ----- */}

                                        {index + 1 < total ? (
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
                                                        this.handleNext(
                                                            data,
                                                            index
                                                        )
                                                    }
                                                    disabled={
                                                        index + 1 < total
                                                            ? false
                                                            : true
                                                    }
                                                >
                                                    <i className="fas fa-chevron-right"></i>
                                                </button>
                                            </OverlayTrigger>
                                        ) : (
                                            <button
                                                className="btn btn-link btn-sm ml-2 shadow-none"
                                                onClick={() =>
                                                    this.handleNext(data, index)
                                                }
                                                disabled={
                                                    index + 1 < total
                                                        ? false
                                                        : true
                                                }
                                            >
                                                <i className="fas fa-chevron-right"></i>
                                            </button>
                                        )}

                                        {/* ----- Next page button ----- */}

                                        {this.state.next === null &&
                                        this.state.type2_next === null ? (
                                            <button
                                                className="btn btn-link btn-sm ml-2 shadow-none"
                                                onClick={this.handleNextPage}
                                                disabled={
                                                    this.state.next === null &&
                                                    this.state.type2_next ===
                                                        null
                                                        ? true
                                                        : false
                                                }
                                            >
                                                <i className="fas fa-angle-double-right fa-lg"></i>
                                            </button>
                                        ) : (
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
                                                    onClick={
                                                        this.handleNextPage
                                                    }
                                                    disabled={
                                                        this.state.next ===
                                                            null &&
                                                        this.state
                                                            .type2_next === null
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <i className="fas fa-angle-double-right fa-lg"></i>
                                                </button>
                                            </OverlayTrigger>
                                        )}
                                    </div>

                                    {/* ---------- Video button ---------- */}

                                    {this.state.activeTab === "concept" ? (
                                        <div className="col-md-4 text-right">
                                            <OverlayTrigger
                                                key="top5"
                                                placement="top"
                                                overlay={
                                                    <Tooltip id="tooltip4">
                                                        {this.state
                                                            .isSlideshowPlaying
                                                            ? "Pause"
                                                            : "Play"}{" "}
                                                        slideshow
                                                    </Tooltip>
                                                }
                                            >
                                                <button
                                                    className="btn btn-primary btn-sm rounded-circle shadow-none"
                                                    onClick={
                                                        this.handleSlideShow
                                                    }
                                                >
                                                    <i
                                                        className={`fas ${
                                                            this.state
                                                                .isSlideshowPlaying
                                                                ? "fa-pause"
                                                                : "fa-play"
                                                        } fa-sm`}
                                                        style={{
                                                            marginLeft: "3px",
                                                            marginRight: "1px",
                                                            marginBottom: "5px",
                                                        }}
                                                    ></i>
                                                </button>
                                            </OverlayTrigger>
                                        </div>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

export default FlashCard;
