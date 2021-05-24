import React, { Component } from "react";
import Header from "../shared/examNavbar";
import { baseUrl, studentUrl } from "../../../shared/baseUrl.js";
import AlertBox from "../../sharedComponents/alert";
import Loading from "../../sharedComponents/loader";

class CycleTest extends Component {
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

    loadCycleTestData = () => {
        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/?cycle_test_id=${this.cycleTestId}`,
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

    handleExamStart = () => {
        this.setState({
            page_loading: true,
        });

        fetch(
            `${this.url}/student/subject/${this.subjectId}/chapter/${this.chapterId}/cycletest/auto/start/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    cycle_test_id: this.cycleTestId,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.props.history.push(`${this.props.match.url}/auto`);
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
        document.title = `${this.state.chapter_name} Cycle Test - Teacher | IQLabs`;
        return (
            <>
                {/* Navbar */}
                <Header
                    name={this.state.subject_name}
                    chapter_name={this.state.chapter_name}
                    goBack={this.props.history.goBack}
                />

                {/* Alert message */}
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

                <div className="exam-section">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="row align-items-center font-weight-bold-600 primary-text mb-3">
                                    <div className="col-md-7">
                                        {
                                            this.state.cycleTestItem
                                                .cycle_test_name
                                        }
                                    </div>
                                    <div className="col-md-3">
                                        Total Time:{" "}
                                        {
                                            this.state.cycleTestItem
                                                .auto_test_duration
                                        }{" "}
                                        mins
                                    </div>
                                    <div className="col-md-2 text-right">
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            onClick={this.handleExamStart}
                                        >
                                            Start Exam
                                        </button>
                                    </div>
                                </div>

                                <div className="card card-body secondary-bg shadow-sm mb-3">
                                    <div className="row align-items-center font-weight-bold-600 small">
                                        <div className="col-8">Sections</div>
                                        <div className="col-4">
                                            No. of Questions
                                        </div>
                                    </div>
                                </div>

                                {Object.entries(this.state.cycleTestItem)
                                    .length !== 0
                                    ? this.state.cycleTestItem.auto_test
                                          .length !== 0
                                        ? this.state.cycleTestItem.auto_test.map(
                                              (data, index) => {
                                                  return (
                                                      <div
                                                          className="card card-body light-bg shadow-sm p-3 mb-2"
                                                          key={index}
                                                      >
                                                          <div className="row align-items-center small">
                                                              <div className="col-8">
                                                                  {
                                                                      data.section_name
                                                                  }
                                                              </div>
                                                              <div className="col-4">
                                                                  {
                                                                      data.total_questions
                                                                  }{" "}
                                                                  Questions
                                                              </div>
                                                          </div>
                                                      </div>
                                                  );
                                              }
                                          )
                                        : ""
                                    : ""}
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

export default CycleTest;
