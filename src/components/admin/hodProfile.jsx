import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Alert, Spinner } from "react-bootstrap";
import profilepic from "../../assets/user.png";
import watermark from "../../assets/code.jpg";
import Select from "react-select";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl";
import Header from "./navbar";
import SideNav from "./sidenav";
import Loading from "../../shared/loadingComponent";
import GroupTable from "../table/groupTable";
import Paginations from "../../shared/pagination";
import ReactSwitch from "../../shared/switchComponent";

class HodProfile extends Component {
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
            showDetailsErrorAlert: false,
            showDetailsSuccessAlert: false,
            showDetailsLoader: false,
            errorMsgDetails: "",
            showConfigErrorAlert: false,
            showConfigSuccessAlert: false,
            showConfigLoader: false,
            errorMsgConfig: "",
            is_formSubmited: false,
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
            showConfigErrorAlert: false,
            showConfigSuccessAlert: false,
            showConfigLoader: true,
        });
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
                if (result.sts) {
                    this.setState({
                        successMsgConfig: result.msg,
                        showConfigSuccessAlert: true,
                        showConfigLoader: false,
                    });
                } else {
                    this.setState({
                        errorMsgConfig: result.msg,
                        showConfigErrorAlert: true,
                        showConfigLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleDetails = () => {
        this.setState({
            showDetailsErrorAlert: false,
            showDetailsSuccessAlert: false,
            showDetailsLoader: true,
        });
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
                if (result.sts) {
                    this.setState({
                        successMsgDetails: result.msg,
                        showDetailsSuccessAlert: true,
                        showDetailsLoader: false,
                        is_formSubmited: true,
                        page_loading: true,
                    });
                } else {
                    this.setState({
                        errorMsgDetails: result.msg,
                        showDetailsErrorAlert: true,
                        showDetailsLoader: false,
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    apiDateConversion = (date) => {
        var d = new Date(date).toLocaleDateString();
        var datearray = d.split("/");
        var year = datearray[2];
        var month = datearray[0];
        var day = datearray[1];
        return `${year}-${month}-${day} 00:00:00`;
    };

    loadHodData = () => {
        fetch(`${this.url}/hod/${this.hodId}/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    hodItems: result.data,
                    permissions: result.data.permissions[0],
                    selectedCategory: result.data.permissions[0].category,
                    selectedSubcategory:
                        result.data.permissions[0].sub_category,
                    selectedDiscipline: result.data.permissions[0].discipline,
                    selectedBoard: result.data.permissions[0].board,
                    selectedValid_from: this.apiDateConversion(
                        result.data.permissions[0].valid_from
                    ),
                    selectedValid_to: this.apiDateConversion(
                        result.data.permissions[0].valid_to
                    ),
                    progressivescore: result.data.permissions[0].prog_sco_card,
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
                this.setState({
                    group: result.data.results,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "Admin Profile | IQLabs";

        this.loadHodData();
        this.loadGroupData();

        fetch(`${this.url}/data/filter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result);
                this.setState({
                    category: result.data.CATEGORY,
                    board: result.data.BOARD,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.is_formSubmited !== this.state.is_formSubmited) {
            this.loadHodData();
            this.setState({
                is_formSubmited: false,
            });
        }

        if (prevState.activeGroupPage !== this.state.activeGroupPage) {
            this.loadHodData();
        }
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
                    this.setState({
                        subcategory: result.data.sub_category,
                        subcategory_loading: false,
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
                    this.setState({
                        discipline: result.data.DISCIPLINE,
                        discipline_loading: false,
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
            selectedDiscipline: event.value,
        });
    };

    handleBoard = (event) => {
        this.setState({
            selectedBoard: event.value,
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
        this.setState({ activeGroupPage: pageNumber });
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

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}

                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-2"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
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
                                                        this.state.hodItems
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
                                                        this.props.match.params
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
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-sm btn-block">
                                                        My Student Profiles
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="col-6">
                                                <Link
                                                    to={`/admin/hod/${this.props.match.params.hodId}/teachers`}
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-sm btn-block">
                                                        My Teacher Profiles
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
                                            {this.state.hodItems.first_name}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold">
                                            Last Name
                                        </p>
                                        <p className="mb-0">
                                            {this.state.hodItems.last_name}
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
                                            {this.state.hodItems.phone_num}
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
                                            {this.state.permissions.category}
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
                                            {this.state.permissions.discipline}
                                        </p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold">
                                            Board / University
                                        </p>
                                        <p className="mb-0">
                                            {this.state.permissions.board}
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
                                                this.state.permissions.valid_to
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
                                        <p className="mb-0">Bangalore</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold">
                                            District
                                        </p>
                                        <p className="mb-0">Bangalore</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold">
                                            State
                                        </p>
                                        <p className="mb-0">Karnataka</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-4">
                                        <p className="mb-1 font-weight-bold">
                                            Country
                                        </p>
                                        <p className="mb-0">Karnataka</p>
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
                                    <div className="card-header pb-0">
                                        <h5>Groups</h5>
                                    </div>
                                    <GroupTable groupItems={this.state.group} />
                                    <div className="card-body p-3">
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
                                                <h6 className="font-weight-bold">
                                                    Details
                                                </h6>
                                            </div>
                                            <div className="col-6 text-right">
                                                <button
                                                    className="btn btn-primary btn-sm"
                                                    onClick={this.handleDetails}
                                                >
                                                    {this.state
                                                        .showDetailsLoader ? (
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
                                        <Alert
                                            variant="danger"
                                            show={
                                                this.state.showDetailsErrorAlert
                                            }
                                            onClose={() => {
                                                this.setState({
                                                    showDetailsErrorAlert: false,
                                                });
                                            }}
                                            dismissible
                                        >
                                            {this.state.errorMsgDetails}
                                        </Alert>
                                        <Alert
                                            variant="success"
                                            show={
                                                this.state
                                                    .showDetailsSuccessAlert
                                            }
                                            onClose={() => {
                                                this.setState({
                                                    showDetailsSuccessAlert: false,
                                                });
                                            }}
                                            dismissible
                                        >
                                            {this.state.successMsgDetails}
                                        </Alert>
                                        <div className="form-group">
                                            <label
                                                htmlFor="category"
                                                className="primary-text font-weight-bold"
                                            >
                                                Category
                                            </label>
                                            <Select
                                                className="basic-single"
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
                                                className="basic-single"
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
                                                className="basic-single"
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
                                                className="basic-single"
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
                                                <h6 className="font-weight-bold">
                                                    Configuration
                                                </h6>
                                            </div>
                                            <div className="col-6 text-right">
                                                <button
                                                    className="btn btn-primary btn-sm"
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
                                        <Alert
                                            variant="danger"
                                            show={
                                                this.state.showConfigErrorAlert
                                            }
                                            className="mb-2"
                                            onClose={() => {
                                                this.setState({
                                                    showConfigErrorAlert: false,
                                                });
                                            }}
                                            dismissible
                                        >
                                            {this.state.errorMsgConfig}
                                        </Alert>
                                        <Alert
                                            variant="success"
                                            show={
                                                this.state
                                                    .showConfigSuccessAlert
                                            }
                                            className="mb-2"
                                            onClose={() => {
                                                this.setState({
                                                    showConfigSuccessAlert: false,
                                                });
                                            }}
                                            dismissible
                                        >
                                            {this.state.successMsgConfig}
                                        </Alert>
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
                                                    Notes download
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
                    </div>
                </div>
            </div>
        );
    }
}

export default HodProfile;
