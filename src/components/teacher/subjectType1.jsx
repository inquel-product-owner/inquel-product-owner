import React, { Component, Fragment } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import CKEditor from "ckeditor4-react";
import ReactSwitch from "../sharedComponents/switchComponent";
import { Accordion, Card, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class SubjectType1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            contentCollapsed: true,
            propertiesCollapsed: true,
            settingsCollapsed: true,
            showEdit_option: false,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            showVirtual_keyboard: true,

            activeQuestion: "",
            activeQuestionData: [],
            activeKeyboards: [],
            themeData: [],
            complexityData: [],
            keyboards: [
                { all: false, chemistry: false, physics: false, maths: false },
            ],

            questions: [
                {
                    chapter_name: this.props.match.params.chapterName,
                    topic_name: this.props.match.params.topicName,
                    question: "<p>Question goes here</p>",
                    content: {
                        fill_in: false,
                        options: [
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                            { correct: false, content: "" },
                        ],
                        explanation: "",
                        images: [{ title: "", url: "" }],
                        video: { title: "", url: "", pasteUrl: "" },
                        audio: [
                            { title: "", url: "" },
                            { title: "", url: "" },
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

    handleSubmit = () => {
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${this.url}/teacher/subject/${this.subjectId}/chapter/mcq/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify(this.state.activeQuestionData),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                    });
                    setTimeout(() => {
                        this.setState({
                            showLoader: false,
                            showEdit_option: false,
                        });
                    }, 3000);
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

    handleOptions_fillin = () => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.fill_in = !values[
            this.state.activeQuestion
        ].content.fill_in;
        this.setState({
            questions: values,
        });
    };

    correctOption = (index) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.options[
            index
        ].correct = !values[this.state.activeQuestion].content.options[index]
            .correct;
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
            url: "",
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
        let values = [...this.state.questions];
        var files = event.target.files;
        var filesArray = [].slice.call(files);
        filesArray.forEach((e) => {
            values[this.state.activeQuestion].content.images[index].url =
                e.name;
        });
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
        let values = [...this.state.questions];
        var files = event.target.files;
        var filesArray = [].slice.call(files);
        filesArray.forEach((e) => {
            values[this.state.activeQuestion].content.video.url = e.name;
        });
        values[this.state.activeQuestion].content.video.pasteUrl = "";
        this.setState({
            questions: values,
        });
    };

    handleVideoUrl = (event) => {
        const values = [...this.state.questions];
        values[this.state.activeQuestion].content.video.pasteUrl =
            event.target.value;
        values[this.state.activeQuestion].content.video.url = "";
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
        var files = event.target.files;
        var filesArray = [].slice.call(files);
        filesArray.forEach((e) => {
            values[this.state.activeQuestion].content.audio[index].url = e.name;
        });
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
            content: {
                fill_in: false,
                options: [
                    { correct: false, content: "" },
                    { correct: false, content: "" },
                    { correct: false, content: "" },
                    { correct: false, content: "" },
                ],
                explanation: "",
                images: [{ title: "", url: "" }],
                video: { title: "", url: "", pasteUrl: "" },
                audio: [
                    { title: "", url: "" },
                    { title: "", url: "" },
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
        values.push({
            chapter_name: this.chapterName,
            topic_name: this.topicName,
            question: values[index].question,
            content: {
                fill_in: values[index].content.fill_in,
                options: values[index].content.options,
                explanation: values[index].content.explanation,
                images: [{ title: "", url: "" }],
                video: { title: "", url: "", pasteUrl: "" },
                audio: [
                    { title: "", url: "" },
                    { title: "", url: "" },
                ],
            },
            properties: {
                marks: values[index].properties.marks,
                complexity: values[index].properties.complexity,
                priority: values[index].properties.priority,
                theme: values[index].properties.theme,
                test: values[index].properties.test,
                semester: values[index].properties.semester,
                quiz: values[index].properties.quiz,
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
        });
    };

    editQuestion = (index) => {
        const values = [...this.state.questions];
        let keyboards = [...this.state.keyboards];
        this.setState({
            showEdit_option: true,
            activeQuestion: index,
            activeQuestionData: values[index],
            activeKeyboards: keyboards[index],
            showErrorAlert: false,
            showSuccessAlert: false,
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
    };

    render() {
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
                                                            {!question.content
                                                                .fill_in ? (
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
                                        <div className="primary-text small font-weight-bold">
                                            Edit
                                        </div>
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
                                            Save & Close
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
                                                        <CKEditor
                                                            data={
                                                                this.state
                                                                    .activeQuestionData
                                                                    .question
                                                            }
                                                            onChange={
                                                                this
                                                                    .onEditorChange
                                                            }
                                                        />
                                                    </div>

                                                    {/* ---------- Options ---------- */}
                                                    <div className="form-group">
                                                        <div className="d-flex justify-content-between align-items-center ">
                                                            Options
                                                            <ReactSwitch
                                                                checked={
                                                                    this.state
                                                                        .activeQuestionData
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
                                                            Fill in
                                                        </div>
                                                    </div>
                                                    {!this.state
                                                        .activeQuestionData
                                                        .content.fill_in ? (
                                                        <div className="form-group row align-items-center">
                                                            {this.state.activeQuestionData.content.options.map(
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
                                                                                    type="text  "
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
                                                                                        {this
                                                                                            .state
                                                                                            .activeQuestionData
                                                                                            .content
                                                                                            .options
                                                                                            .length >
                                                                                        1 ? (
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
                                                                                        ) : (
                                                                                            ""
                                                                                        )}
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
                                                            {this.state
                                                                .activeQuestionData
                                                                .content.options
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
                                                    ) : (
                                                        ""
                                                    )}

                                                    {/* ---------- Explanation ---------- */}
                                                    <div className="form-group">
                                                        <label>
                                                            Explaination
                                                        </label>
                                                        <CKEditor
                                                            data={
                                                                this.state
                                                                    .activeQuestionData
                                                                    .content
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
                                                        {this.state.activeQuestionData.content.images.map(
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
                                                                            type="text  "
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
                                                                                {this
                                                                                    .state
                                                                                    .activeQuestionData
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
                                                                            {options.url ===
                                                                            ""
                                                                                ? "Choose file"
                                                                                : options.url}
                                                                        </label>
                                                                    </div>
                                                                </Fragment>
                                                            )
                                                        )}
                                                        {this.state
                                                            .activeQuestionData
                                                            .content.images
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
                                                                {this.state
                                                                    .activeQuestionData
                                                                    .content
                                                                    .video
                                                                    .url === ""
                                                                    ? "Choose file"
                                                                    : this.state
                                                                          .activeQuestionData
                                                                          .content
                                                                          .video
                                                                          .url}
                                                            </label>
                                                        </div>
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
                                                                this.state
                                                                    .activeQuestionData
                                                                    .content
                                                                    .video
                                                                    .pasteUrl
                                                            }
                                                        />
                                                    </div>

                                                    {/* ---------- Audio ---------- */}
                                                    <div className="form-group">
                                                        <p className="mb-2">
                                                            Audio
                                                        </p>
                                                        {this.state.activeQuestionData.content.audio.map(
                                                            (
                                                                options,
                                                                index
                                                            ) => (
                                                                <Fragment
                                                                    key={index}
                                                                >
                                                                    <input
                                                                        type="text  "
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
                                                                            {options.url ===
                                                                            ""
                                                                                ? "Choose file"
                                                                                : options.url}
                                                                        </label>
                                                                    </div>
                                                                </Fragment>
                                                            )
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
                                                                className="form-control form-control-sm border-secondary bg-light"
                                                                value={
                                                                    this.state
                                                                        .activeQuestionData
                                                                        .properties
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
                                                                className="form-control form-control-sm border-secondary bg-light"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleProperties(
                                                                        event,
                                                                        "complexity"
                                                                    )
                                                                }
                                                                value={
                                                                    this.state
                                                                        .activeQuestionData
                                                                        .properties
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
                                                                className="form-control form-control-sm border-secondary bg-light"
                                                                value={
                                                                    this.state
                                                                        .activeQuestionData
                                                                        .properties
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
                                                                className="form-control form-control-sm border-secondary bg-light"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleProperties(
                                                                        event,
                                                                        "theme"
                                                                    )
                                                                }
                                                                value={
                                                                    this.state
                                                                        .activeQuestionData
                                                                        .properties
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
                                                                            {this.state.activeQuestionData.properties.test.map(
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
                                                                                            onClick={() =>
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
                                                                            {this.state.activeQuestionData.properties.semester.map(
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
                                                                                            onClick={() =>
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
                                                                            {this.state.activeQuestionData.properties.quiz.map(
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
                                                                                            onClick={() =>
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
                                                                            this
                                                                                .state
                                                                                .activeQuestionData
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
                                                                        this
                                                                            .state
                                                                            .activeKeyboards
                                                                            .all
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
                                                                        this
                                                                            .state
                                                                            .activeKeyboards
                                                                            .chemistry
                                                                    }
                                                                    disabled={
                                                                        this
                                                                            .state
                                                                            .activeKeyboards
                                                                            .all
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
                                                                        this
                                                                            .state
                                                                            .activeKeyboards
                                                                            .maths
                                                                    }
                                                                    disabled={
                                                                        this
                                                                            .state
                                                                            .activeKeyboards
                                                                            .all
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
                                                                        this
                                                                            .state
                                                                            .activeKeyboards
                                                                            .physics
                                                                    }
                                                                    disabled={
                                                                        this
                                                                            .state
                                                                            .activeKeyboards
                                                                            .all
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
                                                                            this
                                                                                .state
                                                                                .activeQuestionData
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
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectType1;
