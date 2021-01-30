import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import Select from "react-select";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";

class EvaluateStudents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            student_id: "",
            student_list: [],
            page_loading: true,
        };
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

    loadStudentData = () => {};

    componentDidMount = () => {
        document.title = `Direct test evaluation - Teacher | IQLabs`;

        this.setState(
            {
                student_id: this.props.match.params.studentId,
            },
            () => {
                this.loadStudentData();
            }
        );

        fetch(`${this.url}/teacher/student/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    student_list: result.data.results,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.match.params.studentId !== this.state.student_id) {
            this.setState(
                {
                    student_id: this.props.match.params.studentId,
                },
                () => {
                    this.loadStudentData();
                }
            );
        }
    };

    handleSelect = (event) => {
        this.props.history.push({
            pathname: `/teacher/student/${event.value}/direct-test`,
        });
        this.setState(
            {
                chapterName: event.value,
            },
            () => {
                this.loadStudentData();
            }
        );
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

                        <div className="card shadow-sm mb-3">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-2">
                                        <h5>Test Analysis</h5>
                                    </div>
                                    <div className="col-md-6">
                                        <h5>Attempts and Papers</h5>
                                    </div>
                                    <div className="col-md-4 text-right">
                                        <button className="btn btn-primary btn-sm">
                                            Publish
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="row align-items-end">
                                    <div className="col-md-9">
                                        <div className="row">
                                            <div className="col-md-3">
                                                <label htmlFor="group">
                                                    Group:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control shadow-sm"
                                                    id="group"
                                                    placeholder="Group Name"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="test_number">
                                                    Test Number:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-0 shadow-sm"
                                                    id="test_number"
                                                    placeholder="Test Number"
                                                />
                                            </div>
                                            <div className="col-md-3">
                                                <label htmlFor="chapter">
                                                    Chapter:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control border-0 shadow-sm"
                                                    id="chapter"
                                                    placeholder="Chapter"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-3">
                                        <Select
                                            className="basic-single"
                                            placeholder={
                                                this.state.student_name
                                            }
                                            value={[]}
                                            isSearchable={true}
                                            name="student"
                                            options={this.state.student_list.map(
                                                (list) => {
                                                    return {
                                                        value: list.id,
                                                        label: list.full_name,
                                                    };
                                                }
                                            )}
                                            onChange={this.handleSelect}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="container-fluid">
                            <div className="row light-bg shadow-sm">
                                <div className="col-md-7">
                                    <div className="card light-bg">
                                        <div className="card-body">
                                            <h5 className=" text-center">
                                                Question Paper 30/01/02
                                            </h5>
                                            <h4 className="text-center">
                                                Expected Answer / Value Points
                                            </h4>
                                            <h6 className="text-center">
                                                SECTION -A
                                            </h6>
                                            <br />
                                            <p className="text-justifyssss">
                                                Question Paper Code 30/01/02
                                                Expected Answer/Value Points
                                                <br />
                                                SECTION-A
                                            </p>
                                            <h6>
                                                Question 1. The average of first
                                                50 natural numbers is …………. .
                                            </h6>
                                            <p>
                                                A. 25.30
                                                <br />
                                                B. 25.5
                                                <br />
                                                C. 25.00
                                                <br />
                                                D. 12.25
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-5 mt-2">
                                    <div className="card secondary-bg">
                                        <div className="table-responsive">
                                            <table className="table ">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">
                                                            Sl.No
                                                        </th>
                                                        <th scope="col">
                                                            Topics from Selected
                                                            Chapters
                                                        </th>
                                                        <th scope="col">
                                                            Obtained Marks
                                                        </th>
                                                        <th scope="col">
                                                            Total Marks
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="card-body">
                                            <button className="btn btn-light btn-sm btn-block">
                                                Add +
                                            </button>
                                        </div>
                                        <div className="card-footer secondary-bg">
                                            <div className="row">
                                                <div className="col-md-3"></div>
                                                <div className="col-md-3 text-center">
                                                    Total
                                                </div>
                                                <div className="col-md-3 text-center">
                                                    32
                                                </div>
                                                <div className="col-md-3 text-center">
                                                    40
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body text-right">
                                    <button className="btn btn-primary">
                                        Evaluate
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EvaluateStudents;
