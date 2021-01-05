import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal, Alert, Spinner } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import courseimg from "../../assets/code.jpg";
import { baseUrl, hodUrl } from "../../shared/baseUrl.js";

class SubjectModal extends Component {
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

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectModalShow: false,
            groupItem: [],
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    addSubjectModal = () => {
        this.setState({
            subjectModalShow: !this.state.subjectModalShow,
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
                ? this.state.groupItem.group_name + " | IQLabs"
                : "Groups | IQLabs";
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
                <SubjectModal
                    show={this.state.subjectModalShow}
                    onHide={this.addSubjectModal}
                    groupId={this.props.match.params.groupId}
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <div
                            className="card"
                            style={{ backgroundColor: "transparent" }}
                        >
                            <div
                                className="card-header pb-0"
                                style={{ backgroundColor: "transparent" }}
                            >
                                <div className="row align-items-center">
                                    <div className="col-3">
                                        <h4>
                                            {this.state.groupItem.group_name}
                                        </h4>
                                    </div>
                                    <div className="col-9 text-right">
                                        <Link
                                            to={`/hod/group/${this.props.match.params.groupId}/student`}
                                        >
                                            <button className="btn btn-primary btn-sm mr-2">
                                                Student
                                            </button>
                                        </Link>
                                        <Link
                                            to={`/hod/group/${this.props.match.params.groupId}/teacher`}
                                        >
                                            <button className="btn btn-primary btn-sm mr-2">
                                                Teacher
                                            </button>
                                        </Link>
                                        <Link
                                            to={`/hod/group/${this.props.match.params.groupId}/details`}
                                        >
                                            <button className="btn btn-primary btn-sm">
                                                Configuration
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card shadow-sm mb-4">
                                    <div className="card-header">
                                        <div className="row align-items-center">
                                            <div className="col-md-3">
                                                <h5>Subjects</h5>
                                            </div>
                                            <div className="col-md-9 text-right">
                                                <button
                                                    className="btn btn-primary btn-sm mr-2"
                                                    onClick={
                                                        this.addSubjectModal
                                                    }
                                                >
                                                    Add new
                                                </button>
                                                <button className="btn btn-primary btn-sm mr-2">
                                                    Delete
                                                </button>
                                                <button className="btn btn-primary btn-sm mr-2">
                                                    Enable
                                                </button>
                                                <button className="btn btn-primary btn-sm">
                                                    Disable
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row justify-content-center">
                                            <div className="col-md-11">
                                                <div className="row">
                                                    {this.state.groupItem
                                                        .length !== 0 ? (
                                                        this.state.groupItem.subjects.map(
                                                            (list, index) => {
                                                                return (
                                                                    <div
                                                                        className="col-md-4 mb-3"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <Link
                                                                            to={`/hod/subject/${list.id}/review`}
                                                                            style={{
                                                                                textDecoration:
                                                                                    "none",
                                                                            }}
                                                                        >
                                                                            <div
                                                                                className="card"
                                                                                style={{
                                                                                    cursor:
                                                                                        "pointer",
                                                                                }}
                                                                            >
                                                                                <img
                                                                                    src={
                                                                                        courseimg
                                                                                    }
                                                                                    className="card-img-top"
                                                                                    alt={
                                                                                        list.subject_name
                                                                                    }
                                                                                />
                                                                                <div className="card-body primary-bg text-white text-center p-2">
                                                                                    {
                                                                                        list.subject_name
                                                                                    }
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <div className="col-md-6">
                                                            Data not available
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Group;
