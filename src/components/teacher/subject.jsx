import React, { Component } from "react";
import store from "../../redux/store";
import { connect } from "react-redux";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner, Dropdown } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import AlertBox from "../sharedComponents/alert";
import {
    ContentDeleteModal,
    ContentUpdateModal,
} from "../sharedComponents/contentManagementModal";

class ChapterModal extends Component {
    constructor() {
        super();
        this.state = {
            chapter_name: "",
            weightage: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                chapter_name: this.state.chapter_name,
                weightage: this.state.weightage,
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
                    this.props.formSubmission(true);
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

    handleCourse = (event) => {
        this.setState({
            chapter_name: event.target.value,
        });
    };

    handleWeightage = (event) => {
        this.setState({
            weightage: event.target.value,
        });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Add chapter</Modal.Header>
                <form onSubmit={this.handleSubmit} autoComplete="off">
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
                            <label htmlFor="chapter">Chapter name</label>
                            <input
                                type="text"
                                name="chapter"
                                id="chapter"
                                className="form-control borders"
                                onChange={this.handleCourse}
                                placeholder="Chapter name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weightage">Weightage</label>
                            <input
                                type="text"
                                name="weightage"
                                id="weightage"
                                className="form-control borders"
                                onChange={this.handleWeightage}
                                placeholder="Weightage"
                                required
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary btn-block shadow-none">
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
                            Add
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

class SemesterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            semester_name: "",
            chapter_id: this.props.chapter_id,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/semester/`, {
            headers: this.headers,
            method: "POST",
            body: JSON.stringify({
                semester_name: this.state.semester_name,
                chapter_ids: this.state.chapter_id,
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
                        chapter_names: [],
                    });
                    this.props.formSubmission(true);
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

    handleSemester = (event) => {
        this.setState({
            semester_name: event.target.value,
        });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Add Semester</Modal.Header>
                <form onSubmit={this.handleSubmit} autoComplete="off">
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

                        <label htmlFor="semester">Semester name</label>
                        <input
                            type="text"
                            name="semester"
                            id="semester"
                            className="form-control borders"
                            onChange={this.handleSemester}
                            placeholder="Semester name"
                            required
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary btn-block shadow-none">
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
                            Add
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

class ChapterEditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chapter_id: this.props.data.chapter_id,
            chapter_name: this.props.data.chapter_name,
            weightage: this.props.data.weightage,
            chapter_status: this.props.data.chapter_status,
            status: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
        this.url = baseUrl + teacherUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    componentDidMount = () => {
        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    status: result.data.chapter_status.chapters,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${this.url}/teacher/subject/${this.props.subjectId}/chapter/`, {
            headers: this.headers,
            method: "PATCH",
            body: JSON.stringify({
                chapter_id: this.state.chapter_id,
                chapter_name: this.state.chapter_name,
                chapter_status: this.state.chapter_status,
                weightage: this.state.weightage.toString(),
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
                    this.props.formSubmission(true);
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

    handleCourse = (event) => {
        this.setState({
            chapter_name: event.target.value,
        });
    };

    handleWeightage = (event) => {
        this.setState({
            weightage: event.target.value,
        });
    };

    handleStatus = (event) => {
        this.setState({
            chapter_status: event.target.value,
        });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Edit chapter</Modal.Header>
                <form onSubmit={this.handleSubmit} autoComplete="off">
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
                            <label htmlFor="chapter">Chapter name</label>
                            <input
                                type="text"
                                name="chapter"
                                id="chapter"
                                className="form-control borders"
                                onChange={this.handleCourse}
                                placeholder="Chapter name"
                                value={this.state.chapter_name}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="weightage">Weightage</label>
                            <input
                                type="text"
                                name="weightage"
                                id="weightage"
                                className="form-control borders"
                                onChange={this.handleWeightage}
                                placeholder="Weightage"
                                value={this.state.weightage}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                name="status"
                                id="status"
                                className="form-control borders"
                                onChange={this.handleStatus}
                                value={this.state.chapter_status}
                                required
                            >
                                <option value="">Select an option</option>
                                {this.state.status.map((list, index) => {
                                    return (
                                        <option value={list} key={index}>
                                            {list}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary btn-block shadow-none">
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
                            Update
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => ({
    subject_name: state.subject_name,
});

class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            showSemesterModal: false,
            showChapter_EditModal: false,
            showSemester_EditModal: false,
            showSemester_DeleteModal: false,

            subjectItems: [], // Chapter data
            semesterItems: [], // Semester data
            chapter_id: [], // List of unassigned chapters
            semester_chapters: [], // List of assigned chapters under a semester

            selectedChapter: "",
            selectedSemester: "",
            is_independent: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.subjectId = this.props.match.params.subjectId;
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

    toggleChapter_EditModal = (data) => {
        this.setState({
            selectedChapter: data,
            showChapter_EditModal: !this.state.showChapter_EditModal,
        });
    };

    toggleSemester_EditModal = (data) => {
        this.setState({
            selectedSemester: data,
            showSemester_EditModal: !this.state.showSemester_EditModal,
        });
    };

    toggleSemester_DeleteModal = (data) => {
        this.setState({
            selectedSemester: data,
            showSemester_DeleteModal: !this.state.showSemester_DeleteModal,
        });
    };

    toggleSemesterModal = () => {
        const chapter_id = this.state.chapter_id;
        for (let i = 0; i < this.state.subjectItems.length; i++) {
            if (
                !this.state.semester_chapters.includes(
                    this.state.subjectItems[i].chapter_id
                )
            ) {
                chapter_id.push(this.state.subjectItems[i].chapter_id);
            } else {
                continue;
            }
        }
        this.setState({
            showSemesterModal: !this.state.showSemesterModal,
            chapter_id: chapter_id,
        });
    };

    loadChapterData = () => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data.results,
                        is_independent: result.data.is_independent,
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

    loadSemesterData = () => {
        fetch(`${this.url}/teacher/subject/${this.subjectId}/semester/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    const chapters = [];
                    for (let i = 0; i < result.data.length; i++) {
                        for (
                            let j = 0;
                            j < result.data[i].chapters.length;
                            j++
                        ) {
                            chapters.push(result.data[i].chapters[j]);
                        }
                    }
                    this.setState({
                        semesterItems: result.data,
                        semester_chapters: chapters,
                        chapter_id: [],
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
        document.title = `${this.props.subject_name} - Teacher | IQLabs`;

        this.loadChapterData();
        this.loadSemesterData();
    };

    chapterFormSubmission = () => {
        setTimeout(() => {
            this.setState({
                showModal: false,
                showChapter_EditModal: false,
                showChapter_DeleteModal: false,
            });
            this.loadChapterData();
        }, 1000);
    };

    semesterFormSubmission = () => {
        setTimeout(() => {
            this.setState({
                showSemesterModal: false,
                showSemester_EditModal: false,
                showSemester_DeleteModal: false,
            });
            this.loadSemesterData();
        }, 1000);
    };

    dispatchChapter = (data) => {
        store.dispatch({ type: "CHAPTER", payload: data });
    };

    dispatchSemester = (data) => {
        store.dispatch({ type: "SEMESTER", payload: data });
    };

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

                {/* Chapter modal */}
                {this.state.showModal ? (
                    <ChapterModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        formSubmission={this.chapterFormSubmission}
                        subjectId={this.subjectId}
                    />
                ) : (
                    ""
                )}

                {/* Semester modal */}
                {this.state.showSemesterModal ? (
                    <SemesterModal
                        show={this.state.showSemesterModal}
                        onHide={this.toggleSemesterModal}
                        formSubmission={this.semesterFormSubmission}
                        chapter_id={this.state.chapter_id}
                        subjectId={this.subjectId}
                    />
                ) : (
                    ""
                )}

                {/* Chapter Edit modal */}
                {this.state.showChapter_EditModal ? (
                    <ChapterEditModal
                        show={this.state.showChapter_EditModal}
                        onHide={this.toggleChapter_EditModal}
                        formSubmission={this.chapterFormSubmission}
                        subjectId={this.subjectId}
                        data={this.state.selectedChapter}
                    />
                ) : (
                    ""
                )}

                {/* Semester Edit modal */}
                {this.state.showSemester_EditModal ? (
                    <ContentUpdateModal
                        show={this.state.showSemester_EditModal}
                        onHide={this.toggleSemester_EditModal}
                        formSubmission={this.semesterFormSubmission}
                        url={`${this.url}/teacher/subject/${this.subjectId}/semester/`}
                        type="Semester"
                        name={this.state.selectedSemester.semester_name}
                        data={{
                            semester_id: this.state.selectedSemester
                                .semester_id,
                            semester_name: this.state.selectedSemester
                                .semester_name,
                        }}
                    />
                ) : (
                    ""
                )}

                {/* Semester Delete modal */}
                {this.state.showSemester_DeleteModal ? (
                    <ContentDeleteModal
                        show={this.state.showSemester_DeleteModal}
                        onHide={this.toggleSemester_DeleteModal}
                        formSubmission={this.semesterFormSubmission}
                        url={`${this.url}/teacher/subject/${this.subjectId}/semester/`}
                        type="Semester"
                        name={this.state.selectedSemester.semester_name}
                        data={{
                            semester_id: this.state.selectedSemester
                                .semester_id,
                        }}
                        toggleModal={this.toggleSemester_DeleteModal}
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

                        {/* Header area */}
                        <div className="row align-items-center">
                            <div className="col-md-6">
                                <h5 className="primary-text">
                                    {this.props.subject_name}
                                </h5>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex flex-wrap justify-content-end mb-4">
                                    <button className="btn btn-primary btn-sm shadow-none">
                                        Publish
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="card shadow-sm mb-3">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-bg text-white">
                                        <tr>
                                            <th scope="col">
                                                Chapter structure
                                            </th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Weightage</th>
                                            <th scope="col">Summary</th>
                                            <th
                                                scope="col"
                                                className="text-right"
                                            >
                                                Add content
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* Assigned chapter list to a semester */}
                                        {this.state.semesterItems.length !== 0
                                            ? this.state.semesterItems.map(
                                                  (data, index) => {
                                                      return (
                                                          <React.Fragment
                                                              key={index}
                                                          >
                                                              {this.state.subjectItems.map(
                                                                  (
                                                                      chapter,
                                                                      index
                                                                  ) => {
                                                                      return data.chapters.includes(
                                                                          chapter.chapter_id
                                                                      ) ? (
                                                                          <tr
                                                                              key={
                                                                                  index
                                                                              }
                                                                          >
                                                                              <td>
                                                                                  {
                                                                                      chapter.chapter_name
                                                                                  }
                                                                              </td>
                                                                              <td>
                                                                                  {chapter.chapter_status ===
                                                                                  "Yet to start" ? (
                                                                                      <span className="text-danger">
                                                                                          {
                                                                                              chapter.chapter_status
                                                                                          }
                                                                                      </span>
                                                                                  ) : chapter.chapter_status ===
                                                                                    "Approved" ? (
                                                                                      <span className="text-success">
                                                                                          {
                                                                                              chapter.chapter_status
                                                                                          }
                                                                                      </span>
                                                                                  ) : chapter.chapter_status ===
                                                                                    "In Progress" ? (
                                                                                      <span className="text-warning">
                                                                                          {
                                                                                              chapter.chapter_status
                                                                                          }
                                                                                      </span>
                                                                                  ) : chapter.chapter_status ===
                                                                                    "Review" ? (
                                                                                      <span className="text-primary">
                                                                                          {
                                                                                              chapter.chapter_status
                                                                                          }
                                                                                      </span>
                                                                                  ) : chapter.chapter_status ===
                                                                                    "Ready for review" ? (
                                                                                      <span className="text-primary">
                                                                                          {
                                                                                              chapter.chapter_status
                                                                                          }
                                                                                      </span>
                                                                                  ) : (
                                                                                      chapter.chapter_status
                                                                                  )}
                                                                              </td>
                                                                              <td>
                                                                                  {
                                                                                      chapter.weightage
                                                                                  }
                                                                              </td>
                                                                              <td>
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_id}/summary/upload`}
                                                                                      className="primary-text"
                                                                                  >
                                                                                      <button
                                                                                          className="btn btn-primary btn-sm shadow-none mr-2"
                                                                                          onClick={() =>
                                                                                              this.dispatchChapter(
                                                                                                  chapter.chapter_name
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          <i className="fas fa-file-upload"></i>
                                                                                      </button>
                                                                                  </Link>
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_id}/summary`}
                                                                                      className="primary-text"
                                                                                  >
                                                                                      <button
                                                                                          className="btn btn-primary btn-sm shadow-none"
                                                                                          onClick={() =>
                                                                                              this.dispatchChapter(
                                                                                                  chapter.chapter_name
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          <i className="fas fa-file-medical"></i>
                                                                                      </button>
                                                                                  </Link>
                                                                              </td>
                                                                              <td className="d-flex justify-content-end">
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_id}`}
                                                                                  >
                                                                                      <button
                                                                                          className="btn btn-primary btn-sm shadow-none"
                                                                                          onClick={() =>
                                                                                              this.dispatchChapter(
                                                                                                  chapter.chapter_name
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          Add
                                                                                      </button>
                                                                                  </Link>

                                                                                  <Dropdown>
                                                                                      <Dropdown.Toggle
                                                                                          variant="white"
                                                                                          className="btn btn-link btn-sm shadow-none caret-off ml-2"
                                                                                      >
                                                                                          <i className="fas fa-ellipsis-v"></i>
                                                                                      </Dropdown.Toggle>

                                                                                      <Dropdown.Menu>
                                                                                          <Dropdown.Item
                                                                                              onClick={() =>
                                                                                                  this.toggleChapter_EditModal(
                                                                                                      chapter
                                                                                                  )
                                                                                              }
                                                                                          >
                                                                                              <i className="far fa-edit fa-sm mr-1"></i>{" "}
                                                                                              Edit
                                                                                          </Dropdown.Item>
                                                                                      </Dropdown.Menu>
                                                                                  </Dropdown>
                                                                              </td>
                                                                          </tr>
                                                                      ) : null;
                                                                  }
                                                              )}
                                                              {/* Semester list */}
                                                              <tr key={index}>
                                                                  <td>
                                                                      {
                                                                          data.semester_name
                                                                      }
                                                                  </td>
                                                                  <td></td>
                                                                  <td></td>
                                                                  <td></td>
                                                                  <td className="d-flex justify-content-end">
                                                                      {/* checks if both the permission exist */}
                                                                      {data.auto_test_perm ===
                                                                          true &&
                                                                      data.direct_perm ===
                                                                          true ? (
                                                                          // checks if auto content is available
                                                                          data.auto_test_question ===
                                                                          true ? (
                                                                              <Link
                                                                                  to={`${this.props.match.url}/semester/${data.semester_id}`}
                                                                              >
                                                                                  <button
                                                                                      className="btn btn-primary btn-sm shadow-none"
                                                                                      onClick={() =>
                                                                                          this.dispatchSemester(
                                                                                              data.semester_name
                                                                                          )
                                                                                      }
                                                                                  >
                                                                                      Auto
                                                                                  </button>
                                                                              </Link>
                                                                          ) : // or if direct content is available
                                                                          data.direct_question ===
                                                                            true ? (
                                                                              // checks if it is a independent subject
                                                                              this
                                                                                  .state
                                                                                  .is_independent ===
                                                                              false ? (
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/semester/${data.semester_id}/direct`}
                                                                                  >
                                                                                      <button
                                                                                          className="btn btn-primary btn-sm shadow-none ml-2"
                                                                                          onClick={() =>
                                                                                              this.dispatchSemester(
                                                                                                  data.semester_name
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          Direct
                                                                                          Test
                                                                                      </button>
                                                                                  </Link>
                                                                              ) : (
                                                                                  ""
                                                                              )
                                                                          ) : (
                                                                              // or display both the button
                                                                              <>
                                                                                  <Link
                                                                                      to={`${this.props.match.url}/semester/${data.semester_id}`}
                                                                                  >
                                                                                      <button
                                                                                          className="btn btn-primary btn-sm shadow-none"
                                                                                          onClick={() =>
                                                                                              this.dispatchSemester(
                                                                                                  data.semester_name
                                                                                              )
                                                                                          }
                                                                                      >
                                                                                          Auto
                                                                                      </button>
                                                                                  </Link>
                                                                                  {/* checks if it is a independent subject */}
                                                                                  {this
                                                                                      .state
                                                                                      .is_independent ===
                                                                                  false ? (
                                                                                      <Link
                                                                                          to={`${this.props.match.url}/semester/${data.semester_id}/direct`}
                                                                                      >
                                                                                          <button
                                                                                              className="btn btn-primary btn-sm shadow-none ml-2"
                                                                                              onClick={() =>
                                                                                                  this.dispatchSemester(
                                                                                                      data.semester_name
                                                                                                  )
                                                                                              }
                                                                                          >
                                                                                              Direct
                                                                                              Test
                                                                                          </button>
                                                                                      </Link>
                                                                                  ) : (
                                                                                      ""
                                                                                  )}
                                                                              </>
                                                                          )
                                                                      ) : // checks if auto permission exist
                                                                      data.auto_test_perm ===
                                                                        true ? (
                                                                          <Link
                                                                              to={`${this.props.match.url}/semester/${data.semester_id}`}
                                                                          >
                                                                              <button
                                                                                  className="btn btn-primary btn-sm shadow-none"
                                                                                  onClick={() =>
                                                                                      this.dispatchSemester(
                                                                                          data.semester_name
                                                                                      )
                                                                                  }
                                                                              >
                                                                                  Auto
                                                                              </button>
                                                                          </Link>
                                                                      ) : // checks if direct permission exist
                                                                      data.direct_perm ===
                                                                        true ? (
                                                                          // checks if it is a independent subject
                                                                          this
                                                                              .state
                                                                              .is_independent ===
                                                                          false ? (
                                                                              <Link
                                                                                  to={`${this.props.match.url}/semester/${data.semester_id}/direct`}
                                                                              >
                                                                                  <button
                                                                                      className="btn btn-primary btn-sm shadow-none ml-2"
                                                                                      onClick={() =>
                                                                                          this.dispatchSemester(
                                                                                              data.semester_name
                                                                                          )
                                                                                      }
                                                                                  >
                                                                                      Direct
                                                                                      Test
                                                                                  </button>
                                                                              </Link>
                                                                          ) : (
                                                                              ""
                                                                          )
                                                                      ) : (
                                                                          // or else prints nothing
                                                                          ""
                                                                      )}
                                                                      <Dropdown>
                                                                          <Dropdown.Toggle
                                                                              variant="white"
                                                                              className="btn btn-link btn-sm shadow-none caret-off ml-2"
                                                                          >
                                                                              <i className="fas fa-ellipsis-v"></i>
                                                                          </Dropdown.Toggle>

                                                                          <Dropdown.Menu>
                                                                              <Dropdown.Item
                                                                                  onClick={() =>
                                                                                      this.toggleSemester_EditModal(
                                                                                          data
                                                                                      )
                                                                                  }
                                                                              >
                                                                                  <i className="far fa-edit fa-sm mr-1"></i>{" "}
                                                                                  Edit
                                                                              </Dropdown.Item>
                                                                              <Dropdown.Item
                                                                                  onClick={() =>
                                                                                      this.toggleSemester_DeleteModal(
                                                                                          data
                                                                                      )
                                                                                  }
                                                                              >
                                                                                  <i className="far fa-trash-alt fa-sm mr-1"></i>{" "}
                                                                                  Delete
                                                                              </Dropdown.Item>
                                                                          </Dropdown.Menu>
                                                                      </Dropdown>
                                                                  </td>
                                                              </tr>
                                                          </React.Fragment>
                                                      );
                                                  }
                                              )
                                            : null}
                                        {/* Unassigned chapter list */}
                                        {this.state.subjectItems.length !== 0
                                            ? this.state.subjectItems.map(
                                                  (chapter, index) => {
                                                      return !this.state.semester_chapters.includes(
                                                          chapter.chapter_id
                                                      ) ? (
                                                          <tr key={index}>
                                                              <td>
                                                                  {
                                                                      chapter.chapter_name
                                                                  }
                                                              </td>
                                                              <td>
                                                                  {chapter.chapter_status ===
                                                                  "Yet to start" ? (
                                                                      <span className="text-danger">
                                                                          {
                                                                              chapter.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : chapter.chapter_status ===
                                                                    "Approved" ? (
                                                                      <span className="text-success">
                                                                          {
                                                                              chapter.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : chapter.chapter_status ===
                                                                    "In Progress" ? (
                                                                      <span className="text-warning">
                                                                          {
                                                                              chapter.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : chapter.chapter_status ===
                                                                    "Review" ? (
                                                                      <span className="text-primary">
                                                                          {
                                                                              chapter.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : chapter.chapter_status ===
                                                                    "Ready for review" ? (
                                                                      <span className="text-primary">
                                                                          {
                                                                              chapter.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : (
                                                                      chapter.chapter_status
                                                                  )}
                                                              </td>
                                                              <td>
                                                                  {
                                                                      chapter.weightage
                                                                  }
                                                              </td>
                                                              <td>
                                                                  <Link
                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_id}/summary/upload`}
                                                                      className="primary-text"
                                                                  >
                                                                      <button
                                                                          className="btn btn-primary btn-sm shadow-none mr-2"
                                                                          onClick={() =>
                                                                              this.dispatchChapter(
                                                                                  chapter.chapter_name
                                                                              )
                                                                          }
                                                                      >
                                                                          <i className="fas fa-file-upload"></i>
                                                                      </button>
                                                                  </Link>
                                                                  <Link
                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_id}/summary`}
                                                                      className="primary-text"
                                                                  >
                                                                      <button
                                                                          className="btn btn-primary btn-sm shadow-none"
                                                                          onClick={() =>
                                                                              this.dispatchChapter(
                                                                                  chapter.chapter_name
                                                                              )
                                                                          }
                                                                      >
                                                                          <i className="fas fa-file-medical"></i>
                                                                      </button>
                                                                  </Link>
                                                              </td>
                                                              <td className="d-flex justify-content-end">
                                                                  <Link
                                                                      to={`${this.props.match.url}/chapter/${chapter.chapter_id}`}
                                                                  >
                                                                      <button
                                                                          className="btn btn-primary btn-sm shadow-none"
                                                                          onClick={() =>
                                                                              this.dispatchChapter(
                                                                                  chapter.chapter_name
                                                                              )
                                                                          }
                                                                      >
                                                                          Add
                                                                      </button>
                                                                  </Link>

                                                                  <Dropdown>
                                                                      <Dropdown.Toggle
                                                                          variant="white"
                                                                          className="btn btn-link btn-sm shadow-none caret-off ml-2"
                                                                      >
                                                                          <i className="fas fa-ellipsis-v"></i>
                                                                      </Dropdown.Toggle>

                                                                      <Dropdown.Menu>
                                                                          <Dropdown.Item
                                                                              onClick={() =>
                                                                                  this.toggleChapter_EditModal(
                                                                                      chapter
                                                                                  )
                                                                              }
                                                                          >
                                                                              <i className="far fa-edit fa-sm mr-1"></i>{" "}
                                                                              Edit
                                                                          </Dropdown.Item>
                                                                      </Dropdown.Menu>
                                                                  </Dropdown>
                                                              </td>
                                                          </tr>
                                                      ) : null;
                                                  }
                                              )
                                            : null}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {!this.state.is_independent ? (
                            <>
                                <button
                                    className="btn btn-tomato btn-block shadow-sm mb-2"
                                    onClick={this.toggleModal}
                                >
                                    Add Chapter
                                </button>
                                <button
                                    className="btn btn-tomato btn-block shadow-sm"
                                    onClick={this.toggleSemesterModal}
                                >
                                    Add Semester Exam
                                </button>
                            </>
                        ) : (
                            ""
                        )}
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Subject);
