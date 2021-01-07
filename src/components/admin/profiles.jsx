import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import { Tabs, Tab, Modal } from "react-bootstrap";
import Switch from "react-switch";
import { baseUrl, adminPathUrl } from "../../shared/baseUrl.js";
import HODTable from "../table/hodTable";
import Loading from "../../shared/loadingComponent";
import StudentTable from "../table/studentTable";

class HodModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
                            successtext: result.msg,
                            errortext: "",
                        });
                    } else {
                        this.setState({
                            errortext: result.msg,
                            successtext: "",
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    };

    componentDidMount = () => {
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
                    selectedCategory: "",
                    selectedSubcategory: "",
                });
                console.log(result);
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
            selectedSubcategory: "",
            selectedDiscipline: "",
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
            selectedDiscipline: "",
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
                                    <label htmlFor="category">Category</label>
                                    <select
                                        name="category"
                                        id="category"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleCategory}
                                        required
                                    >
                                        <option value="">
                                            Select a category
                                        </option>
                                        {this.state.category.map(
                                            (list, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={list.code}
                                                    >
                                                        {list.title}
                                                    </option>
                                                );
                                            }
                                        )}
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
                                        onChange={this.handleSubcategory}
                                        required
                                    >
                                        <option value="">
                                            Select a sub-category
                                        </option>
                                        {this.state.subcategory.map(
                                            (list, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={list.code}
                                                    >
                                                        {list.title}
                                                    </option>
                                                );
                                            }
                                        )}
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
                                        onChange={this.handleDiscipline}
                                        required
                                    >
                                        <option value="">
                                            Select discipline
                                        </option>
                                        {Object.entries(
                                            this.state.discipline
                                        ).map(([key, value], index) => {
                                            return (
                                                <option key={index} value={key}>
                                                    {value}
                                                </option>
                                            );
                                        })}
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
                                        onChange={this.handleBoard}
                                        required
                                    >
                                        <option value="">
                                            Select a Board / University
                                        </option>
                                        {this.state.board.map((list, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={list.code}
                                                >
                                                    {list.title}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="valid_from">
                                        Valid From
                                    </label>
                                    <input
                                        type="date"
                                        name="valid_from"
                                        id="valid_from"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleValid_from}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="valid_to">Valid To</label>
                                    <input
                                        type="date"
                                        name="valid_to"
                                        id="valid_to"
                                        className="form-control form-control-sm shadow-sm"
                                        onChange={this.handleValid_to}
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

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            showSideNav: false,
            activeTab: "hod",
            hodItems: [],
            studentItems: [],
            is_loading: true,
        };
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
    };

    dateConversion = (date) => {
        var newDate = new Date(date).toLocaleDateString();
        var datearray = newDate.split("/");
        return datearray[1] + "/" + datearray[0] + "/" + datearray[2];
    };

    componentDidMount = () => {
        document.title = "Admin Profile | IQLabs";

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
                    hodItems: result[0].data.results,
                    studentItems: result[1].data.results,
                    is_loading: false,
                });
                console.log(result);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    triggerDelete = () => {
        this.gridRef.current.showConsole();
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
                        {this.state.is_loading ? (
                            <Loading />
                        ) : (
                            <>
                                {this.state.modalShow ? (
                                    <HodModal
                                        show={this.state.modalShow}
                                        onHide={this.toggleModal}
                                    />
                                ) : (
                                    ""
                                )}
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
                                    activeKey={this.state.activeTab}
                                    id="uncontrolled-tab-example"
                                    onSelect={this.handleSelect}
                                >
                                    <Tab eventKey="hod" title="HOD">
                                        <div className="card shadow-sm">
                                            <HODTable
                                                hodItems={this.state.hodItems}
                                                ref={this.gridRef}
                                            />
                                        </div>
                                    </Tab>
                                    <Tab eventKey="student" title="Student">
                                        <div className="card shadow-sm">
                                            <StudentTable
                                                studentItems={
                                                    this.state.studentItems
                                                }
                                                ref={this.gridRef}
                                            />
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
