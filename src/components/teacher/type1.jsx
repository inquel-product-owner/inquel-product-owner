import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import CKeditor from "../sharedComponents/CKeditor";
import ReactSwitch from "../sharedComponents/switchComponent";
import {
    Accordion,
    Card,
    Alert,
    Spinner,
    Modal,
    Tab,
    Nav,
    OverlayTrigger,
    Tooltip,
} from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import AlertModal from "../sharedComponents/alertModal";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
    topic_name: state.topic_name,
});

class MCQDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    handleDelete = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        fetch(
            `${this.url}/teacher/subject/${this.props.subjectId}/chapter/mcq/`,
            {
                method: "DELETE",
                headers: this.headers,
                body: JSON.stringify({
                    chapter_id: this.props.chapter_id,
                    topic_name: this.props.topic_name,
                    question_random_id: this.props.values,
                }),
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
                    this.props.formSubmission(true);
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                        });
                    }
                    this.setState({
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
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Delete MCQ</Modal.Header>
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
                    <p className="mb-0">
                        Are you sure that you want to delete this question?
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-secondary btn-sm mr-2"
                        onClick={this.props.toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={this.handleDelete}
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
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class FileModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            video: this.props.video,
            audio: this.props.audio,
            selectedImage: 0,
            selectedImageData: [],
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    changeImage = (image_index) => {
        const images = [...this.state.image];
        this.setState({
            selectedImage: image_index,
            selectedImageData: images[image_index],
        });
    };

    componentDidMount = () => {
        const images = [...this.state.image];
        if (images[0].path !== null) {
            this.setState({
                selectedImageData: images[0],
            });
        }
    };

    render() {
        let audio = "";
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                backdrop="static"
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Uploaded Files</Modal.Header>
                <Modal.Body className="py-0">
                    <Tab.Container
                        id="left-tabs-example"
                        defaultActiveKey="image"
                    >
                        <div className="row">
                            <div
                                className="col-md-3 py-3 mb-3 mb-md-0"
                                style={{ borderRight: "1px solid #ccc" }}
                            >
                                <Nav variant="pills" className="flex-column">
                                    <Nav.Item className="primary-nav-item">
                                        <Nav.Link eventKey="image">
                                            Image
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="primary-nav-item">
                                        <Nav.Link eventKey="video">
                                            Video
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item className="primary-nav-item">
                                        <Nav.Link eventKey="audio">
                                            Audio
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </div>
                            <div className="col-md-9 py-3">
                                <Tab.Content>
                                    <Tab.Pane eventKey="image">
                                        {this.state.selectedImageData.path !==
                                        "" ? (
                                            <div className="card shadow-sm">
                                                <div className="card-header text-center font-weight-bold tomato-bg">
                                                    {this.state
                                                        .selectedImageData
                                                        .length !== 0
                                                        ? this.state
                                                              .selectedImageData
                                                              .title
                                                        : ""}
                                                </div>
                                                {/* Single image view */}
                                                <div className="card-body text-center p-0">
                                                    {this.state
                                                        .selectedImageData
                                                        .length !== 0 ? (
                                                        <img
                                                            src={
                                                                this.state
                                                                    .selectedImageData
                                                                    .path
                                                            }
                                                            alt={
                                                                this.state
                                                                    .selectedImageData
                                                                    .file_name
                                                            }
                                                            className="img-fluid"
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
                                                </div>
                                                {/* Thumbnails */}
                                                <div className="card-footer tomato-bg">
                                                    <div className="row justify-content-center">
                                                        {this.state.image.map(
                                                            (images, index) => {
                                                                return images.path !==
                                                                    "" ? (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="col-md-3"
                                                                    >
                                                                        <div
                                                                            className={`card preview-img-sm ${
                                                                                this
                                                                                    .state
                                                                                    .selectedImage ===
                                                                                index
                                                                                    ? "border-primary shadow"
                                                                                    : ""
                                                                            }`}
                                                                            style={{
                                                                                backgroundImage: `url(${images.path})`,
                                                                            }}
                                                                            onClick={() =>
                                                                                this.changeImage(
                                                                                    index
                                                                                )
                                                                            }
                                                                        ></div>
                                                                    </div>
                                                                ) : null;
                                                            }
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            "No images to display"
                                        )}
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="video">
                                        <div className="card">
                                            {this.state.video.path !== "" ? (
                                                <Player>
                                                    <source
                                                        src={
                                                            this.state.video
                                                                .path
                                                        }
                                                    />
                                                </Player>
                                            ) : (
                                                "Video not uploaded"
                                            )}
                                        </div>
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="audio">
                                        {this.state.audio.map((item, index) => {
                                            audio =
                                                item.path !== ""
                                                    ? item.path
                                                    : "";
                                            return item.path !== "" ? (
                                                <audio
                                                    key={index}
                                                    src={item.path}
                                                    controls
                                                ></audio>
                                            ) : (
                                                ""
                                            );
                                        })}
                                        {audio === ""
                                            ? "Audio not uploaded"
                                            : ""}
                                    </Tab.Pane>
                                </Tab.Content>
                            </div>
                        </div>
                    </Tab.Container>
                </Modal.Body>
            </Modal>
        );
    }
}

class SubjectType1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            showAlertModal: false,

            alertMsg: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,

            showPublishErrorAlert: false,
            showPublishSuccessAlert: false,
            showPublishLoader: false,

            showImageErrorAlert: false,
            showVideoErrorAlert: false,
            showAudioErrorAlert: false,
            showImageSuccessAlert: false,
            showVideoSuccessAlert: false,
            showAudioSuccessAlert: false,

            page_loading: true,
            btnDisabled: false,
            showMCQDelete_Modal: false,

            contentCollapsed: true,
            propertiesCollapsed: true,
            settingsCollapsed: true,
            showEdit_option: false,
            showVirtual_keyboard: true,
            themeData: [],
            complexityData: [],
            isForm_submitted: false,

            activeQuestion: "",
            selectedImage: "",
            selectedVideo: "",
            selectedAudio: "",
            selectedQuestion: "",

            keyboards: [
                { all: false, chemistry: false, physics: false, maths: false },
            ],

            questions: [
                {
                    chapter_id: this.props.match.params.chapterId,
                    topic_name: this.props.match.params.topicName,
                    question: "<p>Question goes here</p>",
                    question_random_id: "",
                    is_image_uploaded: false,
                    content: {
                        mcq: true,
                        fill_in: false,
                        boolean: false,
                        fillin_answer: [""],
                        boolean_question: [
                            { correct: false, content: "True" },
                            { correct: false, content: "False" },
                        ],
                        options: [
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                        ],
                        explanation: "",
                        images: [
                            { title: "", file_name: "", image: null, path: "" },
                        ],
                        video: {
                            title: "",
                            file_name: "",
                            video: null,
                            path: "",
                            url: "",
                        },
                        audio: [
                            { title: "", file_name: "", audio: null, path: "" },
                        ],
                    },
                    properties: {
                        marks: "",
                        complexity: "",
                        priority: "",
                        theme: "",
                        test: [false, false, false, false, false],
                        semester: [false, false, false, false, false],
                        quiz: [false, false, false, false, false],
                        learn: false,
                    },
                    settings: {
                        virtual_keyboard: [],
                        limited: false,
                    },
                },
            ],
        };
        this.option_limit = 6;
        this.image_limit = 4;
        this.audio_limit = 2;
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicName = this.props.match.params.topicName;
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

    toggleModal = (image, video, audio) => {
        this.setState({
            showModal: !this.state.showModal,
            selectedImage: image,
            selectedVideo: video,
            selectedAudio: audio,
        });
    };

    // -------------------------- Form submission --------------------------

    loadMCQData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/?chapter_id=${this.chapterId}&topic_name=${this.topicName}`,
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
                    let keyboards = [];
                    let images = [];
                    let audio = [];
                    let response = result.data.results[0].mcq;
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

                            data.push({
                                chapter_id: this.props.match.params.chapterId,
                                topic_name: this.props.match.params.topicName,
                                question: response[i].question,
                                question_random_id:
                                    response[i].question_random_id,
                                is_image_uploaded:
                                    response[i].files.length !== 0
                                        ? true
                                        : false,
                                content: {
                                    mcq: response[i].mcq,
                                    fill_in: response[i].fill_in,
                                    boolean: response[i].boolean,
                                    fillin_answer:
                                        response[i].fillin_answer.length !== 0
                                            ? response[i].fillin_answer
                                            : [""],
                                    boolean_question:
                                        response[i].boolean_question.length !==
                                        0
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

                            // Keyboards
                            let boards = {
                                all: false,
                                chemistry: false,
                                physics: false,
                                maths: false,
                            };
                            let virtual_keyboard =
                                response[i].settings.virtual_keyboard;
                            for (let j = 0; j < virtual_keyboard.length; j++) {
                                if (virtual_keyboard[j] === "All") {
                                    boards.all = true;
                                    boards.chemistry = true;
                                    boards.maths = true;
                                    boards.physics = true;
                                } else if (
                                    virtual_keyboard[j] === "Chemistry"
                                ) {
                                    boards.chemistry = true;
                                } else if (virtual_keyboard[j] === "Physics") {
                                    boards.physics = true;
                                } else if (virtual_keyboard[j] === "Maths") {
                                    boards.maths = true;
                                }
                            }
                            keyboards.push(boards);
                        }
                        this.setState({
                            questions: data,
                            keyboards: keyboards,
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            page_loading: false,
                        });
                    }
                } else {
                    this.setState({
                        alertMsg: result.detail ? result.detail : result.msg,
                        showAlertModal: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = `${this.props.topic_name} MCQ - Teacher | IQLabs`;

        fetch(`${this.url}/teacher/status/data/?theme=1&complexity=1`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    themeData: result.data.theme,
                    complexityData: result.data.complexity,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });

        this.loadMCQData();
    };

    handleSubmit = () => {
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        const data = [...this.state.questions];
        let option_correct = data[this.state.activeQuestion].content.mcq
            ? false
            : true;
        let option_content = data[this.state.activeQuestion].content.mcq
            ? false
            : true;
        let fill_in = data[this.state.activeQuestion].content.fill_in
            ? false
            : true;
        let boolean_correct = data[this.state.activeQuestion].content.boolean
            ? false
            : true;

        // Options validation
        if (data[this.state.activeQuestion].content.mcq === true) {
            for (
                let i = 0;
                i < data[this.state.activeQuestion].content.options.length;
                i++
            ) {
                if (
                    data[this.state.activeQuestion].content.options[i]
                        .correct === true
                ) {
                    option_correct = true;
                } else {
                    continue;
                }
            }
            for (
                let i = 0;
                i < data[this.state.activeQuestion].content.options.length;
                i++
            ) {
                if (
                    data[this.state.activeQuestion].content.options[i]
                        .content !== ""
                ) {
                    option_content = true;
                } else {
                    option_content = false;
                }
            }
        }

        // fill in validation
        if (data[this.state.activeQuestion].content.fill_in === true) {
            for (
                let i = 0;
                i <
                data[this.state.activeQuestion].content.fillin_answer.length;
                i++
            ) {
                if (
                    data[this.state.activeQuestion].content.fillin_answer[i] !==
                    ""
                ) {
                    fill_in = true;
                } else {
                    fill_in = false;
                }
            }
        }

        // Boolean validation
        if (data[this.state.activeQuestion].content.boolean === true) {
            for (
                let i = 0;
                i <
                data[this.state.activeQuestion].content.boolean_question.length;
                i++
            ) {
                if (
                    data[this.state.activeQuestion].content.boolean_question[i]
                        .correct === true
                ) {
                    boolean_correct = true;
                } else {
                    continue;
                }
            }
        }

        if (data[this.state.activeQuestion].question === "") {
            this.setState({
                errorMsg: "Question is required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (
            data[this.state.activeQuestion].content.mcq === false &&
            data[this.state.activeQuestion].content.fill_in === false &&
            data[this.state.activeQuestion].content.boolean === false
        ) {
            this.setState({
                errorMsg: "Select any one answer type",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (option_content === false) {
            this.setState({
                errorMsg: "Enter the options value",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (option_correct === false) {
            this.setState({
                errorMsg: "Select a correct option in the MCQ",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (fill_in === false) {
            this.setState({
                errorMsg: "Enter the fill in answers",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (boolean_correct === false) {
            this.setState({
                errorMsg: "Select either True or False",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (data[this.state.activeQuestion].properties.marks === "") {
            this.setState({
                errorMsg: "Marks is required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (
            data[this.state.activeQuestion].properties.complexity === ""
        ) {
            this.setState({
                errorMsg: "Complexity is required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (data[this.state.activeQuestion].properties.priority === "") {
            this.setState({
                errorMsg: "Priority is required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (data[this.state.activeQuestion].properties.theme === "") {
            this.setState({
                errorMsg: "Theme is reuired",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            if (data[this.state.activeQuestion].question_random_id === "") {
                this.handlePOST(data);
            } else {
                this.handlePUT(data);
            }
        }
    };

    handlePOST = (data) => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                chapter_id: this.props.match.params.chapterId,
                topic_name: this.props.match.params.topicName,
                question: data[this.state.activeQuestion].question,
                content: {
                    mcq: data[this.state.activeQuestion].content.mcq,
                    fill_in: data[this.state.activeQuestion].content.fill_in,
                    boolean: data[this.state.activeQuestion].content.boolean,
                    fillin_answer:
                        data[this.state.activeQuestion].content.fillin_answer,
                    boolean_question:
                        data[this.state.activeQuestion].content
                            .boolean_question,
                    options: data[this.state.activeQuestion].content.options,
                    explanation:
                        data[this.state.activeQuestion].content.explanation,
                },
                properties: {
                    marks: data[this.state.activeQuestion].properties.marks,
                    complexity:
                        data[this.state.activeQuestion].properties.complexity,
                    priority:
                        data[this.state.activeQuestion].properties.priority,
                    theme: data[this.state.activeQuestion].properties.theme,
                    test: data[this.state.activeQuestion].properties.test,
                    semester:
                        data[this.state.activeQuestion].properties.semester,
                    quiz: data[this.state.activeQuestion].properties.quiz,
                    learn: data[this.state.activeQuestion].properties.learn,
                },
                settings: {
                    virtual_keyboard:
                        data[this.state.activeQuestion].settings
                            .virtual_keyboard,
                    limited: data[this.state.activeQuestion].settings.limited,
                },
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    data[this.state.activeQuestion].question_random_id =
                        result.question_random_id;
                    this.setState({
                        questions: data,
                        isForm_submitted: true,
                    });
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handlePUT = (data) => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/`, {
            headers: this.headers,
            method: "PUT",
            body: JSON.stringify({
                chapter_id: this.props.match.params.chapterId,
                topic_name: this.props.match.params.topicName,
                question: data[this.state.activeQuestion].question,
                question_random_id:
                    data[this.state.activeQuestion].question_random_id,
                content: {
                    mcq: data[this.state.activeQuestion].content.mcq,
                    fill_in: data[this.state.activeQuestion].content.fill_in,
                    boolean: data[this.state.activeQuestion].content.boolean,
                    fillin_answer:
                        data[this.state.activeQuestion].content.fillin_answer,
                    boolean_question:
                        data[this.state.activeQuestion].content
                            .boolean_question,
                    options: data[this.state.activeQuestion].content.options,
                    explanation:
                        data[this.state.activeQuestion].content.explanation,
                },
                properties: {
                    marks: data[this.state.activeQuestion].properties.marks,
                    complexity:
                        data[this.state.activeQuestion].properties.complexity,
                    priority:
                        data[this.state.activeQuestion].properties.priority,
                    theme: data[this.state.activeQuestion].properties.theme,
                    test: data[this.state.activeQuestion].properties.test,
                    semester:
                        data[this.state.activeQuestion].properties.semester,
                    quiz: data[this.state.activeQuestion].properties.quiz,
                    learn: data[this.state.activeQuestion].properties.learn,
                },
                settings: {
                    virtual_keyboard:
                        data[this.state.activeQuestion].settings
                            .virtual_keyboard,
                    limited: data[this.state.activeQuestion].settings.limited,
                },
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    data[this.state.activeQuestion].question_random_id =
                        result.question_random_id;
                    this.setState({
                        questions: data,
                        isForm_submitted: true,
                    });
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Run the image API once the question is added
    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.isForm_submitted !== this.state.isForm_submitted &&
            this.state.isForm_submitted === true
        ) {
            this.setState({
                showLoader: true,
                showErrorAlert: false,
                showSuccessAlert: false,
                isForm_submitted: false,
            });

            const questionData = [...this.state.questions];

            let form_data = new FormData();

            form_data.append("chapter_id", this.chapterId);
            form_data.append("topic_name", this.topicName);
            form_data.append(
                "question_random_id",
                questionData[this.state.activeQuestion].question_random_id
            );

            // Video
            if (
                questionData[this.state.activeQuestion].content.video.url !== ""
            ) {
                form_data.append(
                    "video_url",
                    questionData[this.state.activeQuestion].content.video.url
                );
            }

            if (
                questionData[this.state.activeQuestion].content.video.video !==
                null
            ) {
                form_data.append(
                    "type1_video_1_title",
                    questionData[this.state.activeQuestion].content.video.title
                );
                form_data.append(
                    "type1_video_1",
                    questionData[this.state.activeQuestion].content.video.video
                );
            }

            // Image
            for (
                let i = 0;
                i <
                questionData[this.state.activeQuestion].content.images.length;
                i++
            ) {
                if (
                    questionData[this.state.activeQuestion].content.images[i]
                        .image !== null
                ) {
                    form_data.append(
                        `type1_image_${i + 1}_title`,
                        questionData[this.state.activeQuestion].content.images[
                            i
                        ].title
                    );
                    form_data.append(
                        `type1_image_${i + 1}`,
                        questionData[this.state.activeQuestion].content.images[
                            i
                        ].image
                    );
                } else {
                    continue;
                }
            }

            // Audio
            for (
                let i = 0;
                i <
                questionData[this.state.activeQuestion].content.audio.length;
                i++
            ) {
                if (
                    questionData[this.state.activeQuestion].content.audio[i]
                        .audio !== null
                ) {
                    form_data.append(
                        `type1_audio_${i + 1}_title`,
                        questionData[this.state.activeQuestion].content.audio[i]
                            .title
                    );
                    form_data.append(
                        `type1_audio_${i + 1}`,
                        questionData[this.state.activeQuestion].content.audio[i]
                            .audio
                    );
                } else {
                    continue;
                }
            }

            const options = {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                    Authorization: this.authToken,
                },
            };

            let files_arr = [];
            for (var p of form_data) {
                files_arr.push(p);
            }

            if (files_arr.length !== 3) {
                if (
                    questionData[this.state.activeQuestion]
                        .is_image_uploaded === false
                ) {
                    this.handleImgPOST(options, form_data, questionData);
                } else {
                    this.handleImgPATCH(options, form_data, questionData);
                }
            } else {
                this.setState(
                    {
                        questions: questionData,
                        successMsg: "Question added",
                        showSuccessAlert: true,
                        showLoader: false,
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({
                                showEdit_option: false,
                                contentCollapsed: true,
                                propertiesCollapsed: true,
                                settingsCollapsed: true,
                                page_loading: true,
                            });
                            this.loadMCQData();
                        }, 2000);
                    }
                );
            }
        }
    };

    handleImgPOST = (options, form_data, questionData) => {
        axios
            .post(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/files/`,
                form_data,
                options
            )
            .then((result) => {
                console.log(result);
                if (result.data.sts === true) {
                    this.setState(
                        {
                            questions: questionData,
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        },
                        () => {
                            setTimeout(() => {
                                this.setState({
                                    showEdit_option: false,
                                    contentCollapsed: true,
                                    propertiesCollapsed: true,
                                    settingsCollapsed: true,
                                    page_loading: true,
                                });
                                this.loadMCQData();
                            }, 2000);
                        }
                    );
                } else {
                    if (result.data.detail) {
                        this.setState({
                            errorMsg: result.data.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.data.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleImgPATCH = (options, form_data, questionData) => {
        axios
            .patch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/files/`,
                form_data,
                options
            )
            .then((result) => {
                console.log(result);
                if (result.data.sts === true) {
                    this.setState(
                        {
                            questions: questionData,
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        },
                        () => {
                            setTimeout(() => {
                                this.setState({
                                    showEdit_option: false,
                                    contentCollapsed: true,
                                    propertiesCollapsed: true,
                                    settingsCollapsed: true,
                                    page_loading: true,
                                });
                                this.loadMCQData();
                            }, 2000);
                        }
                    );
                } else {
                    if (result.data.detail) {
                        this.setState({
                            errorMsg: result.data.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.data.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // -------------------------- Question & Explanation --------------------------

    onEditorChange = (evt) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].question = evt.editor.getData();
        this.setState({
            questions: values,
        });
    };

    handleExplanation = (evt) => {
        const values = [...this.state.questions];
        values[
            this.state.activeQuestion
        ].content.explanation = evt.editor.getData();
        this.setState({
            questions: values,
        });
    };

    // -------------------------- Options --------------------------

    handleOptions_mcq = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.mcq = !values[
            this.state.activeQuestion
        ].content.mcq;
        values[this.state.activeQuestion].content.fill_in = false;
        values[this.state.activeQuestion].content.boolean = false;
        this.setState({
            questions: values,
        });
    };

    handleOptions_fillin = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.fill_in = !values[
            this.state.activeQuestion
        ].content.fill_in;
        values[this.state.activeQuestion].content.mcq = false;
        values[this.state.activeQuestion].content.boolean = false;
        this.setState({
            questions: values,
        });
    };

    handleOptions_boolean = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.boolean = !values[
            this.state.activeQuestion
        ].content.boolean;
        values[this.state.activeQuestion].content.mcq = false;
        values[this.state.activeQuestion].content.fill_in = false;
        this.setState({
            questions: values,
        });
    };

    handleBoolean = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.boolean = !values[
            this.state.activeQuestion
        ].content.boolean;
        this.setState({
            questions: values,
        });
    };

    correctOption = (index) => {
        const values = [...this.state.questions];
        if (
            values[this.state.activeQuestion].content.options[index].content !==
            ""
        ) {
            values[this.state.activeQuestion].content.options[
                index
            ].correct = !values[this.state.activeQuestion].content.options[
                index
            ].correct;
            this.setState({
                questions: values,
            });
        }
    };

    correctBoolean = (index) => {
        const values = [...this.state.questions];
        values[
            this.state.activeQuestion
        ].content.boolean_question[0].correct = false;
        values[
            this.state.activeQuestion
        ].content.boolean_question[1].correct = false;
        values[this.state.activeQuestion].content.boolean_question[
            index
        ].correct = !values[this.state.activeQuestion].content.boolean_question[
            index
        ].correct;
        this.setState({
            questions: values,
        });
    };

    handleOptionChange = (index, event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.options[index].content =
            event.target.value;
        this.setState({
            questions: values,
        });
    };

    handleAddOptionFields = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.options.push({
            correct: false,
            content: "",
        });
        this.setState({
            questions: values,
        });
    };

    handleRemoveOptionFields = (index) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.options.splice(index, 1);
        this.setState(
            {
                questions: values,
            },
            () => {
                if (
                    values[this.state.activeQuestion].content.options.length ===
                    0
                ) {
                    values[this.state.activeQuestion].content.options.push({
                        correct: false,
                        content: "",
                    });
                }
                this.setState({
                    questions: values,
                });
            }
        );
    };

    handleAnswerChange = (index, event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.fillin_answer[index] =
            event.target.value;
        this.setState({
            questions: values,
        });
    };

    handleAddAnswerFields = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.fillin_answer.push("");
        this.setState({
            questions: values,
        });
    };

    handleRemoveAnswerFields = (index) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.fillin_answer.splice(
            index,
            1
        );
        this.setState(
            {
                questions: values,
            },
            () => {
                if (
                    values[this.state.activeQuestion].content.fillin_answer
                        .length === 0
                ) {
                    values[
                        this.state.activeQuestion
                    ].content.fillin_answer.push("");
                }
                this.setState({
                    questions: values,
                });
            }
        );
    };

    // -------------------------- Image --------------------------

    handleImageTitle = (index, event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.images[index].title =
            event.target.value;
        this.setState({
            questions: values,
        });
    };

    handleAddImageFields = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.images.push({
            title: "",
            file_name: "",
            image: null,
            path: "",
        });
        this.setState({
            questions: values,
        });
    };

    handleRemoveImageFields = (index) => {
        const values = [...this.state.questions];

        this.setState({
            showImageSuccessAlert: false,
            showImageErrorAlert: false,
        });

        if (
            values[this.state.activeQuestion].question_random_id !== "" &&
            values[this.state.activeQuestion].is_image_uploaded === true
        ) {
            let body = {
                chapter_id: this.chapterId,
                topic_name: this.topicName,
                question_random_id:
                    values[this.state.activeQuestion].question_random_id,
            };
            body[`type1_image_${index + 1}_title`] =
                values[this.state.activeQuestion].content.images[index].title;

            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/files/`,
                {
                    method: "DELETE",
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
                            showImageSuccessAlert: true,
                        });
                        values[this.state.activeQuestion].content.images.splice(
                            index,
                            1
                        );
                        this.setState(
                            {
                                questions: values,
                            },
                            () => {
                                if (
                                    values[this.state.activeQuestion].content
                                        .images.length === 0
                                ) {
                                    values[
                                        this.state.activeQuestion
                                    ].content.images.push({
                                        title: "",
                                        file_name: "",
                                        image: null,
                                        path: "",
                                    });
                                }
                                this.setState({
                                    questions: values,
                                });
                            }
                        );
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showImageErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            values[this.state.activeQuestion].content.images.splice(index, 1);
            this.setState(
                {
                    questions: values,
                },
                () => {
                    if (
                        values[this.state.activeQuestion].content.images
                            .length === 0
                    ) {
                        values[this.state.activeQuestion].content.images.push({
                            title: "",
                            file_name: "",
                            image: null,
                            path: "",
                        });
                    }
                    this.setState({
                        questions: values,
                    });
                }
            );
        }
    };

    handleImageFile = (index, event) => {
        this.setState({
            showImageErrorAlert: false,
        });

        const values = [...this.state.questions];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(jpg|jpeg|png|webp)$/)) {
            this.setState({
                errorMsg: "Please select valid image file",
                showImageErrorAlert: true,
                btnDisabled: true,
            });
        } else {
            values[this.state.activeQuestion].content.images[index].file_name =
                event.target.files[0].name;
            values[this.state.activeQuestion].content.images[
                index
            ].path = URL.createObjectURL(event.target.files[0]);
            values[this.state.activeQuestion].content.images[index].image =
                event.target.files[0];
            this.setState({
                questions: values,
                btnDisabled: false,
                showImageErrorAlert: false,
            });
        }
    };

    clearImages = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.images = [
            {
                title: "",
                file_name: "",
                image: null,
                path: "",
            },
        ];
        this.setState({
            questions: values,
        });
    };

    // -------------------------- Video --------------------------

    handleVideoTitle = (event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.video.title =
            event.target.value;
        this.setState({
            questions: values,
        });
    };

    handleVideoFile = (event) => {
        this.setState({
            showVideoErrorAlert: false,
        });

        let values = [...this.state.questions];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(mpeg|flv|avi|mov|mp4|mkv)$/)) {
            this.setState({
                errorMsg: "Please select valid video file",
                showVideoErrorAlert: true,
                btnDisabled: true,
            });
        } else {
            values[this.state.activeQuestion].content.video.file_name =
                event.target.files[0].name;
            values[
                this.state.activeQuestion
            ].content.video.path = URL.createObjectURL(event.target.files[0]);
            values[this.state.activeQuestion].content.video.video =
                event.target.files[0];
            values[this.state.activeQuestion].content.video.url = "";
            this.setState({
                questions: values,
                btnDisabled: false,
                showVideoErrorAlert: false,
            });
        }
    };

    handleVideoUrl = (event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.video.url =
            event.target.value;
        values[this.state.activeQuestion].content.video.file_name = "";
        values[this.state.activeQuestion].content.video.video = null;
        values[this.state.activeQuestion].content.video.path = "";
        this.setState({
            questions: values,
        });
    };

    clearVideo = () => {
        const values = [...this.state.questions];

        if (
            values[this.state.activeQuestion].question_random_id !== "" &&
            values[this.state.activeQuestion].is_image_uploaded === true
        ) {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/files/`,
                {
                    method: "DELETE",
                    headers: this.headers,
                    body: JSON.stringify({
                        chapter_id: this.chapterId,
                        topic_name: this.topicName,
                        question_random_id:
                            values[this.state.activeQuestion]
                                .question_random_id,
                        type1_video_1_title:
                            values[this.state.activeQuestion].content.video
                                .title,
                    }),
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showVideoSuccessAlert: true,
                        });
                        values[this.state.activeQuestion].content.video.title =
                            "";
                        values[
                            this.state.activeQuestion
                        ].content.video.file_name = "";
                        values[
                            this.state.activeQuestion
                        ].content.video.video = null;
                        values[this.state.activeQuestion].content.video.path =
                            "";
                        values[this.state.activeQuestion].content.video.url =
                            "";
                        this.setState({
                            questions: values,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showVideoErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            values[this.state.activeQuestion].content.video.title = "";
            values[this.state.activeQuestion].content.video.file_name = "";
            values[this.state.activeQuestion].content.video.video = null;
            values[this.state.activeQuestion].content.video.path = "";
            values[this.state.activeQuestion].content.video.url = "";
            this.setState({
                questions: values,
            });
        }
    };

    // -------------------------- Audio --------------------------

    handleAudioTitle = (index, event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.audio[index].title =
            event.target.value;
        this.setState({
            questions: values,
        });
    };

    handleAddAudioFields = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.audio.push({
            title: "",
            file_name: "",
            audio: null,
            path: "",
        });
        this.setState({
            questions: values,
        });
    };

    handleRemoveAudioFields = (index) => {
        const values = [...this.state.questions];

        this.setState({
            showAudioSuccessAlert: false,
            showAudioErrorAlert: false,
        });

        if (
            values[this.state.activeQuestion].question_random_id !== "" &&
            values[this.state.activeQuestion].is_image_uploaded === true
        ) {
            let body = {
                chapter_id: this.chapterId,
                topic_name: this.topicName,
                question_random_id:
                    values[this.state.activeQuestion].question_random_id,
            };
            body[`type1_audio_${index + 1}_title`] =
                values[this.state.activeQuestion].content.audio[index].title;

            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/files/`,
                {
                    method: "DELETE",
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
                            showAudioSuccessAlert: true,
                        });
                        values[this.state.activeQuestion].content.audio.splice(
                            index,
                            1
                        );
                        this.setState(
                            {
                                questions: values,
                            },
                            () => {
                                if (
                                    values[this.state.activeQuestion].content
                                        .audio.length === 0
                                ) {
                                    values[
                                        this.state.activeQuestion
                                    ].content.audio.push({
                                        title: "",
                                        file_name: "",
                                        audio: null,
                                        path: "",
                                    });
                                }
                                this.setState({
                                    questions: values,
                                });
                            }
                        );
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showAudioErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            values[this.state.activeQuestion].content.audio.splice(index, 1);
            this.setState(
                {
                    questions: values,
                },
                () => {
                    if (
                        values[this.state.activeQuestion].content.audio
                            .length === 0
                    ) {
                        values[this.state.activeQuestion].content.audio.push({
                            title: "",
                            file_name: "",
                            audio: null,
                            path: "",
                        });
                    }
                    this.setState({
                        questions: values,
                    });
                }
            );
        }
    };

    handleAudioFile = (index, event) => {
        this.setState({
            showAudioErrorAlert: false,
        });

        const values = [...this.state.questions];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(wav|mp3)$/)) {
            this.setState({
                errorMsg: "Please select valid audio file",
                showAudioErrorAlert: true,
                btnDisabled: true,
            });
        } else {
            values[this.state.activeQuestion].content.audio[index].file_name =
                event.target.files[0].name;
            values[this.state.activeQuestion].content.audio[
                index
            ].path = URL.createObjectURL(event.target.files[0]);
            values[this.state.activeQuestion].content.audio[index].audio =
                event.target.files[0];
            this.setState({
                questions: values,
                btnDisabled: false,
                showAudioErrorAlert: false,
            });
        }
    };

    clearAudios = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.audio = [
            { title: "", file_name: "", audio: null, path: "" },
        ];
        this.setState({
            questions: values,
        });
    };

    // -------------------------- Properties --------------------------

    handleProperties = (event, type) => {
        const values = [...this.state.questions];
        if (type === "marks") {
            values[this.state.activeQuestion].properties.marks =
                event.target.value;
        } else if (type === "complexity") {
            values[this.state.activeQuestion].properties.complexity =
                event.target.value;
        } else if (type === "priority") {
            values[this.state.activeQuestion].properties.priority =
                event.target.value;
        } else {
            values[this.state.activeQuestion].properties.theme =
                event.target.value;
        }
        this.setState({
            questions: values,
        });
    };

    handleAttemptSequence = (index, type) => {
        const values = [...this.state.questions];
        if (type === "test") {
            values[this.state.activeQuestion].properties.test[index] = !values[
                this.state.activeQuestion
            ].properties.test[index];
        } else if (type === "semester") {
            values[this.state.activeQuestion].properties.semester[
                index
            ] = !values[this.state.activeQuestion].properties.semester[index];
        } else {
            values[this.state.activeQuestion].properties.quiz[index] = !values[
                this.state.activeQuestion
            ].properties.quiz[index];
        }
        this.setState({
            questions: values,
        });
    };

    handleLearn = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].properties.learn = !values[
            this.state.activeQuestion
        ].properties.learn;
        this.setState({
            questions: values,
        });
    };

    // -------------------------- Settings --------------------------

    handleVirtualKeyboard = () => {
        this.setState({
            showVirtual_keyboard: !this.state.showVirtual_keyboard,
        });
    };

    handleLimited = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].settings.limited = !values[
            this.state.activeQuestion
        ].settings.limited;
        this.setState({
            questions: values,
        });
    };

    handleKeyboardOptions = (event, type) => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];
        if (event.target.checked) {
            values[this.state.activeQuestion].settings.virtual_keyboard.push(
                type
            );
            this.setState({
                questions: values,
            });
        } else {
            values[this.state.activeQuestion].settings.virtual_keyboard.splice(
                values[
                    this.state.activeQuestion
                ].settings.virtual_keyboard.indexOf(type),
                1
            );
            this.setState({
                questions: values,
            });
        }
        if (type === "Chemistry") {
            keyboards[this.state.activeQuestion].chemistry = !keyboards[
                this.state.activeQuestion
            ].chemistry;
            this.setState({
                keyboards: keyboards,
            });
        } else if (type === "Physics") {
            keyboards[this.state.activeQuestion].physics = !keyboards[
                this.state.activeQuestion
            ].physics;
            this.setState({
                keyboards: keyboards,
            });
        } else {
            keyboards[this.state.activeQuestion].maths = !keyboards[
                this.state.activeQuestion
            ].maths;
            this.setState({
                keyboards: keyboards,
            });
        }
    };

    handleSelectAll = (event, type) => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];
        if (event.target.checked) {
            values[this.state.activeQuestion].settings.virtual_keyboard = [];
            values[this.state.activeQuestion].settings.virtual_keyboard.push(
                type
            );
            keyboards[this.state.activeQuestion].all = true;
            keyboards[this.state.activeQuestion].physics = true;
            keyboards[this.state.activeQuestion].chemistry = true;
            keyboards[this.state.activeQuestion].maths = true;
            this.setState({
                questions: values,
                keyboards: keyboards,
            });
        } else {
            values[this.state.activeQuestion].settings.virtual_keyboard = [];
            keyboards[this.state.activeQuestion].all = false;
            keyboards[this.state.activeQuestion].physics = false;
            keyboards[this.state.activeQuestion].chemistry = false;
            keyboards[this.state.activeQuestion].maths = false;
            this.setState({
                questions: values,
                keyboards: keyboards,
            });
        }
    };

    // -------------------------- Collapse --------------------------

    toggleCollapse = (component) => {
        this.setState({
            contentCollapsed: true,
            propertiesCollapsed: true,
            settingsCollapsed: true,
        });
        if (component === "content") {
            this.setState({
                contentCollapsed: !this.state.contentCollapsed,
            });
        } else if (component === "properties") {
            this.setState({
                propertiesCollapsed: !this.state.propertiesCollapsed,
            });
        } else {
            this.setState({
                settingsCollapsed: !this.state.settingsCollapsed,
            });
        }
    };

    // -------------------------- Adding, Removing, Deleting question --------------------------

    addNewQuestion = () => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];
        keyboards.push({
            all: false,
            chemistry: false,
            physics: false,
            maths: false,
        });
        values.push({
            chapter_id: this.chapterId,
            topic_name: this.topicName,
            question: "<p>Question goes here</p>",
            question_random_id: "",
            is_image_uploaded: false,
            content: {
                mcq: true,
                fill_in: false,
                boolean: false,
                fillin_answer: [""],
                boolean_question: [
                    { correct: false, content: "True" },
                    { correct: false, content: "False" },
                ],
                options: [
                    { correct: false, content: "" },
                    { correct: false, content: "" },
                    { correct: false, content: "" },
                    { correct: false, content: "" },
                ],
                explanation: "",
                images: [{ title: "", file_name: "", image: null, path: "" }],
                video: {
                    title: "",
                    file_name: "",
                    video: null,
                    path: "",
                    url: "",
                },
                audio: [{ title: "", file_name: "", audio: null, path: "" }],
            },
            properties: {
                marks: "",
                complexity: "",
                priority: "",
                theme: "",
                test: [false, false, false, false, false],
                semester: [false, false, false, false, false],
                quiz: [false, false, false, false, false],
                learn: false,
            },
            settings: {
                virtual_keyboard: [],
                limited: false,
            },
        });
        this.setState({
            questions: values,
            keyboards: keyboards,
            activeQuestion: values.length - 1,
        });
    };

    removingQuestions = (index) => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];
        this.setState({
            showEdit_option: false,
            contentCollapsed: true,
            propertiesCollapsed: true,
            settingsCollapsed: true,
            activeQuestion: index,
        });

        if (values[index].question_random_id !== "") {
            this.setState({
                selectedQuestion: values[index].question_random_id,
                showMCQDelete_Modal: !this.state.showMCQDelete_Modal,
            });
        } else {
            keyboards.splice(index, 1);
            values.splice(index, 1);
            this.setState(
                {
                    questions: values,
                    keyboards: keyboards,
                    activeQuestion: "",
                },
                () => {
                    if (values.length === 0) {
                        keyboards.push({
                            all: false,
                            chemistry: false,
                            physics: false,
                            maths: false,
                        });
                        values.push({
                            chapter_id: this.chapterId,
                            topic_name: this.topicName,
                            question: "<p>Question goes here</p>",
                            question_random_id: "",
                            is_image_uploaded: false,
                            content: {
                                mcq: true,
                                fill_in: false,
                                boolean: false,
                                fillin_answer: [""],
                                boolean_question: [
                                    { correct: false, content: "True" },
                                    { correct: false, content: "False" },
                                ],
                                options: [
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                ],
                                explanation: "",
                                images: [
                                    {
                                        title: "",
                                        file_name: "",
                                        image: null,
                                        path: "",
                                    },
                                ],
                                video: {
                                    title: "",
                                    file_name: "",
                                    video: null,
                                    path: "",
                                    url: "",
                                },
                                audio: [
                                    {
                                        title: "",
                                        file_name: "",
                                        audio: null,
                                        path: "",
                                    },
                                ],
                            },
                            properties: {
                                marks: "",
                                complexity: "",
                                priority: "",
                                theme: "",
                                test: [false, false, false, false, false],
                                semester: [false, false, false, false, false],
                                quiz: [false, false, false, false, false],
                                learn: false,
                            },
                            settings: {
                                virtual_keyboard: [],
                                limited: false,
                            },
                        });
                        this.setState({
                            questions: values,
                            keyboards: keyboards,
                        });
                    }
                }
            );
        }
    };

    closeMCQ_DeleteModal = () => {
        this.setState({
            showMCQDelete_Modal: !this.state.showMCQDelete_Modal,
        });
    };

    copyQuestions = (index) => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];

        keyboards[values.length] = {
            all: keyboards[index].all,
            chemistry: keyboards[index].chemistry,
            physics: keyboards[index].physics,
            maths: keyboards[index].maths,
        };
        const options = [];
        for (let i = 0; i < values[index].content.options.length; i++) {
            options[i] = {
                content: values[index].content.options[i].content,
                correct: values[index].content.options[i].correct,
            };
        }
        const fillin = [];
        for (let i = 0; i < values[index].content.fillin_answer.length; i++) {
            fillin[i] = values[index].content.fillin_answer[i];
        }
        const boolean = [];
        for (
            let i = 0;
            i < values[index].content.boolean_question.length;
            i++
        ) {
            boolean[i] = {
                content: values[index].content.boolean_question[i].content,
                correct: values[index].content.boolean_question[i].correct,
            };
        }
        const test = [];
        for (let i = 0; i < values[index].properties.test.length; i++) {
            test[i] = values[index].properties.test[i];
        }
        const semester = [];
        for (let i = 0; i < values[index].properties.semester.length; i++) {
            semester[i] = values[index].properties.semester[i];
        }
        const quiz = [];
        for (let i = 0; i < values[index].properties.quiz.length; i++) {
            quiz[i] = values[index].properties.quiz[i];
        }
        values[values.length] = {
            chapter_id: this.chapterId,
            topic_name: this.topicName,
            question: values[index].question,
            question_random_id: "",
            is_image_uploaded: false,
            content: {
                mcq: values[index].content.mcq,
                fill_in: values[index].content.fill_in,
                boolean: values[index].content.boolean,
                fillin_answer: fillin,
                boolean_question: boolean,
                options: options,
                explanation: values[index].content.explanation,
                images: [{ title: "", file_name: "", image: null, path: "" }],
                video: {
                    title: "",
                    file_name: "",
                    video: null,
                    path: "",
                    url: "",
                },
                audio: [{ title: "", file_name: "", audio: null, path: "" }],
            },
            properties: {
                marks: values[index].properties.marks,
                complexity: values[index].properties.complexity,
                priority: values[index].properties.priority,
                theme: values[index].properties.theme,
                test: test,
                semester: semester,
                quiz: quiz,
                learn: values[index].properties.learn,
            },
            settings: {
                virtual_keyboard: values[index].settings.virtual_keyboard,
                limited: values[index].settings.limited,
            },
        };
        this.setState({
            questions: values,
            keyboards: keyboards,
            activeQuestion: values.length - 1,
        });
    };

    editQuestion = (index) => {
        this.setState({
            showEdit_option: true,
            activeQuestion: index,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
    };

    handleMCQ_Deletion = (isMCQ_Deleted) => {
        if (isMCQ_Deleted === true) {
            const values = [...this.state.questions];
            const keyboards = [...this.state.keyboards];

            keyboards.splice(this.state.activeQuestion, 1);
            values.splice(this.state.activeQuestion, 1);

            this.setState(
                {
                    questions: values,
                    keyboards: keyboards,
                    activeQuestion: "",
                },
                () => {
                    if (values.length === 0) {
                        keyboards.push({
                            all: false,
                            chemistry: false,
                            physics: false,
                            maths: false,
                        });
                        values.push({
                            chapter_id: this.chapterId,
                            topic_name: this.topicName,
                            question: "<p>Question goes here</p>",
                            question_random_id: "",
                            is_image_uploaded: false,
                            content: {
                                mcq: true,
                                fill_in: false,
                                boolean: false,
                                fillin_answer: [""],
                                boolean_question: [
                                    {
                                        correct: false,
                                        content: "True",
                                    },
                                    {
                                        correct: false,
                                        content: "False",
                                    },
                                ],
                                options: [
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                ],
                                explanation: "",
                                images: [
                                    {
                                        title: "",
                                        file_name: "",
                                        image: null,
                                        path: "",
                                    },
                                ],
                                video: {
                                    title: "",
                                    file_name: "",
                                    video: null,
                                    path: "",
                                    url: "",
                                },
                                audio: [
                                    {
                                        title: "",
                                        file_name: "",
                                        audio: null,
                                        path: "",
                                    },
                                ],
                            },
                            properties: {
                                marks: "",
                                complexity: "",
                                priority: "",
                                theme: "",
                                test: [false, false, false, false, false],
                                semester: [false, false, false, false, false],
                                quiz: [false, false, false, false, false],
                                learn: false,
                            },
                            settings: {
                                virtual_keyboard: [],
                                limited: false,
                            },
                        });
                        this.setState({
                            questions: values,
                            keyboards: keyboards,
                        });
                    }
                }
            );
            setTimeout(() => {
                this.setState(
                    {
                        showMCQDelete_Modal: false,
                        page_loading: true,
                    },
                    () => {
                        this.loadMCQData();
                    }
                );
            }, 1000);
        }
    };

    // -------------------------- Publishing the question --------------------------

    handlePublish = () => {
        this.setState({
            showPublishSuccessAlert: false,
            showPublishErrorAlert: false,
            showPublishLoader: true,
        });

        const questions = [...this.state.questions];
        let id = [];
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].question_random_id !== "") {
                id.push(questions[i].question_random_id);
            } else {
                continue;
            }
        }

        if (id.length !== 0) {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/publish/`,
                {
                    headers: this.headers,
                    method: "POST",
                    body: JSON.stringify({
                        question_ids: id,
                        chapter_id: this.chapterId,
                        topic_name: this.topicName,
                    }),
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showPublishSuccessAlert: true,
                            showPublishLoader: false,
                        });
                    } else {
                        if (result.detail) {
                            this.setState({
                                errorMsg: result.detail,
                            });
                        } else {
                            this.setState({
                                errorMsg: result.msg,
                            });
                        }
                        this.setState({
                            showPublishErrorAlert: true,
                            showPublishLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                showPublishLoader: false,
            });
        }
    };

    render() {
        let data = [...this.state.questions];
        let boards = [...this.state.keyboards];
        let isImageAvailable = false;
        if (this.state.activeQuestion !== "") {
            for (
                let i = 0;
                i < data[this.state.activeQuestion].content.images.length;
                i++
            ) {
                isImageAvailable =
                    data[this.state.activeQuestion].content.images[i].path !==
                    ""
                        ? true
                        : false;
            }
        }
        let isAudioAvailable = false;
        if (this.state.activeQuestion !== "") {
            for (
                let i = 0;
                i < data[this.state.activeQuestion].content.audio.length;
                i++
            ) {
                isAudioAvailable =
                    data[this.state.activeQuestion].content.audio[i].path !== ""
                        ? true
                        : false;
            }
        }
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Alert message */}
                <Alert
                    variant="danger"
                    className="fixed-top"
                    show={this.state.showPublishErrorAlert}
                    onClose={() => {
                        this.setState({
                            showPublishErrorAlert: false,
                        });
                    }}
                    dismissible
                >
                    {this.state.errorMsg}
                </Alert>
                <Alert
                    variant="success"
                    className="fixed-top"
                    show={this.state.showPublishSuccessAlert}
                    onClose={() => {
                        this.setState({
                            showPublishSuccessAlert: false,
                        });
                    }}
                    dismissible
                >
                    {this.state.successMsg}
                </Alert>

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* MCQ Deletion Modal */}
                {this.state.showMCQDelete_Modal ? (
                    <MCQDeleteModal
                        show={this.state.showMCQDelete_Modal}
                        onHide={this.closeMCQ_DeleteModal}
                        toggleModal={this.closeMCQ_DeleteModal}
                        formSubmission={this.handleMCQ_Deletion}
                        subjectId={this.subjectId}
                        chapter_id={this.chapterId}
                        topic_name={this.topicName}
                        values={this.state.selectedQuestion}
                    />
                ) : null}

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

                {/* ALert modal */}
                {this.state.showAlertModal ? (
                    <AlertModal
                        show={this.state.showAlertModal}
                        msg={this.state.alertMsg}
                        goBack={this.props.history.goBack}
                    />
                ) : null}

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <div className="row">
                            {/* ------------------------------ MCQ Column ------------------------------ */}
                            <div
                                className={`${
                                    this.state.showEdit_option
                                        ? "col-md-9"
                                        : "col-12"
                                } mb-4 mb-md-0`}
                            >
                                {/* Back button */}
                                <button
                                    className="btn btn-primary-invert btn-sm mb-3"
                                    onClick={this.props.history.goBack}
                                >
                                    <i className="fas fa-chevron-left fa-sm"></i>{" "}
                                    Back
                                </button>

                                {/* Header area */}
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <h5 className="primary-text">
                                            {`${this.props.chapter_name} | ${this.props.topic_name} - MCQ`}
                                        </h5>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex flex-wrap justify-content-end mb-4">
                                            <button
                                                className="btn btn-primary btn-sm mr-1"
                                                onClick={this.handlePublish}
                                            >
                                                {this.state
                                                    .showPublishLoader ? (
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
                                                Publish
                                            </button>
                                            <button className="btn btn-primary btn-sm mr-1">
                                                Download template
                                            </button>
                                            <button className="btn btn-primary btn-sm mr-1">
                                                Upload template
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* -------------------- MCQ -------------------- */}
                                {this.state.questions.map(
                                    (question, q_index) => {
                                        return (
                                            <div
                                                className="row mb-3"
                                                key={q_index}
                                            >
                                                {/* ---------- Side buttons ---------- */}
                                                <div className="col-md-1 mb-1 mb-md-0">
                                                    <div className="row">
                                                        <div className="col-md-12 col-3 mb-1">
                                                            <button
                                                                type="button"
                                                                className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                            >
                                                                {q_index <= 8
                                                                    ? `0${
                                                                          q_index +
                                                                          1
                                                                      }`
                                                                    : q_index +
                                                                      1}
                                                            </button>
                                                        </div>
                                                        <div className="col-md-12 col-3 mb-1">
                                                            <button
                                                                type="button"
                                                                className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                                onClick={() =>
                                                                    this.editQuestion(
                                                                        q_index
                                                                    )
                                                                }
                                                            >
                                                                <i className="far fa-edit fa-sm"></i>
                                                            </button>
                                                        </div>
                                                        <div className="col-md-12 col-3 mb-1">
                                                            <button
                                                                type="button"
                                                                className="btn btn-light bg-white btn-block shadow-sm mr-1"
                                                                onClick={() =>
                                                                    this.copyQuestions(
                                                                        q_index
                                                                    )
                                                                }
                                                            >
                                                                <i className="far fa-copy fa-sm"></i>
                                                            </button>
                                                        </div>
                                                        <div className="col-md-12 col-3">
                                                            <button
                                                                type="button"
                                                                className="btn btn-light bg-white btn-block shadow-sm"
                                                                onClick={() =>
                                                                    this.removingQuestions(
                                                                        q_index
                                                                    )
                                                                }
                                                            >
                                                                <i className="far fa-trash-alt fa-sm"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ---------- Question preview ---------- */}
                                                <div className="col-md-11 pl-md-0">
                                                    <div className="card shadow-sm">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                {/* Questions & options */}
                                                                <div className="col-11 pr-md-0">
                                                                    <div className="form-group">
                                                                        <div className="card form-shadow">
                                                                            <div
                                                                                className="card-body py-2"
                                                                                dangerouslySetInnerHTML={{
                                                                                    __html:
                                                                                        question.question,
                                                                                }}
                                                                            ></div>
                                                                        </div>
                                                                    </div>
                                                                    {question
                                                                        .content
                                                                        .mcq ? (
                                                                        <div className="row">
                                                                            {question.content.options.map(
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
                                                                                                    className={`card form-shadow ${
                                                                                                        options.correct
                                                                                                            ? "border border-success"
                                                                                                            : ""
                                                                                                    }`}
                                                                                                >
                                                                                                    <div className="card-body small py-2">
                                                                                                        {options.content !==
                                                                                                        "" ? (
                                                                                                            options.content
                                                                                                        ) : (
                                                                                                            <span className="text-muted">{`Option 0${
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
                                                                    {question
                                                                        .content
                                                                        .fill_in ? (
                                                                        <div className="row">
                                                                            {question.content.fillin_answer.map(
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
                                                                                                    <div className="card-body small py-2">
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
                                                                    {question
                                                                        .content
                                                                        .boolean ? (
                                                                        <div className="row">
                                                                            {question.content.boolean_question.map(
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
                                                                                                    className={`card form-shadow ${
                                                                                                        boolean.correct
                                                                                                            ? "border border-success"
                                                                                                            : ""
                                                                                                    }`}
                                                                                                >
                                                                                                    <div className="card-body small py-2">
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
                                                                {/* File modal button */}
                                                                <div className="col-1 pl-0 text-right">
                                                                    <button
                                                                        className="btn btn-light bg-white shadow-sm"
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
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                )}

                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={this.addNewQuestion}
                                >
                                    Add +
                                </button>
                            </div>

                            {/* ---------- Settings column ---------- */}
                            {this.state.showEdit_option ? (
                                <div className="col-md-3 content-edit">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={this.handleSubmit}
                                            disabled={this.state.btnDisabled}
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
                                        <button
                                            className="btn btn-link btn-sm"
                                            onClick={() => {
                                                this.setState({
                                                    showEdit_option: false,
                                                    contentCollapsed: true,
                                                    propertiesCollapsed: true,
                                                    settingsCollapsed: true,
                                                });
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>

                                    <Alert
                                        variant="danger"
                                        show={this.state.showErrorAlert}
                                        onClose={() => {
                                            this.setState({
                                                showErrorAlert: false,
                                            });
                                        }}
                                        className="mb-2"
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
                                        className="mb-2"
                                        dismissible
                                    >
                                        {this.state.successMsg}
                                    </Alert>

                                    <Accordion defaultActiveKey="">
                                        {/* Content | image / video */}
                                        <Card className="shadow-sm mb-2">
                                            <Accordion.Toggle
                                                as={Card.Body}
                                                variant="link"
                                                eventKey="0"
                                                className="text-dark"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    this.toggleCollapse(
                                                        "content"
                                                    )
                                                }
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    Content | Image / Video
                                                    {this.state
                                                        .contentCollapsed ? (
                                                        <i className="fas fa-angle-right "></i>
                                                    ) : (
                                                        <i className="fas fa-angle-down "></i>
                                                    )}
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body className="p-3">
                                                    {/* ---------- Questions ---------- */}
                                                    <div className="form-group">
                                                        <label>
                                                            Add Questions
                                                        </label>
                                                        <CKeditor
                                                            data={
                                                                data[
                                                                    this.state
                                                                        .activeQuestion
                                                                ].question
                                                            }
                                                            onChange={
                                                                this
                                                                    .onEditorChange
                                                            }
                                                        />
                                                    </div>

                                                    {/* ---------- Options ---------- */}
                                                    <div className="form-group">
                                                        <div className="row mb-3">
                                                            <div className="col-md-6">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="mr-4">
                                                                        MCQ
                                                                    </span>
                                                                    <ReactSwitch
                                                                        checked={
                                                                            data[
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            ]
                                                                                .content
                                                                                .mcq
                                                                        }
                                                                        onChange={() =>
                                                                            this.handleOptions_mcq(
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-md-6">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="mr-4">
                                                                        Fill in
                                                                    </span>
                                                                    <ReactSwitch
                                                                        checked={
                                                                            data[
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            ]
                                                                                .content
                                                                                .fill_in
                                                                        }
                                                                        onChange={() =>
                                                                            this.handleOptions_fillin(
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-md-8">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="mr-4">
                                                                        True /
                                                                        False
                                                                    </span>
                                                                    <ReactSwitch
                                                                        checked={
                                                                            data[
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            ]
                                                                                .content
                                                                                .boolean
                                                                        }
                                                                        onChange={() =>
                                                                            this.handleOptions_boolean(
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {data[
                                                        this.state
                                                            .activeQuestion
                                                    ].content.mcq ? (
                                                        <div className="form-group row align-items-center">
                                                            {data[
                                                                this.state
                                                                    .activeQuestion
                                                            ].content.options.map(
                                                                (
                                                                    options,
                                                                    index
                                                                ) => (
                                                                    <Fragment
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <div className="col-10 mb-2 pr-0">
                                                                            <div
                                                                                className="input-group border-secondary"
                                                                                style={{
                                                                                    borderRadius:
                                                                                        "6px",
                                                                                }}
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    id={`option${index}`}
                                                                                    name="option"
                                                                                    placeholder={`Option 0${
                                                                                        index +
                                                                                        1
                                                                                    }`}
                                                                                    value={
                                                                                        options.content
                                                                                    }
                                                                                    onChange={(
                                                                                        event
                                                                                    ) =>
                                                                                        this.handleOptionChange(
                                                                                            index,
                                                                                            event
                                                                                        )
                                                                                    }
                                                                                    autoComplete="off"
                                                                                    required
                                                                                />
                                                                                <div className="input-group-append">
                                                                                    <div
                                                                                        className="btn-group"
                                                                                        role="group"
                                                                                        aria-label="Basic example"
                                                                                    >
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-light btn-sm shadow-none font-weight-bold"
                                                                                            onClick={() =>
                                                                                                this.handleRemoveOptionFields(
                                                                                                    index
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            -
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-2 mb-2">
                                                                            <p
                                                                                className={`mb-0 text-right ${
                                                                                    options.correct
                                                                                        ? "text-success"
                                                                                        : "text-muted"
                                                                                }`}
                                                                                onClick={() =>
                                                                                    this.correctOption(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer",
                                                                                }}
                                                                            >
                                                                                <i className="fas fa-check-circle"></i>
                                                                            </p>
                                                                        </div>
                                                                    </Fragment>
                                                                )
                                                            )}
                                                            {data[
                                                                this.state
                                                                    .activeQuestion
                                                            ].content.options
                                                                .length <
                                                            this
                                                                .option_limit ? (
                                                                <div className="form-group col-12 mb-0">
                                                                    <button
                                                                        className="btn btn-light btn-block border-secondary btn-sm"
                                                                        onClick={
                                                                            this
                                                                                .handleAddOptionFields
                                                                        }
                                                                    >
                                                                        Add +
                                                                    </button>
                                                                </div>
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    ) : data[
                                                          this.state
                                                              .activeQuestion
                                                      ].content.fill_in ? (
                                                        // Fill in answers
                                                        <div className="form-group row">
                                                            {data[
                                                                this.state
                                                                    .activeQuestion
                                                            ].content.fillin_answer.map(
                                                                (
                                                                    answer,
                                                                    index
                                                                ) => (
                                                                    <Fragment
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <div className="col-12 mb-2">
                                                                            <div
                                                                                className="input-group border-secondary"
                                                                                style={{
                                                                                    borderRadius:
                                                                                        "6px",
                                                                                }}
                                                                            >
                                                                                <input
                                                                                    type="text"
                                                                                    className="form-control form-control-sm"
                                                                                    id={`answer${index}`}
                                                                                    name="answer"
                                                                                    placeholder={`Answer 0${
                                                                                        index +
                                                                                        1
                                                                                    }`}
                                                                                    value={
                                                                                        answer
                                                                                    }
                                                                                    onChange={(
                                                                                        event
                                                                                    ) =>
                                                                                        this.handleAnswerChange(
                                                                                            index,
                                                                                            event
                                                                                        )
                                                                                    }
                                                                                    autoComplete="off"
                                                                                    required
                                                                                />
                                                                                <div className="input-group-append">
                                                                                    <div
                                                                                        className="btn-group"
                                                                                        role="group"
                                                                                        aria-label="Basic example"
                                                                                    >
                                                                                        <button
                                                                                            type="button"
                                                                                            className="btn btn-light btn-sm shadow-none font-weight-bold"
                                                                                            onClick={() =>
                                                                                                this.handleRemoveAnswerFields(
                                                                                                    index
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            -
                                                                                        </button>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Fragment>
                                                                )
                                                            )}
                                                            <div className="form-group col-12 mb-0">
                                                                <button
                                                                    className="btn btn-light btn-block border-secondary btn-sm"
                                                                    onClick={
                                                                        this
                                                                            .handleAddAnswerFields
                                                                    }
                                                                >
                                                                    Add +
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : data[
                                                          this.state
                                                              .activeQuestion
                                                      ].content.boolean ? (
                                                        // true or false
                                                        <div className="form-group row align-items-center">
                                                            {data[
                                                                this.state
                                                                    .activeQuestion
                                                            ].content.boolean_question.map(
                                                                (
                                                                    boolean,
                                                                    index
                                                                ) => (
                                                                    <Fragment
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <div className="col-10 mb-2 pr-0">
                                                                            <input
                                                                                type="text"
                                                                                className="form-control form-control-sm border-secondary"
                                                                                id={`option${index}`}
                                                                                name="option"
                                                                                placeholder={`Option 0${
                                                                                    index +
                                                                                    1
                                                                                }`}
                                                                                value={
                                                                                    boolean.content
                                                                                }
                                                                                disabled
                                                                                autoComplete="off"
                                                                                required
                                                                            />
                                                                        </div>
                                                                        <div className="col-2 mb-2">
                                                                            <p
                                                                                className={`mb-0 text-right ${
                                                                                    boolean.correct
                                                                                        ? "text-success"
                                                                                        : "text-muted"
                                                                                }`}
                                                                                onClick={() =>
                                                                                    this.correctBoolean(
                                                                                        index
                                                                                    )
                                                                                }
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer",
                                                                                }}
                                                                            >
                                                                                <i className="fas fa-check-circle"></i>
                                                                            </p>
                                                                        </div>
                                                                    </Fragment>
                                                                )
                                                            )}
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                    {/* ---------- Explanation ---------- */}
                                                    <div className="form-group">
                                                        <label>
                                                            Explanation
                                                        </label>
                                                        <CKeditor
                                                            data={
                                                                data[
                                                                    this.state
                                                                        .activeQuestion
                                                                ].content
                                                                    .explanation
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleExplanation
                                                            }
                                                        />
                                                    </div>

                                                    {/* ---------- Image ---------- */}

                                                    <Alert
                                                        variant="danger"
                                                        show={
                                                            this.state
                                                                .showImageErrorAlert
                                                        }
                                                        onClose={() => {
                                                            this.setState({
                                                                showImageErrorAlert: false,
                                                            });
                                                        }}
                                                        className="mb-2"
                                                        dismissible
                                                    >
                                                        {this.state.errorMsg}
                                                    </Alert>
                                                    <Alert
                                                        variant="success"
                                                        show={
                                                            this.state
                                                                .showImageSuccessAlert
                                                        }
                                                        onClose={() => {
                                                            this.setState({
                                                                showImageSuccessAlert: false,
                                                            });
                                                        }}
                                                        className="mb-2"
                                                        dismissible
                                                    >
                                                        {this.state.successMsg}
                                                    </Alert>

                                                    <div className="form-group">
                                                        <div className="row align-items-center mb-2">
                                                            <div className="col-md-6">
                                                                <p className="mb-0">
                                                                    Image
                                                                    <OverlayTrigger
                                                                        key="right"
                                                                        placement="right"
                                                                        overlay={
                                                                            <Tooltip id="tooltip">
                                                                                You
                                                                                can
                                                                                upload
                                                                                Max
                                                                                of
                                                                                04
                                                                                Images
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <i className="fas fa-info-circle fa-xs ml-2"></i>
                                                                    </OverlayTrigger>
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6 text-right">
                                                                <button
                                                                    className="btn btn-link btn-sm shadow-none"
                                                                    onClick={
                                                                        this
                                                                            .clearImages
                                                                    }
                                                                >
                                                                    Clear
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {data[
                                                            this.state
                                                                .activeQuestion
                                                        ].content.images.map(
                                                            (
                                                                options,
                                                                index
                                                            ) => (
                                                                <Fragment
                                                                    key={index}
                                                                >
                                                                    <div
                                                                        className="input-group border-secondary mb-1"
                                                                        style={{
                                                                            borderRadius:
                                                                                "6px",
                                                                        }}
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-sm"
                                                                            id={`image${index}`}
                                                                            name="image"
                                                                            placeholder={`Image title 0${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                            value={
                                                                                options.title
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleImageTitle(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                            autoComplete="off"
                                                                        />
                                                                        <div className="input-group-append">
                                                                            <div
                                                                                className="btn-group"
                                                                                role="group"
                                                                                aria-label="Basic example"
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-light btn-sm shadow-none"
                                                                                    onClick={() =>
                                                                                        this.handleRemoveImageFields(
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <i className="fas fa-times fa-sm"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="custom-file mb-2">
                                                                        <input
                                                                            type="file"
                                                                            className="custom-file-input"
                                                                            id={`file${index}`}
                                                                            accept="image/*"
                                                                            aria-describedby="inputGroupFileAddon01"
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleImageFile(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            className="custom-file-label"
                                                                            htmlFor={`file${index}`}
                                                                        >
                                                                            {options.file_name ===
                                                                            ""
                                                                                ? "Choose file"
                                                                                : options.file_name}
                                                                        </label>
                                                                    </div>
                                                                </Fragment>
                                                            )
                                                        )}
                                                        <small
                                                            className="form-text text-muted mb-2"
                                                            style={{
                                                                marginTop:
                                                                    "-8px",
                                                            }}
                                                        >
                                                            Select only .png
                                                            .jpg .jpeg .webp
                                                        </small>

                                                        {data[
                                                            this.state
                                                                .activeQuestion
                                                        ].content.images
                                                            .length <
                                                        this.image_limit ? (
                                                            <div className="form-group mb-0">
                                                                <button
                                                                    className="btn btn-light btn-block border-secondary btn-sm"
                                                                    onClick={
                                                                        this
                                                                            .handleAddImageFields
                                                                    }
                                                                    disabled={
                                                                        isImageAvailable ===
                                                                        true
                                                                            ? false
                                                                            : true
                                                                    }
                                                                >
                                                                    Add +
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>

                                                    {/* ---------- Video ---------- */}

                                                    <Alert
                                                        variant="danger"
                                                        show={
                                                            this.state
                                                                .showVideoErrorAlert
                                                        }
                                                        onClose={() => {
                                                            this.setState({
                                                                showVideoErrorAlert: false,
                                                            });
                                                        }}
                                                        className="mb-2"
                                                        dismissible
                                                    >
                                                        {this.state.errorMsg}
                                                    </Alert>
                                                    <Alert
                                                        variant="success"
                                                        show={
                                                            this.state
                                                                .showVideoSuccessAlert
                                                        }
                                                        onClose={() => {
                                                            this.setState({
                                                                showVideoSuccessAlert: false,
                                                            });
                                                        }}
                                                        className="mb-2"
                                                        dismissible
                                                    >
                                                        {this.state.successMsg}
                                                    </Alert>

                                                    <div className="form-group">
                                                        <div className="row align-items-center mb-2">
                                                            <div className="col-md-6">
                                                                <p className="mb-0">
                                                                    Video
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6 text-right">
                                                                <button
                                                                    className="btn btn-link btn-sm shadow-none"
                                                                    onClick={
                                                                        this
                                                                            .clearVideo
                                                                    }
                                                                >
                                                                    Clear
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <input
                                                            type="text"
                                                            name="video"
                                                            id="video"
                                                            placeholder="Video title"
                                                            className="form-control form-control-sm border-secondary mb-1"
                                                            onChange={
                                                                this
                                                                    .handleVideoTitle
                                                            }
                                                            value={
                                                                data[
                                                                    this.state
                                                                        .activeQuestion
                                                                ].content.video
                                                                    .title
                                                            }
                                                            autoComplete="off"
                                                        />
                                                        <div className="custom-file mb-2">
                                                            <input
                                                                type="file"
                                                                className="custom-file-input"
                                                                id="video"
                                                                accept="video/*"
                                                                aria-describedby="inputGroupFileAddon01"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleVideoFile(
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="video"
                                                            >
                                                                {data[
                                                                    this.state
                                                                        .activeQuestion
                                                                ].content.video
                                                                    .file_name ===
                                                                ""
                                                                    ? "Choose file"
                                                                    : data[
                                                                          this
                                                                              .state
                                                                              .activeQuestion
                                                                      ].content
                                                                          .video
                                                                          .file_name}
                                                            </label>
                                                        </div>
                                                        <small
                                                            className="form-text text-muted mb-2"
                                                            style={{
                                                                marginTop:
                                                                    "-8px",
                                                            }}
                                                        >
                                                            Select only .mpeg
                                                            .flv .avi .mov .mp4
                                                            .mkv
                                                        </small>

                                                        <p className="text-center small font-weight-bold mb-2">
                                                            Or
                                                        </p>
                                                        <input
                                                            type="url"
                                                            name="video"
                                                            placeholder="Paste URL"
                                                            className="form-control form-control-sm border-secondary mb-1"
                                                            onChange={(event) =>
                                                                this.handleVideoUrl(
                                                                    event
                                                                )
                                                            }
                                                            autoComplete="off"
                                                            value={
                                                                data[
                                                                    this.state
                                                                        .activeQuestion
                                                                ].content.video
                                                                    .url
                                                            }
                                                        />
                                                        <small className="form-text text-muted mb-2">
                                                            Only https supported
                                                            video
                                                        </small>
                                                    </div>

                                                    {/* ---------- Audio ---------- */}

                                                    <Alert
                                                        variant="danger"
                                                        show={
                                                            this.state
                                                                .showAudioErrorAlert
                                                        }
                                                        onClose={() => {
                                                            this.setState({
                                                                showAudioErrorAlert: false,
                                                            });
                                                        }}
                                                        className="mb-2"
                                                        dismissible
                                                    >
                                                        {this.state.errorMsg}
                                                    </Alert>
                                                    <Alert
                                                        variant="success"
                                                        show={
                                                            this.state
                                                                .showAudioSuccessAlert
                                                        }
                                                        onClose={() => {
                                                            this.setState({
                                                                showAudioSuccessAlert: false,
                                                            });
                                                        }}
                                                        className="mb-2"
                                                        dismissible
                                                    >
                                                        {this.state.successMsg}
                                                    </Alert>

                                                    <div className="form-group">
                                                        <div className="row align-items-center mb-2">
                                                            <div className="col-md-6">
                                                                <p className="mb-0">
                                                                    Audio
                                                                    <OverlayTrigger
                                                                        key="right"
                                                                        placement="right"
                                                                        overlay={
                                                                            <Tooltip id="tooltip">
                                                                                You
                                                                                can
                                                                                upload
                                                                                Max
                                                                                of
                                                                                02
                                                                                Audio
                                                                            </Tooltip>
                                                                        }
                                                                    >
                                                                        <i className="fas fa-info-circle fa-xs ml-2"></i>
                                                                    </OverlayTrigger>
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6 text-right">
                                                                <button
                                                                    className="btn btn-link btn-sm shadow-none"
                                                                    onClick={
                                                                        this
                                                                            .clearAudios
                                                                    }
                                                                >
                                                                    Clear
                                                                </button>
                                                            </div>
                                                        </div>
                                                        {data[
                                                            this.state
                                                                .activeQuestion
                                                        ].content.audio.map(
                                                            (
                                                                options,
                                                                index
                                                            ) => (
                                                                <Fragment
                                                                    key={index}
                                                                >
                                                                    <div
                                                                        className="input-group border-secondary mb-1"
                                                                        style={{
                                                                            borderRadius:
                                                                                "6px",
                                                                        }}
                                                                    >
                                                                        <input
                                                                            type="text"
                                                                            className="form-control form-control-sm"
                                                                            id={`audio${index}`}
                                                                            name="audio"
                                                                            placeholder={`Audio title 0${
                                                                                index +
                                                                                1
                                                                            }`}
                                                                            value={
                                                                                options.title
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleAudioTitle(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                            autoComplete="off"
                                                                        />
                                                                        <div className="input-group-append">
                                                                            <div
                                                                                className="btn-group"
                                                                                role="group"
                                                                                aria-label="Basic example"
                                                                            >
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-light btn-sm shadow-none"
                                                                                    onClick={() =>
                                                                                        this.handleRemoveAudioFields(
                                                                                            index
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <i className="fas fa-times fa-sm"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="custom-file mb-2">
                                                                        <input
                                                                            type="file"
                                                                            className="custom-file-input"
                                                                            id={`audio${index}`}
                                                                            accept="audio/*"
                                                                            aria-describedby="inputGroupFileAddon01"
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleAudioFile(
                                                                                    index,
                                                                                    event
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            className="custom-file-label"
                                                                            htmlFor={`audio${index}`}
                                                                        >
                                                                            {options.file_name ===
                                                                            ""
                                                                                ? "Choose file"
                                                                                : options.file_name}
                                                                        </label>
                                                                    </div>
                                                                </Fragment>
                                                            )
                                                        )}
                                                        <small
                                                            className="form-text text-muted mb-2"
                                                            style={{
                                                                marginTop:
                                                                    "-8px",
                                                            }}
                                                        >
                                                            Select only .wav
                                                            .mp3
                                                        </small>

                                                        {data[
                                                            this.state
                                                                .activeQuestion
                                                        ].content.audio.length <
                                                        this.audio_limit ? (
                                                            <div className="form-group mb-0">
                                                                <button
                                                                    className="btn btn-light btn-block border-secondary btn-sm"
                                                                    onClick={
                                                                        this
                                                                            .handleAddAudioFields
                                                                    }
                                                                    disabled={
                                                                        isAudioAvailable ===
                                                                        true
                                                                            ? false
                                                                            : true
                                                                    }
                                                                >
                                                                    Add +
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                        {/* ---------- Properties ---------- */}
                                        <Card className="shadow-sm mb-2">
                                            <Accordion.Toggle
                                                as={Card.Body}
                                                variant="link"
                                                eventKey="1"
                                                className="text-dark"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    this.toggleCollapse(
                                                        "properties"
                                                    )
                                                }
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    Properties
                                                    {this.state
                                                        .propertiesCollapsed ? (
                                                        <i className="fas fa-angle-right "></i>
                                                    ) : (
                                                        <i className="fas fa-angle-down "></i>
                                                    )}
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body className="p-3">
                                                    {/* ---------- Marks ---------- */}
                                                    <div className="form-group row align-items-center">
                                                        <div className="col-4 small">
                                                            Marks
                                                        </div>
                                                        <div className="col-8">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm border-secondary"
                                                                value={
                                                                    data[
                                                                        this
                                                                            .state
                                                                            .activeQuestion
                                                                    ].properties
                                                                        .marks
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleProperties(
                                                                        event,
                                                                        "marks"
                                                                    )
                                                                }
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* ---------- Complexity ---------- */}
                                                    <div className="form-group row align-items-center">
                                                        <div className="col-4 small">
                                                            Complexity
                                                        </div>
                                                        <div className="col-8">
                                                            <select
                                                                name="complexity"
                                                                id="complexity"
                                                                className="form-control form-control-sm border-secondary"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleProperties(
                                                                        event,
                                                                        "complexity"
                                                                    )
                                                                }
                                                                value={
                                                                    data[
                                                                        this
                                                                            .state
                                                                            .activeQuestion
                                                                    ].properties
                                                                        .complexity
                                                                }
                                                            >
                                                                <option value="">
                                                                    Select
                                                                    option
                                                                </option>
                                                                {this.state.complexityData.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                value={
                                                                                    option
                                                                                }
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    option
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* ---------- Priority ---------- */}
                                                    <div className="form-group row align-items-center">
                                                        <div className="col-4 small">
                                                            Priority
                                                        </div>
                                                        <div className="col-8">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm border-secondary"
                                                                value={
                                                                    data[
                                                                        this
                                                                            .state
                                                                            .activeQuestion
                                                                    ].properties
                                                                        .priority
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleProperties(
                                                                        event,
                                                                        "priority"
                                                                    )
                                                                }
                                                                autoComplete="off"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* ---------- Theme ---------- */}
                                                    <div className="form-group row align-items-center">
                                                        <div className="col-4 small">
                                                            Theme
                                                        </div>
                                                        <div className="col-8">
                                                            <select
                                                                name="theme"
                                                                id="theme"
                                                                className="form-control form-control-sm border-secondary"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleProperties(
                                                                        event,
                                                                        "theme"
                                                                    )
                                                                }
                                                                value={
                                                                    data[
                                                                        this
                                                                            .state
                                                                            .activeQuestion
                                                                    ].properties
                                                                        .theme
                                                                }
                                                            >
                                                                <option value="">
                                                                    Select
                                                                    option
                                                                </option>
                                                                {this.state.themeData.map(
                                                                    (
                                                                        option,
                                                                        index
                                                                    ) => {
                                                                        return (
                                                                            <option
                                                                                value={
                                                                                    option
                                                                                }
                                                                                key={
                                                                                    index
                                                                                }
                                                                            >
                                                                                {
                                                                                    option
                                                                                }
                                                                            </option>
                                                                        );
                                                                    }
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>

                                                    {/* ---------- Attempt sequence ---------- */}
                                                    <div className="form-group ">
                                                        <p className="mb-2">
                                                            Attempt Sequence
                                                        </p>
                                                        <div className="row align-items-center">
                                                            <div className="col-7 pr-0">
                                                                <div className="card bg-light card-body p-2">
                                                                    <div className="card card-body bg-white p-1 px-2 mb-2">
                                                                        <div className="d-flex justify-content-between">
                                                                            {data[
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            ].properties.test.map(
                                                                                (
                                                                                    options,
                                                                                    index
                                                                                ) => {
                                                                                    return (
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            checked={
                                                                                                options
                                                                                            }
                                                                                            onChange={() =>
                                                                                                this.handleAttemptSequence(
                                                                                                    index,
                                                                                                    "test"
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="card card-body bg-white p-1 px-2 mb-2">
                                                                        <div className="d-flex justify-content-between">
                                                                            {data[
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            ].properties.semester.map(
                                                                                (
                                                                                    options,
                                                                                    index
                                                                                ) => {
                                                                                    return (
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            checked={
                                                                                                options
                                                                                            }
                                                                                            onChange={() =>
                                                                                                this.handleAttemptSequence(
                                                                                                    index,
                                                                                                    "semester"
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="card card-body bg-white p-1 px-2">
                                                                        <div className="d-flex justify-content-between">
                                                                            {data[
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            ].properties.quiz.map(
                                                                                (
                                                                                    options,
                                                                                    index
                                                                                ) => {
                                                                                    return (
                                                                                        <input
                                                                                            type="checkbox"
                                                                                            key={
                                                                                                index
                                                                                            }
                                                                                            checked={
                                                                                                options
                                                                                            }
                                                                                            onChange={() =>
                                                                                                this.handleAttemptSequence(
                                                                                                    index,
                                                                                                    "quiz"
                                                                                                )
                                                                                            }
                                                                                        />
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 pl-0">
                                                                <div className="card card-body p-2">
                                                                    <div className="card-body p-1 px-2 mb-1 small">
                                                                        Test
                                                                    </div>
                                                                    <div className="card-body p-1 px-2 mb-1 small">
                                                                        Semester
                                                                    </div>
                                                                    <div className="card-body p-1 px-2 small">
                                                                        Quiz
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="mr-4">
                                                                        Learn
                                                                    </span>
                                                                    <ReactSwitch
                                                                        onChange={
                                                                            this
                                                                                .handleLearn
                                                                        }
                                                                        checked={
                                                                            data[
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            ]
                                                                                .properties
                                                                                .learn
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                        {/* ---------- Settings ---------- */}
                                        <Card className="shadow-sm mb-2">
                                            <Accordion.Toggle
                                                as={Card.Body}
                                                variant="link"
                                                eventKey="2"
                                                className="text-dark"
                                                style={{ cursor: "pointer" }}
                                                onClick={this.toggleCollapse}
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    Settings
                                                    {this.state
                                                        .settingsCollapsed ? (
                                                        <i className="fas fa-angle-right "></i>
                                                    ) : (
                                                        <i className="fas fa-angle-down "></i>
                                                    )}
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body className="p-3">
                                                    {/* ---------- Virtual keyboard ---------- */}
                                                    <div className="form-group">
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <span>
                                                                Virtual Keyboard
                                                            </span>
                                                            <ReactSwitch
                                                                onChange={
                                                                    this
                                                                        .handleVirtualKeyboard
                                                                }
                                                                checked={
                                                                    this.state
                                                                        .showVirtual_keyboard
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    {this.state
                                                        .showVirtual_keyboard ? (
                                                        <div className="form-group">
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                All
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeQuestion
                                                                        ].all
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        this.handleSelectAll(
                                                                            event,
                                                                            "All"
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                Chemistry
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeQuestion
                                                                        ]
                                                                            .chemistry
                                                                    }
                                                                    disabled={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeQuestion
                                                                        ].all
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        this.handleKeyboardOptions(
                                                                            event,
                                                                            "Chemistry"
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center mb-2">
                                                                Maths
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeQuestion
                                                                        ].maths
                                                                    }
                                                                    disabled={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeQuestion
                                                                        ].all
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        this.handleKeyboardOptions(
                                                                            event,
                                                                            "Maths"
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                Physics
                                                                <input
                                                                    type="checkbox"
                                                                    checked={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeQuestion
                                                                        ]
                                                                            .physics
                                                                    }
                                                                    disabled={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeQuestion
                                                                        ].all
                                                                    }
                                                                    onChange={(
                                                                        event
                                                                    ) =>
                                                                        this.handleKeyboardOptions(
                                                                            event,
                                                                            "Physics"
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        ""
                                                    )}

                                                    {/* ---------- Limited ---------- */}
                                                    <div className="form-group">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <div className="d-flex align-items-center">
                                                                    <span className="mr-4">
                                                                        Limited
                                                                    </span>
                                                                    <ReactSwitch
                                                                        onChange={
                                                                            this
                                                                                .handleLimited
                                                                        }
                                                                        checked={
                                                                            data[
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion
                                                                            ]
                                                                                .settings
                                                                                .limited
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(SubjectType1);
