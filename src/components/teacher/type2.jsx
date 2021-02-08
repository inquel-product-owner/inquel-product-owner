import React, { Component, Fragment } from "react";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import CKeditor from "../sharedComponents/CKeditor";
import ReactSwitch from "../sharedComponents/switchComponent";
import { Accordion, Card, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

class SubjectType1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            page_loading: true,

            contentCollapsed: true,
            propertiesCollapsed: true,
            settingsCollapsed: true,
            showEdit_option: false,
            showVirtual_keyboard: true,
            themeData: [],
            complexityData: [],
            isForm_submitted: false,

            activeQuestion: "",
            selectedImageQuestion: "",
            selectedImageData: [],
            selectedImage: "",

            keyboards: [
                { all: false, chemistry: false, physics: false, maths: false },
            ],

            questions: [
                {
                    chapter_name: this.props.match.params.chapterName,
                    topic_name: this.props.match.params.topicName,
                    question: "<p>Question goes here</p>",
                    question_random_id: "",
                    old_question: true,
                    old_image: false,
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
                            pasteUrl: "",
                        },
                        audio: [
                            { title: "", file_name: "", audio: null },
                            { title: "", file_name: "", audio: null },
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
        this.subjectId = this.props.match.params.subjectId;
        this.chapterName = this.props.match.params.chapterName;
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

    // -------------------------- Form submission --------------------------

    loadMCQData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/?chapter_name=${this.chapterName}&topic_name=${this.topicName}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
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
                                    path: response[i].files[0].type1_image_1,
                                });
                            }
                            if (response[i].files[0].type1_image_2) {
                                images.push({
                                    title:
                                        response[i].files[0]
                                            .type1_image_2_title,
                                    file_name: "",
                                    image: null,
                                    path: response[i].files[0].type1_image_2,
                                });
                            }
                            if (response[i].files[0].type1_image_3) {
                                images.push({
                                    title:
                                        response[i].files[0]
                                            .type1_image_3_title,
                                    file_name: "",
                                    image: null,
                                    path: response[i].files[0].type1_image_3,
                                });
                            }
                            if (response[i].files[0].type1_image_4) {
                                images.push({
                                    title:
                                        response[i].files[0]
                                            .type1_image_4_title,
                                    file_name: "",
                                    image: null,
                                    path: response[i].files[0].type1_image_4,
                                });
                            }

                            // audio
                            if (response[i].files[0].type1_audio_1) {
                                audio.push({
                                    title:
                                        response[i].files[0]
                                            .type1_audio_1_title,
                                    file_name: "",
                                    audio: response[i].files[0].type1_audio_1,
                                });
                            }
                            if (response[i].files[0].type1_audio_2) {
                                audio.push({
                                    title:
                                        response[i].files[0]
                                            .type1_audio_2_title,
                                    file_name: "",
                                    audio: response[i].files[0].type1_audio_2,
                                });
                            }
                        }

                        data.push({
                            chapter_name: this.props.match.params.chapterName,
                            topic_name: this.props.match.params.topicName,
                            question: response[i].question,
                            question_random_id: response[i].question_random_id,
                            old_question: true,
                            old_image: true,
                            content: {
                                mcq: response[i].mcq,
                                fill_in: response[i].fill_in,
                                boolean: response[i].boolean,
                                fillin_answer:
                                    response[i].fillin_answer.length !== 0
                                        ? response[i].fillin_answer
                                        : [""],
                                boolean_question:
                                    response[i].boolean_question.length !== 0
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
                                              { correct: false, content: "" },
                                              { correct: false, content: "" },
                                              { correct: false, content: "" },
                                              { correct: false, content: "" },
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
                                        response[i].files[0].type1_video_1_title
                                            ? response[i].files[0]
                                                  .type1_video_1_title
                                            : "",
                                    file_name: "",
                                    video: null,
                                    pasteUrl:
                                        response[i].files.length !== 0 &&
                                        response[i].files[0].type1_video_1
                                            ? response[i].files[0].type1_video_1
                                            : "",
                                },
                                audio:
                                    audio.length === 0
                                        ? [
                                              {
                                                  title: "",
                                                  file_name: "",
                                                  audio: null,
                                              },
                                              {
                                                  title: "",
                                                  file_name: "",
                                                  audio: null,
                                              },
                                          ]
                                        : audio,
                            },
                            properties: {
                                marks: response[i].properties.marks,
                                complexity: response[i].properties.complexity,
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
                            } else if (virtual_keyboard[j] === "Chemistry") {
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
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = `${this.chapterName} Type 1 MCQ - Teacher | IQLabs`;

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

        if (data[this.state.activeQuestion].question === "") {
            this.setState({
                errorMsg: "Question is required",
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
        } else if (data[this.state.activeQuestion].properties.theme === "") {
            this.setState({
                errorMsg: "Theme is reuired",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (data[this.state.activeQuestion].properties.marks === "") {
            this.setState({
                errorMsg: "Marks is required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (data[this.state.activeQuestion].properties.priority === "") {
            this.setState({
                errorMsg: "Priority is required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (
            data[this.state.activeQuestion].settings.virtual_keyboard.length ===
            0
        ) {
            this.setState({
                errorMsg: "Please select a Virtual keyboard",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            if (data[this.state.activeQuestion].old_question === true) {
                if (data[this.state.activeQuestion].question_random_id === "") {
                    delete data[this.state.activeQuestion].question_random_id;
                    if (data[this.state.activeQuestion].old_question) {
                        delete data[this.state.activeQuestion].old_question;
                    }
                    if (!data[this.state.activeQuestion].old_image) {
                        delete data[this.state.activeQuestion].old_image;
                    }
                    this.handlePOST(data);
                } else {
                    if (data[this.state.activeQuestion].old_question) {
                        delete data[this.state.activeQuestion].old_question;
                    }
                    if (data[this.state.activeQuestion].old_image) {
                        delete data[this.state.activeQuestion].old_image;
                    }
                    this.handlePUT(data);
                }
            } else {
                this.setState({
                    isForm_submitted: true,
                });
            }
        }
    };

    handlePOST = (data) => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify(data[this.state.activeQuestion]),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    data[this.state.activeQuestion].question_random_id =
                        result.question_random_id;
                    data[this.state.activeQuestion].old_question = true;
                    data[this.state.activeQuestion].old_image = false;
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
            body: JSON.stringify(data[this.state.activeQuestion]),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    data[this.state.activeQuestion].question_random_id =
                        result.question_random_id;
                    data[this.state.activeQuestion].old_question = false;
                    data[this.state.activeQuestion].old_image = true;
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

            form_data.append("chapter_name", this.chapterName);
            form_data.append("topic_name", this.topicName);
            form_data.append(
                "question_random_id",
                questionData[this.state.activeQuestion].question_random_id
            );

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
                    questionData[this.state.activeQuestion].old_image === false
                ) {
                    this.handleImgPOST(options, form_data, questionData);
                } else {
                    this.handleImgPATCH(options, form_data, questionData);
                }
            } else {
                questionData[this.state.activeQuestion].old_question = true;
                this.setState(
                    {
                        questions: questionData,
                        successMsg: "Question added",
                        showSuccessAlert: true,
                        showLoader: false,
                        page_loading: true,
                    },
                    () => {
                        setTimeout(() => {
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
                    questionData[this.state.activeQuestion].old_question = true;
                    this.setState(
                        {
                            questions: questionData,
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                            page_loading: true,
                        },
                        () => {
                            setTimeout(() => {
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
                    questionData[this.state.activeQuestion].old_question = true;
                    this.setState(
                        {
                            questions: questionData,
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                            page_loading: true,
                        },
                        () => {
                            setTimeout(() => {
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
        this.setState({
            questions: values,
        });
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
        this.setState({
            questions: values,
        });
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
        values[this.state.activeQuestion].content.images.splice(index, 1);
        this.setState({
            questions: values,
        });
    };

    handleImageFile = (index, event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.images[index].file_name =
            event.target.files[0].name;
        values[this.state.activeQuestion].content.images[
            index
        ].path = URL.createObjectURL(event.target.files[0]);
        values[this.state.activeQuestion].content.images[index].image =
            event.target.files[0];
        this.setState({
            questions: values,
        });
    };

    changeImage = (image_index, q_index) => {
        const images = [...this.state.questions];
        if (this.state.selectedImage === image_index) {
            this.setState({
                selectedImage: "",
                selectedImageQuestion: "",
                selectedImageData: [],
            });
        } else {
            this.setState({
                selectedImage: image_index,
                selectedImageQuestion: q_index,
                selectedImageData: images[q_index].content.images[image_index],
            });
        }
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
        let values = [...this.state.questions];
        values[this.state.activeQuestion].content.video.file_name =
            event.target.files[0].name;
        values[this.state.activeQuestion].content.video.video =
            event.target.files[0];
        values[this.state.activeQuestion].content.video.pasteUrl = "";
        this.setState({
            questions: values,
        });
    };

    handleVideoUrl = (event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.video.pasteUrl =
            event.target.value;
        values[this.state.activeQuestion].content.video.file_name = "";
        this.setState({
            questions: values,
        });
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

    handleAudioFile = (index, event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.audio[index].file_name =
            event.target.files[0].name;
        values[this.state.activeQuestion].content.audio[index].audio =
            event.target.files[0];
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

    // -------------------------- Adding new question --------------------------

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
            chapter_name: this.chapterName,
            topic_name: this.topicName,
            question: "<p>Question goes here</p>",
            question_random_id: "",
            old_question: true,
            old_image: false,
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
                    pasteUrl: "",
                },
                audio: [
                    { title: "", file_name: "", audio: null },
                    { title: "", file_name: "", audio: null },
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
            activeQuestion: values.length - 1,
        });
    };

    removingQuestions = (index) => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];
        keyboards.splice(index, 1);
        values.splice(index, 1);
        this.setState({
            questions: values,
            keyboards: keyboards,
            showEdit_option: false,
            contentCollapsed: true,
            propertiesCollapsed: true,
            settingsCollapsed: true,
        });

        const questionData = [...this.state.questions];

        fetch(`${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/`, {
            method: "DELETE",
            headers: this.headers,
            body: JSON.stringify({
                chapter_name: questionData[index].chapter_name,
                topic_name: questionData[index].topic_name,
                question_random_id: questionData[index].question_random_id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                // this.setState(
                //     {
                //         page_loading: true,
                //     },
                //     () => {
                //         this.loadMCQData();
                //     }
                // );
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    copyQuestions = (index) => {
        const values = [...this.state.questions];
        const keyboards = [...this.state.keyboards];
        keyboards.push({
            all: keyboards[index].all,
            chemistry: keyboards[index].chemistry,
            physics: keyboards[index].physics,
            maths: keyboards[index].maths,
        });
        const options = [];
        for (let i = 0; i < values[index].content.options.length; i++) {
            options[i] = values[index].content.options[i];
        }
        const fillin = [];
        for (let i = 0; i < values[index].content.fillin_answer.length; i++) {
            fillin[i] = values[index].content.fillin_answer[i];
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
        values.push({
            chapter_name: this.chapterName,
            topic_name: this.topicName,
            question: values[index].question,
            question_random_id: "",
            old_question: true,
            old_image: false,
            content: {
                mcq: values[index].content.mcq,
                fill_in: values[index].content.fill_in,
                boolean: values[index].content.boolean,
                fillin_answer: fillin,
                boolean_question: values[index].content.boolean_question,
                options: options,
                explanation: values[index].content.explanation,
                images: [{ title: "", file_name: "", image: null, path: "" }],
                video: {
                    title: "",
                    file_name: "",
                    video: null,
                    pasteUrl: "",
                },
                audio: [
                    { title: "", file_name: "", audio: null },
                    { title: "", file_name: "", audio: null },
                ],
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
        });
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

    render() {
        let data = [...this.state.questions];
        let boards = [...this.state.keyboards];
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject name" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

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
                                            {`${this.chapterName} - MCQ`}
                                        </h5>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex flex-wrap justify-content-end mb-4">
                                            <button className="btn btn-primary btn-sm mr-1">
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
                                                            {this.state
                                                                .questions
                                                                .length > 1 ? (
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
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* ---------- Question preview ---------- */}
                                                <div className="col-md-11 pl-md-0">
                                                    <div className="card shadow-sm">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                {/* Questions & options */}
                                                                <div
                                                                    className={`${
                                                                        this
                                                                            .state
                                                                            .selectedImageData
                                                                            .length !==
                                                                            0 &&
                                                                        this
                                                                            .state
                                                                            .selectedImageQuestion ===
                                                                            q_index
                                                                            ? "col-md-8"
                                                                            : "col-md-11 pr-md-0"
                                                                    }`}
                                                                >
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
                                                                                                <div className="card form-shadow">
                                                                                                    <div className="card-body small py-2">
                                                                                                        {options.content !==
                                                                                                        ""
                                                                                                            ? options.content
                                                                                                            : `Option 0${
                                                                                                                  index +
                                                                                                                  1
                                                                                                              }`}
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
                                                                                                        ""
                                                                                                            ? fill_in
                                                                                                            : `Answer 0${
                                                                                                                  index +
                                                                                                                  1
                                                                                                              }`}
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
                                                                                                            ? "bg-success"
                                                                                                            : "bg-white"
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
                                                                {/* image preview */}
                                                                {this.state
                                                                    .selectedImageData
                                                                    .length !==
                                                                    0 &&
                                                                this.state
                                                                    .selectedImageQuestion ===
                                                                    q_index ? (
                                                                    <div className="col-md-3 mb-2 mb-md-0 pr-md-0">
                                                                        <div
                                                                            className="card preview-img-lg bg-light shadow-sm"
                                                                            style={{
                                                                                backgroundImage: `url(${this.state.selectedImageData.path})`,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                <div className="col-md-1 d-flex justify-content-md-center justify-content-around flex-wrap">
                                                                    {question.content.images.map(
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
                                                                                    className="card preview-img-sm bg-light shadow-sm"
                                                                                    style={{
                                                                                        backgroundImage: `url(${images.path})`,
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        this.changeImage(
                                                                                            index,
                                                                                            q_index
                                                                                        )
                                                                                    }
                                                                                ></div>
                                                                            ) : (
                                                                                <div
                                                                                    key={
                                                                                        index
                                                                                    }
                                                                                    className="card preview-img-sm bg-light shadow-sm"
                                                                                ></div>
                                                                            );
                                                                        }
                                                                    )}
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
                                                                                            {data[
                                                                                                this
                                                                                                    .state
                                                                                                    .activeQuestion
                                                                                            ]
                                                                                                .content
                                                                                                .options
                                                                                                .length >
                                                                                            1
                                                                                                ? "-"
                                                                                                : ""}
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
                                                                        className="btn btn-light btn-block border-secondary bg-white btn-sm"
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
                                                                                            {data[
                                                                                                this
                                                                                                    .state
                                                                                                    .activeQuestion
                                                                                            ]
                                                                                                .content
                                                                                                .fillin_answer
                                                                                                .length >
                                                                                            1
                                                                                                ? "-"
                                                                                                : ""}
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
                                                                    className="btn btn-light btn-block border-secondary bg-white btn-sm"
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
                                                    <div className="form-group">
                                                        <p className="mb-2">
                                                            Image
                                                        </p>
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
                                                                                {data[
                                                                                    this
                                                                                        .state
                                                                                        .activeQuestion
                                                                                ]
                                                                                    .content
                                                                                    .images
                                                                                    .length >
                                                                                1 ? (
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-light btn-sm shadow-none font-weight-bold"
                                                                                        onClick={() =>
                                                                                            this.handleRemoveImageFields(
                                                                                                index
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        -
                                                                                    </button>
                                                                                ) : (
                                                                                    <button
                                                                                        type="button"
                                                                                        className="btn btn-light btn-sm"
                                                                                    ></button>
                                                                                )}
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
                                                            id="passwordHelpBlock"
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
                                                                    className="btn btn-light btn-block border-secondary bg-white btn-sm"
                                                                    onClick={
                                                                        this
                                                                            .handleAddImageFields
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
                                                    <div className="form-group">
                                                        <p className="mb-2">
                                                            Video
                                                        </p>
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
                                                            id="passwordHelpBlock"
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
                                                            className="form-control form-control-sm border-secondary"
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
                                                                    .pasteUrl
                                                            }
                                                        />
                                                    </div>

                                                    {/* ---------- Audio ---------- */}
                                                    <div className="form-group">
                                                        <p className="mb-2">
                                                            Audio
                                                        </p>
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
                                                                    <input
                                                                        type="text"
                                                                        className="form-control form-control-sm border-secondary mb-1"
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
                                                            id="passwordHelpBlock"
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

export default SubjectType1;