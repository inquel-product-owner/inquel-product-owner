import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import profilepic from "../../assets/user.png";
import classnames from "classnames";

function HodTeacherList() {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = (tab) => {
        if (activeTab !== tab) setActiveTab(tab);
    };
    return (
        <div className="section">
            <div className="container-fluid">
                {/* Back button */}
                <div className="mb-4">
                    <Link to="/">
                        <button className="btn btn-primary">
                            <i className="fas fa-chevron-left mr-1 fa-sm"></i>{" "}
                            Back
                        </button>
                    </Link>
                </div>

                {/* HOD Details */}
                <div className="row align-items-center mb-4">
                    <div className="col-md-6 mb-3 mb-md-0">
                        <div className="row align-items-center">
                            <div className="col-2">
                                <img
                                    src={profilepic}
                                    alt="Profile"
                                    className="img-fluid profile-pic"
                                />
                            </div>
                            <div className="col-10">
                                <h5 className="primary-text">
                                    HOD Ram Profile
                                </h5>
                                <p className="mb-0">001</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teachers list */}
                <div className="row mb-4">
                    <div className="col-md-3">
                        <h5 className="primary-text font-weight-bold">
                            Teacher profiles
                        </h5>
                    </div>
                    <div className="col-md-3">
                        <form action="">
                            <input
                                type="search"
                                name="search"
                                id="search"
                                placeholder="Search Teacher"
                                className="form-control"
                            />
                        </form>
                    </div>
                </div>
                <div className="card shadow-sm">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-2">
                                <Nav tabs>
                                    <div
                                        class="flex-column nav-pills"
                                        id="v-pills-tab"
                                        role="tablist"
                                        aria-orientation="vertical"
                                    >
                                        <NavItem>
                                            <NavLink
                                                className={classnames({
                                                    active: activeTab === "1",
                                                })}
                                                onClick={() => {
                                                    toggle("1");
                                                }}
                                            >
                                                <h5 className="font-weight-bold" style={{fontSize:"16px"}}>Teacher 01</h5>
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
                                                <h5 className="font-weight-bold" style={{fontSize:"16px"}}>Teacher 02</h5>
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
                                                <h5 className="font-weight-bold" style={{fontSize:"16px"}}>Teacher 03</h5>
                                            </NavLink>
                                        </NavItem>
                                    </div>
                                </Nav>
                            </div>
                            <div className="col-10">
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <div className="card shadow-sm">
                                            <div className="table-responsive">
                                                <table className="table">
                                                    <thead className="secondary-bg primary-text">
                                                        <tr>
                                                            <th scope="col">
                                                                Handling
                                                                standard
                                                            </th>
                                                            <th scope="col">
                                                                Handling
                                                            </th>
                                                            <th scope="col">
                                                                Chapters
                                                                Assigned
                                                            </th>
                                                            <th scope="col">
                                                                Exams
                                                            </th>
                                                            <th scope="col">
                                                                Quizes
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                9th Standard
                                                            </td>
                                                            <td>Chemistry</td>
                                                            <td>
                                                                <p>
                                                                    Chapter 1
                                                                </p>
                                                                <p>
                                                                    Chapter 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Chapter 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Simulation 1
                                                                </p>
                                                                <p>
                                                                    Simulation 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Simulation 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Chapter 8
                                                                </p>
                                                                <p>
                                                                    Chapter 9
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                10th Standard
                                                            </td>
                                                            <td>Chemistry</td>
                                                            <td>
                                                                <p>
                                                                    Chapter 1
                                                                </p>
                                                                <p>
                                                                    Chapter 2
                                                                </p>
                                                                <p>
                                                                    Chapter 3
                                                                </p>
                                                                <p className="mb-0">
                                                                    Chapter 4
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Simulation 1
                                                                </p>
                                                                <p>
                                                                    Simulation 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Simulation 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Chapter 8
                                                                </p>
                                                                <p>
                                                                    Chapter 9
                                                                </p>
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
                                                <thead className="secondary-bg primary-text">
                                                        <tr>
                                                            <th scope="col">
                                                                Handling
                                                                standard
                                                            </th>
                                                            <th scope="col">
                                                                Handling
                                                            </th>
                                                            <th scope="col">
                                                                Chapters
                                                                Assigned
                                                            </th>
                                                            <th scope="col">
                                                                Exams
                                                            </th>
                                                            <th scope="col">
                                                                Quizes
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                11th Standard
                                                            </td>
                                                            <td>Chemistry</td>
                                                            <td>
                                                                <p>
                                                                    Chapter 1
                                                                </p>
                                                                <p>
                                                                    Chapter 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Chapter 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Simulation 1
                                                                </p>
                                                                <p>
                                                                    Simulation 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Simulation 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Chapter 8
                                                                </p>
                                                                <p>
                                                                    Chapter 9
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                12th Standard
                                                            </td>
                                                            <td>Chemistry</td>
                                                            <td>
                                                                <p>
                                                                    Chapter 1
                                                                </p>
                                                                <p>
                                                                    Chapter 2
                                                                </p>
                                                                <p>
                                                                    Chapter 3
                                                                </p>
                                                                <p className="mb-0">
                                                                    Chapter 4
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Simulation 1
                                                                </p>
                                                                <p>
                                                                    Simulation 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Simulation 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Chapter 8
                                                                </p>
                                                                <p>
                                                                    Chapter 9
                                                                </p>
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
                                                <thead className="secondary-bg primary-text">
                                                        <tr>
                                                            <th scope="col">
                                                                Handling
                                                                standard
                                                            </th>
                                                            <th scope="col">
                                                                Handling
                                                            </th>
                                                            <th scope="col">
                                                                Chapters
                                                                Assigned
                                                            </th>
                                                            <th scope="col">
                                                                Exams
                                                            </th>
                                                            <th scope="col">
                                                                Quizes
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                8th Standard
                                                            </td>
                                                            <td>Chemistry</td>
                                                            <td>
                                                                <p>
                                                                    Chapter 1
                                                                </p>
                                                                <p>
                                                                    Chapter 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Chapter 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Simulation 1
                                                                </p>
                                                                <p>
                                                                    Simulation 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Simulation 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Chapter 8
                                                                </p>
                                                                <p>
                                                                    Chapter 9
                                                                </p>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td>
                                                                7th Standard
                                                            </td>
                                                            <td>Chemistry</td>
                                                            <td>
                                                                <p>
                                                                    Chapter 1
                                                                </p>
                                                                <p>
                                                                    Chapter 2
                                                                </p>
                                                                <p>
                                                                    Chapter 3
                                                                </p>
                                                                <p className="mb-0">
                                                                    Chapter 4
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Simulation 1
                                                                </p>
                                                                <p>
                                                                    Simulation 2
                                                                </p>
                                                                <p className="mb-0">
                                                                    Simulation 3
                                                                </p>
                                                            </td>
                                                            <td>
                                                                <p>
                                                                    Chapter 8
                                                                </p>
                                                                <p>
                                                                    Chapter 9
                                                                </p>
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HodTeacherList;
