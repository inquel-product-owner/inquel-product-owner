import React, { Component } from "react";
import { Dropdown, Modal, Alert, Spinner } from "react-bootstrap";
import Header from "../navbar";
import SideNav from "../sidenav";
import { Link } from "react-router-dom";
import { baseUrl, hodUrl } from "../../../shared/baseUrl.js";
import { paginationCount } from "../../../shared/globalValues.js";
import Loading from "../../sharedComponents/loader";
import Paginations from "../../sharedComponents/pagination";
import StudentTable from "../../table/student";
import AlertBox from "../../sharedComponents/alert";
import { UserRemoveModal } from "../../sharedComponents/userManagementModal";
import { connect } from "react-redux";
import { waterMark } from "../../sharedComponents/watermark";

const mapStateToProps = (state) => ({
    data: state.user.profile,
});

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
                    this.props.formSubmission();
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
                if (result.data) {
                    this.setState({
                        studentItem: result.data,
                    });
                }
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
                <Modal.Header closeButton>Assign Student</Modal.Header>
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
                        className="btn btn-primary btn-sm shadow-none"
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

class HODGroupStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showStudentModal: false,
            showStudent_RemoveModal: false,
            groupItem: [],
            studentItem: [],
            selectedStudent: [],
            activeStudentPage: 1,
            totalStudentCount: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
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
            `${this.url}/hod/group/${this.groupId}/student/?page=${this.state.activeStudentPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        studentItem: result.data.results,
                        totalStudentCount: result.data.count,
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
        fetch(`${this.url}/hod/group/${this.groupId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        groupItem: result.data,
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

        this.loadStudentData();
    };

    handleRemove = () => {
        this.setState({
            showStudent_RemoveModal: !this.state.showStudent_RemoveModal,
        });
    };

    // Gets Student ID from the Student table
    handleStudentId = (data) => {
        let value = [];
        const studentItems = this.state.studentItem;
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

    formSubmission = () => {
        setTimeout(() => {
            this.setState({
                showStudentModal: false,
                showStudent_RemoveModal: false,
            });
        }, 1000);
        this.loadStudentData();
    };

    handleStudentPageChange(pageNumber) {
        this.setState(
            { activeStudentPage: pageNumber, page_loading: true },
            () => {
                this.loadStudentData();
            }
        );
    }

    render() {
        document.title = "Group Students - HOD | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={this.state.groupItem.group_name}
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

                {/* Student assign modal */}
                {this.state.showStudentModal ? (
                    <StudentAssignModal
                        show={this.state.showStudentModal}
                        onHide={this.toggleStudentModal}
                        groupId={this.groupId}
                        formSubmission={this.formSubmission}
                    />
                ) : (
                    ""
                )}

                {/* Student Remoing Modal */}
                {this.state.showStudent_RemoveModal ? (
                    <UserRemoveModal
                        show={this.state.showStudent_RemoveModal}
                        onHide={this.handleRemove}
                        toggleModal={this.handleRemove}
                        formSubmission={this.formSubmission}
                        url={`${this.url}/hod/group/${this.groupId}/student/`}
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
                    style={waterMark(this.props.data)}
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
                            <div className="col-md-6">
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
                                                onClick={
                                                    this.props.history.goBack
                                                }
                                            >
                                                Group
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Student
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6">
                                <div className="d-flex flex-wrap justify-content-end mb-4">
                                    <button
                                        className="btn btn-primary btn-sm shadow-none mr-1"
                                        onClick={this.toggleStudentModal}
                                    >
                                        Add New
                                    </button>
                                    <button
                                        className="btn btn-primary btn-sm shadow-none mr-1"
                                        onClick={this.handleRemove}
                                    >
                                        Remove
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
                        </div>

                        {/* Student list */}
                        <div className="card shadow-sm">
                            <StudentTable
                                studentItems={this.state.studentItem}
                                path={`hod/group/${this.groupId}`}
                                category={true}
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
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(HODGroupStudents);
