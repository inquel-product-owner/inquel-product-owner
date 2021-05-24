import React, { Component } from "react";
import { Dropdown, Modal, Alert, Spinner } from "react-bootstrap";
import Header from "../shared/navbar";
import SideNav from "../shared/sidenav";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Select from "react-select";
import Loading from "../../sharedComponents/loader";
import AlertBox from "../../sharedComponents/alert";
import { baseUrl, hodUrl } from "../../../shared/baseUrl";
import ScoreCardTable from "../../sharedComponents/scorecard";
import ReactSwitch from "../../sharedComponents/switchComponent";
import CKeditor from "../../sharedComponents/CKeditor";

const mapStateToProps = (state) => ({
    subject_name: state.content.subject_name,
});

class Scorecard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scorecard: this.props.scorecard,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.subjectId = this.props.subjectId;
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    handleData = (event, category, type, index) => {
        let scorecard = this.state.scorecard;

        if (type === "remarks") {
            var temp = Object.entries(scorecard);
            for (let i = 0; i < Object.keys(scorecard).length; i++) {
                if (temp[i][0] === category) {
                    temp[i][0] = event.target.value;
                } else {
                    continue;
                }
            }
            scorecard = Object.fromEntries(temp);
        } else if (type === "range") {
            scorecard[category][type][index] = Number(event.target.value);
        } else if (type === "retake" || type === "reduction_duration") {
            scorecard[category][type] = `${event.target.value.trim()} week`;
        } else if (type === "reduction") {
            scorecard[category][type] = `${event.target.value.trim()}%`;
        } else {
            scorecard[category][type] = event.target.value;
        }

        this.setState({
            scorecard: scorecard,
        });
    };

    handleSubmit = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: true,
        });

        if (this.props.course_id === "") {
            setTimeout(() => {
                this.props.handlePOST(this.state.scorecard);
            }, 1000);
        } else {
            fetch(
                `${this.url}/hod/course/${this.props.course_id}/score_card/`,
                {
                    method: "PUT",
                    headers: this.headers,
                    body: JSON.stringify({
                        score_card_config: this.state.scorecard,
                        subject_id: this.props.subjectId,
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
                        this.props.handlePOST(this.state.scorecard);
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
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

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Scorecard Configuration</Modal.Header>
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

                    {/* <!----- Scorecard Table -----> */}

                    <ScoreCardTable
                        scorecard={this.state.scorecard}
                        handleData={this.handleData}
                    />
                </Modal.Body>
                <Modal.Footer className="text-right">
                    <button
                        className="btn btn-primary btn-sm shadow-none"
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

class QuickPassModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    onEditorChange = async (evt) => {
        let data = this.state.data;
        data.content = evt.editor.getData();
        await this.setState({
            data: data,
        });
        window.MathJax.typeset();
    };

    handleTitle = (event) => {
        let data = this.state.data;
        data.title = event.target.value;
        this.setState({
            data: data,
        });
    };

    handleSubmit = () => {
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        let data = this.state.data;
        if (data.title === "") {
            this.setState({
                errorMsg: "Enter title",
                showErrorAlert: true,
                showLoader: false,
            });
        } else if (data.content === "") {
            this.setState({
                errorMsg: "Enter content",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            let body = {
                title: data.title,
                content: data.content,
            };

            if (this.props.course_id === "") {
                setTimeout(() => {
                    this.props.handlePOST(body);
                }, 1000);
            } else {
                this.handlePUT(body);
            }
        }
    };

    handlePUT = (body) => {
        fetch(`${this.url}/hod/course/${this.props.course_id}/quick_pass/`, {
            headers: this.headers,
            method: "PUT",
            body: JSON.stringify({
                quick_pass_tips: body,
                subject_id: this.props.subjectId,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        showLoader: false,
                    });
                    this.props.handlePOST(body);
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
            });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable
                enforceFocus={false}
            >
                <Modal.Header closeButton>Quick Pass Tips</Modal.Header>
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

                    <div className="form-group">
                        <input
                            type="text"
                            name="title"
                            id="title"
                            value={this.state.data.title}
                            className="form-control border-secondary"
                            placeholder="Enter title"
                            onChange={this.handleTitle}
                            autoComplete="off"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <CKeditor
                            data={this.state.data.content}
                            onChange={this.onEditorChange}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary shadow-none"
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

class HODCourseConfig extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            chapters: [],
            semesters: [],
            simulation_exam: [],
            configData: {},

            course_id: "",
            courseData: {
                course_name: "",
                board: "",
                type: "",
                limited: false,
                course_structure: {},
                simulation_exam: [],
            },
            score_card_config: {},
            quick_pass_tips: {
                title: "",
                content: "",
            },

            chapter_ids: [],
            semester_ids: [],
            simulation_ids: [],

            showScorecardModal: false,
            showNotesModal: false,
            showUnitForm: false,
            activeUnit: "",

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.url = baseUrl + hodUrl;
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

    // ----- Data loading from the API -----

    loadContentData = () => {
        fetch(`${this.url}/hod/subject/${this.subjectId}/content/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        chapters: result.data.chapters,
                        semesters: result.data.semesters,
                        simulation_exam: result.data.simulation_exam,
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
            .catch((err) => console.log(err));
    };

    loadConfigData = () => {
        fetch(`${this.url}/hod/subject/${this.subjectId}/course/filters/`, {
            method: "GET",
            headers: this.headers,
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        configData: result.data,
                        score_card_config: result.data.score_card_config,
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
            .catch((err) => console.log(err));
    };

    componentDidMount = () => {
        this.loadContentData();
        this.loadConfigData();
    };

    // ----- Data fetching from the users -----

    handleQuickPassNotes = (data) => {
        this.setState({
            quick_pass_tips: data,
            showNotesModal: false,
        });
    };

    handleScoreConfig = (data) => {
        this.setState({
            score_card_config: data,
            showScorecardModal: false,
        });
    };

    handleInput = (event, type) => {
        let data = this.state.courseData;
        if (type === "title" || type === "type") {
            data[event.target.name] = event.target.value;
        } else if (type === "board") {
            data.board = event.value;
        } else if (type === "limited") {
            data.limited = !data.limited;
        }

        this.setState({
            courseData: data,
        });
    };

    // ----- Adding & removing unit -----

    handleAddUnit = () => {
        let data = this.state.courseData;
        let key = `unit_${Object.keys(data.course_structure).length + 1}`;
        data.course_structure[key] = {
            unit_name: `Unit ${Object.keys(data.course_structure).length + 1}`,
            content: [],
        };

        this.setState({
            courseData: data,
        });
    };

    handleRemoveUnit = (key) => {
        let data = this.state.courseData;
        let chapter_ids = [...this.state.chapter_ids];
        let semester_ids = [...this.state.semester_ids];
        let content = data.course_structure[key].content;

        // deleting chapter and semester IDs from the chapter and semester array
        for (let i = 0; i < content.length; i++) {
            if (content[i].chapter_id) {
                chapter_ids.splice(
                    chapter_ids.indexOf(content[i].chapter_id),
                    1
                );
            } else if (content[i].semester_id) {
                semester_ids.splice(
                    semester_ids.indexOf(content[i].semester_id),
                    1
                );
            }
        }
        // deleting the unit
        delete data.course_structure[key];

        this.setState(
            {
                courseData: data,
                chapter_ids: chapter_ids,
                semester_ids: semester_ids,
            },
            () => {
                // updating unit key
                Object.entries(data.course_structure).forEach(
                    ([key, value], index) => {
                        delete data.course_structure[key];
                        data.course_structure[`unit_${index + 1}`] = value;
                    }
                );

                this.setState({
                    courseData: data,
                });
            }
        );
    };

    toggleUnitForm = (unit) => {
        this.setState({
            showUnitForm: !this.state.showUnitForm,
            activeUnit: unit,
        });
    };

    handleUnitInput = (event, key) => {
        let data = this.state.courseData;
        data.course_structure[key].unit_name = event.target.value;

        this.setState({
            courseData: data,
        });
    };

    // ----- Drag & Drop -----

    handleDragStart = (event, data, type) => {
        event.dataTransfer.setData("data", JSON.stringify(data));
        event.dataTransfer.setData("type", type);
    };

    handleDrop = (event) => {
        let course = this.state.courseData;
        let chapter_ids = [...this.state.chapter_ids];
        let semester_ids = [...this.state.semester_ids];
        let simulation_ids = [...this.state.simulation_ids];
        let data = JSON.parse(event.dataTransfer.getData("data")) || null;
        let type = event.dataTransfer.getData("type") || null;

        if (Object.entries(course.course_structure).length !== 0) {
            if (data !== null && type !== null) {
                if (
                    type === "chapter" ||
                    type === "content" ||
                    type === "quiz"
                ) {
                    let content =
                        type === "chapter"
                            ? data.content_exists
                            : type === "content"
                            ? true
                            : false;
                    let quiz =
                        type === "chapter"
                            ? data.quiz_exists
                            : type === "quiz"
                            ? true
                            : false;
                    // check whether the chapter is already dropped
                    if (!chapter_ids.includes(data.chapter_id)) {
                        Object.entries(course.course_structure).forEach(
                            ([key, value], index) => {
                                if (
                                    Object.entries(course.course_structure)
                                        .length ===
                                    index + 1
                                ) {
                                    course.course_structure[key].content.push({
                                        chapter_id: data.chapter_id,
                                        content: content,
                                        quiz: quiz,
                                    });
                                }
                            }
                        );
                        chapter_ids.push(data.chapter_id);
                    }
                } else if (type === "semester") {
                    // check whether the semester is already dropped
                    if (!semester_ids.includes(data.semester_id)) {
                        Object.entries(course.course_structure).forEach(
                            ([key, value], index) => {
                                if (
                                    Object.entries(course.course_structure)
                                        .length ===
                                    index + 1
                                ) {
                                    course.course_structure[key].content.push({
                                        semester_id: data.semester_id,
                                    });
                                }
                            }
                        );
                        semester_ids.push(data.semester_id);
                    }
                }
            }
        }
        if (type === "simulation") {
            if (!simulation_ids.includes(data.simulation_id)) {
                course.simulation_exam.push({
                    simulation_id: data.simulation_id,
                });
                simulation_ids.push(data.simulation_id);
            }
        }

        this.setState({
            courseData: course,
            chapter_ids: chapter_ids,
            semester_ids: semester_ids,
            simulation_ids: simulation_ids,
        });
    };

    // ----- Get content name and weightage -----

    getContentName = (id, type) => {
        let chapters = [...this.state.chapters];
        let semesters = [...this.state.semesters];
        let simulation = [...this.state.simulation_exam];
        let content_name = "";

        if (type === "chapter") {
            for (let i = 0; i < chapters.length; i++) {
                if (chapters[i].chapter_id === id) {
                    content_name = chapters[i].chapter_name;
                }
            }
        } else if (type === "semester") {
            for (let i = 0; i < semesters.length; i++) {
                if (semesters[i].semester_id === id) {
                    content_name = semesters[i].semester_name;
                }
            }
        } else if (type === "simulation") {
            for (let i = 0; i < simulation.length; i++) {
                if (simulation[i].simulation_id === id) {
                    content_name = simulation[i].simulation_name;
                }
            }
        }

        return content_name;
    };

    getChapterWeightage = (id) => {
        let weightage = "";
        let chapters = [...this.state.chapters];

        for (let i = 0; i < chapters.length; i++) {
            if (chapters[i].chapter_id === id) {
                weightage = chapters[i].weightage;
            }
        }

        return weightage;
    };

    // ----- Removing chapter, semester and simulation -----

    handleRemoveContent = (key, index, id, type) => {
        let data = this.state.courseData;
        let chapter_ids = [...this.state.chapter_ids];
        let semester_ids = [...this.state.semester_ids];
        let simulation_ids = [...this.state.simulation_ids];

        if (type === "chapter") {
            data.course_structure[key].content.splice(index, 1);
            chapter_ids.splice(chapter_ids.indexOf(id), 1);
        } else if (type === "semester") {
            data.course_structure[key].content.splice(index, 1);
            semester_ids.splice(semester_ids.indexOf(id), 1);
        } else if (type === "simulation") {
            data.simulation_exam.splice(index, 1);
            simulation_ids.splice(simulation_ids.indexOf(id), 1);
        }

        this.setState({
            courseData: data,
            chapter_ids: chapter_ids,
            semester_ids: semester_ids,
            simulation_ids: simulation_ids,
        });
    };

    // ----- Data submission -----

    handleSubmit = () => {
        this.setState({
            page_loading: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        let data = this.state.courseData;
        let body = data;
        body["subject_id"] = this.subjectId;

        if (data.course_name === "") {
            this.setState({
                errorMsg: "Enter course name",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (data.board === "") {
            this.setState({
                errorMsg: "Select board",
                showErrorAlert: true,
                page_loading: false,
            });
        } else if (data.type === "") {
            this.setState({
                errorMsg: "Select type",
                showErrorAlert: true,
                page_loading: false,
            });
        } else {
            if (this.state.course_id === "") {
                body["score_card_config"] = this.state.score_card_config;
                body["quick_pass_tips"] = this.state.quick_pass_tips;

                this.handlePOST(body);
            } else {
                this.handlePUT(body);
            }
        }
    };

    handlePOST = (body) => {
        fetch(`${this.url}/hod/course/`, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(body),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: result.msg,
                        showSuccessAlert: true,
                        page_loading: false,
                        course_id: result.data.course_id,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    handlePUT = (body) => {
        fetch(`${this.url}/hod/course/${this.state.course_id}/`, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(body),
        })
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
            .catch((err) => console.log(err));
    };

    render() {
        document.title = `${this.props.subject_name} : Course configuration - HOD | IQLabs`;
        const data = this.state.courseData;
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

                {/* Scorecard modal */}
                {this.state.showScorecardModal ? (
                    <Scorecard
                        show={this.state.showScorecardModal}
                        onHide={() => {
                            this.setState({
                                showScorecardModal:
                                    !this.state.showScorecardModal,
                            });
                        }}
                        subjectId={this.subjectId}
                        course_id={this.state.course_id}
                        scorecard={this.state.score_card_config}
                        handlePOST={this.handleScoreConfig}
                    />
                ) : (
                    ""
                )}

                {/* ----- Quick Pass modal ----- */}
                {this.state.showNotesModal ? (
                    <QuickPassModal
                        show={this.state.showNotesModal}
                        onHide={() =>
                            this.setState({
                                showNotesModal: false,
                            })
                        }
                        subjectId={this.subjectId}
                        course_id={this.state.course_id}
                        data={this.state.quick_pass_tips}
                        handlePOST={this.handleQuickPassNotes}
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
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        <div className="form-row">
                            {/* ----- Content card ----- */}
                            <div className="col-md-4">
                                {/* Breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb mb-3">
                                        <li className="breadcrumb-item">
                                            <Link to="/hod">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to="#"
                                                onClick={
                                                    this.props.history.goBack
                                                }
                                            >
                                                {this.props.subject_name}
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Course configuration
                                        </li>
                                    </ol>
                                </nav>

                                <div className="card shadow-sm mb-3">
                                    <div className="card-header font-weight-bold-600">
                                        Items ready for course creation
                                    </div>
                                    <div className="card-body pt-2">
                                        {/* chapters */}
                                        <div className="form-row">
                                            {this.state.chapters.length !== 0
                                                ? this.state.chapters.map(
                                                      (item, index) => {
                                                          return !this.state.chapter_ids.includes(
                                                              item.chapter_id
                                                          ) ? (
                                                              <div
                                                                  className="col-6 mb-2"
                                                                  key={index}
                                                              >
                                                                  <Dropdown>
                                                                      <Dropdown.Toggle
                                                                          variant="white"
                                                                          className="card card-body secondary-bg shadow-none p-2 caret-off w-100"
                                                                          onDragStart={(
                                                                              e
                                                                          ) =>
                                                                              this.handleDragStart(
                                                                                  e,
                                                                                  item,
                                                                                  "chapter"
                                                                              )
                                                                          }
                                                                          draggable
                                                                      >
                                                                          <div className="small primary-text text-center text-wrap font-weight-bold-600 w-100">
                                                                              {
                                                                                  item.chapter_name
                                                                              }
                                                                          </div>
                                                                      </Dropdown.Toggle>

                                                                      <Dropdown.Menu>
                                                                          {item.content_exists ? (
                                                                              <div
                                                                                  className="dropdown-item"
                                                                                  style={{
                                                                                      cursor: "move",
                                                                                  }}
                                                                                  onDragStart={(
                                                                                      e
                                                                                  ) =>
                                                                                      this.handleDragStart(
                                                                                          e,
                                                                                          item,
                                                                                          "content"
                                                                                      )
                                                                                  }
                                                                                  draggable
                                                                              >
                                                                                  Content
                                                                              </div>
                                                                          ) : (
                                                                              ""
                                                                          )}
                                                                          {item.quiz_exists ? (
                                                                              <div
                                                                                  className="dropdown-item"
                                                                                  style={{
                                                                                      cursor: "move",
                                                                                  }}
                                                                                  onDragStart={(
                                                                                      e
                                                                                  ) =>
                                                                                      this.handleDragStart(
                                                                                          e,
                                                                                          item,
                                                                                          "quiz"
                                                                                      )
                                                                                  }
                                                                                  draggable
                                                                              >
                                                                                  Quiz
                                                                              </div>
                                                                          ) : (
                                                                              ""
                                                                          )}
                                                                      </Dropdown.Menu>
                                                                  </Dropdown>
                                                              </div>
                                                          ) : (
                                                              ""
                                                          );
                                                      }
                                                  )
                                                : ""}
                                        </div>

                                        <div className="dropdown-divider mb-3"></div>

                                        {/* semesters */}
                                        <div className="form-row">
                                            {this.state.semesters.length !== 0
                                                ? this.state.semesters.map(
                                                      (item, index) => {
                                                          return !this.state.semester_ids.includes(
                                                              item.semester_id
                                                          ) ? (
                                                              <div
                                                                  className="col-6 mb-2"
                                                                  key={index}
                                                              >
                                                                  <div
                                                                      className="card card-body secondary-bg p-2 w-100"
                                                                      style={{
                                                                          cursor: "move",
                                                                      }}
                                                                      onDragStart={(
                                                                          e
                                                                      ) =>
                                                                          this.handleDragStart(
                                                                              e,
                                                                              item,
                                                                              "semester"
                                                                          )
                                                                      }
                                                                      draggable
                                                                  >
                                                                      <div className="small primary-text text-center text-wrap font-weight-bold-600 w-100">
                                                                          {
                                                                              item.semester_name
                                                                          }
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          ) : (
                                                              ""
                                                          );
                                                      }
                                                  )
                                                : ""}
                                        </div>

                                        {/* simulation */}
                                        <div className="form-row">
                                            {this.state.simulation_exam
                                                .length !== 0
                                                ? this.state.simulation_exam.map(
                                                      (item, index) => {
                                                          return !this.state.simulation_ids.includes(
                                                              item.simulation_id
                                                          ) ? (
                                                              <div
                                                                  className="col-6 mb-2"
                                                                  key={index}
                                                              >
                                                                  <div
                                                                      className="card card-body secondary-bg p-2 w-100"
                                                                      style={{
                                                                          cursor: "move",
                                                                      }}
                                                                      onDragStart={(
                                                                          e
                                                                      ) =>
                                                                          this.handleDragStart(
                                                                              e,
                                                                              item,
                                                                              "simulation"
                                                                          )
                                                                      }
                                                                      draggable
                                                                  >
                                                                      <div className="small primary-text text-center text-wrap font-weight-bold-600 w-100">
                                                                          {
                                                                              item.simulation_name
                                                                          }
                                                                      </div>
                                                                  </div>
                                                              </div>
                                                          ) : (
                                                              ""
                                                          );
                                                      }
                                                  )
                                                : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ----- Course config card ----- */}
                            <div className="col-md-8">
                                <div className="card card-body shadow-sm">
                                    {/* Course title & board */}
                                    <div className="row mb-3">
                                        <div className="col-md-8">
                                            <div className="d-flex align-items-center">
                                                <p className="primary-text font-weight-bold-600 text-nowrap mr-2 mb-0">
                                                    Course Title
                                                </p>
                                                <input
                                                    type="text"
                                                    name="course_name"
                                                    id="course_name"
                                                    className="form-control borders"
                                                    placeholder="Enter course title"
                                                    onChange={(event) =>
                                                        this.handleInput(
                                                            event,
                                                            "title"
                                                        )
                                                    }
                                                    autoComplete="off"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="d-flex align-items-center">
                                                <p className="primary-text font-weight-bold-600 text-nowrap mr-2 mb-0">
                                                    Board
                                                </p>
                                                <Select
                                                    className="basic-single borders w-100"
                                                    placeholder="Select board"
                                                    isSearchable={true}
                                                    name="board"
                                                    id="board"
                                                    options={
                                                        this.state.configData
                                                            .board
                                                            ? Object.entries(
                                                                  this.state
                                                                      .configData
                                                                      .board
                                                              ).map(
                                                                  ([
                                                                      key,
                                                                      value,
                                                                  ]) => {
                                                                      return {
                                                                          label: value,
                                                                          value: key,
                                                                      };
                                                                  }
                                                              )
                                                            : ""
                                                    }
                                                    onChange={(event) =>
                                                        this.handleInput(
                                                            event,
                                                            "board"
                                                        )
                                                    }
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scorecard, type, limited, quick pass and unit */}
                                    <div className="row mb-3">
                                        <div className="col-md-5">
                                            <div className="form-row align-items-center">
                                                <div className="col-7">
                                                    <button
                                                        className="btn btn-primary btn-sm shadow-none btn-block"
                                                        onClick={() => {
                                                            this.setState({
                                                                showScorecardModal:
                                                                    !this.state
                                                                        .showScorecardModal,
                                                            });
                                                        }}
                                                    >
                                                        Score configuration
                                                    </button>
                                                </div>
                                                <div className="col-5">
                                                    <select
                                                        name="type"
                                                        id="type"
                                                        className="form-control form-control-sm primary-bg text-white"
                                                        style={{
                                                            borderRadius: "4px",
                                                        }}
                                                        onChange={(event) =>
                                                            this.handleInput(
                                                                event,
                                                                "type"
                                                            )
                                                        }
                                                    >
                                                        <option value="">
                                                            Select type
                                                        </option>
                                                        {this.state.configData
                                                            .type
                                                            ? Object.entries(
                                                                  this.state
                                                                      .configData
                                                                      .type
                                                              ).map(
                                                                  (
                                                                      [
                                                                          key,
                                                                          value,
                                                                      ],
                                                                      index
                                                                  ) => {
                                                                      return (
                                                                          <option
                                                                              value={
                                                                                  key
                                                                              }
                                                                              key={
                                                                                  index
                                                                              }
                                                                          >
                                                                              {
                                                                                  value
                                                                              }
                                                                          </option>
                                                                      );
                                                                  }
                                                              )
                                                            : ""}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-7">
                                            <div className="form-row align-items-center">
                                                <div className="col-4">
                                                    <div className="d-flex align-items-center justify-content-end">
                                                        <span className="mr-2">
                                                            Limited
                                                        </span>
                                                        <ReactSwitch
                                                            checked={
                                                                this.state
                                                                    .courseData
                                                                    .limited
                                                                    ? this.state
                                                                          .courseData
                                                                          .limited
                                                                    : false
                                                            }
                                                            onChange={(event) =>
                                                                this.handleInput(
                                                                    event,
                                                                    "limited"
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-4">
                                                    <button
                                                        className="btn bg-primary btn-sm text-white btn-block shadow-none"
                                                        onClick={() =>
                                                            this.setState({
                                                                showNotesModal: true,
                                                            })
                                                        }
                                                    >
                                                        Quick Pass Tips
                                                    </button>
                                                </div>
                                                <div className="col-4">
                                                    <button
                                                        className="btn bg-primary btn-sm text-white btn-block shadow-none"
                                                        onClick={
                                                            this.handleAddUnit
                                                        }
                                                    >
                                                        Add Unit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content drop area */}
                                    <div className="border mb-3">
                                        <div className="card-header small font-weight-bold border-bottom">
                                            <div className="row align-items-center">
                                                <div className="col-2">
                                                    Sl. No.
                                                </div>
                                                <div className="col-7">
                                                    Course Structure
                                                </div>
                                                <div className="col-2">
                                                    Weightage
                                                </div>
                                                <div className="col-1"></div>
                                            </div>
                                        </div>
                                        <div
                                            className="card-body position-relative py-2"
                                            style={{ minHeight: "300px" }}
                                            onDragOver={(e) =>
                                                e.preventDefault()
                                            }
                                            onDrop={(e) => this.handleDrop(e)}
                                        >
                                            {Object.entries(
                                                data.course_structure
                                            ).length === 0 &&
                                            data.simulation_exam.length ===
                                                0 ? (
                                                <div
                                                    id="drop-here"
                                                    className="text-muted"
                                                    style={{
                                                        userSelect: "none",
                                                    }}
                                                    draggable={false}
                                                >
                                                    Add unit to drop items
                                                    here...
                                                </div>
                                            ) : (
                                                <>
                                                    {Object.entries(
                                                        data.course_structure
                                                    ).map(
                                                        (
                                                            [key, value],
                                                            index
                                                        ) => {
                                                            return (
                                                                <div
                                                                    className="mb-3"
                                                                    key={index}
                                                                >
                                                                    {/* ----- Unit list ----- */}
                                                                    <div className="row align-items-center mb-2">
                                                                        <div className="col-2"></div>
                                                                        <div className="col-7 d-flex align-items-center text-muted font-weight-bold-600">
                                                                            {this
                                                                                .state
                                                                                .activeUnit ===
                                                                                key &&
                                                                            this
                                                                                .state
                                                                                .showUnitForm ? (
                                                                                <>
                                                                                    <div>
                                                                                        <input
                                                                                            type="text"
                                                                                            name="unit_name"
                                                                                            id="unit_name"
                                                                                            className="form-control form-control-sm border"
                                                                                            value={
                                                                                                value.unit_name
                                                                                            }
                                                                                            onChange={(
                                                                                                event
                                                                                            ) => {
                                                                                                this.handleUnitInput(
                                                                                                    event,
                                                                                                    key
                                                                                                );
                                                                                            }}
                                                                                            autoComplete="off"
                                                                                        />
                                                                                    </div>
                                                                                    <span
                                                                                        className="ml-3 small"
                                                                                        style={{
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            this.toggleUnitForm(
                                                                                                key
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <i className="far fa-save fa-sm"></i>
                                                                                    </span>
                                                                                </>
                                                                            ) : (
                                                                                <>
                                                                                    <div>
                                                                                        {
                                                                                            value.unit_name
                                                                                        }
                                                                                    </div>
                                                                                    <span
                                                                                        className="ml-3 small"
                                                                                        style={{
                                                                                            cursor: "pointer",
                                                                                        }}
                                                                                        onClick={() => {
                                                                                            this.toggleUnitForm(
                                                                                                key
                                                                                            );
                                                                                        }}
                                                                                    >
                                                                                        <i className="far fa-edit fa-sm"></i>
                                                                                    </span>
                                                                                </>
                                                                            )}
                                                                        </div>
                                                                        <div className="col-2"></div>
                                                                        <div className="col-1">
                                                                            <span
                                                                                className="text-muted"
                                                                                style={{
                                                                                    cursor: "pointer",
                                                                                }}
                                                                                onClick={() => {
                                                                                    this.handleRemoveUnit(
                                                                                        key
                                                                                    );
                                                                                }}
                                                                            >
                                                                                <i className="fas fa-minus-circle"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Chapter and Semester list */}
                                                                    {value.content.map(
                                                                        (
                                                                            item,
                                                                            cs_index
                                                                        ) => {
                                                                            return (
                                                                                <div
                                                                                    className="row align-items-center mb-1"
                                                                                    key={
                                                                                        cs_index
                                                                                    }
                                                                                >
                                                                                    <div className="col-2 small primary-text font-weight-bold-600">
                                                                                        {cs_index +
                                                                                            1}
                                                                                    </div>
                                                                                    <div className="col-7 small primary-text font-weight-bold-600">
                                                                                        {this.getContentName(
                                                                                            item.chapter_id
                                                                                                ? item.chapter_id
                                                                                                : item.semester_id,
                                                                                            item.chapter_id
                                                                                                ? "chapter"
                                                                                                : "semester"
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="col-2 small primary-text font-weight-bold-600">
                                                                                        {item.chapter_id
                                                                                            ? this.getChapterWeightage(
                                                                                                  item.chapter_id
                                                                                              )
                                                                                            : "-"}
                                                                                    </div>
                                                                                    <div className="col-1">
                                                                                        <span
                                                                                            className="primary-text"
                                                                                            style={{
                                                                                                cursor: "pointer",
                                                                                            }}
                                                                                            onClick={() => {
                                                                                                this.handleRemoveContent(
                                                                                                    key,
                                                                                                    cs_index,
                                                                                                    item.chapter_id
                                                                                                        ? item.chapter_id
                                                                                                        : item.semester_id,
                                                                                                    item.chapter_id
                                                                                                        ? "chapter"
                                                                                                        : "semester"
                                                                                                );
                                                                                            }}
                                                                                        >
                                                                                            <i className="fas fa-minus-circle"></i>
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            );
                                                                        }
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )}

                                                    {/* Simulation list */}
                                                    {data.simulation_exam.map(
                                                        (item, se_index) => {
                                                            console.log(item);
                                                            return (
                                                                <div
                                                                    className="row align-items-center mb-1"
                                                                    key={
                                                                        se_index
                                                                    }
                                                                >
                                                                    <div className="col-2"></div>
                                                                    <div className="col-7 primary-text small font-weight-bold-600">
                                                                        {this.getContentName(
                                                                            item.simulation_id,
                                                                            "simulation"
                                                                        )}
                                                                    </div>
                                                                    <div className="col-2 primary-text small font-weight-bold-600">
                                                                        -
                                                                    </div>
                                                                    <div className="col-1">
                                                                        <span
                                                                            className="primary-text"
                                                                            style={{
                                                                                cursor: "pointer",
                                                                            }}
                                                                            onClick={() => {
                                                                                this.handleRemoveContent(
                                                                                    "NODATA",
                                                                                    se_index,
                                                                                    item.simulation_id,
                                                                                    "simulation"
                                                                                );
                                                                            }}
                                                                        >
                                                                            <i className="fas fa-minus-circle"></i>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>

                                    {/* Save & review */}
                                    <div className="d-flex justify-content-end">
                                        <button
                                            className="btn btn-primary btn-sm shadow-none mr-1"
                                            onClick={this.handleSubmit}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-primary btn-sm shadow-none"
                                            disabled={
                                                this.state.course_id === ""
                                                    ? true
                                                    : false
                                            }
                                        >
                                            Review
                                        </button>
                                    </div>
                                </div>
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

export default connect(mapStateToProps)(HODCourseConfig);
