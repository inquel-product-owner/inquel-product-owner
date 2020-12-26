import React, { Component } from "react";
import Header from "./navbar";
import SideNav from "./sidenav";
import userimage from "../../assets/user.png";
import { Tabs, Tab, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

class ProfileList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            activeTab: "teacher",
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    handleSelect = (key) => {
        this.setState({ activeTab: key });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="User Profiles" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
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
                            <button className="btn btn-primary mr-md-2 mr-1">
                                Add New
                            </button>
                            <button className="btn btn-primary mr-md-2 mr-1">
                                Delete
                            </button>
                            <button className="btn btn-primary mr-md-2 mr-1">
                                Enable
                            </button>
                            <button className="btn btn-primary mr-md-2 mr-1">
                                Disable
                            </button>
                            <Dropdown>
                                <Dropdown.Toggle
                                    variant="primary"
                                    id="dropdown-basic"
                                >
                                    Notify
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item>Notify All</Dropdown.Item>
                                    <div className="dropdown-divider"></div>
                                    <Dropdown.Item>
                                        Notify Selected
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <Tabs
                            activeKey={this.state.activeTab}
                            id="uncontrolled-tab-example"
                            onSelect={this.handleSelect}
                        >
                            <Tab eventKey="teacher" title="Teacher">
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
                                                        Handling subject
                                                    </th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">
                                                        <input
                                                            type="checkbox"
                                                            name="enable"
                                                        />
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
                                                        <Link to="/hod/teacher/001">
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
                                                    <th scope="col">Groups</th>
                                                    <th scope="col">
                                                        Registered on
                                                    </th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">
                                                        <input
                                                            type="checkbox"
                                                            name="enable"
                                                        />
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
                                                    <td>9876543210</td>
                                                    <td>A</td>
                                                    <td>01/02/2020</td>
                                                    <td>
                                                        <Link to="/hod/student/001">
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

export default ProfileList;
