import React, { Component } from "react";
import { connect } from "react-redux";
import store from "../../redux/store";
import Header from "./navbar";
import SideNav from "./sidenav";
import Select from "react-select";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
    chapter_name: state.chapter_name,
    cycle_name: state.cycle_name,
});

class Scorecard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            average: "",
            good: "",
            improve: "",
            page_loading: true,
        };
        this.subjectId = this.props.subjectId;
        this.chapterId = this.props.chapterId;
        this.cycle_testId = this.props.cycle_testId;
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    loadDefault_ScoreCard = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/scorecard/`,
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
                        average: result.data.average,
                        good: result.data.good,
                        improve: result.data.improve,
                    });
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                        });
                    }
                    this.setState({
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

    loadScoreCard = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/scorecard/?cycle_test_id=${this.cycle_testId}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    if (
                        Object.keys(result.data.score_card_config).length !== 0
                    ) {
                        this.setState({
                            average: result.data.score_card_config.average,
                            good: result.data.score_card_config.good,
                            improve: result.data.score_card_config.improve,
                            page_loading: false,
                        });
                    } else {
                        this.loadDefault_ScoreCard();
                    }
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
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

    componentDidMount = () => {
        this.loadScoreCard();
    };

    handleRange = (index, event, category) => {
        const average = this.state.average;
        const good = this.state.good;
        const improve = this.state.improve;

        if (category === "average") {
            average.range[index] = Number(event.target.value);
            this.setState({
                average: average,
            });
        }
        if (category === "good") {
            good.range[index] = Number(event.target.value);
            this.setState({
                good: good,
            });
        }
        if (category === "improve") {
            improve.range[index] = Number(event.target.value);
            this.setState({
                improve: improve,
            });
        }
    };

    handleData = (event, category, type) => {
        const average = this.state.average;
        const good = this.state.good;
        const improve = this.state.improve;

        if (category === "average") {
            if (type === "retake") {
                average.retake = event.target.value;
            } else if (type === "reduction") {
                average.reduction = event.target.value;
            } else if (type === "reduction_duration") {
                average.reduction_duration = event.target.value;
            }
            this.setState({
                average: average,
            });
        }
        if (category === "good") {
            if (type === "retake") {
                good.retake = event.target.value;
            } else if (type === "reduction") {
                good.reduction = event.target.value;
            } else if (type === "reduction_duration") {
                good.reduction_duration = event.target.value;
            }
            this.setState({
                good: good,
            });
        }
        if (category === "improve") {
            if (type === "retake") {
                improve.retake = event.target.value;
            } else if (type === "reduction") {
                improve.reduction = event.target.value;
            } else if (type === "reduction_duration") {
                improve.reduction_duration = event.target.value;
            }
            this.setState({
                improve: improve,
            });
        }
    };

    handleSubmit = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: true,
        });

        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/scorecard/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    cycle_test_id: this.cycle_testId,
                    score_card_config: {
                        average: this.state.average,
                        good: this.state.good,
                        improve: this.state.improve,
                    },
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                    this.props.formSubmission(true);
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
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
        const average = this.state.average;
        const good = this.state.good;
        const improve = this.state.improve;
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="align-items-center">
                    Scorecard Configuration
                    {this.state.page_loading ? (
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

                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <th scope="col">Range in %</th>
                                <th scope="col">Retake Duration</th>
                                <th scope="col">Reducation %</th>
                                <th scope="col">Reducation Duration</th>
                                <th scope="col">Remarks</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <input
                                            type="number"
                                            name="range1"
                                            value={
                                                improve !== ""
                                                    ? improve.range[0]
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                this.handleRange(
                                                    0,
                                                    event,
                                                    "improve"
                                                )
                                            }
                                            className="form-control form-shadow"
                                        />
                                        <span className="mx-2">to</span>
                                        <input
                                            type="number"
                                            name="range2"
                                            value={
                                                improve !== ""
                                                    ? improve.range[1]
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                this.handleRange(
                                                    1,
                                                    event,
                                                    "improve"
                                                )
                                            }
                                            className="form-control form-shadow"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="retake"
                                            value={improve.retake}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "improve",
                                                    "retake"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="reducation"
                                            value={improve.reduction}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "improve",
                                                    "reduction"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={improve.reduction_duration}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "improve",
                                                    "reduction_duration"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <div className="card bg-danger shadow-sm">
                                            <div className="card-body text-center py-2 px-4">
                                                Improve
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <input
                                            type="number"
                                            name="range1"
                                            value={
                                                average !== ""
                                                    ? average.range[0]
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                this.handleRange(
                                                    0,
                                                    event,
                                                    "average"
                                                )
                                            }
                                            className="form-control form-shadow"
                                        />
                                        <span className="mx-2">to</span>
                                        <input
                                            type="number"
                                            name="range2"
                                            value={
                                                average !== ""
                                                    ? average.range[1]
                                                    : ""
                                            }
                                            onChange={(event) =>
                                                this.handleRange(
                                                    1,
                                                    event,
                                                    "average"
                                                )
                                            }
                                            className="form-control form-shadow"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="retake"
                                            value={average.retake}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "average",
                                                    "retake"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="reducation"
                                            value={average.reduction}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "average",
                                                    "reduction"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={average.reduction_duration}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "average",
                                                    "reduction_duration"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <div className="card bg-warning shadow-sm">
                                            <div className="card-body text-center py-2 px-4">
                                                Average
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="d-flex align-items-center">
                                        <input
                                            type="number"
                                            name="range1"
                                            value={
                                                good !== "" ? good.range[0] : ""
                                            }
                                            onChange={(event) =>
                                                this.handleRange(
                                                    0,
                                                    event,
                                                    "good"
                                                )
                                            }
                                            className="form-control form-shadow"
                                        />
                                        <span className="mx-2">to</span>
                                        <input
                                            type="number"
                                            name="range2"
                                            value={
                                                good !== "" ? good.range[1] : ""
                                            }
                                            onChange={(event) =>
                                                this.handleRange(
                                                    1,
                                                    event,
                                                    "good"
                                                )
                                            }
                                            className="form-control form-shadow"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="retake"
                                            value={good.retake}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "good",
                                                    "retake"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="reducation"
                                            value={good.reduction}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "good",
                                                    "reduction"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="duration"
                                            value={good.reduction_duration}
                                            className="form-control form-shadow"
                                            onChange={(event) =>
                                                this.handleData(
                                                    event,
                                                    "good",
                                                    "reduction_duration"
                                                )
                                            }
                                        />
                                    </td>
                                    <td>
                                        <div className="card bg-success shadow-sm">
                                            <div className="card-body text-center py-2 px-4">
                                                Good
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <button
                        className="btn btn-primary btn-sm"
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
                        Save & Close
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class CycleTestAuto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,

            sections: [
                {
                    section_id: "",
                    section_name: "",
                    question_type: "",
                    category: "",
                    any_questions: "",
                    total_questions: "",
                    marks: "",
                    total_marks: "",
                },
            ],
            filterData: [{ category: [] }],

            duration: "",
            attempts: [],
            selectedAttempt: "",
            question_type: [],

            page_loading: true,
            is_formSubmitted: false,
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

    formSubmission = (is_formSubmitted) => {
        if (is_formSubmitted) {
            setTimeout(() => {
                this.setState({
                    showModal: !this.state.showModal,
                });
            }, 1500);
        }
    };

    loadAttemptData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/filter/?chapter_id=${this.chapterId}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    if (result.data.attempts !== undefined) {
                        this.setState({
                            attempts: result.data.attempts,
                        });
                    }
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    loadSectionData = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/auto/`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.data.length !== 0 && Array.isArray(result.data)) {
                    const section = [];
                    let duration = "";
                    let selectedAttempt = "";
                    const filterData = [];
                    for (let i = 0; i < result.data.length; i++) {
                        section.push({
                            section_id: result.data[i].section_id,
                            section_name: result.data[i].section_description,
                            question_type: result.data[i].question_type,
                            category: result.data[i].category,
                            any_questions: result.data[i].any_questions,
                            total_questions: result.data[i].total_questions,
                            marks: result.data[i].mark,
                            total_marks: result.data[i].total_marks,
                        });
                        duration = result.data[i].duration;
                        selectedAttempt = result.data[i].attempts;
                        fetch(
                            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/filter/?chapter_id=${this.chapterId}&attempts=${selectedAttempt}&question_type=${result.data[i].question_type}`,
                            {
                                method: "GET",
                                headers: this.headers,
                            }
                        )
                            .then((res) => res.json())
                            .then((result) => {
                                filterData.push({
                                    category: result.data.category,
                                });
                                this.setState({
                                    filterData: filterData,
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                    fetch(
                        `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/filter/?chapter_id=${this.chapterId}&attempts=${selectedAttempt}`,
                        {
                            method: "GET",
                            headers: this.headers,
                        }
                    )
                        .then((res) => res.json())
                        .then((result) => {
                            this.setState({
                                question_type: result.data.question_type,
                            });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    this.setState({
                        sections: section,
                        duration: duration,
                        selectedAttempt: selectedAttempt,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        // this.setState(
        //     {
        //         chapterId: this.props.match.params.chapterId,
        //     },
        //     () => {
        //     }
        // );
        this.loadAttemptData();
        this.loadSectionData();

        // fetch(`${this.url}/teacher/subject/${this.subjectId}/`, {
        //     headers: this.headers,
        //     method: "GET",
        // })
        //     .then((res) => res.json())
        //     .then((result) => {
        //         this.setState({
        //             chapterList: result.data.results,
        //         });
        //         console.log(result);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
    };

    handleSectionData = (index, event, type) => {
        const section = [...this.state.sections];
        if (type === "name") {
            section[index].section_name = event.target.value;
        } else if (type === "any_questions") {
            section[index].any_questions = Number(event.target.value);
            if (section[index].marks !== 0 || section[index].marks !== 0) {
                section[index].total_marks =
                    Number(section[index].marks) * Number(event.target.value);
            }
        }
        this.setState({
            sections: section,
        });
    };

    handleAttempt = (event) => {
        this.setState({
            selectedAttempt: event.value,
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/filter/?chapter_id=${this.chapterId}&attempts=${event.value}`,
                {
                    method: "GET",
                    headers: this.headers,
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        question_type: result.data.question_type,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleType = (index, event) => {
        const section = [...this.state.sections];
        section[index].question_type = event.target.value;
        this.setState({
            sections: section,
        });

        if (event.target.value !== "") {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/filter/?chapter_id=${this.chapterId}&attempts=${this.state.selectedAttempt}&question_type=${event.target.value}`,
                {
                    method: "GET",
                    headers: this.headers,
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    const filterData = [...this.state.filterData];
                    filterData[index].category = result.data.category;
                    this.setState({
                        filterData: filterData,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const filterData = [...this.state.filterData];
            filterData[index].category = [];
            this.setState({
                filterData: filterData,
            });
        }
    };

    handleCategory = (index, event) => {
        const section = [...this.state.sections];
        section[index].category = event.target.value;
        this.setState({
            sections: section,
        });

        if (event.target.value !== "") {
            fetch(
                `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/filter/?chapter_id=${this.chapterId}&attempts=${this.state.selectedAttempt}&question_type=${section[index].question_type}&category=${event.target.value}`,
                {
                    method: "GET",
                    headers: this.headers,
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    const section = [...this.state.sections];
                    section[index].total_questions = Number(
                        result.data.total_questions
                    );
                    this.setState({
                        sections: section,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            section[index].total_questions = "";
            this.setState({
                sections: section,
            });
        }
    };

    handleMarks = (index, event) => {
        const section = [...this.state.sections];

        if (event.target.value !== 0 || event.target.value !== "") {
            section[index].marks = Number(event.target.value);
            section[index].total_marks =
                section[index].any_questions * Number(event.target.value);
        }

        this.setState({
            sections: section,
        });
    };

    handleDuration = (event) => {
        this.setState({
            duration: event.target.value,
        });
    };

    handleSubmit = (index, event) => {
        event.preventDefault();

        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        const section = [...this.state.sections];

        if (
            Number(this.state.duration) <= 0 ||
            Number(this.state.duration) > 360
        ) {
            this.setState({
                errorMsg: "Duration minutes should in between 1 to 360",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (this.state.selectedAttempt === "") {
            this.setState({
                errorMsg: "Please select a attempt",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (section[index].section_name === "") {
            this.setState({
                errorMsg: "Enter the section name",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (section[index].question_type === "") {
            this.setState({
                errorMsg: "Select a question type",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (section[index].category === "") {
            this.setState({
                errorMsg: "Select a category",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (
            section[index].any_questions === "" ||
            section[index].any_questions === 0 ||
            section[index].any_questions > section[index].total_questions
        ) {
            this.setState({
                errorMsg:
                    "Enter no. of questions within the range of Total question",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (section[index].marks === "" || section[index].marks === 0) {
            this.setState({
                errorMsg: "Enter valid marks",
                showErrorAlert: true,
                page_loading: false,
            });
        } else {
            if (section[index].section_id === "") {
                this.handlePOST(section, index);
            } else {
                this.handlePUT(section, index);
            }
        }
    };

    handlePOST = (section, index) => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/auto/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    cycle_test_id: this.cycle_testId,
                    chapter_id: this.chapterId,
                    duration: this.state.duration,
                    attempts: this.state.selectedAttempt,
                    section_description: section[index].section_name,
                    question_type: section[index].question_type,
                    category: section[index].category,
                    total_questions: section[index].total_questions,
                    any_questions: section[index].any_questions,
                    mark: section[index].marks,
                    total_marks: section[index].total_marks,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    section[index] = result.section_id;
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        page_loading: false,
                        sections: section,
                    });
                    setTimeout(() => {
                        this.setState(
                            {
                                page_loading: true,
                            },
                            () => {
                                this.loadSectionData();
                            }
                        );
                    }, 3000);
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handlePUT = (section, index) => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/cycle/${this.cycle_testId}/auto/`,
            {
                method: "PUT",
                headers: this.headers,
                body: JSON.stringify({
                    cycle_test_id: this.cycle_testId,
                    chapter_id: this.chapterId,
                    duration: this.state.duration,
                    attempts: this.state.selectedAttempt,
                    section_description: section[index].section_name,
                    question_type: section[index].question_type,
                    category: section[index].category,
                    total_questions: section[index].total_questions,
                    any_questions: section[index].any_questions,
                    mark: section[index].marks,
                    total_marks: section[index].total_marks,
                    section_id: section[index].section_id,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.data.sts === true) {
                    section[index] = result.data.section_id;
                    this.setState({
                        successMsg: result.data.msg,
                        showSuccessAlert: true,
                        page_loading: false,
                        sections: section,
                    });
                    setTimeout(() => {
                        this.setState(
                            {
                                page_loading: true,
                            },
                            () => {
                                this.loadSectionData();
                            }
                        );
                    }, 3000);
                } else {
                    if (result.detail) {
                        this.setState({
                            errorMsg: result.detail,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.data.msg,
                        });
                    }
                    this.setState({
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    addSection = () => {
        const filterData = [...this.state.filterData];
        const sections = [...this.state.sections];
        sections.push({
            section_id: "",
            section_name: "",
            question_type: "",
            category: "",
            any_questions: "",
            marks: "",
            total_marks: "",
        });
        filterData.push({ category: [] });
        this.setState({
            sections: sections,
            filterData: filterData,
        });
    };

    removeSection = (index) => {
        const filterData = [...this.state.filterData];
        const sections = [...this.state.sections];
        sections.splice(index, 1);
        filterData.splice(index, 1);
        this.setState({
            sections: sections,
            filterData: filterData,
        });
    };

    dispatchSection = (data) => {
        store.dispatch({ type: "SECTION", payload: data });
    };

    render() {
        let filterData = [...this.state.filterData];
        document.title = `${this.props.chapter_name} Auto - Teacher | IQLabs`;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Scorecard modal */}
                {this.state.showModal ? (
                    <Scorecard
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        subjectId={this.subjectId}
                        chapterId={this.chapterId}
                        cycle_testId={this.cycle_testId}
                        formSubmission={this.formSubmission}
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

                        <div className="card shadow-sm mb-3">
                            <div className="card-body text-center">
                                <h6 className="mb-0">
                                    {this.props.cycle_name}
                                </h6>
                            </div>
                        </div>

                        {/* Header configuration */}
                        <div className="row align-items-center mb-3">
                            <div className="col-md-8">
                                <div className="row align-items-center">
                                    <div className="col-md-4">
                                        <input
                                            type="number"
                                            name="duration"
                                            className="form-control form-shadow"
                                            placeholder="Enter duration (In minutes)"
                                            onChange={this.handleDuration}
                                            value={this.state.duration}
                                            autoComplete="off"
                                            min="1"
                                            max="360"
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <Select
                                            className="basic-single"
                                            placeholder={
                                                this.state.selectedAttempt !==
                                                ""
                                                    ? this.state.selectedAttempt
                                                    : "Select attempt"
                                            }
                                            value={[]}
                                            isSearchable={true}
                                            name="attempt"
                                            options={
                                                this.state.attempts.length !== 0
                                                    ? this.state.attempts.map(
                                                          (data, index) => {
                                                              return {
                                                                  value: data,
                                                                  label: data,
                                                              };
                                                          }
                                                      )
                                                    : ""
                                            }
                                            onChange={this.handleAttempt}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-right">
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={this.toggleModal}
                                >
                                    Score Configuration
                                </button>
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

                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-bg text-white">
                                        <tr>
                                            <th scope="col"></th>
                                            <th scope="col">
                                                Section Description
                                            </th>
                                            <th scope="col">Question Type</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">
                                                No. of Questions
                                            </th>
                                            <th scope="col">Total Questions</th>
                                            <th scope="col">Marks</th>
                                            <th scope="col">Total Marks</th>
                                            <th scope="col">Action</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.sections.map(
                                            (section, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>
                                                            <button
                                                                className="btn btn-primary-invert shadow-sm btn-sm"
                                                                onClick={() =>
                                                                    this.removeSection(
                                                                        index
                                                                    )
                                                                }
                                                            >
                                                                <i className="fas fa-minus-circle"></i>
                                                            </button>
                                                        </td>
                                                        <td width="250px">
                                                            <input
                                                                type="text"
                                                                className="form-control form-control-sm form-shadow"
                                                                placeholder="Section Description 01"
                                                                value={
                                                                    section.section_name
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleSectionData(
                                                                        index,
                                                                        event,
                                                                        "name"
                                                                    )
                                                                }
                                                                required
                                                            />
                                                        </td>
                                                        <td width="150px">
                                                            <select
                                                                name="type"
                                                                id="type"
                                                                className="form-control form-control-sm form-shadow"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleType(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    section.question_type
                                                                }
                                                                required
                                                            >
                                                                <option value="">
                                                                    Select type
                                                                </option>
                                                                {this.state
                                                                    .question_type
                                                                    .length !==
                                                                0
                                                                    ? this.state.question_type.map(
                                                                          (
                                                                              data,
                                                                              index
                                                                          ) => {
                                                                              return (
                                                                                  <option
                                                                                      value={
                                                                                          data
                                                                                      }
                                                                                      key={
                                                                                          index
                                                                                      }
                                                                                  >
                                                                                      {data ===
                                                                                      "type_1"
                                                                                          ? "Type 1"
                                                                                          : "type_2"
                                                                                          ? "Type 2"
                                                                                          : ""}
                                                                                  </option>
                                                                              );
                                                                          }
                                                                      )
                                                                    : null}
                                                            </select>
                                                        </td>
                                                        <td width="150px">
                                                            <select
                                                                name="category"
                                                                id="category"
                                                                className="form-control form-control-sm form-shadow"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleCategory(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                                value={
                                                                    section.category
                                                                }
                                                                required
                                                            >
                                                                <option value="">
                                                                    Select
                                                                    category
                                                                </option>
                                                                {filterData[
                                                                    index
                                                                ] !== undefined
                                                                    ? filterData[
                                                                          index
                                                                      ].category
                                                                          .length !==
                                                                      0
                                                                        ? filterData[
                                                                              index
                                                                          ].category.map(
                                                                              (
                                                                                  data,
                                                                                  c_index
                                                                              ) => {
                                                                                  return (
                                                                                      <option
                                                                                          value={
                                                                                              data
                                                                                          }
                                                                                          key={
                                                                                              c_index
                                                                                          }
                                                                                      >
                                                                                          {
                                                                                              data
                                                                                          }
                                                                                      </option>
                                                                                  );
                                                                              }
                                                                          )
                                                                        : null
                                                                    : null}
                                                            </select>
                                                        </td>
                                                        <td width="160px">
                                                            <input
                                                                className="form-control form-control-sm form-shadow"
                                                                type="number"
                                                                value={
                                                                    section.any_questions
                                                                }
                                                                placeholder="No. of questions"
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleSectionData(
                                                                        index,
                                                                        event,
                                                                        "any_questions"
                                                                    )
                                                                }
                                                                min="1"
                                                                max={
                                                                    section.total_questions
                                                                }
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className="form-control form-control-sm form-shadow"
                                                                type="text"
                                                                value={
                                                                    section.total_questions
                                                                }
                                                                placeholder="Total question"
                                                                disabled
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className="form-control form-control-sm form-shadow"
                                                                type="number"
                                                                placeholder="Marks"
                                                                value={
                                                                    section.marks
                                                                }
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleMarks(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                                min="0"
                                                                required
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                className="form-control form-control-sm form-shadow"
                                                                type="text"
                                                                placeholder="Total marks"
                                                                value={
                                                                    section.total_marks
                                                                }
                                                                disabled
                                                            />
                                                        </td>
                                                        {section.section_id !==
                                                        "" ? (
                                                            <td>
                                                                <Link
                                                                    to={`${this.props.match.url}/section/${section.section_id}/?attempt=${this.state.selectedAttempt}`}
                                                                >
                                                                    <button
                                                                        className="btn btn-primary-invert btn-sm shadow-sm"
                                                                        onClick={() =>
                                                                            this.dispatchSection(
                                                                                section.section_name
                                                                            )
                                                                        }
                                                                    >
                                                                        <i className="fas fa-eye"></i>
                                                                    </button>
                                                                </Link>
                                                            </td>
                                                        ) : null}
                                                        <td>
                                                            <button
                                                                className="btn btn-primary-invert btn-sm shadow-sm"
                                                                onClick={(
                                                                    event
                                                                ) =>
                                                                    this.handleSubmit(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                            >
                                                                Save
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            }
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="card-body">
                                <button
                                    className="btn btn-light btn-block shadow-sm"
                                    onClick={this.addSection}
                                >
                                    Add Section +
                                </button>
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

export default connect(mapStateToProps)(CycleTestAuto);
