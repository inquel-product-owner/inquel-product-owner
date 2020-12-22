import React, { Component } from "react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/user.png";
import watermark from "../../assets/code.jpg";
import Switch from "react-switch";
import Header from "./navbar";
import SideNav from "./sidenav";

class HodProfile extends Component {
    constructor() {
        super();
        this.state = { checked: false, showSideNav: false };
        this.handleChange = this.handleChange.bind(this);
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    handleChange(checked) {
        this.setState({ checked });
    }

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
                        <div className="row">
                            <div className="col-md-9">
                                {/* Back button */}
                                {/* <div className="mb-4">
                                    <Link to="/profiles">
                                        <button className="btn btn-primary">
                                            <i className="fas fa-chevron-left mr-1 fa-sm"></i>{" "}
                                            Back
                                        </button>
                                    </Link>
                                </div> */}

                                {/* HOD Details */}
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <div className="row align-items-center">
                                            <div className="col-3">
                                                <img
                                                    src={profilepic}
                                                    alt="Profile"
                                                    className="img-fluid profile-pic"
                                                />
                                            </div>
                                            <div className="col-9">
                                                <h5 className="primary-text">
                                                    HOD Ram Profile
                                                </h5>
                                                <p className="mb-0">001</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <Link
                                                    to="/hod/001/students"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-block">
                                                        My Student Profiles
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="col-6">
                                                <Link
                                                    to="/hod/001/teachers"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-block">
                                                        My Teacher Profiles
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            First Name
                                        </p>
                                        <p className="mb-0">Jeevan</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Last Name
                                        </p>
                                        <p className="mb-0">Jai</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Email ID
                                        </p>
                                        <p className="mb-0">abc@xyz.com</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Mobile
                                        </p>
                                        <p className="mb-0">1234567890</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Office Number
                                        </p>
                                        <p className="mb-0">1234</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Institution
                                        </p>
                                        <p className="mb-0">XYZ</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Address
                                        </p>
                                        <p className="mb-0">XYZ</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            City
                                        </p>
                                        <p className="mb-0">Bangalore</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            District
                                        </p>
                                        <p className="mb-0">Bangalore</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            State
                                        </p>
                                        <p className="mb-0">Karnataka</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Country
                                        </p>
                                        <p className="mb-0">Karnataka</p>
                                    </div>
                                    <div className="col-md-3 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Additional Details 1
                                        </p>
                                        <p className="mb-0">XYZ</p>
                                    </div>
                                    <div className="col-md-3 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Additional Details 2
                                        </p>
                                        <p className="mb-0">XYZ</p>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-6">
                                        <p className="mb-1 font-weight-bold">
                                            Watermark Image
                                        </p>
                                        <img
                                            src={watermark}
                                            alt="Laptop"
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>

                                {/* Course Handling */}
                                <div className="card shadow-sm mb-4">
                                    <div className="card-header">
                                        <h5>Groups</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-3">
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
                                            <div className="col-md-3">
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
                                            <div className="col-md-3">
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
                                            <div className="col-md-3">
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
                                            <div className="col-md-3">
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
                                            <div className="col-md-3">
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
                                            <div className="col-md-3">
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
                                            <div className="col-md-3">
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

                            {/* Personal details */}
                            <div className="col-md-3">
                                <div className="card shadow-sm">
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-8">
                                                <h6 className="font-weight-bold">
                                                    Personal Details
                                                </h6>
                                            </div>
                                            <div className="col-4 text-right">
                                                <button className="btn btn-primary btn-sm">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Category ID
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <form action="">
                                                    <select
                                                        name="category"
                                                        id="category"
                                                        className="form-control form-control-sm shadow-sm"
                                                    >
                                                        <option value="school">
                                                            School
                                                        </option>
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Sub Category
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <form action="">
                                                    <select
                                                        name="subcategory"
                                                        id="subcategory"
                                                        className="form-control form-control-sm shadow-sm"
                                                    >
                                                        <option value="sch">
                                                            SCH
                                                        </option>
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Discipline
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <form action="">
                                                    <select
                                                        name="discipline"
                                                        id="discipline"
                                                        className="form-control form-control-sm shadow-sm"
                                                    >
                                                        <option value="none">
                                                            None
                                                        </option>
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Subjects
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <form action="">
                                                    <select
                                                        name="subject"
                                                        id="subject"
                                                        className="form-control form-control-sm shadow-sm"
                                                    >
                                                        <option value="maths">
                                                            Maths
                                                        </option>
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Board / University
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <form action="">
                                                    <select
                                                        name="university"
                                                        id="university"
                                                        className="form-control form-control-sm shadow-sm"
                                                    >
                                                        <option value="cbse">
                                                            CBSE
                                                        </option>
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-md-5">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Validity
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <form action="">
                                                    <select
                                                        name="validity"
                                                        id="validity"
                                                        className="form-control form-control-sm shadow-sm"
                                                    >
                                                        <option value="1">
                                                            1 year
                                                        </option>
                                                    </select>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="dropdown-divider"></div>
                                    </div>

                                    {/* Configuration */}
                                    <div className="card-header">
                                        <div className="row">
                                            <div className="col-8">
                                                <h6 className="font-weight-bold">
                                                    Configuration
                                                </h6>
                                            </div>
                                            <div className="col-4 text-right">
                                                <button className="btn btn-primary btn-sm">
                                                    Edit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Progressive Score
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Type 1
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Type 2
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Quiz
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Match
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Notes download
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Summary
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Direct Questions
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Configure
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Simulation Exam
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Locking of Tests
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Mobile App
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={this.state.checked}
                                                    onChange={this.handleChange}
                                                    onColor="#efd2ac"
                                                    onHandleColor="#621012"
                                                    handleDiameter={12}
                                                    uncheckedIcon={false}
                                                    checkedIcon={false}
                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                    height={18}
                                                    width={35}
                                                    className="react-switch"
                                                    id="material-switch"
                                                />
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

export default HodProfile;
