import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Spinner } from "react-bootstrap";
import profilepic from "../../assets/user-v1.png";
import Select from "react-select";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import { paginationCount } from "../../shared/globalValues.js";
import Header from "./navbar";
import SideNav from "./sidenav";
import Loading from "../shared/loader";
import GroupTable from "../table/group";
import Paginations from "../shared/pagination";
import ReactSwitch from "../shared/switchComponent";
import dateFormat from "dateformat";
import AlertBox from "../shared/alert";

class AdminHodProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeGroupPage: 1,
            totalGroupCount: 0,
            hodItems: [],
            group: [],
            page_loading: true,
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

            showSideNav: false,
            subcategory_loading: false,
            discipline_loading: false,
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showConfigLoader: false,
        };
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
        this.url = baseUrl + adminPathUrl;
        this.hodId = this.props.match.params.hodId;
    }

    handleConfiguration = () => {
        this.setState({
            showSuccessAlert: false,
            showErrorAlert: false,
            showConfigLoader: true,
        });

        if (this.state.hodItems.is_active) {
            fetch(`${this.url}/hod/${this.hodId}/`, {
                headers: this.headers,
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
                    if (result.sts === true) {
                        this.setState(
                            {
                                successMsg: result.msg,
                                showSuccessAlert: true,
                                showConfigLoader: false,
                                page_loading: true,
                            },
                            () => {
                                this.loadHodData();
                            }
                        );
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            showConfigLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                errorMsg: "Can't update inactive HOD!",
                showErrorAlert: true,
                showConfigLoader: false,
            });
        }
    };

    handleDetails = () => {
        this.setState({
            showErrorAlert: false,
            showSuccessAlert: false,
            page_loading: true,
        });

        if (this.state.hodItems.is_active) {
            fetch(`${this.url}/hod/${this.hodId}/`, {
                headers: this.headers,
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
                    if (result.sts === true) {
                        this.setState(
                            {
                                successMsg: result.msg,
                                showSuccessAlert: true,
                                page_loading: true,
                            },
                            () => {
                                this.loadHodData();
                            }
                        );
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                            page_loading: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            this.setState({
                errorMsg: "Can't update inactive HOD!",
                showErrorAlert: true,
                page_loading: false,
            });
        }
    };

    loadHodData = () => {
        fetch(`${this.url}/hod/${this.hodId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        hodItems: result.data,
                        permissions: result.data.permissions[0],
                        selectedCategory: result.data.permissions[0].category,
                        selectedSubcategory:
                            result.data.permissions[0].sub_category,
                        selectedDiscipline:
                            result.data.permissions[0].discipline,
                        selectedBoard: result.data.permissions[0].board,
                        selectedValid_from: dateFormat(
                            result.data.permissions[0].valid_from,
                            "yyyy-mm-dd '00:00:00'"
                        ),
                        selectedValid_to: dateFormat(
                            result.data.permissions[0].valid_to,
                            "yyyy-mm-dd '00:00:00'"
                        ),
                        progressivescore:
                            result.data.permissions[0].prog_sco_card,
                        type1: result.data.permissions[0].type_1_q,
                        type2: result.data.permissions[0].type_2_q,
                        directquestion: result.data.permissions[0].direct_q,
                        quiz: result.data.permissions[0].quiz,
                        match: result.data.permissions[0].match,
                        configure: result.data.permissions[0].config_course,
                        summary: result.data.permissions[0].summary,
                        simulationexam: result.data.permissions[0].sim_exam,
                        lockingoftest: result.data.permissions[0].lock_test,
                        notesdownload: result.data.permissions[0].copy_download,
                        mobileapp: result.data.permissions[0].android_app,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    loadGroupData = () => {
        fetch(
            `${this.url}/hod/${this.hodId}/group/?page=${this.state.activeGroupPage}`,
            {
                headers: this.headers,
                method: "GET",
            }
        )
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        group: result.data.results,
                        totalGroupCount: result.data.count,
                        page_loading: false,
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "HOD Profile - Admin | IQLabs";

        this.loadHodData();
        this.loadGroupData();

        fetch(`${this.url}/data/filter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                if (result.sts === true) {
                    this.setState({
                        category: result.data.CATEGORY,
                        board: result.data.BOARD,
                    });
                } else {
                    this.setState({
                        errorMsg: result.detail ? result.detail : result.msg,
                        showErrorAlert: true,
                        page_loading: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleCategory = (event) => {
        this.setState({
            selectedCategory: event.value,
        });
        this.setState({
            subcategory: [],
            discipline: [],
            selectedSubcategory: "",
            selectedDiscipline: "",
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
            selectedSubcategory: event.value,
        });
        this.setState({
            discipline: [],
            selectedDiscipline: "",
            discipline_loading: true,
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/data/filter/?category=${this.state.selectedCategory}&sub_category=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.sts === true) {
                        this.setState({
                            discipline: result.data.DISCIPLINE,
                            discipline_loading: false,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.detail
                                ? result.detail
                                : result.msg,
                            showErrorAlert: true,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    handleDiscipline = (event) => {
        this.setState({
            selectedDiscipline: event.value,
        });
    };

    handleBoard = (event) => {
        this.setState({
            selectedBoard: event.value,
        });
    };

    handleValid_from = (event) => {
        this.setState({
            selectedValid_from: `${dateFormat(
                event.target.value,
                "yyyy-mm-dd"
            )} 00:00:00`,
        });
    };

    handleValid_to = (event) => {
        this.setState({
            selectedValid_to: `${dateFormat(
                event.target.value,
                "yyyy-mm-dd"
            )} 00:00:00`,
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

    handleGroupPageChange(pageNumber) {
        this.setState(
            { activeGroupPage: pageNumber, page_loading: true },
            () => {
                this.loadGroupData();
            }
        );
    }

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

                {/* Alert message */}
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

                        {/* Breadcrumb */}
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb mb-3">
                                <li className="breadcrumb-item">
                                    <Link to="/admin">
                                        <i className="fas fa-home fa-sm"></i>
                                    </Link>
                                </li>
                                <li className="breadcrumb-item">
                                    <Link
                                        to="#"
                                        onClick={this.props.history.goBack}
                                    >
                                        HOD
                                    </Link>
                                </li>
                                <li className="breadcrumb-item active">
                                    Profile
                                </li>
                            </ol>
                        </nav>

                        <div className="row">
                            <div className="col-md-9 mb-3 mb-md-0">
                                {/* HOD Details */}
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <div className="row align-items-center">
                                            <div className="col-3">
                                                <img
                                                    src={
                                                        this.state.hodItems
                                                            .length !== 0
                                                            ? this.state
                                                                  .hodItems
                                                                  .profile_link !==
                                                              null
                                                                ? this.state
                                                                      .hodItems
                                                                      .profile_link
                                                                : profilepic
                                                            : profilepic
                                                    }
                                                    alt={
                                                        this.state.hodItems
                                                            .full_name
                                                    }
                                                    className="img-fluid profile-pic"
                                                />
                                            </div>
                                            <div className="col-9 pl-0">
                                                <h5 className="primary-text">
                                                    {this.state.hodItems
                                                        .length !== 0
                                                        ? this.state.hodItems
                                                              .full_name !== ""
                                                            ? this.state
                                                                  .hodItems
                                                                  .full_name
                                                            : this.state
                                                                  .hodItems
                                                                  .username
                                                        : ""}
                                                </h5>
                                                <p className="mb-0">
                                                    {this.state.hodItems
                                                        .length !== 0 ? (
                                                        this.state.hodItems
                                                            .is_active ? (
                                                            <Badge variant="success">
                                                                Active
                                                            </Badge>
                                                        ) : (
                                                            <Badge variant="danger">
                                                                Not active
                                                            </Badge>
                                                        )
                                                    ) : (
                                                        ""
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <Link
                                                    to={`${this.props.match.url}/students`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-sm btn-block shadow-none">
                                                        My Student Profiles
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="col-6">
                                                <Link
                                                    to={`${this.props.match.url}/teacher`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-sm btn-block shadow-none">
                                                        My Teacher Profiles
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            First Name
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.hodItems.first_name}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Last Name
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.hodItems.last_name}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Email ID
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.hodItems.email}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Mobile
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.hodItems.country_code}
                                            {this.state.hodItems.phone_num}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Office Number
                                        </p>
                                        <p className="text-break mb-0">
                                            {
                                                this.state.hodItems
                                                    .secondary_phone_num
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Institution
                                        </p>
                                        <p className="text-break mb-0">
                                            {
                                                this.state.permissions
                                                    .institution_name
                                            }
                                        </p>
                                    </div>

                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Category
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.permissions.category}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Sub category
                                        </p>
                                        <p className="text-break mb-0">
                                            {
                                                this.state.permissions
                                                    .sub_category
                                            }
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Discipline
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.permissions.discipline}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Board / University
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.permissions.board}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Valid From
                                        </p>
                                        <p className="text-break mb-0">
                                            {dateFormat(
                                                this.state.permissions
                                                    .valid_from,
                                                "dd/mm/yyyy"
                                            )}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Valid To
                                        </p>
                                        <p className="text-break mb-0">
                                            {dateFormat(
                                                this.state.permissions.valid_to,
                                                "dd/mm/yyyy"
                                            )}
                                        </p>
                                    </div>

                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Address
                                        </p>
                                        <p className="text-break mb-0">{this.state.hodItems.address}</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            City
                                        </p>
                                        <p className="text-break mb-0">{this.state.hodItems.city}</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            District
                                        </p>
                                        <p className="text-break mb-0">{this.state.hodItems.district}</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            State
                                        </p>
                                        <p className="text-break mb-0">{this.state.hodItems.state}</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Country
                                        </p>
                                        <p className="text-break mb-0">{this.state.hodItems.country}</p>
                                    </div>
                                    <div className="col-md-3 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Additional Details 1
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.hodItems
                                                .additional_details_1}
                                        </p>
                                    </div>
                                    <div className="col-md-3 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold-600">
                                            Additional Details 2
                                        </p>
                                        <p className="text-break mb-0">
                                            {this.state.hodItems
                                                .additional_details_2}
                                        </p>
                                    </div>
                                    <div className="col-md-3 col-sm-6 col-6">
                                        <p className="mb-1 font-weight-bold-600">
                                            Watermark Image
                                        </p>
                                        <img
                                            src={
                                                this.state.hodItems
                                                    .watermark_image
                                            }
                                            alt={this.state.hodItems.full_name}
                                            className="img-fluid"
                                        />
                                    </div>
                                </div>

                                {/* Group Handling */}
                                <div className="card shadow-sm mb-4">
                                    <div className="card-header pb-0">
                                        <h5>Groups</h5>
                                    </div>
                                    <GroupTable
                                        groupItems={this.state.group}
                                        path="hod"
                                        view={false}
                                        check={false}
                                    />
                                    <div className="card-body p-3">
                                        {this.state.totalGroupCount >
                                        paginationCount ? (
                                            <Paginations
                                                activePage={
                                                    this.state.activeGroupPage
                                                }
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
                                                            Chemistry 10th
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
                                                            Chemistry 10th
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
                                    <div className="card-header pb-0">
                                        <div className="row align-items-center">
                                            <div className="col-6">
                                                <h6 className="font-weight-bold mb-0">
                                                    Details
                                                </h6>
                                            </div>
                                            <div className="col-6 text-right">
                                                <button
                                                    className="btn btn-primary btn-sm shadow-none"
                                                    onClick={this.handleDetails}
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label
                                                htmlFor="category"
                                                className="primary-text font-weight-bold"
                                            >
                                                Category
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                placeholder="Select category"
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
                                        <div className="form-group">
                                            <label
                                                htmlFor="subcategory"
                                                className="primary-text font-weight-bold"
                                            >
                                                Sub Category
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                placeholder="Select subcategory"
                                                isDisabled={
                                                    this.state
                                                        .selectedCategory === ""
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
                                        <div className="form-group">
                                            <label
                                                htmlFor="discipline"
                                                className="primary-text font-weight-bold"
                                            >
                                                Discipline
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                placeholder="Select discipline"
                                                isDisabled={
                                                    this.state
                                                        .selectedSubcategory ===
                                                    ""
                                                        ? true
                                                        : false
                                                }
                                                isLoading={
                                                    this.state
                                                        .discipline_loading
                                                        ? true
                                                        : false
                                                }
                                                isSearchable={true}
                                                name="discipline"
                                                options={Object.entries(
                                                    this.state.discipline
                                                ).map(([key, value]) => {
                                                    return {
                                                        value: key,
                                                        label: value,
                                                    };
                                                })}
                                                onChange={this.handleDiscipline}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label
                                                htmlFor="board"
                                                className="primary-text font-weight-bold"
                                            >
                                                Board / University
                                            </label>
                                            <Select
                                                className="basic-single form-shadow"
                                                placeholder="Select board"
                                                isSearchable={true}
                                                name="board"
                                                options={this.state.board.map(
                                                    function (list) {
                                                        return {
                                                            value: list.code,
                                                            label: list.title,
                                                        };
                                                    }
                                                )}
                                                onChange={this.handleBoard}
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label
                                                htmlFor="valid_from"
                                                className="primary-text font-weight-bold"
                                            >
                                                Valid From
                                            </label>
                                            <input
                                                type="date"
                                                name="valid_from"
                                                id="valid_from"
                                                className="form-control form-shadow"
                                                onChange={this.handleValid_from}
                                            />
                                        </div>
                                        <div className="form-group mb-0">
                                            <label
                                                htmlFor="valid_to"
                                                className="primary-text font-weight-bold"
                                            >
                                                Valid To
                                            </label>
                                            <input
                                                type="date"
                                                name="valid_to"
                                                id="valid_to"
                                                className="form-control form-shadow"
                                                onChange={this.handleValid_to}
                                            />
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <div className="dropdown-divider"></div>
                                    </div>

                                    {/* Configuration */}
                                    <div className="card-header pb-0">
                                        <div className="row align-items-center">
                                            <div className="col-6">
                                                <h6 className="font-weight-bold mb-0">
                                                    Configuration
                                                </h6>
                                            </div>
                                            <div className="col-6 text-right">
                                                <button
                                                    className="btn btn-primary btn-sm shadow-none"
                                                    onClick={
                                                        this.handleConfiguration
                                                    }
                                                >
                                                    {this.state
                                                        .showConfigLoader ? (
                                                        <Spinner
                                                            as="span"
                                                            animation="border"
                                                            size="sm"
                                                            role="status"
                                                            aria-hidden="true"
                                                            className="mr-2"
                                                        />
                                                    ) : (
                                                        ""
                                                    )}
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
                                                <ReactSwitch
                                                    checked={
                                                        this.state
                                                            .progressivescore
                                                    }
                                                    onChange={
                                                        this.handlePSChange
                                                    }
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
                                                <ReactSwitch
                                                    checked={this.state.type1}
                                                    onChange={
                                                        this.handleType1Change
                                                    }
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
                                                <ReactSwitch
                                                    checked={this.state.type2}
                                                    onChange={
                                                        this.handleType2Change
                                                    }
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
                                                <ReactSwitch
                                                    checked={this.state.quiz}
                                                    onChange={
                                                        this.handleQuizChange
                                                    }
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
                                                <ReactSwitch
                                                    checked={this.state.match}
                                                    onChange={
                                                        this.handleMatchChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Notes
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <ReactSwitch
                                                    checked={
                                                        this.state.notesdownload
                                                    }
                                                    onChange={
                                                        this.handleNotesChange
                                                    }
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
                                                <ReactSwitch
                                                    checked={this.state.summary}
                                                    onChange={
                                                        this.handleSummaryChange
                                                    }
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
                                                <ReactSwitch
                                                    checked={
                                                        this.state
                                                            .directquestion
                                                    }
                                                    onChange={
                                                        this.handleDQChange
                                                    }
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
                                                <ReactSwitch
                                                    checked={
                                                        this.state.configure
                                                    }
                                                    onChange={
                                                        this
                                                            .handleConfigureChange
                                                    }
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
                                                <ReactSwitch
                                                    checked={
                                                        this.state
                                                            .simulationexam
                                                    }
                                                    onChange={
                                                        this
                                                            .handleSimulationChange
                                                    }
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
                                                <ReactSwitch
                                                    checked={
                                                        this.state.lockingoftest
                                                    }
                                                    onChange={
                                                        this
                                                            .handleLockingoftestChange
                                                    }
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
                                                <ReactSwitch
                                                    checked={
                                                        this.state.mobileapp
                                                    }
                                                    onChange={
                                                        this
                                                            .handleMobileappChange
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
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

export default AdminHodProfile;
