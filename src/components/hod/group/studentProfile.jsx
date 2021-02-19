import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import profilepic from "../../../assets/user.png";
import Header from "../navbar";
import SideNav from "../sidenav";
import { baseUrl, hodUrl } from "../../../shared/baseUrl";
import Loading from "../../sharedComponents/loader";

class GroupStudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            studentItems: [],
            page_loading: true,
        };
        this.groupId = this.props.match.params.groupId;
        this.studentId = this.props.match.params.studentId;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Student Profile - HOD | IQLabs";

        var url = baseUrl + hodUrl;
        var authToken = localStorage.getItem("Authorization");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: authToken,
        };

        fetch(`${url}/hod/student/${this.studentId}/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    studentItems: result.data,
                    page_loading: false,
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
                <Header name="Student Profile" togglenav={this.toggleSideNav} />

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
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-3"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/hod">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/hod/group/${this.groupId}`}>
                                        Group
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to={`/hod/group/${this.groupId}/student`}
                                    >
                                        Student
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Profile
                                </li>
                            </ol>
                        </nav>

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
                                            alt={
                                                this.state.studentItems
                                                    .full_name
                                            }
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-md-10 col-9 pl-0">
                                        <h5 className="primary-text">
                                            {this.state.studentItems
                                                .full_name !== ""
                                                ? this.state.studentItems
                                                      .full_name
                                                : this.state.studentItems
                                                      .username}
                                        </h5>
                                        <p className="mb-0">
                                            {this.state.studentItems.length !==
                                            0 ? (
                                                this.state.studentItems
                                                    .is_active ? (
                                                    <Badge
                                                        variant="success"
                                                        className="ml-1"
                                                    >
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge
                                                        variant="danger"
                                                        className="ml-1"
                                                    >
                                                        Inactive
                                                    </Badge>
                                                )
                                            ) : (
                                                ""
                                            )}
                                        </p>
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
                                                <Link to="/hod/course/001">
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
                                                <Link to="/hod/course/001">
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
                                                <Link to="/hod/course/001">
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
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupStudentProfile;
