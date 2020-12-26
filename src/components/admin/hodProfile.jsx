import React, { Component } from "react";
import { Link } from "react-router-dom";
import profilepic from "../../assets/user.png";
import watermark from "../../assets/code.jpg";
import Switch from "react-switch";
import Header from "./navbar";
import SideNav from "./sidenav";
// import { baseUrl, adminPathUrl } from "../../shared/baseUrl";

class HodProfile extends Component {
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
            showSideNav: false,
        };
    }

    // handleSubmit = (event) => {
    //     event.preventDefault();
    //     if (this.state.password.length < 12) {
    //         this.setState({
    //             errortext: "Password is too short",
    //         });
    //     } else {
    //         var url = baseUrl + adminPathUrl;
    //         var authToken = localStorage.getItem("Inquel-Auth");
    //         var headers = {
    //             Accept: "application/json",
    //             "Content-Type": "application/json",
    //             "Inquel-Auth": authToken,
    //         };
    //         var d = new Date();
    //         var year = d.getFullYear();
    //         var month = d.getMonth();
    //         var day = d.getDate();
    //         var date = `${year + parseInt(this.state.validity)}-${
    //             month + 1
    //         }-${day} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;

    //         fetch(`${url}/create/hod/`, {
    //             headers: headers,
    //             method: "POST",
    //             body: JSON.stringify({
    //                 institute: {
    //                     hods: {
    //                         hod1: {
    //                             email: this.state.email,
    //                             username: this.state.username,
    //                             password: this.state.password,
    //                             category: this.state.category,
    //                             subcategory: this.state.subcategory,
    //                             discipline: this.state.discipline,
    //                             board: this.state.board,
    //                             valid_to: date,
    //                             prog_sco_card: this.state.progressivescore,
    //                             type_1_q: this.state.type1,
    //                             type_2_q: this.state.type2,
    //                             direct_q: this.state.directquestion,
    //                             quiz: this.state.quiz,
    //                             match: this.state.match,
    //                             config_course: this.state.configure,
    //                             sim_exam: this.state.simulationexam,
    //                             lock_test: this.state.lockingoftest,
    //                             copy_download: this.state.notesdownload,
    //                             android_app: this.state.mobileapp,
    //                         },
    //                     },
    //                 },
    //             }),
    //         })
    //             .then((res) => res.json())
    //             .then((result) => {
    //                 console.log(result);
    //                 if (result.sts) {
    //                     this.setState({
    //                         successtext: result.msg,
    //                     });
    //                 } else {
    //                     this.setState({
    //                         errortext: result.msg,
    //                     });
    //                 }
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     }
    // };

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

    // componentDidMount = () => {
    //     var url = baseUrl + adminPathUrl;
    //     var authToken = localStorage.getItem("Inquel-Auth");
    //     var headers = {
    //         Accept: "application/json",
    //         "Content-Type": "application/json",
    //         "Inquel-Auth": authToken,
    //     };

    //     fetch(`${url}/hod/3/`, {
    //         headers: headers,
    //         method: "GET",
    //     })
    //         .then((res) => res.json())
    //         .then((result) => {
    //             console.log(result);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} activeLink="profiles" />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-9 mb-3 mb-md-0">
                                {/* Back button */}
                                {/* <div className="mb-4">
                                    <Link to="/profiles">
                                        <button className="btn btn-primary">
                                            <i className="fas fa-chevron-left mr-1 fa-sm"></i>{" "}
                                            Back
                                        </button>
                                    </Link>
                                </div> */}

                                {/* HOD Details */}
                                <div className="row align-items-center mb-4">
                                    <div className="col-md-6 mb-3 mb-md-0">
                                        <div className="row align-items-center">
                                            <div className="col-3">
                                                <img
                                                    src={profilepic}
                                                    alt="Profile"
                                                    className="img-fluid profile-pic"
                                                />
                                            </div>
                                            <div className="col-9 pl-0">
                                                <h5 className="primary-text">
                                                    HOD Ram Profile
                                                </h5>
                                                <p className="mb-0">001</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="row">
                                            <div className="col-6">
                                                <Link
                                                    to="/admin/hod/001/students"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-block">
                                                        My Student Profiles
                                                    </button>
                                                </Link>
                                            </div>
                                            <div className="col-6">
                                                <Link
                                                    to="/admin/hod/001/teachers"
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <button className="btn btn-primary btn-block">
                                                        My Teacher Profiles
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            First Name
                                        </p>
                                        <p className="mb-0">Jeevan</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Last Name
                                        </p>
                                        <p className="mb-0">Jai</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Email ID
                                        </p>
                                        <p className="mb-0">abc@xyz.com</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Mobile
                                        </p>
                                        <p className="mb-0">1234567890</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Office Number
                                        </p>
                                        <p className="mb-0">1234</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Institution
                                        </p>
                                        <p className="mb-0">XYZ</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Address
                                        </p>
                                        <p className="mb-0">XYZ</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            City
                                        </p>
                                        <p className="mb-0">Bangalore</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            District
                                        </p>
                                        <p className="mb-0">Bangalore</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            State
                                        </p>
                                        <p className="mb-0">Karnataka</p>
                                    </div>
                                    <div className="col-md-2 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Country
                                        </p>
                                        <p className="mb-0">Karnataka</p>
                                    </div>
                                    <div className="col-md-3 col-sm-4 col-6 mb-3">
                                        <p className="mb-1 font-weight-bold">
                                            Additional Details 1
                                        </p>
                                        <p className="mb-0">XYZ</p>
                                    </div>
                                    <div className="col-md-3 col-sm-4 col-6 mb-3">
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

                                {/* Course Handling */}
                                <div className="card shadow-sm mb-4">
                                    <div className="card-header">
                                        <h5>Groups</h5>
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
                                    <div className="card-header">
                                        <div className="row align-items-center">
                                            <div className="col-8">
                                                <h6 className="font-weight-bold">
                                                    Details
                                                </h6>
                                            </div>
                                            <div className="col-4 text-right">
                                                <button className="btn btn-primary btn-sm">
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5 mb-2 mb-md-0">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Category ID
                                                </p>
                                            </div>
                                            <div className="col-md-7">
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
                                                    <option value="DEG">
                                                        Degree
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5 mb-2 mb-md-0">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Sub Category
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <select
                                                    name="subcategory"
                                                    id="subcategory"
                                                    className="form-control form-control-sm shadow-sm"
                                                    onChange={this.handleChange}
                                                    value={
                                                        this.state.subcategory
                                                    }
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        Select a sub-category
                                                    </option>
                                                    <option value="sch">
                                                        SCH
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5 mb-2 mb-md-0">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Discipline
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <select
                                                    name="discipline"
                                                    id="discipline"
                                                    className="form-control form-control-sm shadow-sm"
                                                    onChange={this.handleChange}
                                                    value={
                                                        this.state.discipline
                                                    }
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        Select a discipline
                                                    </option>
                                                    <option value="none">
                                                        None
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5 mb-2 mb-md-0">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Subjects
                                                </p>
                                            </div>
                                            <div className="col-md-7">
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
                                                    <option value="maths">
                                                        Maths
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row align-items-center mb-3">
                                            <div className="col-md-5 mb-2 mb-md-0">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Board / University
                                                </p>
                                            </div>
                                            <div className="col-md-7">
                                                <select
                                                    name="board"
                                                    id="board"
                                                    className="form-control form-control-sm shadow-sm"
                                                    onChange={this.handleChange}
                                                    value={this.state.board}
                                                    required
                                                >
                                                    <option value="" disabled>
                                                        Select a Board /
                                                        University
                                                    </option>
                                                    <option value="cbse">
                                                        CBSE
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-md-5 mb-2 mb-md-0">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Validity
                                                </p>
                                            </div>
                                            <div className="col-md-7">
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
                                                    <option value="1">
                                                        1 year
                                                    </option>
                                                </select>
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
                                                <button className="btn btn-primary btn-sm">
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
                                                        this.handlePSChange
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
                                                    checked={this.state.type1}
                                                    onChange={
                                                        this.handleType1Change
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
                                                    checked={this.state.type2}
                                                    onChange={
                                                        this.handleType2Change
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
                                                    checked={this.state.quiz}
                                                    onChange={
                                                        this.handleQuizChange
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
                                                    checked={this.state.match}
                                                    onChange={
                                                        this.handleMatchChange
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
                                                        this.state.notesdownload
                                                    }
                                                    onChange={
                                                        this.handleNotesChange
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
                                                    checked={this.state.summary}
                                                    onChange={
                                                        this.handleSummaryChange
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
                                                        this.handleDQChange
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
                                                        this.state.configure
                                                    }
                                                    onChange={
                                                        this
                                                            .handleConfigureChange
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
                                        <div className="row mb-2">
                                            <div className="col-9">
                                                <p className="primary-text small mb-0 font-weight-bold">
                                                    Locking of Tests
                                                </p>
                                            </div>
                                            <div className="col-3 text-right">
                                                <Switch
                                                    checked={
                                                        this.state.lockingoftest
                                                    }
                                                    onChange={
                                                        this
                                                            .handleLockingoftestChange
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
                                                    checked={
                                                        this.state.mobileapp
                                                    }
                                                    onChange={
                                                        this
                                                            .handleMobileappChange
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HodProfile;
