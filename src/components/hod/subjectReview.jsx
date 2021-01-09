import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./navbar";
import SideNav from "./sidenav";

class SubjectReview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItem: [],
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        console.log(this.props);
    };

    render() {
        document.title =
            this.state.subjectItem.length !== 0
                ? this.state.subjectItem.subject_name + " | IQLabs"
                : "Subject | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject Name" togglenav={this.toggleSideNav} />

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
                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                <h5 className="primary-text">
                                    Subject: Mathematics | 10th class
                                </h5>
                            </div>
                            <div className="col-md-6 text-center text-md-right">
                                <button className="btn btn-primary-invert mr-2">
                                    Filter{" "}
                                    <i className="fas fa-filter ml-1"></i>
                                </button>
                                <Link
                                    to={`/hod/subject/${this.props.match.params.subjectId}/assign`}
                                >
                                    <button className="btn btn-primary mr-2">
                                        Add New
                                    </button>
                                </Link>
                                <Link
                                    to={`/hod/subject/${this.props.match.params.subjectId}/configure`}
                                >
                                    <button className="btn btn-primary">
                                        Configure Course
                                    </button>
                                </Link>
                            </div>
                        </div>

                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="secondary-bg">
                                        <tr>
                                            <th scope="col">
                                                Course structure
                                            </th>
                                            <th scope="col">Status</th>
                                            <th scope="col">
                                                Teacher assigned
                                            </th>
                                            <th scope="col"></th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Disable / Enable / Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <Link
                                                    to="/hod"
                                                    className="text-dark"
                                                >
                                                    Chapter 01
                                                </Link>
                                            </td>
                                            <td>Ready for review</td>
                                            <td>Teacher 01</td>
                                            <td>
                                                <button className="btn btn-primary-invert btn-sm">
                                                    Re assign
                                                </button>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-primary btn-sm mr-1">
                                                    D
                                                </button>
                                                <button className="btn btn-primary btn-sm mr-1">
                                                    E
                                                </button>
                                                <button className="btn btn-primary btn-sm">
                                                    <i className="fas fa-trash-alt fa-sm"></i>
                                                </button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Link
                                                    to="/hod"
                                                    className="text-dark"
                                                >
                                                    Chapter 02
                                                </Link>
                                            </td>
                                            <td>Yet to start</td>
                                            <td>None</td>
                                            <td>
                                                <button className="btn btn-primary-invert btn-sm">
                                                    Assign
                                                </button>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn btn-primary btn-sm mr-1">
                                                    D
                                                </button>
                                                <button className="btn btn-primary btn-sm mr-1">
                                                    E
                                                </button>
                                                <button className="btn btn-primary btn-sm">
                                                    <i className="fas fa-trash-alt fa-sm"></i>
                                                </button>
                                            </td>
                                        </tr>
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

export default SubjectReview;
