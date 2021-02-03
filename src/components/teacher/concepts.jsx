import React, { Component, Fragment } from "react";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import CKeditor from "../sharedComponents/CKeditor";
import ReactSwitch from "../sharedComponents/switchComponent";
import { Accordion, Card, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import ReactCardFlip from "react-card-flip";
import Loading from "../sharedComponents/loader";

class SubjectConcepts extends Component {
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
            imageCollapsed: true,
            audioCollapsed: true,
            settingsCollapsed: true,
            showEdit_option: false,
            showVirtual_keyboard: true,
            isForm_submitted: false,

            activeConcept: "",
            selectedImageQuestion: "",
            selectedImageData: [],
            selectedImage: "",
            flipState: [false],

            keyboards: [
                { all: false, chemistry: false, physics: false, maths: false },
            ],

            concepts: [
                {
                    chapter_name: this.props.match.params.chapterName,
                    topic_name: this.props.match.params.topicName,
                    concepts_random_id: "",
                    old_concept: true,
                    old_image: false,
                    content: {
                        terms: "<p>Terms goes here</p>",
                        definition: "<p>Definition goes here</p>",
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

    loadConceptData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    page_loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = `${this.chapterName} Concepts - Teacher | IQLabs`;

        this.loadConceptData();
    };

    handleSubmit = () => {
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        const data = [...this.state.concepts];

        if (data[this.state.activeConcept].content.terms === "") {
            this.setState({
                errorMsg: "Terms is required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (data[this.state.activeConcept].content.definition === "") {
            this.setState({
                errorMsg: "Definition is required",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (
            data[this.state.activeConcept].settings.virtual_keyboard.length ===
            0
        ) {
            this.setState({
                errorMsg: "Please select a Virtual keyboard",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            if (data[this.state.activeConcept].old_concept === true) {
                if (data[this.state.activeConcept].concepts_random_id === "") {
                    delete data[this.state.activeConcept].concepts_random_id;
                    if (data[this.state.activeConcept].old_concept) {
                        delete data[this.state.activeConcept].old_concept;
                    }
                    if (!data[this.state.activeConcept].old_image) {
                        delete data[this.state.activeConcept].old_image;
                    }
                    this.handlePOST(data);
                } else {
                    if (data[this.state.activeConcept].old_concept) {
                        delete data[this.state.activeConcept].old_concept;
                    }
                    if (data[this.state.activeConcept].old_image) {
                        delete data[this.state.activeConcept].old_image;
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
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/`,
            {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify(data[this.state.activeConcept]),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    data[this.state.activeConcept].concepts_random_id =
                        result.concepts_random_id;
                    data[this.state.activeConcept].old_concept = false;
                    data[this.state.activeConcept].old_image = false;
                    this.setState({
                        concepts: data,
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
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/`,
            {
                headers: this.headers,
                method: "PUT",
                body: JSON.stringify(data[this.state.activeConcept]),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    data[this.state.activeConcept].concepts_random_id =
                        result.concepts_random_id;
                    data[this.state.activeConcept].old_concept = false;
                    data[this.state.activeConcept].old_image = true;
                    this.setState({
                        concepts: data,
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

            const conceptValues = [...this.state.concepts];

            let form_data = new FormData();

            form_data.append("chapter_name", this.chapterName);
            form_data.append("topic_name", this.topicName);
            form_data.append(
                "concepts_random_id",
                conceptValues[this.state.activeConcept].concepts_random_id
            );

            if (
                conceptValues[this.state.activeConcept].content.video.video !==
                null
            ) {
                form_data.append(
                    "concepts_video_1_title",
                    conceptValues[this.state.activeConcept].content.video.title
                );
                form_data.append(
                    "concepts_video_1",
                    conceptValues[this.state.activeConcept].content.video.video
                );
            }

            for (
                let i = 0;
                i <
                conceptValues[this.state.activeConcept].content.images.length;
                i++
            ) {
                if (
                    conceptValues[this.state.activeConcept].content.images[i]
                        .image !== null
                ) {
                    form_data.append(
                        `concepts_image_${i + 1}_title`,
                        conceptValues[this.state.activeConcept].content.images[
                            i
                        ].title
                    );
                    form_data.append(
                        `concepts_image_${i + 1}`,
                        conceptValues[this.state.activeConcept].content.images[
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
                conceptValues[this.state.activeConcept].content.audio.length;
                i++
            ) {
                if (
                    conceptValues[this.state.activeConcept].content.audio[i]
                        .audio !== null
                ) {
                    form_data.append(
                        `concepts_audio_${i + 1}_title`,
                        conceptValues[this.state.activeConcept].content.audio[i]
                            .title
                    );
                    form_data.append(
                        `concepts_audio_${i + 1}`,
                        conceptValues[this.state.activeConcept].content.audio[i]
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
                    conceptValues[this.state.activeConcept].old_image === false
                ) {
                    this.handleImgPOST(options, form_data, conceptValues);
                } else {
                    this.handleImgPATCH(options, form_data, conceptValues);
                }
            } else {
                conceptValues[this.state.activeConcept].old_concept = true;
                this.setState(
                    {
                        concepts: conceptValues,
                        successMsg: "Concepts added",
                        showSuccessAlert: true,
                        showLoader: false,
                        page_loading: true,
                    },
                    () => {
                        this.loadConceptData();
                    }
                );
            }
        }
    };

    handleImgPOST = (options, form_data, conceptValues) => {
        axios
            .post(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/files/`,
                form_data,
                options
            )
            .then((result) => {
                console.log(result);
                if (result.data.sts === true) {
                    conceptValues[this.state.activeConcept].old_concept = true;
                    this.setState(
                        {
                            concepts: conceptValues,
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                            page_loading: true,
                        },
                        () => {
                            this.loadConceptData();
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

    handleImgPATCH = (options, form_data, conceptValues) => {
        axios
            .patch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/files/`,
                form_data,
                options
            )
            .then((result) => {
                console.log(result);
                if (result.data.sts === true) {
                    conceptValues[this.state.activeConcept].old_concept = true;
                    this.setState(
                        {
                            concepts: conceptValues,
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                            page_loading: true,
                        },
                        () => {
                            this.loadConceptData();
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

    // -------------------------- Terms & Definition --------------------------

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
            file_name: "",
            image: null,
            path: "",
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
        values[this.state.activeConcept].content.images[index].file_name =
            event.target.files[0].name;
        values[this.state.activeConcept].content.images[
            index
        ].path = URL.createObjectURL(event.target.files[0]);
        values[this.state.activeConcept].content.images[index].image =
            event.target.files[0];
        this.setState({
            concepts: values,
        });
    };

    changeImage = (image_index, q_index) => {
        const images = [...this.state.concepts];
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
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.video.title =
            event.target.value;
        this.setState({
            concepts: values,
        });
    };

    handleVideoFile = (event) => {
        let values = [...this.state.concepts];
        values[this.state.activeConcept].content.video.file_name =
            event.target.files[0].name;
        values[this.state.activeConcept].content.video.video =
            event.target.files[0];
        values[this.state.activeConcept].content.video.pasteUrl = "";
        this.setState({
            concepts: values,
        });
    };

    handleVideoUrl = (event) => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.video.pasteUrl =
            event.target.value;
        values[this.state.activeConcept].content.video.file_name = "";
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
        values[this.state.activeConcept].content.audio[index].file_name =
            event.target.files[0].name;
        values[this.state.activeConcept].content.audio[index].audio =
            event.target.files[0];
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
        const flips = [...this.state.flipState];
        flips.push(false);
        keyboards.push({
            all: false,
            chemistry: false,
            physics: false,
            maths: false,
        });
        values.push({
            chapter_name: this.props.match.params.chapterName,
            topic_name: this.props.match.params.topicName,
            concepts_random_id: "",
            old_concept: true,
            old_image: false,
            content: {
                terms: "<p>Terms goes here</p>",
                definition: "<p>Definition goes here</p>",
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
            settings: {
                virtual_keyboard: [],
                limited: false,
            },
        });
        this.setState({
            concepts: values,
            keyboards: keyboards,
            flipState: flips,
        });
    };

    removingConcept = (index) => {
        const values = [...this.state.concepts];
        const keyboards = [...this.state.keyboards];
        const flips = [...this.state.flipState];
        flips.splice(index, 1);
        keyboards.splice(index, 1);
        values.splice(index, 1);
        this.setState({
            concepts: values,
            keyboards: keyboards,
            flipState: flips,
            showEdit_option: false,
            contentCollapsed: true,
            imageCollapsed: true,
            audioCollapsed: true,
            settingsCollapsed: true,
        });

        const data = [...this.state.concepts];

        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/`,
            {
                method: "DELETE",
                headers: this.headers,
                body: JSON.stringify({
                    chapter_name: data[index].chapter_name,
                    topic_name: data[index].topic_name,
                    concepts_random_id: data[index].concepts_random_id,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    page_loading: true,
                });
                this.loadConceptData();
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    copyConcept = (index) => {
        const values = [...this.state.concepts];
        const keyboards = [...this.state.keyboards];
        const flips = [...this.state.flipState];
        flips.push(flips[index]);
        keyboards.push({
            all: keyboards[index].all,
            chemistry: keyboards[index].chemistry,
            physics: keyboards[index].physics,
            maths: keyboards[index].maths,
        });
        const images = [];
        for (let i = 0; i < values[index].content.images.length; i++) {
            images[i] = values[index].content.images[i];
        }
        values.push({
            chapter_name: this.chapterName,
            topic_name: this.topicName,
            concepts_random_id: "",
            old_concept: true,
            old_image: false,
            content: {
                terms: values[index].content.terms,
                definition: values[index].content.definition,
                images: images,
                video: values[index].content.video,
                audio: values[index].content.audio,
            },
            settings: {
                virtual_keyboard: values[index].settings.virtual_keyboard,
                limited: values[index].settings.limited,
            },
        });
        this.setState({
            concepts: values,
            keyboards: keyboards,
            flipState: flips,
        });
    };

    editConcept = (index, concept) => {
        this.setState({
            showEdit_option: true,
            activeConcept: index,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
    };

    handleFlip = (index) => {
        const flips = [...this.state.flipState];
        flips[index] = !flips[index];
        this.setState({
            flipState: flips,
        });
    };

    render() {
        let data = [...this.state.concepts];
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
                                                            {c_index <= 8
                                                                ? `0${
                                                                      c_index +
                                                                      1
                                                                  }`
                                                                : c_index + 1}
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
                                                <ReactCardFlip
                                                    isFlipped={
                                                        this.state.flipState[
                                                            c_index
                                                        ]
                                                    }
                                                    flipDirection="vertical"
                                                >
                                                    <div className="card shadow-sm">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                {/* terms */}
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
                                                                            c_index
                                                                            ? "col-md-8"
                                                                            : "col-md-11 pr-md-0"
                                                                    }`}
                                                                >
                                                                    {/* Front-view */}
                                                                    <div className="card">
                                                                        <div
                                                                            className="card-body"
                                                                            onClick={() =>
                                                                                this.handleFlip(
                                                                                    c_index
                                                                                )
                                                                            }
                                                                            dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                    concept
                                                                                        .content
                                                                                        .terms,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                {/* image preview */}
                                                                {this.state
                                                                    .selectedImageData
                                                                    .length !==
                                                                    0 &&
                                                                this.state
                                                                    .selectedImageQuestion ===
                                                                    c_index ? (
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
                                                                    {concept.content.images.map(
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
                                                                                            c_index
                                                                                        )
                                                                                    }
                                                                                ></div>
                                                                            ) : (
                                                                                ""
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="card shadow-sm">
                                                        <div className="card-body">
                                                            <div className="row">
                                                                {/* definition */}
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
                                                                            c_index
                                                                            ? "col-md-8"
                                                                            : "col-md-11 pr-md-0"
                                                                    }`}
                                                                >
                                                                    {/* Back-view */}
                                                                    <div className="card">
                                                                        <div
                                                                            className="card-body"
                                                                            onClick={() =>
                                                                                this.handleFlip(
                                                                                    c_index
                                                                                )
                                                                            }
                                                                            dangerouslySetInnerHTML={{
                                                                                __html:
                                                                                    concept
                                                                                        .content
                                                                                        .definition,
                                                                            }}
                                                                        ></div>
                                                                    </div>
                                                                </div>
                                                                {/* image preview */}
                                                                {this.state
                                                                    .selectedImageData
                                                                    .length !==
                                                                    0 &&
                                                                this.state
                                                                    .selectedImageQuestion ===
                                                                    c_index ? (
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
                                                                    {concept.content.images.map(
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
                                                                                            c_index
                                                                                        )
                                                                                    }
                                                                                ></div>
                                                                            ) : (
                                                                                ""
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </ReactCardFlip>
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
                                                    imageCollapsed: true,
                                                    audioCollapsed: true,
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
                                                        <CKeditor
                                                            data={
                                                                data[
                                                                    this.state
                                                                        .activeConcept
                                                                ].content.terms
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
                                                        <CKeditor
                                                            data={
                                                                data[
                                                                    this.state
                                                                        .activeConcept
                                                                ].content
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
                                                        .imageCollapsed ? (
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
                                                        {data[
                                                            this.state
                                                                .activeConcept
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
                                                                            autoComplete="off"
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
                                                                                {data[
                                                                                    this
                                                                                        .state
                                                                                        .activeConcept
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
                                                        {data[
                                                            this.state
                                                                .activeConcept
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
                                                            autoComplete="off"
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
                                                                        .activeConcept
                                                                ].content.video
                                                                    .file_name ===
                                                                ""
                                                                    ? "Choose file"
                                                                    : data[
                                                                          this
                                                                              .state
                                                                              .activeConcept
                                                                      ].content
                                                                          .video
                                                                          .file_name}
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
                                                                data[
                                                                    this.state
                                                                        .activeConcept
                                                                ].content.video
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
                                                        .audioCollapsed ? (
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
                                                        {data[
                                                            this.state
                                                                .activeConcept
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
                                                                        autoComplete="off"
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
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeConcept
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
                                                                                .activeConcept
                                                                        ]
                                                                            .chemistry
                                                                    }
                                                                    disabled={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeConcept
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
                                                                                .activeConcept
                                                                        ].maths
                                                                    }
                                                                    disabled={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeConcept
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
                                                                                .activeConcept
                                                                        ]
                                                                            .physics
                                                                    }
                                                                    disabled={
                                                                        boards[
                                                                            this
                                                                                .state
                                                                                .activeConcept
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
                                                                                    .activeConcept
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

export default SubjectConcepts;
