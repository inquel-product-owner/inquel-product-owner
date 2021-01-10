import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge } from "react-bootstrap";
import profilepic from "../../assets/user.png";
import watermark from "../../assets/code.jpg";
import Switch from "react-switch";
import Header from "./navbar";
import SideNav from "./sidenav";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import ProfileLoader from "../../shared/profileLoader";

class HodProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hodItems: [],
            group: [],
            isLoaded: false,
            permissions: [],
            category: [],
            subcategory: [],
            discipline: [],
            board: [],
            selectedCategory: "",
            selectedSubcategory: "",
            selectedDiscipline: "",
            selectedBoard: "",
            selectedValid_from: "",
            selectedValid_to: "",
            progressivescore: false,
            type1: false,
            type2: false,
            quiz: false,
            match: false,
            notesdownload: false,
            summary: false,
            directquestion: false,
            configure: false,
            simulationexam: false,
            lockingoftest: false,
            mobileapp: false,
            errortext: "",
            successtext: "",
            showSideNav: false,
        };
    }

    handleConfiguration = () => {
        const hodId = this.props.match.params.hodId;
        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        fetch(`${url}/hod/${hodId}/`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify({
                prog_sco_card: this.state.progressivescore,
                type_1_q: this.state.type1,
                type_2_q: this.state.type2,
                direct_q: this.state.directquestion,
                quiz: this.state.quiz,
                match: this.state.match,
                config_course: this.state.configure,
                sim_exam: this.state.simulationexam,
                lock_test: this.state.lockingoftest,
                copy_download: this.state.notesdownload,
                android_app: this.state.mobileapp,
                summary: this.state.summary,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts) {
                    this.setState({
                        successtext: result.msg,
                    });
                } else {
                    this.setState({
                        errortext: result.msg,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleDetails = () => {
        const hodId = this.props.match.params.hodId;
        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        fetch(`${url}/hod/${hodId}/`, {
            headers: headers,
            method: "PUT",
            body: JSON.stringify({
                category: this.state.selectedCategory,
                sub_category: this.state.selectedSubcategory,
                discipline: this.state.selectedDiscipline,
                board: this.state.selectedBoard,
                valid_from: this.state.selectedValid_from,
                valid_to: this.state.selectedValid_to,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts) {
                    this.setState({
                        successtext: result.msg,
                    });
                } else {
                    this.setState({
                        errortext: result.msg,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handlePSChange = () => {
        this.setState({
            progressivescore: !this.state.progressivescore,
        });
    };
    handleType1Change = () => {
        this.setState({
            type1: !this.state.type1,
        });
    };
    handleType2Change = () => {
        this.setState({
            type2: !this.state.type2,
        });
    };
    handleQuizChange = () => {
        this.setState({
            quiz: !this.state.quiz,
        });
    };
    handleMatchChange = () => {
        this.setState({
            match: !this.state.match,
        });
    };
    handleNotesChange = () => {
        this.setState({
            notesdownload: !this.state.notesdownload,
        });
    };
    handleSummaryChange = () => {
        this.setState({
            summary: !this.state.summary,
        });
    };
    handleDQChange = () => {
        this.setState({
            directquestion: !this.state.directquestion,
        });
    };
    handleConfigureChange = () => {
        this.setState({
            configure: !this.state.configure,
        });
    };
    handleSimulationChange = () => {
        this.setState({
            simulationexam: !this.state.simulationexam,
        });
    };
    handleLockingoftestChange = () => {
        this.setState({
            lockingoftest: !this.state.lockingoftest,
        });
    };
    handleMobileappChange = () => {
        this.setState({
            mobileapp: !this.state.mobileapp,
        });
    };

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    componentDidMount = () => {
        document.title = "Admin Profile | IQLabs";

        const hodId = this.props.match.params.hodId;
        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        Promise.all([
            fetch(`${url}/hod/${hodId}/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
            fetch(`${url}/data/filter/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
            fetch(`${url}/hod/${hodId}/group/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
        ])
            .then((result) => {
                console.log(result);
                this.setState({
                    hodItems: result[0].data,
                    permissions: result[0].data.permissions[0],
                    selectedCategory: result[0].data.permissions[0].category,
                    selectedSubcategory:
                        result[0].data.permissions[0].sub_category,
                    selectedDiscipline:
                        result[0].data.permissions[0].discipline,
                    selectedBoard: result[0].data.permissions[0].board,
                    selectedValid_from:
                        result[0].data.permissions[0].valid_from,
                    selectedValid_to: result[0].data.permissions[0].valid_to,
                    progressivescore:
                        result[0].data.permissions[0].prog_sco_card,
                    type1: result[0].data.permissions[0].type_1_q,
                    type2: result[0].data.permissions[0].type_2_q,
                    directquestion: result[0].data.permissions[0].direct_q,
                    quiz: result[0].data.permissions[0].quiz,
                    match: result[0].data.permissions[0].match,
                    configure: result[0].data.permissions[0].config_course,
                    summary: result[0].data.permissions[0].summary,
                    simulationexam: result[0].data.permissions[0].sim_exam,
                    lockingoftest: result[0].data.permissions[0].lock_test,
                    notesdownload: result[0].data.permissions[0].copy_download,
                    mobileapp: result[0].data.permissions[0].android_app,
                    category: result[1].data.CATEGORY,
                    board: result[1].data.BOARD,
                    group: result[2].data.results,
                    isLoaded: true,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleCategory = (event) => {
        this.setState({
            selectedCategory: event.target.value,
        });
        this.setState({
            subcategory: [],
            discipline: [],
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
            selectedSubcategory: event.target.value,
        });
        this.setState({
            discipline: [],
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
                `${url}/data/filter/?category=${this.state.selectedCategory}&sub_category=${event.target.value}`,
                {
                    headers: headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    this.setState({
                        discipline: result.data.DISCIPLINE,
                    });
                    console.log(result);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleDiscipline = (event) => {
        this.setState({
            selectedDiscipline: event.target.value,
        });
    };

    handleBoard = (event) => {
        this.setState({
            selectedBoard: event.target.value,
        });
    };

    handleValid_from = (event) => {
        var d = new Date(event.target.value).toLocaleDateString();
        var datearray = d.split("/");
        var year = datearray[2];
        var month = datearray[0];
        var day = datearray[1];
        this.setState({
            selectedValid_from: `${year}-${month}-${day} 00:00:00`,
        });
    };

    handleValid_to = (event) => {
        var d = new Date(event.target.value).toLocaleDateString();
        var datearray = d.split("/");
        var year = datearray[2];
        var month = datearray[0];
        var day = datearray[1];
        this.setState({
            selectedValid_to: `${year}-${month}-${day} 00:00:00`,
        });
    };

    dateConversion = (date) => {
        var d = new Date(date).toLocaleDateString();
        var datearray = d.split("/");
        return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="HOD Profile" togglenav={this.toggleSideNav} />

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
                        {this.state.isLoaded ? (
                            <>
                                {/* Back button */}
                                <button
                                    className="btn btn-primary-invert btn-sm mb-2"
                                    onClick={this.props.history.goBack}
                                >
                                    <i className="fas fa-chevron-left fa-sm"></i>{" "}
                                    Back
                                </button>

                                <div className="row">
                                    <div className="col-md-9 mb-3 mb-md-0">
                                        {/* HOD Details */}
                                        <div className="row align-items-center mb-4">
                                            <div className="col-md-6 mb-3 mb-md-0">
                                                <div className="row align-items-center">
                                                    <div className="col-3">
                                                        <img
                                                            src={
                                                                this.state
                                                                    .hodItems
                                                                    .profile_link !==
                                                                null
                                                                    ? this.state
                                                                          .hodItems
                                                                          .profile_link
                                                                    : profilepic
                                                            }
                                                            alt={`${this.state.hodItems.first_name} ${this.state.hodItems.last_name}`}
                                                            className="img-fluid profile-pic"
                                                        />
                                                    </div>
                                                    <div className="col-9 pl-0">
                                                        <h5 className="primary-text">
                                                            {`${this.state.hodItems.first_name} ${this.state.hodItems.last_name}`}
                                                        </h5>
                                                        <p className="mb-0">
                                                            {
                                                                this.props.match
                                                                    .params
                                                                    .hodId
                                                            }{" "}
                                                            {this.state.hodItems
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
                                                                    Not active
                                                                </Badge>
                                                            )}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-6">
                                                        <Link
                                                            to={`/admin/hod/${this.props.match.params.hodId}/students`}
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            <button className="btn btn-primary btn-block">
                                                                My Student
                                                                Profiles
                                                            </button>
                                                        </Link>
                                                    </div>
                                                    <div className="col-6">
                                                        <Link
                                                            to={`/admin/hod/${this.props.match.params.hodId}/teachers`}
                                                            style={{
                                                                textDecoration:
                                                                    "none",
                                                            }}
                                                        >
                                                            <button className="btn btn-primary btn-block">
                                                                My Teacher
                                                                Profiles
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-4">
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    First Name
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.hodItems
                                                            .first_name
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Last Name
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.hodItems
                                                            .last_name
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Email ID
                                                </p>
                                                <p className="mb-0">
                                                    {this.state.hodItems.email}
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Mobile
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.hodItems
                                                            .phone_num
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Office Number
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.hodItems
                                                            .secondary_phone_num
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Institution
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.permissions
                                                            .institution_name
                                                    }
                                                </p>
                                            </div>

                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Category
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.permissions
                                                            .category
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Sub category
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.permissions
                                                            .sub_category
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Discipline
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.permissions
                                                            .discipline
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Board / University
                                                </p>
                                                <p className="mb-0">
                                                    {
                                                        this.state.permissions
                                                            .board
                                                    }
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Valid From
                                                </p>
                                                <p className="mb-0">
                                                    {this.dateConversion(
                                                        this.state.permissions
                                                            .valid_from
                                                    )}
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Valid To
                                                </p>
                                                <p className="mb-0">
                                                    {this.dateConversion(
                                                        this.state.permissions
                                                            .valid_to
                                                    )}
                                                </p>
                                            </div>

                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Address
                                                </p>
                                                <p className="mb-0">XYZ</p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    City
                                                </p>
                                                <p className="mb-0">
                                                    Bangalore
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    District
                                                </p>
                                                <p className="mb-0">
                                                    Bangalore
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    State
                                                </p>
                                                <p className="mb-0">
                                                    Karnataka
                                                </p>
                                            </div>
                                            <div className="col-md-2 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Country
                                                </p>
                                                <p className="mb-0">
                                                    Karnataka
                                                </p>
                                            </div>
                                            <div className="col-md-3 col-sm-4 col-6 mb-4">
                                                <p className="mb-1 font-weight-bold">
                                                    Additional Details 1
                                                </p>
                                                <p className="mb-0">XYZ</p>
                                            </div>
                                            <div className="col-md-3 col-sm-4 col-6 mb-4">
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

                                        {/* Group Handling */}
                                        <div className="card shadow-sm mb-4">
                                            <div className="card-header">
                                                <h5>Groups</h5>
                                            </div>
                                            <div className="card-body">
                                                <div className="row">
                                                    {this.state.group.length !==
                                                    0 ? (
                                                        this.state.group.map(
                                                            (group, index) => {
                                                                return (
                                                                    <div
                                                                        className="col-md-3 mb-3"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <div className="card shadow">
                                                                            <div className="card-body text-center">
                                                                                Add
                                                                                +
                                                                            </div>
                                                                            <div className="card-footer primary-bg">
                                                                                <p className="text-white small mb-0">
                                                                                    {
                                                                                        group.group_name
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            }
                                                        )
                                                    ) : (
                                                        <div className="col-md-6">
                                                            Data not available
                                                        </div>
                                                    )}
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
                                                    <div className="col-md-3 mb-3">
                                                        <div className="card shadow">
                                                            <div className="card-body text-center">
                                                                Add +
                                                            </div>
                                                            <div className="card-footer primary-bg">
                                                                <p className="text-white small mb-0">
                                                                    Chemistry
                                                                    10th
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <div className="card shadow">
                                                            <div className="card-body text-center">
                                                                Add +
                                                            </div>
                                                            <div className="card-footer primary-bg">
                                                                <p className="text-white small mb-0">
                                                                    Chemistry
                                                                    10th
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-3 mb-3">
                                                        <div className="card shadow">
                                                            <div className="card-body text-center">
                                                                Add +
                                                            </div>
                                                            <div className="card-footer primary-bg">
                                                                <p className="text-white small mb-0">
                                                                    Chemistry
                                                                    10th
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
                                                                    Chemistry
                                                                    10th
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
                                                <div className="row align-items-center">
                                                    <div className="col-8">
                                                        <h6 className="font-weight-bold">
                                                            Details
                                                        </h6>
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={
                                                                this
                                                                    .handleDetails
                                                            }
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-body">
                                                <div className="row align-items-center mb-3">
                                                    <div className="col-md-4 mb-2 mb-md-0">
                                                        <p className="primary-text small mb-0 font-weight-bold">
                                                            Category
                                                        </p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <select
                                                            name="category"
                                                            id="category"
                                                            className="form-control form-control-sm shadow-sm"
                                                            onChange={
                                                                this
                                                                    .handleCategory
                                                            }
                                                            required
                                                        >
                                                            <option value="">
                                                                Select Category
                                                            </option>
                                                            {this.state.category.map(
                                                                (
                                                                    list,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            key={
                                                                                index
                                                                            }
                                                                            value={
                                                                                list.code
                                                                            }
                                                                        >
                                                                            {
                                                                                list.title
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center mb-3">
                                                    <div className="col-md-4 mb-2 mb-md-0">
                                                        <p className="primary-text small mb-0 font-weight-bold">
                                                            Sub Category
                                                        </p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <select
                                                            name="subcategory"
                                                            id="subcategory"
                                                            className="form-control form-control-sm shadow-sm"
                                                            onChange={
                                                                this
                                                                    .handleSubcategory
                                                            }
                                                            required
                                                        >
                                                            <option value="">
                                                                Select Sub
                                                                category
                                                            </option>
                                                            {this.state.subcategory.map(
                                                                (
                                                                    list,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            key={
                                                                                index
                                                                            }
                                                                            value={
                                                                                list.code
                                                                            }
                                                                        >
                                                                            {
                                                                                list.title
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center mb-3">
                                                    <div className="col-md-4 mb-2 mb-md-0">
                                                        <p className="primary-text small mb-0 font-weight-bold">
                                                            Discipline
                                                        </p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <select
                                                            name="discipline"
                                                            id="discipline"
                                                            className="form-control form-control-sm shadow-sm"
                                                            onChange={
                                                                this
                                                                    .handleDiscipline
                                                            }
                                                            required
                                                        >
                                                            <option value="">
                                                                Select
                                                                Discipline
                                                            </option>
                                                            {Object.entries(
                                                                this.state
                                                                    .discipline
                                                            ).map(
                                                                (
                                                                    [
                                                                        key,
                                                                        value,
                                                                    ],
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            key={
                                                                                index
                                                                            }
                                                                            value={
                                                                                key
                                                                            }
                                                                        >
                                                                            {
                                                                                value
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center mb-3">
                                                    <div className="col-md-4 mb-2 mb-md-0">
                                                        <p className="primary-text small mb-0 font-weight-bold">
                                                            Board / University
                                                        </p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <select
                                                            name="board"
                                                            id="board"
                                                            className="form-control form-control-sm shadow-sm"
                                                            onChange={
                                                                this.handleBoard
                                                            }
                                                            required
                                                        >
                                                            <option value="">
                                                                Select Board
                                                            </option>
                                                            {this.state.board.map(
                                                                (
                                                                    list,
                                                                    index
                                                                ) => {
                                                                    return (
                                                                        <option
                                                                            key={
                                                                                index
                                                                            }
                                                                            value={
                                                                                list.code
                                                                            }
                                                                        >
                                                                            {
                                                                                list.title
                                                                            }
                                                                        </option>
                                                                    );
                                                                }
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="row align-items-center mb-3">
                                                    <div className="col-md-4 mb-2 mb-md-0">
                                                        <p className="primary-text small mb-0 font-weight-bold">
                                                            Valid From
                                                        </p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <input
                                                            type="date"
                                                            name="valid_from"
                                                            id="valid_from"
                                                            className="form-control form-control-sm shadow-sm"
                                                            onChange={
                                                                this
                                                                    .handleValid_from
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row align-items-center">
                                                    <div className="col-md-4 mb-2 mb-md-0">
                                                        <p className="primary-text small mb-0 font-weight-bold">
                                                            Valid To
                                                        </p>
                                                    </div>
                                                    <div className="col-md-8">
                                                        <input
                                                            type="date"
                                                            name="valid_to"
                                                            id="valid_to"
                                                            className="form-control form-control-sm shadow-sm"
                                                            onChange={
                                                                this
                                                                    .handleValid_to
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="card-footer">
                                                <div className="dropdown-divider"></div>
                                            </div>

                                            {/* Configuration */}
                                            <div className="card-header">
                                                <div className="row align-items-center">
                                                    <div className="col-8">
                                                        <h6 className="font-weight-bold">
                                                            Configuration
                                                        </h6>
                                                    </div>
                                                    <div className="col-4 text-right">
                                                        <button
                                                            className="btn btn-primary btn-sm"
                                                            onClick={
                                                                this
                                                                    .handleConfiguration
                                                            }
                                                        >
                                                            Save
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
                                                            checked={
                                                                this.state
                                                                    .progressivescore
                                                            }
                                                            onChange={
                                                                this
                                                                    .handlePSChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="progressivescore"
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
                                                            checked={
                                                                this.state.type1
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleType1Change
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="type1"
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
                                                            checked={
                                                                this.state.type2
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleType2Change
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="type2"
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
                                                            checked={
                                                                this.state.quiz
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleQuizChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="quiz"
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
                                                            checked={
                                                                this.state.match
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleMatchChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="match"
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
                                                            checked={
                                                                this.state
                                                                    .notesdownload
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleNotesChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="notesdownload"
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
                                                            checked={
                                                                this.state
                                                                    .summary
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleSummaryChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="summary"
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
                                                            checked={
                                                                this.state
                                                                    .directquestion
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleDQChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="directquestion"
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
                                                            checked={
                                                                this.state
                                                                    .configure
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleConfigureChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="configure"
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
                                                            checked={
                                                                this.state
                                                                    .simulationexam
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleSimulationChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="simulationexam"
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
                                                            checked={
                                                                this.state
                                                                    .lockingoftest
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleLockingoftestChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="lockingoftest"
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
                                                            checked={
                                                                this.state
                                                                    .mobileapp
                                                            }
                                                            onChange={
                                                                this
                                                                    .handleMobileappChange
                                                            }
                                                            onColor="#efd2ac"
                                                            onHandleColor="#621012"
                                                            handleDiameter={12}
                                                            uncheckedIcon={
                                                                false
                                                            }
                                                            checkedIcon={false}
                                                            boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                            activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                            height={18}
                                                            width={35}
                                                            className="react-switch"
                                                            name="mobileapp"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <ProfileLoader />
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default HodProfile;
