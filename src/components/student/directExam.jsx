import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class DirectExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            showModal: false,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterName = this.props.match.params.chapterName;
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

    componentDidMount = () => {
        document.title = `${this.chapterName} - Teacher | IQLabs`;
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject name" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        <div className="mb-4">
                            <h5 className="primary-text mb-0">
                                {this.chapterName}
                            </h5>
                        </div>

                        <div className="row mb-2">
                            <div className="col-md-3">
                                <h6 className="primary-text">TEST ANALYSIS</h6>
                            </div>
                            <div className="col-md-3">
                                <h6 className="primary-text">
                                    ATTEMPTS & PAPERS
                                </h6>
                            </div>
                        </div>

                        {/* Header configuration */}
                        <div className="row align-items-center mb-3">
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p>Group:</p>
                                    <p className="small">A</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p>Date:</p>
                                    <p className="small">12/12/2020</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p>Starts at:</p>
                                    <p className="small">10 AM</p>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div className="form-group">
                                    <p>Test Number:</p>
                                    <p className="small">1</p>
                                </div>
                            </div>
                        </div>

                        <div className="card light-bg shadow-sm">
                            <div className="container-fluid">
                                <div className="row justify-content-center">
                                    <div className="col-md-6">
                                        <div className="card secondary-bg">
                                            <div className="card-body d-flex justify-content-around">
                                                <p className="mb-2 mb-md-0">
                                                    Subject: Mathematics
                                                </p>
                                                <p className="mb-2 mb-md-0">
                                                    Level 10
                                                </p>
                                                <p className="mb-2 mb-md-0">
                                                    Duration: 120 min.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <button className="btn btn-primary btn-sm mr-2">
                                        Download Question
                                    </button>
                                    <button className="btn btn-primary btn-sm">
                                        Upload
                                    </button>
                                </div>

                                <div className="container">
                                    <div className="card">
                                        <div className="card-body secondary-bg text-white text-center">
                                            Your uploads will appear here
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

export default DirectExam;
