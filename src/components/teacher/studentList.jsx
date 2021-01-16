import React, { Component, Fragment } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Dropdown, Modal, Spinner, Alert } from "react-bootstrap";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import Loading from "../sharedComponents/loader";
import StudentTable from "../table/studentTable";
import Paginations from "../sharedComponents/pagination";

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
        var url = baseUrl + teacherUrl;
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

        fetch(`${url}/teacher/create/student/`, {
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
                    this.props.formSubmission(true);
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

class StudentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStudentPage: 1,
            totalStudentCount: 0,
            showSideNav: false,
            showModal: false,
            activeTab: "teacher",
            studentItems: [],
            page_loading: true,
            is_formSubmited: false,
        };
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

    loadStudentData = () => {
        fetch(
            `${this.url}/teacher/student/?page=${this.state.activeStudentPage}`,
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
        this.loadStudentData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_formSubmited !== this.state.is_formSubmited &&
            this.state.is_formSubmited === true
        ) {
            this.loadStudentData();
            this.setState({
                is_formSubmited: false,
            });
        }

        if (prevState.activeStudentPage !== this.state.activeStudentPage) {
            this.loadStudentData();
            this.setState({
                page_loading: true,
            });
        }
    };

    formSubmission = (is_formSubmited) => {
        if (is_formSubmited) {
            this.setState({
                is_formSubmited: true,
            });
        }
    };

    handleStudentPageChange(pageNumber) {
        this.setState({ activeStudentPage: pageNumber });
    }

    render() {
        document.title = "Student Profiles - Teacher | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.activeTab === "Student Profiles"}
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="profiles"
                />

                {/* Add Student modal */}
                <AddStudentModal
                    show={this.state.showModal}
                    onHide={this.toggleModal}
                    formSubmission={this.formSubmission}
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

                        {/* Filter area */}
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <h5 className="primary-text">
                                    Students Profile
                                </h5>
                            </div>
                            <div className="col-md-10">
                                <div className="d-flex flex-wrap justify-content-end mb-4">
                                    <button
                                        className="btn btn-primary btn-sm mr-1"
                                        onClick={this.toggleModal}
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
                        </div>

                        <div className="card shadow-sm">
                            <StudentTable
                                studentItems={this.state.studentItems}
                                path="teacher"
                                group={true}
                                ref={this.gridRef}
                            />
                            <div className="card-body p-3">
                                <Paginations
                                    activePage={this.state.activeStudentPage}
                                    totalItemsCount={
                                        this.state.totalStudentCount
                                    }
                                    onChange={this.handleStudentPageChange.bind(
                                        this
                                    )}
                                />
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

export default StudentList;
