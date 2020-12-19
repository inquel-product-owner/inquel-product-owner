import React, { Component } from "react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";

class StudentProfile extends Component {
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
                <Header name="User Profiles" />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    togglenav={this.toggleSideNav}
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <button
                            className="btn btn-outline-secondary btn-sm d-block d-md-none mb-3"
                            onClick={this.toggleSideNav}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
                        {/* Back button */}
                        {/* <div className="mb-4">
                            <Link to="/profiles">
                                <button className="btn btn-primary">
                                    <i className="fas fa-chevron-left mr-1 fa-sm"></i>{" "}
                                    Back
                                </button>
                            </Link>
                        </div> */}

                        {/* Student details */}
                        <div className="row mb-4">
                            <div className="col-md-4">
                                <div className="row align-items-center">
                                    <div className="col-2">
                                        <img
                                            src={profilepic}
                                            alt="Profile"
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-10">
                                        <h5 className="primary-text">Jeevan</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">First Name</p>
                                <p className="mb-0">Jeevan</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">Last Name</p>
                                <p className="mb-0">Jai</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">Email ID</p>
                                <p className="mb-0">abc@xyz.com</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">Mobile</p>
                                <p className="mb-0">1234567890</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">Institution</p>
                                <p className="mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6">
                                <p className="mb-1">Standard</p>
                                <p className="mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">Referral</p>
                                <p className="mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">Address</p>
                                <p className="mb-1">City</p>
                                <p className="mb-0">Bangalore</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">District</p>
                                <p className="mb-0">Bangalore</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1">State</p>
                                <p className="mb-0">Karnataka</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6">
                                <p className="mb-1">Country</p>
                                <p className="mb-0">India</p>
                            </div>
                        </div>

                        {/* Course list */}
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-text">
                                        <tr>
                                            <th scope="col">
                                                Courses subscribed
                                            </th>
                                            <th scope="col">Valid from</th>
                                            <th scope="col">Valid to</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Amount paid</th>
                                            <th scope="col">
                                                Discount Applied
                                            </th>
                                            <th scope="col">Quiz Points</th>
                                            <th scope="col">Simulation</th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Scorecard
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Mathematics 10th CBSE (Full
                                                course)
                                            </td>
                                            <td>05/10/2020</td>
                                            <td>10/10/2020</td>
                                            <td>Persuing</td>
                                            <td>2560</td>
                                            <td>SP2020210001</td>
                                            <td>212</td>
                                            <td>First Class</td>
                                            <td className="text-center">
                                                <Link to="/">
                                                    <button className="btn btn-sm btn-primary">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Physics</td>
                                            <td>10/10/2020</td>
                                            <td>02/03/2020</td>
                                            <td>Persuing</td>
                                            <td>3871</td>
                                            <td>SP2020210001</td>
                                            <td>436</td>
                                            <td>Not Taken</td>
                                            <td className="text-center">
                                                <Link to="/">
                                                    <button className="btn btn-sm btn-primary">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Chemistry</td>
                                            <td>03/01/2020</td>
                                            <td>07/07/2020</td>
                                            <td>Completed</td>
                                            <td>9568</td>
                                            <td>SP2020210001</td>
                                            <td>128</td>
                                            <td>Distiction</td>
                                            <td className="text-center">
                                                <Link to="/">
                                                    <button className="btn btn-sm btn-primary">
                                                        <i className="fas fa-eye"></i>
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

export default StudentProfile;
