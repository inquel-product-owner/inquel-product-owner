import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import Select from "react-select";
import { baseUrl, teacherUrl } from "../../../shared/baseUrl.js";
import AlertBox from "../../common/alert";
import Loading from "../../common/loader";
import { Document, Page, pdfjs } from "react-pdf";
import { Spinner } from "react-bootstrap";

const mapStateToProps = (state) => ({
    group_name: state.content.group_name,
    subject_name: state.content.subject_name,
    semester_name: state.content.semester_name,
});

class TeacherSemesterDirectEvaluation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            selectedStudent: "",
            student_list: [],
            answerData: {},
            topics: {},
            topic_marks: {},

            total_obtained_marks: "",
            total_marks: "",

            numPages: null,
            pageNumber: 1,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.subjectId = this.props.match.params.subjectId;
        this.semesterId = this.props.match.params.semesterId;
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

    loadStudentList = () => {
        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/semester/${this.semesterId}/direct/filter/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        student_list: result.data.usernames,
                        page_loading: false,
                    });
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
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    componentDidMount = () => {
        this.loadStudentList();
    };

    handleSelect = (event) => {
        this.setState({
            selectedStudent: event.value,
            page_loading: true,
        });

        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/semester/${this.semesterId}/direct/?username=${event.value}`,
            {
                method: "GET",
                headers: this.headers,
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    let temp = {};
                    let total_obtained_marks = 0;
                    let total_marks = 0;
                    if (result.data.answer_data.topic_marks) {
                        Object.entries(
                            result.data.answer_data.topic_marks
                        ).forEach(([key, value]) => {
                            temp[key] = {
                                topic_marks: {},
                            };
                            Object.entries(value.topic_marks).forEach(
                                ([key1, value1]) => {
                                    temp[key].topic_marks[key1] = {
                                        total_marks: value1.total_marks,
                                        obtained_marks: value1.obtained_marks,
                                        each_question_mark:
                                            value1.each_question_mark,
                                    };
                                    total_obtained_marks += Number(
                                        value1.obtained_marks
                                    );
                                    total_marks += Number(value1.total_marks);
                                }
                            );
                        });
                    } else {
                        Object.entries(result.data.topics).forEach(
                            ([key, value]) => {
                                temp[key] = {
                                    topic_marks: {},
                                };
                                for (let i = 0; i < value.topics.length; i++) {
                                    temp[key].topic_marks[
                                        value.topics[i].topic_num
                                    ] = {
                                        total_marks: "",
                                        obtained_marks: "",
                                        each_question_mark: "",
                                    };
                                }
                            }
                        );
                    }
                    this.setState({
                        answerData: result.data.answer_data,
                        topics: result.data.topics,
                        topic_marks: temp,
                        total_obtained_marks: total_obtained_marks,
                        total_marks: total_marks,
                        page_loading: false,
                    });
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
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    handleObtainedMarks = (event, chapter_id, topic_num) => {
        let topics = this.state.topic_marks;
        let total_obtained_marks = 0;
        topics[chapter_id].topic_marks[topic_num][event.target.name] =
            event.target.value;
        if (event.target.name === "obtained_marks") {
            Object.entries(topics).forEach(([key, value]) => {
                Object.entries(value.topic_marks).forEach(([key1, value1]) => {
                    total_obtained_marks += Number(value1.obtained_marks);
                });
            });
        }

        this.setState({
            topic_marks: topics,
            total_obtained_marks: total_obtained_marks,
        });
    };

    handleTotalMarks = (event, chapter_id, topic_num) => {
        let topics = this.state.topic_marks;
        let total_marks = 0;
        topics[chapter_id].topic_marks[topic_num][event.target.name] =
            event.target.value;
        if (event.target.name === "total_marks") {
            Object.entries(topics).forEach(([key, value]) => {
                Object.entries(value.topic_marks).forEach(([key1, value1]) => {
                    total_marks += Number(value1.obtained_marks);
                });
            });
        }
        this.setState({
            topic_marks: topics,
            total_marks: total_marks,
        });
    };

    handleMarksPerQuestion = (event, chapter_id, topic_num) => {
        let topics = this.state.topic_marks;
        topics[chapter_id].topic_marks[topic_num][event.target.name] =
            event.target.value;
        this.setState({
            topic_marks: topics,
        });
    };

    handleEvaluate = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: true,
        });
        let topics = this.state.topic_marks;

        Object.entries(topics).forEach(([key, value]) => {
            Object.entries(value.topic_marks).forEach(([key1, value1]) => {
                if (
                    value1.total_marks === "" ||
                    value1.obtained_marks === "" ||
                    value1.each_question_mark === ""
                ) {
                    topics[key].topic_marks[key1] = {};
                }
            });
        });

        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/semester/${this.semesterId}/direct/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    student_username: this.state.selectedStudent,
                    answer_file_url: this.state.answerData.answer_file_url,
                    topic_marks: topics,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
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
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
                });
            });
    };

    handlePublish = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        fetch(
            `${this.url}/teacher/subject/${this.subjectId}/semester/${this.semesterId}/direct/publish/`,
            {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    student_username: this.state.selectedStudent,
                }),
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        page_loading: false,
                    });
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
                this.setState({
                    errorMsg: "Something went wrong!",
                    showErrorAlert: true,
                    page_loading: false,
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
        document.title = `${this.props.semester_name} : Direct test evaluation - Teacher | IQLabs`;
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.props.subject_name}
                    togglenav={this.toggleSideNav}
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

                        <div className="row align-items-center mb-4">
                            <div className="col-md-9">
                                {/* ----- Breadcrumb ----- */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/teacher">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to={`/teacher/group/${this.groupId}`}
                                            >
                                                {this.props.group_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to={`/teacher/group/${this.groupId}/subject/${this.subjectId}`}
                                            >
                                                {this.props.subject_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to="#"
                                                onClick={
                                                    this.props.history.goBack
                                                }
                                            >
                                                {this.props.semester_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Student evaluation
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-3 text-right">
                                <button
                                    className="btn btn-primary btn-sm shadow-none"
                                    onClick={this.handlePublish}
                                    disabled={
                                        Object.entries(this.state.topics)
                                            .length === 0
                                            ? true
                                            : false
                                    }
                                >
                                    Publish
                                </button>
                            </div>
                        </div>

                        {/* ----- Header configuration ----- */}

                        <div className="card shadow-sm mb-3">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col-md-8">
                                        <div className="row">
                                            {this.groupId !== undefined ? (
                                                <div className="col-md-4">
                                                    <p className="font-weight-bold-600 primary-text mb-2">
                                                        Group:
                                                    </p>
                                                    <p className="small font-weight-bold-600 mb-0">
                                                        {this.props.group_name}
                                                    </p>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            <div className="col-md-4">
                                                <p className="font-weight-bold-600 primary-text mb-2">
                                                    Subject:
                                                </p>
                                                <p className="small font-weight-bold-600 mb-0">
                                                    {this.props.subject_name}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <p className="primary-text mb-2">
                                            Select student
                                        </p>
                                        <Select
                                            className="basic-single form-shadow"
                                            isSearchable={true}
                                            name="student"
                                            options={this.state.student_list.map(
                                                (list) => {
                                                    return {
                                                        value: list,
                                                        label: list,
                                                    };
                                                }
                                            )}
                                            onChange={this.handleSelect}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* ----- Main content ----- */}

                        <div className="card card-body light-bg shadow-sm">
                            {/* ----- Table ----- */}
                            {Object.entries(this.state.topics).length !== 0 ? (
                                <div className="row justify-content-center mb-4">
                                    <div className="col-md-9">
                                        {Object.entries(this.state.topics).map(
                                            ([key, value], index) => {
                                                return (
                                                    <div
                                                        className="card secondary-bg mb-3"
                                                        key={index}
                                                    >
                                                        <div className="card-header font-weight-bold-600 secondary-bg">
                                                            {value.chapter_name}
                                                        </div>
                                                        <div className="table-responsive">
                                                            <table className="table ">
                                                                <thead>
                                                                    <tr>
                                                                        <th scope="col">
                                                                            Sl.no
                                                                        </th>
                                                                        <th scope="col">
                                                                            Topics
                                                                        </th>
                                                                        <th scope="col">
                                                                            Obtained
                                                                            Marks
                                                                        </th>
                                                                        <th scope="col">
                                                                            Total
                                                                            Marks
                                                                        </th>
                                                                        <th scope="col">
                                                                            Marks
                                                                            per
                                                                            question
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {Object.entries(
                                                                        value.topics
                                                                    ).length !==
                                                                    0 ? (
                                                                        value.topics.map(
                                                                            (
                                                                                topic,
                                                                                index
                                                                            ) => {
                                                                                return (
                                                                                    <tr
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    >
                                                                                        <td>
                                                                                            1
                                                                                        </td>
                                                                                        <td>
                                                                                            {
                                                                                                topic.topic_name
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                name="obtained_marks"
                                                                                                id="obtained_marks"
                                                                                                className="form-control form-control-sm border-secondary"
                                                                                                value={
                                                                                                    this
                                                                                                        .state
                                                                                                        .topic_marks[
                                                                                                        key
                                                                                                    ]
                                                                                                        .topic_marks[
                                                                                                        topic
                                                                                                            .topic_num
                                                                                                    ]
                                                                                                        .obtained_marks ||
                                                                                                    ""
                                                                                                }
                                                                                                onChange={(
                                                                                                    event
                                                                                                ) => {
                                                                                                    this.handleObtainedMarks(
                                                                                                        event,
                                                                                                        key,
                                                                                                        topic.topic_num
                                                                                                    );
                                                                                                }}
                                                                                                autoComplete="off"
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                name="total_marks"
                                                                                                id="total_marks"
                                                                                                className="form-control form-control-sm border-secondary"
                                                                                                value={
                                                                                                    this
                                                                                                        .state
                                                                                                        .topic_marks[
                                                                                                        key
                                                                                                    ]
                                                                                                        .topic_marks[
                                                                                                        topic
                                                                                                            .topic_num
                                                                                                    ]
                                                                                                        .total_marks ||
                                                                                                    ""
                                                                                                }
                                                                                                onChange={(
                                                                                                    event
                                                                                                ) => {
                                                                                                    this.handleTotalMarks(
                                                                                                        event,
                                                                                                        key,
                                                                                                        topic.topic_num
                                                                                                    );
                                                                                                }}
                                                                                                autoComplete="off"
                                                                                            />
                                                                                        </td>
                                                                                        <td>
                                                                                            <input
                                                                                                type="text"
                                                                                                name="each_question_mark"
                                                                                                id="each_question_mark"
                                                                                                className="form-control form-control-sm border-secondary"
                                                                                                value={
                                                                                                    this
                                                                                                        .state
                                                                                                        .topic_marks[
                                                                                                        key
                                                                                                    ]
                                                                                                        .topic_marks[
                                                                                                        topic
                                                                                                            .topic_num
                                                                                                    ]
                                                                                                        .each_question_mark ||
                                                                                                    ""
                                                                                                }
                                                                                                onChange={(
                                                                                                    event
                                                                                                ) => {
                                                                                                    this.handleMarksPerQuestion(
                                                                                                        event,
                                                                                                        key,
                                                                                                        topic.topic_num
                                                                                                    );
                                                                                                }}
                                                                                                autoComplete="off"
                                                                                            />
                                                                                        </td>
                                                                                    </tr>
                                                                                );
                                                                            }
                                                                        )
                                                                    ) : (
                                                                        <tr>
                                                                            <td>
                                                                                No
                                                                                data
                                                                                to
                                                                                display...
                                                                            </td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                            <td></td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                        <div className="card-footer secondary-bg">
                                                            <div className="row align-items-center">
                                                                <div className="col-3 font-weight-bold-600">
                                                                    Total
                                                                </div>
                                                                <div className="col-3">
                                                                    {
                                                                        this
                                                                            .state
                                                                            .total_obtained_marks
                                                                    }
                                                                </div>
                                                                <div className="col-3">
                                                                    {
                                                                        this
                                                                            .state
                                                                            .total_marks
                                                                    }
                                                                </div>
                                                                <div className="col-3"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}

                                        <div className="row justify-content-center">
                                            <div className="col-md-4">
                                                <button
                                                    className="btn btn-primary btn-sm btn-block shadow-none"
                                                    disabled={
                                                        this.state.topics
                                                            .length === 0
                                                            ? true
                                                            : false
                                                    }
                                                    onClick={
                                                        this.handleEvaluate
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
                                                    Evaluate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}

                            {/* ----- Document preview ----- */}

                            <div className="card card-body secondary-bg text-center">
                                {Object.entries(this.state.answerData)
                                    .length === 0 ? (
                                    "Student uploads will appear here"
                                ) : (
                                    <>
                                        <div id="ResumeContainer">
                                            <Document
                                                file={
                                                    this.state.answerData
                                                        .answer_file_url
                                                }
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

export default connect(mapStateToProps)(TeacherSemesterDirectEvaluation);
