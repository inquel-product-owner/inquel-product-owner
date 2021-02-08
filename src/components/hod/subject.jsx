import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";

class ChapterModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            teacherData: [],
            chapterStatus: [],
            courseStructure: "",
            selectedStatus: "",
            selectedTeacher: "",
            weightage: "",
            subjectItem: [],
            successMsg: "",
            errorMsg: "",
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: false,
        };
        this.subjectId = this.props.subjectId;
    }

    handleCourse = (event) => {
        this.setState({
            courseStructure: event.target.value,
        });
    };

    handleWeightage = (event) => {
        this.setState({
            weightage: event.target.value,
        });
    };

    handleStatus = (event) => {
        this.setState({
            selectedStatus: event.target.value,
        });
    };

    handleTeacher = (event) => {
        this.setState({
            selectedTeacher: event.target.value,
        });
    };

    componentDidMount = () => {
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/hod/subject/${this.subjectId}/assign/teacher/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    teacherData: result.data.teachers,
                    chapterStatus: result.data.chapter_status.chapters,
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
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: true,
        });

        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/hod/subject/${this.subjectId}/assign/teacher/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                chapter_name: this.state.courseStructure,
                chapter_status: this.state.selectedStatus,
                teacher_id: this.state.selectedTeacher,
                weightage: this.state.weightage,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
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
                console.log(result);
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
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Create Chapter</Modal.Header>
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
                                required
                            >
                                <option value="">Select an option</option>
                                {this.state.chapterStatus.map((list, index) => {
                                    return (
                                        <option value={list} key={index}>
                                            {list}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="teacher">Teacher</label>
                            <select
                                name="teacher"
                                id="teacher"
                                className="form-control borders"
                                onChange={this.handleTeacher}
                                required
                            >
                                <option value="">Select teacher</option>
                                {this.state.teacherData.map((list, index) => {
                                    return (
                                        <option value={list.id} key={index}>
                                            {list.username}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="weightage">Weightage</label>
                            <input
                                type="text"
                                name="weightage"
                                id="weightage"
                                className="form-control borders"
                                onChange={this.handleWeightage}
                                required
                            />
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
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
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

class Subject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            subjectItems: [],
            chapterData: [],
            page_loading: true,
        };
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
        this.url = baseUrl + hodUrl;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    loadSubjectData = () => {
        fetch(
            `${this.url}/hod/subjects/${this.props.match.params.subjectId}/chapters/`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    subjectItems: result.data,
                    chapterData: result.data.chapters,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        this.loadSubjectData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_formSubmited !== this.state.is_formSubmited &&
            this.state.is_formSubmited === true
        ) {
            this.loadSubjectData();
            this.setState({
                is_formSubmited: false,
            });
        }
    };

    formSubmission = (is_formSubmited) => {
        if (is_formSubmited) {
            this.setState({
                is_formSubmited: true,
            });
            setTimeout(() => {
                this.setState({
                    showModal: false,
                });
            }, 1000);
        }
    };

    render() {
        document.title =
            this.state.subjectItems.length !== 0
                ? this.state.subjectItems.subject_name + " - HOD | IQLabs"
                : "Subject - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.subjectItems.subject_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Chapter Modal */}
                {this.state.showModal ? (
                    <ChapterModal
                        show={this.state.showModal}
                        onHide={this.toggleModal}
                        formSubmission={this.formSubmission}
                        subjectId={this.props.match.params.subjectId}
                    />
                ) : null}

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

                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                <h5 className="primary-text mb-0">
                                    {this.state.subjectItems.subject_name}
                                </h5>
                            </div>
                            <div className="col-md-6 text-center text-md-right">
                                <button className="btn btn-primary-invert btn-sm mr-2">
                                    Filter{" "}
                                    <i className="fas fa-filter ml-1"></i>
                                </button>
                                <button
                                    className="btn btn-primary btn-sm mr-2"
                                    onClick={this.toggleModal}
                                >
                                    Add New
                                </button>
                                <Link
                                    to={`/hod/subject/${this.props.match.params.subjectId}/configure`}
                                >
                                    <button className="btn btn-primary btn-sm">
                                        Configure Course
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="secondary-bg">
                                        <tr>
                                            <th scope="col">
                                                Course structure
                                            </th>
                                            <th scope="col">Status</th>
                                            <th scope="col">
                                                Teacher assigned
                                            </th>
                                            <th scope="col"></th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Disable / Enable / Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.chapterData.length !== 0
                                            ? this.state.chapterData.map(
                                                  (list, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>
                                                                  <Link
                                                                      to={`/chapter/${this.props.match.params.subjectId}/${list.chapter_name}`}
                                                                      className="primary-text"
                                                                  >
                                                                      {
                                                                          list.chapter_name
                                                                      }
                                                                  </Link>
                                                              </td>
                                                              <td>
                                                                  {list.chapter_status ===
                                                                  "Yet to start" ? (
                                                                      <span className="text-danger">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : list.chapter_status ===
                                                                    "Approved" ? (
                                                                      <span className="text-success">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : list.chapter_status ===
                                                                    "In Progress" ? (
                                                                      <span className="text-warning">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : list.chapter_status ===
                                                                    "Review" ? (
                                                                      <span className="text-primary">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : list.chapter_status ===
                                                                    "Ready for review" ? (
                                                                      <span className="text-primary">
                                                                          {
                                                                              list.chapter_status
                                                                          }
                                                                      </span>
                                                                  ) : (
                                                                      list.chapter_status
                                                                  )}
                                                              </td>
                                                              <td>
                                                                  {
                                                                      list
                                                                          .teacher
                                                                          .full_name
                                                                  }
                                                              </td>
                                                              <td>
                                                                  <button className="btn btn-primary-invert btn-sm">
                                                                      Re assign
                                                                  </button>
                                                              </td>
                                                              <td className="text-center">
                                                                  <button className="btn btn-primary btn-sm mr-1">
                                                                      D
                                                                  </button>
                                                                  <button className="btn btn-primary btn-sm mr-1">
                                                                      E
                                                                  </button>
                                                                  <button className="btn btn-primary btn-sm">
                                                                      <i className="fas fa-trash-alt fa-sm"></i>
                                                                  </button>
                                                              </td>
                                                          </tr>
                                                      );
                                                  }
                                              )
                                            : ""}
                                    </tbody>
                                </table>
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

export default Subject;
