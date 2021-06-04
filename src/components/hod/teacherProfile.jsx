import React, { Component } from "react";
import profilepic from "../../assets/user-v1.png";
import Header from "./shared/navbar";
import SideNav from "./shared/sidenav";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { baseUrl, hodUrl } from "../../shared/baseUrl";
import { paginationCount } from "../../shared/constant.js";
import Loading from "../common/loader";
import GroupTable from "../table/group";
import SubjectTable from "../table/subject";
import Paginations from "../common/pagination";
import AlertBox from "../common/alert";

class HODTeacherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            teacherItems: [],
            groupItems: [],
            subjectItems: [],
            activeGroupPage: 1,
            totalGroupCount: 0,
            activeSubjectPage: 1,
            totalSubjectCount: 0,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        };
        this.teacherId = this.props.match.params.teacherId;
        this.url = baseUrl + hodUrl;
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

    loadGroupData = () => {
        fetch(`${this.url}/hod/teacher/${this.teacherId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        groupItems: result.data.group_data,
                        totalGroupCount: result.data.group_data.length,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    loadSubjectData = () => {
        fetch(`${this.url}/hod/teacher/${this.teacherId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        subjectItems: result.data.independent_subject_data,
                        totalSubjectCount:
                            result.data.independent_subject_data.length,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "Teacher Profile - HOD | IQLabs";

        fetch(`${this.url}/hod/teacher/${this.teacherId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        teacherItems: result.data.teacher_profile,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });

        this.loadGroupData();
        this.loadSubjectData();
    };

    handleGroupPageChange(pageNumber) {
        this.setState(
            { activeGroupPage: pageNumber, page_loading: true },
            () => {
                this.loadGroupData();
            }
        );
    }

    handleSubjectPageChange(pageNumber) {
        this.setState(
            { activeSubjectPage: pageNumber, page_loading: true },
            () => {
                this.loadSubjectData();
            }
        );
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Teacher Profile" togglenav={this.toggleSideNav} />

                {/* Alert message */}
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
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        Teacher
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Profile
                                </li>
                            </ol>
                        </nav>

                        {/* Teacher Details */}
                        <div className="row align-items-center mb-4">
                            <div className="col-md-6">
                                <div className="row align-items-center">
                                    <div className="col-md-2 col-3">
                                        <img
                                            src={
                                                this.state.teacherItems
                                                    .profile_link !== null
                                                    ? this.state.teacherItems
                                                          .profile_link
                                                    : profilepic
                                            }
                                            alt={
                                                this.state.teacherItems
                                                    .full_name
                                            }
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-md-10 col-9 pl-0">
                                        <h5 className="primary-text">
                                            {this.state.teacherItems
                                                .full_name !== ""
                                                ? this.state.teacherItems
                                                      .full_name
                                                : this.state.teacherItems
                                                      .username}
                                        </h5>
                                        <p className="mb-0">
                                            {this.state.teacherItems.length !==
                                            0 ? (
                                                this.state.teacherItems
                                                    .is_active ? (
                                                    <Badge variant="success">
                                                        Active
                                                    </Badge>
                                                ) : (
                                                    <Badge variant="danger">
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
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold-600 mb-2">
                                    First Name
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.first_name}
                                </p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold-600 mb-2">
                                    Last Name
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.last_name}
                                </p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold-600 mb-2">
                                    Designation
                                </p>
                                <p className="text-break mb-0">
                                    Science Teacher
                                </p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold-600 mb-2">
                                    Email ID
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.email}
                                </p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold-600 mb-2">
                                    Mobile
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.country_code}
                                    {this.state.teacherItems.phone_num}
                                </p>
                            </div>
                        </div>

                        <div className="row mb-5">
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600 mb-2">
                                    Address
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.address}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600 mb-2">
                                    City
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.city}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600 mb-2">
                                    District
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.district}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6 mb-3">
                                <p className="mb-1 font-weight-bold-600 mb-2">
                                    State
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.state}
                                </p>
                            </div>
                            <div className="col-md-2 col-sm-4 col-6">
                                <p className="mb-1 font-weight-bold-600 mb-2">
                                    Country
                                </p>
                                <p className="text-break mb-0">
                                    {this.state.teacherItems.country}
                                </p>
                            </div>
                        </div>

                        {/* Group Handling */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <h5>Handling Groups</h5>
                            </div>
                            <GroupTable
                                groupItems={this.state.groupItems}
                                path="hod"
                                view={true}
                            />
                            <div className="card-body p-3">
                                {this.state.totalGroupCount >
                                paginationCount ? (
                                    <Paginations
                                        activePage={this.state.activeGroupPage}
                                        totalItemsCount={
                                            this.state.totalGroupCount
                                        }
                                        onChange={this.handleGroupPageChange.bind(
                                            this
                                        )}
                                    />
                                ) : null}
                            </div>
                        </div>

                        {/* Subject Handling */}
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h5>Handling Subjects</h5>
                            </div>
                            <SubjectTable
                                subjectItems={this.state.subjectItems}
                                path="hod"
                            />
                            <div className="card-body p-3">
                                {this.state.totalSubjectCount >
                                paginationCount ? (
                                    <Paginations
                                        activePage={
                                            this.state.activeSubjectPage
                                        }
                                        totalItemsCount={
                                            this.state.totalSubjectCount
                                        }
                                        onChange={this.handleSubjectPageChange.bind(
                                            this
                                        )}
                                    />
                                ) : null}
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

export default HODTeacherProfile;
