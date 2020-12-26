import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Header from "./navbar";
import SideNav from "./sidenav";

class GroupModal extends Component {
    render() {
        return (
            <Modal
                {...this.props}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label htmlFor="gname">Group name</label>
                        <input
                            type="text"
                            name="gname"
                            id="gname"
                            className="form-control borders"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="gdescription">Description</label>
                        <textarea
                            name="gdescription"
                            id="gdescription"
                            rows="5"
                            className="form-control borders"
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="validto">Valid to</label>
                        <input
                            type="text"
                            name="validto"
                            id="validto"
                            className="form-control borders"
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-sm btn-block">
                            Create Group
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        );
    }
}

class GroupConfiguration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideNav: false,
            groupModalShow: false,
        };
    }

    toggleSideNav = () => {
        this.setState({
            showSideNav: !this.state.showSideNav,
        });
    };

    addGroupModal = () => {
        this.setState({
            groupModalShow: !this.state.groupModalShow,
        });
    };

    render() {
        return (
            <div className="wrapper">
                {/* Navbar */}
                <Header name="Group" togglenav={this.toggleSideNav} />

                {/* Sidebar */}
                <SideNav shownav={this.state.showSideNav} />

                {/* Add Subject modal */}
                <GroupModal
                    show={this.state.groupModalShow}
                    onHide={this.addGroupModal}
                />

                <div
                    className={`section content ${
                        this.state.showSideNav ? "active" : ""
                    }`}
                >
                    <div className="container-fluid">
                        <h5 className="primary-text mb-3">Configuration</h5>
                        <div className="card shadow-sm">
                            <div className="table-responsive">
                                <table className="table table-xl">
                                    <thead className="text-white primary-bg">
                                        <tr>
                                            <th scope="col">Sl.No</th>
                                            <th scope="col">Group Name</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Valid From</th>
                                            <th scope="col">Valid To</th>
                                            <th scope="col">Teachers</th>
                                            <th scope="col">Students</th>
                                            <th
                                                scope="col"
                                                className="text-center"
                                            >
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>A</td>
                                            <td>Group A</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>12</td>
                                            <td>56</td>
                                            <td className="text-center">
                                                <Link to="/hod/group/001/details">
                                                    <button className="btn btn-sm btn-light shadow-sm">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>2</td>
                                            <td>B</td>
                                            <td>Group B</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>12</td>
                                            <td>56</td>
                                            <td className="text-center">
                                                <Link to="/hod/group/002/details">
                                                    <button className="btn btn-sm btn-light shadow-sm">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>3</td>
                                            <td>C</td>
                                            <td>Group C</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>dd/mm/yyyy</td>
                                            <td>12</td>
                                            <td>56</td>
                                            <td className="text-center">
                                                <Link to="/hod/group/002/details">
                                                    <button className="btn btn-sm btn-light shadow-sm">
                                                        <i className="fas fa-eye"></i>
                                                    </button>
                                                </Link>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-body">
                                <button
                                    className="btn btn-light btn-sm btn-block shadow-sm"
                                    onClick={this.addGroupModal}
                                >
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default GroupConfiguration;
