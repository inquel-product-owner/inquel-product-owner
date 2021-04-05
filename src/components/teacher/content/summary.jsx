import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import Switch from "react-switch";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../../shared/baseUrl.js";
import CKeditor from "../../sharedComponents/CKeditor";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import { ContentDeleteModal } from "../../sharedComponents/contentManagementModal";

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
});

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
        this.chapterId = this.props.chapterId;
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
        form_data.append("chapter_id", this.chapterId);
        form_data.append("summary_image_1", event.target.files[0]);

        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.authToken,
            },
        };

        let extension = event.target.files[0].name.split(".");
        let format = ["jpg", "jpeg", "png", "webp"];

        if (!format.includes(extension[extension.length - 1].toLowerCase())) {
            this.setState({
                errorMsg: "Invalid file format!",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (event.target.files[0].size > 5242880) {
            this.setState({
                errorMsg: "File sixe exceeds more then 5MB!",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
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
                        this.setState({
                            errorMsg: result.data.detail
                                ? result.data.detail
                                : result.data.msg,
                            showErrorAlert: true,
                            showLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
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
                <Modal.Header closeButton className="align-items-center">
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

                    <div className="custom-file">
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
                    <small
                        className="form-text text-muted mb-2"
                        style={{ marginTop: "0px" }}
                    >
                        Select only .png .jpg .jpeg .webp format. Max size is
                        5MB
                    </small>

                    {this.state.image.length !== 0
                        ? this.state.image.map((image, index) => {
                              return (
                                  <div
                                      className="row align-items-center mb-2"
                                      key={index}
                                  >
                                      <div className="col-md-2">
                                          <img
                                              src={image.path}
                                              alt={image.file_name}
                                              className="img-fluid rounded shadow-sm"
                                          />
                                      </div>
                                      <div className="col-md-10">
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
                                  </div>
                              );
                          })
                        : ""}
                </Modal.Body>
            </Modal>
        );
    }
}

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            showDeleteModal: false,
            showLoader: false,

            limited: false,
            title: "",
            content: "",
            summary_id: "",
            image: [],
            summary_name: "",
            url: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
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

    toggleImageModal = () => {
        this.setState({
            showModal: !this.state.showModal,
        });
    };

    toggleDeleteModal = () => {
        this.setState({
            showDeleteModal: !this.state.showDeleteModal,
        });
    };

    handleSwitch = () => {
        this.setState({
            limited: !this.state.limited,
        });
    };

    loadSummaryData = () => {
        this.setState({
            title: "",
            content: "",
            limited: false,
            summary_id: "",
            summary_name: "",
        });

        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/summary/?chapter_id=${this.chapterId}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true && result.data.length !== 0) {
                    this.setState({
                        title:
                            result.data[0].summary_name !== undefined
                                ? result.data[0].summary_name
                                : "",
                        content:
                            result.data[0].summary_content !== undefined
                                ? result.data[0].summary_content
                                : "",
                        limited:
                            result.data[0].summary_name !== undefined
                                ? result.data[0].limited
                                : false,
                        summary_id: result.data[0].summary_id,
                        summary_name: result.data[0].summary_name,
                        url: result.data[0].direct_question_urls,
                    });
                } else if (result.sts === false) {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                    });
                }
                this.setState({
                    page_loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
                this.setState({
                    page_loading: false,
                });
            });
    };

    componentDidMount = () => {
        document.title = `${this.props.chapter_name} Summary - Teacher | IQLabs`;

        this.loadSummaryData();
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
        if (this.state.title === "") {
            this.setState({
                errorMsg: "Please add summary title",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (this.state.content === "") {
            this.setState({
                errorMsg: "Please add summary data",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            if (this.state.url.length !== 0) {
                this.setState({
                    errorMsg: "Summary already exists!",
                    showErrorAlert: true,
                    showLoader: false,
                });
            } else {
                if (this.state.summary_id === "") {
                    this.handlePOST();
                } else {
                    this.handlePATCH();
                }
            }
        }
    };

    handlePOST = () => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/summary/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                limited: this.state.limited,
                summary_name: this.state.title,
                summary_content: this.state.content,
                chapter_id: this.chapterId,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        },
                        () => {
                            setTimeout(() => {
                                this.loadSummaryData();
                            }, 1000);
                        }
                    );
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

    handlePATCH = () => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/summary/`, {
            headers: this.headers,
            method: "PATCH",
            body: JSON.stringify({
                limited: this.state.limited,
                summary_name: this.state.title,
                summary_content: this.state.content,
                summary_id: this.state.summary_id,
                chapter_id: this.chapterId,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState(
                        {
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        },
                        () => {
                            setTimeout(() => {
                                this.loadSummaryData();
                            }, 1000);
                        }
                    );
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

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showDeleteModal: false,
            });
            this.loadSummaryData()
        }, 1000);
    };

    render() {
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

                {/* Image modal */}
                {this.state.showModal ? (
                    <ImageUploadModal
                        show={this.state.showModal}
                        onHide={this.toggleImageModal}
                        image={this.state.image}
                        subjectId={this.subjectId}
                        chapterId={this.chapterId}
                    />
                ) : (
                    ""
                )}

                {/* Delete Modal */}
                {this.state.showDeleteModal ? (
                    <ContentDeleteModal
                        show={this.state.showDeleteModal}
                        onHide={this.toggleDeleteModal}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/teacher/subject/${this.subjectId}/summary/`}
                        type="summary"
                        name=""
                        data={{ summary_id: this.state.summary_id }}
                        toggleModal={this.toggleDeleteModal}
                    />
                ) : null}

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
                                            {this.props.chapter_name}
                                        </p>
                                    </div>
                                    <div className="col-md-6 d-flex align-items-center justify-content-end">
                                        {this.state.summary_id !== "" &&
                                        this.state.summary_name !==
                                            undefined ? (
                                            <button
                                                className="btn btn-primary btn-sm shadow-none mr-2"
                                                onClick={this.toggleDeleteModal}
                                            >
                                                Delete
                                            </button>
                                        ) : null}
                                        <button
                                            className="btn btn-primary btn-sm shadow-none mr-2"
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
                                            className="btn btn-primary btn-sm shadow-none mr-3"
                                            onClick={this.toggleImageModal}
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

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    value={this.state.title}
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
                            <CKeditor
                                data={this.state.content}
                                onChange={this.onEditorChange}
                            />
                        </div>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Summary);
