import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Link } from "react-router-dom";

class MasterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            activeType: "category",
            activeCategory: "",
            activeSubcategory: "",
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    handleType = (event) => {
        this.setState({
            activeType: event.target.value,
            activeCategory: "",
            activeSubcategory: "",
        });
    };

    handleCategory = (event) => {
        this.setState({
            activeCategory: event.target.value,
        });
    };

    handleSubcategory = (event) => {
        this.setState({
            activeSubcategory: event.target.value,
        });
    };

    render() {
        return (
            <div className="wrapper">

                {/* Navbar */}
                <Header name="Course Master Data" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} activeLink="course" />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">

                        <div className="d-flex flex-wrap mb-4">
                            <Link to="/admin/course-management">
                                <button className="btn btn-outline-secondary btn-sm mr-1">
                                    Course Master Data{" "}
                                    <i className="fas fa-chevron-right fa-sm ml-2"></i>
                                </button>
                            </Link>
                            <Link to="/admin/course-management/discounts">
                                <button className="btn btn-outline-secondary btn-sm">
                                    Discounts Configuration{" "}
                                    <i className="fas fa-chevron-right fa-sm ml-2"></i>
                                </button>
                            </Link>
                        </div>

                        {/* Options */}
                        <div className="row">
                            <div className="col-md-3 mb-3 mb-md-0">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <label htmlFor="select1">
                                            Select option
                                        </label>
                                        <select
                                            name="select1"
                                            id="select1"
                                            className="form-control shadow-sm mb-3"
                                            onChange={this.handleType}
                                        >
                                            <option value="category">
                                                Categories
                                            </option>
                                            <option value="board">Board</option>
                                            <option value="types">Types</option>
                                        </select>

                                        {this.state.activeType ===
                                        "category" ? (
                                            <div>
                                                <label htmlFor="select2">
                                                    Category
                                                </label>
                                                <select
                                                    name="select2"
                                                    id="select2"
                                                    className="form-control shadow-sm mb-3"
                                                    onChange={
                                                        this.handleCategory
                                                    }
                                                >
                                                    <option value="">
                                                        Select category
                                                    </option>
                                                    <option value="degree">
                                                        Degree
                                                    </option>
                                                    <option value="competitive">
                                                        Competitive
                                                    </option>
                                                    <option value="exam">
                                                        Exam
                                                    </option>
                                                    <option value="school">
                                                        School
                                                    </option>
                                                    <option value="puc">
                                                        PUC
                                                    </option>
                                                    <option value="degree">
                                                        Degree
                                                    </option>
                                                </select>
                                                <button className="btn btn-light btn-sm btn-block mb-3">
                                                    Add +
                                                </button>
                                                <label htmlFor="select3">
                                                    Sub-category
                                                </label>
                                                <select
                                                    name="select3"
                                                    id="select3"
                                                    className="form-control shadow-sm mb-3"
                                                    onChange={
                                                        this.handleSubcategory
                                                    }
                                                >
                                                    <option value="">
                                                        Select Sub category
                                                    </option>
                                                    <option value="engineering">
                                                        Engineering
                                                    </option>
                                                    <option value="medical">
                                                        Medical
                                                    </option>
                                                    <option value="bsc">
                                                        Bsc
                                                    </option>
                                                    <option value="bcom">
                                                        Bcom
                                                    </option>
                                                </select>
                                                <button className="btn btn-light btn-sm btn-block">
                                                    Add +
                                                </button>
                                            </div>
                                        ) : (
                                            ""
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-9">
                                {/* Category Data */}
                                {this.state.activeType === "category" &&
                                this.state.activeCategory !== "" &&
                                this.state.activeSubcategory !== "" ? (
                                    <div className="row">
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="card border-primary">
                                                <div className="card-header secondary-bg text-black">
                                                    Discipline
                                                </div>
                                                <div className="card-body">
                                                    <p className="mb-2">
                                                        Electronics and
                                                        communication
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Computer science
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Info science
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Mechanical
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <button className="btn btn-light btn-sm btn-block">
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="card border-primary">
                                                <div className="card-header secondary-bg text-black">
                                                    Level
                                                </div>
                                                <div className="card-body">
                                                    <p className="mb-2">
                                                        E&C 1st semester
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        E&C 2nd semester
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        E&C 3rd semester
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        E&C 4th semester
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <button className="btn btn-light btn-sm btn-block">
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="card border-primary">
                                                <div className="card-header secondary-bg text-black">
                                                    Subject
                                                </div>
                                                <div className="card-body">
                                                    <p className="mb-2">
                                                        Digital signal
                                                        processing
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Basic Java
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        C, C++
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Strength of materials
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <button className="btn btn-light btn-sm btn-block">
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {/* Board Data */}
                                {this.state.activeType === "board" ? (
                                    <div className="row">
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="card border-primary">
                                                <div className="card-header secondary-bg text-black text-center">
                                                    Board / University
                                                </div>
                                                <div className="card-body">
                                                    <p className="mb-2">
                                                        Central board of
                                                        secondary education
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Indian certificate of
                                                        secondary education
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Karnataka secondary
                                                        education board
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Kuvempu university
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <button className="btn btn-light btn-sm btn-block">
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}

                                {/* Type Data */}
                                {this.state.activeType === "types" ? (
                                    <div className="row">
                                        <div className="col-md-4 mb-3 mb-md-0">
                                            <div className="card border-primary">
                                                <div className="card-header primary-bg text-white text-center font-weight-bold">
                                                    Course
                                                </div>
                                                <div className="card-body">
                                                    <p className="mb-2">
                                                        Premium
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Complete reference
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        limited addition
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <p className="mb-2">
                                                        Quiz and simulation exam
                                                    </p>
                                                    <div className="dropdown-divider"></div>
                                                    <button className="btn btn-light btn-sm btn-block">
                                                        Add +
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MasterData;
