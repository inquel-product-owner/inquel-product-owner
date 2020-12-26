import React, { Component } from "react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";

class HodStudentList extends Component {
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
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} activeLink="profiles" />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        {/* <div className="mb-4">
                            <Link to="/profiles">
                                <button className="btn btn-primary">
                                    <i className="fas fa-chevron-left mr-1 fa-sm"></i>{" "}
                                    Back
                                </button>
                            </Link>
                        </div> */}

                        {/* HOD Details */}
                        <div className="row align-items-center mb-4">
                            <div className="col-md-6">
                                <div className="row align-items-center">
                                    <div className="col-md-2 col-3">
                                        <img
                                            src={profilepic}
                                            alt="Profile"
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-md-10 col-9 pl-0">
                                        <h5 className="primary-text">
                                            HOD Ram Profile
                                        </h5>
                                        <p className="mb-0">001</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Student List */}
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-text">
                                        <tr>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Registered on</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>001</td>
                                            <td>
                                                <img
                                                    src={profilepic}
                                                    alt="User profile pic"
                                                    width="20"
                                                />{" "}
                                                Student 1
                                            </td>
                                            <td>stu@acde.com</td>
                                            <td>0123456789</td>
                                            <td>Engineering</td>
                                            <td>01.02.2020</td>
                                            <td>
                                                <Link to="/admin/student/001">
                                                    <button className="btn btn-sm btn-primary">
                                                        View
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>002</td>
                                            <td>
                                                <img
                                                    src={profilepic}
                                                    alt="User profile pic"
                                                    width="20"
                                                />{" "}
                                                Student 2
                                            </td>
                                            <td>stu@acde.com</td>
                                            <td>0123456789</td>
                                            <td>Engineering</td>
                                            <td>01.02.2020</td>
                                            <td>
                                                <Link to="/admin/student/002">
                                                    <button className="btn btn-sm btn-primary">
                                                        View
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>003</td>
                                            <td>
                                                <img
                                                    src={profilepic}
                                                    alt="User profile pic"
                                                    width="20"
                                                />{" "}
                                                Student 3
                                            </td>
                                            <td>stu@acde.com</td>
                                            <td>0123456789</td>
                                            <td>Engineering</td>
                                            <td>01.02.2020</td>
                                            <td>
                                                <Link to="/admin/student/003">
                                                    <button className="btn btn-sm btn-primary">
                                                        View
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>004</td>
                                            <td>
                                                <img
                                                    src={profilepic}
                                                    alt="User profile pic"
                                                    width="20"
                                                />{" "}
                                                Student 4
                                            </td>
                                            <td>stu@acde.com</td>
                                            <td>0123456789</td>
                                            <td>Engineering</td>
                                            <td>01.02.2020</td>
                                            <td>
                                                <Link to="/admin/student/004">
                                                    <button className="btn btn-sm btn-primary">
                                                        View
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>005</td>
                                            <td>
                                                <img
                                                    src={profilepic}
                                                    alt="User profile pic"
                                                    width="20"
                                                />{" "}
                                                Student 5
                                            </td>
                                            <td>stu@acde.com</td>
                                            <td>0123456789</td>
                                            <td>Engineering</td>
                                            <td>01.02.2020</td>
                                            <td>
                                                <Link to="/admin/student/005">
                                                    <button className="btn btn-sm btn-primary">
                                                        View
                                                    </button>
                                                </Link>
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

export default HodStudentList;
