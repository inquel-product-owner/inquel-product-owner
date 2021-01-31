import React, { Component } from "react";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, hodUrl } from "../../shared/baseUrl";
import Loading from "../sharedComponents/loader";
import GroupTable from "../table/groupTable";
import Paginations from "../sharedComponents/pagination";

class TeacherProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            teacherItems: [],
            groupItems: [],
            activeGroupPage: 1,
            totalGroupCount: 0,
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

    componentDidMount = () => {
        document.title = "Teacher Profile - HOD | IQLabs";

        fetch(`${this.url}/hod/teacher/${this.teacherId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    teacherItems: result.data,
                    groupItems: result.data.results ? result.data.results : [],
                    totalGroupCount: result.data.count ? result.data.count : 0,
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleGroupPageChange(pageNumber) {
        this.setState({ activeGroupPage: pageNumber });
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
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
                        </button>

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
                                            {this.state.teacherItems.full_name}
                                        </h5>
                                        <p className="mb-0">
                                            {this.state.teacherItems.id}
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

                        <div className="row mb-4">
                            <div className="col-md-2 col-6">
                                <form action="">
                                    <label htmlFor="subject">Subjects</label>
                                    <select
                                        name="subject"
                                        id="subject"
                                        className="form-control shadow-sm"
                                    >
                                        <option value="maths">Maths</option>
                                    </select>
                                </form>
                            </div>
                            <div className="col-md-2 col-6">
                                <form action="">
                                    <label htmlFor="group">Group</label>
                                    <select
                                        name="group"
                                        id="group"
                                        className="form-control shadow-sm"
                                    >
                                        <option value="a">A</option>
                                    </select>
                                </form>
                            </div>
                        </div>

                        {/* Course Handling */}
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
                                <Paginations
                                    activePage={this.state.activeGroupPage}
                                    totalItemsCount={this.state.totalGroupCount}
                                    onChange={this.handleGroupPageChange.bind(
                                        this
                                    )}
                                />
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
