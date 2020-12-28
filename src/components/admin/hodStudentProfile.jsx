import React, { Component } from "react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";

class HodStudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            studentItems: [],
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        const hodId = this.props.match.params.hodId;
        const studentId = this.props.match.params.studentId;
        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        fetch(`${url}/hod/${hodId}/student/${studentId}/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    studentItems: result.data,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="profiles"
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Student details */}
                        <div className="row align-items-center mb-4">
                            <div className="col-md-6">
                                <div className="row align-items-center">
                                    <div className="col-md-2 col-3">
                                        <img
                                            src={
                                                this.state.studentItems
                                                    .profile_link !== null
                                                    ? this.state.studentItems
                                                          .profile_link
                                                    : profilepic
                                            }
                                            alt={`${this.state.studentItems.first_name} ${this.state.studentItems.last_name}`}
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-md-10 col-9 pl-0">
                                        <h5 className="primary-text">{`${this.state.studentItems.first_name} ${this.state.studentItems.last_name}`}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">
                                    First Name
                                </p>
                                <p className="mb-0">
                                    {this.state.studentItems.first_name}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">
                                    Last Name
                                </p>
                                <p className="mb-0">
                                    {this.state.studentItems.last_name}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">
                                    Email ID
                                </p>
                                <p className="mb-0">
                                    {this.state.studentItems.email}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">Mobile</p>
                                <p className="mb-0">
                                    {this.state.studentItems.phone_num}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">
                                    Institution
                                </p>
                                <p className="mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6">
                                <p className="mb-1 font-weight-bold">
                                    Standard
                                </p>
                                <p className="mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">
                                    Referral
                                </p>
                                <p className="mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">Address</p>
                                <p className="mb-1 font-weight-bold">City</p>
                                <p className="mb-0">Bangalore</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">
                                    District
                                </p>
                                <p className="mb-0">Bangalore</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold">State</p>
                                <p className="mb-0">Karnataka</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6">
                                <p className="mb-1 font-weight-bold">Country</p>
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
                                                <Link to="/admin/course/001">
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
                                                <Link to="/admin/course/001">
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
                                                <Link to="/admin/course/001">
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

export default HodStudentProfile;
