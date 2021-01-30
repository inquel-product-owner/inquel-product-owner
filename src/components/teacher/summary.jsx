import React, { Component } from "react";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import Switch from "react-switch";
import CKEditor from "ckeditor4-react-advanced";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class ImageUploadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: this.props.image,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            copiedImage: "",
        };
        this.subjectId = this.props.subjectId;
        this.chapterName = this.props.chapterName;
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
    }

    handleImageFile = (event) => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        let form_data = new FormData();
        form_data.append("chapter_name", this.chapterName);
        form_data.append("summary_image_1", event.target.files[0]);

        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.authToken,
            },
        };

        axios
            .post(
                `${this.url}/teacher/subject/${this.subjectId}/summary/files/`,
                form_data,
                options
            )
            .then((result) => {
                console.log(result);
                if (result.data.url && result.data.sts === true) {
                    const image = this.state.image;
                    image.push({
                        file_name: event.target.files[0].name,
                        path: result.data.url,
                    });
                    this.setState({
                        successMsg: result.data.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                        image: image,
                    });
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

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header
                    closeButton
                    className="primary-text font-weight-bold align-items-center"
                >
                    Upload Image
                    {this.state.showLoader ? (
                        <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="ml-3 mb-0"
                        />
                    ) : (
                        ""
                    )}
                </Modal.Header>
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

                    <div className="custom-file mb-2">
                        <input
                            type="file"
                            className="custom-file-input"
                            id="img1"
                            accept="image/*"
                            aria-describedby="inputGroupFileAddon01"
                            onChange={(event) => this.handleImageFile(event)}
                        />
                        <label className="custom-file-label" htmlFor="img1">
                            Choose file
                        </label>
                    </div>
                    {this.state.image.length !== 0
                        ? this.state.image.map((image, index) => {
                              return (
                                  <div
                                      className="d-flex align-items-center mb-2"
                                      key={index}
                                  >
                                      <p className="small text-primary text-break mb-0 mr-3">
                                          {image.file_name}
                                      </p>
                                      <CopyToClipboard
                                          text={image.path}
                                          onCopy={() => {
                                              this.setState({
                                                  copiedImage: index,
                                              });
                                              setTimeout(() => {
                                                  this.setState({
                                                      copiedImage: "",
                                                  });
                                              }, 3000);
                                          }}
                                      >
                                          <button className="btn btn-light btn-sm">
                                              <i className="far fa-copy"></i>
                                              {this.state.copiedImage ===
                                              index ? (
                                                  <span className="ml-2">
                                                      Copied
                                                  </span>
                                              ) : (
                                                  <span className="ml-2">
                                                      Copy image link
                                                  </span>
                                              )}
                                          </button>
                                      </CopyToClipboard>
                                  </div>
                              );
                          })
                        : ""}
                </Modal.Body>
            </Modal>
        );
    }
}

class SubjectSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            limited: false,
            title: "",
            content: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            image: [],
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterName = this.props.match.params.chapterName;
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

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    handleSwitch = () => {
        this.setState({
            limited: !this.state.limited,
        });
    };

    componentDidMount = () => {
        document.title = `${this.chapterName} Summary - Teacher | IQLabs`;

        // CKEditor.editorUrl = '../../ckeditor/ckeditor.js';
    };

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

        fetch(`${this.url}/teacher/subject/${this.subjectId}/summary/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                limited: this.state.limited,
                summary_name: this.state.title,
                summary_content: this.state.content,
                chapter_name: this.chapterName,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
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

                {/* Image modal */}
                {this.state.showModal ? (
                    <ImageUploadModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        image={this.state.image}
                        subjectId={this.subjectId}
                        chapterName={this.chapterName}
                    />
                ) : (
                    ""
                )}

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        <div className="card secondary-bg mb-3">
                            <div className="card-body p-3">
                                <div className="row align-items-center">
                                    <div className="col-md-6">
                                        <p className="small mb-0">
                                            <span className="font-weight-bold">
                                                Summary:
                                            </span>{" "}
                                            {
                                                this.props.match.params
                                                    .chapterName
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                                        <button className="btn btn-primary btn-sm mr-3">
                                            Preview
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm mr-3"
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
                                            className="btn btn-primary btn-sm mr-3"
                                            onClick={this.toggleModal}
                                        >
                                            Upload Image
                                        </button>
                                        <div className="d-flex justify-content-end">
                                            <span className="mr-2 small primary-text font-weight-bold">
                                                Limited
                                            </span>
                                            <Switch
                                                checked={this.state.limited}
                                                onChange={this.handleSwitch}
                                                onColor="#621012"
                                                onHandleColor="#efd2ac"
                                                handleDiameter={12}
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                height={18}
                                                width={35}
                                                className="react-switch"
                                                id="select-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Alert
                            variant="danger"
                            show={this.state.showErrorAlert}
                            onClose={() => {
                                this.setState({
                                    showErrorAlert: false,
                                });
                            }}
                            className="my-2"
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
                            className="my-2"
                            dismissible
                        >
                            {this.state.successMsg}
                        </Alert>

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="form-control border-secondary"
                                    placeholder="Add summary title"
                                    onChange={this.handleTitle}
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>

                        {/* Editor */}
                        <div className="card shadow-sm">
                            <CKEditor
                                data=""
                                onChange={this.onEditorChange}
                                config={{
                                    toolbar: [
                                        [
                                            "Source",
                                            "-",
                                            "Save",
                                            "NewPage",
                                            "Preview",
                                            "Print",
                                            "-",
                                            "Templates",
                                        ],
                                        [
                                            "Cut",
                                            "Copy",
                                            "Paste",
                                            "PasteText",
                                            "PasteFromWord",
                                            "-",
                                            "Undo",
                                            "Redo",
                                        ],
                                        [
                                            "Find",
                                            "Replace",
                                            "SelectAll",
                                            "Scayt",
                                        ],
                                        ["Maximize"],
                                        [
                                            "Form",
                                            "Checkbox",
                                            "Radio",
                                            "TextField",
                                            "Textarea",
                                            "Select",
                                            "Button",
                                            "ImageButton",
                                            "HiddenField",
                                        ],
                                        [
                                            "Image",
                                            "Flash",
                                            "Table",
                                            "HorizontalRule",
                                            "Smiley",
                                            "SpecialChar",
                                            "PageBreak",
                                            "Iframe",
                                        ],
                                        ["Link", "Unlink", "Anchor"],
                                        [
                                            "Bold",
                                            "Italic",
                                            "Underline",
                                            "Strike",
                                            "Subscript",
                                            "Superscript",
                                        ],
                                        ["Font", "FontSize"],
                                        ["TextColor", "BGColor"],
                                        [
                                            "JustifyLeft",
                                            "JustifyCenter",
                                            "JustifyRight",
                                            "JustifyBlock",
                                            "-",
                                            "NumberedList",
                                            "BulletedList",
                                            "-",
                                            "Outdent",
                                            "Indent",
                                            "-",
                                            "Blockquote",
                                            "CreateDiv",
                                            "-",
                                            "BidiLtr",
                                            "BidiRtl",
                                            "Language",
                                        ],
                                    ],
                                    height: "350px",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectSummary;
