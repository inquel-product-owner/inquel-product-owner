import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import userimage from "../../assets/user.png";
import { Tabs, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

class HodModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            username: "",
            password: "",
            errortext: "",
        };
        this.hodemailOnchange = this.hodemailOnchange.bind(this);
        this.hodusernameOnchange = this.hodusernameOnchange.bind(this);
        this.hodpasswordOnchange = this.hodpasswordOnchange.bind(this);
        this.handleHodSubmit = this.handleHodSubmit.bind(this);
    }

    hodemailOnchange(event) {
        this.setState({
            email: event.target.value,
        });
    }

    hodusernameOnchange(event) {
        this.setState({
            username: event.target.value,
        });
    }

    hodpasswordOnchange(event) {
        this.setState({
            password: event.target.value,
        });
    }

    handleHodSubmit(event) {
        event.preventDefault();
        if (this.state.password.length < 12) {
            this.setState({
                errortext: "Password is too short",
            });
        }
    }

    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add HOD
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form action="" onSubmit={this.handleHodSubmit}>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="form-control borders form-height"
                                placeholder="Enter email"
                                onChange={this.hodemailOnchange}
                                value={this.state.email}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                className="form-control borders form-height"
                                placeholder="Enter username"
                                onChange={this.hodusernameOnchange}
                                value={this.state.username}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control borders form-height"
                                placeholder="Enter password"
                                onChange={this.hodpasswordOnchange}
                                value={this.state.password}
                                required
                            />
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
                        <div className="form-group">
                            <p className="text-danger text-center small mb-0">
                                {this.state.errortext}
                            </p>
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
            modalShow: false,
            showSideNav: false,
            activeTab: "hod",
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

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="User Profiles" />

                {/* Sidebar */}
                <SideNav
                    shownav={this.state.showSideNav}
                    togglenav={this.toggleSideNav}
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <button
                            className="btn btn-outline-secondary btn-sm d-block d-md-none mb-3"
                            onClick={this.toggleSideNav}
                        >
                            <i className="fas fa-bars"></i>
                        </button>
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
                                                        Handling Subject
                                                    </th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>001</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        HOD Ram
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/hod/001">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>002</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        HOD Ram
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/hod/002">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>003</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        HOD Ram
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/hod/003">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>004</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        HOD Ram
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/hod/004">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>005</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        HOD Ram
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/hod/005">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                            {/* <Tab
                                eventKey="teacher"
                                title="Teacher"
                                onSelect={() => {
                                    this.setState({ showAddHodbutton: false });
                                }}
                            >
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
                                                        Handling Subject
                                                    </th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>001</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Jeevan
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/teacher/001">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>002</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Jeevan
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/teacher/002">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>003</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Jeevan
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/teacher/003">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>004</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Jeevan
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/teacher/004">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>005</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Jeevan
                                                    </td>
                                                    <td>Degree</td>
                                                    <td>Engineering</td>
                                                    <td>Engineering</td>
                                                    <td>Anna University</td>
                                                    <td>Design</td>
                                                    <td>
                                                        <Link to="/teacher/005">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab> */}
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
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>001</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Student 1
                                                    </td>
                                                    <td>stu@acde.com</td>
                                                    <td>0123456789</td>
                                                    <td>Engineering</td>
                                                    <td>01.02.2020</td>
                                                    <td>
                                                        <Link to="/student/001">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>002</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Student 2
                                                    </td>
                                                    <td>stu@acde.com</td>
                                                    <td>0123456789</td>
                                                    <td>Engineering</td>
                                                    <td>01.02.2020</td>
                                                    <td>
                                                        <Link to="/student/002">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>003</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Student 3
                                                    </td>
                                                    <td>stu@acde.com</td>
                                                    <td>0123456789</td>
                                                    <td>Engineering</td>
                                                    <td>01.02.2020</td>
                                                    <td>
                                                        <Link to="/student/003">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>004</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Student 4
                                                    </td>
                                                    <td>stu@acde.com</td>
                                                    <td>0123456789</td>
                                                    <td>Engineering</td>
                                                    <td>01.02.2020</td>
                                                    <td>
                                                        <Link to="/student/004">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center">
                                                        <form>
                                                            <input
                                                                type="checkbox"
                                                                name="enable"
                                                                id="enable"
                                                            />
                                                        </form>
                                                    </td>
                                                    <td>005</td>
                                                    <td>
                                                        <img
                                                            src={userimage}
                                                            alt="User profile pic"
                                                            width="20"
                                                        />{" "}
                                                        Student 5
                                                    </td>
                                                    <td>stu@acde.com</td>
                                                    <td>0123456789</td>
                                                    <td>Engineering</td>
                                                    <td>01.02.2020</td>
                                                    <td>
                                                        <Link to="/student/005">
                                                            <button className="btn btn-sm btn-primary">
                                                                View
                                                            </button>
                                                        </Link>
                                                    </td>
                                                </tr>
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
