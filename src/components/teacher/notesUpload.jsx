import React, { Component } from "react";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Spinner, Alert } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import { Document, Page, pdfjs } from "react-pdf";

class NotesUpload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            pdf: {
                file_name: null,
                file: null,
            },
            url: "",
            path: null,
            numPages: null,
            pageNumber: 1,
            btnDisabled: false,
        };
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

    componentDidMount = () => {
        document.title = `${this.chapterName} Notes - Teacher | IQLabs`;

        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    };

    handleFile = (event) => {
        const pdf = this.state.pdf;
        pdf.file_name = event.target.files[0].name;
        pdf.file = event.target.files[0];
        let extension = event.target.files[0].name.split(".");
        if (extension[extension.length - 1].toLowerCase() !== "pdf") {
            this.setState({
                errorMsg: "Invalid file format!",
                showErrorAlert: true,
                btnDisabled: true,
            });
        } else {
            this.setState({
                pdf: pdf,
                path: URL.createObjectURL(event.target.files[0]),
                btnDisabled: false,
            });
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showSuccessAlert: false,
            showErrorAlert: false,
        });

        const files = this.state.pdf;

        let form_data = new FormData();

        form_data.append("chapter_name", this.chapterName);
        form_data.append("topic_name", this.topicName);
        form_data.append("notes_file_1", files.file);

        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.authToken,
            },
        };

        const pdf = this.state.pdf;
        let extension = "";

        if (files.file !== null) {
            extension = pdf.file_name.split(".");
        }

        if (files.file === null) {
            this.setState({
                errorMsg: "Please upload a file",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (extension[extension.length - 1].toLowerCase() !== "pdf") {
            this.setState({
                errorMsg: "Invalid file format!",
                showErrorAlert: true,
            });
        } else if (pdf.size > 5000000) {
            this.setState({
                errorMsg: "File sixe exceeds more then 5MB!",
                showErrorAlert: true,
            });
        } else {
            axios
                .post(
                    `${this.url}/teacher/subject/${this.subjectId}/notes/files/`,
                    form_data,
                    options
                )
                .then((result) => {
                    console.log(result);
                    if (result.data.sts === true) {
                        this.setState({
                            successMsg: result.data.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                            url: result.data.url,
                        });
                    } else if (result.data.sts === false) {
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
                    if (err.response.data.detail) {
                        this.setState({
                            errorMsg: err.response.data.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: err.response.data.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                        showLoader: false,
                    });
                });
        }
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

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
                                            {this.chapterName} |{" "}
                                            {this.topicName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="card light-bg shadow-sm">
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
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
                                                id="question"
                                                accept=".pdf"
                                                aria-describedby="inputGroupFileAddon01"
                                                onChange={(event) =>
                                                    this.handleFile(event)
                                                }
                                            />
                                            <label
                                                className="custom-file-label mb-0"
                                                htmlFor="question"
                                            >
                                                {this.state.pdf.file_name ===
                                                null
                                                    ? "Choose file"
                                                    : this.state.pdf.file_name}
                                            </label>
                                        </div>
                                        <small
                                            id="passwordHelpBlock"
                                            className="form-text text-muted mb-2"
                                        >
                                            Select only pdf format & Max file
                                            upload size is 5MB
                                        </small>

                                        <button
                                            className="btn btn-primary btn-block btn-sm"
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
                                            Upload
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body secondary-bg text-white text-center">
                                {this.state.path === null ? (
                                    "Your uploads will appear here"
                                ) : (
                                    <>
                                        <div id="ResumeContainer">
                                            <Document
                                                file={this.state.path}
                                                onLoadSuccess={
                                                    this.onDocumentLoadSuccess
                                                }
                                                className={"PDFDocument"}
                                            >
                                                <Page
                                                    pageNumber={
                                                        this.state.pageNumber
                                                    }
                                                    className={
                                                        "PDFPagee shadow"
                                                    }
                                                />
                                            </Document>
                                        </div>
                                        <p className="my-3">
                                            Page {this.state.pageNumber} of{" "}
                                            {this.state.numPages}
                                        </p>
                                        <nav>
                                            <button
                                                className="btn btn-primary btn-sm mr-2"
                                                onClick={this.goToPrevPage}
                                                disabled={
                                                    this.state.pageNumber === 1
                                                        ? true
                                                        : false
                                                }
                                            >
                                                Prev
                                            </button>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={this.goToNextPage}
                                                disabled={
                                                    this.state.numPages ===
                                                    this.state.pageNumber
                                                        ? true
                                                        : false
                                                }
                                            >
                                                Next
                                            </button>
                                        </nav>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NotesUpload;
