import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "../navbar";
import SideNav from "../sidenav";
import Select from "react-select";
import { Modal, Spinner, Alert } from "react-bootstrap";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import Loading from "../../sharedComponents/loader";

class SubjectReassignModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teacherData: [],
            teacher: "",
            successMsg: "",
            errorMsg: "",
            showSuccessAlert: false,
            showErrorAlert: false,
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

    handleInput = (event) => {
        this.setState({
            teacher: event.value.toString(),
        });
    };

    componentDidMount = () => {
        fetch(`${this.url}/hod/teacher/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    teacherData: result.data,
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

        if (this.state.teacher === "") {
            this.setState({
                errorMsg: "Please select a teacher to assign",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            fetch(`${this.url}/hod/create/subject/`, {
                headers: this.headers,
                method: "PATCH",
                body: JSON.stringify({
                    subject_id: this.props.subjectId,
                    teacher_id: this.state.teacher,
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
        }
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
                <Modal.Header closeButton>Subject Re-assigning</Modal.Header>
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
                            <label htmlFor="teacher">Teacher</label>
                            <Select
                                className="basic-single borders"
                                placeholder="Select teacher"
                                isSearchable={true}
                                name="teacher_id"
                                id="teacher_id"
                                options={this.state.teacherData.map((list) => {
                                    return {
                                        value: list.id,
                                        label:
                                            list.full_name !== ""
                                                ? list.full_name
                                                : list.username,
                                    };
                                })}
                                onChange={this.handleInput}
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

class GroupSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
            showReassignModal: false,
            groupItem: [],
            subjectItems: [],
            chapterData: [],
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.subjectId = this.props.match.params.subjectId;
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

    toggleReassignModal = () => {
        this.setState({
            showReassignModal: !this.state.showReassignModal,
        });
    };

    loadSubjectData = () => {
        fetch(`${this.url}/hod/subjects/${this.subjectId}/chapters/`, {
            headers: this.headers,
            method: "GET",
        })
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
        fetch(`${this.url}/hod/group/${this.groupId}`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    groupItem: result.data,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });

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
                    showReassignModal: false,
                });
            }, 1000);
        }
    };

    render() {
        document.title =
            this.state.subjectItems.subject_name + " Subject - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.groupItem.group_name}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                {/* Subject reassign Modal */}
                {this.state.showReassignModal ? (
                    <SubjectReassignModal
                        show={this.state.showReassignModal}
                        onHide={this.toggleReassignModal}
                        formSubmission={this.formSubmission}
                        subjectId={this.subjectId}
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
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                {/* Breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/hod">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <Link
                                                to="#"
                                                onClick={this.props.history.goBack}
                                            >
                                                Group
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            <span>Subject:</span>
                                            {
                                                this.state.subjectItems
                                                    .subject_name
                                            }
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6 text-center text-md-right">
                                <button
                                    className="btn btn-primary btn-sm mr-2"
                                    onClick={this.toggleReassignModal}
                                >
                                    Re assign
                                </button>
                                <Link to={`${this.props.match.url}/configure`}>
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
                                            <th scope="col">View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.chapterData.length !== 0
                                            ? this.state.chapterData.map(
                                                  (list, index) => {
                                                      return (
                                                          <tr key={index}>
                                                              <td>
                                                                  {
                                                                      list.chapter_name
                                                                  }
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
                                                                  <button className="btn btn-primary-invert btn-sm shadow-sm">
                                                                      <i className="far fa-eye"></i>
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

export default GroupSubject;
