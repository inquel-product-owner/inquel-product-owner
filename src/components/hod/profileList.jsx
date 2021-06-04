import React, { Component, Fragment } from "react";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Link } from "react-router-dom";
import { Tabs, Tab, Dropdown, Modal, Spinner, Alert } from "react-bootstrap";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import { paginationCount } from "../../shared/constant.js";
import Loading from "../common/loader";
import TeacherTable from "../table/teacher";
import StudentTable from "../table/student";
import Paginations from "../common/pagination";
import AlertBox from "../common/alert";
import {
    UserDeleteModal,
    UserDisableModal,
    UserEnableModal,
} from "../common/modal/userManagementModal";

// Student add modal
class AddStudentModal extends Component {
    constructor() {
        super();
        this.state = {
            email: [""],
            terms_and_condition: false,

            errorMsg: [],
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${url}/hod/create/student/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                students: this.state.email,
                terms_and_condition: this.state.terms_and_condition,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: "Email added successfully!",
                        showSuccessAlert: true,
                        showLoader: false,
                        email: [""],
                    });
                    if (result.data.existing_email) {
                        if (result.data.existing_email.length !== 0) {
                            this.setState({
                                errorMsg: result.data.existing_email,
                                showErrorAlert: true,
                            });
                        } else {
                            this.props.studentFormSubmission(true);
                        }
                    }
                } else {
                    this.setState({
                        errorMsg: result.data.existing_email,
                        showErrorAlert: true,
                        showLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleInputChange = (index, event) => {
        let values = [...this.state.email];
        values[index] = event.target.value;
        this.setState({
            email: values,
        });
    };

    handleCheck = (event) => {
        if (event.target.checked) {
            this.setState({
                terms_and_condition: true,
            });
        }
    };

    handleAddFields = () => {
        const values = [...this.state.email];
        values.push("");
        this.setState({
            email: values,
        });
    };

    handleRemoveFields = (index) => {
        const values = [...this.state.email];
        values.splice(index, 1);
        this.setState({
            email: values,
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
                <Modal.Header closeButton>Create Student</Modal.Header>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <Modal.Body>
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
                            <h6>Existing email</h6>
                            {this.state.errorMsg.map((email, index) => {
                                return (
                                    <p className="small mb-2" key={index}>
                                        {email}
                                    </p>
                                );
                            })}
                        </Alert>

                        {this.state.email.map((inputField, index) => (
                            <Fragment key={index}>
                                <div className="form-group">
                                    <label htmlFor={`semail${index}`}>
                                        {`Student email ${index + 1}`}
                                    </label>
                                    <div
                                        className="input-group borders"
                                        style={{
                                            borderRadius: "6px",
                                        }}
                                    >
                                        <input
                                            type="email"
                                            className="form-control"
                                            id={`semail${index}`}
                                            name="semail"
                                            value={inputField}
                                            onChange={(event) =>
                                                this.handleInputChange(
                                                    index,
                                                    event
                                                )
                                            }
                                            required
                                        />
                                        <div className="input-group-append">
                                            <div
                                                className="btn-group"
                                                role="group"
                                                aria-label="Basic example"
                                            >
                                                {index !== 0 ? (
                                                    <button
                                                        type="button"
                                                        className="btn btn-light shadow-none font-weight-bold"
                                                        onClick={() =>
                                                            this.handleRemoveFields(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        -
                                                    </button>
                                                ) : (
                                                    ""
                                                )}
                                                <button
                                                    type="button"
                                                    className="btn btn-light shadow-none font-weight-bold"
                                                    onClick={() =>
                                                        this.handleAddFields()
                                                    }
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input
                                        type="checkbox"
                                        className="custom-control-input"
                                        id="customCheck1"
                                        name="terms_and_condition"
                                        onChange={this.handleCheck}
                                        disabled={
                                            this.state.terms_and_condition
                                                ? true
                                                : false
                                        }
                                        required
                                    />
                                    <label
                                        className="custom-control-label"
                                        for="customCheck1"
                                    >
                                        I agree to the{" "}
                                        <Link
                                            to="/"
                                            className="primary-text font-weight-bold-600"
                                        >
                                            Terms and Conditions
                                        </Link>
                                    </label>
                                </div>
                            </Fragment>
                        ))}
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block shadow-none"
                            disabled={
                                this.state.terms_and_condition ? false : true
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
                            Add student
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

// Teacher add modal
class AddTeacherModal extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            username: "",
            password: "",
            terms_and_condition: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            showPassword: false,
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });

        fetch(`${url}/hod/create/teacher/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
                terms_and_condition: this.state.terms_and_condition,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        successMsg: "Teacher created successfully!",
                        showSuccessAlert: true,
                        showLoader: false,
                        email: "",
                        username: "",
                        password: "",
                    });
                    this.props.teacherFormSubmission(true);
                } else {
                    var errorMessage = "";
                    if (result.username) {
                        errorMessage = result.username[0];
                        this.setState({
                            errorMsg: errorMessage,
                        });
                    } else if (result.password) {
                        errorMessage = result.password[0];
                        this.setState({
                            errorMsg: errorMessage,
                        });
                    } else {
                        errorMessage = result.msg;
                        this.setState({
                            errorMsg: errorMessage,
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

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleCheck = (event) => {
        if (event.target.checked) {
            this.setState({
                terms_and_condition: true,
            });
        }
    };

    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
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
                <Modal.Header closeButton>Create Teacher</Modal.Header>
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
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control borders"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="form-control borders"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div
                                className="input-group borders"
                                style={{
                                    borderRadius: "6px",
                                }}
                            >
                                <input
                                    type={
                                        this.state.showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    onChange={this.handleChange}
                                    placeholder="**********"
                                    required
                                />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-link btn-sm bg-white shadow-none"
                                        type="button"
                                        id="button-addon2"
                                        onClick={this.showPassword}
                                    >
                                        {this.state.showPassword ? (
                                            <i className="far fa-eye-slash"></i>
                                        ) : (
                                            <i className="far fa-eye"></i>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="customCheck1"
                                name="terms_and_condition"
                                onChange={this.handleCheck}
                                disabled={
                                    this.state.terms_and_condition
                                        ? true
                                        : false
                                }
                                required
                            />
                            <label
                                className="custom-control-label"
                                for="customCheck1"
                            >
                                I agree to the{" "}
                                <Link
                                    to="/"
                                    className="primary-text font-weight-bold-600"
                                >
                                    Terms and Conditions
                                </Link>
                            </label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block shadow-none"
                            disabled={
                                this.state.terms_and_condition ? false : true
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
                            Create teacher
                        </button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}

// Teacher delete modal
class TeacherDeleteModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            errorLoop: false,
        };
        this.url = baseUrl + hodUrl;
        this.authToken = localStorage.getItem("Authorization");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: this.authToken,
        };
    }

    handleDelete = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showLoader: true,
        });

        if (this.props.data.length !== 0) {
            fetch(`${this.url}/hod/teacher/delete/`, {
                method: "DELETE",
                headers: this.headers,
                body: JSON.stringify({ teacher_ids: this.props.data }),
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                        });
                        this.props.teacherFormSubmission(true);
                    } else {
                        if (result.detail) {
                            this.setState({
                                errorMsg: result.detail,
                            });
                        } else if (result.data) {
                            if (result.data.deleted_teachers.length !== 0) {
                                this.setState({
                                    successMsg: "Inactive teachers deleted!",
                                    showSuccessAlert: true,
                                });
                                this.props.teacherFormSubmission(true);
                            }
                            this.setState({
                                errorLoop: true,
                                errorMsg: result.data.invalid_teachers,
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
        } else {
            alert("Please select a teacher to delete");
        }
    };

    render() {
        console.log(this.props.data);
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>Delete Teacher</Modal.Header>
                <Modal.Body>
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
                        {this.state.errorLoop === true
                            ? this.state.errorMsg.map((data, index) => {
                                  let value = Object.entries(data);
                                  return (
                                      <p className="small mb-1" key={index}>
                                          <span className="font-weight-bold">
                                              {value[0][0]}
                                          </span>{" "}
                                          {value[0][1]}
                                      </p>
                                  );
                              })
                            : this.state.errorMsg}
                    </Alert>
                    <p>Are you sure that you want to delete this teacher?</p>
                    {this.props.data.map((item, index) => {
                        return (
                            <p className="small mb-2" key={index}>
                                {index + 1}. {item.username}
                            </p>
                        );
                    })}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-link btn-sm shadow-none mr-2"
                        onClick={this.props.toggleModal}
                    >
                        Cancel
                    </button>
                    <button
                        className="btn btn-primary btn-sm shadow-none"
                        onClick={this.handleDelete}
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
                        Delete
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class HODTeacherStudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTeacherPage: 1,
            totalTeacherCount: 0,
            activeStudentPage: 1,
            totalStudentCount: 0,
            showSideNav: false,

            activeTab: "teacher",
            showTeacherModal: false,
            showStudentModal: false,
            showTeacher_DeleteModal: false,
            showStudent_DeleteModal: false,
            showTeacher_DisableModal: false,
            showStudent_DisableModal: false,
            showTeacher_EnableModal: false,
            showStudent_EnableModal: false,

            teacherItems: [],
            studentItems: [],
            selectedTeacher: [],
            selectedStudent: [],

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
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

    handleSelect = (key) => {
        this.setState({ activeTab: key });
        this.props.history.push({ hash: key });
    };

    loadTeacherData = () => {
        fetch(
            `${this.url}/hod/create/teacher/?page=${this.state.activeTeacherPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        teacherItems: result.data.results,
                        totalTeacherCount: result.data.count,
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
            });
    };

    loadStudentData = () => {
        fetch(
            `${this.url}/hod/create/student/?page=${this.state.activeStudentPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        studentItems: result.data.results,
                        totalStudentCount: result.data.count,
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
            });
    };

    componentDidMount = () => {
        if (!this.props.location.hash) {
            this.setState({ activeTab: "teacher" });
        } else {
            this.setState({ activeTab: this.props.location.hash.substring(1) });
        }

        this.loadTeacherData();
        this.loadStudentData();
    };

    handleAdd = () => {
        if (this.state.activeTab === "teacher") {
            this.setState({
                showTeacherModal: !this.state.showTeacherModal,
            });
        } else if (this.state.activeTab === "student") {
            this.setState({
                showStudentModal: !this.state.showStudentModal,
            });
        }
    };

    handleDelete = () => {
        if (this.state.activeTab === "teacher") {
            this.setState({
                showTeacher_DeleteModal: !this.state.showTeacher_DeleteModal,
            });
        } else if (this.state.activeTab === "student") {
            this.setState({
                showStudent_DeleteModal: !this.state.showStudent_DeleteModal,
            });
        }
    };

    handleDisable = () => {
        if (this.state.activeTab === "teacher") {
            this.setState({
                showTeacher_DisableModal: !this.state.showTeacher_DisableModal,
            });
        } else if (this.state.activeTab === "student") {
            this.setState({
                showStudent_DisableModal: !this.state.showStudent_DisableModal,
            });
        }
    };

    handleEnable = () => {
        if (this.state.activeTab === "teacher") {
            this.setState({
                showTeacher_EnableModal: !this.state.showTeacher_EnableModal,
            });
        } else if (this.state.activeTab === "student") {
            this.setState({
                showStudent_EnableModal: !this.state.showStudent_EnableModal,
            });
        }
    };

    teacherFormSubmission = () => {
        setTimeout(() => {
            this.setState({
                showTeacherModal: false,
                showTeacher_DeleteModal: false,
                showTeacher_DisableModal: false,
                showTeacher_EnableModal: false,
            });
        }, 1000);
        this.loadTeacherData();
    };

    studentFormSubmission = () => {
        setTimeout(() => {
            this.setState({
                showStudentModal: false,
                showStudent_DeleteModal: false,
                showStudent_DisableModal: false,
                showStudent_EnableModal: false,
            });
        }, 1000);
        this.loadStudentData();
    };

    // Gets teacher ID from the teacher table
    handleTeacherId = (data) => {
        let value = [];
        const teacherItems = this.state.teacherItems;
        for (let i = 0; i < teacherItems.length; i++) {
            if (data.includes(teacherItems[i].id.toString())) {
                value.push({
                    id: teacherItems[i].id.toString(),
                    username: teacherItems[i].username,
                });
            } else {
                continue;
            }
        }
        this.setState({
            selectedTeacher: value,
        });
    };

    // Gets Student ID from the Student table
    handleStudentId = (data) => {
        let value = [];
        const studentItems = this.state.studentItems;
        for (let i = 0; i < studentItems.length; i++) {
            if (data.includes(studentItems[i].id.toString())) {
                value.push({
                    id: studentItems[i].id.toString(),
                    username: studentItems[i].username,
                });
            } else {
                continue;
            }
        }
        this.setState({
            selectedStudent: value,
        });
    };

    handleTeacherPageChange(pageNumber) {
        this.setState(
            { activeTeacherPage: pageNumber, page_loading: true },
            () => {
                this.loadTeacherData();
            }
        );
    }

    handleStudentPageChange(pageNumber) {
        this.setState(
            { activeStudentPage: pageNumber, page_loading: true },
            () => {
                this.loadStudentData();
            }
        );
    }

    render() {
        document.title =
            this.state.activeTab === "teacher"
                ? "Teacher List - HOD | IQLabs"
                : "Student List - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={
                        this.state.activeTab === "teacher"
                            ? "Teacher List"
                            : "Student List"
                    }
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
                    activeLink="profiles"
                />

                {/* Teacher create modal */}
                {this.state.showTeacherModal ? (
                    <AddTeacherModal
                        show={this.state.showTeacherModal}
                        onHide={this.handleAdd}
                        teacherFormSubmission={this.teacherFormSubmission}
                    />
                ) : null}

                {/* Teacher delete modal */}
                {this.state.showTeacher_DeleteModal ? (
                    <TeacherDeleteModal
                        show={this.state.showTeacher_DeleteModal}
                        onHide={this.handleDelete}
                        teacherFormSubmission={this.teacherFormSubmission}
                        data={this.state.selectedTeacher}
                        toggleModal={this.handleDelete}
                    />
                ) : null}

                {/* Teacher Disable Modal */}
                {this.state.showTeacher_DisableModal ? (
                    <UserDisableModal
                        show={this.state.showTeacher_DisableModal}
                        onHide={this.handleDisable}
                        toggleModal={this.handleDisable}
                        formSubmission={this.teacherFormSubmission}
                        url={`${this.url}/hod/teacher/`}
                        data={this.state.selectedTeacher}
                        field="teacher_ids"
                        type="Teacher"
                        token="Authorization"
                    />
                ) : (
                    ""
                )}

                {/* Teacher Enable Modal */}
                {this.state.showTeacher_EnableModal ? (
                    <UserEnableModal
                        show={this.state.showTeacher_EnableModal}
                        onHide={this.handleEnable}
                        toggleModal={this.handleEnable}
                        formSubmission={this.teacherFormSubmission}
                        url={`${this.url}/hod/teacher/`}
                        data={this.state.selectedTeacher}
                        field="teacher_ids"
                        type="Teacher"
                        token="Authorization"
                    />
                ) : (
                    ""
                )}

                {/* Student create modal */}
                {this.state.showStudentModal ? (
                    <AddStudentModal
                        show={this.state.showStudentModal}
                        onHide={this.handleAdd}
                        studentFormSubmission={this.studentFormSubmission}
                    />
                ) : null}

                {/* Student Delete Modal */}
                {this.state.showStudent_DeleteModal ? (
                    <UserDeleteModal
                        show={this.state.showStudent_DeleteModal}
                        onHide={this.handleDelete}
                        toggleModal={this.handleDelete}
                        formSubmission={this.studentFormSubmission}
                        url={`${this.url}/hod/create/student/`}
                        data={this.state.selectedStudent}
                        field="student_ids"
                        type="Student"
                        token="Authorization"
                    />
                ) : (
                    ""
                )}

                {/* Student Disable Modal */}
                {this.state.showStudent_DisableModal ? (
                    <UserDisableModal
                        show={this.state.showStudent_DisableModal}
                        onHide={this.handleDisable}
                        toggleModal={this.handleDisable}
                        formSubmission={this.studentFormSubmission}
                        url={`${this.url}/hod/create/student/`}
                        data={this.state.selectedStudent}
                        field="student_ids"
                        type="Student"
                        token="Authorization"
                    />
                ) : (
                    ""
                )}

                {/* Student Enable Modal */}
                {this.state.showStudent_EnableModal ? (
                    <UserEnableModal
                        show={this.state.showStudent_EnableModal}
                        onHide={this.handleEnable}
                        toggleModal={this.handleEnable}
                        formSubmission={this.studentFormSubmission}
                        url={`${this.url}/hod/create/student/`}
                        data={this.state.selectedStudent}
                        field="student_ids"
                        type="Student"
                        token="Authorization"
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
                                        <li className="breadcrumb-item active">
                                            {this.state.activeTab === "teacher"
                                                ? "Teacher"
                                                : "Student"}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6 d-flex justify-content-end">
                                <button
                                    className="btn btn-primary btn-sm shadow-none mr-1"
                                    onClick={this.handleAdd}
                                >
                                    Add New
                                </button>
                                <button
                                    className="btn btn-primary btn-sm shadow-none mr-1"
                                    onClick={this.handleDelete}
                                >
                                    Delete
                                </button>
                                <button
                                    className="btn btn-primary btn-sm shadow-none mr-1"
                                    onClick={this.handleEnable}
                                >
                                    Enable
                                </button>
                                <button
                                    className="btn btn-primary btn-sm shadow-none mr-1"
                                    onClick={this.handleDisable}
                                >
                                    Disable
                                </button>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        variant="primary"
                                        id="dropdown-basic"
                                        className="btn-sm shadow-none"
                                    >
                                        Notify
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item>
                                            Notify All
                                        </Dropdown.Item>
                                        <div className="dropdown-divider"></div>
                                        <Dropdown.Item>
                                            Notify Selected
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        <Tabs
                            activeKey={
                                !this.props.location.hash
                                    ? "teacher"
                                    : this.props.location.hash.substring(1)
                            }
                            id="uncontrolled-tab-example"
                            onSelect={this.handleSelect}
                        >
                            <Tab eventKey="teacher" title="Teacher">
                                <div className="card shadow-sm">
                                    <TeacherTable
                                        teacherItems={this.state.teacherItems}
                                        path="hod"
                                        handleTeacherId={this.handleTeacherId}
                                    />
                                    <div className="card-body p-3">
                                        {this.state.totalTeacherCount >
                                        paginationCount ? (
                                            <Paginations
                                                activePage={
                                                    this.state.activeTeacherPage
                                                }
                                                totalItemsCount={
                                                    this.state.totalTeacherCount
                                                }
                                                onChange={this.handleTeacherPageChange.bind(
                                                    this
                                                )}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </Tab>

                            <Tab eventKey="student" title="Student">
                                <div className="card shadow-sm">
                                    <StudentTable
                                        studentItems={this.state.studentItems}
                                        path="hod"
                                        group={true}
                                        handleStudentId={this.handleStudentId}
                                    />
                                    <div className="card-body p-3">
                                        {this.state.totalStudentCount >
                                        paginationCount ? (
                                            <Paginations
                                                activePage={
                                                    this.state.activeStudentPage
                                                }
                                                totalItemsCount={
                                                    this.state.totalStudentCount
                                                }
                                                onChange={this.handleStudentPageChange.bind(
                                                    this
                                                )}
                                            />
                                        ) : null}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default HODTeacherStudentList;
