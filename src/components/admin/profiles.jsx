import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import userimage from "../../assets/user.png";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Switch from "react-switch";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl.js";

class HodModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            category: "",
            subcategory: "",
            discipline: "",
            subject: "",
            board: "",
            validity: "",
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
        };
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.state.password.length < 12) {
            this.setState({
                errortext: "Password is too short",
            });
        } else {
            var url = baseUrl + adminPathUrl;
            var authToken = localStorage.getItem("Inquel-Auth");
            var headers = {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Inquel-Auth": authToken,
            };
            var d = new Date();
            var year = d.getFullYear();
            var month = d.getMonth();
            var day = d.getDate();
            var date = `${year + parseInt(this.state.validity)}-${
                month + 1
            }-${day} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

            fetch(`${url}/create/hod/`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify({
                    institute: {
                        hods: {
                            hod1: {
                                email: this.state.email,
                                username: this.state.username,
                                password: this.state.password,
                                category: this.state.category,
                                subcategory: this.state.subcategory,
                                discipline: this.state.discipline,
                                board: this.state.board,
                                valid_to: date,
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
        }
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

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add HOD
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="" onSubmit={this.handleSubmit}>
                        <div className="row mb-2">
                            <div className="form-group col-md-4">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="form-control form-control-sm shadow-sm"
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
                                    className="form-control form-control-sm shadow-sm"
                                    placeholder="Enter username"
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                    required
                                />
                            </div>
                            <div className="form-group col-md-4">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="form-control form-control-sm shadow-sm"
                                    placeholder="Enter password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-2">
                            <div className="col-md-6">
                                <h6 className="primary-text mb-3">Details</h6>

                                <div className="form-group">
                                    <label htmlFor="category">
                                        Category ID
                                    </label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleChange}
                                        value={this.state.category}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a category
                                        </option>
                                        <option value="DEG">Degree</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subcategory">
                                        Sub Category
                                    </label>
                                    <select
                                        name="subcategory"
                                        id="subcategory"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleChange}
                                        value={this.state.subcategory}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a sub-category
                                        </option>
                                        <option value="sch">SCH</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="discipline">
                                        Discipline
                                    </label>
                                    <select
                                        name="discipline"
                                        id="discipline"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleChange}
                                        value={this.state.discipline}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a discipline
                                        </option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subjects</label>
                                    <select
                                        name="subject"
                                        id="subject"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleChange}
                                        value={this.state.subject}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a subject
                                        </option>
                                        <option value="maths">Maths</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="board">
                                        Board / University
                                    </label>
                                    <select
                                        name="board"
                                        id="board"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleChange}
                                        value={this.state.board}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a Board / University
                                        </option>
                                        <option value="cbse">CBSE</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="validity">Validity</label>
                                    <select
                                        name="validity"
                                        id="validity"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleChange}
                                        value={this.state.validity}
                                        required
                                    >
                                        <option value="" disabled>
                                            Select a validity
                                        </option>
                                        <option value="1">1 year</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <h6 className="primary-text mb-3">
                                    Configuration
                                </h6>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <p className="primary-text small mb-0 font-weight-bold">
                                            Progressive Score
                                        </p>
                                    </div>
                                    <div className="col-3 text-right">
                                        <Switch
                                            checked={
                                                this.state.progressivescore
                                            }
                                            onChange={this.handlePSChange}
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
                                            checked={this.state.type1}
                                            onChange={this.handleType1Change}
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
                                            checked={this.state.type2}
                                            onChange={this.handleType2Change}
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
                                            checked={this.state.quiz}
                                            onChange={this.handleQuizChange}
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
                                            checked={this.state.match}
                                            onChange={this.handleMatchChange}
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
                                            name="match"
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-9">
                                        <p className="primary-text small mb-0 font-weight-bold">
                                            Notes download
                                        </p>
                                    </div>
                                    <div className="col-3 text-right">
                                        <Switch
                                            checked={this.state.notesdownload}
                                            onChange={this.handleNotesChange}
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
                                            checked={this.state.summary}
                                            onChange={this.handleSummaryChange}
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
                                            name="summary"
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
                                        <Switch
                                            checked={this.state.directquestion}
                                            onChange={this.handleDQChange}
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
                                            checked={this.state.configure}
                                            onChange={
                                                this.handleConfigureChange
                                            }
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
                                            name="configure"
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
                                        <Switch
                                            checked={this.state.simulationexam}
                                            onChange={
                                                this.handleSimulationChange
                                            }
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
                                            name="simulationexam"
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
                                        <Switch
                                            checked={this.state.lockingoftest}
                                            onChange={
                                                this.handleLockingoftestChange
                                            }
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
                                            checked={this.state.mobileapp}
                                            onChange={
                                                this.handleMobileappChange
                                            }
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
                                            name="mobileapp"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="form-group col-md-6">
                                <button
                                    className="btn btn-primary btn-block"
                                    type="submit"
                                >
                                    Create
                                </button>
                            </div>
                        </div>
                        {this.state.errortext !== "" ? (
                            <div className="form-group">
                                <p className="text-danger text-center small mb-0">
                                    {this.state.errortext}
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                        {this.state.successtext !== "" ? (
                            <div className="form-group">
                                <p className="text-success text-center small mb-0">
                                    {this.state.successtext}
                                </p>
                            </div>
                        ) : (
                            ""
                        )}
                    </form>
                </Modal.Body>
            </Modal>
        );
    }
}

function Loading() {
    return (
        <tr>
            <td className="text-center">Loading...</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
    );
}

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            showSideNav: false,
            activeTab: "hod",
            hodItems: [],
            studentItems: [],
            isLoaded: false,
        };
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
    };

    dateConversion = (date) => {
        var newDate = new Date(date).toLocaleDateString();
        var datearray = newDate.split("/");
        return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
    };

    componentDidMount = () => {
        var url = baseUrl + adminPathUrl;
        var authToken = localStorage.getItem("Inquel-Auth");
        var headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Inquel-Auth": authToken,
        };

        Promise.all([
            fetch(`${url}/hod/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
            fetch(`${url}/student/`, {
                headers: headers,
                method: "GET",
            }).then((res) => res.json()),
        ])
            .then((result) => {
                this.setState({
                    hodItems: result[0].data,
                    studentItems: result[1].data,
                    isLoaded: true,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

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
                        <HodModal
                            show={this.state.modalShow}
                            onHide={this.toggleModal}
                        />
                        <div className="d-flex flex-wrap justify-content-center justify-content-md-end mb-4">
                            <form>
                                <input
                                    type="search"
                                    name="search"
                                    id="search"
                                    className="form-control mb-md-0 mb-2"
                                    placeholder="Search"
                                />
                            </form>
                            <button className="btn btn-primary-invert mx-md-3 mx-0 ml-2 ml-md-0 mb-md-0 mb-2">
                                Filter <i className="fas fa-filter ml-1"></i>
                            </button>
                            {this.state.activeTab === "hod" ? (
                                <button
                                    className="btn btn-primary mr-md-3 mr-1"
                                    onClick={this.toggleModal}
                                >
                                    Add New
                                </button>
                            ) : (
                                ""
                            )}
                            <button className="btn btn-primary mr-md-3 mr-1">
                                Delete
                            </button>
                            <button className="btn btn-primary mr-md-3 mr-1">
                                Enable
                            </button>
                            <button className="btn btn-primary">Disable</button>
                        </div>

                        <Tabs
                            activeKey={this.state.activeTab}
                            id="uncontrolled-tab-example"
                            onSelect={this.handleSelect}
                        >
                            <Tab eventKey="hod" title="HOD">
                                <div className="card shadow-sm">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="primary-text">
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">
                                                        Category
                                                    </th>
                                                    <th scope="col">
                                                        Sub Category
                                                    </th>
                                                    <th scope="col">
                                                        Discipline
                                                    </th>
                                                    <th scope="col">
                                                        Board University
                                                    </th>
                                                    <th scope="col">
                                                        Registered On
                                                    </th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.isLoaded ? (
                                                    this.state.hodItems.map(
                                                        (list, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="text-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            value={
                                                                                list.id
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.id
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <img
                                                                            src={
                                                                                list.profile_link !==
                                                                                null
                                                                                    ? list.profile_link
                                                                                    : userimage
                                                                            }
                                                                            alt="User profile pic"
                                                                            width="20"
                                                                        />{" "}
                                                                        {`${list.first_name} ${list.last_name}`}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.category
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.sub_category
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.discipline
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.board
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {this.dateConversion(
                                                                            list.date_joined
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <Link
                                                                            to={`/admin/hod/${list.id}`}
                                                                        >
                                                                            <button className="btn btn-sm btn-primary">
                                                                                View
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <Loading />
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            <Tab eventKey="student" title="Student">
                                <div className="card shadow-sm">
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="primary-text">
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">ID</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Contact</th>
                                                    <th scope="col">
                                                        Category
                                                    </th>
                                                    <th scope="col">
                                                        Registered on
                                                    </th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.isLoaded ? (
                                                    this.state.studentItems.map(
                                                        (list, index) => {
                                                            return (
                                                                <tr key={index}>
                                                                    <td className="text-center">
                                                                        <input
                                                                            type="checkbox"
                                                                            name="enable"
                                                                            value={
                                                                                list.id
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.id
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <img
                                                                            src={
                                                                                list.profile_link !==
                                                                                null
                                                                                    ? list.profile_link
                                                                                    : userimage
                                                                            }
                                                                            alt="User profile pic"
                                                                            width="20"
                                                                        />{" "}
                                                                        {`${list.first_name} ${list.last_name}`}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.email
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.contact
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            list.category
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {this.dateConversion(
                                                                            list.date_joined
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <Link
                                                                            to={`/admin/student/${list.id}`}
                                                                        >
                                                                            <button className="btn btn-sm btn-primary">
                                                                                View
                                                                            </button>
                                                                        </Link>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        }
                                                    )
                                                ) : (
                                                    <Loading />
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profiles;
