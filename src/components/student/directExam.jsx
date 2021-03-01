import React, { Component } from "react";
import axios from "axios";
import Header from "./shared/examNavbar";
import { Spinner } from "react-bootstrap";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../sharedComponents/alert";
import Loading from "../sharedComponents/loader";
import { Document, Page, pdfjs } from "react-pdf";
import dateFormat from "dateformat";

class DirectExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject_name: "",
            chapter_name: "",
            cycleTestItem: [],
            url: null,
            question_url: null,
            pdf: {
                file_name: null,
                file: null,
            },
            numPages: null,
            pageNumber: 1,
            isFileUploaded: false,
            btnDisabled: true,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            page_loading: true,
        };
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
        pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    }

    toggleSuccessAlert = () => {
        this.setState({
            showSuccessAlert: false,
        });
    };
    toggleErrorAlert = () => {
        this.setState({
            showErrorAlert: false,
        });
    };

    loadExamData = () => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/direct/?cycle_test_id=${this.cycleTestId}`,
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
                        cycleTestItem: result.data,
                        url:
                            result.data.answer_file_url !== ""
                                ? result.data.answer_file_url
                                : null,
                        question_url:
                            result.data.direct_question_urls !== undefined
                                ? result.data.direct_question_urls[0]
                                : null,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    let chapter_name = "";
                    // extract currently selected chapter name
                    for (let i = 0; i < result.data.chapters.length; i++) {
                        if (
                            result.data.chapters[i].chapter_id ===
                            this.chapterId
                        ) {
                            chapter_name = result.data.chapters[i].chapter_name;
                        } else {
                            continue;
                        }
                    }
                    this.setState({
                        subject_name: result.data.subject_name,
                        chapter_name: chapter_name,
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });

        this.loadExamData();
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
                url: URL.createObjectURL(event.target.files[0]),
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

        const pdf = this.state.pdf;
        let extension = "";
        let form_data = new FormData();

        form_data.append("cycle_test_id", this.cycleTestId);
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
            if (this.state.cycleTestItem.answer_file_url !== "") {
                this.handlePATCH(form_data, options);
            } else {
                this.handlePOST(form_data, options);
            }
        }
    };

    handlePOST = (form_data, options) => {
        axios
            .post(
                `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/direct/`,
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
                            url: result.data.url,
                        },
                        () => {
                            this.setState({
                                page_loading: true,
                            });
                            this.loadExamData();
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
    };

    handlePATCH = (form_data, options) => {
        axios
            .patch(
                `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/direct/`,
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
                            url: result.data.url,
                        },
                        () => {
                            this.setState({
                                page_loading: true,
                            });
                            this.loadExamData();
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
    };

    onDocumentLoadSuccess = ({ numPages }) => {
        this.setState({ numPages });
    };

    goToPrevPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
    goToNextPage = () =>
        this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

    render() {
        document.title = `${this.state.chapter_name} Direct Exam - Teacher | IQLabs`;
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={`${this.state.chapter_name} - ${this.state.cycleTestItem.cycle_test_name}`}
                    goBack={this.props.history.goBack}
                />

                {/* ALert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={this.toggleSuccessAlert}
                    toggleErrorAlert={this.toggleErrorAlert}
                />

                <div className="exam-section">
                    <div className="container-fluid">
                        {/* Header configuration */}
                        <div className="row align-items-center justify-content-center mb-3">
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p className="mb-2 font-weight-bold-600">
                                        Group:
                                    </p>
                                    <p className="small mb-0">A</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p className="mb-2 font-weight-bold-600">
                                        Date:
                                    </p>
                                    <p className="small mb-0">
                                        {dateFormat(
                                            this.state.cycleTestItem.exam_date,
                                            "dd/mm/yyyy"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p className="mb-2 font-weight-bold-600">
                                        Starts at:
                                    </p>
                                    <p className="small mb-0">
                                        {dateFormat(
                                            this.state.cycleTestItem.starts_at,
                                            "hh:MM TT"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p className="mb-2 font-weight-bold-600">
                                        Ends at:
                                    </p>
                                    <p className="small mb-0">
                                        {dateFormat(
                                            this.state.cycleTestItem.ends_at,
                                            "hh:MM TT"
                                        )}
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p className="mb-2 font-weight-bold-600">
                                        Test Number:
                                    </p>
                                    <p className="small mb-0">1</p>
                                </div>
                            </div>
                        </div>

                        <div className="card light-bg shadow-sm">
                            <div className="row justify-content-center">
                                <div className="col-md-5">
                                    <div className="card secondary-bg">
                                        <div className="card-body small font-weight-bold-600 text-center p-3">
                                            <div className="row">
                                                <div className="col-4">
                                                    <p className="mb-0">
                                                        Subject:{" "}
                                                        {
                                                            this.state
                                                                .subject_name
                                                        }
                                                    </p>
                                                </div>
                                                <div className="col-4">
                                                    <p className="mb-0">
                                                        Level: 10
                                                    </p>
                                                </div>
                                                <div className="col-4">
                                                    <p className="mb-0">
                                                        Duration: 120 min.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* File uploading */}
                            <div className="card-body">
                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-5">
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

                                        <div className="row">
                                            <div className="col-6">
                                                <a
                                                    href={
                                                        this.state.question_url
                                                    }
                                                    className="btn btn-primary btn-block btn-sm"
                                                    download
                                                >
                                                    Download Question
                                                </a>
                                            </div>
                                            <div className="col-6">
                                                <button
                                                    className="btn btn-primary btn-block btn-sm"
                                                    onClick={this.handleSubmit}
                                                    disabled={
                                                        this.state.btnDisabled
                                                    }
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
                                                    Upload Answer
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* File displaying */}
                                <div
                                    className="card card-body secondary-bg text-center"
                                    style={{ minHeight: "40vh" }}
                                >
                                    {this.state.url === null ? (
                                        "Your uploads will appear here"
                                    ) : (
                                        <>
                                            <div id="ResumeContainer">
                                                <Document
                                                    file={this.state.url}
                                                    onLoadSuccess={
                                                        this
                                                            .onDocumentLoadSuccess
                                                    }
                                                    className={"PDFDocument"}
                                                >
                                                    <Page
                                                        pageNumber={
                                                            this.state
                                                                .pageNumber
                                                        }
                                                        className={
                                                            "PDFPage shadow"
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
                                                        this.state
                                                            .pageNumber === 1
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
                {/* Loading component */}
                {this.state.page_loading ? <Loading /> : ""}
            </>
        );
    }
}

export default DirectExam;
