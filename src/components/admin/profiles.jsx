import React, { useState } from "react";
import userimage from "../../assets/user.png";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";

function Profiles() {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <div className="section">
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
                    <button className="btn btn-primary mr-md-3 mr-1">
                        Add New
                    </button>
                    <button className="btn btn-primary">Delete</button>
                </div>
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: activeTab === "1",
                            })}
                            onClick={() => {
                                toggle("1");
                            }}
                        >
                            Head of the Department
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: activeTab === "2",
                            })}
                            onClick={() => {
                                toggle("2");
                            }}
                        >
                            Teacher
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({
                                active: activeTab === "3",
                            })}
                            onClick={() => {
                                toggle("3");
                            }}
                        >
                            Student
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                    <thead className="primary-text">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Enabled
                                            </th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Sub Category</th>
                                            <th scope="col">Discipline</th>
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
                    </TabPane>
                    <TabPane tabId="2">
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                <thead className="primary-text">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Enabled
                                            </th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Sub Category</th>
                                            <th scope="col">Discipline</th>
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
                    </TabPane>
                    <TabPane tabId="3">
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table">
                                <thead className="primary-text">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Enabled
                                            </th>
                                            <th scope="col">ID</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Email</th>
                                            <th scope="col">Contact</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Registered on</th>
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
                    </TabPane>
                </TabContent>
            </div>
        </div>
    );
}

export default Profiles;
