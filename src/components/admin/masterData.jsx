import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Link } from "react-router-dom";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";

class MasterData extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            activeType: "category",
            activeCategory: "",
            activeSubcategory: "",
            category: [],
            subcategory: [],
            discipline: [],
            levels: [],
            subjects: [],
            board: [],
            type: [],
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

    componentDidMount = () => {
        document.title = "Admin Master Data | IQLabs";

        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        fetch(`${url}/data/filter/`, {
            headers: headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    category: result.data.CATEGORY,
                    board: result.data.BOARD,
                    type: result.data.TYPE,
                    activeCategory: "",
                    activeSubcategory: "",
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleCategory = (event) => {
        this.setState({
            activeCategory: event.target.value,
        });
        this.setState({
            subcategory: [],
            activeSubcategory: "",
        });

        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        if (event.target.value !== "") {
            fetch(`${url}/data/filter/?category=${event.target.value}`, {
                headers: headers,
                method: "GET",
            })
                .then((res) => res.json())
                .then((result) => {
                    this.setState({
                        subcategory: result.data.sub_category,
                    });
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleSubcategory = (event) => {
        this.setState({
            activeSubcategory: event.target.value,
        });

        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        if (event.target.value !== "") {
            fetch(
                `${url}/data/filter/?category=${this.state.activeCategory}&sub_category=${event.target.value}`,
                {
                    headers: headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    this.setState({
                        discipline: result.data.DISCIPLINE,
                        levels: result.data.LEVELS,
                        subjects: result.data.SUBJECTS,
                    });
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name="Course Master Data"
                    togglenav={this.toggleSideNav}
                />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} activeLink="course" />

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
                                                        Select Category
                                                    </option>
                                                    {this.state.category.map(
                                                        (list, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        list.code
                                                                    }
                                                                >
                                                                    {list.title}
                                                                </option>
                                                            );
                                                        }
                                                    )}
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
                                                    {this.state.subcategory.map(
                                                        (list, index) => {
                                                            return (
                                                                <option
                                                                    key={index}
                                                                    value={
                                                                        list.code
                                                                    }
                                                                >
                                                                    {list.title}
                                                                </option>
                                                            );
                                                        }
                                                    )}
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
                                                    {this.state.discipline
                                                        .length !== 0 ? (
                                                        Object.values(
                                                            this.state
                                                                .discipline
                                                        ).map((list, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    <p className="mb-2">
                                                                        {list}
                                                                    </p>
                                                                    <div className="dropdown-divider"></div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
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
                                                    {this.state.levels
                                                        .length !== 0 ? (
                                                        Object.values(
                                                            this.state.levels
                                                        ).map((list, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    <p className="mb-2">
                                                                        {list}
                                                                    </p>
                                                                    <div className="dropdown-divider"></div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
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
                                                    {this.state.subjects
                                                        .length !== 0 ? (
                                                        Object.values(
                                                            this.state.subjects
                                                        ).map((list, index) => {
                                                            return (
                                                                <div
                                                                    key={index}
                                                                >
                                                                    <p className="mb-2">
                                                                        {list}
                                                                    </p>
                                                                    <div className="dropdown-divider"></div>
                                                                </div>
                                                            );
                                                        })
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
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
                                                    {this.state.board.length !==
                                                    0 ? (
                                                        this.state.board.map(
                                                            (list, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <p className="mb-2">
                                                                            {
                                                                                list.title
                                                                            }
                                                                        </p>
                                                                        <div className="dropdown-divider"></div>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
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
                                                    {this.state.type.length !==
                                                    0 ? (
                                                        this.state.type.map(
                                                            (list, index) => {
                                                                return (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <p className="mb-2">
                                                                            {
                                                                                list.title
                                                                            }
                                                                        </p>
                                                                        <div className="dropdown-divider"></div>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <p>
                                                            Data not available
                                                        </p>
                                                    )}
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
