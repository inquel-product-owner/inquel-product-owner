import React, { Component } from "react";
import Header from "../shared/examNavbar";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";
import AlertBox from "../../common/alert";
import Loading from "../../common/loader";
import Lightbox from "react-awesome-lightbox";
import "react-awesome-lightbox/build/style.css";
import { connect } from "react-redux";
import { QuestionDataFormat } from "../../common/function/dataFormating";
import storeDispatch from "../../../redux/dispatch";
import { EXAMDATA } from "../../../redux/action";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "../../common/ErrorFallback";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
    chapter_name: state.content.chapter_name,
    cycle_name: state.content.cycle_name,
    examData: state.storage.examData,
    course_name: state.content.course_name,
});

class CycleAutoExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cycleTestItem: [],
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

        this.subscriptionId = this.props.match.params.subscriptionId;
        this.courseId = this.props.match.params.courseId;
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.cycleTestId = this.props.match.params.cycleTestId;
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
        const sections = this.state.cycleTestItem.auto_test || [];
        let temp = [...this.state.answerSection];
        let questions = [];

        if (
            this.props.examData &&
            Object.keys(this.props.examData).length !== 0
        ) {
            temp = JSON.parse(this.props.examData);
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
    loadCycleTestData = async () => {
        await fetch(
            this.courseId
                ? `${this.url}/student/sub/${this.subscriptionId}/course/${this.courseId}/chapter/${this.chapterId}/cycletest/${this.cycleTestId}/auto/`
                : `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/auto/?cycle_test_id=${this.cycleTestId}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                let sections = [];
                let totalSubQuestion = [];
                let currentSubQuestionIndex = [];
                if (result.sts === true) {
                    var duration = "";
                    let response = result.data.auto_test;
                    if (localStorage.getItem("examDuration")) {
                        duration = localStorage.getItem("examDuration");
                    } else if (result.data.auto_test_duration !== undefined) {
                        duration = result.data.auto_test_duration * 60;
                    } else {
                        duration = 0;
                    }
                    if (response.length !== 0) {
                        response.forEach((data) => {
                            let questions = QuestionDataFormat(data.questions);

                            totalSubQuestion.push(questions.totalSubQuestion);
                            currentSubQuestionIndex.push(
                                questions.currentSubQuestionIndex
                            );
                            sections.push(questions.result);
                        });
                    }
                    this.setState(
                        {
                            cycleTestItem: result.data,
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
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
        window.MathJax.typeset();
    };

    // loads exam start and end time info
    loadExamInfo = () => {
        fetch(
            this.courseId
                ? `${this.url}/student/sub/${this.subscriptionId}/course/${this.courseId}/chapter/${this.chapterId}/cycletest/${this.cycleTestId}/auto/start/`
                : `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/auto/start/?cycle_test_id=${this.cycleTestId}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        examInfo: result.data,
                        page_loading: false,
                    });
                    this.startTimer();
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    // loads subject info
    componentDidMount = () => {
        document.title = `${this.props.cycle_name} : Auto - Student | IQLabs`;

        let timeLeftVar = this.secondsToTime(this.state.seconds);
        this.setState({ time: timeLeftVar });

        this.loadCycleTestData();
    };

    // ---------- Submitting the data ----------

    handleSubmit = () => {
        this.setState({
            page_loading: true,
        });
        clearInterval(this.timer);

        fetch(
            this.courseId
                ? `${this.url}/student/sub/${this.subscriptionId}/course/${this.courseId}/chapter/${this.chapterId}/cycletest/${this.cycleTestId}/auto/`
                : `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/auto/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    cycle_test_id: this.cycleTestId,
                    sections: this.state.answerSection,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                        },
                        () => {
                            localStorage.removeItem("examDuration");
                            setTimeout(() => {
                                this.setState({
                                    page_loading: false,
                                });
                                storeDispatch(EXAMDATA, {});
                                this.props.history.goBack();
                            }, 1000);
                        }
                    );
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    errorMsg: "Cannot submit test at the moment!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    // ---------- Navigation ----------

    handleNext = async () => {
        await this.setState({
            currentSectionIndex: this.state.currentSectionIndex + 1,
        });
        window.scrollTo(0, 0);
        window.MathJax.typeset();
    };

    handlePrev = async () => {
        await this.setState({
            currentSectionIndex: this.state.currentSectionIndex - 1,
        });
        window.scrollTo(0, 0);
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
            if (
                sections[this.state.currentSectionIndex].questions[
                    index
                ].answer.includes(event)
            ) {
                sections[this.state.currentSectionIndex].questions[
                    index
                ].answer.splice(
                    sections[this.state.currentSectionIndex].questions[
                        index
                    ].answer.indexOf(event),
                    1
                );
                this.setState({
                    answerSection: sections,
                });
                storeDispatch(EXAMDATA, JSON.stringify(sections));
            } else {
                sections[this.state.currentSectionIndex].questions[
                    index
                ].answer.push(event);
                this.setState({
                    answerSection: sections,
                });
                storeDispatch(EXAMDATA, JSON.stringify(sections));
            }
        } else if (type === "radio") {
            sections[this.state.currentSectionIndex].questions[
                index
            ].answer[0] = event;
            this.setState({
                answerSection: sections,
            });
            storeDispatch(EXAMDATA, JSON.stringify(sections));
        }
    };

    handleFillin = (event, index) => {
        let sections = [...this.state.answerSection];
        if (event.target.value !== "") {
            sections[this.state.currentSectionIndex].questions[
                index
            ].answer[0] = event.target.value;
            this.setState({
                answerSection: sections,
            });
            storeDispatch(EXAMDATA, JSON.stringify(sections));
        } else {
            sections[this.state.currentSectionIndex].questions[index].answer =
                [];
            this.setState({
                answerSection: sections,
            });
            storeDispatch(EXAMDATA, JSON.stringify(sections));
        }
    };

    handleBoolean = (event, index) => {
        let sections = [...this.state.answerSection];
        sections[this.state.currentSectionIndex].questions[index].answer[0] =
            event;
        this.setState({
            answerSection: sections,
        });
        storeDispatch(EXAMDATA, JSON.stringify(sections));
    };

    handleEventChange = (event, index) => {
        let sections = [...this.state.answerSection];
        if (event.target.checked) {
            sections[this.state.currentSectionIndex].questions[
                index
            ].answer.splice(
                sections[this.state.currentSectionIndex].questions[
                    index
                ].answer.indexOf(event),
                1
            );
            this.setState({
                answerSection: sections,
            });
            storeDispatch(EXAMDATA, JSON.stringify(sections));
        } else {
            sections[this.state.currentSectionIndex].questions[
                index
            ].answer.push(event);
            this.setState({
                answerSection: sections,
            });
            storeDispatch(EXAMDATA, JSON.stringify(sections));
        }
    };

    // ---------- Drag and drop ----------

    handleDragStart = (event, data, index) => {
        event.dataTransfer.setData("data", data);
        event.dataTransfer.setData("index", index);
        var node = document.getElementById(event.target.id);
        if (node !== null) {
            var crt = node.cloneNode(true);
            crt.id = event.target.id + "-copy";
            crt.classList.remove("light-bg");
            crt.classList.add("ghost-card");
            document.getElementById("root").appendChild(crt);
            event.dataTransfer.setDragImage(crt, 0, 0);
        }
    };

    handleDragEnd = (event) => {
        var id = event.target.id + "-copy";
        var node = document.getElementById(id);
        if (node !== null) {
            node.parentNode.removeChild(node);
        }
    };

    handleDrop = async (event) => {
        let sections = [...this.state.answerSection];

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

        await this.setState({
            answerSection: sections,
        });
        window.MathJax.typeset();
        storeDispatch(EXAMDATA, JSON.stringify(sections));
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
                answerSection: sections,
            });
            storeDispatch(EXAMDATA, JSON.stringify(sections));
        } else {
            sections[this.state.currentSectionIndex].questions[
                index
            ].sub_question[
                this.state.currentSubQuestionIndex[
                    this.state.currentSectionIndex
                ][index]
            ].answer = [];
            this.setState({
                answerSection: sections,
            });
            storeDispatch(EXAMDATA, JSON.stringify(sections));
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
        localStorage.setItem("examDuration", seconds);

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
            <div className="d-flex align-items-start mb-3" key={index}>
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

                                {/* ----- MCQ ----- */}
                                {data.content.mcq === true ? (
                                    (data.content.options || []).map(
                                        (option, option_index) => {
                                            return (
                                                <div
                                                    className="form-group"
                                                    key={option_index}
                                                >
                                                    <div
                                                        className="card card-body shadow-sm small font-weight-bold-600 pt-3 pb-0"
                                                        onClick={() =>
                                                            this.handleMCQ(
                                                                option.content,
                                                                index,
                                                                data.content
                                                                    .mcq_answers >
                                                                    1
                                                                    ? "checkbox"
                                                                    : "radio"
                                                            )
                                                        }
                                                    >
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
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            this.handleEventChange(
                                                                                e,
                                                                                index
                                                                            );
                                                                        }}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`customCheck1${index}-${option_index}`}
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: `<div class="mb-3">${option.content}</div>`,
                                                                        }}
                                                                    ></label>
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
                                                                        onChange={(
                                                                            e
                                                                        ) => {}}
                                                                    />
                                                                    <label
                                                                        className="custom-control-label"
                                                                        htmlFor={`customRadio1${index}-${option_index}`}
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: `<div class="mb-3">${option.content}</div>`,
                                                                        }}
                                                                    ></label>
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
                                    (data.content.boolean_question || []).map(
                                        (option, boolean_index) => {
                                            return (
                                                <div
                                                    className="form-group"
                                                    key={boolean_index}
                                                >
                                                    <div
                                                        className="card card-body shadow-sm small font-weight-bold-600 p-3"
                                                        onClick={() =>
                                                            this.handleBoolean(
                                                                option.content,
                                                                index
                                                            )
                                                        }
                                                    >
                                                        <div className="custom-control custom-radio">
                                                            <input
                                                                type="radio"
                                                                id={`customRadio1${index}-${boolean_index}`}
                                                                name={`customRadio${index}`}
                                                                className="custom-control-input"
                                                                value={
                                                                    option.content
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
                                                                onChange={(
                                                                    e
                                                                ) => {}}
                                                            />
                                                            <label
                                                                className="custom-control-label"
                                                                htmlFor={`customRadio1${index}-${boolean_index}`}
                                                            >
                                                                {option.content}
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )
                                ) : // ----- Fill in answers -----
                                data.content.fill_in === true ? (
                                    <div className="row">
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
                                    </div>
                                ) : null}

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
                            {data.content
                                ? data.content.images &&
                                  data.content.images.length !== 0
                                    ? this.imageRender(data)
                                    : ""
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
                                                    className="user-select-none"
                                                    draggable={false}
                                                >
                                                    <i className="fas fa-arrows-alt mr-2"></i>{" "}
                                                    Drop answer here...
                                                </div>
                                            ) : (
                                                <>
                                                    {answerSection &&
                                                    answerSection.length !== 0
                                                        ? (
                                                              answerSection[
                                                                  index
                                                              ].sub_question ||
                                                              []
                                                          ).map(
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
                                                                          <div
                                                                              className="card-body small font-weight-bold-600 primary-text pt-3 pb-0"
                                                                              dangerouslySetInnerHTML={{
                                                                                  __html: `<div class="mb-3">${sub_answer.answer[0]}</div>`,
                                                                              }}
                                                                          ></div>
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
                                                            __html: data
                                                                .sub_question[
                                                                this.state
                                                                    .currentSubQuestionIndex[
                                                                    this.state
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
                                                    ? (
                                                          data.sub_question[
                                                              this.state
                                                                  .currentSubQuestionIndex[
                                                                  this.state
                                                                      .currentSectionIndex
                                                              ][index]
                                                          ].options || []
                                                      ).map(
                                                          (
                                                              options,
                                                              option_index
                                                          ) => {
                                                              return (
                                                                  <div
                                                                      className="card shadow-sm mb-2"
                                                                      key={
                                                                          option_index
                                                                      }
                                                                      id={`option-${option_index}`}
                                                                      style={{
                                                                          cursor: "move",
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
                                                                      <div
                                                                          className="card-body small font-weight-bold-600 primary-text pt-3 pb-0"
                                                                          dangerouslySetInnerHTML={{
                                                                              __html: `<div class="mb-3">${options.content}</div>`,
                                                                          }}
                                                                      ></div>
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
                            {data.content
                                ? data.content.images &&
                                  data.content.images.length !== 0
                                    ? this.imageRender(data)
                                    : ""
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
        const cycleTest =
            this.state.cycleTestItem.auto_test !== undefined
                ? this.state.cycleTestItem.auto_test[
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
                    name={
                        this.courseId
                            ? this.props.course_name
                            : this.props.subject_name
                    }
                    chapter_name={`${this.props.chapter_name} - ${this.props.cycle_name}`}
                    goBack={this.props.history.goBack}
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
                        <ErrorBoundary
                            FallbackComponent={ErrorFallback}
                            onReset={() => window.location.reload()}
                        >
                            {/* Header */}
                            <div className="card card-body secondary-bg primary-text font-weight-bold-600 small mb-4 py-2">
                                <div className="row align-items-center">
                                    <div className="col-md-7">
                                        {cycleTest.length !== 0
                                            ? cycleTest.section_description
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
                                                    this.state.cycleTestItem
                                                        .total_questions
                                                }{" "}
                                                Questions
                                            </div>
                                            <div className="col-md-3">
                                                Total marks:{" "}
                                                {
                                                    this.state.cycleTestItem
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
                            {(questionSection || []).map((data, index) => {
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
                            })}

                            {/* ----- Navigation ----- */}
                            <div className="row align-items-center">
                                <div className="col-3">
                                    {this.state.currentSectionIndex !== 0 ? (
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handlePrev}
                                        >
                                            <i className="fas fa-angle-left mr-1"></i>
                                            {this.state.cycleTestItem.auto_test
                                                ? this.state.cycleTestItem
                                                      .auto_test[
                                                      this.state
                                                          .currentSectionIndex -
                                                          1
                                                  ]
                                                    ? this.state.cycleTestItem
                                                          .auto_test[
                                                          this.state
                                                              .currentSectionIndex -
                                                              1
                                                      ].section_description
                                                    : ""
                                                : ""}
                                        </button>
                                    ) : (
                                        ""
                                    )}
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
                                    {this.state.currentSectionIndex <
                                    this.state.questionSection.length - 1 ? (
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleNext}
                                        >
                                            {this.state.cycleTestItem.auto_test
                                                ? this.state.cycleTestItem
                                                      .auto_test[
                                                      this.state
                                                          .currentSectionIndex +
                                                          1
                                                  ]
                                                    ? this.state.cycleTestItem
                                                          .auto_test[
                                                          this.state
                                                              .currentSectionIndex +
                                                              1
                                                      ].section_description
                                                    : ""
                                                : ""}
                                            <i className="fas fa-angle-right ml-2"></i>
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </ErrorBoundary>
                    </div>
                </div>

                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

export default connect(mapStateToProps)(CycleAutoExam);
