import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Link } from "react-router-dom";
import Select from "react-select";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Loading from "../sharedComponents/loader";
import AlertBox from "../sharedComponents/alert";

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
            subcategory_loading: false,

            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: false,
        };
        this.url = baseUrl + adminPathUrl;
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    handleType = (event) => {
        this.setState({
            activeType: event.value,
            activeCategory: "",
            activeSubcategory: "",
        });
    };

    componentDidMount = () => {
        document.title = "Master Data - Admin | IQLabs";

        fetch(`${this.url}/data/filter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                if (result.sts === true) {
                    this.setState({
                        category: result.data.CATEGORY,
                        board: result.data.BOARD,
                        type: result.data.TYPE,
                        activeCategory: "",
                        activeSubcategory: "",
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                    });
                }
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleCategory = (event) => {
        this.setState({
            activeCategory: event.value,
            subcategory: [],
            discipline: [],
            activeSubcategory: "",
            subcategory_loading: true,
        });

        if (event.value !== "") {
            fetch(`${this.url}/data/filter/?category=${event.value}`, {
                headers: this.headers,
                method: "GET",
            })
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            subcategory: result.data.sub_category,
                            subcategory_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                        });
                    }
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleSubcategory = (event) => {
        this.setState({
            activeSubcategory: event.value,
            page_loading: true,
        });

        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        if (event.value !== "") {
            fetch(
                `${url}/data/filter/?category=${this.state.activeCategory}&sub_category=${event.value}`,
                {
                    headers: headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    if (result.sts === true) {
                        this.setState({
                            discipline: result.data.DISCIPLINE,
                            levels: result.data.LEVELS,
                            subjects: result.data.SUBJECTS,
                            page_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            page_loading: false,
                        });
                    }
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

                {/* ALert message */}
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

                        <div className="row align-items-center mb-3">
                            <div className="col-md-6">
                                {/* Breadcrumb */}
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/admin">
                                                <i className="fas fa-home fa-sm"></i>
                                            </Link>
                                        </li>
                                        <li className="breadcrumb-item active">
                                            Master Data
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                            <div className="col-md-6 text-right">
                                <Link to={`${this.props.match.url}/discounts`}>
                                    <button className="btn btn-outline-secondary btn-sm shadow-none">
                                        Discounts Configuration{" "}
                                        <i className="fas fa-chevron-right fa-sm ml-2"></i>
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Options */}
                        <div className="row">
                            <div className="col-md-3 mb-3 mb-md-0">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="select1">
                                                Option
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                placeholder="Select option"
                                                isSearchable={true}
                                                name="option"
                                                options={[
                                                    {
                                                        label: "Categories",
                                                        value: "category",
                                                    },
                                                    {
                                                        label: "Board",
                                                        value: "board",
                                                    },
                                                    {
                                                        label: "Types",
                                                        value: "types",
                                                    },
                                                ]}
                                                onChange={this.handleType}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="category">
                                                Category
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                placeholder="Select category"
                                                isDisabled={
                                                    this.state.activeType ===
                                                    "category"
                                                        ? false
                                                        : true
                                                }
                                                isSearchable={true}
                                                name="category"
                                                options={this.state.category.map(
                                                    function (list) {
                                                        return {
                                                            value: list.code,
                                                            label: list.title,
                                                        };
                                                    }
                                                )}
                                                onChange={this.handleCategory}
                                                required
                                            />
                                        </div>

                                        <button className="btn btn-light btn-sm btn-block border-secondary shadow-none mb-2">
                                            Add +
                                        </button>

                                        <div className="form-group">
                                            <label htmlFor="select3">
                                                Sub Category
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                placeholder="Select subcategory"
                                                isDisabled={
                                                    this.state
                                                        .activeCategory === ""
                                                        ? true
                                                        : false
                                                }
                                                isLoading={
                                                    this.state
                                                        .subcategory_loading
                                                        ? true
                                                        : false
                                                }
                                                isSearchable={true}
                                                name="subcategory"
                                                options={this.state.subcategory.map(
                                                    function (list) {
                                                        return {
                                                            value: list.code,
                                                            label: list.title,
                                                        };
                                                    }
                                                )}
                                                onChange={
                                                    this.handleSubcategory
                                                }
                                                required
                                            />
                                        </div>

                                        <button className="btn btn-light btn-sm btn-block border-secondary shadow-none">
                                            Add +
                                        </button>
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
                                                    <button className="btn btn-light btn-sm btn-block border-secondary shadow-none">
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
                                                    <button className="btn btn-light btn-sm btn-block border-secondary shadow-none">
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
                                                    <button className="btn btn-light btn-sm btn-block border-secondary shadow-none">
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
                                                    <button className="btn btn-light btn-sm btn-block border-secondary shadow-none">
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
                                                    <button className="btn btn-light btn-sm btn-block border-secondary shadow-none">
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
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default MasterData;
