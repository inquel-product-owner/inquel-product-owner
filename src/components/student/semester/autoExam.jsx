import React, { Component } from "react";
import Header from "../shared/examNavbar";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";
import AlertBox from "../../sharedComponents/alert";
import Loading from "../../sharedComponents/loader";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";

class SemesterAutoExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject_name: "",
            semesterExamItem: [],
            questionSection: [],
            answerSection: [],
            examInfo: [],
            currentSectionIndex: 0,
            totalSubQuestion: [],
            currentSubQuestionIndex: [],

            selectedImageData: [],
            startIndex: 0,
            isLightBoxOpen: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,

            time: {},
            seconds: 0,
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);

        this.subjectId = this.props.match.params.subjectId;
        this.semesterId = this.props.match.params.semesterId;
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    // ---------- Loading the data ----------

    // creates section structure for exam submission
    loopAnswerSection = () => {
        const sections = this.state.semesterExamItem.auto_test || [];
        let temp = [...this.state.answerSection];
        let questions = [];

        if (localStorage.getItem("data")) {
            temp = JSON.parse(localStorage.getItem("data"));
        } else {
            if (sections.length !== 0) {
                sections.forEach((data) => {
                    questions = [];
                    data.questions.forEach((question) => {
                        if (question.sub_question === undefined) {
                            questions.push({
                                question_random_id: question.question_random_id,
                                answer: [],
                            });
                        } else if (question.sub_question !== undefined) {
                            let sub_question = [];
                            question.sub_question.forEach((sub_data) => {
                                sub_question.push({
                                    sub_question_id: sub_data.sub_question_id,
                                    answer: [],
                                });
                            });
                            questions.push({
                                question_random_id: question.question_random_id,
                                sub_question: sub_question,
                            });
                        }
                    });
                    temp.push({
                        section_id: data.section_id,
                        questions: questions,
                    });
                });
            }
        }
        this.setState({
            answerSection: temp,
        });
    };

    // loads sections and question data
    loadSemesterExamData = async () => {
        await fetch(
            `${this.url}/student/subject/${this.subjectId}/semester/${this.semesterId}/auto/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                let sections = [];
                let questions = [];
                let images = [];
                let sub_question = [];
                let totalSubQuestion = [];
                let currentSubQuestionIndex = [];
                if (result.sts === true) {
                    var duration = "";
                    let response = result.data.auto_test;
                    if (localStorage.getItem("duration")) {
                        duration = localStorage.getItem("duration");
                    } else if (result.data.auto_test_duration !== undefined) {
                        duration = result.data.auto_test_duration * 60;
                    } else {
                        duration = 0;
                    }
                    if (response.length !== 0) {
                        response.forEach((data) => {
                            questions = [];
                            let total = [];
                            let current = [];
                            for (let i = 0; i < data.questions.length; i++) {
                                // <!----- Type 1 ----->
                                if (
                                    data.questions[i].sub_question === undefined
                                ) {
                                    images = [];
                                    total.push(0);
                                    current.push(0);
                                    if (
                                        data.questions[i].files !== undefined &&
                                        data.questions[i].files.length !== 0
                                    ) {
                                        // image
                                        if (
                                            data.questions[i].files[0]
                                                .type1_image_1
                                        ) {
                                            images.push({
                                                title:
                                                    data.questions[i].files[0]
                                                        .type1_image_1_title,
                                                file_name: "",
                                                image: null,
                                                path:
                                                    data.questions[i].files[0]
                                                        .type1_image_1,
                                            });
                                        }
                                        if (
                                            data.questions[i].files[0]
                                                .type1_image_2
                                        ) {
                                            images.push({
                                                title:
                                                    data.questions[i].files[0]
                                                        .type1_image_2_title,
                                                file_name: "",
                                                image: null,
                                                path:
                                                    data.questions[i].files[0]
                                                        .type1_image_2,
                                            });
                                        }
                                        if (
                                            data.questions[i].files[0]
                                                .type1_image_3
                                        ) {
                                            images.push({
                                                title:
                                                    data.questions[i].files[0]
                                                        .type1_image_3_title,
                                                file_name: "",
                                                image: null,
                                                path:
                                                    data.questions[i].files[0]
                                                        .type1_image_3,
                                            });
                                        }
                                        if (
                                            data.questions[i].files[0]
                                                .type1_image_4
                                        ) {
                                            images.push({
                                                title:
                                                    data.questions[i].files[0]
                                                        .type1_image_4_title,
                                                file_name: "",
                                                image: null,
                                                path:
                                                    data.questions[i].files[0]
                                                        .type1_image_4,
                                            });
                                        }
                                    }

                                    questions.push({
                                        type: "type_1",
                                        question: data.questions[i].question,
                                        question_random_id:
                                            data.questions[i]
                                                .question_random_id,
                                        content: {
                                            mcq: data.questions[i].mcq || false,
                                            mcq_answers:
                                                data.questions[i].mcq_answers ||
                                                1,
                                            fill_in:
                                                data.questions[i].fill_in ||
                                                false,
                                            boolean:
                                                data.questions[i].boolean ||
                                                false,
                                            boolean_question: [
                                                {
                                                    content: "True",
                                                },
                                                {
                                                    content: "False",
                                                },
                                            ],
                                            options:
                                                data.questions[i].options !==
                                                    undefined &&
                                                data.questions[i].options
                                                    .length !== 0
                                                    ? data.questions[i].options
                                                    : [
                                                          {
                                                              content: "",
                                                          },
                                                          {
                                                              content: "",
                                                          },
                                                          {
                                                              content: "",
                                                          },
                                                          {
                                                              content: "",
                                                          },
                                                      ],
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
                                } else if (
                                    data.questions[i].sub_question !== undefined
                                ) {
                                    images = [];
                                    sub_question = [];
                                    total.push(
                                        data.questions[i].sub_question.length
                                    );
                                    current.push(0);

                                    // Image
                                    if (data.questions[i].files !== undefined) {
                                        if (
                                            Object.entries(
                                                data.questions[i].files
                                            ).length !== 0
                                        ) {
                                            if (
                                                data.questions[i].files
                                                    .type2_image_1
                                            ) {
                                                images.push({
                                                    title:
                                                        data.questions[i].files
                                                            .type2_image_1_title,
                                                    file_name: "",
                                                    image: null,
                                                    path:
                                                        data.questions[i].files
                                                            .type2_image_1,
                                                });
                                            }
                                            if (
                                                data.questions[i].files
                                                    .type2_image_2
                                            ) {
                                                images.push({
                                                    title:
                                                        data.questions[i].files
                                                            .type2_image_2_title,
                                                    file_name: "",
                                                    image: null,
                                                    path:
                                                        data.questions[i].files
                                                            .type2_image_2,
                                                });
                                            }
                                            if (
                                                data.questions[i].files
                                                    .type2_image_3
                                            ) {
                                                images.push({
                                                    title:
                                                        data.questions[i].files
                                                            .type2_image_3_title,
                                                    file_name: "",
                                                    image: null,
                                                    path:
                                                        data.questions[i].files
                                                            .type2_image_3,
                                                });
                                            }
                                            if (
                                                data.questions[i].files
                                                    .type2_image_4
                                            ) {
                                                images.push({
                                                    title:
                                                        data.questions[i].files
                                                            .type2_image_4_title,
                                                    file_name: "",
                                                    image: null,
                                                    path:
                                                        data.questions[i].files
                                                            .type2_image_4,
                                                });
                                            }
                                        }
                                    }

                                    // Sub question
                                    for (
                                        let k = 0;
                                        k <
                                        data.questions[i].sub_question.length;
                                        k++
                                    ) {
                                        sub_question.push({
                                            sub_question_id:
                                                data.questions[i].sub_question[
                                                    k
                                                ].sub_question_id,
                                            question:
                                                data.questions[i].sub_question[
                                                    k
                                                ].question,
                                            mcq:
                                                data.questions[i].sub_question[
                                                    k
                                                ].mcq || false,
                                            fill_in:
                                                data.questions[i].sub_question[
                                                    k
                                                ].fill_in || false,
                                            options:
                                                data.questions[i].sub_question[
                                                    k
                                                ].options !== undefined
                                                    ? data.questions[i]
                                                          .sub_question[k]
                                                          .options.length !== 0
                                                        ? data.questions[i]
                                                              .sub_question[k]
                                                              .options
                                                        : ""
                                                    : "",
                                        });
                                    }

                                    // Main question
                                    questions.push({
                                        type: "type_2",
                                        question: data.questions[i].question,
                                        question_random_id:
                                            data.questions[i]
                                                .question_random_id,
                                        sub_question: sub_question,
                                        content: {
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
                                }
                            }
                            totalSubQuestion.push(total);
                            currentSubQuestionIndex.push(current);
                            sections.push(questions);
                        });
                    }
                    this.setState(
                        {
                            semesterExamItem: result.data,
                            questionSection: sections,
                            totalSubQuestion: totalSubQuestion,
                            currentSubQuestionIndex: currentSubQuestionIndex,
                            seconds: duration,
                        },
                        () => {
                            this.loopAnswerSection();
                            this.loadExamInfo();
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

    // loads exam start and end time info
    loadExamInfo = () => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/semester/${this.semesterId}/auto/start/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        examInfo: result.data,
                        page_loading: false,
                    });
                    this.startTimer();
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

    // loads subject info
    componentDidMount = () => {
        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });

        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subject_name: result.data.subject_name,
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

        this.loadSemesterExamData();
    };

    // ---------- Submitting the data ----------

    handleSubmit = () => {
        this.setState({
            page_loading: true,
        });
        clearInterval(this.timer)

        fetch(
            `${this.url}/student/subject/${this.subjectId}/semester/${this.semesterId}/auto/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    sections: this.state.answerSection,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                        },
                        () => {
                            localStorage.removeItem("duration");
                            setTimeout(() => {
                                this.setState({
                                    page_loading: false,
                                });
                                localStorage.removeItem("data");
                                this.props.history.goBack();
                            }, 1000);
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

    // ---------- Navigation ----------

    handleNext = async () => {
        await this.setState({
            currentSectionIndex: this.state.currentSectionIndex + 1,
        });
        window.MathJax.typeset();
    };

    handlePrev = async () => {
        await this.setState({
            currentSectionIndex: this.state.currentSectionIndex - 1,
        });
        window.MathJax.typeset();
    };

    handleSubQPrev = async (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[this.state.currentSectionIndex][main_index] =
            index[this.state.currentSectionIndex][main_index] - 1;
        await this.setState({
            currentSubQuestionIndex: index,
        });
        window.MathJax.typeset();
    };

    handleSubQNext = async (main_index) => {
        let index = this.state.currentSubQuestionIndex;
        index[this.state.currentSectionIndex][main_index] =
            index[this.state.currentSectionIndex][main_index] + 1;
        await this.setState({
            currentSubQuestionIndex: index,
        });
        window.MathJax.typeset();
    };

    // ---------- handle option selection ----------

    handleMCQ = (event, index, type) => {
        let sections = [...this.state.answerSection];
        if (type === "checkbox") {
            if (event.target.checked) {
                sections[this.state.currentSectionIndex].questions[
                    index
                ].answer.push(event.target.value);
                this.setState({
                    sections: sections,
                });
                localStorage.setItem("data", JSON.stringify(sections));
            } else {
                sections[this.state.currentSectionIndex].questions[
                    index
                ].answer.splice(
                    sections[this.state.currentSectionIndex].questions[
                        index
                    ].answer.indexOf(event.target.value),
                    1
                );
                this.setState({
                    sections: sections,
                });
                localStorage.setItem("data", JSON.stringify(sections));
            }
        } else if (type === "radio") {
            sections[this.state.currentSectionIndex].questions[
                index
            ].answer[0] = event.target.value;
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        }
    };

    handleFillin = (event, index) => {
        let sections = [...this.state.answerSection];
        if (event.target.value !== "") {
            sections[this.state.currentSectionIndex].questions[
                index
            ].answer[0] = event.target.value;
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        } else {
            sections[this.state.currentSectionIndex].questions[
                index
            ].answer = [];
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        }
    };

    handleBoolean = (event, index) => {
        let sections = [...this.state.answerSection];
        sections[this.state.currentSectionIndex].questions[index].answer[0] =
            event.target.value;
        this.setState({
            sections: sections,
        });
        localStorage.setItem("data", JSON.stringify(sections));
    };

    // ---------- Drag and drop ----------

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
        const sections = [...this.state.answerSection];

        var areaNode = document.getElementById("drop-area");
        areaNode.classList.toggle("over");

        let data = event.dataTransfer.getData("data") || null;
        let index = event.dataTransfer.getData("index") || null;
        if (data !== null && index !== null) {
            sections[this.state.currentSectionIndex].questions[
                index
            ].sub_question[
                this.state.currentSubQuestionIndex[
                    this.state.currentSectionIndex
                ][index]
            ].answer[0] = data;
        }

        this.setState({
            sections: sections,
        });
        localStorage.setItem("data", JSON.stringify(sections));
    };

    handleDropFillin = (event, index) => {
        let sections = [...this.state.answerSection];
        if (event.target.value !== "") {
            sections[this.state.currentSectionIndex].questions[
                index
            ].sub_question[
                this.state.currentSubQuestionIndex[
                    this.state.currentSectionIndex
                ][index]
            ].answer[0] = event.target.value;
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        } else {
            sections[this.state.currentSectionIndex].questions[
                index
            ].sub_question[
                this.state.currentSubQuestionIndex[
                    this.state.currentSectionIndex
                ][index]
            ].answer = [];
            this.setState({
                sections: sections,
            });
            localStorage.setItem("data", JSON.stringify(sections));
        }
    };

    handleDragEnter = (event) => {
        var node = document.getElementById("drop-area");
        node.classList.toggle("over");
    };

    handleDragLeave = (event) => {
        var node = document.getElementById("drop-area");
        node.classList.toggle("over");
    };

    // ---------- Countdown Timer ----------

    secondsToTime(secs) {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            h: hours,
            m: minutes,
            s: seconds,
        };
        return obj;
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000);
        }
    }

    countDown() {
        // Remove one second, set state so a re-render happens.
        let seconds = this.state.seconds - 1;
        this.setState({
            time: this.secondsToTime(seconds),
            seconds: seconds,
        });
        // localStorage.setItem("duration", seconds);

        // Check if we're at zero.
        if (seconds === 0) {
            clearInterval(this.timer);
            this.handleSubmit();
        }
    }

    // ---------- Image viewer ----------

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

    // ---------- Question rendering ----------

    typeOneRender = (data, index, answerSection) => {
        return (
            <div
                className="d-flex align-items-start justify-content mb-3"
                key={index}
            >
                <button className="btn btn-light light-bg btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg">
                    {index <= 8 ? `0${index + 1}` : index + 1}
                </button>
                <div className="card light-bg shadow-sm w-100">
                    <div className="card-body">
                        <div className="d-flex">
                            {/* Questions & options */}
                            <div className="w-100">
                                <div
                                    className="mb-3"
                                    dangerouslySetInnerHTML={{
                                        __html: data.question,
                                    }}
                                ></div>

                                <div className="row small">
                                    {/* ----- MCQ ----- */}
                                    {data.content.mcq === true ? (
                                        data.content.options.map(
                                            (option, option_index) => {
                                                return (
                                                    <div
                                                        className="col-md-6 mb-3"
                                                        key={option_index}
                                                    >
                                                        <div className="card card-body secondary-bg shadow-sm p-3">
                                                            {data.content
                                                                .mcq_answers !==
                                                            undefined ? (
                                                                data.content
                                                                    .mcq_answers >
                                                                1 ? (
                                                                    <div className="custom-control custom-checkbox">
                                                                        <input
                                                                            type="checkbox"
                                                                            className="custom-control-input"
                                                                            id={`customCheck1${index}-${option_index}`}
                                                                            value={
                                                                                option.content
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleMCQ(
                                                                                    event,
                                                                                    index,
                                                                                    "checkbox"
                                                                                )
                                                                            }
                                                                            checked={
                                                                                answerSection.length !==
                                                                                0
                                                                                    ? answerSection[
                                                                                          index
                                                                                      ]
                                                                                          .answer
                                                                                          .length !==
                                                                                      0
                                                                                        ? answerSection[
                                                                                              index
                                                                                          ].answer.includes(
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
                                                                            htmlFor={`customCheck1${index}-${option_index}`}
                                                                        >
                                                                            {
                                                                                option.content
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                ) : (
                                                                    <div className="custom-control custom-radio">
                                                                        <input
                                                                            type="radio"
                                                                            id={`customRadio1${index}-${option_index}`}
                                                                            name={`customRadio${index}`}
                                                                            className="custom-control-input"
                                                                            value={
                                                                                option.content
                                                                            }
                                                                            onChange={(
                                                                                event
                                                                            ) =>
                                                                                this.handleMCQ(
                                                                                    event,
                                                                                    index,
                                                                                    "radio"
                                                                                )
                                                                            }
                                                                            checked={
                                                                                answerSection.length !==
                                                                                0
                                                                                    ? answerSection[
                                                                                          index
                                                                                      ]
                                                                                          .answer
                                                                                          .length !==
                                                                                      0
                                                                                        ? answerSection[
                                                                                              index
                                                                                          ].answer.includes(
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
                                                                            htmlFor={`customRadio1${index}-${option_index}`}
                                                                        >
                                                                            {
                                                                                option.content
                                                                            }
                                                                        </label>
                                                                    </div>
                                                                )
                                                            ) : (
                                                                ""
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : // ----- True or false -----
                                    data.content.boolean === true ? (
                                        data.content.boolean_question.map(
                                            (option, boolean_index) => {
                                                return (
                                                    <div
                                                        className="col-md-6 mb-3"
                                                        key={boolean_index}
                                                    >
                                                        <div className="card card-body secondary-bg shadow-sm p-3">
                                                            <div className="custom-control custom-radio">
                                                                <input
                                                                    type="radio"
                                                                    id={`customRadio1${index}-${boolean_index}`}
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
                                                                        answerSection.length !==
                                                                        0
                                                                            ? answerSection[
                                                                                  index
                                                                              ]
                                                                                  .answer
                                                                                  .length !==
                                                                              0
                                                                                ? answerSection[
                                                                                      index
                                                                                  ].answer.includes(
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
                                                                    htmlFor={`customRadio1${index}-${boolean_index}`}
                                                                >
                                                                    {
                                                                        option.content
                                                                    }
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : // ----- Fill in answers -----
                                    data.content.fill_in === true ? (
                                        <div
                                            className="col-md-6 mb-3"
                                            key={index}
                                        >
                                            <input
                                                type="text"
                                                name="fill_in"
                                                className="form-control borders"
                                                placeholder="Type your answer here"
                                                value={
                                                    answerSection.length !== 0
                                                        ? answerSection[index]
                                                              .answer.length !==
                                                          0
                                                            ? answerSection[
                                                                  index
                                                              ].answer[0]
                                                            : ""
                                                        : ""
                                                }
                                                onChange={(event) =>
                                                    this.handleFillin(
                                                        event,
                                                        index
                                                    )
                                                }
                                                autoComplete="off"
                                            />
                                        </div>
                                    ) : null}
                                </div>

                                {/* ----- Multiple choice notes ----- */}
                                {data.content.mcq_answers !== undefined ? (
                                    data.content.mcq_answers > 1 ? (
                                        <div className="small">
                                            <b>Note:</b>{" "}
                                            {data.content.mcq_answers} answers
                                            are correct
                                        </div>
                                    ) : null
                                ) : null}
                            </div>
                            {/* <!----- Image viewer -----> */}
                            {data.content.images[0].path !== ""
                                ? this.imageRender(data)
                                : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    typeTwoRender = (data, index, answerSection) => {
        let isAnswerAvailable = [];
        answerSection.forEach((item1) => {
            let temp = false;
            item1.sub_question.forEach((item2) => {
                if (item2.answer.length !== 0) {
                    temp = true;
                }
            });
            isAnswerAvailable.push(temp);
        });
        return (
            <div className="d-flex align-items-start mb-3" key={index}>
                <button className="btn btn-light light-bg btn-sm border-0 shadow-sm mr-1 px-3 font-weight-bold-600 rounded-lg">
                    {index <= 8 ? `0${index + 1}` : index + 1}
                </button>
                <div className="card light-bg shadow-sm w-100">
                    <div className="card-body">
                        <div className="d-flex">
                            <div className="w-100">
                                {/* ---------- Main Question ---------- */}
                                <div
                                    className="mb-4"
                                    dangerouslySetInnerHTML={{
                                        __html: data.question,
                                    }}
                                ></div>
                                <div className="row mb-3">
                                    {/* ---------- Drop area ---------- */}
                                    <div className="col-md-6">
                                        <div
                                            id="drop-area"
                                            className="position-relative p-3"
                                            onDragOver={(e) =>
                                                e.preventDefault()
                                            }
                                            onDrop={(e) => this.handleDrop(e)}
                                            onDragEnter={(e) =>
                                                this.handleDragEnter(e)
                                            }
                                            onDragLeave={(e) =>
                                                this.handleDragLeave(e)
                                            }
                                        >
                                            {isAnswerAvailable[index] ===
                                            false ? (
                                                <div
                                                    id="drop-here"
                                                    draggable={false}
                                                >
                                                    <i className="fas fa-arrows-alt mr-2"></i>{" "}
                                                    Drop answer here...
                                                </div>
                                            ) : (
                                                <>
                                                    {answerSection.length !== 0
                                                        ? answerSection[
                                                              index
                                                          ].sub_question.map(
                                                              (
                                                                  sub_answer,
                                                                  answer_index
                                                              ) => {
                                                                  return sub_answer
                                                                      .answer
                                                                      .length !==
                                                                      0 ? (
                                                                      <div
                                                                          className="card shadow-sm mb-2 pinkrange-bg"
                                                                          key={
                                                                              answer_index
                                                                          }
                                                                      >
                                                                          <div className="card-body small font-weight-bold-600 primary-text py-3">
                                                                              {
                                                                                  sub_answer
                                                                                      .answer[0]
                                                                              }
                                                                          </div>
                                                                      </div>
                                                                  ) : (
                                                                      ""
                                                                  );
                                                              }
                                                          )
                                                        : ""}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {/* ---------- Sub question ---------- */}
                                    <div className="col-md-6">
                                        <div className="d-flex align-items-start justify-content">
                                            <button className="btn secondary-bg btn-sm shadow-sm mr-1 mt-1 px-3 font-weight-bold-600 rounded-lg">
                                                {this.state
                                                    .currentSubQuestionIndex[
                                                    this.state
                                                        .currentSectionIndex
                                                ][index] + 1}
                                            </button>

                                            <div className="card bg-transparent w-100">
                                                <div className="card secondary-bg py-2 px-3 mb-2">
                                                    <div
                                                        dangerouslySetInnerHTML={{
                                                            __html:
                                                                data
                                                                    .sub_question[
                                                                    this.state
                                                                        .currentSubQuestionIndex[
                                                                        this
                                                                            .state
                                                                            .currentSectionIndex
                                                                    ][index]
                                                                ].question,
                                                        }}
                                                    ></div>
                                                </div>
                                                {/* Multiple choice question */}
                                                {data.sub_question[
                                                    this.state
                                                        .currentSubQuestionIndex[
                                                        this.state
                                                            .currentSectionIndex
                                                    ][index]
                                                ].mcq
                                                    ? data.sub_question[
                                                          this.state
                                                              .currentSubQuestionIndex[
                                                              this.state
                                                                  .currentSectionIndex
                                                          ][index]
                                                      ].options.map(
                                                          (
                                                              options,
                                                              option_index
                                                          ) => {
                                                              return (
                                                                  <div
                                                                      className="card shadow-sm mb-2 pinkrange-bg"
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
                                                {data.sub_question[
                                                    this.state
                                                        .currentSubQuestionIndex[
                                                        this.state
                                                            .currentSectionIndex
                                                    ][index]
                                                ].fill_in ? (
                                                    <input
                                                        type="text"
                                                        name="fill_in"
                                                        className="form-control borders"
                                                        placeholder="Type your answer here"
                                                        value={
                                                            answerSection[index]
                                                                .sub_question
                                                                .length !== 0
                                                                ? answerSection[
                                                                      index
                                                                  ]
                                                                      .sub_question[
                                                                      this.state
                                                                          .currentSubQuestionIndex[
                                                                          this
                                                                              .state
                                                                              .currentSectionIndex
                                                                      ][index]
                                                                  ].answer[0] ||
                                                                  ""
                                                                : ""
                                                        }
                                                        onChange={(event) =>
                                                            this.handleDropFillin(
                                                                event,
                                                                index
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
                                                                this.state
                                                                    .currentSectionIndex
                                                            ][index] === 0
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        <i className="fas fa-arrow-circle-left fa-lg"></i>
                                                    </button>
                                                    <div className="border-primary small font-weight-bold-600 rounded-lg px-3 py-1 mx-3">
                                                        {this.state
                                                            .currentSubQuestionIndex[
                                                            this.state
                                                                .currentSectionIndex
                                                        ][index] + 1}{" "}
                                                        /{" "}
                                                        {
                                                            this.state
                                                                .totalSubQuestion[
                                                                this.state
                                                                    .currentSectionIndex
                                                            ][index]
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
                                                                this.state
                                                                    .currentSectionIndex
                                                            ][index] +
                                                                1 <
                                                            this.state
                                                                .totalSubQuestion[
                                                                this.state
                                                                    .currentSectionIndex
                                                            ][index]
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
                            </div>
                            {/* <!----- Image viewer -----> */}
                            {data.content.images[0].path !== ""
                                ? this.imageRender(data)
                                : ""}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    imageRender = (data) => {
        return (
            <div className="ml-3">
                {data.content.images.map((images, index) => {
                    return images.path !== "" ? (
                        <div
                            key={index}
                            className="card preview-img-circle shadow-sm"
                            style={{
                                backgroundImage: `url(${images.path})`,
                            }}
                            onClick={() =>
                                this.changeImage(data.content.images, index)
                            }
                        ></div>
                    ) : (
                        ""
                    );
                })}
            </div>
        );
    };

    render() {
        document.title = `${
            this.state.semesterExamItem.semester_name || ""
        } - Student | IQLabs`;
        const semesterExam =
            this.state.semesterExamItem.auto_test !== undefined
                ? this.state.semesterExamItem.auto_test[
                      this.state.currentSectionIndex
                  ]
                : [];
        const questionSection =
            this.state.questionSection[this.state.currentSectionIndex] || [];
        const answerSection =
            this.state.answerSection[this.state.currentSectionIndex] !==
            undefined
                ? this.state.answerSection[this.state.currentSectionIndex]
                      .questions !== undefined
                    ? this.state.answerSection[this.state.currentSectionIndex]
                          .questions
                    : []
                : [];

        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={this.state.semesterExamItem.semester_name}
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

                <div className="exam-section">
                    <div className="container-fluid">
                        {/* Header */}
                        <div className="card card-body secondary-bg primary-text font-weight-bold-600 small mb-4 py-2">
                            <div className="row align-items-center">
                                <div className="col-md-7">
                                    {semesterExam.length !== 0
                                        ? semesterExam.section_description
                                        : ""}
                                </div>
                                <div className="col-md-5">
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                            Attempt{" "}
                                            {this.state.examInfo.attempt ||
                                                0 + 1}
                                        </div>
                                        <div className="col-md-3">
                                            {
                                                this.state.semesterExamItem
                                                    .total_questions
                                            }{" "}
                                            Questions
                                        </div>
                                        <div className="col-md-3">
                                            Total marks:{" "}
                                            {
                                                this.state.semesterExamItem
                                                    .total_marks
                                            }
                                        </div>
                                        <div className="col-md-3">
                                            <div className="bg-warning text-center rounded py-2">
                                                {this.state.time.h}:
                                                {this.state.time.m}:
                                                {this.state.time.s}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ---------- Q&A ---------- */}
                        {questionSection.length !== 0
                            ? questionSection.map((data, index) => {
                                  return data.type === "type_1"
                                      ? this.typeOneRender(
                                            data,
                                            index,
                                            answerSection
                                        )
                                      : this.typeTwoRender(
                                            data,
                                            index,
                                            answerSection
                                        );
                              })
                            : null}

                        {/* ----- Navigation ----- */}
                        <div className="row align-items-center">
                            <div className="col-3">
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    disabled={
                                        this.state.currentSectionIndex === 0
                                            ? true
                                            : false
                                    }
                                    onClick={this.handlePrev}
                                >
                                    <i className="fas fa-angle-left mr-1"></i>
                                    Previous
                                </button>
                            </div>
                            <div className="col-6">
                                {this.state.currentSectionIndex ===
                                this.state.questionSection.length - 1 ? (
                                    <button
                                        className="btn btn-primary btn-block shadow-none"
                                        onClick={this.handleSubmit}
                                    >
                                        Submit
                                    </button>
                                ) : (
                                    ""
                                )}
                            </div>
                            <div className="col-3 text-right">
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    disabled={
                                        this.state.currentSectionIndex <
                                        this.state.questionSection.length - 1
                                            ? false
                                            : true
                                    }
                                    onClick={this.handleNext}
                                >
                                    Next
                                    <i className="fas fa-angle-right ml-2"></i>
                                </button>
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

export default SemesterAutoExam;
