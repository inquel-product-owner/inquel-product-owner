import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import CKeditor from "../sharedComponents/CKeditor";
import ReactSwitch from "../sharedComponents/switchComponent";
import { Accordion, Card, OverlayTrigger, Tooltip } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import AlertBox from "../sharedComponents/alert";
import FileModal from "./shared/fileExplorer";
import { ContentDeleteModal } from "../sharedComponents/contentManagementModal";

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
    topic_name: state.topic_name,
});

class Type2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,

            alertMsg: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,

            page_loading: true,
            btnDisabled: false,
            showMCQDelete_Modal: false,
            showSubMCQDelete_Modal: false,

            showMainEdit_option: false,
            contentCollapsed: true,
            propertiesCollapsed: true,
            settingsCollapsed: true,

            showSubEdit_option: false,
            subContentCollapsed: true,
            showVirtual_keyboard: true,

            themeData: [],
            complexityData: [],
            isForm_submitted: false,

            activeQuestion: "",
            activeSubQuestion: "",
            selectedImage: "",
            selectedVideo: "",
            selectedAudio: "",
            selectedQuestion: "",
            selectedSubQuestion: "",

            keyboards: [
                { all: false, chemistry: false, physics: false, maths: false },
            ],

            questions: [
                {
                    question: "<p>Main Question goes here</p>",
                    question_random_id: "",
                    is_image_uploaded: false,
                    sub_question: [
                        {
                            sub_question_id: "",
                            question: "<p>Sub question goes here</p>",
                            explanation: "<p>Explanation goes here</p>",
                            mcq: true,
                            fill_in: false,
                            fillin_answer: [""],
                            options: [
                                { correct: false, content: "" },
                                { correct: false, content: "" },
                                { correct: false, content: "" },
                                { correct: false, content: "" },
                            ],
                            marks: "",
                            negative_marks: "0",
                        },
                    ],
                    content: {
                        images: [
                            { title: "", file_name: "", image: null, path: "" },
                            { title: "", file_name: "", image: null, path: "" },
                            { title: "", file_name: "", image: null, path: "" },
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
                            { title: "", file_name: "", audio: null, path: "" },
                        ],
                    },
                    properties: {
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
        this.sub_question_limit = 10;
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicNum = this.props.match.params.topicNum;
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
            `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/?chapter_id=${this.chapterId}&topic_num=${this.topicNum}`,
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
                    let response = result.data.results;
                    if (response.length !== 0) {
                        for (let i = 0; i < response.length; i++) {
                            images = [];
                            audio = [];
                            if (response[i].files.length !== 0) {
                                // image
                                if (
                                    response[i].files[0].type1_image_1 !==
                                        undefined ||
                                    response[i].files[0].type1_image_2 !==
                                        undefined ||
                                    response[i].files[0].type1_image_3 !==
                                        undefined ||
                                    response[i].files[0].type1_image_4 !==
                                        undefined
                                ) {
                                    images.push({
                                        title:
                                            response[i].files[0]
                                                .type1_image_1_title || "",
                                        file_name: "",
                                        image: null,
                                        path:
                                            response[i].files[0]
                                                .type1_image_1 || "",
                                    });
                                    if (
                                        response[i].files[0].type1_image_2 !==
                                            undefined ||
                                        response[i].files[0].type1_image_3 !==
                                            undefined ||
                                        response[i].files[0].type1_image_4 !==
                                            undefined
                                    ) {
                                        images.push({
                                            title:
                                                response[i].files[0]
                                                    .type1_image_2_title || "",
                                            file_name: "",
                                            image: null,
                                            path:
                                                response[i].files[0]
                                                    .type1_image_2 || "",
                                        });
                                        if (
                                            response[i].files[0]
                                                .type1_image_3 !== undefined ||
                                            response[i].files[0]
                                                .type1_image_4 !== undefined
                                        ) {
                                            images.push({
                                                title:
                                                    response[i].files[0]
                                                        .type1_image_3_title ||
                                                    "",
                                                file_name: "",
                                                image: null,
                                                path:
                                                    response[i].files[0]
                                                        .type1_image_3 || "",
                                            });
                                            if (
                                                response[i].files[0]
                                                    .type1_image_4 !== undefined
                                            ) {
                                                images.push({
                                                    title:
                                                        response[i].files[0]
                                                            .type1_image_4_title ||
                                                        "",
                                                    file_name: "",
                                                    image: null,
                                                    path:
                                                        response[i].files[0]
                                                            .type1_image_4 ||
                                                        "",
                                                });
                                            }
                                        }
                                    }
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
                                topic_num: this.props.match.params.topicNum,
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
        document.title = `${this.props.topic_name} Type 2 - Teacher | IQLabs`;

        fetch(`${this.url}/teacher/status/data/?theme=1&complexity=1`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        themeData: result.data.theme,
                        complexityData: result.data.complexity,
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

        // this.loadMCQData();
        this.setState({
            page_loading: false,
        });
    };

    handleSubmit = () => {
        this.setState({
            page_loading: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        const data = [...this.state.questions];
        let form_data = new FormData();

        form_data.append(
            "main_question",
            JSON.stringify({
                main_question: {
                    question: data[this.state.activeQuestion].question,
                    properties: {
                        complexity:
                            data[this.state.activeQuestion].properties
                                .complexity,
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
                        limited:
                            data[this.state.activeQuestion].settings.limited,
                    },
                },
            })
        );
        form_data.append(
            "sub_question",
            JSON.stringify({
                sub_question: data[this.state.activeQuestion].sub_question,
            })
        );
        form_data.append("topic_num", this.topicNum);

        // Video
        if (data[this.state.activeQuestion].content.video.url !== "") {
            form_data.append(
                "video_url",
                data[this.state.activeQuestion].content.video.url
            );
        }

        if (data[this.state.activeQuestion].content.video.video !== null) {
            form_data.append(
                "type2_video_1_title",
                data[this.state.activeQuestion].content.video.title
            );
            form_data.append(
                "type2_video_1",
                data[this.state.activeQuestion].content.video.video
            );
        }

        // Image
        for (
            let i = 0;
            i < data[this.state.activeQuestion].content.images.length;
            i++
        ) {
            if (
                data[this.state.activeQuestion].content.images[i].image !== null
            ) {
                form_data.append(
                    `type2_image_${i + 1}_title`,
                    data[this.state.activeQuestion].content.images[i].title
                );
                form_data.append(
                    `type2_image_${i + 1}`,
                    data[this.state.activeQuestion].content.images[i].image
                );
            } else {
                continue;
            }
        }

        // Audio
        for (
            let i = 0;
            i < data[this.state.activeQuestion].content.audio.length;
            i++
        ) {
            if (
                data[this.state.activeQuestion].content.audio[i].audio !== null
            ) {
                form_data.append(
                    `type2_audio_${i + 1}_title`,
                    data[this.state.activeQuestion].content.audio[i].title
                );
                form_data.append(
                    `type2_audio_${i + 1}`,
                    data[this.state.activeQuestion].content.audio[i].audio
                );
            } else {
                continue;
            }
        }

        if (data[this.state.activeQuestion].question_random_id === "") {
            this.handlePOST(form_data);
        } else {
            this.handlePUT(form_data);
        }
    };

    handlePOST = (data) => {
        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.authToken,
            },
        };

        axios
            .post(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/${this.chapterId}/typetwo/`,
                data,
                options
            )
            .then((result) => {
                console.log(result);
                if (result.data.sts === true) {
                    this.setState(
                        {
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            page_loading: false,
                        },
                        () => {
                            this.setState({
                                showMainEdit_option: false,
                                showSubEdit_option: false,
                                contentCollapsed: true,
                                subContentCollapsed: true,
                                propertiesCollapsed: true,
                                settingsCollapsed: true,
                                activeQuestion: "",
                                activeSubQuestion: "",
                            });
                            this.loadMCQData();
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.data.detail
                            ? result.data.detail
                            : result.data.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.warn(err);
                if (err.response) {
                    this.setState({
                        errorMsg: err.response.data.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                } else if (err.request) {
                    this.setState({
                        errorMsg: err.rerequestsponse.data.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                } else if (err.message) {
                    this.setState({
                        errorMsg: err.message.data.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            });
    };

    handlePUT = (data) => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/`, {
            headers: this.headers,
            method: "PUT",
            body: JSON.stringify({
                chapter_id: this.chapterId,
                topic_num: this.topicNum,
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

    // Run the image API once the question is added
    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.isForm_submitted !== this.state.isForm_submitted &&
            this.state.isForm_submitted === true
        ) {
            this.setState({
                page_loading: true,
                showErrorAlert: false,
                showSuccessAlert: false,
                isForm_submitted: false,
            });

            const questionData = [...this.state.questions];

            let form_data = new FormData();

            form_data.append("chapter_id", this.chapterId);
            form_data.append("topic_num", this.topicNum);
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
                    "type2_video_1_title",
                    questionData[this.state.activeQuestion].content.video.title
                );
                form_data.append(
                    "type2_video_1",
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
                        `type2_image_${i + 1}_title`,
                        questionData[this.state.activeQuestion].content.images[
                            i
                        ].title
                    );
                    form_data.append(
                        `type2_image_${i + 1}`,
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
                        `type2_audio_${i + 1}_title`,
                        questionData[this.state.activeQuestion].content.audio[i]
                            .title
                    );
                    form_data.append(
                        `type2_audio_${i + 1}`,
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
                    },
                    () => {
                        this.setState({
                            showMainEdit_option: false,
                            contentCollapsed: true,
                            propertiesCollapsed: true,
                            settingsCollapsed: true,
                            page_loading: true,
                            activeQuestion: "",
                        });
                        this.loadMCQData();
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
                            page_loading: false,
                        },
                        () => {
                            this.setState({
                                showMainEdit_option: false,
                                contentCollapsed: true,
                                propertiesCollapsed: true,
                                settingsCollapsed: true,
                                page_loading: true,
                                activeQuestion: "",
                            });
                            this.loadMCQData();
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.data.detail
                            ? result.data.detail
                            : result.data.msg,
                        showErrorAlert: true,
                        page_loading: false,
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
                            page_loading: false,
                        },
                        () => {
                            this.setState({
                                showMainEdit_option: false,
                                contentCollapsed: true,
                                propertiesCollapsed: true,
                                settingsCollapsed: true,
                                page_loading: true,
                                activeQuestion: "",
                            });
                            this.loadMCQData();
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.data.detail
                            ? result.data.detail
                            : result.data.msg,
                        showErrorAlert: true,
                        page_loading: false,
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

    onSubEditorChange = (evt) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].question = evt.editor.getData();
        this.setState({
            questions: values,
        });
    };

    handleExplanation = (evt) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].explanation = evt.editor.getData();
        this.setState({
            questions: values,
        });
    };

    // -------------------------- Options --------------------------

    handleOptions_mcq = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].mcq = !values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].mcq;
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].fill_in = false;
        this.setState({
            questions: values,
        });
    };

    handleOptions_fillin = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].fill_in = !values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].fill_in;
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].mcq = false;
        this.setState({
            questions: values,
        });
    };

    correctOption = (index) => {
        const values = [...this.state.questions];
        if (
            values[this.state.activeQuestion].sub_question[
                this.state.activeSubQuestion
            ].options[index].content !== ""
        ) {
            values[this.state.activeQuestion].sub_question[
                this.state.activeSubQuestion
            ].options[index].correct = !values[this.state.activeQuestion]
                .sub_question[this.state.activeSubQuestion].options[index]
                .correct;
            this.setState({
                questions: values,
            });
        }
    };

    handleOptionChange = (index, event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].options[index].content = event.target.value;
        this.setState({
            questions: values,
        });
    };

    handleAddOptionFields = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].options.push({
            correct: false,
            content: "",
        });
        this.setState({
            questions: values,
        });
    };

    handleRemoveOptionFields = (index) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].options.splice(index, 1);
        this.setState(
            {
                questions: values,
            },
            () => {
                if (
                    values[this.state.activeQuestion].sub_question[
                        this.state.activeSubQuestion
                    ].options.length === 0
                ) {
                    values[this.state.activeQuestion].sub_question[
                        this.state.activeSubQuestion
                    ].options.push({
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
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].fillin_answer[index] = event.target.value;
        this.setState({
            questions: values,
        });
    };

    handleAddAnswerFields = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].fillin_answer.push("");
        this.setState({
            questions: values,
        });
    };

    handleRemoveAnswerFields = (index) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].sub_question[
            this.state.activeSubQuestion
        ].fillin_answer.splice(index, 1);
        this.setState(
            {
                questions: values,
            },
            () => {
                if (
                    values[this.state.activeQuestion].sub_question[
                        this.state.activeSubQuestion
                    ].fillin_answer.length === 0
                ) {
                    values[this.state.activeQuestion].sub_question[
                        this.state.activeSubQuestion
                    ].fillin_answer.push("");
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

    handleRemoveImageFields = (index) => {
        const values = [...this.state.questions];

        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
        });

        if (
            values[this.state.activeQuestion].question_random_id !== "" &&
            values[this.state.activeQuestion].is_image_uploaded === true
        ) {
            let body = {
                chapter_id: this.chapterId,
                topic_num: this.topicNum,
                question_random_id:
                    values[this.state.activeQuestion].question_random_id,
            };
            body[`type2_image_${index + 1}_title`] =
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
                            showSuccessAlert: true,
                        });
                        values[this.state.activeQuestion].content.images[
                            index
                        ] = { title: "", file_name: "", image: null, path: "" };
                        this.setState({
                            questions: values,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            values[this.state.activeQuestion].content.images[index] = {
                title: "",
                file_name: "",
                image: null,
                path: "",
            };
            this.setState({
                questions: values,
            });
        }
    };

    handleImageFile = (index, event) => {
        this.setState({
            showErrorAlert: false,
        });

        const values = [...this.state.questions];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(jpg|jpeg|png|webp)$/)) {
            this.setState({
                errorMsg: "Please select valid image file",
                showErrorAlert: true,
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
                showErrorAlert: false,
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
            {
                title: "",
                file_name: "",
                image: null,
                path: "",
            },
            {
                title: "",
                file_name: "",
                image: null,
                path: "",
            },
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
            showErrorAlert: false,
        });

        let values = [...this.state.questions];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(mpeg|flv|avi|mov|mp4|mkv)$/)) {
            this.setState({
                errorMsg: "Please select valid video file",
                showErrorAlert: true,
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
                showErrorAlert: false,
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
                        topic_num: this.topicNum,
                        question_random_id:
                            values[this.state.activeQuestion]
                                .question_random_id,
                        type2_video_1_title:
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
                            showSuccessAlert: true,
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
                            showErrorAlert: true,
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

    handleRemoveAudioFields = (index) => {
        const values = [...this.state.questions];

        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
        });

        if (
            values[this.state.activeQuestion].question_random_id !== "" &&
            values[this.state.activeQuestion].is_image_uploaded === true
        ) {
            let body = {
                chapter_id: this.chapterId,
                topic_num: this.topicNum,
                question_random_id:
                    values[this.state.activeQuestion].question_random_id,
            };
            body[`type2_audio_${index + 1}_title`] =
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
                            showSuccessAlert: true,
                        });
                        values[this.state.activeQuestion].content.audio[
                            index
                        ] = {
                            title: "",
                            file_name: "",
                            audio: null,
                            path: "",
                        };
                        this.setState({
                            questions: values,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            values[this.state.activeQuestion].content.audio[index] = {
                title: "",
                file_name: "",
                audio: null,
                path: "",
            };
            this.setState({
                questions: values,
            });
        }
    };

    handleAudioFile = (index, event) => {
        this.setState({
            showErrorAlert: false,
        });

        const values = [...this.state.questions];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(wav|mp3)$/)) {
            this.setState({
                errorMsg: "Please select valid audio file",
                showErrorAlert: true,
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
                showErrorAlert: false,
            });
        }
    };

    clearAudios = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.audio = [
            { title: "", file_name: "", audio: null, path: "" },
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
            values[this.state.activeQuestion].sub_question[
                this.state.activeSubQuestion
            ].marks = event.target.value;
        } else if (type === "negative_marks") {
            values[this.state.activeQuestion].sub_question[
                this.state.activeSubQuestion
            ].negative_marks = event.target.value;
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
            question: "<p>Main Question goes here</p>",
            question_random_id: "",
            is_image_uploaded: false,
            sub_question: [
                {
                    sub_question_id: "",
                    question: "<p>Sub question goes here</p>",
                    explanation: "<p>Explanation goes here</p>",
                    mcq: true,
                    fill_in: false,
                    fillin_answer: [""],
                    options: [
                        { correct: false, content: "" },
                        { correct: false, content: "" },
                        { correct: false, content: "" },
                        { correct: false, content: "" },
                    ],
                    marks: "",
                    negative_marks: 0,
                },
            ],
            content: {
                images: [
                    { title: "", file_name: "", image: null, path: "" },
                    { title: "", file_name: "", image: null, path: "" },
                    { title: "", file_name: "", image: null, path: "" },
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
                    { title: "", file_name: "", audio: null, path: "" },
                ],
            },
            properties: {
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

    addNewSubQuestion = (index) => {
        const values = [...this.state.questions];
        values[index].sub_question.push({
            sub_question_id: "",
            question: "<p>Sub question goes here</p>",
            explanation: "<p>Explanation goes here</p>",
            mcq: true,
            fill_in: false,
            fillin_answer: [""],
            options: [
                { correct: false, content: "" },
                { correct: false, content: "" },
                { correct: false, content: "" },
                { correct: false, content: "" },
            ],
            marks: "",
            negative_marks: 0,
        });
        this.setState({
            questions: values,
            activeQuestion: index,
            activeSubQuestion: values[index].sub_question.length - 1,
        });
    };

    // --------------- Copy question ---------------

    copyQuestions = (index) => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];

        keyboards.splice(index + 1, 0, {
            all: keyboards[index].all,
            chemistry: keyboards[index].chemistry,
            physics: keyboards[index].physics,
            maths: keyboards[index].maths,
        });
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
        const sub_question = [];
        for (let i = 0; i < values[index].sub_question.length; i++) {
            sub_question[i] = values[index].sub_question[i];
        }
        values.splice(index + 1, 0, {
            question_random_id: "",
            question: values[index].question,
            is_image_uploaded: false,
            sub_question: sub_question,
            content: {
                images: [
                    { title: "", file_name: "", image: null, path: "" },
                    { title: "", file_name: "", image: null, path: "" },
                    { title: "", file_name: "", image: null, path: "" },
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
                    { title: "", file_name: "", audio: null, path: "" },
                ],
            },
            properties: {
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
        });
        this.setState({
            questions: values,
            keyboards: keyboards,
            activeQuestion: index + 1,
        });
    };

    copySubQuestions = (main_index, sub_index) => {
        const values = [...this.state.questions];

        const options = [];
        for (
            let i = 0;
            i < values[main_index].sub_question[sub_index].options.length;
            i++
        ) {
            options[i] = {
                content:
                    values[main_index].sub_question[sub_index].options[i]
                        .content,
                correct:
                    values[main_index].sub_question[sub_index].options[i]
                        .correct,
            };
        }
        const fillin = [];
        for (
            let i = 0;
            i < values[main_index].sub_question[sub_index].fillin_answer.length;
            i++
        ) {
            fillin[i] =
                values[main_index].sub_question[sub_index].fillin_answer[i];
        }
        values[main_index].sub_question.splice(sub_index + 1, 0, {
            sub_question_id: "",
            question: values[main_index].sub_question[sub_index].question,
            explanation: values[main_index].sub_question[sub_index].explanation,
            mcq: values[main_index].sub_question[sub_index].mcq,
            fill_in: values[main_index].sub_question[sub_index].fill_in,
            fillin_answer: fillin,
            options: options,
            marks: values[main_index].sub_question[sub_index].marks,
            negative_marks:
                values[main_index].sub_question[sub_index].negative_marks,
        });
        this.setState({
            questions: values,
            activeQuestion: main_index,
            activeSubQuestion: sub_index + 1,
        });
    };

    // --------------- Edit question ---------------

    editQuestion = (index) => {
        this.setState({
            showMainEdit_option: true,
            showSubEdit_option: false,
            activeQuestion: index,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
    };

    editSubQuestion = (main_index, sub_index) => {
        this.setState({
            showMainEdit_option: false,
            showSubEdit_option: true,
            activeQuestion: main_index,
            activeSubQuestion: sub_index,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
    };

    // --------------- Delete question ---------------

    deleteQuestion = (index) => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];
        this.setState({
            showMainEdit_option: false,
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
                            question: "<p>Main Question goes here</p>",
                            question_random_id: "",
                            is_image_uploaded: false,
                            sub_question: [
                                {
                                    sub_question_id: "",
                                    question: "<p>Sub question goes here</p>",
                                    explanation: "<p>Explanation goes here</p>",
                                    mcq: true,
                                    fill_in: false,
                                    fillin_answer: [""],
                                    options: [
                                        { correct: false, content: "" },
                                        { correct: false, content: "" },
                                        { correct: false, content: "" },
                                        { correct: false, content: "" },
                                    ],
                                    marks: "",
                                    negative_marks: 0,
                                },
                            ],
                            content: {
                                images: [
                                    {
                                        title: "",
                                        file_name: "",
                                        image: null,
                                        path: "",
                                    },
                                    {
                                        title: "",
                                        file_name: "",
                                        image: null,
                                        path: "",
                                    },
                                    {
                                        title: "",
                                        file_name: "",
                                        image: null,
                                        path: "",
                                    },
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
                                    {
                                        title: "",
                                        file_name: "",
                                        audio: null,
                                        path: "",
                                    },
                                ],
                            },
                            properties: {
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

    handleMCQ_Deletion = () => {
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
                        question: "<p>Main Question goes here</p>",
                        question_random_id: "",
                        is_image_uploaded: false,
                        sub_question: [
                            {
                                sub_question_id: "",
                                question: "<p>Sub question goes here</p>",
                                explanation: "<p>Explanation goes here</p>",
                                mcq: true,
                                fill_in: false,
                                fillin_answer: [""],
                                options: [
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                    { correct: false, content: "" },
                                ],
                                marks: "",
                                negative_marks: 0,
                            },
                        ],
                        content: {
                            images: [
                                {
                                    title: "",
                                    file_name: "",
                                    image: null,
                                    path: "",
                                },
                                {
                                    title: "",
                                    file_name: "",
                                    image: null,
                                    path: "",
                                },
                                {
                                    title: "",
                                    file_name: "",
                                    image: null,
                                    path: "",
                                },
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
                                {
                                    title: "",
                                    file_name: "",
                                    audio: null,
                                    path: "",
                                },
                            ],
                        },
                        properties: {
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
        this.setState(
            {
                showMCQDelete_Modal: false,
                page_loading: true,
            },
            () => {
                this.loadMCQData();
            }
        );
    };

    deleteSubQuestion = (main_index, sub_index) => {
        const values = [...this.state.questions];
        this.setState({
            showMainEdit_option: false,
            showSubEdit_option: false,
            contentCollapsed: true,
            subContentCollapsed: true,
            propertiesCollapsed: true,
            settingsCollapsed: true,
            activeQuestion: main_index,
            activeSubQuestion: sub_index,
        });

        if (values[main_index].sub_question[sub_index].sub_question_id !== "") {
            this.setState({
                selectedQuestion: values[main_index].question_random_id,
                selectedSubQuestion:
                    values[main_index].sub_question[sub_index].sub_question_id,
                showSubMCQDelete_Modal: !this.state.showSubMCQDelete_Modal,
            });
        } else {
            values[main_index].sub_question.splice(sub_index, 1);
            this.setState(
                {
                    questions: values,
                    activeSubQuestion: "",
                },
                () => {
                    if (values[main_index].sub_question.length === 0) {
                        values[main_index].sub_question.push({
                            sub_question_id: "",
                            question: "<p>Sub question goes here</p>",
                            explanation: "<p>Explanation goes here</p>",
                            mcq: true,
                            fill_in: false,
                            fillin_answer: [""],
                            options: [
                                { correct: false, content: "" },
                                { correct: false, content: "" },
                                { correct: false, content: "" },
                                { correct: false, content: "" },
                            ],
                            marks: "",
                            negative_marks: 0,
                        });
                        this.setState({
                            questions: values,
                        });
                    }
                }
            );
        }
    };

    handleSubMCQ_Deletion = () => {
        const values = [...this.state.questions];

        values[this.state.activeQuestion].sub_question.splice(
            this.state.activeSubQuestion,
            1
        );

        this.setState(
            {
                questions: values,
                activeSubQuestion: "",
            },
            () => {
                if (
                    values[this.state.activeQuestion].sub_question.length === 0
                ) {
                    values[this.state.activeQuestion].sub_question.push({
                        sub_question_id: "",
                        question: "<p>Sub question goes here</p>",
                        explanation: "<p>Explanation goes here</p>",
                        mcq: true,
                        fill_in: false,
                        fillin_answer: [""],
                        options: [
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                        ],
                        marks: "",
                        negative_marks: 0,
                    });
                    this.setState({
                        questions: values,
                    });
                }
            }
        );
        this.setState(
            {
                showSubMCQDelete_Modal: false,
                page_loading: true,
            },
            () => {
                this.loadMCQData();
            }
        );
    };

    // -------------------------- Publishing the question --------------------------

    handlePublish = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            page_loading: true,
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
                        topic_num: this.topicNum,
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
            });
        }
    };

    render() {
        let data = [...this.state.questions];
        let boards = [...this.state.keyboards];
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

                {/* MCQ Deletion Modal */}
                {this.state.showMCQDelete_Modal ? (
                    <ContentDeleteModal
                        show={this.state.showMCQDelete_Modal}
                        onHide={this.closeMCQ_DeleteModal}
                        formSubmission={this.handleMCQ_Deletion}
                        url={`${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/`}
                        type="question"
                        name=""
                        data={{
                            chapter_id: this.chapterId,
                            topic_num: this.topicNum,
                            question_random_id: this.state.selectedQuestion,
                        }}
                        toggleModal={this.closeMCQ_DeleteModal}
                    />
                ) : null}

                {/* Sub MCQ Deletion Modal */}
                {this.state.showSubMCQDelete_Modal ? (
                    <ContentDeleteModal
                        show={this.state.showSubMCQDelete_Modal}
                        onHide={this.closeMCQ_DeleteModal}
                        formSubmission={this.handleSubMCQ_Deletion}
                        url={`${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/`}
                        type="question"
                        name=""
                        data={{
                            chapter_id: this.chapterId,
                            topic_num: this.topicNum,
                            question_random_id: this.state.selectedQuestion,
                        }}
                        toggleModal={this.closeMCQ_DeleteModal}
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
                                    this.state.showMainEdit_option ||
                                    this.state.showSubEdit_option
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
                                            {`${this.props.topic_name} - Type 2`}
                                        </h5>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex flex-wrap justify-content-end mb-4">
                                            <button
                                                className="btn btn-primary btn-sm shadow-none mr-1"
                                                onClick={this.handlePublish}
                                            >
                                                Publish
                                            </button>
                                            <button className="btn btn-primary btn-sm shadow-none mr-1">
                                                Download template
                                            </button>
                                            <button className="btn btn-primary btn-sm shadow-none">
                                                Upload template
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* -------------------- Main question -------------------- */}
                                {this.state.questions.map(
                                    (question, q_index) => {
                                        return (
                                            <div key={q_index}>
                                                <div className="row mb-3">
                                                    {/* ---------- Side buttons ---------- */}
                                                    <div className="col-md-1 mb-1 mb-md-0">
                                                        <div className="row">
                                                            <div className="col-md-12 col-3 mb-1">
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                                >
                                                                    {q_index <=
                                                                    8
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
                                                                        this.deleteQuestion(
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
                                                        <div
                                                            className={`card mb-2 shadow-sm ${
                                                                this.state
                                                                    .activeQuestion ===
                                                                q_index
                                                                    ? "border-primary"
                                                                    : ""
                                                            }`}
                                                        >
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    {/* Questions */}
                                                                    <div className="col-11 pr-md-0">
                                                                        <div className="form-group">
                                                                            <div className="card">
                                                                                <div
                                                                                    className="card-body py-2"
                                                                                    dangerouslySetInnerHTML={{
                                                                                        __html:
                                                                                            question.question,
                                                                                    }}
                                                                                ></div>
                                                                            </div>
                                                                        </div>
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
                                                        <button
                                                            className="btn btn-light bg-white btn-block shadow-sm"
                                                            onClick={() =>
                                                                this.addNewSubQuestion(
                                                                    q_index
                                                                )
                                                            }
                                                        >
                                                            Add Sub question +
                                                        </button>
                                                    </div>
                                                </div>
                                                {/* ---------- Sub question ---------- */}
                                                <div className="ml-md-5 ml-3">
                                                    {question.sub_question.map(
                                                        (
                                                            sub_question,
                                                            sub_index
                                                        ) => {
                                                            return (
                                                                <div
                                                                    className="row mb-3"
                                                                    key={
                                                                        sub_index
                                                                    }
                                                                >
                                                                    {/* ---------- Side buttons ---------- */}
                                                                    <div className="col-md-1 mb-1 mb-md-0">
                                                                        <div className="row">
                                                                            <div className="col-md-12 col-3 mb-1">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                                                >
                                                                                    {`${
                                                                                        q_index +
                                                                                        1
                                                                                    }.${
                                                                                        sub_index +
                                                                                        1
                                                                                    }`}
                                                                                </button>
                                                                            </div>
                                                                            <div className="col-md-12 col-3 mb-1">
                                                                                <button
                                                                                    type="button"
                                                                                    className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                                                    onClick={() =>
                                                                                        this.editSubQuestion(
                                                                                            q_index,
                                                                                            sub_index
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
                                                                                        this.copySubQuestions(
                                                                                            q_index,
                                                                                            sub_index
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
                                                                                        this.deleteSubQuestion(
                                                                                            q_index,
                                                                                            sub_index
                                                                                        )
                                                                                    }
                                                                                >
                                                                                    <i className="far fa-trash-alt fa-sm"></i>
                                                                                </button>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    {/* ---------- Sub Question preview ---------- */}
                                                                    <div className="col-md-11 pl-md-0">
                                                                        <div
                                                                            className={`card shadow-sm ${
                                                                                this
                                                                                    .state
                                                                                    .activeSubQuestion ===
                                                                                    sub_index &&
                                                                                this
                                                                                    .state
                                                                                    .activeQuestion ===
                                                                                    q_index
                                                                                    ? "border-primary"
                                                                                    : ""
                                                                            }`}
                                                                        >
                                                                            <div className="card-body">
                                                                                <div className="form-group">
                                                                                    <div className="card form-shadow">
                                                                                        <div
                                                                                            className="card-body py-2"
                                                                                            dangerouslySetInnerHTML={{
                                                                                                __html:
                                                                                                    sub_question.question,
                                                                                            }}
                                                                                        ></div>
                                                                                    </div>
                                                                                </div>
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
                                                                                                                className={`card form-shadow ${
                                                                                                                    options.correct
                                                                                                                        ? "success-bg"
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
                                                                            </div>
                                                                            {/* ----- Answer type tag ----- */}
                                                                            {sub_question.mcq ? (
                                                                                <div
                                                                                    className="secondary-bg primary-text font-weight-bold px-2 py-1  position-absolute rounded-lg shadow-sm"
                                                                                    style={{
                                                                                        bottom:
                                                                                            "5px",
                                                                                        right:
                                                                                            "5px",
                                                                                        fontSize:
                                                                                            "10px",
                                                                                    }}
                                                                                >
                                                                                    MCQ
                                                                                </div>
                                                                            ) : sub_question.fill_in ? (
                                                                                <div
                                                                                    className="secondary-bg primary-text font-weight-bold px-2 py-1  position-absolute rounded-lg shadow-sm"
                                                                                    style={{
                                                                                        bottom:
                                                                                            "5px",
                                                                                        right:
                                                                                            "5px",
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
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    }
                                )}

                                <button
                                    className="btn btn-primary btn-block shadow-none"
                                    onClick={this.addNewQuestion}
                                >
                                    Add +
                                </button>
                            </div>

                            {/* ---------- Main Settings column ---------- */}
                            {this.state.showMainEdit_option ? (
                                <div className="col-md-3 content-edit">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleSubmit}
                                            disabled={this.state.btnDisabled}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-link btn-sm shadow-none"
                                            onClick={() => {
                                                this.setState({
                                                    showMainEdit_option: false,
                                                    showSubEdit_option: false,
                                                    contentCollapsed: true,
                                                    subContentCollapsed: true,
                                                    propertiesCollapsed: true,
                                                    settingsCollapsed: true,
                                                    activeQuestion: "",
                                                    activeSubQuestion: "",
                                                });
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>

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

                                                    {/* ---------- Image ---------- */}

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
                                                                image_index
                                                            ) => (
                                                                <Fragment
                                                                    key={
                                                                        image_index
                                                                    }
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
                                                                            id={`image${image_index}`}
                                                                            name="image"
                                                                            placeholder={`Image title 0${
                                                                                image_index +
                                                                                1
                                                                            }`}
                                                                            value={
                                                                                options.title
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleImageTitle(
                                                                                    image_index,
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
                                                                                            image_index
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
                                                                            id={`file${image_index}`}
                                                                            accept="image/*"
                                                                            aria-describedby="inputGroupFileAddon01"
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleImageFile(
                                                                                    image_index,
                                                                                    event
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            className="custom-file-label"
                                                                            htmlFor={`file${image_index}`}
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
                                                    </div>

                                                    {/* ---------- Video ---------- */}

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
                                                                audio_index
                                                            ) => (
                                                                <Fragment
                                                                    key={
                                                                        audio_index
                                                                    }
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
                                                                            id={`audio${audio_index}`}
                                                                            name="audio"
                                                                            placeholder={`Audio title 0${
                                                                                audio_index +
                                                                                1
                                                                            }`}
                                                                            value={
                                                                                options.title
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleAudioTitle(
                                                                                    audio_index,
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
                                                                                            audio_index
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
                                                                            id={`audio${audio_index}`}
                                                                            accept="audio/*"
                                                                            aria-describedby="inputGroupFileAddon01"
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleAudioFile(
                                                                                    audio_index,
                                                                                    event
                                                                                )
                                                                            }
                                                                        />
                                                                        <label
                                                                            className="custom-file-label"
                                                                            htmlFor={`audio${audio_index}`}
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

                            {/* ---------- Sub Settings column ---------- */}
                            {this.state.showSubEdit_option ? (
                                <div className="col-md-3 content-edit">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleSubmit}
                                            disabled={this.state.btnDisabled}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-link btn-sm shadow-none"
                                            onClick={() => {
                                                this.setState({
                                                    showMainEdit_option: false,
                                                    showSubEdit_option: false,
                                                    contentCollapsed: true,
                                                    subContentCollapsed: true,
                                                    propertiesCollapsed: true,
                                                    settingsCollapsed: true,
                                                    activeQuestion: "",
                                                    activeSubQuestion: "",
                                                });
                                            }}
                                        >
                                            Close
                                        </button>
                                    </div>

                                    <Accordion defaultActiveKey="">
                                        {/* Content */}
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
                                                    Content
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
                                                                ].sub_question[
                                                                    this.state
                                                                        .activeSubQuestion
                                                                ].question
                                                            }
                                                            onChange={
                                                                this
                                                                    .onSubEditorChange
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
                                                                                .sub_question[
                                                                                this
                                                                                    .state
                                                                                    .activeSubQuestion
                                                                            ]
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
                                                                                .sub_question[
                                                                                this
                                                                                    .state
                                                                                    .activeSubQuestion
                                                                            ]
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
                                                    </div>
                                                    {data[
                                                        this.state
                                                            .activeQuestion
                                                    ].sub_question[
                                                        this.state
                                                            .activeSubQuestion
                                                    ].mcq ? (
                                                        <div className="form-group row align-items-center">
                                                            {data[
                                                                this.state
                                                                    .activeQuestion
                                                            ].sub_question[
                                                                this.state
                                                                    .activeSubQuestion
                                                            ].options.map(
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
                                                            ].sub_question[
                                                                this.state
                                                                    .activeSubQuestion
                                                            ].options.length <
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
                                                      ].sub_question[
                                                          this.state
                                                              .activeSubQuestion
                                                      ].fill_in ? (
                                                        // Fill in answers
                                                        <div className="form-group row">
                                                            {data[
                                                                this.state
                                                                    .activeQuestion
                                                            ].sub_question[
                                                                this.state
                                                                    .activeSubQuestion
                                                            ].fillin_answer.map(
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
                                                                ].sub_question[
                                                                    this.state
                                                                        .activeSubQuestion
                                                                ].explanation
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleExplanation
                                                            }
                                                        />
                                                    </div>

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
                                                                    ]
                                                                        .sub_question[
                                                                        this
                                                                            .state
                                                                            .activeSubQuestion
                                                                    ].marks
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

                                                    {/* ---------- Negative Marks ---------- */}
                                                    <div className="form-group row align-items-center">
                                                        <div className="col-4 small">
                                                            Negative Marks
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
                                                                    ]
                                                                        .sub_question[
                                                                        this
                                                                            .state
                                                                            .activeSubQuestion
                                                                    ]
                                                                        .negative_marks
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleProperties(
                                                                        event,
                                                                        "negative_marks"
                                                                    )
                                                                }
                                                                autoComplete="off"
                                                            />
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

export default connect(mapStateToProps)(Type2);
