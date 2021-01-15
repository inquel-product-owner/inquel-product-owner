import React, { Component } from "react";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../../shared/loadingComponent";

class HodStudentProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            studentItems: [],
            page_loading: true,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Student Profile - Admin | IQLabs";

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
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

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
                                                      .full_name
                                                : ""}
                                        </h5>
                                        <p className="mb-0">
                                            {this.props.match.params.studentId}
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
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default HodStudentProfile;
