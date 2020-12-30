import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";
import courseimg from "../../assets/code.jpg";

class SubjectModal extends Component {
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
                    <div className="form-group">
                        <label htmlFor="subject">Subject name</label>
                        <input
                            type="text"
                            name="subject"
                            id="subject"
                            className="form-control borders"
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-sm btn-block">
                            Create Subject
                        </button>
                    </div>
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

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Group A" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} />

                {/* Add Subject modal */}
                <SubjectModal
                    show={this.state.subjectModalShow}
                    onHide={this.addSubjectModal}
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
                                        <h4>Group A</h4>
                                    </div>
                                    <div className="col-9 text-right">
                                        <Link to="/hod/group/001/student">
                                            <button className="btn btn-primary btn-sm mr-2">
                                                Student
                                            </button>
                                        </Link>
                                        <Link to="/hod/group/001/teacher">
                                            <button className="btn btn-primary btn-sm mr-2">
                                                Teacher
                                            </button>
                                        </Link>
                                        <Link to="/hod/group/001/details">
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
                                                    <div className="col-md-4 mb-3">
                                                        <Link
                                                            to="/hod/subject/001/review"
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
                                                                    alt="Groups"
                                                                />
                                                                <div className="card-body primary-bg text-white p-2">
                                                                    Chemistry
                                                                    10th
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-4 mb-3">
                                                        <Link
                                                            to="/hod/subject/001/review"
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
                                                                    alt="Groups"
                                                                />
                                                                <div className="card-body primary-bg text-white p-2">
                                                                    Physics 10th
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                    <div className="col-md-4 mb-3">
                                                        <Link
                                                            to="/hod/subject/001/review"
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
                                                                    alt="Groups"
                                                                />
                                                                <div className="card-body primary-bg text-white p-2">
                                                                    Maths 10th
                                                                </div>
                                                            </div>
                                                        </Link>
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
            </div>
        );
    }
}

export default Group;
