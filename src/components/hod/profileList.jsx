import React, { Component, Fragment } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import userimage from "../../assets/user.png";
import { Tabs, Tab, Dropdown, Modal, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";

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
                    });
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
                {...this.props}
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
                        <h5>Existing email</h5>
                        {this.state.errorMsg.map((email, index)=>{
                            return(
                                <p className="small mb-2" key={index}>{email}</p>
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
                                        <label htmlFor={`firstName${index}`}>
                                            {`Student email ${index + 1}`}
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control borders"
                                            id={`firstName${index}`}
                                            name="firstName"
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
                                            class="btn-group"
                                            role="group"
                                            aria-label="Basic example"
                                        >
                                            {index !== 0 ? (
                                                <button
                                                    type="button"
                                                    class="btn btn-secondary"
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
                                                class="btn btn-secondary"
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
                    <pre>{JSON.stringify(this.state.email, null, 2)}</pre>
                </Modal.Body>
            </Modal>
        );
    }
}

class AddTeacherModal extends Component {
    constructor() {
        super();
        this.state = {
            subjectName: "",
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
        };
    }

    handleSubmit = () => {};

    render() {
        return (
            <Modal
                {...this.props}
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
                            <label htmlFor="subject">Subject name</label>
                            <input
                                type="text"
                                name="subject"
                                id="subject"
                                className="form-control borders"
                                onChange={this.handleSubject}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary btn-sm btn-block">
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
                                Create Subject
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
            showSideNav: false,
            activeTab: "teacher",
            showStudentModal: false,
            showTeacherModal: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    handleSelect = (key) => {
        this.setState({ activeTab: key });
    };

    componentDidMount = () => {
        document.title = "HOD Profile List | IQLabs";
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

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="profiles"
                />

                {/* Add Student modal */}
                <AddStudentModal
                    show={this.state.showStudentModal}
                    onHide={this.handleProfileAdding}
                />

                {/* Add Teacher modal */}
                <AddTeacherModal
                    show={this.state.showTeacherModal}
                    onHide={this.handleProfileAdding}
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-end mb-4">
                            <form>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    className="form-control mb-md-0 mb-2"
                                    placeholder="Search"
                                />
                            </form>
                            <button className="btn btn-primary-invert mx-md-3 mx-0 ml-2 ml-md-0 mb-md-0 mb-2">
                                Filter <i className="fas fa-filter ml-1"></i>
                            </button>
                            <button
                                className="btn btn-primary mr-md-2 mr-1"
                                onClick={this.handleProfileAdding}
                            >
                                Add New
                            </button>
                            <button className="btn btn-primary mr-md-2 mr-1">
                                Delete
                            </button>
                            <button className="btn btn-primary mr-md-2 mr-1">
                                Enable
                            </button>
                            <button className="btn btn-primary mr-md-2 mr-1">
                                Disable
                            </button>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="primary"
                                    id="dropdown-basic"
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
                            activeKey={this.state.activeTab}
                            id="uncontrolled-tab-example"
                            onSelect={this.handleSelect}
                        >
                            <Tab eventKey="teacher" title="Teacher">
                                <div className="card shadow-sm">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="primary-text">
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">
                                                        Category
                                                    </th>
                                                    <th scope="col">
                                                        Sub Category
                                                    </th>
                                                    <th scope="col">
                                                        Discipline
                                                    </th>
                                                    <th scope="col">
                                                        Board University
                                                    </th>
                                                    <th scope="col">
                                                        Handling subject
                                                    </th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">
                                                        <input
                                                            type="checkbox"
                                                            name="enable"
                                                        />
                                                    </td>
                                                    <td>001</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Jeevan
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/hod/teacher/001">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="student" title="Student">
                                <div className="card shadow-sm">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="primary-text">
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Contact</th>
                                                    <th scope="col">Groups</th>
                                                    <th scope="col">
                                                        Registered on
                                                    </th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">
                                                        <input
                                                            type="checkbox"
                                                            name="enable"
                                                        />
                                                    </td>
                                                    <td>001</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Student 1
                                                    </td>
                                                    <td>stu@acde.com</td>
                                                    <td>9876543210</td>
                                                    <td>A</td>
                                                    <td>01/02/2020</td>
                                                    <td>
                                                        <Link to="/hod/student/001">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileList;
