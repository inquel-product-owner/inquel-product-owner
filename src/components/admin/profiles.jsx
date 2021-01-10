import React, { Component } from "react";
import { Tabs, Tab, Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl.js";
import Switch from "react-switch";
import Select from "react-select";
import Header from "./navbar";
import SideNav from "./sidenav";
import HODTable from "../table/hodTable";
import Loading from "../../shared/loadingComponent";
import StudentTable from "../table/studentTable";
import Paginations from "../../shared/pagination";

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeHODPage: 1,
            activeStudentPage: 1,
            totalHODCount: 0,
            totalStudentCount: 0,
            modalShow: false,
            showSideNav: false,
            activeTab: "hod",
            hodItems: [],
            studentItems: [],
            is_loading: true,
            email: "",
            username: "",
            password: "",
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
            errorMsg: "",
            successMsg: "",
            showErrorAlert: false,
            showSuccessAlert: false,
            showLoader: false,
            is_formSubmited: false,
            subcategory_loading: false,
            discipline_loading: false,
        };
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
        this.url = baseUrl + adminPathUrl;
        this.gridRef = React.createRef();
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    toggleModal = () => {
        this.setState({
            modalShow: !this.state.modalShow,
        });
    };

    handleSelect = (key) => {
        this.setState({ activeTab: key });
        this.props.history.push({ hash: key });
    };

    dateConversion = (date) => {
        var newDate = new Date(date).toLocaleDateString();
        var datearray = newDate.split("/");
        return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
    };

    // Fetch HOD List
    loadHodData = () => {
        fetch(`${this.url}/hod/?page=${this.state.activeHODPage}`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    hodItems: result.data.results,
                    totalHODCount: result.data.count,
                    is_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Fetch Students list
    loadStudentData = () => {
        fetch(`${this.url}/student/?page=${this.state.activeStudentPage}`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    studentItems: result.data.results,
                    totalStudentCount: result.data.count,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Fetch Category & Board Data
    loadCategoryData = () => {
        fetch(`${this.url}/data/filter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    category: result.data.CATEGORY,
                    board: result.data.BOARD,
                    selectedCategory: "",
                    selectedSubcategory: "",
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        document.title = "Admin Profile | IQLabs";

        this.loadHodData();
        this.loadStudentData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.is_formSubmited !== this.state.is_formSubmited) {
            this.loadHodData();
            this.setState({
                is_formSubmited: false,
            });
        }

        if (prevState.activeHODPage !== this.state.activeHODPage) {
            this.loadHodData();
        }

        if (prevState.activeStudentPage !== this.state.activeStudentPage) {
            this.loadStudentData();
        }

        if (this.state.modalShow && this.state.category.length === 0) {
            this.loadCategoryData();
        }
    };

    triggerDelete = () => {
        this.gridRef.current.showConsole();
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
        if (this.state.password.length < 12) {
            this.setState({
                errorMsg: "Password is too short",
                showErrorAlert: true,
                showLoader: false,
            });
        } else {
            fetch(`${this.url}/create/hod/`, {
                headers: this.headers,
                method: "POST",
                body: JSON.stringify({
                    institute: {
                        hods: {
                            hod1: {
                                email: this.state.email,
                                username: this.state.username,
                                password: this.state.password,
                                category: this.state.selectedCategory,
                                sub_category: this.state.selectedSubcategory,
                                discipline: this.state.selectedDiscipline,
                                board: this.state.selectedBoard,
                                valid_from: this.state.selectedValid_from,
                                valid_to: this.state.selectedValid_to,
                                prog_sco_card: this.state.progressivescore,
                                type_1_q: this.state.type1,
                                type_2_q: this.state.type2,
                                direct_q: this.state.directquestion,
                                quiz: this.state.quiz,
                                match: this.state.match,
                                config_course: this.state.configure,
                                summary: this.state.summary,
                                sim_exam: this.state.simulationexam,
                                lock_test: this.state.lockingoftest,
                                copy_download: this.state.notesdownload,
                                android_app: this.state.mobileapp,
                            },
                        },
                    },
                }),
            })
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    if (result.sts) {
                        this.setState({
                            successMsg: result.msg,
                            showSuccessAlert: true,
                            showLoader: false,
                            is_formSubmited: true,
                        });
                    } else {
                        this.setState({
                            errorMsg: result.msg,
                            showErrorAlert: true,
                            showLoader: false,
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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

    handleHODPageChange(pageNumber) {
        this.setState({ activeHODPage: pageNumber });
    }

    handleStudentPageChange(pageNumber) {
        this.setState({ activeStudentPage: pageNumber });
    }

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header
                    name={
                        this.state.activeTab === "hod"
                            ? "HOD Profiles"
                            : "Student Profiles"
                    }
                    togglenav={this.toggleSideNav}
                />

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
                        {this.state.is_loading ? (
                            <Loading />
                        ) : (
                            <>
                                {this.state.modalShow ? (
                                    <Modal
                                        show={this.state.modalShow}
                                        onHide={this.toggleModal}
                                        size="lg"
                                        aria-labelledby="contained-modal-title-vcenter"
                                        centered
                                    >
                                        <Modal.Header
                                            closeButton
                                            className="primary-text h5"
                                        >
                                            Add HOD
                                        </Modal.Header>
                                        <Modal.Body>
                                            <Alert
                                                variant="danger"
                                                show={this.state.showErrorAlert}
                                                onClose={() => {
                                                    this.setState({
                                                        showErrorAlert: false,
                                                    });
                                                }}
                                                dismissible
                                            >
                                                {this.state.errorMsg}
                                            </Alert>
                                            <Alert
                                                variant="success"
                                                show={
                                                    this.state.showSuccessAlert
                                                }
                                                onClose={() => {
                                                    this.setState({
                                                        showSuccessAlert: false,
                                                    });
                                                }}
                                                dismissible
                                            >
                                                {this.state.successMsg}
                                            </Alert>
                                            <form
                                                action=""
                                                onSubmit={this.handleSubmit}
                                                autoComplete="off"
                                            >
                                                <div className="row mb-2">
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="email">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            name="email"
                                                            id="email"
                                                            className="form-control form-shadow"
                                                            placeholder="Enter email"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            value={
                                                                this.state.email
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="username">
                                                            Username
                                                        </label>
                                                        <input
                                                            type="text"
                                                            name="username"
                                                            id="username"
                                                            className="form-control form-shadow"
                                                            placeholder="Enter username"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            value={
                                                                this.state
                                                                    .username
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group col-md-4">
                                                        <label htmlFor="password">
                                                            Password
                                                        </label>
                                                        <input
                                                            type="password"
                                                            name="password"
                                                            id="password"
                                                            className="form-control form-shadow"
                                                            placeholder="Enter password"
                                                            onChange={
                                                                this
                                                                    .handleChange
                                                            }
                                                            value={
                                                                this.state
                                                                    .password
                                                            }
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div className="row mb-2">
                                                    <div className="col-md-6">
                                                        <h6 className="primary-text mb-3">
                                                            Details
                                                        </h6>

                                                        <div className="form-group">
                                                            <label htmlFor="category">
                                                                Category
                                                            </label>
                                                            <Select
                                                                className="basic-single"
                                                                placeholder="Select category"
                                                                isSearchable={
                                                                    true
                                                                }
                                                                name="category"
                                                                options={this.state.category.map(
                                                                    function (
                                                                        list
                                                                    ) {
                                                                        return {
                                                                            value:
                                                                                list.code,
                                                                            label:
                                                                                list.title,
                                                                        };
                                                                    }
                                                                )}
                                                                onChange={
                                                                    this
                                                                        .handleCategory
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="subcategory">
                                                                Sub Category
                                                            </label>
                                                            <Select
                                                                className="basic-single"
                                                                placeholder="Select subcategory"
                                                                isDisabled={
                                                                    this.state
                                                                        .selectedCategory ===
                                                                    ""
                                                                        ? true
                                                                        : false
                                                                }
                                                                isLoading={
                                                                    this.state
                                                                        .subcategory_loading
                                                                        ? true
                                                                        : false
                                                                }
                                                                isSearchable={
                                                                    true
                                                                }
                                                                name="subcategory"
                                                                options={this.state.subcategory.map(
                                                                    function (
                                                                        list
                                                                    ) {
                                                                        return {
                                                                            value:
                                                                                list.code,
                                                                            label:
                                                                                list.title,
                                                                        };
                                                                    }
                                                                )}
                                                                onChange={
                                                                    this
                                                                        .handleSubcategory
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="discipline">
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
                                                                isSearchable={
                                                                    true
                                                                }
                                                                name="discipline"
                                                                options={Object.entries(
                                                                    this.state
                                                                        .discipline
                                                                ).map(
                                                                    ([
                                                                        key,
                                                                        value,
                                                                    ]) => {
                                                                        return {
                                                                            value: key,
                                                                            label: value,
                                                                        };
                                                                    }
                                                                )}
                                                                onChange={
                                                                    this
                                                                        .handleDiscipline
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="board">
                                                                Board /
                                                                University
                                                            </label>
                                                            <Select
                                                                className="basic-single"
                                                                placeholder="Select board"
                                                                value={null}
                                                                isSearchable={
                                                                    true
                                                                }
                                                                name="board"
                                                                options={this.state.board.map(
                                                                    function (
                                                                        list
                                                                    ) {
                                                                        return {
                                                                            value:
                                                                                list.code,
                                                                            label:
                                                                                list.title,
                                                                        };
                                                                    }
                                                                )}
                                                                onChange={
                                                                    this
                                                                        .handleBoard
                                                                }
                                                                required
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="valid_from">
                                                                Valid From
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="valid_from"
                                                                id="valid_from"
                                                                className="form-control form-shadow"
                                                                onChange={
                                                                    this
                                                                        .handleValid_from
                                                                }
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="valid_to">
                                                                Valid To
                                                            </label>
                                                            <input
                                                                type="date"
                                                                name="valid_to"
                                                                id="valid_to"
                                                                className="form-control form-shadow"
                                                                onChange={
                                                                    this
                                                                        .handleValid_to
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <h6 className="primary-text mb-3">
                                                            Configuration
                                                        </h6>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Progressive
                                                                    Score
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .progressivescore
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handlePSChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="progressivescore"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Type 1
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .type1
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleType1Change
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="type1"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Type 2
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .type2
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleType2Change
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="type2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Quiz
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .quiz
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleQuizChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="quiz"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Match
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .match
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleMatchChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="match"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Notes
                                                                    download
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .notesdownload
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleNotesChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="notesdownload"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Summary
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .summary
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleSummaryChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="summary"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Direct
                                                                    Questions
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .directquestion
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleDQChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="directquestion"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Configure
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .configure
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleConfigureChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="configure"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Simulation
                                                                    Exam
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .simulationexam
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleSimulationChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
                                                                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                                                                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                                                                    height={18}
                                                                    width={35}
                                                                    className="react-switch"
                                                                    name="simulationexam"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row mb-3">
                                                            <div className="col-9">
                                                                <p className="primary-text small mb-0 font-weight-bold">
                                                                    Locking of
                                                                    Tests
                                                                </p>
                                                            </div>
                                                            <div className="col-3 text-right">
                                                                <Switch
                                                                    checked={
                                                                        this
                                                                            .state
                                                                            .lockingoftest
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleLockingoftestChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
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
                                                                        this
                                                                            .state
                                                                            .mobileapp
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleMobileappChange
                                                                    }
                                                                    onColor="#efd2ac"
                                                                    onHandleColor="#621012"
                                                                    handleDiameter={
                                                                        12
                                                                    }
                                                                    uncheckedIcon={
                                                                        false
                                                                    }
                                                                    checkedIcon={
                                                                        false
                                                                    }
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
                                                <div className="form-group">
                                                    <button
                                                        className="btn btn-primary btn-block"
                                                        type="submit"
                                                    >
                                                        {this.state
                                                            .showLoader ? (
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
                                                        Create
                                                    </button>
                                                </div>
                                            </form>
                                        </Modal.Body>
                                    </Modal>
                                ) : (
                                    ""
                                )}

                                {/* Back button */}
                                <button
                                    className="btn btn-primary-invert btn-sm mb-2 mb-md-0"
                                    onClick={this.props.history.goBack}
                                >
                                    <i className="fas fa-chevron-left fa-sm"></i>{" "}
                                    Back
                                </button>

                                <div className="d-flex flex-wrap justify-content-center justify-content-md-end mb-4">
                                    {this.state.activeTab === "hod" ? (
                                        <button
                                            className="btn btn-primary btn-sm mr-1"
                                            onClick={this.toggleModal}
                                        >
                                            Add New
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                    <button
                                        className="btn btn-primary btn-sm mr-1"
                                        onClick={this.triggerDelete}
                                    >
                                        Delete
                                    </button>
                                    <button className="btn btn-primary btn-sm mr-1">
                                        Enable
                                    </button>
                                    <button className="btn btn-primary btn-sm">
                                        Disable
                                    </button>
                                </div>

                                <Tabs
                                    activeKey={
                                        !this.props.location.hash
                                            ? "hod"
                                            : this.props.location.hash.substring(
                                                  1
                                              )
                                    }
                                    id="uncontrolled-tab-example"
                                    onSelect={this.handleSelect}
                                >
                                    {/* HOD Table */}
                                    <Tab eventKey="hod" title="HOD">
                                        <div className="card shadow-sm">
                                            <HODTable
                                                hodItems={this.state.hodItems}
                                                ref={this.gridRef}
                                            />
                                            <div className="card-body p-3">
                                                <Paginations
                                                    activePage={
                                                        this.state.activeHODPage
                                                    }
                                                    totalItemsCount={
                                                        this.state.totalHODCount
                                                    }
                                                    onChange={this.handleHODPageChange.bind(
                                                        this
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </Tab>

                                    {/* Student table */}
                                    <Tab eventKey="student" title="Student">
                                        <div className="card shadow-sm">
                                            <StudentTable
                                                studentItems={
                                                    this.state.studentItems
                                                }
                                                ref={this.gridRef}
                                            />
                                            <div className="card-body p-3">
                                                <Paginations
                                                    activePage={
                                                        this.state.activeStudentPage
                                                    }
                                                    totalItemsCount={
                                                        this.state.totalStudentCount
                                                    }
                                                    onChange={this.handleStudentPageChange.bind(
                                                        this
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    </Tab>
                                </Tabs>
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profiles;
