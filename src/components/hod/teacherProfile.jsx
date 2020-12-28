import React, { Component } from "react";
import profilepic from "../../assets/user.png";
import Header from "./navbar";
import SideNav from "./sidenav";

class TeacherProfile extends Component {
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
                <SideNav shownav={this.state.showSideNav} />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Teacher Details */}
                        <div className="row align-items-center mb-4">
                            <div className="col-md-2 col-sm-6 mb-3 mb-md-0">
                                <div className="row align-items-center">
                                    <div className="col-4">
                                        <img
                                            src={profilepic}
                                            alt="Profile"
                                            className="img-fluid profile-pic"
                                        />
                                    </div>
                                    <div className="col-8">
                                        <h5 className="primary-text">Jeevan</h5>
                                        <p className="mb-0">001</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Full Name</p>
                                <p className="mb-0">Jeevan</p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Designation</p>
                                <p className="mb-0">Science Teacher</p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Email ID</p>
                                <p className="mb-0">abc@xyz.com</p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Mobile</p>
                                <p className="mb-0">9876543210</p>
                            </div>
                            <div className="col-md-2 col-6 mb-3 mb-md-0">
                                <p className="font-weight-bold">Mobile</p>
                                <p className="mb-0">9876543210</p>
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
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 mb-3 mb-md-0">
                                        <div className="card shadow">
                                            <div className="card-body text-center">
                                                Add +
                                            </div>
                                            <div className="card-footer primary-bg">
                                                <p className="text-white text-center small mb-0">
                                                    A
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4 mb-3 mb-md-0">
                                        <div className="card shadow">
                                            <div className="card-body text-center">
                                                Add +
                                            </div>
                                            <div className="card-footer primary-bg">
                                                <p className="text-white text-center small mb-0">
                                                    B
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="card shadow">
                                            <div className="card-body text-center">
                                                Add +
                                            </div>
                                            <div className="card-footer primary-bg">
                                                <p className="text-white text-center small mb-0">
                                                    C
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default TeacherProfile;
