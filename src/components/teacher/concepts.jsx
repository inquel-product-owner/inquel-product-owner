import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import CKeditor from "../sharedComponents/CKeditor";
import ReactSwitch from "../sharedComponents/switchComponent";
import { Accordion, Card, Alert, Spinner, Modal } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import ReactCardFlip from "react-card-flip";
import Loading from "../sharedComponents/loader";
import AlertModal from "../sharedComponents/alertModal";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import FileModal from "./shared/fileExplorer";

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
    topic_name: state.topic_name,
});

class ConceptsDeleteModal extends Component {
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
            `${this.url}/teacher/subject/${this.props.subjectId}/chapter/concepts/`,
            {
                method: "DELETE",
                headers: this.headers,
                body: JSON.stringify({
                    chapter_id: this.props.chapter_id,
                    topic_name: this.props.topic_name,
                    concepts_random_id: this.props.values,
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
                <Modal.Header closeButton>Delete Concept</Modal.Header>
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
                        Are you sure that you want to delete this concept?
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

class SubjectConcepts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,

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
            showConceptDelete_Modal: false,

            contentCollapsed: true,
            imageCollapsed: true,
            audioCollapsed: true,
            settingsCollapsed: true,
            showEdit_option: false,
            showVirtual_keyboard: true,
            isForm_submitted: false,

            activeConcept: "",
            selectedImage: "",
            selectedVideo: "",
            selectedAudio: "",
            flipState: [false],
            selectedConcept: "",

            keyboards: [
                { all: false, chemistry: false, physics: false, maths: false },
            ],

            concepts: [
                {
                    chapter_id: this.props.match.params.chapterId,
                    topic_name: this.props.match.params.topicName,
                    concepts_random_id: "",
                    is_image_uploaded: false,
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
                            path: "",
                            url: "",
                        },
                        audio: [
                            { title: "", file_name: "", audio: null, path: "" },
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
        this.audio_limit = 2;
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.topicName = this.props.match.params.topicName;
        this.ancestor = this.props.match.params.ancestor;
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

    loadConceptData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/?chapter_id=${this.chapterId}&topic_name=${this.topicName}`,
            {
                method: "GET",
                headers: this.headers,
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
                    let response = result.data.results[0].concepts;
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
                                is_image_uploaded:
                                    response[i].files.length !== 0
                                        ? true
                                        : false,
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
                            concepts: data,
                            keyboards: keyboards,
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            page_loading: false,
                        });
                    }
                } else {
                    if (result.detail) {
                        this.setState({
                            alertMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            alertMsg: result.msg,
                        });
                    }
                    this.setState({
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
        document.title = `${this.props.topic_name} Concepts - Teacher | IQLabs`;

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
        } else {
            if (data[this.state.activeConcept].concepts_random_id === "") {
                this.handlePOST(data);
            } else {
                this.handlePUT(data);
            }
        }
    };

    handlePOST = (data) => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/`,
            {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify({
                    chapter_id: this.chapterId,
                    topic_name: this.topicName,
                    ancestor: this.ancestor,
                    content: {
                        terms: data[this.state.activeConcept].content.terms,
                        definition:
                            data[this.state.activeConcept].content.definition,
                    },
                    settings: {
                        virtual_keyboard:
                            data[this.state.activeConcept].settings
                                .virtual_keyboard,
                        limited:
                            data[this.state.activeConcept].settings.limited,
                    },
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    data[this.state.activeConcept].concepts_random_id =
                        result.concepts_random_id;
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
                body: JSON.stringify({
                    chapter_id: this.chapterId,
                    topic_name: this.topicName,
                    ancestor: this.ancestor,
                    concepts_random_id:
                        data[this.state.activeConcept].concepts_random_id,
                    content: {
                        terms: data[this.state.activeConcept].content.terms,
                        definition:
                            data[this.state.activeConcept].content.definition,
                    },
                    settings: {
                        virtual_keyboard:
                            data[this.state.activeConcept].settings
                                .virtual_keyboard,
                        limited:
                            data[this.state.activeConcept].settings.limited,
                    },
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    data[this.state.activeConcept].concepts_random_id =
                        result.concepts_random_id;
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

    // Run the image API once the concepts is added
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

            form_data.append("chapter_id", this.chapterId);
            form_data.append("topic_name", this.topicName);
            form_data.append(
                "concepts_random_id",
                conceptValues[this.state.activeConcept].concepts_random_id
            );

            if (
                conceptValues[this.state.activeConcept].content.video.url !== ""
            ) {
                form_data.append(
                    "video_url",
                    conceptValues[this.state.activeConcept].content.video.url
                );
            }

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
                    conceptValues[this.state.activeConcept]
                        .is_image_uploaded === false
                ) {
                    this.handleImgPOST(options, form_data, conceptValues);
                } else {
                    this.handleImgPATCH(options, form_data, conceptValues);
                }
            } else {
                this.setState(
                    {
                        concepts: conceptValues,
                        successMsg: "Concepts added",
                        showSuccessAlert: true,
                        showLoader: false,
                    },
                    () => {
                        setTimeout(() => {
                            this.setState({
                                showEdit_option: false,
                                contentCollapsed: true,
                                imageCollapsed: true,
                                audioCollapsed: true,
                                settingsCollapsed: true,
                                page_loading: true,
                                activeConcept:''
                            });
                            this.loadConceptData();
                        }, 1000);
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
                    this.setState(
                        {
                            concepts: conceptValues,
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        },
                        () => {
                            setTimeout(() => {
                                this.setState({
                                    showEdit_option: false,
                                    contentCollapsed: true,
                                    imageCollapsed: true,
                                    audioCollapsed: true,
                                    settingsCollapsed: true,
                                    page_loading: true,
                                    activeConcept:''
                                });
                                this.loadConceptData();
                            }, 1000);
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
                    this.setState(
                        {
                            concepts: conceptValues,
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        },
                        () => {
                            setTimeout(() => {
                                this.setState({
                                    showEdit_option: false,
                                    contentCollapsed: true,
                                    imageCollapsed: true,
                                    audioCollapsed: true,
                                    settingsCollapsed: true,
                                    page_loading: true,
                                    activeConcept:''
                                });
                                this.loadConceptData();
                            }, 1000);
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

        this.setState({
            showImageSuccessAlert: false,
            showImageErrorAlert: false,
        });

        if (
            values[this.state.activeConcept].concepts_random_id !== "" &&
            values[this.state.activeConcept].is_image_uploaded === true
        ) {
            let body = {
                chapter_id: this.chapterId,
                topic_name: this.topicName,
                concepts_random_id:
                    values[this.state.activeConcept].concepts_random_id,
            };
            body[`concepts_image_${index + 1}_title`] =
                values[this.state.activeConcept].content.images[index].title;

            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/files/`,
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
                        values[this.state.activeConcept].content.images.splice(
                            index,
                            1
                        );
                        this.setState(
                            {
                                concepts: values,
                            },
                            () => {
                                if (
                                    values[this.state.activeConcept].content
                                        .images.length === 0
                                ) {
                                    values[
                                        this.state.activeConcept
                                    ].content.images.push({
                                        title: "",
                                        file_name: "",
                                        image: null,
                                        path: "",
                                    });
                                }
                                this.setState({
                                    concepts: values,
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
            values[this.state.activeConcept].content.images.splice(index, 1);
            this.setState(
                {
                    concepts: values,
                },
                () => {
                    if (
                        values[this.state.activeConcept].content.images
                            .length === 0
                    ) {
                        values[this.state.activeConcept].content.images.push({
                            title: "",
                            file_name: "",
                            image: null,
                            path: "",
                        });
                    }
                    this.setState({
                        concepts: values,
                    });
                }
            );
        }
    };

    handleImageFile = (index, event) => {
        this.setState({
            showImageErrorAlert: false,
        });

        let values = [...this.state.concepts];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(jpg|jpeg|png|webp)$/)) {
            this.setState({
                errorMsg: "Please select valid image file",
                showImageErrorAlert: true,
                btnDisabled: true,
            });
        } else {
            values[this.state.activeConcept].content.images[index].file_name =
                event.target.files[0].name;
            values[this.state.activeConcept].content.images[
                index
            ].path = URL.createObjectURL(event.target.files[0]);
            values[this.state.activeConcept].content.images[index].image =
                event.target.files[0];
            this.setState({
                concepts: values,
                btnDisabled: false,
                showImageErrorAlert: false,
            });
        }
    };

    clearImages = () => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.images = [
            {
                title: "",
                file_name: "",
                image: null,
                path: "",
            },
        ];
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
        this.setState({
            showVideoErrorAlert: false,
        });

        let values = [...this.state.concepts];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(mpeg|flv|avi|mov|mp4|mkv)$/)) {
            this.setState({
                errorMsg: "Please select valid video file",
                showVideoErrorAlert: true,
                btnDisabled: true,
            });
        } else {
            values[this.state.activeConcept].content.video.file_name =
                event.target.files[0].name;
            values[
                this.state.activeConcept
            ].content.video.path = URL.createObjectURL(event.target.files[0]);
            values[this.state.activeConcept].content.video.video =
                event.target.files[0];
            values[this.state.activeConcept].content.video.url = "";
            this.setState({
                concepts: values,
                btnDisabled: false,
                showVideoErrorAlert: false,
            });
        }
    };

    handleVideoUrl = (event) => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.video.url = event.target.value;
        values[this.state.activeConcept].content.video.path =
            event.target.value;
        values[this.state.activeConcept].content.video.file_name = "";
        values[this.state.activeConcept].content.video.path = "";
        this.setState({
            concepts: values,
        });
    };

    clearVideo = () => {
        const values = [...this.state.concepts];

        if (
            values[this.state.activeConcept].concepts_random_id !== "" &&
            values[this.state.activeConcept].is_image_uploaded === true
        ) {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/files/`,
                {
                    method: "DELETE",
                    headers: this.headers,
                    body: JSON.stringify({
                        chapter_id: this.chapterId,
                        topic_name: this.topicName,
                        concepts_random_id:
                            values[this.state.activeConcept].concepts_random_id,
                        concepts_video_1_title:
                            values[this.state.activeConcept].content.video
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
                        values[this.state.activeConcept].content.video.title =
                            "";
                        values[
                            this.state.activeConcept
                        ].content.video.file_name = "";
                        values[
                            this.state.activeConcept
                        ].content.video.video = null;
                        values[this.state.activeConcept].content.video.path =
                            "";
                        values[this.state.activeConcept].content.video.url = "";
                        this.setState({
                            concepts: values,
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
            values[this.state.activeConcept].content.video.title = "";
            values[this.state.activeConcept].content.video.file_name = "";
            values[this.state.activeConcept].content.video.video = null;
            values[this.state.activeConcept].content.video.path = "";
            values[this.state.activeConcept].content.video.url = "";
            this.setState({
                concepts: values,
            });
        }
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

    handleAddAudioFields = () => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.audio.push({
            title: "",
            file_name: "",
            audio: null,
            path: "",
        });
        this.setState({
            concepts: values,
        });
    };

    handleRemoveAudioFields = (index) => {
        const values = [...this.state.concepts];

        this.setState({
            showAudioSuccessAlert: false,
            showAudioErrorAlert: false,
        });

        if (
            values[this.state.activeConcept].concepts_random_id !== "" &&
            values[this.state.activeConcept].is_image_uploaded === true
        ) {
            let body = {
                chapter_id: this.chapterId,
                topic_name: this.topicName,
                concepts_random_id:
                    values[this.state.activeConcept].concepts_random_id,
            };
            body[`concepts_audio_${index + 1}_title`] =
                values[this.state.activeConcept].content.audio[index].title;

            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/files/`,
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
                        values[this.state.activeConcept].content.audio.splice(
                            index,
                            1
                        );
                        this.setState(
                            {
                                concepts: values,
                            },
                            () => {
                                if (
                                    values[this.state.activeConcept].content
                                        .audio.length === 0
                                ) {
                                    values[
                                        this.state.activeConcept
                                    ].content.audio.push({
                                        title: "",
                                        file_name: "",
                                        audio: null,
                                        path: "",
                                    });
                                }
                                this.setState({
                                    concepts: values,
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
            values[this.state.activeConcept].content.audio.splice(index, 1);
            this.setState(
                {
                    concepts: values,
                },
                () => {
                    if (
                        values[this.state.activeConcept].content.audio
                            .length === 0
                    ) {
                        values[this.state.activeConcept].content.audio.push({
                            title: "",
                            file_name: "",
                            audio: null,
                            path: "",
                        });
                    }
                    this.setState({
                        concepts: values,
                    });
                }
            );
        }
    };

    handleAudioFile = (index, event) => {
        this.setState({
            showAudioErrorAlert: false,
        });

        const values = [...this.state.concepts];
        const file = event.target.files[0].name.toLowerCase();
        if (!file.match(/\.(wav|mp3)$/)) {
            this.setState({
                errorMsg: "Please select valid audio file",
                showAudioErrorAlert: true,
                btnDisabled: true,
            });
        } else {
            values[this.state.activeConcept].content.audio[index].file_name =
                event.target.files[0].name;
            values[this.state.activeConcept].content.audio[
                index
            ].path = URL.createObjectURL(event.target.files[0]);
            values[this.state.activeConcept].content.audio[index].audio =
                event.target.files[0];
            this.setState({
                concepts: values,
                btnDisabled: false,
                showAudioErrorAlert: false,
            });
        }
    };

    clearAudios = () => {
        const values = [...this.state.concepts];
        values[this.state.activeConcept].content.audio = [
            { title: "", file_name: "", audio: null, path: "" },
        ];
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
            chapter_id: this.props.match.params.chapterId,
            topic_name: this.props.match.params.topicName,
            concepts_random_id: "",
            is_image_uploaded: false,
            content: {
                terms: "<p>Terms goes here</p>",
                definition: "<p>Definition goes here</p>",
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
            settings: {
                virtual_keyboard: [],
                limited: false,
            },
        });
        this.setState({
            concepts: values,
            keyboards: keyboards,
            flipState: flips,
            activeConcept: values.length - 1,
        });
    };

    removingConcept = (index) => {
        const values = [...this.state.concepts];
        const keyboards = [...this.state.keyboards];
        const flips = [...this.state.flipState];

        this.setState({
            showEdit_option: false,
            contentCollapsed: true,
            imageCollapsed: true,
            audioCollapsed: true,
            settingsCollapsed: true,
            activeConcept: index,
        });

        if (values[index].concepts_random_id !== "") {
            this.setState({
                selectedConcept: values[index].concepts_random_id,
                showConceptDelete_Modal: !this.state.showConceptDelete_Modal,
            });
        } else {
            flips.splice(index, 1);
            keyboards.splice(index, 1);
            values.splice(index, 1);
            this.setState(
                {
                    concepts: values,
                    keyboards: keyboards,
                    flipState: flips,
                    activeConcept: "",
                },
                () => {
                    if (values.length === 0) {
                        flips.push(false);
                        keyboards.push({
                            all: false,
                            chemistry: false,
                            physics: false,
                            maths: false,
                        });
                        values.push({
                            chapter_id: this.props.match.params.chapterId,
                            topic_name: this.props.match.params.topicName,
                            concepts_random_id: "",
                            is_image_uploaded: false,
                            content: {
                                terms: "<p>Terms goes here</p>",
                                definition: "<p>Definition goes here</p>",
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
                    }
                }
            );
        }
    };

    closeConcept_DeleteModal = () => {
        this.setState({
            showConceptDelete_Modal: !this.state.showConceptDelete_Modal,
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
        values.push({
            chapter_id: this.chapterId,
            topic_name: this.topicName,
            concepts_random_id: "",
            is_image_uploaded: false,
            content: {
                terms: values[index].content.terms,
                definition: values[index].content.definition,
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
            settings: {
                virtual_keyboard: values[index].settings.virtual_keyboard,
                limited: values[index].settings.limited,
            },
        });
        this.setState({
            concepts: values,
            keyboards: keyboards,
            flipState: flips,
            activeConcept: values.length - 1,
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

    handleConcept_Deletion = (isMCQ_Deleted) => {
        if (isMCQ_Deleted === true) {
            const values = [...this.state.concepts];
            const keyboards = [...this.state.keyboards];
            const flips = [...this.state.flipState];

            flips.splice(this.state.activeConcept, 1);
            keyboards.splice(this.state.activeConcept, 1);
            values.splice(this.state.activeConcept, 1);

            this.setState(
                {
                    concepts: values,
                    keyboards: keyboards,
                    flipState: flips,
                    activeConcept: "",
                },
                () => {
                    if (values.length === 0) {
                        flips.push(false);
                        keyboards.push({
                            all: false,
                            chemistry: false,
                            physics: false,
                            maths: false,
                        });
                        values.push({
                            chapter_id: this.props.match.params.chapterId,
                            topic_name: this.props.match.params.topicName,
                            concepts_random_id: "",
                            is_image_uploaded: false,
                            content: {
                                terms: "<p>Terms goes here</p>",
                                definition: "<p>Definition goes here</p>",
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
                    }
                }
            );
            setTimeout(() => {
                this.setState(
                    {
                        showConceptDelete_Modal: false,
                        page_loading: true,
                    },
                    () => {
                        this.loadConceptData();
                    }
                );
            }, 1000);
        }
    };

    // -------------------------- Publishing the concept --------------------------

    handlePublish = () => {
        this.setState({
            showPublishSuccessAlert: false,
            showPublishErrorAlert: false,
            showPublishLoader: true,
        });

        const concepts = [...this.state.concepts];
        let id = [];
        for (let i = 0; i < concepts.length; i++) {
            if (concepts[i].concepts_random_id !== "") {
                id.push(concepts[i].concepts_random_id);
            } else {
                continue;
            }
        }

        if (id.length !== 0) {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/chapter/concepts/publish/`,
                {
                    headers: this.headers,
                    method: "POST",
                    body: JSON.stringify({
                        concept_ids: id,
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
        let isImageAvailable = false;
        if (this.state.activeConcept !== "") {
            if (data[this.state.activeConcept].content !== undefined) {
                for (
                    let i = 0;
                    i < data[this.state.activeConcept].content.images.length;
                    i++
                ) {
                    isImageAvailable =
                        data[this.state.activeConcept].content.images[i]
                            .path !== ""
                            ? true
                            : false;
                }
            }
        }
        let isAudioAvailable = false;
        if (this.state.activeConcept !== "") {
            if (data[this.state.activeConcept].content !== undefined) {
                for (
                    let i = 0;
                    i < data[this.state.activeConcept].content.audio.length;
                    i++
                ) {
                    isAudioAvailable =
                        data[this.state.activeConcept].content.audio[i].path !==
                        ""
                            ? true
                            : false;
                }
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

                {/* Concept Deletion Modal */}
                {this.state.showConceptDelete_Modal ? (
                    <ConceptsDeleteModal
                        show={this.state.showConceptDelete_Modal}
                        onHide={this.closeConcept_DeleteModal}
                        toggleModal={this.closeConcept_DeleteModal}
                        formSubmission={this.handleConcept_Deletion}
                        subjectId={this.subjectId}
                        chapter_id={this.chapterId}
                        topic_name={this.topicName}
                        values={this.state.selectedConcept}
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
                            {/* ------------------------------ Terms Column ------------------------------ */}
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
                                            {`${this.props.chapter_name} | ${this.props.topic_name} - Concepts`}
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
                                                    <div
                                                        className={`card shadow-sm ${
                                                            this.state
                                                                .activeConcept ===
                                                            c_index
                                                                ? "border-primary"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="card-body">
                                                            <div className="row">
                                                                {/* term */}
                                                                <div className="col-md-11 pr-md-0">
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
                                                                {/* File modal button */}
                                                                <div className="col-1 pl-0 text-right">
                                                                    <button
                                                                        className="btn btn-light bg-white shadow-sm"
                                                                        onClick={() =>
                                                                            this.toggleModal(
                                                                                concept
                                                                                    .content
                                                                                    .images,
                                                                                concept
                                                                                    .content
                                                                                    .video,
                                                                                concept
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
                                                    <div
                                                        className={`card shadow-sm ${
                                                            this.state
                                                                .activeConcept ===
                                                            c_index
                                                                ? "border-primary"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="card-body">
                                                            <div className="row">
                                                                {/* definition */}
                                                                <div className="col-md-11 pr-md-0">
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
                                                                {/* File modal button */}
                                                                <div className="col-1 pl-0 text-right">
                                                                    <button
                                                                        className="btn btn-light bg-white shadow-sm"
                                                                        onClick={() =>
                                                                            this.toggleModal(
                                                                                concept
                                                                                    .content
                                                                                    .images,
                                                                                concept
                                                                                    .content
                                                                                    .video,
                                                                                concept
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
                                                    imageCollapsed: true,
                                                    audioCollapsed: true,
                                                    settingsCollapsed: true,
                                                    activeConcept:''
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
                                                                .activeConcept
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
                                                            autoComplete="off"
                                                            className="form-control form-control-sm border-secondary mb-1"
                                                            value={
                                                                data[
                                                                    this.state
                                                                        .activeConcept
                                                                ].content.video
                                                                    .title
                                                            }
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
                                                            value={
                                                                data[
                                                                    this.state
                                                                        .activeConcept
                                                                ].content.video
                                                                    .url
                                                            }
                                                        />
                                                        <small className="form-text text-muted mb-2">
                                                            Only https supported
                                                            video
                                                        </small>
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
                                                        <div className="text-right mb-2">
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
                                                                .activeConcept
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

export default connect(mapStateToProps)(SubjectConcepts);
