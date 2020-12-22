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
                        {/* Back button */}
                        {/* <div className="mb-4">
                            <Link to="/profiles">
                                <button className="btn btn-primary">
                                    <i className="fas fa-chevron-left mr-1 fa-sm"></i>{" "}
                                    Back
                                </button>
                            </Link>
                        </div> */}

                        {/* Teacher Details */}
                        <div className="row align-items-center mb-4">
                            <div className="col-1">
                                <img
                                    src={profilepic}
                                    alt="Profile"
                                    className="img-fluid profile-pic"
                                />
                            </div>
                            <div className="col-11">
                                <h5 className="primary-text">Jeevan</h5>
                                <p className="mb-0">001</p>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-2 col-sm-6">
                                <form action="">
                                    <label htmlFor="hod">HOD</label>
                                    <select
                                        name="hod"
                                        id="hod"
                                        className="form-control shadow-sm"
                                    >
                                        <option value="ram">Ram</option>
                                    </select>
                                </form>
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <form action="">
                                    <label htmlFor="category">Category</label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="form-control shadow-sm"
                                    >
                                        <option value="school">School</option>
                                    </select>
                                </form>
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <form action="">
                                    <label htmlFor="subcategory">
                                        Sub Category
                                    </label>
                                    <select
                                        name="subcategory"
                                        id="subcategory"
                                        className="form-control shadow-sm"
                                    >
                                        <option value="sch">SCH</option>
                                    </select>
                                </form>
                            </div>
                            <div className="col-md-2 col-sm-6">
                                <form action="">
                                    <label htmlFor="discipline">
                                        Discipline
                                    </label>
                                    <select
                                        name="discipline"
                                        id="discipline"
                                        className="form-control shadow-sm"
                                    >
                                        <option value="none">None</option>
                                    </select>
                                </form>
                            </div>
                            <div className="col-md-2 col-sm-6">
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
                            <div className="col-md-2 col-sm-6">
                                <form action="">
                                    <label htmlFor="university">
                                        Board / University
                                    </label>
                                    <select
                                        name="university"
                                        id="university"
                                        className="form-control shadow-sm"
                                    >
                                        <option value="cbse">CBSE</option>
                                    </select>
                                </form>
                            </div>
                        </div>

                        {/* Course Handling */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <h5>Handling</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card shadow">
                                            <div className="card-body text-center">
                                                Add +
                                            </div>
                                            <div className="card-footer primary-bg">
                                                <p className="text-white small mb-0">
                                                    Chemistry 10th
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
                                                <p className="text-white small mb-0">
                                                    Chemistry 10th
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
                                                <p className="text-white small mb-0">
                                                    Chemistry 10th
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Courses configured */}
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h5>Courses configured</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="card shadow">
                                            <div className="card-body text-center">
                                                Add +
                                            </div>
                                            <div className="card-footer primary-bg">
                                                <p className="text-white small mb-0">
                                                    Chemistry 10th
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
                                                <p className="text-white small mb-0">
                                                    Chemistry 10th
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
                                                <p className="text-white small mb-0">
                                                    Chemistry 10th
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
