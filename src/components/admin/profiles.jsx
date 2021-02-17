import React, { Component } from "react";
import { Tabs, Tab, Modal, Alert, Spinner } from "react-bootstrap";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl.js";
import Select from "react-select";
import Header from "./navbar";
import SideNav from "./sidenav";
import HODTable from "../table/hodTable";
import Loading from "../sharedComponents/loader";
import StudentTable from "../table/studentTable";
import Paginations from "../sharedComponents/pagination";
import ReactSwitch from "../sharedComponents/switchComponent";
import dateFormat from "dateformat";

class HODModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            categoryItems: [],
            subCategoryItems: [],
            disciplineItems: [],
            boardItems: [],

            category: "",
            sub_category: "",
            discipline: "",
            board: "",
            valid_from: "",
            valid_to: "",
            progressivescore: false,
            type1: false,
            type2: false,
            quiz: false,
            match: false,
            notes: false,
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
            subcategory_loading: false,
            discipline_loading: false,
            showPassword: false,
            selectAll: false,
        };
        this.authToken = localStorage.getItem("Inquel-Auth");
        this.headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": this.authToken,
        };
        this.url = baseUrl + adminPathUrl;
    }

    // Fetch Category & Board Data
    componentDidMount = () => {
        fetch(`${this.url}/data/filter/`, {
            headers: this.headers,
            method: "GET",
        })
            .then((res) => res.json())
            .then((result) => {
                this.setState({
                    categoryItems: result.data.CATEGORY,
                    boardItems: result.data.BOARD,
                    category: "",
                    sub_category: "",
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            showLoader: true,
            showErrorAlert: false,
            showSuccessAlert: false,
        });
        if (this.state.password.length < 8) {
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
                                category: this.state.category,
                                sub_category: this.state.sub_category,
                                discipline: this.state.discipline,
                                board: this.state.board,
                                valid_from: this.state.valid_from,
                                valid_to: this.state.valid_to,
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
                                copy_download: this.state.notes,
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
                        });
                        this.props.formSubmission(true);
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
            category: event.value,
        });
        this.setState({
            subCategoryItems: [],
            disciplineItems: [],
            sub_category: "",
            discipline: "",
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
                        subCategoryItems: result.data.sub_category,
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
            sub_category: event.value,
        });
        this.setState({
            disciplineItems: [],
            discipline: "",
            discipline_loading: true,
        });

        if (event.value !== "") {
            fetch(
                `${this.url}/data/filter/?category=${this.state.category}&sub_category=${event.value}`,
                {
                    headers: this.headers,
                    method: "GET",
                }
            )
                .then((res) => res.json())
                .then((result) => {
                    console.log(result);
                    this.setState({
                        disciplineItems: result.data.DISCIPLINE,
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
            discipline: event.value,
        });
    };

    handleBoard = (event) => {
        this.setState({
            board: event.value,
        });
    };

    handleDate = (event) => {
        this.setState({
            [event.target.name]: `${dateFormat(
                event.target.value,
                "yyyy-mm-dd"
            )} 00:00:00`,
        });
    };

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSwitch = (event) => {
        this.setState({
            [event.target.name]: !event.target.value,
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
            notes: !this.state.notes,
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

    showPassword = () => {
        this.setState({
            showPassword: !this.state.showPassword,
        });
    };

    handleSelectAll = () => {
        this.setState({
            selectAll: !this.state.selectAll,
            progressivescore: !this.state.selectAll,
            type1: !this.state.selectAll,
            type2: !this.state.selectAll,
            quiz: !this.state.selectAll,
            match: !this.state.selectAll,
            notes: !this.state.selectAll,
            summary: !this.state.selectAll,
            directquestion: !this.state.selectAll,
            configure: !this.state.selectAll,
            simulationexam: !this.state.selectAll,
            lockingoftest: !this.state.selectAll,
            mobileapp: !this.state.selectAll,
        });
    };

    render() {
        return (
            <Modal
                show={this.props.show}
                onHide={this.props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton className="primary-text h5">
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
                        <span></span> {this.state.errorMsg}
                    </Alert>
                    <Alert
                        variant="success"
                        show={this.state.showSuccessAlert}
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
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control form-shadow"
                                    placeholder="Enter email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    className="form-control form-shadow"
                                    placeholder="Enter username"
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="password">Password</label>
                                <div
                                    className="input-group form-shadow"
                                    style={{
                                        borderRadius: "6px",
                                    }}
                                >
                                    <input
                                        type={
                                            this.state.showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        name="password"
                                        id="password"
                                        className="form-control"
                                        onChange={this.handleChange}
                                        value={this.state.password}
                                        placeholder="**********"
                                        required
                                    />
                                    <div className="input-group-append">
                                        <button
                                            className="btn btn-link btn-sm bg-white shadow-none"
                                            type="button"
                                            onClick={this.showPassword}
                                        >
                                            {this.state.showPassword ? (
                                                <i className="far fa-eye-slash"></i>
                                            ) : (
                                                <i className="far fa-eye"></i>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6">
                                <h6 className="primary-text mb-3">Details</h6>
                                <div className="form-group">
                                    <label htmlFor="category">Category</label>
                                    <Select
                                        className="basic-single form-shadow"
                                        placeholder="Select category"
                                        isSearchable={true}
                                        name="category"
                                        options={this.state.categoryItems.map(
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
                                    <label htmlFor="subcategory">
                                        Sub Category
                                    </label>
                                    <Select
                                        className="basic-single form-shadow"
                                        placeholder="Select subcategory"
                                        isDisabled={
                                            this.state.category === ""
                                                ? true
                                                : false
                                        }
                                        isLoading={
                                            this.state.subcategory_loading
                                                ? true
                                                : false
                                        }
                                        isSearchable={true}
                                        name="sub_category"
                                        options={this.state.subCategoryItems.map(
                                            function (list) {
                                                return {
                                                    value: list.code,
                                                    label: list.title,
                                                };
                                            }
                                        )}
                                        onChange={this.handleSubcategory}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="discipline">
                                        Discipline
                                    </label>
                                    <Select
                                        className="basic-single form-shadow"
                                        placeholder="Select discipline"
                                        isDisabled={
                                            this.state.sub_category === ""
                                                ? true
                                                : false
                                        }
                                        isLoading={
                                            this.state.discipline_loading
                                                ? true
                                                : false
                                        }
                                        isSearchable={true}
                                        name="discipline"
                                        options={Object.entries(
                                            this.state.disciplineItems
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
                                    <label htmlFor="board">
                                        Board / University
                                    </label>
                                    <Select
                                        className="basic-single form-shadow"
                                        placeholder="Select board"
                                        isSearchable={true}
                                        name="board"
                                        options={this.state.boardItems.map(
                                            (list) => {
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
                                    <label htmlFor="valid_from">
                                        Valid From
                                    </label>
                                    <input
                                        type="date"
                                        name="valid_from"
                                        id="valid_from"
                                        className="form-control form-shadow"
                                        onChange={this.handleDate}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="valid_to">Valid To</label>
                                    <input
                                        type="date"
                                        name="valid_to"
                                        id="valid_to"
                                        className="form-control form-shadow"
                                        onChange={this.handleDate}
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row align-items-center mb-3">
                                    <div className="col-6">
                                        <h6 className="primary-text">
                                            Configuration
                                        </h6>
                                    </div>
                                    <div className="col-6 text-right align-items-center">
                                        <label
                                            htmlFor="select-all"
                                            className="mr-2 mb-0"
                                        >
                                            Select All
                                        </label>
                                        <ReactSwitch
                                            checked={this.state.selectAll}
                                            onChange={this.handleSelectAll}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <p className="primary-text small mb-0 font-weight-bold">
                                            Progressive Score
                                        </p>
                                    </div>
                                    <div className="col-3 text-right">
                                        <ReactSwitch
                                            checked={
                                                this.state.progressivescore
                                            }
                                            onChange={this.handlePSChange}
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
                                        <ReactSwitch
                                            checked={this.state.type1}
                                            onChange={this.handleType1Change}
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
                                        <ReactSwitch
                                            checked={this.state.type2}
                                            onChange={this.handleType2Change}
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
                                        <ReactSwitch
                                            checked={this.state.quiz}
                                            onChange={this.handleQuizChange}
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
                                        <ReactSwitch
                                            checked={this.state.match}
                                            onChange={this.handleMatchChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <p className="primary-text small mb-0 font-weight-bold">
                                            Notes
                                        </p>
                                    </div>
                                    <div className="col-3 text-right">
                                        <ReactSwitch
                                            checked={this.state.notes}
                                            onChange={this.handleNotesChange}
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
                                        <ReactSwitch
                                            checked={this.state.summary}
                                            onChange={this.handleSummaryChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <p className="primary-text small mb-0 font-weight-bold">
                                            Direct Questions
                                        </p>
                                    </div>
                                    <div className="col-3 text-right">
                                        <ReactSwitch
                                            checked={this.state.directquestion}
                                            onChange={this.handleDQChange}
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
                                        <ReactSwitch
                                            checked={this.state.configure}
                                            onChange={
                                                this.handleConfigureChange
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <p className="primary-text small mb-0 font-weight-bold">
                                            Simulation Exam
                                        </p>
                                    </div>
                                    <div className="col-3 text-right">
                                        <ReactSwitch
                                            checked={this.state.simulationexam}
                                            onChange={
                                                this.handleSimulationChange
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <p className="primary-text small mb-0 font-weight-bold">
                                            Locking of Tests
                                        </p>
                                    </div>
                                    <div className="col-3 text-right">
                                        <ReactSwitch
                                            checked={this.state.lockingoftest}
                                            onChange={
                                                this.handleLockingoftestChange
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
                                            checked={this.state.mobileapp}
                                            onChange={
                                                this.handleMobileappChange
                                            }
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
                                {this.state.showLoader ? (
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
        );
    }
}

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeHODPage: 1,
            totalHODCount: 0,
            activeStudentPage: 1,
            totalStudentCount: 0,
            modalShow: false,
            showSideNav: false,
            activeTab: "hod",
            hodItems: [],
            studentItems: [],
            page_loading: true,
            is_formSubmited: false,
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
                    page_loading: false,
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
                    page_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    componentDidMount = () => {
        if (!this.props.location.hash) {
            this.setState({ activeTab: "hod" });
        } else {
            this.setState({ activeTab: this.props.location.hash.substring(1) });
        }

        this.loadHodData();
        this.loadStudentData();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (
            prevState.is_formSubmited !== this.state.is_formSubmited &&
            this.state.is_formSubmited === true
        ) {
            this.loadHodData();
            this.setState({
                is_formSubmited: false,
            });
        }

        if (prevState.activeHODPage !== this.state.activeHODPage) {
            this.loadHodData();
            this.setState({
                page_loading: true,
            });
        }

        if (prevState.activeStudentPage !== this.state.activeStudentPage) {
            this.loadStudentData();
            this.setState({
                page_loading: true,
            });
        }
    };

    triggerDelete = () => {
        this.gridRef.current.showConsole();
    };

    formSubmission = (is_formSubmited) => {
        if (is_formSubmited) {
            this.setState({
                is_formSubmited: true,
            });
            setTimeout(() => {
                this.setState({
                    modalShow: false,
                });
            }, 1000);
        }
    };

    handleHODPageChange(pageNumber) {
        this.setState({ activeHODPage: pageNumber });
    }

    handleStudentPageChange(pageNumber) {
        this.setState({ activeStudentPage: pageNumber });
    }

    render() {
        document.title =
            this.state.activeTab === "hod"
                ? "HOD Profiles - Admin | IQLabs"
                : "Student Profiles - Admin | IQLabs";
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

                {/* HOD Modal */}
                {this.state.modalShow ? (
                    <HODModal
                        show={this.state.modalShow}
                        onHide={this.toggleModal}
                        formSubmission={this.formSubmission}
                    />
                ) : (
                    ""
                )}

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        {/* Back button */}
                        <button
                            className="btn btn-primary-invert btn-sm mb-2 mb-md-0"
                            onClick={this.props.history.goBack}
                        >
                            <i className="fas fa-chevron-left fa-sm"></i> Back
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
                                    : this.props.location.hash.substring(1)
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
                                        {this.state.totalHODCount >= 10 ? (
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
                                        ) : null}
                                    </div>
                                </div>
                            </Tab>

                            {/* Student table */}
                            <Tab eventKey="student" title="Student">
                                <div className="card shadow-sm">
                                    <StudentTable
                                        studentItems={this.state.studentItems}
                                        path="admin"
                                        ref={this.gridRef}
                                    />
                                    <div className="card-body p-3">
                                        {this.state.totalStudentCount >= 10 ? (
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
                                        ) : null}
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                        {/* Loading component */}
                        {this.state.page_loading ? <Loading /> : ""}
                    </div>
                </div>
            </div>
        );
    }
}

export default Profiles;
