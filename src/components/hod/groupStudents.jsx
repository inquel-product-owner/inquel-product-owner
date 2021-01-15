import React, { Component } from "react";
import { Dropdown, Modal, Alert, Spinner } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";
import Loading from "../../shared/loadingComponent";
import Paginations from "../../shared/pagination";
import StudentTable from "../table/studentTable";

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

        fetch(`${url}/hod/group/${this.props.groupId}/assign/student/`, {
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

        fetch(`${url}/hod/group/${this.props.groupId}/assign/student/`, {
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
                show={this.props.show}
                onHide={this.props.onHide}
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
            activeStudentPage: 1,
            totalStudentCount: 0,
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

    toggleStudentModal = () => {
        this.setState({
            showStudentModal: !this.state.showStudentModal,
        });
    };

    loadStudentData = () => {
        fetch(
            `${this.url}/hod/group/${this.props.match.params.groupId}/student/?page=${this.state.activeStudentPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    studentItem: result.data.results,
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
        fetch(`${this.url}/hod/group/${this.props.match.params.groupId}`, {
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
        document.title =
            this.state.groupItem.length !== 0
                ? this.state.groupItem.group_name + " Student List - HOD | IQLabs"
                : "Group Student List - HOD | IQLabs";
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
                        groupId={this.props.match.params.groupId}
                        formSubmission={this.formSubmission}
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
                                        onClick={this.toggleStudentModal}
                                    >
                                        Add New
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Remove
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

                        {/* Student list */}
                        <div className="card shadow-sm">
                            <StudentTable
                                studentItems={this.state.studentItem}
                                path="hod"
                                category={true}
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

export default GroupStudents;
