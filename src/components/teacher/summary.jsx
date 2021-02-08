import React, { Component } from "react";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import Switch from "react-switch";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import CKeditor from "../sharedComponents/CKeditor";
import Loading from "../sharedComponents/loader";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import CKFinder from "@ckeditor/ckeditor5-ckfinder/src/ckfinder";

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

        let extension = event.target.files[0].name.split(".");
        let format = ["jpg", "jpeg", "png", "webp"];

        if (!format.includes(extension[extension.length - 1].toLowerCase())) {
            this.setState({
                errorMsg: "Invalid file format!",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (event.target.files[0].size > 5000000) {
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
        }
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.showSuccessAlert !== this.state.showSuccessAlert &&
            this.state.showSuccessAlert === true
        ) {
            setTimeout(() => {
                this.setState({
                    showSuccessAlert: false,
                });
            }, 2000);
        }

        if (
            prevState.showErrorAlert !== this.state.showErrorAlert &&
            this.state.showErrorAlert === true
        ) {
            setTimeout(() => {
                this.setState({
                    showErrorAlert: false,
                });
            }, 3000);
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

class SubjectSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            limited: false,
            title: "",
            content: "",
            summary_id: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            image: [],
            page_loading: true,
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

    loadSummaryData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/summary/?chapter_name=${this.chapterName}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    title: result.data[0].summary_name
                        ? result.data[0].summary_name
                        : "",
                    content: result.data[0].summary_content
                        ? result.data[0].summary_content
                        : "",
                    limited: result.data[0].limited
                        ? result.data[0].limited
                        : false,
                    summary_id: result.data[0].summary_id
                        ? result.data[0].summary_id
                        : "",
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
        document.title = `${this.chapterName} Summary - Teacher | IQLabs`;

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
            });
        } else if (this.state.content === "") {
            this.setState({
                errorMsg: "Please add summary data",
                showErrorAlert: true,
            });
        } else {
            if (this.state.summary_id === "") {
                this.handlePOST();
            } else {
                this.handlePATCH();
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
                chapter_name: this.chapterName,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
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
                console.log(result);
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
                chapter_name: this.chapterName,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
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
                            {/* <CKEditor
                                editor={ClassicEditor}
                                data="<p>Hello from CKEditor 5!</p>"
                                config={{
                                    plugins: [CKFinder],
                                    toolbar: ["ckfinder"],
                                    ckfinder: {
                                        uploadUrl:
                                            "https://example.com/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images&responseType=json",
                                        options: {
                                            resourceType: "Images",
                                        },
                                    },
                                }}
                            /> */}
                        </div>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectSummary;
