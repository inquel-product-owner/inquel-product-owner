import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Modal, Alert, Spinner } from "react-bootstrap";
import userimage from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";

class StudentAssignModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            studentId: [],
            studentItem: [],
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            isLoaded: false,
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

        fetch(`${url}/hod/group/${this.props.groupid}/assign/`, {
            headers: headers,
            method: "POST",
            body: JSON.stringify({
                student_ids: this.state.studentId,
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

    handleInputChange = (index, event) => {
        let values = [...this.state.studentId];
        if (event.target.checked) {
            values.push(event.target.value.toString());
            this.setState({
                studentId: values,
            });
        } else {
            values.splice(values.indexOf(event.target.value), 1);
            this.setState({
                studentId: values,
            });
        }
    };

    componentDidMount = () => {
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/hod/group/${this.props.groupid}/assign/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    studentItem: result.data,
                    isLoaded: true,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
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
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.isLoaded ? (
                                    this.state.studentItem.length !== 0 ? (
                                        this.state.studentItem.map(
                                            (list, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="text-center">
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                value={list.id}
                                                                onChange={(
                                                                    event
                                                                ) =>
                                                                    this.handleInputChange(
                                                                        index,
                                                                        event
                                                                    )
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            {list.full_name}
                                                        </td>
                                                        <td>{list.username}</td>
                                                        <td>{list.email}</td>
                                                    </tr>
                                                );
                                            }
                                        )
                                    ) : (
                                        <tr>
                                            <td>Data not available</td>
                                        </tr>
                                    )
                                ) : (
                                    <tr>
                                        <td>Loading...</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-primary"
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
            studentItem: [],
            isLoaded: false,
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

    dateConversion = (date) => {
        var newDate = new Date(date).toLocaleDateString();
        var datearray = newDate.split("/");
        return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
    };

    componentDidMount = () => {
        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        Promise.all([
            fetch(`${url}/hod/group/${this.props.match.params.groupId}`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
            fetch(
                `${url}/hod/group/${this.props.match.params.groupId}/student/`,
                {
                    headers: headers,
                    method: "GET",
                }
            ).then((res) => res.json()),
        ])
            .then((result) => {
                this.setState({
                    groupItem: result[0].data,
                    studentItem: result[1].data.results,
                    isLoaded: true,
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
                {this.state.showStudentModal ? (
                    <StudentAssignModal
                        show={this.state.showStudentModal}
                        onHide={this.toggleStudentModal}
                        groupid={this.props.match.params.groupId}
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
                                            <th scope="col">Name</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Registered on</th>
                                            <th scope="col">Status</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.isLoaded ? (
                                            this.state.studentItem.length !==
                                            0 ? (
                                                this.state.studentItem.map(
                                                    (list, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td className="text-center">
                                                                    <input
                                                                        type="checkbox"
                                                                        name="enable"
                                                                        value={
                                                                            list.id
                                                                        }
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <img
                                                                        src={
                                                                            list.profile_link !==
                                                                            null
                                                                                ? list.profile_link
                                                                                : userimage
                                                                        }
                                                                        alt="User profile pic"
                                                                        width="20"
                                                                    />{" "}
                                                                    {
                                                                        list.full_name
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        list.username
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {list.email}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        list.contact
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        list.category
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {this.dateConversion(
                                                                        list.date_joined
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    {list.is_active ? (
                                                                        <span className="text-success">
                                                                            Active
                                                                        </span>
                                                                    ) : (
                                                                        <span className="text-danger">
                                                                            Not
                                                                            active
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td>
                                                                    <Link
                                                                        to={`/hod/student/${list.id}`}
                                                                    >
                                                                        <button className="btn btn-sm btn-primary">
                                                                            View
                                                                        </button>
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )
                                            ) : (
                                                <tr>
                                                    <td>Data not available</td>
                                                </tr>
                                            )
                                        ) : (
                                            <tr>
                                                <td>Loading...</td>
                                            </tr>
                                        )}
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
