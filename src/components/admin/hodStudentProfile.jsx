import React, { Component } from "react";
import profilepic from "../../assets/user-v1.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../sharedComponents/loader";
import { Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import AlertBox from "../sharedComponents/alert";

class HodStudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            studentItems: [],
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.hodId = this.props.match.params.hodId;
        this.studentId = this.props.match.params.studentId;
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Student Profile - Admin | IQLabs";

        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        fetch(`${url}/hod/${this.hodId}/student/${this.studentId}/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        studentItems: result.data,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
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

                {/* ALert message */}
                <AlertBox
                    errorMsg={this.state.errorMsg}
                    successMsg={this.state.successMsg}
                    showErrorAlert={this.state.showErrorAlert}
                    showSuccessAlert={this.state.showSuccessAlert}
                    toggleSuccessAlert={() => {
                        this.setState({
                            showSuccessAlert: false,
                        });
                    }}
                    toggleErrorAlert={() => {
                        this.setState({
                            showErrorAlert: false,
                        });
                    }}
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
                                    <Link to="/admin">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link to={`/admin/hod/${this.hodId}`}>
                                        HOD
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
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
                                                    .length !== 0
                                                    ? this.state.studentItems
                                                          .profile_link !== null
                                                        ? this.state
                                                              .studentItems
                                                              .profile_link
                                                        : profilepic
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
                                            {this.state.studentItems.length !==
                                            0
                                                ? this.state.studentItems
                                                      .full_name !== ""
                                                    ? this.state.studentItems
                                                          .full_name
                                                    : this.state.studentItems
                                                          .username
                                                : ""}
                                        </h5>
                                        <p className="mb-0">
                                            {this.state.studentItems.length !==
                                            0 ? (
                                                this.state.studentItems
                                                    .is_active ? (
                                                    <Badge variant="success">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="danger">
                                                        Not active
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
                                <p className="mb-1 font-weight-bold-600">
                                    First Name
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.first_name}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    Last Name
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.last_name}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    Email ID
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.email}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    Mobile
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.country_code}
                                    {this.state.studentItems.phone_num}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    Institution
                                </p>
                                <p className="text-break mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6">
                                <p className="mb-1 font-weight-bold-600">
                                    Standard
                                </p>
                                <p className="text-break mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    Referral
                                </p>
                                <p className="text-break mb-0">XYZ</p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    Address
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.address}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    City
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.city}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    District
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.district}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600">
                                    State
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.state}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6">
                                <p className="mb-1 font-weight-bold-600">
                                    Country
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.studentItems.country}
                                </p>
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

export default HodStudentProfile;
