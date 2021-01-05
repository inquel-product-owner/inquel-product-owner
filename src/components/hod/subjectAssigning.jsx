import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./navbar";
import SideNav from "./sidenav";

class SubjectAssigning extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            subjectItem:[],
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    render() {
        document.title =
            this.state.subjectItem.length !== 0
                ? this.state.subjectItem.subject_name + " Assign | IQLabs"
                : "Subject Assign | IQLabs";
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Subject Name" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} activeLink="dashboard" />

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
                                <Link to={`/hod/subject/${this.props.match.params.subjectId}/configure`}>
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
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Disable / Enable / Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="bg-light">
                                            <td>
                                                <div className="form-group">
                                                    <input
                                                        type="text"
                                                        name="chapter"
                                                        className="form-control"
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                <div className="form-group">
                                                    <select
                                                        name="status"
                                                        className="form-control"
                                                    >
                                                        <option value="">
                                                            Yet to start
                                                        </option>
                                                        <option value="">
                                                            Ready for review
                                                        </option>
                                                        <option value="">
                                                            Approved
                                                        </option>
                                                        <option value="">
                                                            In progress
                                                        </option>
                                                        <option value="">
                                                            Review
                                                        </option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="form-group">
                                                            <select
                                                                name="teacher"
                                                                className="form-control"
                                                            >
                                                                <option value="">
                                                                    Select
                                                                    teacher
                                                                </option>
                                                                <option value="">
                                                                    Teacher 01
                                                                </option>
                                                                <option value="">
                                                                    Teacher 02
                                                                </option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <button className="btn btn-primary-invert btn-sm">
                                                            Not-Assigned
                                                        </button>
                                                    </div>
                                                </div>
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
                            <div className="card-body p-2">
                                <button className="btn btn-light btn-block">
                                    Add New +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SubjectAssigning;
