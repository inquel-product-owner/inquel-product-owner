import React, { Component } from "react";
import Header from "./shared/examNavbar";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../sharedComponents/alert";
import Loading from "../sharedComponents/loader";

class TestResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject_name: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.url = baseUrl + studentUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
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

    componentDidMount = () => {
        fetch(`${this.url}/student/subject/${this.subjectId}/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subject_name: result.data.subject_name,
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

    render() {
        document.title = `${this.state.subject_name} Test result - Teacher | IQLabs`;
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name=""
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
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="row align-items-center font-weight-bold-600 primary-text mb-3">
                                    <div className="col-md-3">
                                        TEST ANALYSIS
                                    </div>
                                    <div className="col-md-7">
                                        ATTEMPTS & PAPERS
                                    </div>
                                    <div className="col-md-2 text-right">
                                        <button className="btn btn-primary btn-sm">
                                            Generate marks
                                        </button>
                                    </div>
                                </div>

                                <div className="card light-bg shadow-sm mb-2">
                                    <div className="row align-items-center font-weight-bold-600 small">
                                        <div className="col-3">
                                            <div className="card card-body secondary-bg p-3">
                                                Cycle test 01
                                            </div>
                                        </div>
                                        <div className="col-9"></div>
                                    </div>
                                </div>
                                <div className="card light-bg shadow-sm mb-2">
                                    <div className="row align-items-center font-weight-bold-600 small">
                                        <div className="col-3">
                                            <div className="card card-body secondary-bg p-3">
                                                Semester Exam 01
                                            </div>
                                        </div>
                                        <div className="col-9"></div>
                                    </div>
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

export default TestResult;
