import React, { Component } from "react";
import dummyImg from "../../assets/code.jpg";
import Header from "./shared/examNavbar";
import { baseUrl, studentUrl } from "../../shared/baseUrl.js";
import AlertBox from "../sharedComponents/alert";
import Loading from "../sharedComponents/loader";

class CycleTestQA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject_name: "",
            chapter_name: "",
            cycleTestItem: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
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

    loadCycleTestData = () => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/auto/?cycle_test_id=${this.cycleTestId}`,
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

        this.loadCycleTestData();
    };

    render() {
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
                        {/* Header */}
                        <div className="card card-body secondary-bg primary-text font-weight-bold-600 small mb-4 py-2">
                            <div className="row align-items-center">
                                <div className="col-md-7">
                                    Section - 01 | Brief of Section
                                </div>
                                <div className="col-md-5">
                                    <div className="row align-items-center">
                                        <div className="col-md-3">
                                            Attempt 01
                                        </div>
                                        <div className="col-md-3">
                                            5 Questions
                                        </div>
                                        <div className="col-md-3">
                                            Total marks: 100
                                        </div>
                                        <div className="col-md-3">
                                            <div className="bg-warning text-center rounded py-2">
                                                Time: 10:00:00
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Q&A */}
                        <div className="d-flex align-items-start mb-3">
                            <button className="btn btn-light light-bg btn-sm shadow-sm mr-1">01</button>
                            <div className="card small light-bg shadow-sm">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <p className="font-weight-bold">
                                                Lorem ipsum dolor sit, amet
                                                consectetur adipisicing elit.
                                                Magnam, dolores cumque.
                                                Quisquam, ad facere. Eligendi
                                                ipsam quo modi amet optio
                                                obcaecati laboriosam magnam odio
                                                dolorem, aliquam, eum dolore,
                                                doloribus sequi?
                                            </p>
                                            <div className="row">
                                                <div className="col-md-6 mb-3">
                                                    <div className="card card-body secondary-bg shadow-sm p-3">
                                                        <div className="primary-text font-weight-bold-600">
                                                            Option 01
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="card card-body secondary-bg shadow-sm p-3">
                                                        <div className="primary-text font-weight-bold-600">
                                                            Option 02
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="card card-body secondary-bg shadow-sm p-3">
                                                        <div className="primary-text font-weight-bold-600">
                                                            Option 03
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-6 mb-3">
                                                    <div className="card card-body secondary-bg shadow-sm p-3">
                                                        <div className="primary-text font-weight-bold-600">
                                                            Option 04
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3">
                                            <img
                                                src={dummyImg}
                                                alt="Dummy bg"
                                                className="img-fluid rounded shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="row">
                            <div className="col-md-6">
                                <button className="btn btn-primary btn-sm">
                                    <i className="fas fa-angle-left mr-1"></i>{" "}
                                    Previous
                                </button>
                            </div>
                            <div className="col-md-6 text-right">
                                <button className="btn btn-primary btn-sm">
                                    Next
                                    <i className="fas fa-angle-right ml-2"></i>
                                </button>
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

export default CycleTestQA;
