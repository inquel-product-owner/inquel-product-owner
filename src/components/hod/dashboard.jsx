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

class Dashboard extends Component {
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
                <Header name="Dashboard" togglenav={this.toggleSideNav} />

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
                        {/* Welcome */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body text-center p-4">
                                <h3 className="primary-text mb-0">
                                    WELCOME BACK
                                </h3>
                            </div>
                        </div>

                        {/* Group card */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-6">
                                        <h4>Groups</h4>
                                    </div>
                                    <div className="col-6 text-right">
                                        <Link to="/hod/groups/configuration">
                                            <button className="btn btn-primary btn-sm mr-2">
                                                Add new
                                            </button>
                                        </Link>
                                        <button className="btn btn-primary btn-sm">
                                            Delete
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
                                                    to="/hod/group/001"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Groups"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            A
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod/group/002"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Groups"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            B
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod/group/003"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Groups"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            C
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subject card */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h4>Subjects</h4>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <button
                                            className="btn btn-primary btn-sm mr-2"
                                            onClick={this.addSubjectModal}
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
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Subjects"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            CBSE 10th Standard
                                                            Chemistry
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod/subject/001/review"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Subjects"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            CBSE 9th Standard
                                                            Chemistry
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod/subject/001/review"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Subjects"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            CBSE 8th Standard
                                                            Chemistry
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Subject card */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h4>Course</h4>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <button className="btn btn-primary btn-sm mr-2">
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
                                                    to="/hod"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Course"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            Course 01
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Course"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            Course 02
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                            <div className="col-md-4 mb-3">
                                                <Link
                                                    to="/hod"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="card"
                                                        style={{
                                                            cursor: "pointer",
                                                        }}
                                                    >
                                                        <img
                                                            src={courseimg}
                                                            className="card-img-top"
                                                            alt="Course"
                                                        />
                                                        <div className="card-body primary-bg text-white text-center p-2">
                                                            Course 03
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
        );
    }
}

export default Dashboard;
