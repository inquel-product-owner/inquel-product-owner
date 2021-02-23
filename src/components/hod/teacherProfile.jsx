import React, { Component } from "react";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import { baseUrl, hodUrl } from "../../shared/baseUrl";
import Loading from "../sharedComponents/loader";
import GroupTable from "../table/groupTable";
import SubjectTable from "../table/subjectTable";
import Paginations from "../sharedComponents/pagination";

class TeacherProfile extends Component {
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
                this.setState({
                    groupItems: result.data.group_data,
                    totalGroupCount: result.data.group_data.length,
                    page_loading: false,
                });
                console.log(result);
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
                this.setState({
                    subjectItems: result.data.independent_subject_data,
                    totalSubjectCount:
                        result.data.independent_subject_data.length,
                    page_loading: false,
                });
                console.log(result);
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
                this.setState({
                    teacherItems: result.data.teacher_profile,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });

        this.loadGroupData();
        this.loadSubjectData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.activeGroupPage !== this.state.activeGroupPage) {
            this.loadGroupData();
            this.setState({
                page_loading: true,
            });
        }

        if (prevState.activeSubjectPage !== this.state.activeSubjectPage) {
            this.loadSubjectData();
            this.setState({
                page_loading: true,
            });
        }
    };

    handleGroupPageChange(pageNumber) {
        this.setState({ activeGroupPage: pageNumber });
    }

    handleSubjectPageChange(pageNumber) {
        this.setState({ activeSubjectPage: pageNumber });
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Teacher Profile" togglenav={this.toggleSideNav} />

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
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Full Name</p>
                                <p className="mb-0">
                                    {this.state.teacherItems.full_name}
                                </p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Designation</p>
                                <p className="mb-0">Science Teacher</p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Email ID</p>
                                <p className="mb-0">
                                    {this.state.teacherItems.email}
                                </p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Mobile</p>
                                <p className="mb-0">
                                    {this.state.teacherItems.phone_num}
                                </p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Mobile</p>
                                <p className="mb-0">
                                    {this.state.teacherItems.phone_num}
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
                                {this.state.totalGroupCount >= 10 ? (
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
                                check={false}
                            />
                            <div className="card-body p-3">
                                {this.state.totalSubjectCount >= 10 ? (
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

export default TeacherProfile;
