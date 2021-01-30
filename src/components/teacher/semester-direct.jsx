import React, { Component } from "react";
import axios from "axios";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Spinner, Alert } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class SemesterDirect extends Component {
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
            exam_date: "",
            starts_at: "",
            ends_at: "",
            url: "",
        };
        this.subjectId = this.props.match.params.subjectId;
        this.semesterId = this.props.match.params.semesterId;
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
        document.title = `Semester name - Teacher | IQLabs`;
    };

    handleFile = (event) => {
        const pdf = this.state.pdf;
        pdf.file_name = event.target.files[0].name;
        pdf.file = event.target.files[0];
        this.setState({
            pdf: pdf,
        });
    };

    handleDate = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let date = new Date(value);

        this.setState({
            [name]: `${date.getFullYear()}-${
                date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        });
    };

    handleSubmit = () => {
        this.setState({
            showLoader: true,
            showSuccessAlert: false,
            showErrorAlert: false,
        });

        const directTest = this.state.pdf;

        let form_data = new FormData();

        form_data.append("semester_id", this.semesterId);
        form_data.append("exam_date", this.state.exam_date);
        form_data.append("starts_at", this.state.starts_at);
        form_data.append("ends_at", this.state.ends_at);
        form_data.append("semester_file_1", directTest.file);

        const options = {
            headers: {
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
                Authorization: this.authToken,
            },
        };

        axios
            .post(
                `${this.url}/teacher/subject/${this.subjectId}/semester/files/`,
                form_data,
                options
            )
            .then((result) => {
                console.log(result);
                for (var p of form_data) {
                    console.log(p);
                }
                if (result.data.sts === true) {
                    this.setState({
                        successMsg: result.data.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                        url: result.data.url,
                    });
                } else if (result.sts === false) {
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

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <h5 className="primary-text mb-0">
                                    Semester name
                                </h5>
                            </div>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-3">
                                <h6 className="primary-text">TEST ANALYSIS</h6>
                            </div>
                            <div className="col-md-3">
                                <h6 className="primary-text">
                                    ATTEMPTS & PAPERS
                                </h6>
                            </div>
                        </div>

                        {/* Header configuration */}
                        <div className="row align-items-end mb-3">
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="date">Exam Date:</label>
                                    <input
                                        type="datetime-local"
                                        name="exam_date"
                                        id="exam_date"
                                        className="form-control form-shadow"
                                        onChange={this.handleDate}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="starts_at">
                                        Starts at:
                                    </label>
                                    <input
                                        type="datetime-local"
                                        name="starts_at"
                                        id="starts_at"
                                        className="form-control form-shadow"
                                        onChange={this.handleDate}
                                    />
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <label htmlFor="ends_at">Ends at:</label>
                                    <input
                                        type="datetime-local"
                                        name="ends_at"
                                        id="ends_at"
                                        className="form-control form-shadow"
                                        onChange={this.handleDate}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
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
                            </div>
                        </div>

                        <div className="card light-bg shadow-sm">
                            <div className="card-body text-center">
                                <div className="row justify-content-center">
                                    <div className="col-md-4">
                                        <div className="custom-file text-left mb-2">
                                            <input
                                                type="file"
                                                className="custom-file-input"
                                                id="question"
                                                accept="pdf/*"
                                                aria-describedby="inputGroupFileAddon01"
                                                onChange={(event) =>
                                                    this.handleFile(event)
                                                }
                                            />
                                            <label
                                                className="custom-file-label"
                                                htmlFor="question"
                                            >
                                                {this.state.pdf.file_name ===
                                                null
                                                    ? "Choose file"
                                                    : this.state.pdf.file_name}
                                            </label>
                                        </div>
                                        <button
                                            className="btn btn-primary btn-block btn-sm"
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
                                            Upload question
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body secondary-bg text-white text-center">
                                {this.state.url === "" ? (
                                    "Your uploads will appear here"
                                ) : (
                                    <span className="text-primary">
                                        {this.state.url}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SemesterDirect;
