import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Card, Accordion } from "react-bootstrap";
import Select from "react-select";
import { Link } from "react-router-dom";

class Chapters extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
        };
        this.subjectId = this.props.match.params.subjectId;
        this.chapterId = this.props.match.params.chapterId;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Chapter - Teacher | IQLabs";
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

                        <div className="row align-items-center mb-3">
                            <div className="col-md-4">
                                <Select
                                    className="basic-single"
                                    placeholder="Select chapter"
                                    isSearchable={true}
                                    name="subcategory"
                                    options={[
                                        {
                                            label: "Chapter - 01",
                                            value: "chapter - 01",
                                        },
                                        {
                                            label: "Chapter - 02",
                                            value: "chapter - 02",
                                        },
                                    ]}
                                    required
                                />
                            </div>
                            <div className="col-md-8">
                                <div className="d-flex flex-wrap justify-content-end">
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Publish
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Download template
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Upload template
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Course details */}
                        <div className="card shadow-sm mb-3">
                            <div className="card-header secondary-bg primary-text font-weight-bold">
                                <div className="row">
                                    <div className="col-md-4 mb-2 mb-md-0">
                                        Topic structure
                                    </div>
                                    <div className="col-1 mb-2 mb-md-0">
                                        Weightage
                                    </div>
                                    <div className="col-1 mb-2 mb-md-0">
                                        Notes
                                    </div>
                                    <div className="col-1 mb-2 mb-md-0">
                                        Summary
                                    </div>
                                    <div className="col-1 mb-2 mb-md-0">
                                        Match
                                    </div>
                                    <div className="col-1 mb-2 mb-md-0">
                                        Flashcards
                                    </div>
                                    <div className="col-1 mb-2 mb-md-0">
                                        Type 1 Q
                                    </div>
                                    <div className="col-1 mb-2 mb-md-0">
                                        Type 2 Q
                                    </div>
                                    <div className="col-1 mb-2 mb-md-0">
                                        Next topic
                                    </div>
                                </div>
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
                                                <div className="col-md-4 mb-2 mb-md-0">
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
                                                <div className="col-md-8">
                                                    <div className="row align-items-center">
                                                        <div className="col-2 mb-2 mb-md-0">
                                                            12
                                                        </div>
                                                        <div className="col-1 mb-2 mb-md-0"></div>
                                                        <div className="col-2 mb-2 mb-md-0">
                                                            <Link
                                                                to={`/teacher/subject/${this.subjectId}/chapter-01/summary`}
                                                            >
                                                                <button className="btn btn-sm btn-primary">
                                                                    <i className="fas fa-file-medical fa-sm"></i>
                                                                </button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Accordion.Toggle>

                                        <Accordion.Collapse eventKey="0">
                                            <Card className="pl-5">
                                                <Card.Header className="bg-light my-2">
                                                    <div className="row">
                                                        <div className="col-md-4 mb-2 mb-md-0">
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

                                                        <div className="col-md-8">
                                                            <div className="row align-items-center">
                                                                <div className="col-1 mb-2 mb-md-0"></div>
                                                                <div className="col-2 mb-2 mb-md-0">
                                                                    <Link
                                                                        to={`/teacher/subject/${this.subjectId}/chapter-01/arithmatic/notes`}
                                                                    >
                                                                        <button className="btn btn-sm btn-primary">
                                                                            <i className="fas fa-file-upload fa-sm"></i>
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-1 mb-2 mb-md-0"></div>
                                                                <div className="col-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            Add
                                                                            +
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            Add
                                                                            +
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            Add
                                                                            +
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-1 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            Add
                                                                            +
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-1 mb-2 mb-md-0">
                                                                    2.4
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Card.Header>

                                                <Card.Header className="bg-light">
                                                    <div className="row">
                                                        <div className="col-md-4 mb-2 mb-md-0">
                                                            <div className="row">
                                                                <div className="col-md-2 col-3">
                                                                    1.1.1
                                                                </div>
                                                                <div className="col-md-10 col-9">
                                                                    Nth term of
                                                                    an AP
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="col-md-8">
                                                            <div className="row align-items-center">
                                                                <div className="col-1 mb-2 mb-md-0"></div>
                                                                <div className="col-2 mb-2 mb-md-0">
                                                                    <Link
                                                                        to={`/teacher/subject/${this.subjectId}/chapter-01/arithmatic/notes`}
                                                                    >
                                                                        <button className="btn btn-sm btn-primary">
                                                                            <i className="fas fa-file-upload fa-sm"></i>
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-1 mb-2 mb-md-0"></div>
                                                                <div className="col-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            Add
                                                                            +
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            Add
                                                                            +
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-2 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            Add
                                                                            +
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-1 mb-2 mb-md-0">
                                                                    <Link to="">
                                                                        <button className="btn btn-primary btn-sm">
                                                                            Add
                                                                            +
                                                                        </button>
                                                                    </Link>
                                                                </div>
                                                                <div className="col-1 mb-2 mb-md-0">
                                                                    2.4
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

                        <div
                            className="card shadow-sm mb-3"
                            style={{ backgroundColor: "#ffa88b" }}
                        >
                            <div className="card-body">
                                <p className="small text-center font-weight-bold mb-0">
                                    <Link to="" className="text-dark">
                                        Cycle Test - 01
                                    </Link>
                                </p>
                            </div>
                        </div>

                        <div
                            className="card shadow-sm"
                            style={{ backgroundColor: "#ffa88b" }}
                        >
                            <div className="card-body">
                                <p className="small text-center font-weight-bold mb-0">
                                    <Link to="" className="text-dark">
                                        Quiz
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chapters;
