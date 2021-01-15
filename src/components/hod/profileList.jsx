import React, { Component, Fragment } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Tabs, Tab, Dropdown, Modal, Spinner, Alert } from "react-bootstrap";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../../shared/loadingComponent";
import TeacherTable from "../table/teacherTable";
import StudentTable from "../table/studentTable";
import Paginations from "../../shared/pagination";

// Student add modal
class AddStudentModal extends Component {
    constructor() {
        super();
        this.state = {
            email: [""],
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
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts) {
                    this.setState({
                        successMsg: "Email added successfully!",
                        showSuccessAlert: true,
                        showLoader: false,
                        email: [""],
                    });
                    this.props.studentFormSubmission(true);
                    if (result.data.existing_email) {
                        if (result.data.existing_email.length !== 0) {
                            this.setState({
                                errorMsg: result.data.existing_email,
                                showErrorAlert: true,
                            });
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
                <Modal.Header closeButton></Modal.Header>
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
                        <h6>Existing email</h6>
                        {this.state.errorMsg.map((email, index) => {
                            return (
                                <p className="small mb-2" key={index}>
                                    {email}
                                </p>
                            );
                        })}
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

                    <form onSubmit={this.handleSubmit} autoComplete="off">
                        <div className="row align-items-end">
                            {this.state.email.map((inputField, index) => (
                                <Fragment key={index}>
                                    <div className="col-9 mb-2">
                                        <label htmlFor={`semail${index}`}>
                                            {`Student email ${index + 1}`}
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control borders"
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
                                    </div>
                                    <div className="col-2 mb-2">
                                        <div
                                            className="btn-group"
                                            role="group"
                                            aria-label="Basic example"
                                        >
                                            {index !== 0 ? (
                                                <button
                                                    type="button"
                                                    className="btn btn-secondary"
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
                                                className="btn btn-secondary"
                                                onClick={() =>
                                                    this.handleAddFields()
                                                }
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                </Fragment>
                            ))}
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-sm btn-block mt-2">
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
                        </div>
                    </form>
                </Modal.Body>
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
            errorMsg: "",
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

        fetch(`${url}/hod/create/teacher/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts) {
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
                    if (result.username) {
                        this.setState({
                            errorMsg: result.username[0],
                        });
                    }
                    if (result.password) {
                        this.setState({
                            errorMsg: result.password[0],
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

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
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

                    <form onSubmit={this.handleSubmit} autoComplete="off">
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
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control borders"
                                onChange={this.handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-block mt-2">
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
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

class ProfileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTeacherPage: 1,
            totalTeacherCount: 0,
            activeStudentPage: 1,
            totalStudentCount: 0,
            showSideNav: false,
            activeTab: "teacher",
            showStudentModal: false,
            showTeacherModal: false,
            teacherItems: [],
            studentItems: [],
            page_loading: true,
            is_teacherFormSubmited: false,
            is_studentFormSubmited: false,
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
                this.setState({
                    teacherItems: result.data.results,
                    totalTeacherCount: result.data.count,
                    page_loading: false,
                });
                console.log(result);
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
                this.setState({
                    studentItems: result.data.results,
                    totalStudentCount: result.data.count,
                    page_loading: false,
                });
                console.log(result);
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

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_teacherFormSubmited !==
                this.state.is_teacherFormSubmited &&
            this.state.is_teacherFormSubmited === true
        ) {
            this.loadTeacherData();
            this.setState({
                is_teacherFormSubmited: false,
            });
        }

        if (
            prevState.is_studentFormSubmited !==
                this.state.is_studentFormSubmited &&
            this.state.is_studentFormSubmited === true
        ) {
            this.loadStudentData();
            this.setState({
                is_studentFormSubmited: false,
            });
        }

        if (prevState.activeTeacherPage !== this.state.activeTeacherPage) {
            this.loadTeacherData();
            this.setState({
                page_loading: true,
            });
        }

        if (prevState.activeStudentPage !== this.state.activeStudentPage) {
            this.loadStudentData();
            this.setState({
                page_loading: true,
            });
        }
    };

    handleProfileAdding = () => {
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

    teacherFormSubmission = (is_teacherFormSubmited) => {
        if (is_teacherFormSubmited) {
            this.setState({
                is_teacherFormSubmited: true,
            });
        }
    };

    studentFormSubmission = (is_studentFormSubmited) => {
        if (is_studentFormSubmited) {
            this.setState({
                is_studentFormSubmited: true,
            });
        }
    };

    handleTeacherPageChange(pageNumber) {
        this.setState({ activeTeacherPage: pageNumber });
    }

    handleStudentPageChange(pageNumber) {
        this.setState({ activeStudentPage: pageNumber });
    }

    render() {
        document.title =
            this.state.activeTab === "teacher"
                ? "Teacher Profiles - HOD | IQLabs"
                : "Student Profiles - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={
                        this.state.activeTab === "teacher"
                            ? "Teacher Profiles"
                            : "Student Profiles"
                    }
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="profiles"
                />

                {/* Add Student modal */}
                <AddStudentModal
                    show={this.state.showStudentModal}
                    onHide={this.handleProfileAdding}
                    studentFormSubmission={this.studentFormSubmission}
                />

                {/* Add Teacher modal */}
                <AddTeacherModal
                    show={this.state.showTeacherModal}
                    onHide={this.handleProfileAdding}
                    teacherFormSubmission={this.teacherFormSubmission}
                />

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

                        <div className="d-flex flex-wrap justify-content-end mb-3">
                            <button
                                className="btn btn-primary btn-sm mr-1"
                                onClick={this.handleProfileAdding}
                            >
                                Add New
                            </button>
                            <button className="btn btn-primary btn-sm mr-1">
                                Delete
                            </button>
                            <button className="btn btn-primary btn-sm mr-1">
                                Enable
                            </button>
                            <button className="btn btn-primary btn-sm mr-1">
                                Disable
                            </button>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="primary"
                                    id="dropdown-basic"
                                    className="btn-sm"
                                >
                                    Notify
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Notify All</Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item>
                                        Notify Selected
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
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
                                        ref={this.gridRef}
                                        path="hod"
                                    />
                                    <div className="card-body p-3">
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
                                    </div>
                                </div>
                            </Tab>

                            <Tab eventKey="student" title="Student">
                                <div className="card shadow-sm">
                                    <StudentTable
                                        studentItems={this.state.studentItems}
                                        path="hod"
                                        group={true}
                                        ref={this.gridRef}
                                    />
                                    <div className="card-body p-3">
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

export default ProfileList;
