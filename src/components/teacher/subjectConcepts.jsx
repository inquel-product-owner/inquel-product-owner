import React, { Component, Fragment } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import CKEditor from "ckeditor4-react";
import ReactSwitch from "../sharedComponents/switchComponent";
import { Accordion, Card, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import ReactCardFlip from "react-card-flip";

class SubjectConcepts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            contentCollapsed: true,
            imageCollapsed: true,
            audioCollapsed: true,
            settingsCollapsed: true,
            showEdit_option: false,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            showVirtual_keyboard: true,
            isFlipped: false,

            activeConcept: "",
            activeConceptData: [],
            activeKeyboards: [],
            activeFlippedState: [],
            flippedState: [{ isFlipped: false }],
            keyboards: [
                { all: false, chemistry: false, physics: false, maths: false },
            ],

            concepts: [
                {
                    chapter_name: this.props.match.params.chapterName,
                    topic_name: this.props.match.params.topicName,
                    content: {
                        terms: "<p>Terms goes here</p>",
                        definition: "<p>Definition goes here</p>",
                        images: [{ title: "", url: "" }],
                        video: { title: "", url: "", pasteUrl: "" },
                        audio: [
                            { title: "", url: "" },
                            { title: "", url: "" },
                        ],
                    },
                    settings: {
                        virtual_keyboard: [],
                        limited: false,
                    },
                },
            ],
        };
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

        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/`,
            {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify(this.state.activeConceptData),
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
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.terms = evt.editor.getData();
        this.setState({
            concepts: values,
        });
    };

    handleDefinition = (evt) => {
        const values = [...this.state.concepts];
        values[
            this.state.activeConcept
        ].content.definition = evt.editor.getData();
        this.setState({
            concepts: values,
        });
    };

    // -------------------------- Image --------------------------

    handleImageTitle = (index, event) => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.images[index].title =
            event.target.value;
        this.setState({
            concepts: values,
        });
    };

    handleAddImageFields = () => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.images.push({
            title: "",
            url: "",
        });
        this.setState({
            concepts: values,
        });
    };

    handleRemoveImageFields = (index) => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.images.splice(index, 1);
        this.setState({
            concepts: values,
        });
    };

    handleImageFile = (index, event) => {
        let values = [...this.state.concepts];
        var files = event.target.files;
        var filesArray = [].slice.call(files);
        filesArray.forEach((e) => {
            values[this.state.activeConcept].content.images[index].url = e.name;
        });
        this.setState({
            concepts: values,
        });
    };

    // -------------------------- Video --------------------------

    handleVideoTitle = (event) => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.video.title =
            event.target.value;
        this.setState({
            concepts: values,
        });
    };

    handleVideoFile = (event) => {
        let values = [...this.state.concepts];
        var files = event.target.files;
        var filesArray = [].slice.call(files);
        filesArray.forEach((e) => {
            values[this.state.activeConcept].content.video.url = e.name;
        });
        values[this.state.activeConcept].content.video.pasteUrl = "";
        this.setState({
            concepts: values,
        });
    };

    handleVideoUrl = (event) => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.video.pasteUrl =
            event.target.value;
        values[this.state.activeConcept].content.video.url = "";
        this.setState({
            concepts: values,
        });
    };

    // -------------------------- Audio --------------------------

    handleAudioTitle = (index, event) => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.audio[index].title =
            event.target.value;
        this.setState({
            concepts: values,
        });
    };

    handleAudioFile = (index, event) => {
        const values = [...this.state.concepts];
        var files = event.target.files;
        var filesArray = [].slice.call(files);
        filesArray.forEach((e) => {
            values[this.state.activeConcept].content.audio[index].url = e.name;
        });
        this.setState({
            concepts: values,
        });
    };

    // -------------------------- Settings --------------------------

    handleVirtualKeyboard = () => {
        this.setState({
            showVirtual_keyboard: !this.state.showVirtual_keyboard,
        });
    };

    handleLimited = () => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].settings.limited = !values[
            this.state.activeConcept
        ].settings.limited;
        this.setState({
            concepts: values,
        });
    };

    handleKeyboardOptions = (event, type) => {
        const values = [...this.state.concepts];
        const keyboards = [...this.state.keyboards];
        if (event.target.checked) {
            values[this.state.activeConcept].settings.virtual_keyboard.push(
                type
            );
            this.setState({
                concepts: values,
            });
        } else {
            values[this.state.activeConcept].settings.virtual_keyboard.splice(
                values[
                    this.state.activeConcept
                ].settings.virtual_keyboard.indexOf(type),
                1
            );
            this.setState({
                concepts: values,
            });
        }
        if (type === "Chemistry") {
            keyboards[this.state.activeConcept].chemistry = !keyboards[
                this.state.activeConcept
            ].chemistry;
            this.setState({
                keyboards: keyboards,
            });
        } else if (type === "Physics") {
            keyboards[this.state.activeConcept].physics = !keyboards[
                this.state.activeConcept
            ].physics;
            this.setState({
                keyboards: keyboards,
            });
        } else {
            keyboards[this.state.activeConcept].maths = !keyboards[
                this.state.activeConcept
            ].maths;
            this.setState({
                keyboards: keyboards,
            });
        }
    };

    handleSelectAll = (event, type) => {
        const values = [...this.state.concepts];
        const keyboards = [...this.state.keyboards];
        if (event.target.checked) {
            values[this.state.activeConcept].settings.virtual_keyboard = [];
            values[this.state.activeConcept].settings.virtual_keyboard.push(
                type
            );
            keyboards[this.state.activeConcept].all = true;
            keyboards[this.state.activeConcept].physics = true;
            keyboards[this.state.activeConcept].chemistry = true;
            keyboards[this.state.activeConcept].maths = true;
            this.setState({
                concepts: values,
                keyboards: keyboards,
            });
        } else {
            values[this.state.activeConcept].settings.virtual_keyboard = [];
            keyboards[this.state.activeConcept].all = false;
            keyboards[this.state.activeConcept].physics = false;
            keyboards[this.state.activeConcept].chemistry = false;
            keyboards[this.state.activeConcept].maths = false;
            this.setState({
                concepts: values,
                keyboards: keyboards,
            });
        }
    };

    // -------------------------- Collapse --------------------------

    toggleCollapse = (component) => {
        this.setState({
            contentCollapsed: true,
            imageCollapsed: true,
            audioCollapsed: true,
            settingsCollapsed: true,
        });
        if (component === "content") {
            this.setState({
                contentCollapsed: !this.state.contentCollapsed,
            });
        } else if (component === "image") {
            this.setState({
                imageCollapsed: !this.state.imageCollapsed,
            });
        } else if (component === "audio") {
            this.setState({
                audioCollapsed: !this.state.audioCollapsed,
            });
        } else {
            this.setState({
                settingsCollapsed: !this.state.settingsCollapsed,
            });
        }
    };

    // -------------------------- Adding new concept --------------------------

    addNewConcept = () => {
        const values = [...this.state.concepts];
        const keyboards = [...this.state.keyboards];
        const flip = [...this.state.flippedState];
        flip.push({ isFlipped: false });
        keyboards.push({
            all: false,
            chemistry: false,
            physics: false,
            maths: false,
        });
        values.push({
            chapter_name: this.props.match.params.chapterName,
            topic_name: this.props.match.params.topicName,
            content: {
                terms: "<p>Terms goes here</p>",
                definition: "<p>Definition goes here</p>",
                images: [{ title: "", url: "" }],
                video: { title: "", url: "", pasteUrl: "" },
                audio: [
                    { title: "", url: "" },
                    { title: "", url: "" },
                ],
            },
            settings: {
                virtual_keyboard: [],
                limited: false,
            },
        });
        this.setState({
            concepts: values,
            keyboards: keyboards,
            flippedState: flip,
        });
    };

    removingConcept = (index) => {
        const values = [...this.state.concepts];
        const keyboards = [...this.state.keyboards];
        const flip = [...this.state.flippedState];
        flip.splice(index, 1);
        keyboards.splice(index, 1);
        values.splice(index, 1);
        this.setState({
            concepts: values,
            keyboards: keyboards,
            flippedState: flip,
            showEdit_option: false,
            contentCollapsed: true,
            imageCollapsed: true,
            audioCollapsed: true,
            settingsCollapsed: true,
        });
    };

    copyConcept = (index) => {
        const values = [...this.state.concepts];
        const keyboards = [...this.state.keyboards];
        const flip = [...this.state.flippedState];
        flip.push(flip[index]);
        keyboards.push(keyboards[index]);
        values.push(values[index]);
        this.setState({
            concepts: values,
            keyboards: keyboards,
            flippedState: flip,
        });
    };

    editConcept = (index, concept) => {
        let keyboards = [...this.state.keyboards];
        this.setState({
            showEdit_option: true,
            activeConcept: index,
            activeConceptData: concept,
            activeKeyboards: keyboards[index],
            showErrorAlert: false,
            showSuccessAlert: false,
        });
    };

    componentDidMount = () => {
        document.title = `${this.chapterName} Concepts - Teacher | IQLabs`;
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
                                            {`${this.chapterName} - Concepts`}
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

                                {/* -------------------- Concepts -------------------- */}
                                {this.state.concepts.map((concept, c_index) => {
                                    return (
                                        <div className="row mb-3" key={c_index}>
                                            {/* ---------- Side buttons ---------- */}
                                            <div className="col-md-1 mb-1 mb-md-0">
                                                <div className="row">
                                                    <div className="col-md-12 col-3 mb-1">
                                                        <button
                                                            type="button"
                                                            className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                        >
                                                            {`0${c_index + 1}`}
                                                        </button>
                                                    </div>
                                                    <div className="col-md-12 col-3 mb-1">
                                                        <button
                                                            type="button"
                                                            className="btn btn-light bg-white btn-block shadow-sm mr-2"
                                                            onClick={() =>
                                                                this.editConcept(
                                                                    c_index,
                                                                    concept
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
                                                                this.copyConcept(
                                                                    c_index
                                                                )
                                                            }
                                                        >
                                                            <i className="far fa-copy fa-sm"></i>
                                                        </button>
                                                    </div>
                                                    <div className="col-md-12 col-3">
                                                        {this.state.concepts
                                                            .length > 1 ? (
                                                            <button
                                                                type="button"
                                                                className="btn btn-light bg-white btn-block shadow-sm"
                                                                onClick={() =>
                                                                    this.removingConcept(
                                                                        c_index
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

                                            {/* ---------- Concept preview ---------- */}
                                            <div className="col-md-11 pl-md-0">
                                                <div className="card shadow-sm">
                                                    <div
                                                        className="card-body"
                                                        onClick={() => {
                                                            this.setState({
                                                                isFlipped: !this
                                                                    .state
                                                                    .isFlipped,
                                                            });
                                                        }}
                                                    >
                                                        {/* {let flip = [
                                                                    ...this
                                                                        .state
                                                                        .flippedState,
                                                                ]} */}
                                                        <ReactCardFlip
                                                            isFlipped={
                                                                this.state
                                                                    .isFlipped
                                                            }
                                                            flipDirection="vertical"
                                                        >
                                                            {/* Front-view */}
                                                            <div className="card">
                                                                <div
                                                                    className="card-body location-front-item"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html:
                                                                            concept
                                                                                .content
                                                                                .terms,
                                                                    }}
                                                                ></div>
                                                                {/* <img
                                                                    src="https://iqlabs-media-type1.s3.us-east-2.amazonaws.com/media/localhost.jpg"
                                                                    alt="sometext"
                                                                    width="300"
                                                                    height="auto"
                                                                /> */}
                                                            </div>
                                                            {/* Back-view */}
                                                            <div className="card">
                                                                <div
                                                                    className="card-body location-back-item"
                                                                    dangerouslySetInnerHTML={{
                                                                        __html:
                                                                            concept
                                                                                .content
                                                                                .definition,
                                                                    }}
                                                                ></div>
                                                            </div>
                                                        </ReactCardFlip>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}

                                <button
                                    className="btn btn-primary btn-block"
                                    onClick={this.addNewConcept}
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
                                        {/* ---------- Content ---------- */}
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
                                                    {/* ---------- Terms ---------- */}
                                                    <div className="form-group">
                                                        <label>Terms</label>
                                                        <CKEditor
                                                            data={
                                                                this.state
                                                                    .activeConceptData
                                                                    .content
                                                                    .terms
                                                            }
                                                            onChange={
                                                                this
                                                                    .onEditorChange
                                                            }
                                                        />
                                                    </div>

                                                    {/* ---------- Definition ---------- */}
                                                    <div className="form-group">
                                                        <label>
                                                            Definition
                                                        </label>
                                                        <CKEditor
                                                            data={
                                                                this.state
                                                                    .activeConceptData
                                                                    .content
                                                                    .definition
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleDefinition
                                                            }
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                        {/* ---------- image / video ---------- */}
                                        <Card className="shadow-sm mb-2">
                                            <Accordion.Toggle
                                                as={Card.Body}
                                                variant="link"
                                                eventKey="1"
                                                className="text-dark"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    this.toggleCollapse("image")
                                                }
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    Image / Video
                                                    {this.state
                                                        .contentCollapsed ? (
                                                        <i className="fas fa-angle-right "></i>
                                                    ) : (
                                                        <i className="fas fa-angle-down "></i>
                                                    )}
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body className="p-3">
                                                    {/* ---------- Image ---------- */}
                                                    <div className="form-group">
                                                        <p className="mb-2">
                                                            Image
                                                        </p>
                                                        {this.state.activeConceptData.content.images.map(
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
                                                                        />
                                                                        <div className="input-group-append">
                                                                            <div
                                                                                className="btn-group"
                                                                                role="group"
                                                                                aria-label="Basic example"
                                                                            >
                                                                                {this
                                                                                    .state
                                                                                    .activeConceptData
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
                                                            .activeConceptData
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
                                                                    .activeConceptData
                                                                    .content
                                                                    .video
                                                                    .url === ""
                                                                    ? "Choose file"
                                                                    : this.state
                                                                          .activeConceptData
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
                                                            value={
                                                                this.state
                                                                    .activeConceptData
                                                                    .content
                                                                    .video
                                                                    .pasteUrl
                                                            }
                                                        />
                                                    </div>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>

                                        {/* ---------- Audio ---------- */}
                                        <Card className="shadow-sm mb-2">
                                            <Accordion.Toggle
                                                as={Card.Body}
                                                variant="link"
                                                eventKey="2"
                                                className="text-dark"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    this.toggleCollapse("audio")
                                                }
                                            >
                                                <div className="d-flex justify-content-between align-items-center">
                                                    Audio
                                                    {this.state
                                                        .contentCollapsed ? (
                                                        <i className="fas fa-angle-right "></i>
                                                    ) : (
                                                        <i className="fas fa-angle-down "></i>
                                                    )}
                                                </div>
                                            </Accordion.Toggle>

                                            <Accordion.Collapse eventKey="2">
                                                <Card.Body className="p-3">
                                                    {/* ---------- Audio ---------- */}
                                                    <div className="form-group">
                                                        <p className="mb-2">
                                                            Audio
                                                        </p>
                                                        {this.state.activeConceptData.content.audio.map(
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

                                        {/* ---------- Settings ---------- */}
                                        <Card className="shadow-sm mb-2">
                                            <Accordion.Toggle
                                                as={Card.Body}
                                                variant="link"
                                                eventKey="3"
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

                                            <Accordion.Collapse eventKey="3">
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
                                                                                .activeConceptData
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

export default SubjectConcepts;
