import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Card, Accordion } from "react-bootstrap";

class CourseScorecard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Course" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} />

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

                        <div className="row align-items-center mb-4">
                            <div className="col-md-6">
                                <h5 className="primary-text">
                                    Course - 10th Mathematics
                                </h5>
                            </div>
                            <div className="col-md-6 d-flex justify-content-start justify-content-md-end">
                                <button className="btn btn-primary mr-2">
                                    My
                                </button>
                                <button className="btn btn-primary mr-2">
                                    Personal
                                </button>
                                <button className="btn btn-primary">
                                    Simulation
                                </button>
                            </div>
                        </div>

                        {/* Course details */}
                        <div className="card border-primary">
                            <div className="card-header secondary-bg primary-text font-weight-bold">
                                <div className="row">
                                    <div className="col-md-5 mb-2 mb-md-0">
                                        Chapters
                                    </div>
                                    <div className="col-md-7">
                                        <div className="row">
                                            <div className="col-3 mb-2 mb-md-0">
                                                Weightage
                                            </div>
                                            <div className="col-3 mb-2 mb-md-0">
                                                Summary
                                            </div>
                                            <div className="col-3 mb-2 mb-md-0">
                                                Notes
                                            </div>
                                            <div className="col-3 mb-2 mb-md-0">
                                                Next topic
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="card border-primary mb-3">
                                    <div className="card-header font-weight-bold">
                                        Unit 01 -{" "}
                                    </div>
                                    <div className="card-body">
                                        <Accordion defaultActiveKey="0">
                                            <Card>
                                                <Accordion.Toggle
                                                    as={Card.Header}
                                                    eventKey="0"
                                                    className="secondary-bg"
                                                >
                                                    <div className="row align-items-center">
                                                        <div className="col-md-5 mb-2 mb-md-0">
                                                            <div className="row">
                                                                <div className="col-2">
                                                                    <span>
                                                                        <i className="fas fa-plus-circle"></i>
                                                                    </span>
                                                                </div>
                                                                <div className="col-2">
                                                                    1
                                                                </div>
                                                                <div className="col-8">
                                                                    Chapter - 01
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-7">
                                                            <div className="row align-items-center">
                                                                <div className="col-3 mb-2 mb-md-0">
                                                                    12
                                                                </div>
                                                                <div className="col-3 mb-2 mb-md-0">
                                                                    <button className="btn btn-sm btn-light">
                                                                        <i className="fas fa-eye fa-sm"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="col-3 mb-2 mb-md-0">
                                                                    <button className="btn btn-sm btn-light">
                                                                        <i className="fas fa-eye fa-sm"></i>
                                                                    </button>
                                                                </div>
                                                                <div className="col-3 mb-2 mb-md-0">
                                                                    <div className="row">
                                                                        <div className="col-6"></div>
                                                                        <div className="col-6 text-right">
                                                                            <span className="text-success">
                                                                                <i className="fas fa-check-circle"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card className="pl-5">
                                                        <Card.Header className="bg-light my-2">
                                                            <div className="row">
                                                                <div className="col-md-5 mb-2 mb-md-0">
                                                                    <div className="row">
                                                                        <div className="col-md-2 col-3">
                                                                            1.1
                                                                        </div>
                                                                        <div className="col-md-10 col-9">
                                                                            Arithmatic
                                                                            progression
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-7">
                                                                    <div className="row justify-content-end">
                                                                        <div className="col-md-3 col-6 mb-2 mb-md-0">
                                                                            <div className="row">
                                                                                <div className="col-6">
                                                                                    2.4
                                                                                </div>
                                                                                <div className="col-6 text-right">
                                                                                    <span className="text-muted">
                                                                                        <i className="fas fa-check-circle"></i>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Header>
                                                        <Card.Header className="bg-light">
                                                            <div className="row">
                                                                <div className="col-md-5 mb-2 mb-md-0">
                                                                    <div className="row">
                                                                        <div className="col-md-2 col-3">
                                                                            1.1.1
                                                                        </div>
                                                                        <div className="col-md-10 col-9">
                                                                            Nth
                                                                            term
                                                                            of
                                                                            an
                                                                            AP
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-7">
                                                                    <div className="row justify-content-end">
                                                                        <div className="col-md-3 col-6 mb-2 mb-md-0">
                                                                            <div className="row">
                                                                                <div className="col-6">
                                                                                    1.1.2
                                                                                </div>
                                                                                <div className="col-6 text-right">
                                                                                    <span className="text-muted">
                                                                                        <i className="fas fa-check-circle"></i>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Header>
                                                    </Card>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </div>
                                </div>

                                <div className="card border-primary">
                                    <div className="card-body">
                                        <div className="card">
                                            <div className="card-header secondary-bg">
                                                <div className="row align-items-center">
                                                    <div className="col-6">
                                                        <p className="small mb-0">
                                                            Semester Exams
                                                        </p>
                                                    </div>
                                                    <div className="col-6 text-right">
                                                        <button className="btn btn-primary btn-sm">
                                                            Star
                                                        </button>
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

export default CourseScorecard;
