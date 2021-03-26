import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import { Document, Page, pdfjs } from "react-pdf";
import Loading from "../sharedComponents/loader";
import dateFormat from "dateformat";
import AlertBox from "../sharedComponents/alert";

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
    cycle_name: state.cycle_name,
});

class CyleTestDirect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            isFileUploaded: false,

            pdf: {
                file_name: null,
                file: null,
            },
            exam_date: "",
            starts_at: "",
            ends_at: "",
            valid_from: "",
            valid_to: "",

            path: null,
            numPages: null,
            pageNumber: 1,
            btnDisabled: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
        this.cycle_testId = this.props.match.params.cycle_testId;
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    loadCycletestData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/files/`,
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
                        isFileUploaded:
                            result.data.direct_question_urls.length === 0
                                ? false
                                : true,
                        path:
                            result.data.direct_question_urls.length !== 0
                                ? result.data.direct_question_urls[0]
                                : null,
                        exam_date:
                            result.data.exam_date !== null
                                ? dateFormat(
                                      result.data.exam_date,
                                      "yyyy-mm-dd 00:00:00"
                                  )
                                : "",
                        starts_at:
                            result.data.starts_at !== null
                                ? dateFormat(result.data.starts_at, "HH:MM:ss")
                                : "",
                        ends_at:
                            result.data.ends_at !== null
                                ? dateFormat(result.data.ends_at, "HH:MM:ss")
                                : "",
                        valid_from: dateFormat(
                            result.group_valid_from,
                            "yyyy-mm-dd"
                        ),
                        valid_to: dateFormat(
                            result.group_valid_to,
                            "yyyy-mm-dd"
                        ),
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
                this.setState({
                    page_loading: false,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = `${this.props.chapter_name} - Teacher | IQLabs`;

        this.loadCycletestData();
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
        } else if (event.target.files[0].size > 5242880) {
            this.setState({
                errorMsg: "File sixe exceeds more then 5MB!",
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

    handleDate = (event) => {
        this.setState({
            exam_date: `${dateFormat(
                event.target.value,
                "yyyy-mm-dd"
            )} 00:00:00`,
        });
    };

    handleTime = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: `${value}:00`,
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showSuccessAlert: false,
            showErrorAlert: false,
        });

        const pdf = this.state.pdf;

        let form_data = new FormData();

        form_data.append("cycle_test_id", this.cycle_testId);
        form_data.append("chapter_id", this.chapterId);
        form_data.append("exam_date", this.state.exam_date);
        form_data.append("starts_at", this.state.starts_at);
        form_data.append("ends_at", this.state.ends_at);
        if (pdf.file !== null) {
            form_data.append("cycle_test_file_1", pdf.file);
        }

        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.authToken,
            },
        };

        if (this.state.exam_date === "") {
            this.setState({
                errorMsg: "Please select Exam date",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (this.state.starts_at === "") {
            this.setState({
                errorMsg: "Please select Starts at timings",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (this.state.ends_at === "") {
            this.setState({
                errorMsg: "Please select Ends at timings",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            if (this.state.isFileUploaded === true) {
                this.handlePATCH(form_data, options);
            } else {
                this.handlePOST(form_data, options);
            }
        }
    };

    handlePOST = (form_data, options) => {
        const pdf = this.state.pdf;
        let extension = "";

        if (pdf.file_name !== null) {
            extension = pdf.file_name.split(".");
        }

        if (pdf.file === null) {
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
        } else if (pdf.file.size > 5242880) {
            this.setState({
                errorMsg: "File sixe exceeds more then 5MB!",
                showErrorAlert: true,
            });
        } else {
            axios
                .post(
                    `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/files/`,
                    form_data,
                    options
                )
                .then((result) => {
                    console.log(result);
                    if (result.data.sts === true) {
                        this.setState(
                            {
                                successMsg: result.data.msg,
                                showSuccessAlert: true,
                                showLoader: false,
                                pdf: { file: null, file_name: null },
                            },
                            () => {
                                this.setState({
                                    page_loading: true,
                                });
                                this.loadCycletestData();
                            }
                        );
                    } else if (result.data.sts === false) {
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
                    this.setState({
                        errorMsg: err.response.data.detail
                            ? err.response.data.detail
                            : err.response.data.msg,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                });
        }
    };

    handlePATCH = (form_data, options) => {
        const pdf = this.state.pdf;
        let extension = "";

        if (pdf.file_name !== null) {
            extension = pdf.file_name.split(".");
        }

        if (extension !== "") {
            if (extension[extension.length - 1].toLowerCase() !== "pdf") {
                this.setState({
                    errorMsg: "Invalid file format!",
                    showErrorAlert: true,
                });
            } else if (pdf.file.size > 5242880) {
                this.setState({
                    errorMsg: "File sixe exceeds more then 5MB!",
                    showErrorAlert: true,
                });
            } else {
                axios
                    .patch(
                        `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/files/`,
                        form_data,
                        options
                    )
                    .then((result) => {
                        console.log(result);
                        if (result.data.sts === true) {
                            this.setState(
                                {
                                    successMsg: result.data.msg,
                                    showSuccessAlert: true,
                                    showLoader: false,
                                    pdf: { file: null, file_name: null },
                                },
                                () => {
                                    this.setState({
                                        page_loading: true,
                                    });
                                    this.loadCycletestData();
                                }
                            );
                        } else if (result.data.sts === false) {
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
                        this.setState({
                            errorMsg: err.response.data.detail
                                ? err.response.data.detail
                                : err.response.data.msg,
                            showErrorAlert: true,
                            showLoader: false,
                        });
                    });
            }
        } else {
            axios
                .patch(
                    `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/files/`,
                    form_data,
                    options
                )
                .then((result) => {
                    console.log(result);
                    if (result.data.sts === true) {
                        this.setState(
                            {
                                successMsg: result.data.msg,
                                showSuccessAlert: true,
                                showLoader: false,
                                pdf: { file: null, file_name: null },
                            },
                            () => {
                                this.setState({
                                    page_loading: true,
                                });
                                this.loadCycletestData();
                            }
                        );
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

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <h5 className="primary-text mb-0">
                                    {this.props.cycle_name}
                                </h5>
                            </div>
                            <div className="col-md-6 text-right">
                                <Link to={`${this.props.match.url}/student/1`}>
                                    <button className="btn btn-primary btn-sm">
                                        Evaluate Student
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Header configuration */}
                        <div className="row justify-content-center mb-3">
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="date">Exam Date:</label>
                                    <input
                                        type="date"
                                        name="exam_date"
                                        id="exam_date"
                                        className="form-control form-shadow"
                                        value={dateFormat(
                                            this.state.exam_date,
                                            "yyyy-mm-dd"
                                        )}
                                        min={this.state.valid_from}
                                        max={this.state.valid_to}
                                        onChange={this.handleDate}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="starts_at">
                                        Starts at:
                                    </label>
                                    <input
                                        type="time"
                                        name="starts_at"
                                        id="starts_at"
                                        className="form-control form-shadow"
                                        value={this.state.starts_at}
                                        onChange={this.handleTime}
                                    />
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-group">
                                    <label htmlFor="ends_at">Ends at:</label>
                                    <input
                                        type="time"
                                        name="ends_at"
                                        id="ends_at"
                                        className="form-control form-shadow"
                                        value={this.state.ends_at}
                                        onChange={this.handleTime}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="card light-bg shadow-sm">
                            <div className="card-body">
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
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
                                            className="btn btn-primary btn-block btn-sm shadow-none"
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
                                    </div>
                                </div>
                            </div>
                            <div className="card-body secondary-bg primary-text text-center">
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
                                                    className={"PDFPage shadow"}
                                                />
                                            </Document>
                                        </div>
                                        <p className="my-3">
                                            Page {this.state.pageNumber} of{" "}
                                            {this.state.numPages}
                                        </p>
                                        <nav>
                                            {this.state.numPages > 1 ? (
                                                <>
                                                    <button
                                                        className="btn btn-primary btn-sm shadow-none mr-2"
                                                        onClick={
                                                            this.goToPrevPage
                                                        }
                                                        disabled={
                                                            this.state
                                                                .pageNumber ===
                                                            1
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        Prev
                                                    </button>
                                                    <button
                                                        className="btn btn-primary btn-sm shadow-none"
                                                        onClick={
                                                            this.goToNextPage
                                                        }
                                                        disabled={
                                                            this.state
                                                                .numPages ===
                                                            this.state
                                                                .pageNumber
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        Next
                                                    </button>
                                                </>
                                            ) : (
                                                ""
                                            )}
                                        </nav>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CyleTestDirect);
