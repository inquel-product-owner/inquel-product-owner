import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Modal, Alert, Spinner } from "react-bootstrap";
import userimage from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";

class StudentAssignModal extends Component {
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

        fetch(`${url}/hod/create/subject/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                subject_name: this.state.subjectName,
                group_id: this.props.groupId,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts) {
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
            });
    };

    handleSubject = (event) => {
        this.setState({
            subjectName: event.target.value,
        });
    };

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
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
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="primary-text">
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center">
                                        <input type="checkbox" name="enable" />
                                    </td>
                                    <td>001</td>
                                    <td>Student 1</td>
                                    <td>Student1</td>
                                    <td>stu@acde.com</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary">
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
                        Assign
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}

class GroupStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showStudentModal: false,
            groupItem: [],
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    toggleStudentModal = () => {
        this.setState({
            showStudentModal: !this.state.showStudentModal,
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

        fetch(`${url}/hod/group/${this.props.match.params.groupId}`, {
            headers: headers,
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
    };

    render() {
        document.title =
            this.state.groupItem.length !== 0
                ? this.state.groupItem.group_name + " Student List| IQLabs"
                : "Group Student List | IQLabs";
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

                {/* Add Subject modal */}
                <StudentAssignModal
                    show={this.state.showStudentModal}
                    onHide={this.toggleStudentModal}
                    // groupId={this.props.match.params.groupId}
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Filter area */}
                        <div className="row align-items-center">
                            <div className="col-md-2">
                                <h5 className="primary-text">
                                    Students Profile
                                </h5>
                            </div>
                            <div className="col-md-10">
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
                                        Filter{" "}
                                        <i className="fas fa-filter ml-1"></i>
                                    </button>
                                    <button
                                        className="btn btn-primary mr-md-2 mr-1"
                                        onClick={this.toggleStudentModal}
                                    >
                                        Add New
                                    </button>
                                    <button className="btn btn-primary mr-md-2 mr-1">
                                        Remove
                                    </button>
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            variant="primary"
                                            id="dropdown-basic"
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

                        {/* Student list */}
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
                                            <th scope="col">Category</th>
                                            <th scope="col">Registered on</th>
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
                                            <td>Engineering</td>
                                            <td>01/02/2020</td>
                                            <td>
                                                <Link to="/hod/student/001">
                                                    <button className="btn btn-sm btn-primary">
                                                        View
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <input
                                                    type="checkbox"
                                                    name="enable"
                                                />
                                            </td>
                                            <td>002</td>
                                            <td>
                                                <img
                                                    src={userimage}
                                                    alt="User profile pic"
                                                    width="20"
                                                />{" "}
                                                Student 2
                                            </td>
                                            <td>stu@acde.com</td>
                                            <td>9876543210</td>
                                            <td>Engineering</td>
                                            <td>01/02/2020</td>
                                            <td>
                                                <Link to="/hod/student/002">
                                                    <button className="btn btn-sm btn-primary">
                                                        View
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center">
                                                <input
                                                    type="checkbox"
                                                    name="enable"
                                                />
                                            </td>
                                            <td>003</td>
                                            <td>
                                                <img
                                                    src={userimage}
                                                    alt="User profile pic"
                                                    width="20"
                                                />{" "}
                                                Student 3
                                            </td>
                                            <td>stu@acde.com</td>
                                            <td>9876543210</td>
                                            <td>Engineering</td>
                                            <td>01/02/2020</td>
                                            <td>
                                                <Link to="/hod/student/003">
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
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupStudents;
