import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import courseimg from "../../assets/code.jpg";
import { Link } from "react-router-dom";
import { baseUrl, teacherUrl } from "../../shared/baseUrl.js";
import CarouselCard from "../sharedComponents/owlCarousel";

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            page_loading: true,
        };
        this.url = baseUrl + teacherUrl;
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
        document.title = "Dashboard - Student | IQLabs";
    };
    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Dashboard" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    activeLink="dashboard"
                />

                <div
                    className={`section content pb-0 ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Welcome */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-body text-center p-4">
                                <h3 className="primary-text mb-0">
                                    WELCOME BACK
                                </h3>
                            </div>
                        </div>

                        {/* Continue learning */}
                        <h6 className="primary-text mb-3">Continue learning</h6>
                        <div className="row mb-4">
                            <div className="col-md-2">
                                <div
                                    className="card"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={courseimg}
                                        className="card-img-top"
                                        alt="Course"
                                    />
                                    <div className="card-body primary-bg text-white text-center p-2">
                                        01
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={courseimg}
                                        className="card-img-top"
                                        alt="Course"
                                    />
                                    <div className="card-body primary-bg text-white text-center p-2">
                                        02
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={courseimg}
                                        className="card-img-top"
                                        alt="Course"
                                    />
                                    <div className="card-body primary-bg text-white text-center p-2">
                                        03
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={courseimg}
                                        className="card-img-top"
                                        alt="Course"
                                    />
                                    <div className="card-body primary-bg text-white text-center p-2">
                                        04
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={courseimg}
                                        className="card-img-top"
                                        alt="Course"
                                    />
                                    <div className="card-body primary-bg text-white text-center p-2">
                                        05
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-2">
                                <div
                                    className="card"
                                    style={{
                                        cursor: "pointer",
                                    }}
                                >
                                    <img
                                        src={courseimg}
                                        className="card-img-top"
                                        alt="Course"
                                    />
                                    <div className="card-body primary-bg text-white text-center p-2">
                                        06
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Assigned subjects */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Assigned subjects</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
                            </div>
                        </div>

                        {/* Courses */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Courses</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
                            </div>
                        </div>

                        {/* What to learn next */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>What to learn next</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
                            </div>
                        </div>

                        {/* Featured */}
                        <div className="card shadow-sm mb-4">
                            <div className="card-header">
                                <div className="row align-items-center">
                                    <div className="col-md-3">
                                        <h5>Featured</h5>
                                    </div>
                                    <div className="col-md-9 text-right">
                                        <Link to="">
                                            <button className="btn btn-primary btn-sm">
                                                View all
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">
                                <CarouselCard />
                            </div>
                        </div>
                    </div>

                    <div className="light-bg p-3">
                        <div className="row justify-content-center align-items-center">
                            <div className="col-md-4">
                                <h5 className="primary-text text-md-right text-center">
                                    Subscribe for New updates
                                </h5>
                            </div>
                            <div className="col-md-4">
                                <input
                                    type="email"
                                    name="subscribe"
                                    id="subscribe"
                                    placeholder="Your email ID"
                                    className="form-control borders"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="secondary-bg p-5">
                        <div className="row mb-3">
                            <div className="col-md-3">
                                <h5 className="font-weight-bold primary-text mb-3">
                                    SUBJECTS
                                </h5>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Arts
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Maths
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Science
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Social Science
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Degreee course
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Medical courses
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Comitative Exams
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Open Source
                                    </Link>
                                </p>
                                <p>
                                    <Link to="" className="primary-text">
                                        Classes
                                    </Link>
                                </p>
                            </div>
                            <div className="col-md-3">
                                <h5 className="font-weight-bold primary-text mb-3">
                                    FEATURES
                                </h5>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Premium Content
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Flashcards
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Free Courses
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Course Catalogue
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Leader Board
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Study Guide
                                    </Link>
                                </p>
                                <p>
                                    <Link to="" className="primary-text">
                                        Buy A Course
                                    </Link>
                                </p>
                            </div>
                            <div className="col-md-3">
                                <h5 className="font-weight-bold primary-text mb-3">
                                    HELP
                                </h5>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Sign Up
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Help Center
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Students
                                    </Link>
                                </p>
                                <p>
                                    <Link to="" className="primary-text">
                                        Technical Help Center
                                    </Link>
                                </p>
                            </div>
                            <div className="col-md-3">
                                <h5 className="font-weight-bold primary-text mb-3">
                                    ABOUT
                                </h5>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Company
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Blog
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Latest Updates
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Careers
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        How Inquel Works?
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Privacy Policy
                                    </Link>
                                </p>
                                <p className="mb-2">
                                    <Link to="" className="primary-text">
                                        Terms & Conditions
                                    </Link>
                                </p>
                                <p>
                                    <Link to="" className="primary-text">
                                        Legal Notice
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-4 d-flex justify-content-around">
                                <p>
                                    <Link to="" className="text-dark">
                                        <i className="fab fa-facebook-f fa-2x"></i>
                                    </Link>
                                </p>
                                <p>
                                    <Link to="" className="text-dark">
                                        <i className="fab fa-twitter fa-2x"></i>
                                    </Link>
                                </p>
                                <p>
                                    <Link to="" className="text-dark">
                                        <i className="fab fa-linkedin-in fa-2x"></i>
                                    </Link>
                                </p>
                                <p>
                                    <Link to="" className="text-dark">
                                        <i className="fab fa-instagram fa-2x"></i>
                                    </Link>
                                </p>
                            </div>
                        </div>
                        <div className="dropdown-divider mb-3"></div>
                        <h6 className="font-weight-bold text-center mb-0">
                            &copy;2020 Inquel inc. Powered By{" "}
                            <a
                                href="https://sachirva.com/"
                                target="_blank"
                                rel="noreferrer"
                                className="text-dark"
                            >
                                Sachirva Technology Solutions
                            </a>
                        </h6>
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
